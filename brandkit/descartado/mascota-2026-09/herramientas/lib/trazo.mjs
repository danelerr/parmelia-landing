// Clean pixel-art drawing on character maps: lines with regular steps, polygon fills, the uniform outline,
// mirror symmetry, silhouette defects and vectorisation of a raster shape (used to redraw AI 1 poses from their outline).
import { EMPTY } from './pixmap.mjs';

const N4 = [[1, 0], [-1, 0], [0, 1], [0, -1]];

/** Mutable map of palette characters. `rows()` returns the usual array of strings. */
export class Grid {
  constructor(w, h, fill = EMPTY) { this.w = w; this.h = h; this.c = Array.from({ length: h }, () => Array(w).fill(fill)); }
  static from(rows) { const g = new Grid(Math.max(...rows.map(r => r.length)), rows.length); rows.forEach((r, y) => [...r].forEach((ch, x) => { g.c[y][x] = ch; })); return g; }
  inside(x, y) { return x >= 0 && y >= 0 && x < this.w && y < this.h; }
  get(x, y) { return this.inside(x, y) ? this.c[y][x] : EMPTY; }
  set(x, y, ch) { if (this.inside(x, y)) this.c[y][x] = ch; return this; }
  paint(cells, ch, where) { for (const [x, y] of cells) if (!where || where(x, y, this.get(x, y))) this.set(x, y, ch); return this; }
  rows() { return this.c.map(r => r.join('')); }
}

/**
 * Cells of a line from (x0, y0) to (x1, y1), 8-connected, one cell per step along the major axis.
 * Default: Bresenham, so runs differ by at most one cell. With { run: n } every run is exactly n cells (a 1:n slope);
 * the line keeps the direction towards (x1, y1) and stops at the end's major-axis coordinate.
 */
export function lineCells(x0, y0, x1, y1, { run } = {}) {
  const dx = x1 - x0, dy = y1 - y0, sx = Math.sign(dx) || 1, sy = Math.sign(dy) || 1;
  const steep = Math.abs(dy) > Math.abs(dx), major = steep ? Math.abs(dy) : Math.abs(dx), minor = steep ? Math.abs(dx) : Math.abs(dy);
  const cells = [];
  for (let i = 0; i <= major; i++) {
    const j = run ? Math.floor(i / run) : Math.round((i * minor) / (major || 1));
    cells.push(steep ? [x0 + j * sx, y0 + i * sy] : [x0 + i * sx, y0 + j * sy]);
  }
  return cells;
}

/**
 * A line `width` cells thick, grown along the minor axis only (+y for shallow lines, +x for steep ones), so every
 * column (or row) holds exactly `width` cells. A square brush would thicken each step to width + 1.
 */
export function drawLine(grid, [x0, y0], [x1, y1], ch, { width = 1, run, where } = {}) {
  const steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
  const cells = lineCells(x0, y0, x1, y1, { run }).flatMap(([x, y]) => Array.from({ length: width }, (_, k) => (steep ? [x + k, y] : [x, y + k])));
  return grid.paint(cells, ch, where);
}
export function drawPolyline(grid, pts, ch, opts = {}) {
  for (let i = 1; i < pts.length; i++) drawLine(grid, pts[i - 1], pts[i], ch, opts);
  return grid;
}

/** Cells whose centre lies inside the closed loops (even-odd rule), loops in cell units: [[x, y], ...]. */
export function polygonCells(loops, w, h) {
  const cells = [];
  for (let y = 0; y < h; y++) {
    const cy = y + 0.5, xs = [];
    for (const loop of loops) for (let i = 0; i < loop.length; i++) {
      const [ax, ay] = loop[i], [bx, by] = loop[(i + 1) % loop.length];
      if ((ay <= cy) !== (by <= cy)) xs.push(ax + ((cy - ay) / (by - ay)) * (bx - ax));
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      for (let x = Math.max(0, Math.ceil(xs[k] - 0.5)); x < w && x + 0.5 < xs[k + 1]; x++) cells.push([x, y]);
    }
  }
  return cells;
}
export function fillPolygon(grid, loops, ch, where) { return grid.paint(polygonCells(loops, grid.w, grid.h), ch, where); }

/** Opaque cells within `width` 4-connected steps of the outside: the kit's uniform outline (ESPECIFICACION.md). */
export function outlineCells(rows, width = 2) {
  const H = rows.length, W = rows[0].length, dist = Array.from({ length: H }, () => Array(W).fill(Infinity)), q = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (rows[y][x] === EMPTY) { dist[y][x] = 0; q.push([x, y]); } else if (!x || !y || x === W - 1 || y === H - 1) { dist[y][x] = 1; q.push([x, y]); }
  }
  for (let i = 0; i < q.length; i++) {
    const [x, y] = q[i];
    for (const [dx, dy] of N4) { const X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < W && Y < H && dist[Y][X] > dist[y][x] + 1) { dist[Y][X] = dist[y][x] + 1; q.push([X, Y]); } }
  }
  const cells = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (rows[y][x] !== EMPTY && dist[y][x] <= width) cells.push([x, y]);
  return cells;
}

