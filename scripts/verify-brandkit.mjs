/** Read-only integrity checks for the packaged brandkit. */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { appRoot, argument, files, inside, slash } from './brandkit/paths.mjs';

export async function verifyKit(kit, { sourceRoot = null, app = null } = {}) {
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const inventory = JSON.parse(await fs.readFile(path.join(kit, 'manifest.json'), 'utf8'));
const failures = [];
let copies = 0, links = 0, frames = 0, animations = 0, edgePixels = 0, faintEdgePixels = 0, maxEdgeAlpha = 0;
// Match the original processor's alpha > 8 definition, while reporting faint residue too.
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
const dir = path.join(kit,'03-mascota/animaciones/manifests');
for (const file of (await fs.readdir(dir)).filter(f=>f.endsWith('.json'))) {
  animations++;
  const owner = path.join(dir,file);
  const a = JSON.parse(await fs.readFile(owner,'utf8'));
  assert(a.frames.length === a.frameCount, `Frame count: ${a.id}`);
  assert(a.frames.reduce((n,f)=>n+f.durationMs,0) === a.totalDurationMs, `Duration: ${a.id}`);
  assert(a.canvas.width===320 && a.canvas.height===256 && a.anchor.x===160 && a.anchor.y===244, `Canvas/anchor: ${a.id}`);
  for (const key of ['strip','grid','preview']) await checkLink(owner,a[key]);
  const preview = await sharp(await fs.readFile(path.resolve(dir,a.preview)),{animated:true}).metadata();
  assert(preview.width===320 && (preview.pageHeight || preview.height)===256, `Preview canvas: ${a.id}`);
  assert(preview.delay.reduce((n,v)=>n+v,0)===a.totalDurationMs, `Preview timing: ${a.id}`);
  for (const frame of a.frames) {
    frames++;
    await checkLink(owner,frame.file);
    const image = sharp(await fs.readFile(path.resolve(dir,frame.file)));
    const m = await image.metadata();
    assert(m.width===320 && m.height===256 && m.hasAlpha, `RGBA canvas: ${a.id}/${frame.index}`);
    const {data,info} = await image.ensureAlpha().raw().toBuffer({resolveWithObject:true});
    let edges=0;
    const inspect = (x,y) => { const alpha=data[(y*info.width+x)*4+3]; maxEdgeAlpha=Math.max(maxEdgeAlpha,alpha); if(alpha>alphaThreshold) edges++; else if(alpha>0) faintEdgePixels++; };
    for(let x=0;x<info.width;x++) for(const y of [0,info.height-1]) inspect(x,y);
    for(let y=1;y<info.height-1;y++) for(const x of [0,info.width-1]) inspect(x,y);
    edgePixels += edges;
    assert(edges===0,`Opaque pixels touch final frame edge: ${a.id}/${frame.index}`);
  }
}
const sourceManifest = JSON.parse(await fs.readFile(path.join(kit,'03-mascota/animaciones/manifest.json'),'utf8'));
for (const sheet of sourceManifest.sourceSheets) assert(hash(await fs.readFile(path.join(kit,'06-originales',sheet.file)))===sheet.sha256,`Original sheet hash: ${sheet.file}`);
assert(animations===20 && frames===152,'Expected 20 sequences / 152 frames');
assert(inventory.files.filter(f=>/^03-mascota\/estaticos\/.*\.webp$/.test(f.path)).length===14,'Expected 14 sprites');
return {files:inventory.files.length,profile:inventory.profile || 'repository',identicalSourceCopies:copies,localLinksChecked:links,animations,frames,alphaThreshold,frameBoundaryPixelsAboveThreshold:edgePixels,faintEdgePixels,maxEdgeAlpha,failures};
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
