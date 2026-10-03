import {readFile,writeFile,mkdir,stat} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const repo=resolve(lab,'../..'),root=join(lab,'01-animaciones/rig-raster');
const hash=b=>createHash('sha256').update(b).digest('hex');
const catalog=JSON.parse(await readFile(join(root,'comparativas.json'),'utf8'));
const sourceLayers=JSON.parse(await readFile(join(root,'capas.json'),'utf8')).layers;
const layers=new Map(),results=[];
for(const layer of sourceLayers){
 const png=await readFile(join(root,layer.file));assert.equal(hash(png),layer.sha256);
 const raw=await sharp(png).ensureAlpha().raw().toBuffer();
 const originalPath=layer.source.file.startsWith('brandkit/')?join(repo,layer.source.file):join(lab,layer.source.file);
 const original=await readFile(originalPath);
 if(layer.source.sha256)assert.equal(hash(original),layer.source.sha256);
 if(layer.source.renderedSVG){
  assert.deepEqual(png,await sharp(original).png().toBuffer(),'El objeto no reproduce su SVG: '+layer.name);
 }else if(layer.source.cell){
  const extracted=await sharp(original).extract(layer.source.cell).ensureAlpha().raw().toBuffer();
  assert.deepEqual(raw,extracted,'La extracción cambió los píxeles: '+layer.name);
 }else assert.deepEqual(png,original,'La copia original cambió: '+layer.name);
 layers.set(layer.name,{...layer,dataURI:'data:image/png;base64,'+png.toString('base64')});
}
for(const a of catalog.animations){
 const manifest=JSON.parse(await readFile(join(root,a.id,'manifest.json'),'utf8'));
 const scene=await readFile(join(root,a.source),'utf8');
 assert.equal(hash(Buffer.from(scene)),a.sourceSHA256);
 assert(!/<script|<foreignObject/.test(scene));
 for(const m of scene.matchAll(/<image id="([^"]+)" href="data:image\/png;base64,([^"]+)"/g)){
  assert.equal(hash(Buffer.from(m[2],'base64')),layers.get(a.imageSources[m[1]]).sha256);
 }
 assert.equal(manifest.geometry.length,a.frames);assert.equal(a.sequence.length,a.frames);
 assert((await stat(join(root,a.prompt))).isFile(),'Prompt/reglas ausentes: '+a.id);
 const firstGeometry=manifest.geometry[0],lastGeometry=manifest.geometry.at(-1);
 const expectedIds={cola:['tail-image','body-image'],siesta:['sleep-body-image','sleep-head-image'],asomarse:['neutral-head-image','stationary-card-image'],'reparar-rail':['rail-image','rail-block-image','paw-image','worker-image'],intercambio:['tail-image','body-image','gold-image','blue-image']}[a.id];
 const stationary={cola:'body-image',siesta:'sleep-head-image',asomarse:'stationary-card-image','reparar-rail':'worker-image',intercambio:'body-image'}[a.id];
 const rules=JSON.parse(await readFile(join(root,a.id,'reglas.json'),'utf8'));
 const anchor=firstGeometry.images.find(x=>x.id===stationary);
 const runs=[];let totalEdges=0;
 for(let i=0;i<a.frames;i++){
  const s=a.sequence[i],g=manifest.geometry[i],t=i/(a.frames-1);
  assert.deepEqual(g.images.map(x=>x.id),expectedIds);assert.equal(g.groups.length,expectedIds.length);
  assert.deepEqual(g.images.find(x=>x.id===stationary),anchor,'Se movió la pieza fija: '+a.id);
  for(const placement of g.images){
   const baseline=firstGeometry.images.find(x=>x.id===placement.id);
   assert.equal(placement.width,baseline.width);assert.equal(placement.height,baseline.height);
   const moving=a.id==='asomarse'&&placement.id==='neutral-head-image'||a.id==='reparar-rail'&&placement.id==='rail-block-image'||a.id==='intercambio'&&['gold-image','blue-image'].includes(placement.id);
   if(!moving)assert.deepEqual(placement,baseline);
   else if(a.id==='asomarse'){
    const ease=v=>v*v*(3-2*v),reveal=t<.43?ease(t/.43):t<.6?1:1-ease((t-.6)/.4);
    assert.equal(placement.x,Number((48+196*reveal).toFixed(3)));assert.equal(placement.y,128);
   }
  }
  if(a.id==='cola'){
   assert.equal(g.groups[1],'<g id="body">');
   const angle=Number(g.groups[0].match(/rotate\(([-\d.]+)/)[1]);
   assert(Math.abs(angle-9*Math.sin(t*Math.PI*2))<.0001);
   assert.equal(g.groups[0].replace(/rotate\([\-\d.]+ /,'rotate(ANGLE '),firstGeometry.groups[0].replace(/rotate\([\-\d.]+ /,'rotate(ANGLE '));
  }else if(a.id==='siesta'){
   assert.equal(g.groups[1],'<g id="head">');
   const sy=Number(g.groups[0].match(/scale\(1 ([\d.]+)\)/)[1]);
   assert(Math.abs(sy-(1+.014*(1-Math.cos(t*Math.PI*2))/2))<.000001);
   assert.equal(g.groups[0].replace(/scale\(1 [\d.]+\)/,'scale(1 SCALE)'),'<g id="body" transform="translate(0 504) scale(1 SCALE) translate(0 -504)">');
  }else if(a.id==='reparar-rail'){
   for(const j of [0,1,3])assert.equal(g.groups[j],firstGeometry.groups[j]);
   const angle=Number(g.groups[2].match(/rotate\(([-\d.]+)/)[1]),expected=-28+52*t*t*(3-2*t);
   assert(Math.abs(angle-expected)<.0001);
   const piece=g.images[1],r=expected*Math.PI/180;
   assert.equal(piece.x,Number((rules.railPivot.x+120*Math.cos(r)-48).toFixed(3)));
   assert.equal(piece.y,Number((rules.railPivot.y+120*Math.sin(r)+18).toFixed(3)));
  }else assert.deepEqual(g.groups,firstGeometry.groups);
  const defs=a.id==='asomarse'?'<defs><clipPath id="occlusion"><rect x="350" y="70" width="380" height="490"/></clipPath></defs>':'';
  const inner=g.groups.map((tag,j)=>{
   const p=g.images[j],L=layers.get(a.imageSources[p.id]);
   return tag+`<image id="${p.id}" href="${L.dataURI}" x="${p.x.toFixed(3)}" y="${p.y.toFixed(3)}" width="${p.width.toFixed(3)}" height="${p.height.toFixed(3)}"/></g>`;
  }).join('');
  const rebuilt=await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="768" height="640" viewBox="0 0 768 640">${defs}${inner}</svg>`)).png().toBuffer();
  const png=await readFile(join(root,s.frame));assert.equal(hash(png),s.sha256);
  assert.equal(hash(rebuilt),s.sha256,'El montaje no reproduce el PNG: '+a.id+' '+(i+1));
  const raw=await sharp(png).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  assert.equal(raw.info.width,768);assert.equal(raw.info.height,640);
  for(let y=0;y<640;y++)for(let x=0;x<768;x++)if((x===0||y===0||x===767||y===639)&&raw.data[(y*768+x)*4+3])totalEdges++;
  if(runs.at(-1)?.sha256===s.sha256)runs.at(-1).ms+=s.ms;else runs.push({...s});
 }
 assert.equal(totalEdges,0,'Hay píxeles tocando borde: '+a.id);
 const closing=a.playback==='loop'||a.id==='asomarse';
 if(closing)assert.equal(a.sequence[0].sha256,a.sequence.at(-1).sha256,'El cierre no coincide');
 else assert.notEqual(a.sequence[0].sha256,a.sequence.at(-1).sha256,'La acción no modifica su resultado');
 if(a.id==='reparar-rail'){
  const piece=lastGeometry.images.find(x=>x.id==='rail-block-image');
  assert.deepEqual({x:piece.x,y:piece.y,width:piece.width,height:piece.height},rules.railGap,'La pieza no encaja en el hueco');
  assert.equal(layers.get('rail-fijo').width,560);
  const railRaw=await sharp(join(root,layers.get('rail-fijo').file)).ensureAlpha().raw().toBuffer();
  for(let y=0;y<36;y++)for(let x=280;x<376;x++)assert.equal(railRaw[(y*560+x)*4+3],0,'El hueco del rail tiene alfa');
 }
 if(a.id==='intercambio'){
  const firstGold=firstGeometry.images.find(x=>x.id==='gold-image'),lastGold=lastGeometry.images.find(x=>x.id==='gold-image');
  const firstBlue=firstGeometry.images.find(x=>x.id==='blue-image'),lastBlue=lastGeometry.images.find(x=>x.id==='blue-image');
  assert.equal(firstGold.x,lastBlue.x);assert.equal(firstGold.y,lastBlue.y);assert.equal(firstBlue.x,lastGold.x);assert.equal(firstBlue.y,lastGold.y);
  for(const g of manifest.geometry){
   const A=g.images[2],B=g.images[3];assert(A.x+64<=B.x||B.x+64<=A.x||A.y+64<=B.y||B.y+64<=A.y,'Los bloques se superponen');
   for(const object of [A,B])for(const character of g.images.slice(0,2)){
    const layer=layers.get(a.imageSources[character.id]),sx=character.width/layer.width,sy=character.height/layer.height;
    const rect={x0:character.x+layer.bounds.x0*sx,x1:character.x+layer.bounds.x1*sx,y0:character.y+layer.bounds.y0*sy,y1:character.y+layer.bounds.y1*sy};
    assert(object.x+64<=rect.x0||object.x>=rect.x1||object.y+64<=rect.y0||object.y>=rect.y1,'Un bloque invade el cuerpo/cola');
   }
  }
 }
 const webp=await sharp(join(root,a.preview),{animated:true}).metadata();
 assert.equal(webp.pages,runs.length);assert.deepEqual(webp.delay,runs.map(s=>s.ms));assert.equal(webp.loop,a.playback==='loop'?0:1);
 assert.equal(webp.width,768);assert.equal(webp.pageHeight,640);
 results.push({id:a.id,frames:a.frames,encodedFrames:webp.pages,totalMs:a.totalMs,sourceLayersVerified:true,allFramesReproducedFromLayers:true,stationaryLayer:stationary,geometryInvariant:true,edgeContacts:totalEdges,firstLastIdentical:closing,railPieceMatchesGap:a.id==='reparar-rail'?true:undefined,objectsSwapPositions:a.id==='intercambio'?true:undefined,webpLoop:webp.loop,manifestBytes:(await stat(join(root,a.id,'manifest.json'))).size});
}
const output={checkedAt:new Date().toISOString(),layers:sourceLayers.length,actions:results.length,frames:results.reduce((n,a)=>n+a.frames,0),results,scope:'Origen de capas, montaje reproducible, geometría, transparencia, cierre y WebP; no acredita aprobación artística ni rendimiento móvil.'};
await mkdir(join(lab,'.qa/raster-rig'),{recursive:true});
await writeFile(join(lab,'.qa/raster-rig/technical-verification.json'),JSON.stringify(output,null,2));
console.log(JSON.stringify(output));
