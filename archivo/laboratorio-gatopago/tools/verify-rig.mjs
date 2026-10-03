import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..'),root=join(lab,'01-animaciones/rig-controlado');
const catalog=JSON.parse(await readFile(join(root,'comparativas.json'),'utf8'));
const hash=b=>createHash('sha256').update(b).digest('hex');
const group=(svg,id)=>{const start=svg.indexOf('<g id="'+id+'"');if(start<0)return '';return svg.slice(svg.indexOf('>',start)+1,svg.indexOf('</g>',start));};
const results=[];
for(const a of catalog.animations){
 assert.equal(hash(await readFile(join(root,a.source))),a.sourceSHA256);
 assert.equal(hash(await readFile(join(lab,a.headSource))),a.headSourceSHA256);
 const frames=[];
 for(const s of a.sequence){
  const png=await readFile(join(root,s.frame));assert.equal(hash(png),s.sha256);
  const svg=await readFile(join(root,s.svg),'utf8');
  assert(!/<image|<script|<foreignObject/i.test(svg));
  const raw=await sharp(png).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  assert.equal(raw.info.width,768);assert.equal(raw.info.height,576);
  let edges=0;for(let y=0;y<576;y++)for(let x=0;x<768;x++)if((x===0||y===0||x===767||y===575)&&raw.data[(y*768+x)*4+3])edges++;
  assert.equal(edges,0,'Silueta tocando borde: '+a.id);
  frames.push({svg,head:group(svg,'head'),body:group(svg,'body'),tail:group(svg,'tail'),rail:group(svg,'stationary-rail'),card:group(svg,'stationary-card')});
 }
 const invariant=id=>new Set(frames.map(f=>f[id])).size===1;
 assert(invariant('head'),'La forma de la cabeza varía: '+a.id);
 if(a.id!=='siesta')assert(invariant('body'),'El cuerpo varía: '+a.id);
 if(a.id!=='cola')assert(invariant('tail'),'La cola varía fuera de su acción: '+a.id);
 if(a.id==='asomarse')assert(invariant('card'),'La tarjeta cambia');
 if(a.id==='reparar-rail')assert(invariant('rail'),'El rail cambia');
 if(a.playback==='loop'||a.id==='asomarse')assert.equal(a.sequence[0].sha256,a.sequence.at(-1).sha256,'El cierre no coincide');
 const runs=[];for(const s of a.sequence){if(runs.at(-1)?.sha256===s.sha256)runs.at(-1).ms+=s.ms;else runs.push({...s});}
 const metadata=await sharp(join(root,a.preview),{animated:true}).metadata();
 assert.equal(metadata.pages,runs.length);assert.deepEqual(metadata.delay,runs.map(s=>s.ms));assert.equal(metadata.loop,a.playback==='loop'?0:1);
 results.push({id:a.id,frames:a.frames,encodedFrames:metadata.pages,headShapeStable:true,bodyStable:a.id==='siesta'?'pecho varía un píxel':invariant('body'),tailStable:a.id==='cola'?'solo cola animada':invariant('tail'),stationaryGeometryStable:true,edgeContacts:0,webpLoop:metadata.loop});
}
await mkdir(join(lab,'.qa/rig'),{recursive:true});
await writeFile(join(lab,'.qa/rig/technical-verification.json'),JSON.stringify({checkedAt:new Date().toISOString(),results,scope:'identidad geométrica, bordes, hashes y tiempos; la anatomía y el gusto visual requieren revisión humana'},null,2));
console.log(JSON.stringify({actions:results.length,svgFrames:results.reduce((n,a)=>n+a.frames,0),results}));
