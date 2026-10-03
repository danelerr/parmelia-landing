import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..'),root=join(lab,'01-animaciones/rig-revision');
const sha=b=>createHash('sha256').update(b).digest('hex');
const catalog=JSON.parse(await readFile(join(root,'comparativas.json'),'utf8'));
const layerData=JSON.parse(await readFile(join(root,'capas.json'),'utf8'));
for(const L of layerData.layers){assert.equal(sha(await readFile(join(root,L.file))),L.sha256);const m=await sharp(join(root,L.file)).metadata();assert(m.hasAlpha);assert.equal(m.width,L.width);assert.equal(m.height,L.height);}
const actions=[];
for(const a of catalog.animations){
 const manifest=JSON.parse(await readFile(join(root,a.id,'manifest.json'),'utf8'));
 assert.equal(a.frames,a.sequence.length);assert.equal(manifest.states.length,a.frames);assert.equal(a.totalMs,a.sequence.reduce((n,s)=>n+s.ms,0));
 const webp=await sharp(join(root,a.preview),{animated:true}).metadata();assert.equal(webp.width,768);assert.equal(webp.pageHeight,640);assert.equal(webp.loop,1);
 // Identical hold frames may be merged by libwebp; duration must still be exact.
 assert.equal(webp.delay.reduce((n,x)=>n+x,0),a.totalMs);
 let noClippedCanvasEdges=true;
 for(const s of a.sequence){const bytes=await readFile(join(root,s.frame));assert.equal(sha(bytes),s.sha256);const {data,info}=await sharp(bytes).ensureAlpha().raw().toBuffer({resolveWithObject:true});assert.equal(info.width,768);assert.equal(info.height,640);for(let x=0;x<768;x++)if(data[x*4+3]||data[((639*768)+x)*4+3])noClippedCanvasEdges=false;for(let y=0;y<640;y++)if(data[(y*768)*4+3]||data[(y*768+767)*4+3])noClippedCanvasEdges=false;}
 assert(noClippedCanvasEdges,a.id+' toca un borde del lienzo');
 const states=manifest.states;
 if(a.id==='asomarse'){assert(states.some(s=>s.bodyVisible));assert(states[0].fullyHidden&&states.at(-1).fullyHidden);assert(states.filter(s=>s.reveal===1).length>=16);assert.equal(a.frames,97);}
 if(a.id==='reparar-rail'){assert.equal(a.frames,121);const seated=states.filter(s=>s.seat===1);assert(seated.length>50);for(const s of seated){assert.equal(s.x,376);assert.equal(s.y,479);}assert(states.some(s=>s.glow>.99));assert(states.some(s=>s.arrowOpacity>.99));assert(states.at(-1).sign===1);assert.equal(states.at(-1).arrowOpacity,0);assert(states.filter(s=>s.glow>0).every(s=>s.seat===1));}
 if(a.id==='intercambio'){assert.equal(a.frames,109);assert.equal(states[0].gold.x,440);assert.equal(states[0].blue.x,576);assert.equal(states.at(-1).gold.x,576);assert.equal(states.at(-1).blue.x,440);assert(states.some(s=>s.bodyShift>15));assert(new Set(states.map(s=>s.armAngle)).size>20);for(const s of states){assert(s.gold.y>=297&&s.gold.y<=423);assert(s.blue.y>=423&&s.blue.y<=477);}assert.equal(states.at(-1).glow,0);}
 actions.push({id:a.id,frames:a.frames,totalMS:a.totalMs,webpPages:webp.pages,noClippedCanvasEdges,stages:a.stages});
}
const result={checkedAt:new Date().toISOString(),frames:actions.reduce((n,a)=>n+a.frames,0),actions,sourceLayersVerified:layerData.layers.length,scope:'hashes, alfa, lienzos, tiempos y estados deterministas; la aprobación artística depende de revisión humana'};
await mkdir(join(lab,'.qa/revision'),{recursive:true});await writeFile(join(lab,'.qa/revision/technical-verification.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
