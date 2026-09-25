/** Package existing brand assets without redrawing, cropping or recoloring them. */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { appRoot } from './brandkit/paths.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const kit = path.join(root, 'brandkit');
const app = await appRoot();
const provenance = new Map();
const slash = p => p.split(path.sep).join('/');
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function target(relative) {
  const dest = path.resolve(kit, relative);
  if (!dest.startsWith(kit + path.sep)) throw new Error(`Outside brandkit: ${relative}`);
  return dest;
}
async function write(relative, data) {
  const dest = target(relative);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, data);
}
async function copy(source, relative, label) {
  const dest = target(relative);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(source, dest);
  provenance.set(relative, label || `landing/${slash(path.relative(root, source))}`);
}
async function files(dir) {
  const result = [];
  for (const item of await fs.readdir(dir, { withFileTypes: true })) {
    if (item.name === '__pycache__' || item.name === '.DS_Store') continue;
    const name = path.join(dir, item.name);
    if (item.isDirectory()) result.push(...await files(name));
    else if (item.isFile()) result.push(name);
  }
  return result.sort();
}
async function tree(source, relative, label) {
  for (const file of await files(source)) {
    const suffix = slash(path.relative(source, file));
    await copy(file, `${relative}/${suffix}`, label ? `${label}/${suffix}` : undefined);
  }
}

await copy(path.join(root, 'public/Logo_gatopago.svg'), '02-logos/simbolo/gatopago.svg');
for (const name of ['favicon.svg','favicon.ico','favicon-16x16.png','favicon-32x32.png','favicon-48x48.png','apple-touch-icon.png']) {
  await copy(path.join(root, 'public', name), `02-logos/iconos-web/${name}`);
}
for (const name of ['icon-192.png','icon-512.png','apple-touch-icon.png','manifest.webmanifest']) {
  await copy(path.join(app, 'client/public', name), `02-logos/pwa/${name}`, `app/client/public/${name}`);
}
await tree(path.join(root, 'src/assets/meli'), '03-mascota/estaticos');
await tree(path.join(root, 'output/meli-animation-kit-2026-08-19'), '03-mascota/animaciones');
// The bundled processor reads the copied originals, not files outside the kit.
const processor = '03-mascota/animaciones/tools/process_meli_frames.py';
let processorText = await fs.readFile(target(processor), 'utf8');
processorText = processorText.replace('REPO_DIR = SCRIPT.parents[3]', 'REPO_DIR = SCRIPT.parents[3] / "06-originales"');
await write(processor, processorText);

const fontDir = path.join(root, 'node_modules/@fontsource-variable/recursive');
await copy(path.join(fontDir, 'full.css'), '04-tipografia/recursive/full.css');
await copy(path.join(fontDir, 'LICENSE'), '04-tipografia/recursive/LICENSE.txt');
await copy(path.join(fontDir, 'metadata.json'), '04-tipografia/recursive/metadata.json');
await copy(path.join(fontDir, 'package.json'), '04-tipografia/recursive/package.json');
const fontCSS = await fs.readFile(path.join(fontDir, 'full.css'), 'utf8');
for (const m of fontCSS.matchAll(/url\(\.\/([^)]*)\)/g)) {
  await copy(path.join(fontDir, m[1]), `04-tipografia/recursive/${m[1]}`);
}
await write('04-tipografia/uso.css', `@import url('./recursive/full.css');
.gp-linear { font-family: 'Recursive Variable', sans-serif; font-variation-settings: 'MONO' 0, 'CASL' 0, 'slnt' 0, 'CRSV' .5; }
.gp-casual { font-family: 'Recursive Variable', sans-serif; font-variation-settings: 'MONO' 0, 'CASL' 1, 'slnt' 0, 'CRSV' .5; }
.gp-mono { font-family: 'Recursive Variable', monospace; font-variation-settings: 'MONO' 1, 'CASL' 0, 'slnt' 0, 'CRSV' .5; font-variant-numeric: tabular-nums; }
`);

const originals = ['d54017bf-565f-49e0-8192-bd0f47bfc050.png','spritesmeli1.png','spritesmeli2.png',
  'Image Aug 19, 2026, 01_47_20 AM (1).png', ...[2,3,4,5].map(i => `Image Aug 19, 2026, 01_47_21 AM (${i}).png`)];
for (const name of originals) await copy(path.join(root, name), `06-originales/${name}`);

for (const name of ['gatopago-rebranding-maestro-2026.md','gatopago-plan-marca-experiencia-2026.md','gatopago_nueva_narrativa_contexto_completo_2026-08-18.txt']) {
  await copy(path.join(root, 'documentacion/nuevos', name), `07-referencias/documentos/${name}`);
}
for (const name of ['rebrand.css', 'global.css']) await copy(path.join(root, 'src/styles', name), `07-referencias/implementacion/${name}`);
for (const name of ['CatGlyph.astro', 'MeliSprite.astro']) await copy(path.join(root, 'src/components', name), `07-referencias/implementacion/${name}`);
await copy(path.join(root, 'src/config/brand.ts'), '07-referencias/implementacion/brand.ts');
await copy(path.join(root, 'public/og.png'), '08-imagenes/open-graph/og.png');

