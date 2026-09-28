/**
 * Visual guides for ESPECIFICACION.md, drawn from lib/especificacion.mjs and the approved symbol maps.
 * Output: 03-mascota/modelo/guias/{lienzos,cabeza-frente}.svg (plain SVG, deterministic bytes).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { parse, HEX, EMPTY } from './lib/pixmap.mjs';
import { CANVASES } from './lib/especificacion.mjs';

const FONT = `font-family="'Recursive Variable', Recursive, ui-monospace, Menlo, monospace"`;
const C = { ink: '#0B0B0F', paper: '#FFFDF9', grid: '#EEE4D8', major: '#D6CABB', fire: '#F85239', shadow: '#CF3433', info: '#2F7FD8', growth: '#2E9E68', pending: '#E2A21F', muted: '#665E57' };

const text = (x, y, s, { size = 13, weight = 450, fill = C.ink, anchor = 'start' } = {}) =>
  `<text x="${x}" y="${y}" ${FONT} font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${s}</text>`;
const rect = (x, y, w, h, attrs) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${attrs}/>`;

/** Pixel art as horizontal runs of one colour. */
function pixels(rows, ox, oy, S) {
  const out = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x]; let n = 1;
      while (row[x + n] === ch) n++;
      if (ch !== EMPTY) out.push(rect(ox + x * S, oy + y * S, n * S, S, `fill="${HEX[ch]}"`));
      x += n;
    }
  });
  return out.join('');
}

function grid(ox, oy, w, h, S, every = 8) {
  const lines = [];
  for (let i = 0; i <= w; i++) lines.push(`<line x1="${ox + i * S}" y1="${oy}" x2="${ox + i * S}" y2="${oy + h * S}" stroke="${i % every ? C.grid : C.major}" stroke-width="1"/>`);
  for (let j = 0; j <= h; j++) lines.push(`<line x1="${ox}" y1="${oy + j * S}" x2="${ox + w * S}" y2="${oy + j * S}" stroke="${j % every ? C.grid : C.major}" stroke-width="1"/>`);
  return lines.join('');
}

function margin(ox, oy, w, h, m, S) {
  if (!m) return '';
  const f = `fill="${C.shadow}" fill-opacity="0.16"`;
  return rect(ox, oy, w * S, m * S, f) + rect(ox, oy + (h - m) * S, w * S, m * S, f)
    + rect(ox, oy + m * S, m * S, (h - 2 * m) * S, f) + rect(ox + (w - m) * S, oy + m * S, m * S, (h - 2 * m) * S, f);
}

function groundAndAxis(ox, oy, c, S) {
  const gy = oy + (c.ground + 1) * S, ax = ox + c.axisX * S;
  return rect(ox, gy, c.w * S, (c.h - c.ground - 1) * S, `fill="${C.major}" fill-opacity="0.45"`)
    + `<line x1="${ox}" y1="${gy}" x2="${ox + c.w * S}" y2="${gy}" stroke="${C.fire}" stroke-width="3"/>`
    + `<line x1="${ax}" y1="${oy}" x2="${ax}" y2="${oy + c.h * S}" stroke="${C.info}" stroke-width="2" stroke-dasharray="6 5"/>`
    + `<circle cx="${ax}" cy="${gy}" r="5" fill="${C.paper}" stroke="${C.ink}" stroke-width="2"/>`;
}

const dashed = (x, y, w, h, colour, S, ox, oy) => rect(ox + x * S, oy + y * S, w * S, h * S, `fill="none" stroke="${colour}" stroke-width="2" stroke-dasharray="7 5"`);

function canvasFrame(ox, oy, c, S, title, sub) {
  return rect(ox, oy, c.w * S, c.h * S, `fill="${C.paper}"`) + grid(ox, oy, c.w, c.h, S)
    + rect(ox, oy, c.w * S, c.h * S, `fill="none" stroke="${C.ink}" stroke-width="2"`)
    + text(ox, oy + c.h * S + 24, title, { size: 15, weight: 760 }) + text(ox, oy + c.h * S + 43, sub, { size: 12, fill: C.muted });
}