/** Copy the half left of `axis` (a cell boundary) onto the right: rows[y][axis + k] = rows[y][axis - 1 - k]. */
export function mirrorX(rows, axis, { y0 = 0, y1 = rows.length } = {}) {
  return rows.map((r, y) => {
    if (y < y0 || y >= y1) return r;
    const c = [...r];
    for (let k = 0; axis + k < c.length && axis - 1 - k >= 0; k++) c[axis + k] = c[axis - 1 - k];
    return c.join('');
  });
}

/**
 * Silhouette and colour defects a pixel artist cleans by hand:
 * lone = a cell with no 4-neighbour of its own colour; spike = an opaque cell with 3+ transparent 4-neighbours;
 * notch = a transparent cell with 3+ opaque 4-neighbours.
 */
export function defects(rows) {
  const H = rows.length, W = rows[0].length, at = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? EMPTY : rows[y][x]);
  const out = { lone: [], spikes: [], notches: [] };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const c = rows[y][x], n = N4.map(([dx, dy]) => at(x + dx, y + dy));
    if (c === EMPTY) { if (n.filter(v => v !== EMPTY).length >= 3) out.notches.push([x, y]); continue; }
    if (n.every(v => v !== c)) out.lone.push([x, y]);
    if (n.filter(v => v === EMPTY).length >= 3) out.spikes.push([x, y]);
  }
  return out;
}

/** Repaint every lone cell (see `defects`) with the most common colour among its 4-neighbours. */
export function fixLone(rows) {
  const g = Grid.from(rows);
  for (const [x, y] of defects(rows).lone) {
    const n = N4.map(([dx, dy]) => g.get(x + dx, y + dy)), count = {};
    for (const c of n) count[c] = (count[c] || 0) + 1;
    g.set(x, y, Object.entries(count).sort((a, b) => b[1] - a[1])[0][0]);
  }
  return g.rows();
}

/** Repaint every island of up to `max` cells (4-connected, one colour) that is enclosed by a single other colour. */
export function fixIslands(rows, max = 2) {
  const g = Grid.from(rows), seen = new Set();
  for (let y = 0; y < g.h; y++) for (let x = 0; x < g.w; x++) {
    const c = g.get(x, y), k0 = x + ',' + y;
    if (c === EMPTY || seen.has(k0)) continue;
    const comp = [[x, y]], ring = new Set(); seen.add(k0);
    for (let i = 0; i < comp.length; i++) {
      const [cx, cy] = comp[i];
      for (const [dx, dy] of N4) {
        const X = cx + dx, Y = cy + dy, k = X + ',' + Y, n = g.get(X, Y);
        if (n === c) { if (!seen.has(k)) { seen.add(k); comp.push([X, Y]); } } else ring.add(n);
      }
    }
    if (comp.length <= max && ring.size === 1 && !ring.has(EMPTY)) g.paint(comp, [...ring][0]);
  }
  return g.rows();
}

/**
 * Vectorise a binary mask (`mask(x, y)` over w x h pixels) into closed loops on the pixel-corner lattice.
 * The crack contour is reduced to run midpoints plus real corners (junctions of two runs >= `corner` px), simplified
 * with Ramer-Douglas-Peucker (`eps` in pixels) and every straight part is refitted by least squares, so a staircase
 * becomes the straight line through its middle and real corners stay sharp.
 * Outer loops run clockwise and holes anticlockwise (screen axes); fill them with the even-odd rule.
 */
export function vectorize(mask, w, h, { eps = 1, corner = 2, minArea = 0 } = {}) {
  const on = (x, y) => x >= 0 && y >= 0 && x < w && y < h && mask(x, y);
  const key = (x, y) => y * (w + 1) + x, out = new Map();
  const add = (ax, ay, bx, by) => { const k = key(ax, ay); if (!out.has(k)) out.set(k, []); out.get(k).push([bx, by]); };
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (!on(x, y)) continue;
    if (!on(x, y - 1)) add(x, y, x + 1, y);
    if (!on(x + 1, y)) add(x + 1, y, x + 1, y + 1);
    if (!on(x, y + 1)) add(x + 1, y + 1, x, y + 1);
    if (!on(x - 1, y)) add(x, y + 1, x, y);
  }
  const loops = [];
  for (const [k0, list] of out) {
    while (list.length) {
      let px = k0 % (w + 1), py = Math.floor(k0 / (w + 1));
      const pts = [[px, py]]; let [nx, ny] = list.shift(), dir = [nx - px, ny - py];
      while (!(nx === pts[0][0] && ny === pts[0][1])) {
        pts.push([nx, ny]);
        const opts = out.get(key(nx, ny));
        // At a diagonal pinch, turn left: diagonal pixels count as connected (8-connected silhouettes).
        let pick = 0;
        if (opts.length > 1) pick = opts.findIndex(([ox, oy]) => { const d = [ox - nx, oy - ny]; return dir[0] * d[1] - dir[1] * d[0] < 0; });
        if (pick < 0) pick = 0;
        const [tx, ty] = opts.splice(pick, 1)[0];
        dir = [tx - nx, ty - ny]; nx = tx; ny = ty;
      }
      if (Math.abs(area(pts)) >= minArea) loops.push(simplify(pts, eps, corner));
    }
  }
  return loops;
}

