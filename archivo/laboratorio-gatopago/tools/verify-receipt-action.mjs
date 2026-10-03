import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..'),root=join(lab,'01-animaciones/rig-documento'),sha=b=>createHash('sha256').update(b).digest('hex'),M=JSON.parse(await readFile(join(root,'comprobante/manifest.json'),'utf8')),S=M.rules.safe;
assert.equal(M.frames,61);assert.equal(M.playback,'once');assert.equal(M.geometry.length,61);assert.equal(M.totalMs,2580);
for(const [i,source] of M.sources.entries()){const bytes=await readFile(join(lab,source.file));assert.equal(sha(bytes),source.sha256);const tag=i===0?M.rules.bodyTag:M.rules.headTag,encoded=tag.match(/href="data:image\/png;base64,([^"]+)"/);assert(encoded);assert.deepEqual(Buffer.from(encoded[1],'base64'),bytes,'PNG de escena distinto de la fuente');}
assert.equal(sha(await readFile(join(root,M.source))),M.sourceSHA256);await readFile(join(root,M.prompt));
const originals=JSON.parse(await readFile(join(lab,'01-animaciones/originales/catalogo.json'),'utf8'));assert.deepEqual(M.original,originals.animations.find(a=>a.id==='comprobante'));
let first,firstInkPixels,lastInkPixels;const runs=[],inkBounds={left:Math.floor(S.x-5),top:Math.floor(S.y-5),right:Math.ceil(S.x+S.width+5),bottom:Math.ceil(S.y+S.height+5)};
for(let i=0;i<61;i++){
 const step=M.sequence[i],G=M.geometry[i],png=await readFile(join(root,step.frame));assert.equal(sha(png),step.sha256);assert.equal(G.step,i+1);const rebuilt=await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="768" height="640" viewBox="0 0 768 640">${M.rules.bodyTag}${M.rules.headTag}${G.ink}</svg>`)).png().toBuffer();assert.deepEqual(rebuilt,png,'PNG no reconstruible '+i);
 const raw=await sharp(png).ensureAlpha().raw().toBuffer();if(!first)first=raw;
 let inkPixels=0;
 for(let y=0;y<640;y++)for(let x=0;x<768;x++){
  const p=(y*768+x)*4;
  if(x===0||y===0||x===767||y===639)assert.equal(raw[p+3],0,'Alfa en borde');
  const inside=x>=inkBounds.left&&x<=inkBounds.right&&y>=inkBounds.top&&y<=inkBounds.bottom;
  if(!inside)for(let c=0;c<4;c++)assert.equal(raw[p+c],first[p+c],'Cambió cuerpo/cara/papel fuera de la tinta');
  if(inside&&raw.subarray(p,p+4).some((value,c)=>value!==first[p+c]))assert(first[p]>200&&first[p+1]>200&&first[p+2]>180&&first[p+3]>240,'Tinta sobre gato, borde o transparencia');
  if(inside&&raw[p+3]>240&&raw[p]<45&&raw[p+1]<45&&raw[p+2]<45)inkPixels++;
 }
 if(i===0){firstInkPixels=inkPixels;assert.match(G.ink,/opacity="0.0000"/);assert.match(G.ink,/width="0.0000"/);}
 if(i===60){lastInkPixels=inkPixels;assert.match(G.ink,/opacity="1.0000"/);assert.match(G.ink,/stroke-dashoffset="0.0000"/);}
 if(runs.at(-1)?.sha256===step.sha256)runs.at(-1).ms+=step.ms;else runs.push({...step});
}
assert(lastInkPixels>firstInkPixels+200,'El detalle final no se dibujó');assert.notEqual(M.sequence[0].sha256,M.sequence.at(-1).sha256);
const W=await sharp(join(root,M.preview),{animated:true}).metadata();assert.equal(W.pages,runs.length);assert.deepEqual(W.delay,runs.map(s=>s.ms));assert.equal(W.loop,1);assert.equal(W.width,768);assert.equal(W.pageHeight,640);
const result={checkedAt:new Date().toISOString(),actions:1,frames:61,encodedFrames:W.pages,totalMs:M.totalMs,allPNGRebuilt:true,sourcesExact:true,embeddedPNGEqualsSources:true,outsideInkPixelsIdentical:true,inkOnlyOnOriginalPaper:true,firstInkPixels,lastInkPixels,firstLastDifferent:true,edgeContacts:0,loop:1,scope:'Fuentes y PNG, constancia fuera del papel, alfa, final distinto y codificación WebP; no detecta anatomía ni confirma pagos.'};await mkdir(join(lab,'.qa/receipt'),{recursive:true});await writeFile(join(lab,'.qa/receipt/technical-verification.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