export function lienzosSvg(symbol, head, pose) {
  const S = 3, top = 76, gap = 40;
  const c32 = CANVASES.simbolo, c64 = CANVASES.cabeza, c96 = CANVASES.estatico, c144 = CANVASES.animacion;
  let x = 24; const parts = [];
  parts.push(text(24, 32, 'Lienzos del personaje y del logo', { size: 22, weight: 760 }));
  parts.push(text(24, 54, 'El personaje es el original de la IA 1 a doble resolución · el logo es una marca simplificada aparte · dibujado aquí a ×3', { size: 13, fill: C.muted }));
  const at = (rows, cv) => ({ x: Math.floor((cv.w - rows[0].length) / 2), y: cv.ground !== undefined ? cv.ground - rows.length + 1 : Math.floor((cv.h - rows.length) / 2) });
  parts.push(canvasFrame(x, top, c32, S, '32 × 32', 'símbolo (logo)') + margin(x, top, c32.w, c32.h, c32.margin, S) + pixels(symbol, x + 1 * S, top + 4 * S, S));
  x += c32.w * S + gap;
  { const p = at(head, c64); parts.push(canvasFrame(x, top, c64, S, '64 × 64', 'cabezas') + margin(x, top, c64.w, c64.h, c64.margin, S) + pixels(head, x + p.x * S, top + p.y * S, S)); }
  x += c64.w * S + gap;
  { const p = at(pose, c96); parts.push(canvasFrame(x, top, c96, S, '96 × 96', 'estáticos · suelo en la fila 92 · eje en x = 48') + margin(x, top, c96.w, c96.h, c96.margin, S) + groundAndAxis(x, top, c96, S) + pixels(pose, x + p.x * S, top + p.y * S, S)); }
  x += c96.w * S + gap;
  { const p = at(pose, c96); parts.push(canvasFrame(x, top, c144, S, '144 × 96', 'animaciones · suelo en la fila 92 · eje en x = 72') + margin(x, top, c144.w, c144.h, c144.margin, S) + groundAndAxis(x, top, c144, S)
      + dashed(c144.staticOffsetX, 0, 96, 96, C.growth, S, x, top) + pixels(pose, x + (c144.staticOffsetX + p.x) * S, top + p.y * S, S)
      + text(x + (c144.staticOffsetX + 1) * S, top + 5 * S, 'zona = estático 96 × 96', { size: 11, fill: C.growth })); }
  const width = x + c144.w * S + 24, legendTop = top + 96 * S + 78;
  const legend = [
    [rect(0, -11, 22, 14, `fill="${C.shadow}" fill-opacity="0.16"`), 'margen transparente obligatorio'],
    [`<line x1="0" y1="-4" x2="22" y2="-4" stroke="${C.fire}" stroke-width="3"/>`, 'suelo: la fila 92 es la última de los pies'],
    [`<line x1="0" y1="-4" x2="22" y2="-4" stroke="${C.info}" stroke-width="2" stroke-dasharray="6 5"/>`, 'eje central del personaje'],
    [rect(0, -11, 22, 14, `fill="none" stroke="${C.growth}" stroke-width="2" stroke-dasharray="7 5"`), 'la animación contiene el estático sin moverlo'],
  ];
  const legendParts = legend.map(([mark, label], i) =>
    `<g transform="translate(${24 + (i % 2) * 460} ${legendTop + Math.floor(i / 2) * 28})">${mark}${text(30, 0, label, { size: 12 })}</g>`);
  const height = legendTop + 56;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges">`
    + `<title>Lienzos del personaje y del logo de GatoPago</title>${rect(0, 0, width, height, `fill="#FFF8F0"`)}${parts.join('')}${legendParts.join('')}</svg>\n`;
}

export async function writeGuides(kit) {
  const read = async f => parse(await fs.readFile(f, 'utf8'));
  const symbol = await read(path.join(kit, '../02-logos/modelo/simbolo.txt'));
  const trim = rows => { const ys = rows.map((r, i) => (/[^.]/.test(r) ? i : -1)).filter(i => i >= 0); const xs = rows.flatMap(r => [...r].map((c, i) => (c !== EMPTY ? i : -1)).filter(i => i >= 0)); const x0 = Math.min(...xs), x1 = Math.max(...xs); return rows.slice(ys[0], ys.at(-1) + 1).map(r => r.slice(x0, x1 + 1)); };
  const head = trim(await read(path.join(kit, 'modelo/estaticos/head-neutral.txt')));
  const pose = trim(await read(path.join(kit, 'modelo/estaticos/body-sitting.txt')));
  const dir = path.join(kit, 'modelo/guias');
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'lienzos.svg'), lienzosSvg(symbol, head, pose));
}
