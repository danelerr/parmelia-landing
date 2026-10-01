// RotSprite-style rotation for character-map pixel art.
import { EMPTY } from './pixmap.mjs';

/** Scale2x (EPX): doubles resolution while keeping diagonals clean. */
export function scale2x(rows) {
  const H = rows.length, W = rows[0].length;
  const at = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? rows[Math.min(H - 1, Math.max(0, y))][Math.min(W - 1, Math.max(0, x))] : rows[y][x]);
  const out = Array.from({ length: H * 2 }, () => []);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const P = rows[y][x], A = at(x, y - 1), B = at(x + 1, y), C = at(x - 1, y), D = at(x, y + 1);
    out[2 * y][2 * x] = C === A && C !== D && A !== B ? A : P;
    out[2 * y][2 * x + 1] = A === B && A !== C && B !== D ? B : P;
    out[2 * y + 1][2 * x] = D === C && D !== B && C !== A ? C : P;
    out[2 * y + 1][2 * x + 1] = B === D && B !== A && D !== C ? D : P;
  }
  return out.map(r => r.join(''));
}

/** Rotate by `deg` (clockwise, screen coordinates) about the sprite centre. */
export function rotsprite(rows, deg, { priority = '#' } = {}) {
  let big = rows; for (let i = 0; i < 3; i++) big = scale2x(big);
  const k = 8, H = rows.length, W = rows[0].length;
  const a = (deg * Math.PI) / 180, cos = Math.cos(a), sin = Math.sin(a);
  const cx = W / 2, cy = H / 2;
  // Output canvas big enough for the rotated bounds.
  const R = Math.ceil(Math.hypot(W, H) / 2) + 1, OW = 2 * R, OH = 2 * R;
  const out = [];
  for (let oy = 0; oy < OH; oy++) {
    let row = '';
    for (let ox = 0; ox < OW; ox++) {
      const votes = new Map();
      for (let sy = 0; sy < 4; sy++) for (let sx = 0; sx < 4; sx++) {
        const px = ox - R + (sx + 0.5) / 4, py = oy - R + (sy + 0.5) / 4;
        // Inverse rotation back to source space.
        const x = cos * px + sin * py + cx, y = -sin * px + cos * py + cy;
        const bx = Math.floor(x * k), by = Math.floor(y * k);
        const ch = bx < 0 || by < 0 || bx >= W * k || by >= H * k ? EMPTY : big[by][bx];
        votes.set(ch, (votes.get(ch) || 0) + 1);
      }
      // Majority, with a thin-line bias so 1-cell outlines survive the rotation.
      let best = EMPTY, bv = -1;
      for (const [ch, v] of votes) { const w = v + (ch === priority ? 3 : 0); if (w > bv) { bv = w; best = ch; } }
      row += best;
    }
    out.push(row);
  }
  return out;
}

/** Classic RotSprite: nearest sample of the 8x image at each output centre; best of 64 sub-pixel offsets. */
export function rotspriteBest(rows, deg) {
  let big = rows; for (let i = 0; i < 3; i++) big = scale2x(big);
  const k = 8, H = rows.length, W = rows[0].length;
  const a = (deg * Math.PI) / 180, cos = Math.cos(a), sin = Math.sin(a), cx = W / 2, cy = H / 2;
  const R = Math.ceil(Math.hypot(W, H) / 2) + 1, N = 2 * R;
  const count = g => { const m = {}; for (const r of g) for (const ch of r) if (ch !== EMPTY) m[ch] = (m[ch] || 0) + 1; return m; };
  const want = count(rows);
  let best = null;
  for (let oy = 0; oy < 8; oy++) for (let ox = 0; ox < 8; ox++) {
    const g = [];
    for (let y = 0; y < N; y++) {
      let row = '';
      for (let x = 0; x < N; x++) {
        const px = x - R + (ox + 0.5) / 8, py = y - R + (oy + 0.5) / 8;
        const sx = cos * px + sin * py + cx, sy = -sin * px + cos * py + cy;
        const bx = Math.floor(sx * k), by = Math.floor(sy * k);
        row += bx < 0 || by < 0 || bx >= W * k || by >= H * k ? EMPTY : big[by][bx];
      }
      g.push(row);
    }
    // Score: area preserved per colour (small features weigh more) + isolated-cell penalty.
    const got = count(g); let score = 0;
    for (const ch of new Set([...Object.keys(want), ...Object.keys(got)])) score += Math.abs((got[ch] || 0) - (want[ch] || 0)) / Math.sqrt(want[ch] || 1);
    for (let y = 1; y < N - 1; y++) for (let x = 1; x < N - 1; x++) {
      const c = g[y][x]; if (c === EMPTY) continue;
      if (g[y - 1][x] !== c && g[y + 1][x] !== c && g[y][x - 1] !== c && g[y][x + 1] !== c) score += 1.5;
    }
    if (!best || score < best.score) best = { score, g, ox, oy };
  }
  const out = best.g;
  // Forward map for placing features analytically: source point (x, y) -> output coordinates.
  out.forward = (x, y) => {
    const dx = x - cx, dy = y - cy;
    return [cos * dx - sin * dy + R - (best.ox + 0.5) / 8, sin * dx + cos * dy + R - (best.oy + 0.5) / 8];
  };
  return out;
}

/** Bresenham line between two cells. */
export function line(x0, y0, x1, y1) {
  const pts = []; let dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1, err = dx + dy;
  for (;;) { pts.push([x0, y0]); if (x0 === x1 && y0 === y1) break; const e2 = 2 * err; if (e2 >= dy) { err += dy; x0 += sx; } if (e2 <= dx) { err += dx; y0 += sy; } }
  return pts;
}
