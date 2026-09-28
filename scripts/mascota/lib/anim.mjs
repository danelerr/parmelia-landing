// Frame composition and export for the mascot animation kit.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { parse, raster, EMPTY } from './pixmap.mjs';

/** brandkit/03-mascota, resolved from this file so fixtures and copies work the same way. */
export const KIT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../brandkit/03-mascota');

export const CANVAS = { w: 48, h: 44 };          // native blocks
export const ANCHOR = { x: 24, y: 42 };          // feet baseline, horizontal centre
export const SCALE = 8;                          // export scale -> 384 x 352 px

// Pieces of the 2026-09-25 edition (48 x 44 canvas); the current animations are composed from them.
export const load = async name => parse(await fs.readFile(path.join(KIT, 'animaciones/piezas-v1', `${name}.txt`), 'utf8'));
export const blank = (w = CANVAS.w, h = CANVAS.h) => Array.from({ length: h }, () => EMPTY.repeat(w));

/** Paint `src` at (x, y); '.' is transparent. `clip(x, y)` may hide cells (masks). */
export function draw(dst, src, x, y, clip) {
  const g = dst.map(r => [...r]);
  src.forEach((row, j) => { for (let i = 0; i < row.length; i++) {
    const ch = row[i], X = x + i, Y = y + j;
    if (ch === EMPTY || Y < 0 || Y >= g.length || X < 0 || X >= g[0].length) continue;
    if (clip && !clip(X, Y)) continue;
    g[Y][X] = ch;
  } });
  return g.map(r => r.join(''));
}
/** Set individual cells: [[x, y, ch], ...] ('.' clears). */
export function cells(rows, list) {
  const g = rows.map(r => [...r]);
  for (const [x, y, ch] of list) if (y >= 0 && y < g.length && x >= 0 && x < g[0].length) g[y][x] = ch;
  return g.map(r => r.join(''));
}
export const region = (rows, x0, y0, x1, y1) => rows.slice(y0, y1 + 1).map(r => r.slice(x0, x1 + 1).padEnd(x1 - x0 + 1, EMPTY));
/** Replace a rectangular region with `patch` (including '.' cells, i.e. not transparent). */
export function patch(rows, p, x, y) {
  const g = rows.map(r => [...r]);
  p.forEach((row, j) => [...row].forEach((ch, i) => { if (g[y + j] && x + i < g[0].length) g[y + j][x + i] = ch; }));
  return g.map(r => r.join(''));
}
/** Remove row `y` (squash) keeping everything above attached: rows above shift down by one. */
export const squashRow = (rows, y) => [rows[0].replace(/./g, EMPTY), ...rows.slice(0, y), ...rows.slice(y + 1)];
/** Duplicate row `y` (stretch): rows above shift up by one (top row dropped). */
export const stretchRow = (rows, y) => [...rows.slice(1, y + 1), rows[y], ...rows.slice(y + 1)];
export const text = s => s.split('\n').filter(l => l.trim().length).map(l => l.replace(/ /g, EMPTY));

