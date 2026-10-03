// Character-map pixel art (the symbol and favicons in 02-logos/modelo): palette, parsing and export.
import sharp from 'sharp';

export const PALETTE = [
  { ch: '#', name: 'ink', hex: '#0B0B0F' },
  { ch: 'o', name: 'cat-fire', hex: '#F85239' },
  { ch: 's', name: 'cat-shadow', hex: '#CF3433' },
  { ch: 'd', name: 'cat-deep', hex: '#9F292E' },
  { ch: 'w', name: 'milk', hex: '#FFF8F0' },
  { ch: 'c', name: 'card-cream', hex: '#FCECDD' },
  { ch: 'y', name: 'box-gold', hex: '#FAB23A' },
  { ch: 'n', name: 'box-shade', hex: '#DC7C17' },
  { ch: 'b', name: 'tape-brown', hex: '#93421A' },
  { ch: 'g', name: 'rail-slate', hex: '#434F68' },
  { ch: 'p', name: 'tongue-pink', hex: '#F0908A' },
  // Brand state tokens, used only by animation props.
  { ch: 'e', name: 'growth', hex: '#71D5A1' },
  { ch: 'i', name: 'info', hex: '#79B9FF' },
  { ch: 'l', name: 'pending', hex: '#F6C65B' },
];
for (const p of PALETTE) p.rgb = [1, 3, 5].map(i => parseInt(p.hex.slice(i, i + 2), 16));
export const HEX = Object.fromEntries(PALETTE.map(p => [p.ch, p.hex]));
export const EMPTY = '.';

export const parse = text => text.replace(/\r/g, '').split('\n').filter(l => l.length && !l.startsWith(';'));
export const size = rows => ({ w: Math.max(...rows.map(r => r.length)), h: rows.length });
export const pad = (rows, w) => rows.map(r => r.padEnd(w, EMPTY));
export const blank = (w, h) => Array.from({ length: h }, () => EMPTY.repeat(w));
export const flipX = rows => rows.map(r => [...r].reverse().join(''));

/** Paint `src` onto `dst` at (x, y); '.' in src is transparent. Returns new rows. */
export function stamp(dst, src, x, y, { mask } = {}) {
  const out = dst.map(r => [...r]);
  src.forEach((row, j) => [...row].forEach((ch, i) => {
    const X = x + i, Y = y + j;
    if (ch === EMPTY || Y < 0 || Y >= out.length || X < 0 || X >= out[0].length) return;
    if (mask && !mask(X, Y)) return;
    out[Y][X] = ch;
  }));
  return out.map(r => r.join(''));
}

/** Replace characters inside a rectangle of `rows` with the given map (edit in place semantics). */
export function crop(rows, x, y, w, h) {
  return rows.slice(y, y + h).map(r => r.slice(x, x + w).padEnd(w, EMPTY));
}
export function bbox(rows) {
  let x0 = Infinity, y0 = Infinity, x1 = -1, y1 = -1;
  rows.forEach((r, y) => [...r].forEach((ch, x) => { if (ch !== EMPTY) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); } }));
  return { x0, y0, x1, y1, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}
export const trim = rows => { const b = bbox(rows); return crop(rows, b.x0, b.y0, b.w, b.h); };

/** RGBA buffer at `scale` px per cell. */
export function raster(rows, scale = 1) {
  const { w, h } = size(rows), W = w * scale, H = h * scale, buf = Buffer.alloc(W * H * 4);
  rows.forEach((r, y) => [...r].forEach((ch, x) => {
    const hex = HEX[ch]; if (!hex) return;
    const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
    for (let yy = 0; yy < scale; yy++) for (let xx = 0; xx < scale; xx++) {
      const i = ((y * scale + yy) * W + x * scale + xx) * 4; buf[i] = c[0]; buf[i + 1] = c[1]; buf[i + 2] = c[2]; buf[i + 3] = 255;
    }
  }));
  return { buf, W, H };
}
export async function png(rows, scale = 1, file) {
  const { buf, W, H } = raster(rows, scale);
  const img = sharp(buf, { raw: { width: W, height: H, channels: 4 } }).png({ compressionLevel: 9, palette: false });
  return file ? img.toFile(file) : img.toBuffer();
}

/** SVG with one path per colour; horizontal runs merged. */
export function svg(rows, title) {
  const { w, h } = size(rows), paths = {};
  rows.forEach((row, y) => {
    let x = 0;
    while (x < w) {
      const ch = row[x] ?? EMPTY; let e = x; while (e < w && (row[e] ?? EMPTY) === ch) e++;
      if (HEX[ch]) (paths[ch] ??= []).push(`M${x} ${y}h${e - x}v1h-${e - x}z`);
      x = e;
    }
  });
  const body = PALETTE.filter(p => paths[p.ch]).map(p => `  <path fill="${p.hex}" d="${paths[p.ch].join('')}"/>`).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges"${title ? ` role="img" aria-label="${title}"` : ''}>\n${body}\n</svg>\n`;
}

/** Version for dark backgrounds: a 1-block Milk border around the silhouette, 8-connected. */
export function borde(rows, ch = 'w') {
  const H = rows.length, W = rows[0].length, at = (x, y) => (x >= 0 && y >= 0 && x < W && y < H ? rows[y][x] : EMPTY);
  return rows.map((r, y) => [...r].map((c, x) => {
    if (c !== EMPTY) return c;
    for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) if (at(x + i, y + j) !== EMPTY) return ch;
    return EMPTY;
  }).join(''));
}
export const usedColors = rows => [...new Set(rows.join('').replace(/\./g, ''))];

/** Set a rectangle to transparent (stamp cannot, since '.' is its transparent colour). */
export function clear(rows, x, y, w, h) {
  return rows.map((r, j) => j < y || j >= y + h ? r : [...r].map((ch, i) => (i >= x && i < x + w ? EMPTY : ch)).join(''));
}
