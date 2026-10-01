/**
 * Bring a static edited in a pixel editor (Aseprite, LibreSprite, Piskel...) back into its canonical map.
 * Usage: npm run brandkit:importar -- <file.png> [name] [--aproximar] [--simular]
 * The PNG is the static at any whole scale (x1, x4, x8...) in the colours of modelo/paleta.gpl. Nothing is written
 * unless every cell is one flat palette colour and the new map passes the map QA; then run brandkit:mascota and
 * brandkit:build. --aproximar snaps colours within a small distance of the palette; --simular only reports.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { KIT } from './lib/anim.mjs';
import { PALETTE, EMPTY, parse } from './lib/pixmap.mjs';
import { CANVASES } from './lib/especificacion.mjs';
import { directives, qaStatic } from './qa.mjs';

const NEAR = 30; // RGB distance accepted by --aproximar (anti-aliased or colour-managed exports stay rejected)
const hex = ([r, g, b]) => '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
const nearest = rgb => PALETTE.map(p => ({ p, d: Math.hypot(p.rgb[0] - rgb[0], p.rgb[1] - rgb[1], p.rgb[2] - rgb[2]) })).sort((a, b) => a.d - b.d)[0];

export async function importPng(file, name = path.basename(file, '.png'), { approximate = false, kit = KIT } = {}) {
  if (name.endsWith('-oscuro')) throw new Error(`${name}: edit the normal version; the dark-background one is generated from it`);
  const mapFile = path.join(kit, 'modelo/estaticos', `${name}.txt`);
  const text = await fs.readFile(mapFile, 'utf8').catch(() => { throw new Error(`No static map named ${name} in modelo/estaticos`); });
  const cv = CANVASES[directives(text).lienzo];
  if (!cv) throw new Error(`${name}: the map has no canvas directive (; lienzo: cabeza|estatico)`);
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const k = info.width / cv.w;
  if (!Number.isInteger(k) || info.height !== cv.h * k) throw new Error(`${name}: the PNG is ${info.width}x${info.height}; expected the ${cv.w}x${cv.h} canvas at a whole scale (x1 = ${cv.w}x${cv.h}, x4 = ${cv.w * 4}x${cv.h * 4}...)`);
  const errors = { mixed: [], alpha: [], colour: [] }, snapped = new Map(), rows = [];
  const px = (x, y) => { const i = (y * info.width + x) * 4; return [data[i], data[i + 1], data[i + 2], data[i + 3]]; };
  for (let cy = 0; cy < cv.h; cy++) {
    let row = '';
    for (let cx = 0; cx < cv.w; cx++) {
      const first = px(cx * k, cy * k);
      let flat = true;
      for (let y = cy * k; y < (cy + 1) * k && flat; y++) for (let x = cx * k; x < (cx + 1) * k; x++) if (px(x, y).some((v, i) => v !== first[i])) { flat = false; break; }
      if (!flat) { errors.mixed.push([cx, cy]); row += EMPTY; continue; }
      if (first[3] === 0) { row += EMPTY; continue; }
      if (first[3] !== 255) { errors.alpha.push([cx, cy]); row += EMPTY; continue; }
      const { p, d } = nearest(first);
      if (d > 0 && !(approximate && d <= NEAR)) { errors.colour.push([cx, cy, hex(first), p]); row += EMPTY; continue; }
      if (d > 0) snapped.set(hex(first), p);
      row += p.ch;
    }
    rows.push(row);
  }
  const problems = [];
  if (errors.mixed.length) problems.push(`${errors.mixed.length} cells mix several colours (not a whole-scale export, or smoothed), e.g. ${JSON.stringify(errors.mixed.slice(0, 5))}`);
  if (errors.alpha.length) problems.push(`${errors.alpha.length} semi-transparent cells, e.g. ${JSON.stringify(errors.alpha.slice(0, 5))}`);
  if (errors.colour.length) problems.push(`${errors.colour.length} cells outside the palette, e.g. ${errors.colour.slice(0, 5).map(([x, y, h, p]) => `${x},${y} ${h} (nearest ${p.name} ${p.hex})`).join('; ')}${approximate ? '' : ' — use --aproximar only if these are the palette colours slightly shifted by the editor'}`);
  if (problems.length) throw new Error(`${name}: not imported.\n- ${problems.join('\n- ')}`);
  // Same map text: the ; directives stay, the cells are replaced.
  const newText = [...text.replace(/\r/g, '').split('\n').filter(l => l.startsWith(';')), ...rows].join('\n') + '\n';
  const failures = [], warnings = [];
  qaStatic(name, newText, m => failures.push(m), m => warnings.push(m));
  const before = parse(text), changed = [];
  rows.forEach((r, y) => [...r].forEach((c, x) => { if (before[y]?.[x] !== c) changed.push([x, y]); }));
  const box = changed.length ? { x0: Math.min(...changed.map(c => c[0])), y0: Math.min(...changed.map(c => c[1])), x1: Math.max(...changed.map(c => c[0])), y1: Math.max(...changed.map(c => c[1])) } : null;
  return { name, mapFile, text: newText, scale: k, changed: changed.length, box, snapped: [...snapped].map(([h, p]) => `${h} -> ${p.name} ${p.hex}`), failures, warnings };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2), flags = new Set(args.filter(a => a.startsWith('--'))), [file, name] = args.filter(a => !a.startsWith('--'));
  if (!file) { console.error('Usage: npm run brandkit:importar -- <file.png> [name] [--aproximar] [--simular]'); process.exit(2); }
  try {
    const r = await importPng(path.resolve(file), name, { approximate: flags.has('--aproximar') });
    console.log(`${r.name}: x${r.scale} PNG, ${r.changed} cells changed${r.box ? ` in ${r.box.x0},${r.box.y0}..${r.box.x1},${r.box.y1}` : ''}`);
    for (const s of r.snapped) console.log(`  snapped ${s}`);
    for (const w of r.warnings) console.log(`  review: ${w}`);
    if (r.failures.length) { console.error(`Map QA failed; ${path.relative(process.cwd(), r.mapFile)} was not changed:\n${r.failures.join('\n')}`); process.exit(1); }
    if (flags.has('--simular')) console.log('Dry run (--simular): nothing was written.');
    else if (r.changed) { await fs.writeFile(r.mapFile, r.text); console.log(`Wrote ${path.relative(process.cwd(), r.mapFile)}. Next: npm run brandkit:mascota && npm run brandkit:build`); }
    else console.log('The map already matches; nothing to write.');
  } catch (e) { console.error(e.message); process.exit(1); }
}
