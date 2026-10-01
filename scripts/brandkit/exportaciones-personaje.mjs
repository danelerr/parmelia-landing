/** Integer, nearest-neighbour HD exports. Originals remain the source of truth. */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { zipSync } from 'fflate';
import { inside } from './paths.mjs';

const hash = bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const LONG_EDGE = 2048;
const POLICY = 'rgba-nearest-integer-2048-v2';

// Resizing an RGBA image through a colour pipeline can round semi-transparent RGB.
// Repeat raw four-byte pixels instead, preserving every colour and alpha value.
async function enlargePng(bytes,width,height,scale) {
  const {data,info} = await sharp(bytes).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  if(info.width!==width || info.height!==height) throw new Error('HD source dimensions changed');
  const W=width*scale,H=height*scale,output=Buffer.alloc(W*H*4),row=Buffer.alloc(W*4);
  for(let y=0;y<height;y++) {
    for(let x=0;x<width;x++) {
      const at=(y*width+x)*4;
      row.fill(data.subarray(at,at+4),x*scale*4,(x+1)*scale*4);
    }
    for(let dy=0;dy<scale;dy++) row.copy(output,(y*scale+dy)*W*4);
  }
  return sharp(output,{raw:{width:W,height:H,channels:4}}).png({compressionLevel:9}).toBuffer();
}

export async function characterExports(kit, character) {
  const base = path.join(kit,'03-personaje');
  const manifestPath = path.join(base,'exportaciones.json');
  let old = {files:[]};
  try { old = JSON.parse(await fs.readFile(manifestPath,'utf8')); } catch(error) { if(error.code!=='ENOENT') throw error; }
  const cached = new Map(old.files.map(row=>[row.file,row]));
  const outputs = [], statics = {}, animations = {};
  async function generate(file, recipe, dimensions, create) {
    const prior = cached.get(file);
    if(prior?.recipe===recipe) {
      try {
        const bytes = await fs.readFile(inside(base,file));
        if(hash(bytes)===prior.sha256) { outputs.push(prior); return prior; }
      } catch(error) { if(error.code!=='ENOENT') throw error; }
    }
    const bytes = await create();
    const dest = inside(base,file);
    await fs.mkdir(path.dirname(dest),{recursive:true});
    await fs.writeFile(dest,bytes);
    const row = {file,...dimensions,recipe,bytes:bytes.length,sha256:hash(bytes)};
    outputs.push(row);
    return row;
  }
  async function pngExport(source,file,width,height) {
    const bytes = await fs.readFile(inside(base,source));
    const scale = Math.max(1,Math.ceil(LONG_EDGE/Math.max(width,height)));
    return generate(file,hash(Buffer.from(`${POLICY}:${hash(bytes)}:${scale}`)),{source,format:'png',scale,width:width*scale,height:height*scale},
      ()=>enlargePng(bytes,width,height,scale));
  }
  for(const s of character.statics) statics[s.id] = await pngExport(s.file,`hd/${s.file}`,s.width,s.height);
  for(const a of character.animations) {
    const unique = [...new Set(a.sequence.map(f=>f.frame))];
    const frames = [];
    for(const frame of unique) frames.push(await pngExport(`animaciones/${frame}`,`hd/animaciones/${frame}`,a.canvas.width,a.canvas.height));
    const first = frames[0];
    const hdPreview = `hd/animaciones/${a.preview}`;
    const preview = await generate(hdPreview,hash(Buffer.from(`${POLICY}:webp:${JSON.stringify(a.sequence)}:${frames.map(f=>f.sha256).join(':')}`)),
      {source:`animaciones/${a.preview}`,format:'webp',width:first.width,height:first.height,scale:first.scale,steps:a.sequence.length,totalMs:a.totalMs},async()=>{
        const bySource = new Map();
        for(const f of frames) bySource.set(f.source,await fs.readFile(inside(base,f.file)));
        return sharp(a.sequence.map(f=>bySource.get(`animaciones/${f.frame}`)),{join:{animated:true}})
          .webp({lossless:true,effort:1,loop:0,delay:a.sequence.map(f=>f.ms)}).toBuffer();
      });
    const cols = Math.min(4,unique.length), rows = Math.ceil(unique.length/cols);
    const width = a.canvas.width*cols, height = a.canvas.height*rows;
    const originalBuffers = await Promise.all(unique.map(f=>fs.readFile(inside(base,`animaciones/${f}`))));
    const sheet = await generate(`hojas/${a.id}.png`,hash(Buffer.from(`${POLICY}:sheet:${cols}:${originalBuffers.map(hash).join(':')}`)),
      {format:'png',width,height,scale:1,animation:a.id,columns:cols,frames:unique.length},async()=>{
        const data=Buffer.alloc(width*height*4);
        for(let i=0;i<originalBuffers.length;i++) {
          const pixels=await sharp(originalBuffers[i]).ensureAlpha().raw().toBuffer();
          const left=(i%cols)*a.canvas.width,top=Math.floor(i/cols)*a.canvas.height;
          for(let y=0;y<a.canvas.height;y++) pixels.copy(data,((top+y)*width+left)*4,y*a.canvas.width*4,(y+1)*a.canvas.width*4);
        }
        return sharp(data,{raw:{width,height,channels:4}}).png({compressionLevel:9}).toBuffer();
      });
    const sheetHD = await pngExport(sheet.file,`hd/${sheet.file}`,width,height);
    animations[a.id] = {preview,frames,sheet,sheetHD};
    console.log(`HD: ${a.id} · ${preview.width} × ${preview.height} · ${frames.length} fotogramas`);
  }
  const archiveFile = 'descargas/gatopago-personaje-hd.zip';
  const manifest = {schemaVersion:1,longEdgeMinimum:LONG_EDGE,resampling:'nearest',policy:POLICY,
    note:'Integer enlargement without added detail; colours and alpha of source crops are preserved.',files:outputs,archive:{file:archiveFile}};
  const originalFiles = [...character.statics.map(s=>s.file),...character.animations.flatMap(a=>[`animaciones/${a.preview}`,...new Set(a.sequence.map(f=>`animaciones/${f.frame}`))])];
  const allFiles = [...originalFiles,...outputs.map(f=>f.file)];
  const entries = Object.create(null);
  for(const file of allFiles) entries[file] = [new Uint8Array(await fs.readFile(inside(base,file))),{mtime:new Date(2026,0,1),level:6}];
  entries['animaciones/manifest.json'] = [new Uint8Array(Buffer.from(JSON.stringify(character,null,2)+'\n')),{mtime:new Date(2026,0,1),level:6}];
  entries['exportaciones.json'] = [new Uint8Array(Buffer.from(JSON.stringify({...manifest,archive:undefined},null,2)+'\n')),{mtime:new Date(2026,0,1),level:6}];
  const archive = Buffer.from(zipSync(entries));
  await fs.mkdir(path.join(base,'descargas'),{recursive:true});
  await fs.writeFile(inside(base,archiveFile),archive);
  manifest.archive.bytes = archive.length;
  manifest.archive.sha256 = hash(archive);
  await fs.writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
  return {manifest,statics,animations};
}
