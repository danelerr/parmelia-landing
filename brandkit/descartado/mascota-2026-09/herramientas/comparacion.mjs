// Internal review page (qa/comparacion.html): every static next to its AI 1 original, then the animations
// next to the previous AI material kept in qa/antes. Also writes qa/estaticos-ia1-vs-nuevo.png (all pairs on one sheet).
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { parse, raster, trim } from './lib/pixmap.mjs';
import { ORIGINALES } from './originales.mjs';

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const exists = f => fs.access(f).then(() => true, () => false);
const png = (rows, k) => { const r = raster(rows, k); return sharp(r.buf, { raw: { width: r.W, height: r.H, channels: 4 } }).png().toBuffer(); };

export async function writeComparison(kit) {
  const motion = JSON.parse(await fs.readFile(path.join(kit, 'animaciones/manifest.json'), 'utf8'));
  const statics = (await fs.readdir(path.join(kit, 'estaticos'))).filter(f => f.endsWith('.png') && !f.includes('-oscuro')).sort().map(f => f.replace('.png', ''));
  // Crops of the AI 1 sheets, byte-for-byte pixels of the originals.
  for (const dir of ['qa/ia1', 'qa/nuevo']) { await fs.rm(path.join(kit, dir), { recursive: true, force: true }); await fs.mkdir(path.join(kit, dir), { recursive: true }); }
  const pairs = [];
  for (const n of statics) {
    const o = ORIGINALES[n]; if (!o) throw new Error(`No AI 1 original registered for ${n}`);
    const [left, top, width, height] = o.caja;
    const crop = await sharp(path.join(kit, '../06-originales', o.hoja)).extract({ left, top, width, height }).png().toBuffer();
    await fs.writeFile(path.join(kit, 'qa/ia1', `${n}.png`), crop);
    const art = trim(parse(await fs.readFile(path.join(kit, 'modelo/estaticos', `${n}.txt`), 'utf8')));
    const k = Math.max(1, Math.floor(256 / art.length));
    const mine = await png(art, k), mh = art.length * k;
    await fs.writeFile(path.join(kit, 'qa/nuevo', `${n}.png`), mine);          // trimmed, same scale as the sheet
    const theirs = await sharp(crop).resize({ height: mh, kernel: 'nearest' }).png().toBuffer();
    pairs.push({ n, theirs, mine, tw: (await sharp(theirs).metadata()).width, mw: art[0].length * k, h: mh });
  }
  // One sheet with every pair: original left, new right; heads first, then poses.
  const order = [...pairs.filter(p => p.n.startsWith('head-')), ...pairs.filter(p => p.n.startsWith('body-'))];
  const gap = 24, inner = 12, perRow = 2, rowW = [], comps = [];
  let y = gap;
  for (let i = 0; i < order.length; i += perRow) {
    const row = order.slice(i, i + perRow); let x = gap; const hmax = Math.max(...row.map(p => p.h));
    for (const p of row) {
      comps.push({ input: p.theirs, left: x, top: y + (hmax - p.h) }); x += p.tw + inner;
      comps.push({ input: p.mine, left: x, top: y + (hmax - p.h) }); x += p.mw + gap * 2;
    }
    rowW.push(x); y += hmax + gap;
  }
  await sharp({ create: { width: Math.max(...rowW), height: y, channels: 4, background: '#FFF8F0' } }).composite(comps).png().toFile(path.join(kit, 'qa/estaticos-ia1-vs-nuevo.png'));

  const before = async (file, label) => (await exists(path.join(kit, 'qa/antes/animaciones', file)))
    ? `<figure><img src="antes/animaciones/${file}" alt="${esc(label)}, versión anterior" loading="lazy"><figcaption>Antes (IA)</figcaption></figure>`
    : '<figure class="none"><figcaption>Sin versión anterior</figcaption></figure>';
  const staticCards = order.map(p => `<article><h3>${p.n}</h3><div class="pair"><figure><img class="orig" src="ia1/${p.n}.png" alt="${p.n}, original de la IA 1" loading="lazy"><figcaption>IA 1 · original</figcaption></figure><figure class="new"><img src="nuevo/${p.n}.png" alt="${p.n}, versión actual" loading="lazy"><figcaption>Actual · pixel art, recortado a la misma escala</figcaption></figure></div></article>`);
  const cards = [];
  for (const a of motion.animations) {
    cards.push(`<article><h3>${esc(a.name)}<small>${a.id}</small></h3><div class="pair">${await before(`${a.id}.webp`, a.name)}<figure class="new"><img src="../animaciones/previews/${a.id}.webp" alt="${esc(a.name)}, versión actual" loading="lazy"><figcaption>Actual · ${a.frameCount} frames · ${a.totalDurationMs} ms · ${a.playback === 'loop' ? 'bucle' : 'una vez (aquí en bucle)'}</figcaption></figure></div><p>${esc(a.purpose)}</p></article>`);
  }
  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mascota frente a la IA 1</title>
<style>
:root{--ink:#0b0b0f;--milk:#fff8f0;--paper:#fffdf9;--oat:#eee4d8;--stone:#6f665e}
*{box-sizing:border-box}body{margin:0;background:var(--milk);color:var(--ink);font:15px/1.5 system-ui,sans-serif}
main{max-width:1280px;margin:0 auto;padding:32px 16px 80px}h1{font-size:2.2rem;margin:0 0 8px}h2{margin:48px 0 8px;font-size:1.5rem}.lead{color:var(--stone);max-width:75ch}
nav a{margin-right:16px;color:var(--ink)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(520px,100%),1fr));gap:16px;margin-top:16px}
article{background:var(--paper);border:1px solid var(--oat);padding:14px}h3{margin:0 0 10px;font-size:1rem;display:flex;justify-content:space-between;gap:8px}h3 small{font-weight:400;color:var(--stone);font-family:ui-monospace,monospace}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:10px}figure{margin:0}
figure img{width:100%;height:240px;object-fit:contain;image-rendering:pixelated;background-color:#fffdf9;background-image:linear-gradient(45deg,#eee4d8 25%,transparent 25%),linear-gradient(-45deg,#eee4d8 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#eee4d8 75%),linear-gradient(-45deg,transparent 75%,#eee4d8 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0}
figure img.orig{image-rendering:auto}.none{display:grid;place-items:center;height:240px;background:var(--oat)}
figcaption{font-size:.75rem;color:var(--stone);margin-top:4px}.new figcaption{color:var(--ink);font-weight:600}article p{font-size:.8rem;color:var(--stone);margin:8px 0 0}
</style>
</head>
<body><main>
<h1>Mascota frente a la IA 1</h1>
<p class="lead">Página interna de revisión (carpeta <code>qa</code>, fuera del ZIP de entrega). En los estáticos, la izquierda es el recorte exacto de las hojas originales de la IA 1 (<code>06-originales</code>) y la derecha, la pieza actual del kit. Todas las parejas están en la hoja <a href="estaticos-ia1-vs-nuevo.png">estaticos-ia1-vs-nuevo.png</a>. Las animaciones siguen siendo las de la edición 2026-09-25 y se comparan con el material anterior de <code>qa/antes</code>.</p>
<nav><a href="#estaticos">Estáticos (${statics.length})</a><a href="#animaciones">Animaciones (${motion.animationCount})</a></nav>
<h2 id="estaticos">Estáticos</h2><div class="grid">${staticCards.join('')}</div>
<h2 id="animaciones">Animaciones</h2><div class="grid">${cards.join('')}</div>
</main></body></html>
`;
  await fs.writeFile(path.join(kit, 'qa/comparacion.html'), html);
}
