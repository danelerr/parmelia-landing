/** Package existing brand assets without redrawing, cropping or recoloring them. */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { appRoot, files, inside, removeWorkdir, slash } from './brandkit/paths.mjs';
import { verifyKit } from './verify-brandkit.mjs';
import { symbolFiles } from './brandkit/simbolo.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const currentKit = path.join(root, 'brandkit');
let kit;
const app = await appRoot();
const provenance = new Map();
const transforms = new Map();
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function target(relative) {
  return inside(kit, relative);
}
async function write(relative, data) {
  const dest = target(relative);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, data);
}
async function copy(source, relative, label) {
  const dest = target(relative);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  let bytes = await fs.readFile(source);
  if (!relative.startsWith('02-logos/pwa/') && /\.(md|txt|css|ts|astro|json|svg|webmanifest)$/i.test(source)) {
    bytes = Buffer.from(bytes.toString('utf8').replace(/\r\n/g, '\n'));
    transforms.set(relative, 'lf');
  }
  await fs.writeFile(dest, bytes);
  provenance.set(relative, label || `landing/${slash(path.relative(root, source))}`);
}

const originalNames = ['d54017bf-565f-49e0-8192-bd0f47bfc050.png','spritesmeli1.png','spritesmeli2.png',
  'Image Aug 19, 2026, 01_47_20 AM (1).png', ...[2,3,4,5].map(i => `Image Aug 19, 2026, 01_47_21 AM (${i}).png`)];
const documentNames = ['gatopago-rebranding-maestro-2026.md','gatopago-plan-marca-experiencia-2026.md','gatopago_nueva_narrativa_contexto_completo_2026-08-18.txt'];
const publicNames = ['og.png'];
const pwaNames = ['icon-192.png','icon-512.png','apple-touch-icon.png','manifest.webmanifest'];
const required = [
  ...publicNames.map(name=>path.join(root,'public',name)),
  ...documentNames.map(name=>path.join(root,'documentacion/nuevos',name)),
  ...['src/styles/rebrand.css','src/styles/global.css','src/components/CatGlyph.astro','src/components/MeliSprite.astro','src/config/brand.ts','scripts/brandkit/catalogo.html'].map(name=>path.join(root,name)),
  ...originalNames.map(name=>path.join(currentKit,'06-originales',name)),
  ...pwaNames.map(name=>path.join(app ? path.join(app,'client/public') : path.join(currentKit,'02-logos/pwa'),name)),
  ...['README.md','CONTROL-DE-CALIDAD.md','02-logos/modelo/simbolo.txt','02-logos/modelo/simbolo-16.txt','03-mascota/animaciones/manifest.json','03-mascota/modelo/paleta.json','04-tipografia/recursive/full.css','04-tipografia/recursive/LICENSE.txt'].map(name=>path.join(currentKit,name)),
];
const missing = [];
for(const file of required) {
  try { if(!(await fs.stat(file)).isFile()) missing.push(file); } catch { missing.push(file); }
}
if(missing.length) throw new Error(`Preflight failed; kit was not modified. Missing files:\n${missing.join('\n')}`);
if((await fs.lstat(currentKit)).isSymbolicLink()) throw new Error('The canonical kit cannot be a symlink');
await files(currentKit); // Reject symbolic links before copying or replacing the directory.
for(const dir of ['03-mascota/modelo/estaticos','03-mascota/estaticos','03-mascota/animaciones/frames','03-mascota/animaciones/manifests','03-mascota/animaciones/previews','03-mascota/animaciones/spritesheets','04-tipografia/recursive/files']) await files(path.join(currentKit,dir));
const fontCssPreflight = await fs.readFile(path.join(currentKit,'04-tipografia/recursive/full.css'),'utf8');
for(const match of fontCssPreflight.matchAll(/url\(\.\/([^)]*)\)/g)) await fs.access(inside(path.join(currentKit,'04-tipografia/recursive'),match[1]));

