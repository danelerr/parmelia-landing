// Art rules for the rebuilt mascot: palette only, closed outlines, no stray fragments, canvas and baseline, timings.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { parse, PALETTE, EMPTY } from './lib/pixmap.mjs';
import { CANVAS } from './lib/anim.mjs';
import { TIMING, CANVASES } from './lib/especificacion.mjs';

const OK = new Set([EMPTY, ...PALETTE.map(p => p.ch)]);
const N4 = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const N8 = [...N4, [1, 1], [1, -1], [-1, 1], [-1, -1]];
const FUR = new Set(['o', 's', 'd']);

/** 8-connected components of non-empty cells (diagonal steps are normal in pixel art). */
function components(rows) {
  const H = rows.length, W = rows[0].length, seen = Array.from({ length: H }, () => new Uint8Array(W)), out = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (seen[y][x] || rows[y][x] === EMPTY) continue;
    const st = [[x, y]]; seen[y][x] = 1; let n = 0, x0 = x, x1 = x, y0 = y, y1 = y;
    while (st.length) {
      const [a, b] = st.pop(); n++; x0 = Math.min(x0, a); x1 = Math.max(x1, a); y0 = Math.min(y0, b); y1 = Math.max(y1, b);
      for (const [dx, dy] of N8) { const X = a + dx, Y = b + dy; if (X >= 0 && Y >= 0 && X < W && Y < H && !seen[Y][X] && rows[Y][X] !== EMPTY) { seen[Y][X] = 1; st.push([X, Y]); } }
    }
    out.push({ n, x0, x1, y0, y1 });
  }
  return out;
}
/** Fill cells touching the transparent outside = a gap in the ink outline. */
function openOutline(rows) {
  const H = rows.length, W = rows[0].length, out = Array.from({ length: H }, () => new Uint8Array(W)), st = [];
  for (let x = 0; x < W; x++) st.push([x, 0], [x, H - 1]);
  for (let y = 0; y < H; y++) st.push([0, y], [W - 1, y]);
  while (st.length) { const [x, y] = st.pop(); if (x < 0 || y < 0 || x >= W || y >= H || out[y][x] || rows[y][x] !== EMPTY) continue; out[y][x] = 1; st.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]); }
  const bad = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const ch = rows[y][x]; if (ch === EMPTY || ch === '#') continue;
    if (N4.some(([dx, dy]) => { const X = x + dx, Y = y + dy; return X < 0 || Y < 0 || X >= W || Y >= H || out[Y][X]; })) bad.push([x, y, ch]);
  }
  return bad;
}

/** Directives written as `; clave: valor` lines at the top of a static map. */
export function directives(text) {
  const d = { tapas: [] };
  for (const line of text.replace(/\r/g, '').split('\n').filter(l => l.startsWith(';'))) {
    const m = line.match(/^;\s*([a-z]+):\s*(.*)$/); if (!m) continue;
    const v = m[2].trim().split(/\s+/);
    if (m[1] === 'lienzo') d.lienzo = v[0];
    if (m[1] === 'cabeza') d.cabeza = { tipo: v[0], x: +v[1], y: +v[2], espejo: v[3] === 'espejo' };
    if (m[1] === 'tapa') d.tapas.push({ x: +v[0], y: +v[1], w: +v[2], h: +v[3] });
  }
  return d;
}
/** Palette, closed outline and a single figure: the rules every map follows. */
function baseRules(name, rows, fail, openFilter = () => true) {
  const W = rows[0].length;
  if (rows.some(r => r.length !== W)) fail(`${name}: rows of different length`);
  const bad = [...new Set(rows.join(''))].filter(c => !OK.has(c)); if (bad.length) fail(`${name}: characters outside the palette: ${bad.join('')}`);
  const open = openOutline(rows).filter(openFilter);
  if (open.length) fail(`${name}: ${open.length} fill cells touch the outside (open outline), e.g. ${JSON.stringify(open.slice(0, 3))}`);
  const comps = components(rows);
  if (comps.length !== 1) fail(`${name}: ${comps.length} separate pieces (expected one connected figure)`);
}

/** ESPECIFICACION.md rules for the statics: canvas, margins and ground; thin fur is flagged for review. */
function specRules(name, rows, d, fail, warn) {
  const cv = CANVASES[d.lienzo];
  if (!cv) return fail(`${name}: unknown or missing canvas directive (; lienzo: cabeza|estatico)`);
  const H = rows.length, W = rows[0].length, m = cv.margin;
  if (W !== cv.w || H !== cv.h) fail(`${name}: canvas is ${W}x${H}, the ${d.lienzo} canvas is ${cv.w}x${cv.h}`);
  let low = -1, marginHits = 0;
  rows.forEach((r, y) => [...r].forEach((ch, x) => { if (ch === EMPTY) return; low = Math.max(low, y); if (x < m || y < m || x >= W - m || y >= H - m) marginHits++; }));
  if (marginHits) fail(`${name}: ${marginHits} opaque cells inside the ${m}-cell margin`);
  if (cv.ground !== undefined && low !== cv.ground) fail(`${name}: lowest opaque row is ${low}, the ground is row ${cv.ground}`);
  const at = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? EMPTY : rows[y][x]);
  const thin = [];
  rows.forEach((r, y) => [...r].forEach((ch, x) => {
    if (!FUR.has(ch)) return;
    if ((!FUR.has(at(x - 1, y)) && !FUR.has(at(x + 1, y))) || (!FUR.has(at(x, y - 1)) && !FUR.has(at(x, y + 1)))) thin.push([x, y]);
  }));
  if (thin.length) warn(`${name}: ${thin.length} fur cells in a strip 1 cell wide at ${JSON.stringify(thin.slice(0, 12))}`);
}