const sourceCss = await fs.readFile(path.join(root, 'src/styles/rebrand.css'), 'utf8');
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

const sprites = (await fs.readdir(target('03-mascota/estaticos'))).filter(f=>f.endsWith('.webp')).sort();
const animations = [];
for (const name of (await fs.readdir(target('03-mascota/animaciones/manifests'))).filter(f=>f.endsWith('.json')).sort()) {
  animations.push(JSON.parse(await fs.readFile(target(`03-mascota/animaciones/manifests/${name}`), 'utf8')));
}
const roles = {'head-neutral':'Referencia de expresión neutral','head-happy':'Éxito discreto','head-focused':'Atención y verificación','head-cautious':'Advertencia recuperable','head-curious':'Ayuda y exploración','head-excited':'Celebración breve','head-sleepy':'Espera tranquila','head-peek':'Descubrimiento','body-sitting':'Bienvenida y estados vacíos','body-courier':'Envío y movimiento','body-sleeping':'Inactividad','body-qr':'Cobro y recepción; QR ilustrativo','body-conveyor':'Procesamiento','body-peek-card':'Tarjeta conceptual'};
await write('03-mascota/CATALOGO.md', `# Catálogo del personaje\n\nNombre interno: Meli. El nombre público es GatoPago. Las expresiones no son variantes del logo.\n\n## Estáticos\n\n| Archivo | Uso |\n|---|---|\n${sprites.map(f=>`| [${f}](./estaticos/${f}) | ${roles[f.replace('.webp','')]} |`).join('\n')}\n\n## Animación\n\nPaquete procesado conservado sin alterar imágenes. No implica que los 20 ciclos estén integrados en la app.\n\n| Ciclo | Frames | Duración | Reproducción |\n|---|---:|---:|---|\n${animations.map(a=>`| [${a.name}](./animaciones/previews/${a.id}.webp) | ${a.frameCount} | ${a.totalDurationMs} ms | ${a.playback} |`).join('\n')}\n\nCada manifiesto define tiempos por frame, ancla y rutas. No reproducir todas las animaciones con un FPS fijo. El directorio QA contiene comparaciones anteriores a las reparaciones, no assets para producto.\n`);

const template = await fs.readFile(path.join(root, 'scripts/brandkit/catalogo.html'), 'utf8');
const colorHtml = colors.map(c=>`<article class="swatch"><div style="background:${c.hex}"></div><h3>${c.name}</h3><code>${c.hex}</code><small>RGB ${c.rgb.join(' · ')}</small></article>`).join('');
const spriteHtml = sprites.map(f=>`<article class="asset"><div class="art checker"><img src="03-mascota/estaticos/${f}" alt="${escape(roles[f.replace('.webp','')])}" width="220" height="180" loading="lazy"></div><h3>${f.replace('.webp','')}</h3><p>${roles[f.replace('.webp','')]}</p><a href="03-mascota/estaticos/${f}" download>Descargar WebP ↗</a></article>`).join('');
const animationHtml = animations.map(a=>`<article class="asset"><div class="art checker"><img src="03-mascota/animaciones/frames/${a.id}/frame-001.png" data-static="03-mascota/animaciones/frames/${a.id}/frame-001.png" data-animated="03-mascota/animaciones/previews/${a.id}.webp" alt="${escape(a.name)}" width="240" height="192" loading="lazy"></div><h3>${escape(a.name)}</h3><p>${a.frameCount} frames · ${a.totalDurationMs} ms · ${a.playback==='loop'?'ciclo':'uso: una vez; preview en ciclo'}</p><button class="play" type="button" aria-pressed="false">Reproducir</button> <a href="03-mascota/animaciones/manifests/${a.id}.json">Manifiesto ↗</a></article>`).join('');
await write('index.html', template.replace('<!-- COLORS -->',colorHtml).replace('<!-- SPRITES -->',spriteHtml).replace('<!-- ANIMATIONS -->',animationHtml));

// Inventory every deliverable, including hashes and actual image metadata.
const inventory = [];
for (const file of await files(kit)) {
  const relative = slash(path.relative(kit,file));
  if (['manifest.json','CONTROL-DE-CALIDAD.md'].includes(relative)) continue;
  const buffer = await fs.readFile(file);
  const row = {path:relative,bytes:buffer.length,sha256:crypto.createHash('sha256').update(buffer).digest('hex'),source:provenance.get(relative)||'brandkit editorial / generated'};
  if (/\.(png|webp|jpg|svg)$/i.test(file)) {
    const m = await sharp(buffer,{animated:true}).metadata();
    row.image = {format:m.format,width:m.width,height:m.pageHeight||m.height,hasAlpha:m.hasAlpha,pages:m.pages||1};
  }
  inventory.push(row);
}
await write('manifest.json', JSON.stringify({schemaVersion:1,brand:'GatoPago',edition:'2026-09-24',generatedAt:new Date().toISOString(),copyPolicy:'Images are copied byte-for-byte; no cropping, recoloring or regeneration.',files:inventory},null,2)+'\n');
console.log(JSON.stringify({kit,files:inventory.length,sprites:sprites.length,animations:animations.length,frames:animations.reduce((n,a)=>n+a.frameCount,0),bytes:inventory.reduce((n,f)=>n+f.bytes,0)},null,2));
