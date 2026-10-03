import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..'),dir=join(lab,'01-animaciones');
const catalog=JSON.parse(await readFile(join(dir,'comparativas.json'),'utf8'));
const hash=b=>createHash('sha256').update(b).digest('hex');
const checks=[];
for(const m of catalog.animations.filter(a=>a.version===2)){
 assert.equal(hash(await readFile(join(dir,m.source))),m.sourceSHA256);
 const decoded=await sharp(join(dir,m.preview),{animated:true}).metadata();
 // WebP coalesces consecutive identical PNGs into one frame with their summed delay.
 const encodedRuns=[];for(const s of m.sequence){if(encodedRuns.at(-1)?.sha256===s.sha256)encodedRuns.at(-1).ms+=s.ms;else encodedRuns.push({...s});}
 assert.equal(decoded.pages,encodedRuns.length);assert.equal(decoded.width,m.canvas.width);assert.equal(decoded.pageHeight,m.canvas.height);
 assert.deepEqual(decoded.delay,encodedRuns.map(s=>s.ms));assert.equal(decoded.loop,m.playback==='loop'?0:1);
 const sources=await sharp(join(dir,m.source)).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const retained=[];
 for(const [i,s] of m.sequence.entries()){
  const b=await readFile(join(dir,s.frame));assert.equal(hash(b),s.sha256);
  const target=await sharp(b).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  assert.equal(target.info.width,m.canvas.width);assert.equal(target.info.height,m.canvas.height);
  const q=m.qa.cells[s.sourcePose-1],c=q.transparentTrim,cell=q.sourceCell,[left,top]=q.offset;
  let alphaMismatch=0,visibleRGBMaxDifference=0,visiblePixels=0;
  for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){
   const sp=((cell.top+c.top+y)*sources.info.width+cell.left+c.left+x)*4;
   const tp=((top+y)*target.info.width+left+x)*4;
   if(sources.data[sp+3]!==target.data[tp+3])alphaMismatch++;
   if(sources.data[sp+3]>128){visiblePixels++;for(let ch=0;ch<3;ch++)visibleRGBMaxDifference=Math.max(visibleRGBMaxDifference,Math.abs(sources.data[sp+ch]-target.data[tp+ch]));}
  }
  assert.equal(alphaMismatch,0,'Se alteró el alfa de '+m.id+' '+i);
  assert.ok(visibleRGBMaxDifference<=2,'Cambio de color no permitido '+m.id+' '+i);
  retained.push({step:i+1,sourcePose:s.sourcePose,alphaMismatch,visibleRGBMaxDifference,visiblePixels});
 }
 if(m.id==='siesta')assert.equal(m.sequence[0].sha256,m.sequence.at(-1).sha256,'Loop no cerrado');
 checks.push({id:m.id,frames:m.frames,encodedFrames:decoded.pages,playback:m.playback,webpLoop:decoded.loop,sourcePixelsPreserved:retained});
}
await mkdir(join(lab,'.qa/frames'),{recursive:true});
const result={checkedAt:new Date().toISOString(),checks,scope:'procedencia, retícula, alfa, color, temporización y cierre; no aprobación artística'};
await writeFile(join(lab,'.qa/frames/technical-verification.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify({checks:checks.map(c=>({id:c.id,frames:c.frames,webpLoop:c.webpLoop,alphaMismatch:c.sourcePixelsPreserved.reduce((n,r)=>n+r.alphaMismatch,0)})),scope:result.scope},null,2));
