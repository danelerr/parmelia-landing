import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..'),root=join(lab,'01-animaciones/rig-acciones');
const sha=b=>createHash('sha256').update(b).digest('hex');
const sourceLayers=JSON.parse(await readFile(join(root,'capas.json'),'utf8')).layers,layers=new Map();
for(const L of sourceLayers){const png=await readFile(join(root,L.file)),source=await readFile(join(lab,L.source.file));assert.equal(sha(png),L.sha256);assert.equal(sha(source),L.source.sha256);if(L.source.cell)assert.deepEqual(await sharp(png).ensureAlpha().raw().toBuffer(),await sharp(source).extract(L.source.cell).ensureAlpha().raw().toBuffer());else if(L.source.renderedSVG)assert.deepEqual(png,await sharp(source).png().toBuffer());else assert.deepEqual(png,source);layers.set(L.name,{...L,png,dataURI:'data:image/png;base64,'+png.toString('base64')});}
const catalog=JSON.parse(await readFile(join(root,'comparativas.json'),'utf8')),results=[];
for(const a of catalog.animations){const M=JSON.parse(await readFile(join(root,a.id,'manifest.json'),'utf8')),rules=JSON.parse(await readFile(join(root,a.id,'reglas.json'),'utf8')),scene=await readFile(join(root,a.source));assert.equal(sha(scene),a.sourceSHA256);await readFile(join(root,a.prompt));assert.equal(M.geometry.length,a.frames);assert.equal(a.sequence.length,a.frames);const runs=[];let maximumGroundError=0,minimumGroundSupport=Infinity;
 for(let i=0;i<a.frames;i++){const G=M.geometry[i],t=i/(a.frames-1),first=M.geometry[0],inner=G.groups.map((tag,j)=>{const p=G.images[j],L=layers.get(a.imageSources[p.id]);assert(L,'Capa desconocida '+p.id);const baseline=first.images.find(b=>b.id===p.id);assert.equal(p.width,baseline.width);assert.equal(p.height,baseline.height);return tag+`<image id="${p.id}" href="${L.dataURI}" x="${p.x.toFixed(3)}" y="${p.y.toFixed(3)}" width="${p.width.toFixed(3)}" height="${p.height.toFixed(3)}"/></g>`;}).join('');
  const rendered=await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="768" height="640" viewBox="0 0 768 640">${inner}</svg>`)).png().toBuffer(),png=await readFile(join(root,a.sequence[i].frame));assert.equal(sha(png),a.sequence[i].sha256);assert.deepEqual(rendered,png,'Montaje no reproducible '+a.id+' '+i);const raw=await sharp(png).ensureAlpha().raw().toBuffer({resolveWithObject:true});assert.equal(raw.info.width,768);assert.equal(raw.info.height,640);for(let y=0;y<640;y++)for(let x=0;x<768;x++)if(x===0||x===767||y===0||y===639)assert.equal(raw.data[(y*768+x)*4+3],0,'Alfa en borde');
  if(a.id==='mantenimiento'){
   for(const id of ['worker-image','rail-image'])assert.deepEqual(G.images.find(p=>p.id===id),first.images.find(p=>p.id===id),'Casco/cuerpo/rail desplazado');
   const hammerAngle=Number(G.groups[1].match(/rotate\(([-\d.]+)/)[1]),pawAngle=Number(G.groups[2].match(/rotate\(([-\d.]+)/)[1]);assert.equal(hammerAngle,pawAngle);assert(Math.abs(hammerAngle+12*(1+Math.cos(4*Math.PI*t)))<.0001);assert.equal(rules.hammerY+layers.get('martillo').height,rules.railTop,'Martillo no toca el rail al golpear');
  }else{
   const image=G.images.find(p=>p.id==='upper-image'),baseline=first.images.find(p=>p.id==='upper-image');assert.equal(image.x,baseline.x);assert.equal(image.width,baseline.width);assert.equal(image.height,baseline.height);const support=[];
   for(let j=0;j<2;j++){
    const L=layers.get(j?'pata-cercana':'pata-lejana'),placement=G.images.find(p=>p.id==='leg-'+j+'-image'),tag=G.groups.find(s=>s.startsWith('<g id="leg-'+j+'"')),match=tag.match(/translate\(0 ([-\d.]+)\) rotate\(([-\d.]+) ([-\d.]+) ([-\d.]+)\)/);assert(match,'Transformación de pata inválida');const [,ly,angle,hx,hy]=match.map(Number),rad=angle*Math.PI/180,alpha=await sharp(L.png).ensureAlpha().raw().toBuffer();let maxY=-Infinity;
    assert(Math.abs(angle-(j?-1:1)*26*Math.cos(2*Math.PI*t))<.0001);
    for(let y=0;y<L.height;y++)for(let x=0;x<L.width;x++)if(alpha[(y*L.width+x)*4+3]>24){const X=placement.x+x*placement.width/L.width,Y=placement.y+y*placement.height/L.height;maxY=Math.max(maxY,hy+(X-hx)*Math.sin(rad)+(Y-hy)*Math.cos(rad)+ly);}
    assert(maxY<=rules.groundY+.01,'Pata atraviesa el suelo');support.push(maxY);
   }
   const error=Math.abs(Math.max(...support)-rules.groundY);maximumGroundError=Math.max(maximumGroundError,error);minimumGroundSupport=Math.min(minimumGroundSupport,Math.max(...support));assert(error<.01,'Ninguna pata apoya en suelo');
   if(a.id==='preparando-pago'){
    const rail=G.images.find(p=>p.id==='rail-image'),signal=G.images.find(p=>p.id==='signal-image');assert.deepEqual(rail,first.images.find(p=>p.id==='rail-image'));assert.equal(rail.y,rules.groundY);if(i===0)assert.equal(signal.x,rail.x+4);if(i===a.frames-1)assert.equal(signal.x+signal.width,rail.x+rail.width-4);const opacity=Number(G.groups[1].match(/opacity="([\d.]+)"/)[1]);if(i===0||i===a.frames-1)assert.equal(opacity,0,'Reinicio visible de señal');assert(opacity>=0&&opacity<=1);
   }
  }
  if(runs.at(-1)?.sha256===a.sequence[i].sha256)runs.at(-1).ms+=a.sequence[i].ms;else runs.push({...a.sequence[i]});
 }
 assert.equal(a.sequence[0].sha256,a.sequence.at(-1).sha256,'Loop no cierra');const W=await sharp(join(root,a.preview),{animated:true}).metadata();assert.equal(W.pages,runs.length);assert.deepEqual(W.delay,runs.map(s=>s.ms));assert.equal(W.loop,0);assert.equal(W.width,768);assert.equal(W.pageHeight,640);
 results.push({id:a.id,frames:a.frames,totalMs:a.totalMs,encodedFrames:W.pages,layersExact:true,allPNGRebuilt:true,edgeContacts:0,loopClosingIdentical:true,upperBodyPackageStable:a.id!=='mantenimiento',maximumGroundError:a.id!=='mantenimiento'?maximumGroundError:undefined,minimumGroundSupport:a.id!=='mantenimiento'?minimumGroundSupport:undefined,helmetBodyRailStable:a.id==='mantenimiento',hammerAndPawCoupled:a.id==='mantenimiento',hammerTouchesRail:a.id==='mantenimiento'});
}
const result={checkedAt:new Date().toISOString(),actions:results.length,frames:results.reduce((n,a)=>n+a.frames,0),layers:layers.size,results,scope:'Píxeles de origen, reconstrucción PNG, apoyo geométrico, cierre lossless y piezas fijas; no certifica anatomía final ni fluidez en cualquier teléfono.'};await mkdir(join(lab,'.qa/raster-actions'),{recursive:true});await writeFile(join(lab,'.qa/raster-actions/technical-verification.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