/** Map rules only; runs before anything is rendered so a bad map never reaches the kit. */
export async function qaMaps(kit, report = { statics: [], animations: [], failures: [], warnings: [] }) {
  const fail = m => report.failures.push(m), warn = m => report.warnings.push(m);
  // Statics (ESPECIFICACION.md): base rules plus the specification rules.
  const mapDir = path.join(kit, 'modelo/estaticos');
  for (const f of (await fs.readdir(mapDir)).filter(f => f.endsWith('.txt')).sort()) {
    const name = f.replace('.txt', ''), text = await fs.readFile(path.join(mapDir, f), 'utf8'), rows = parse(text);
    baseRules(name, rows, fail);
    specRules(name, rows, directives(text), fail, warn);
    report.statics.push({ name, cells: `${rows[0].length}x${rows.length}`, colours: [...new Set(rows.join('').replace(/\./g, ''))].join('') });
  }
  // Pieces of the 2026-09-25 edition, used only by the current animations.
  const v1 = path.join(kit, 'animaciones/piezas-v1');
  for (const f of (await fs.readdir(v1)).filter(f => f.endsWith('.txt')).sort()) {
    const name = f.replace('.txt', ''), rows = parse(await fs.readFile(path.join(v1, f), 'utf8'));
    // Deliberate v1 exception: on the conveyor rail the gold dashes cast a dark-orange shade on its bottom edge.
    baseRules(`piezas-v1/${name}`, rows, fail, ([, y, ch]) => !(name === 'body-conveyor' && ch === 'n' && y === rows.length - 1));
  }
  return report;
}

/** Rules for the rendered animations. */
export async function qaAnimations(kit, report = { statics: [], animations: [], failures: [], warnings: [] }) {
  const fail = m => report.failures.push(m), warn = m => report.warnings.push(m);
  const colour = new Map(PALETTE.map(p => [p.rgb.join(','), p.ch]));
  const mdir = path.join(kit, 'animaciones/manifests');
  for (const f of (await fs.readdir(mdir)).filter(f => f.endsWith('.json')).sort()) {
    const m = JSON.parse(await fs.readFile(path.join(mdir, f), 'utf8')), id = m.id;
    const sum = m.frames.reduce((a, b) => a + b.durationMs, 0);
    if (m.frameCount !== m.frames.length || sum !== m.totalDurationMs) fail(`${id}: frame count or duration mismatch`);
    if (m.frames.some(fr => !(fr.durationMs >= TIMING.minFrameMs))) fail(`${id}: a frame shorter than ${TIMING.minFrameMs} ms`);
    const prev = await sharp(path.join(kit, 'animaciones/previews', `${id}.webp`), { animated: true }).metadata();
    if (prev.pages !== m.frameCount || prev.delay.reduce((a, b) => a + b, 0) !== sum) fail(`${id}: preview frames or timing differ from the manifest (identical consecutive frames?)`);
    let empty = 0, edge = 0, tiny = 0; const bottoms = new Set();
    for (const fr of m.frames) {
      const { data, info } = await sharp(path.resolve(mdir, fr.file1x)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      if (info.width !== CANVAS.w || info.height !== CANVAS.h) fail(`${id}: 1x frame is ${info.width}x${info.height}`);
      const rows = [];
      for (let y = 0; y < info.height; y++) {
        let r = '';
        for (let x = 0; x < info.width; x++) {
          const i = (y * info.width + x) * 4;
          if (data[i + 3] === 0) { r += EMPTY; continue; }
          const ch = colour.get(`${data[i]},${data[i + 1]},${data[i + 2]}`);
          if (!ch || data[i + 3] !== 255) { fail(`${id}: off-palette or semi-transparent pixel at ${x},${y}`); r += EMPTY; } else r += ch;
        }
        rows.push(r);
      }
      const comps = components(rows);
      if (!comps.length) { empty++; continue; }
      bottoms.add(comps.reduce((a, b) => (b.n > a.n ? b : a)).y1);
      if (comps.some(c => c.x0 === 0 || c.y0 === 0 || c.x1 === CANVAS.w - 1 || c.y1 === CANVAS.h - 1)) edge++;
      tiny += comps.filter(c => c.n <= 2).length;
    }
    if (empty) fail(`${id}: ${empty} empty frames`);
    if (edge) fail(`${id}: ${edge} frames touch the canvas edge`);
    if (tiny) warn(`${id}: ${tiny} fragments of 1-2 cells`);
    report.animations.push({ id, frames: m.frameCount, ms: sum, playback: m.playback, baselineRows: [...bottoms].sort().join('/') });
  }
  return report;
}