/** Write frames, sheets, previews and manifest for one animation. */
export async function exportAnim(anim, outRoot = path.join(KIT, 'animaciones')) {
  const { id, name, playback, frames, note = '', purpose = '' } = anim;
  const dir = path.join(outRoot);
  // Start clean so a shorter sequence never leaves stale frames behind.
  await fs.rm(path.join(dir, 'frames', id), { recursive: true, force: true });
  await fs.rm(path.join(dir, 'frames-1x', id), { recursive: true, force: true });
  await fs.mkdir(path.join(dir, 'frames', id), { recursive: true });
  await fs.mkdir(path.join(dir, 'frames-1x', id), { recursive: true });
  await fs.mkdir(path.join(dir, 'spritesheets'), { recursive: true });
  await fs.mkdir(path.join(dir, 'previews'), { recursive: true });
  await fs.mkdir(path.join(dir, 'manifests'), { recursive: true });
  const bufs = [], meta = [];
  for (const [i, f] of frames.entries()) {
    if (f.rows.length !== CANVAS.h || f.rows.some(r => r.length !== CANVAS.w)) throw new Error(`${id} frame ${i + 1}: canvas must be ${CANVAS.w}x${CANVAS.h}`);
    const n = String(i + 1).padStart(3, '0');
    const big = raster(f.rows, SCALE), one = raster(f.rows, 1);
    const png = await sharp(big.buf, { raw: { width: big.W, height: big.H, channels: 4 } }).png({ compressionLevel: 9 }).toBuffer();
    await fs.writeFile(path.join(dir, 'frames', id, `frame-${n}.png`), png);
    await sharp(one.buf, { raw: { width: one.W, height: one.H, channels: 4 } }).png({ compressionLevel: 9 }).toFile(path.join(dir, 'frames-1x', id, `frame-${n}.png`));
    bufs.push(png);
    meta.push({ index: i, file: `../frames/${id}/frame-${n}.png`, file1x: `../frames-1x/${id}/frame-${n}.png`, durationMs: f.ms });
  }
  const W = CANVAS.w * SCALE, H = CANVAS.h * SCALE;
  // Horizontal strip and a grid (4 columns).
  await sharp({ create: { width: W * bufs.length, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(bufs.map((b, i) => ({ input: b, left: i * W, top: 0 }))).png({ compressionLevel: 9 }).toFile(path.join(dir, 'spritesheets', `${id}-strip.png`));
  const cols = Math.min(4, bufs.length), rowsN = Math.ceil(bufs.length / cols);
  await sharp({ create: { width: W * cols, height: H * rowsN, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(bufs.map((b, i) => ({ input: b, left: (i % cols) * W, top: Math.floor(i / cols) * H }))).png({ compressionLevel: 9 }).toFile(path.join(dir, 'spritesheets', `${id}-grid.png`));
  // Previews loop for review; `playback` in the manifest states the intended product behaviour.
  const delay = frames.map(f => f.ms);
  const half = await Promise.all(frames.map(async f => { const r = raster(f.rows, SCALE / 2); return sharp(r.buf, { raw: { width: r.W, height: r.H, channels: 4 } }).png().toBuffer(); }));
  await sharp(half, { join: { animated: true } }).webp({ loop: 0, delay, lossless: true }).toFile(path.join(dir, 'previews', `${id}.webp`));
  await sharp(half, { join: { animated: true } }).gif({ loop: 0, delay }).toFile(path.join(dir, 'previews', `${id}.gif`));
  const manifest = {
    schemaVersion: 2, id, name, purpose, playback, note,
    grid: { unit: 'block', canvas: { width: CANVAS.w, height: CANVAS.h }, anchor: { ...ANCHOR } },
    export: { scale: SCALE, canvas: { width: W, height: H }, anchor: { x: ANCHOR.x * SCALE + SCALE / 2, y: (ANCHOR.y + 1) * SCALE }, previewScale: SCALE / 2 },
    frameCount: frames.length, totalDurationMs: delay.reduce((a, b) => a + b, 0),
    strip: `../spritesheets/${id}-strip.png`, gridSheet: `../spritesheets/${id}-grid.png`,
    preview: `../previews/${id}.webp`, previewGif: `../previews/${id}.gif`, frames: meta,
  };
  await fs.writeFile(path.join(dir, 'manifests', `${id}.json`), JSON.stringify(manifest, null, 2) + '\n');
  return manifest;
}

/** Contact sheet of all frames at small scale, for review. */
export async function reviewSheet(frames, out, scale = 5) {
  const W = CANVAS.w * scale, H = CANVAS.h * scale, pad = 6;
  const tiles = await Promise.all(frames.map(async f => { const r = raster(f.rows, scale); return sharp(r.buf, { raw: { width: r.W, height: r.H, channels: 4 } }).png().toBuffer(); }));
  const cols = Math.min(6, tiles.length), rowsN = Math.ceil(tiles.length / cols);
  const comps = [];
  tiles.forEach((t, i) => {
    const x = pad + (i % cols) * (W + pad), y = pad + Math.floor(i / cols) * (H + pad + 14);
    comps.push({ input: Buffer.from(`<svg width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#e9e3d9"/><line x1="0" y1="${(ANCHOR.y + 1) * scale}" x2="${W}" y2="${(ANCHOR.y + 1) * scale}" stroke="#0002"/></svg>`), left: x, top: y });
    comps.push({ input: t, left: x, top: y });
    comps.push({ input: Buffer.from(`<svg width="${W}" height="14"><text x="2" y="11" font-family="Menlo" font-size="10">${i + 1} · ${frames[i].ms}ms</text></svg>`), left: x, top: y + H });
  });
  await sharp({ create: { width: pad + cols * (W + pad), height: pad + rowsN * (H + pad + 14), channels: 3, background: '#fff' } }).composite(comps).png().toFile(out);
}