async function fingerprint(dir) {
  const digest = crypto.createHash('sha256');
  for(const file of await files(dir)) {
    digest.update(slash(path.relative(dir,file))+'\0');
    digest.update(crypto.createHash('sha256').update(await fs.readFile(file)).digest());
  }
  return digest.digest('hex');
}
const lockPath = path.join(root,'.brandkit-build.lock');
const lock = await fs.open(lockPath,'wx');
let work, keepWork = false;
try {
const initialFingerprint = await fingerprint(currentKit);
work = await fs.mkdtemp(path.join(root,'.brandkit-work-'));
kit = path.join(work,'staged');
await fs.cp(currentKit,kit,{recursive:true});

// Symbol and web icons: generated from the approved pixel maps (02-logos/modelo), not copied from the landing.
for (const [relative, bytes] of Object.entries(await symbolFiles(
  await fs.readFile(target('02-logos/modelo/simbolo.txt'), 'utf8'), await fs.readFile(target('02-logos/modelo/simbolo-16.txt'), 'utf8')))) {
  await write(relative, bytes);
}
if (app) for (const name of pwaNames) {
  await copy(path.join(app, 'client/public', name), `02-logos/pwa/${name}`, `app/client/public/${name}`);
}
// The mascot (maps, statics, animations), PWA defaults, originals and licensed font files are canonical in Git.
// Mascot art is regenerated from 03-mascota/modelo with `npm run brandkit:mascota`, never copied from the landing.
await write('04-tipografia/uso.css', `@import url('./recursive/full.css');
.gp-linear { font-family: 'Recursive Variable', sans-serif; font-variation-settings: 'MONO' 0, 'CASL' 0, 'slnt' 0, 'CRSV' .5; }
.gp-casual { font-family: 'Recursive Variable', sans-serif; font-variation-settings: 'MONO' 0, 'CASL' 1, 'slnt' 0, 'CRSV' .5; }
.gp-mono { font-family: 'Recursive Variable', monospace; font-variation-settings: 'MONO' 1, 'CASL' 0, 'slnt' 0, 'CRSV' .5; font-variant-numeric: tabular-nums; }
`);

for (const name of documentNames) {
  await copy(path.join(root, 'documentacion/nuevos', name), `07-referencias/documentos/${name}`);
}
for (const name of ['rebrand.css', 'global.css']) await copy(path.join(root, 'src/styles', name), `07-referencias/implementacion/${name}`);
for (const name of ['CatGlyph.astro', 'MeliSprite.astro']) await copy(path.join(root, 'src/components', name), `07-referencias/implementacion/${name}`);
await copy(path.join(root, 'src/config/brand.ts'), '07-referencias/implementacion/brand.ts');
await copy(path.join(root, 'public/og.png'), '08-imagenes/open-graph/og.png');

const sourceCss = (await fs.readFile(path.join(root, 'src/styles/rebrand.css'), 'utf8')).replace(/\r\n/g,'\n');
const rootBlock = sourceCss.match(/:root\s*\{([\s\S]*?)\}/)[1];
const tokens = Object.fromEntries([...rootBlock.matchAll(/(--meli-[\w-]+):\s*([^;]+);/g)].map(m => [m[1], m[2].trim()]));
await write('05-colores/tokens-landing.json', JSON.stringify({schemaVersion:1, source:'src/styles/rebrand.css :root', scope:'Snapshot of landing tokens; not an app-wide theme', tokens}, null, 2) + '\n');
await write('05-colores/tokens-landing.css', `/* Snapshot literal de los tokens de la landing. */\n:root {${rootBlock}}\n`);
const colors = Object.entries(tokens).filter(([,v]) => /^#[\da-f]{6}$/i.test(v)).map(([name,hex]) => ({name:name.replace('--meli-',''), hex:hex.toUpperCase(), rgb:[1,3,5].map(i => parseInt(hex.slice(i,i+2),16))}));
await write('05-colores/paleta.csv', 'token,hex,r,g,b\n' + colors.map(c => `${c.name},${c.hex},${c.rgb.join(',')}`).join('\n') + '\n');
await write('05-colores/gatopago.gpl', 'GIMP Palette\nName: GatoPago — landing\nColumns: 4\n# sRGB\n' + colors.map(c => `${c.rgb.join(' ')} ${c.name}`).join('\n') + '\n');
const luminance = rgb => rgb.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((v,c,i)=>v+c*[.2126,.7152,.0722][i],0);
const color = n => colors.find(c=>c.name===n);
const pairs = [['ink','milk'],['ink','cat-fire'],['milk','ink'],['milk','cat-fire'],['cat-shadow','milk']];
const contrast = pairs.map(([fg,bg])=> { const a=luminance(color(fg).rgb), b=luminance(color(bg).rgb); const ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05); return {foreground:fg,background:bg,ratio:Number(ratio.toFixed(2)),normalTextAA:ratio>=4.5,largeTextAA:ratio>=3}; });
await write('05-colores/contraste.json', JSON.stringify(contrast,null,2)+'\n');
await write('05-colores/README.md', `# Paleta de GatoPago\n\nSnapshot sRGB extraído del CSS de la landing. Los colores semánticos identifican estados; no son acentos intercambiables.\n\n| Token | HEX | RGB |\n|---|---|---|\n${colors.map(c=>`| ${c.name} | ${c.hex} | ${c.rgb.join(', ')} |`).join('\n')}\n\n## Contraste calculado\n\n| Texto / fondo | Ratio | AA texto normal |\n|---|---:|---|\n${contrast.map(c=>`| ${c.foreground} / ${c.background} | ${c.ratio}:1 | ${c.normalTextAA?'Sí':'No'} |`).join('\n')}\n\nCSS y JSON incluyen los tokens literales existentes; CSV y GPL facilitan importar la paleta. No son colores Pantone ni una conversión CMYK aprobada para imprenta.\n`);

const sprites = (await fs.readdir(target('03-mascota/estaticos'))).filter(f=>f.endsWith('.png') && !f.includes('-oscuro')).sort();
const motion = JSON.parse(await fs.readFile(target('03-mascota/animaciones/manifest.json'), 'utf8'));
const animations = [];
for (const name of (await fs.readdir(target('03-mascota/animaciones/manifests'))).filter(f=>f.endsWith('.json')).sort()) {
  animations.push(JSON.parse(await fs.readFile(target(`03-mascota/animaciones/manifests/${name}`), 'utf8')));
}
const roles = {'head-neutral':'Referencia de expresión neutral','head-happy':'Éxito discreto','head-focused':'Atención y verificación','head-cautious':'Advertencia recuperable','head-curious':'Ayuda y exploración','head-excited':'Celebración breve','head-sleepy':'Espera tranquila','head-peek':'Descubrimiento','body-sitting':'Bienvenida y estados vacíos','body-courier':'Envío y movimiento','body-sleeping':'Inactividad','body-qr':'Cobro y recepción; QR ilustrativo','body-conveyor':'Procesamiento','body-peek-card':'Tarjeta conceptual'};
const cellsOf = async f => { const m = await sharp(await fs.readFile(target(`03-mascota/estaticos/1x/${f}`))).metadata(); return `${m.width} × ${m.height}`; };
const spriteRows = [];
for (const f of sprites) { const n=f.replace('.png',''); spriteRows.push(`| ${n} | ${roles[n]} | ${await cellsOf(f)} | [×1](./estaticos/1x/${f}) · [×4](./estaticos/4x/${f}) · [×8](./estaticos/${f}) · [SVG](./estaticos/svg/${n}.svg) · [mapa](./modelo/estaticos/${n}.txt) | [×4](./estaticos/4x/${n}-oscuro.png) · [SVG](./estaticos/svg/${n}-oscuro.svg) |`); }
await write('03-mascota/CATALOGO.md', `# Catálogo del personaje\n\nNombre interno: Meli. El nombre público es GatoPago. Las expresiones no son variantes del logo.\n\nPixel art sobre cuadrícula real: cada bloque es un píxel del mapa en [modelo](./modelo/README.md). Los estáticos siguen la [especificación del personaje](./ESPECIFICACION.md): el diseño original de la IA 1 a doble resolución, con cabezas en 64 × 64 y poses en 96 × 96. PNG ×1, ×4 y ×8, SVG y la versión para fondos oscuros (borde Milk) se generan a partir de los mapas con \`npm run brandkit:mascota\`.\n\n## Estáticos\n\n| Pieza | Uso | Bloques | Archivos | Fondo oscuro |\n|---|---|---:|---|---|\n${spriteRows.join('\n')}\n\n## Animación\n\n${motion.animationCount} secuencias · ${motion.totalFrames} frames · lienzo ${motion.grid.canvas.width} × ${motion.grid.canvas.height} bloques (${motion.export.canvas.width} × ${motion.export.canvas.height} px a ×${motion.export.scale}) · apoyo común en (${motion.grid.anchor.x}, ${motion.grid.anchor.y}). No implica que estén integradas en la app.\n\n| Ciclo | Uso | Frames | Duración | Reproducción |\n|---|---|---:|---:|---|\n${animations.map(a=>`| [${a.name}](./animaciones/previews/${a.id}.webp) | ${a.purpose} | ${a.frameCount} | ${a.totalDurationMs} ms | ${a.playback === 'loop' ? 'bucle' : 'una vez'} |`).join('\n')}\n\nCada manifiesto define tiempos por frame, apoyo y rutas. No reproducir con un FPS fijo. Las previews repiten en bucle para revisión aunque el uso previsto sea «una vez». La carpeta \`qa/\` (solo en el repositorio; no viaja en el ZIP de entrega) contiene hojas de revisión y la comparación con el material anterior; no son assets de producto.\n`);

const template = (await fs.readFile(path.join(root, 'scripts/brandkit/catalogo.html'), 'utf8')).replace(/\r\n/g,'\n');
const colorHtml = colors.map(c=>`<article class="swatch"><div style="background:${c.hex}"></div><h3>${c.name}</h3><code>${c.hex}</code><small>RGB ${c.rgb.join(' · ')}</small></article>`).join('');
const spriteHtml = sprites.map(f=>{const n=f.replace('.png','');const k=n.startsWith('head-')?'kcab':'kpose';return `<article class="asset"><div class="art checker"><img class="${k}" src="03-mascota/estaticos/${f}" alt="${escape(roles[n])}" loading="lazy"></div><h3>${n}</h3><p>${roles[n]}</p><a href="03-mascota/estaticos/${f}" download>PNG ↗</a> · <a href="03-mascota/estaticos/svg/${n}.svg" download>SVG ↗</a> · <a href="03-mascota/estaticos/${n}-oscuro.png" download>Oscuro ↗</a></article>`;}).join('');
const animationHtml = animations.map(a=>`<article class="asset"><div class="art checker"><img class="anim" src="03-mascota/animaciones/frames/${a.id}/frame-001.png" data-static="03-mascota/animaciones/frames/${a.id}/frame-001.png" data-animated="03-mascota/animaciones/previews/${a.id}.webp" alt="${escape(a.name)}" loading="lazy"></div><h3>${escape(a.name)}</h3><p>${a.frameCount} frames · ${a.totalDurationMs} ms · ${a.playback==='loop'?'ciclo':'uso: una vez; preview en ciclo'}</p><button class="play" type="button" aria-pressed="false">Reproducir</button> <a href="03-mascota/animaciones/manifests/${a.id}.json">Manifiesto ↗</a></article>`).join('');
await write('index.html', template.replace('<!-- COLORS -->',colorHtml).replace('<!-- SPRITES -->',spriteHtml).replace('<!-- ANIMATIONS -->',animationHtml)
  .replace('<!-- STAT_SPRITES -->', String(sprites.length)).replace('<!-- STAT_ANIMATIONS -->', String(motion.animationCount)).replace('<!-- STAT_FRAMES -->', String(motion.totalFrames)));

// Inventory every deliverable, including hashes and actual image metadata.
const inventory = [];
for (const file of await files(kit)) {
  const relative = slash(path.relative(kit,file));
  if (['manifest.json','CONTROL-DE-CALIDAD.md'].includes(relative)) continue;
  const buffer = await fs.readFile(file);
  const canonical = ['02-logos/modelo/','02-logos/pwa/','03-mascota/','04-tipografia/recursive/','06-originales/'].some(prefix=>relative.startsWith(prefix)) && relative !== '03-mascota/CATALOGO.md';
  const row = {path:relative,bytes:buffer.length,sha256:crypto.createHash('sha256').update(buffer).digest('hex'),source:canonical?'brandkit canonical':provenance.get(relative)||'brandkit editorial / generated'};
  if(transforms.has(relative)) row.transform=transforms.get(relative);
  if (/\.(png|webp|jpg|svg)$/i.test(file)) {
    const m = await sharp(buffer,{animated:true}).metadata();
    row.image = {format:m.format,width:m.width,height:m.pageHeight||m.height,hasAlpha:m.hasAlpha,pages:m.pages||1};
  }
  inventory.push(row);
}
await write('manifest.json', JSON.stringify({schemaVersion:2,profile:'repository',brand:'GatoPago',edition:'2026-09-25',copyPolicy:'Raster images from other sources are copied byte-for-byte; derived text and SVG snapshots use LF. Mascot art is generated from the canonical pixel maps in 03-mascota/modelo. Canonical kit sources are versioned in Git.',files:inventory},null,2)+'\n');
const result = await verifyKit(kit,{sourceRoot:root,app});
if(result.failures.length) throw new Error(`Staged kit failed validation:\n${result.failures.join('\n')}`);
if(initialFingerprint !== await fingerprint(currentKit)) throw new Error('Canonical kit changed during build; refusing replacement');
const previous = path.join(work,'previous');
await fs.rename(currentKit,previous);
try { await fs.rename(kit,currentKit); }
catch(error) {
  try { await fs.rename(previous,currentKit); }
  catch(rollbackError) { keepWork=true; throw new AggregateError([error,rollbackError],`Recovery copy retained at ${previous}`); }
  throw error;
}
console.log(JSON.stringify({kit:currentKit,...result,bytes:inventory.reduce((n,f)=>n+f.bytes,0)},null,2));
} finally {
  await lock.close();
  await fs.unlink(lockPath);
  if(work && !keepWork) await removeWorkdir(root,work).catch(error=>console.warn(`Temporary directory retained at ${work}: ${error.message}`));
}