const area = pts => pts.reduce((s, [x, y], i) => { const [X, Y] = pts[(i + 1) % pts.length]; return s + x * Y - X * y; }, 0) / 2;
const segDist = ([px, py], [ax, ay], [bx, by]) => {
  const dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy;
  if (!L) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / L));
  return Math.hypot(px - ax - t * dx, py - ay - t * dy);
};

/**
 * A staircase is summarised by the midpoints of its runs, which lie on the line through its middle. The junction of two
 * long runs (both >= `corner` px) is a real corner and is kept as a point of its own.
 */
function runPoints(loop, corner) {
  const n = loop.length, dir = i => { const [ax, ay] = loop[i], [bx, by] = loop[(i + 1) % n]; return `${bx - ax},${by - ay}`; };
  let s = 0; while (s < n && dir(s) === dir((s - 1 + n) % n)) s++;
  if (s === n) return loop;
  const runs = [];
  for (let i = 0; i < n;) {
    const a = (s + i) % n, d = dir(a); let len = 0;
    while (i < n && dir((s + i) % n) === d) { i++; len++; }
    runs.push({ a: loop[a], b: loop[(a + len) % n], len });
  }
  const pts = [];
  runs.forEach((r, k) => {
    pts.push([(r.a[0] + r.b[0]) / 2, (r.a[1] + r.b[1]) / 2]);
    if (r.len >= corner && runs[(k + 1) % runs.length].len >= corner) pts.push(r.b);
  });
  return pts;
}

function simplify(crack, eps, corner) {
  const loop = runPoints(crack, corner), n = loop.length;
  if (n < 5) return loop;
  // Start at the point farthest from the first one, so the arbitrary start is not kept as a corner.
  let far = 0, best = -1;
  loop.forEach(([x, y], i) => { const d = (x - loop[0][0]) ** 2 + (y - loop[0][1]) ** 2; if (d > best) { best = d; far = i; } });
  const pts = [...loop.slice(far), ...loop.slice(0, far), loop[far]];
  const keep = new Set([0, pts.length - 1]);
  const rdp = (a, b) => {
    let m = -1, md = eps;
    for (let i = a + 1; i < b; i++) { const d = segDist(pts[i], pts[a], pts[b]); if (d > md) { md = d; m = i; } }
    if (m < 0) return; keep.add(m); rdp(a, m); rdp(m, b);
  };
  let far2 = 0; best = -1;
  pts.forEach(([x, y], i) => { const d = (x - pts[0][0]) ** 2 + (y - pts[0][1]) ** 2; if (d > best) { best = d; far2 = i; } });
  keep.add(far2); rdp(0, far2); rdp(far2, pts.length - 1);
  let idx = [...keep].sort((a, b) => a - b); idx.pop();
  // Drop vertices whose two neighbouring runs are one straight run within eps (includes the forced start points).
  for (let changed = true; changed && idx.length > 3;) {
    changed = false;
    for (let k = 0; k < idx.length && idx.length > 3; k++) {
      const a = idx[(k - 1 + idx.length) % idx.length], b = idx[(k + 1) % idx.length];
      const span = []; for (let i = a; i !== b; i = (i + 1) % (pts.length - 1)) span.push(pts[i]);
      if (span.every(p => segDist(p, pts[a], pts[b]) <= eps)) { idx.splice(k, 1); changed = true; k--; }
    }
  }
  // Refit each run by total least squares and put the vertices where neighbouring runs meet.
  const m = pts.length - 1, runs = idx.map((a, k) => {
    const b = idx[(k + 1) % idx.length], seg = [];
    for (let i = a; ; i = (i + 1) % m) { seg.push(pts[i]); if (i === b) break; }
    return fitLine(seg);
  });
  return idx.map((a, k) => {
    const L1 = runs[(k - 1 + runs.length) % runs.length], L2 = runs[k], p = cross(L1, L2);
    return p && Math.hypot(p[0] - pts[a][0], p[1] - pts[a][1]) <= 2 * eps ? p : pts[a];
  });
}
function fitLine(seg) {
  const n = seg.length, cx = seg.reduce((s, p) => s + p[0], 0) / n, cy = seg.reduce((s, p) => s + p[1], 0) / n;
  let sxx = 0, syy = 0, sxy = 0;
  for (const [x, y] of seg) { sxx += (x - cx) ** 2; syy += (y - cy) ** 2; sxy += (x - cx) * (y - cy); }
  const t = 0.5 * Math.atan2(2 * sxy, sxx - syy);
  return { c: [cx, cy], d: [Math.cos(t), Math.sin(t)] };
}
function cross(A, B) {
  const det = A.d[0] * B.d[1] - A.d[1] * B.d[0];
  if (Math.abs(det) < 0.25) return null; // nearly parallel runs: keep the original corner
  const t = ((B.c[0] - A.c[0]) * B.d[1] - (B.c[1] - A.c[1]) * B.d[0]) / det;
  return [A.c[0] + t * A.d[0], A.c[1] + t * A.d[1]];
}
