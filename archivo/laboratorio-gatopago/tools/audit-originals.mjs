import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..'),kit=resolve(lab,'../../brandkit/03-personaje');
const manifest=JSON.parse(await readFile(join(kit,'animaciones/manifest.json'),'utf8'));
await mkdir(join(lab,'.qa/originals'),{recursive:true});
const rows=[],metrics=[];
for(const a of manifest.animations){
 const files=[...new Set(a.sequence.map(s=>s.frame))],composite=[];
 const tileW=104,tileH=104;
 const title=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="30"><text x="10" y="22" font-family="sans-serif" font-size="17" fill="#0b0b0f">${a.id} · ${files.length} poses · ${a.playback} · ${a.totalMs} ms</text></svg>`);
 composite.push({input:title,left:0,top:0});
 const details=[];
 for(const [i,file] of files.entries()){
  const b=await readFile(join(kit,'animaciones',file)),raw=await sharp(b).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  let count=0,x0=raw.info.width,y0=raw.info.height,x1=-1,y1=-1;
  for(let y=0;y<raw.info.height;y++)for(let x=0;x<raw.info.width;x++){
   if(raw.data[(y*raw.info.width+x)*4+3]>24){count++;x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);}
  }
  const thumb=await sharp(b).resize(tileW-8,tileH-8,{fit:'contain',kernel:'nearest',background:{r:255,g:248,b:240,alpha:0}}).png().toBuffer();
  composite.push({input:thumb,left:i*tileW+4,top:38});
  details.push({pose:i+1,file,width:raw.info.width,height:raw.info.height,alphaPixels:count,bounds:[x0,y0,x1,y1],touchesEdge:x0===0||y0===0||x1===raw.info.width-1||y1===raw.info.height-1});
 }
 const row=await sharp({create:{width:1080,height:146,channels:4,background:'#fff8f0'}}).composite(composite).png().toBuffer();
 rows.push(row);metrics.push({id:a.id,uniquePoses:files.length,steps:a.sequence.length,playback:a.playback,totalMs:a.totalMs,frames:details});
}
for(let page=0;page<2;page++){
 const pageRows=rows.slice(page*10,(page+1)*10);
 await sharp({create:{width:1080,height:146*pageRows.length,channels:4,background:'#fff8f0'}}).composite(pageRows.map((input,i)=>({input,left:0,top:i*146}))).png().toFile(join(lab,'.qa/originals',`secuencias-${page+1}.png`));
}
await writeFile(join(lab,'.qa/originals/metrics.json'),JSON.stringify({source:'brandkit/03-personaje/animaciones/manifest.json',scope:'inventario, límites y contacto para revisión visual; no certifica anatomía ni continuidad',animations:metrics},null,2));
console.log(JSON.stringify({sequences:metrics.length,uniquePoses:metrics.reduce((n,a)=>n+a.uniquePoses,0),edgeContacts:metrics.flatMap(a=>a.frames.filter(f=>f.touchesEdge).map(f=>({id:a.id,pose:f.pose})))},null,2));
