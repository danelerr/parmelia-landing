/** Read-only integrity checks for the packaged brandkit. */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { appRoot, argument, files, inside, slash } from './brandkit/paths.mjs';
import { borde } from './mascota/lib/pixmap.mjs';

export async function verifyKit(kit, { sourceRoot = null, app = null } = {}) {
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const inventory = JSON.parse(await fs.readFile(path.join(kit, 'manifest.json'), 'utf8'));
const failures = [];
let copies = 0, links = 0, frames = 0, animations = 0, edgePixels = 0, faintEdgePixels = 0, maxEdgeAlpha = 0;
// Mascot frames are exact pixel art (alpha 0 or 255): any opaque pixel on a frame border fails.
const alphaThreshold = 8;
const assert = (condition, message) => { if (!condition) failures.push(message); };
async function checkLink(owner, link) {
  if (!link || /^(#|https?:|mailto:|data:)/.test(link)) return;
  const name = decodeURIComponent(link.split('#')[0].split('?')[0]);
  if (!name) return;
  const resolved = path.resolve(path.dirname(owner), name);
  assert(resolved.startsWith(kit + path.sep), `Link outside kit: ${owner}: ${link}`);
  try { await fs.access(resolved); } catch { failures.push(`Missing target: ${path.relative(kit,owner)} -> ${link}`); }
  links++;
}
for (const row of inventory.files) {
  const file = inside(kit, row.path);
  const bytes = await fs.readFile(file);
  assert(hash(bytes) === row.sha256, `Hash mismatch: ${row.path}`);
  assert(bytes.length === row.bytes, `Size mismatch: ${row.path}`);
  const source = sourceRoot && row.source.startsWith('landing/') ? inside(sourceRoot,row.source.slice(8)) : app && row.path.startsWith('02-logos/pwa/') ? inside(app,`client/public/${path.basename(row.path)}`) : null;
  if (source) {
    let original = await fs.readFile(source);
    if (row.transform === 'lf') original = Buffer.from(original.toString('utf8').replace(/\r\n/g,'\n'));
    assert(hash(bytes) === hash(original), `Copy differs from source: ${row.path}`); copies++;
  }
  if (row.path.endsWith('.html')) {
    for (const m of bytes.toString().matchAll(/(?:href|src|data-static|data-animated)="([^"]+)"/g)) await checkLink(file,m[1]);
  }
  if (row.path.endsWith('.md')) {
    const markdown = bytes.toString().replace(/```[\s\S]*?```/g,'');
    for (const m of markdown.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) await checkLink(file,m[1]);
  }
  if (row.path.startsWith('04-tipografia/') && row.path.endsWith('.css')) {
    for (const m of bytes.toString().matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) await checkLink(file,m[1]);
  }
}
const indexed = inventory.files.map(row => row.path);
assert(new Set(indexed).size===indexed.length,'Duplicate inventory paths');
const actual = (await files(kit)).map(file=>slash(path.relative(kit,file))).filter(file=>!['manifest.json','CONTROL-DE-CALIDAD.md'].includes(file));
assert(JSON.stringify(actual.sort())===JSON.stringify([...indexed].sort()),'Inventory does not cover the exact file set');
// Mascot: canonical pixel maps -> generated statics and animations. All raster art must be exact pixel art.
const palette = JSON.parse(await fs.readFile(path.join(kit,'03-mascota/modelo/paleta.json'),'utf8')).colours;
const rgbOf = new Map(palette.map(c=>[c.char,[1,3,5].map(i=>parseInt(c.hex.slice(i,i+2),16))]));
const charOf = new Map(palette.map(c=>[rgbOf.get(c.char).join(','),c.char]));
async function rawOf(file) { const {data,info} = await sharp(await fs.readFile(file)).ensureAlpha().raw().toBuffer({resolveWithObject:true}); return {data,w:info.width,h:info.height}; }
/** Every pixel is a palette colour at full opacity, or fully transparent. Returns the character grid. */
function gridOf({data,w,h}, label) {
  const rows=[];
  for (let y=0;y<h;y++){let r='';for(let x=0;x<w;x++){const i=(y*w+x)*4;if(data[i+3]===0){r+='.';continue;}const ch=charOf.get(`${data[i]},${data[i+1]},${data[i+2]}`);if(!ch||data[i+3]!==255){failures.push(`Off-palette or semi-transparent pixel: ${label} (${x},${y})`);return rows;}r+=ch;}rows.push(r);}
  return rows;
}
/** The large render must be an exact integer upscale of the 1x image. */
function assertUpscale(big, one, k, label) {
  assert(big.w===one.w*k && big.h===one.h*k, `Scale ×${k} size: ${label}`);
  if (big.w!==one.w*k || big.h!==one.h*k) return;
  for (let y=0;y<one.h;y++) for (let x=0;x<one.w;x++) for (const [dx,dy] of [[0,0],[k-1,k-1],[k>>1,k>>1]]) {
    const a=(y*one.w+x)*4, b=((y*k+dy)*big.w+(x*k+dx))*4;
    if (one.data[a]!==big.data[b]||one.data[a+1]!==big.data[b+1]||one.data[a+2]!==big.data[b+2]||one.data[a+3]!==big.data[b+3]) { failures.push(`Not an exact ×${k} upscale: ${label}`); return; }
  }
}
let statics = 0;
const mapDir = path.join(kit,'03-mascota/modelo/estaticos');
for (const file of (await fs.readdir(mapDir)).filter(f=>f.endsWith('.txt')).sort()) {
  statics++;
  const name = file.replace('.txt','');
  const map = (await fs.readFile(path.join(mapDir,file),'utf8')).replace(/\r/g,'').split('\n').filter(l=>l.length && !l.startsWith(';'));
  // Each static exists as drawn and with the dark-background border; x4 and x8 are exact upscales of x1.
  for (const [suffix, art] of [['', map], ['-oscuro', borde(map)]]) {
    const id = `${name}${suffix}`;
    const one = await rawOf(path.join(kit,'03-mascota/estaticos/1x',`${id}.png`));
    assert(JSON.stringify(gridOf(one,`1x/${id}`))===JSON.stringify(art), `Static differs from its map: ${id}`);
    assertUpscale(await rawOf(path.join(kit,'03-mascota/estaticos/4x',`${id}.png`)), one, 4, `estaticos/4x/${id}.png`);
    assertUpscale(await rawOf(path.join(kit,'03-mascota/estaticos',`${id}.png`)), one, 8, `estaticos/${id}.png`);
    await fs.access(path.join(kit,'03-mascota/estaticos/svg',`${id}.svg`)).catch(()=>failures.push(`Missing SVG: ${id}`));
  }
}
const motion = JSON.parse(await fs.readFile(path.join(kit,'03-mascota/animaciones/manifest.json'),'utf8'));
const dir = path.join(kit,'03-mascota/animaciones/manifests');
for (const file of (await fs.readdir(dir)).filter(f=>f.endsWith('.json'))) {
  animations++;
  const owner = path.join(dir,file);
  const a = JSON.parse(await fs.readFile(owner,'utf8'));
  const {width:gw,height:gh} = a.grid.canvas, k = a.export.scale;
  assert(a.frames.length === a.frameCount, `Frame count: ${a.id}`);
  assert(a.frames.reduce((n,f)=>n+f.durationMs,0) === a.totalDurationMs, `Duration: ${a.id}`);
  assert(gw===motion.grid.canvas.width && gh===motion.grid.canvas.height && a.grid.anchor.x===motion.grid.anchor.x && a.grid.anchor.y===motion.grid.anchor.y, `Canvas/anchor: ${a.id}`);
  assert(a.export.canvas.width===gw*k && a.export.canvas.height===gh*k, `Export canvas: ${a.id}`);
  for (const key of ['strip','gridSheet','preview','previewGif']) await checkLink(owner,a[key]);
  const preview = await sharp(await fs.readFile(path.resolve(dir,a.preview)),{animated:true}).metadata();
  assert(preview.width===gw*a.export.previewScale && (preview.pageHeight || preview.height)===gh*a.export.previewScale, `Preview canvas: ${a.id}`);
  assert(preview.pages===a.frameCount && preview.delay.reduce((n,v)=>n+v,0)===a.totalDurationMs, `Preview frames/timing: ${a.id}`);
  for (const frame of a.frames) {
    frames++;
    await checkLink(owner,frame.file); await checkLink(owner,frame.file1x);
    const one = await rawOf(path.resolve(dir,frame.file1x)), big = await rawOf(path.resolve(dir,frame.file));
    assert(one.w===gw && one.h===gh, `1x canvas: ${a.id}/${frame.index}`);
    gridOf(one, `${a.id}/${frame.index}`);
    assertUpscale(big, one, k, `${a.id}/${frame.index}`);
    let edges=0;
    const inspect = (x,y) => { const alpha=one.data[(y*one.w+x)*4+3]; maxEdgeAlpha=Math.max(maxEdgeAlpha,alpha); if(alpha>alphaThreshold) edges++; else if(alpha>0) faintEdgePixels++; };
    for(let x=0;x<one.w;x++) for(const y of [0,one.h-1]) inspect(x,y);
    for(let y=1;y<one.h-1;y++) for(const x of [0,one.w-1]) inspect(x,y);
    edgePixels += edges;
    assert(edges===0,`Opaque pixels touch the frame edge: ${a.id}/${frame.index}`);
  }
}
// Symbol and web icons must be exact renders of the approved maps in 02-logos/modelo.
const readMap = async name => (await fs.readFile(path.join(kit,'02-logos/modelo',name),'utf8')).replace(/\r/g,'').split('\n').filter(l=>l.length);
const symbol = await readMap('simbolo.txt'), symbol16 = await readMap('simbolo-16.txt');
/** Sample the centre of each k×k block of a rendered image back into a character grid. */
function downsample(img, k, x0 = 0, y0 = 0, w = Math.floor(img.w / k), h = Math.floor(img.h / k)) {
  const data = Buffer.alloc(w * h * 4);
  for (let y=0;y<h;y++) for (let x=0;x<w;x++) { const s=((y0+y*k+(k>>1))*img.w+(x0+x*k+(k>>1)))*4, d=(y*w+x)*4; img.data.copy(data,d,s,s+4); }
  return {data,w,h};
}
const iconDir = path.join(kit,'02-logos/iconos-web');
const same = (grid, map, label) => assert(JSON.stringify(grid)===JSON.stringify(map), `Icon differs from its map: ${label}`);
same(gridOf(downsample(await rawOf(path.join(kit,'02-logos/simbolo/gatopago.png')),8),'simbolo png'), symbol, 'simbolo/gatopago.png');
same(gridOf(await rawOf(path.join(iconDir,'favicon-16x16.png')),'favicon-16'), symbol16, 'favicon-16x16.png');
same(gridOf(downsample(await rawOf(path.join(iconDir,'favicon-48x48.png')),3),'favicon-48'), symbol16, 'favicon-48x48.png');
const f32 = await rawOf(path.join(iconDir,'favicon-32x32.png'));
assert(f32.w===32 && f32.h===32, 'favicon-32x32.png size');
same(gridOf(downsample(f32,1,Math.floor((32-symbol[0].length)/2),Math.floor((32-symbol.length)/2),symbol[0].length,symbol.length),'favicon-32'), symbol, 'favicon-32x32.png');
const apple = await rawOf(path.join(iconDir,'apple-touch-icon.png'));
assert(apple.w===180 && apple.h===180, 'apple-touch-icon size');
let transparent=0; for (let i=3;i<apple.data.length;i+=4) if (apple.data[i]!==255) transparent++;
assert(transparent===0, 'apple-touch-icon must be opaque (iOS paints transparency black)');
same(gridOf(downsample(apple,4,Math.floor((180-symbol[0].length*4)/2),Math.floor((180-symbol.length*4)/2),symbol[0].length,symbol.length),'apple-touch').map(r=>r.replace(/w/g,'.')), symbol, 'apple-touch-icon.png');
const icoBytes = await fs.readFile(path.join(iconDir,'favicon.ico'));
const icoCount = icoBytes.readUInt16LE(4), icoSizes = [];
for (let i=0;i<icoCount;i++) { const e=6+16*i, size=icoBytes[e]||256, len=icoBytes.readUInt32LE(e+8), off=icoBytes.readUInt32LE(e+12);
  icoSizes.push(size);
  const png = icoBytes.subarray(off,off+len);
  const expected = size===16 ? 'favicon-16x16.png' : size===32 ? 'favicon-32x32.png' : 'favicon-48x48.png';
  assert(hash(png)===hash(await fs.readFile(path.join(iconDir,expected))), `favicon.ico ${size}px differs from ${expected}`); }
assert(JSON.stringify(icoSizes)==='[16,32,48]', `favicon.ico sizes ${icoSizes}`);
for (const sheet of motion.provenance.sourceSheets) assert(hash(await fs.readFile(path.join(kit,'06-originales',sheet.file)))===sheet.sha256,`Original sheet hash: ${sheet.file}`);
assert(animations===motion.animationCount && animations===20, 'Expected the 20 mascot sequences');
assert(frames===motion.totalFrames, `Frame total ${frames} differs from the motion manifest (${motion.totalFrames})`);
assert(statics===14, 'Expected 14 static mascot maps');
return {files:inventory.files.length,profile:inventory.profile || 'repository',identicalSourceCopies:copies,localLinksChecked:links,statics,animations,frames,alphaThreshold,frameBoundaryPixelsAboveThreshold:edgePixels,faintEdgePixels,maxEdgeAlpha,failures};
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  try {
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
    const result = await verifyKit(path.resolve(argument('--kit', path.join(root,'brandkit'))), {
      sourceRoot: process.argv.includes('--sources') ? root : null,
      app: await appRoot(),
    });
    console.log(JSON.stringify(result,null,2));
    if(result.failures.length) process.exitCode=1;
  } catch(error) { console.error(error.message); process.exitCode=1; }
}
