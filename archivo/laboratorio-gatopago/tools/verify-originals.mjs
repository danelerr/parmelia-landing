import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..'),kit=resolve(lab,'../../brandkit/03-personaje/animaciones');
const root=join(lab,'01-animaciones/originales'),original=await readFile(join(kit,'manifest.json'));
const catalog=JSON.parse(await readFile(join(root,'catalogo.json'),'utf8'));
const hash=b=>createHash('sha256').update(b).digest('hex');
assert.equal(catalog.sourceSHA256,hash(original));
const source=JSON.parse(original).animations,results=[];
assert.equal(catalog.animations.length,source.length);
for(const a of catalog.animations){
 const reference=source.find(x=>x.id===a.id);assert(reference);assert.equal(a.totalMs,reference.totalMs);
 assert.equal(a.sequence.length,reference.sequence.length);let sum=0;
 for(const [i,s] of a.sequence.entries()){
  const file=await readFile(join(root,s.frame));assert.equal(hash(file),s.sha256);
  assert.deepEqual(file,await readFile(join(kit,reference.sequence[i].frame)));
  assert.equal(s.ms,reference.sequence[i].ms);sum+=s.ms;
 }
 assert.equal(sum,a.totalMs);assert.deepEqual(await readFile(join(root,a.preview)),await readFile(join(kit,reference.preview)));
 results.push({id:a.id,steps:a.sequence.length,totalMs:a.totalMs,allCopiesByteIdentical:true,originalTimesPreserved:true});
}
await mkdir(join(lab,'.qa/originals'),{recursive:true});
await writeFile(join(lab,'.qa/originals/source-verification.json'),JSON.stringify({checkedAt:new Date().toISOString(),sourceSHA256:hash(original),results},null,2));
console.log(JSON.stringify({sequences:results.length,steps:results.reduce((n,a)=>n+a.steps,0),copiesMatch:true}));
// Contactos cronológicos: incluyen repeticiones y la unión del último al primer paso.
const priority=new Set(['cola','siesta','asomarse','reparar-rail','intercambio']),rows=[];
for(const a of catalog.animations.filter(a=>!priority.has(a.id))){
 const steps=[...a.sequence];if(a.playback==='loop')steps.push({...a.sequence[0],ms:0,seam:true});
 const tileWidth=96,rowWidth=1248,rowHeight=164,parts=[];
 parts.push({input:Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1248" height="26"><text x="8" y="19" fill="#0b0b0f" font-family="sans-serif" font-size="15">${a.name} · ${a.totalMs} ms · ${a.playback}</text></svg>`),left:0,top:0});
 let time=0;
 for(const [i,s] of steps.entries()){
  const png=await sharp(join(root,s.frame)).resize(88,104,{fit:'contain',kernel:'nearest',background:{r:255,g:248,b:240,alpha:0}}).png().toBuffer();
  parts.push({input:png,left:i*tileWidth+4,top:30});
  const label=s.seam?'CIERRE → 1':`${i+1}: ${time} / ${s.ms} ms`;
  parts.push({input:Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="24"><text x="4" y="16" fill="${s.seam?'#cf3433':'#0b0b0f'}" font-family="sans-serif" font-size="9">${label}</text></svg>`),left:i*tileWidth,top:138});time+=s.ms;
 }
 rows.push(await sharp({create:{width:rowWidth,height:rowHeight,channels:4,background:'#fff8f0'}}).composite(parts).png().toBuffer());
}
for(let p=0;p<3;p++){const subset=rows.slice(p*5,p*5+5);await sharp({create:{width:1248,height:164*subset.length,channels:4,background:'#fff8f0'}}).composite(subset.map((input,i)=>({input,left:0,top:i*164}))).png().toFile(join(lab,'.qa/originals/cronologia-'+(p+1)+'.png'));}
