/** Read-only integrity checks for the packaged brandkit. */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { appRoot } from './brandkit/paths.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const kit = path.join(root, 'brandkit');
const app = await appRoot();
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
  const file = path.join(kit, row.path);
  const bytes = await fs.readFile(file);
  assert(hash(bytes) === row.sha256, `Hash mismatch: ${row.path}`);
  assert(bytes.length === row.bytes, `Size mismatch: ${row.path}`);
  const source = row.source.startsWith('landing/') ? path.join(root,row.source.slice(8)) : row.source.startsWith('app/') ? path.join(app,row.source.slice(4)) : null;
  if (source) {
    const original = await fs.readFile(source);
    if (row.path.endsWith('/tools/process_meli_frames.py')) {
      assert(bytes.toString() === original.toString().replace('REPO_DIR = SCRIPT.parents[3]', 'REPO_DIR = SCRIPT.parents[3] / "06-originales"'), 'Unexpected processor changes');
    } else { assert(hash(bytes) === hash(original), `Copy differs from source: ${row.path}`); copies++; }
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
const dir = path.join(kit,'03-mascota/animaciones/manifests');
for (const file of (await fs.readdir(dir)).filter(f=>f.endsWith('.json'))) {
  animations++;
  const owner = path.join(dir,file);
  const a = JSON.parse(await fs.readFile(owner,'utf8'));
  assert(a.frames.length === a.frameCount, `Frame count: ${a.id}`);
  assert(a.frames.reduce((n,f)=>n+f.durationMs,0) === a.totalDurationMs, `Duration: ${a.id}`);
  assert(a.canvas.width===320 && a.canvas.height===256 && a.anchor.x===160 && a.anchor.y===244, `Canvas/anchor: ${a.id}`);
  for (const key of ['strip','grid','preview']) await checkLink(owner,a[key]);
  const preview = await sharp(path.resolve(dir,a.preview),{animated:true}).metadata();
  assert(preview.width===320 && (preview.pageHeight || preview.height)===256, `Preview canvas: ${a.id}`);
  assert(preview.delay.reduce((n,v)=>n+v,0)===a.totalDurationMs, `Preview timing: ${a.id}`);
  for (const frame of a.frames) {
    frames++;
    await checkLink(owner,frame.file);
    const image = sharp(path.resolve(dir,frame.file));
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
console.log(JSON.stringify({files:inventory.files.length,identicalSourceCopies:copies,localLinksChecked:links,animations,frames,alphaThreshold,frameBoundaryPixelsAboveThreshold:edgePixels,faintEdgePixels,maxEdgeAlpha,failures},null,2));
if(failures.length) process.exitCode=1;
