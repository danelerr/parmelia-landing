import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import sharp from 'sharp';

const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dir=join(lab,'01-animaciones'),kit=resolve(lab,'../../brandkit/03-personaje');
const originalManifest=JSON.parse(await readFile(join(kit,'animaciones/manifest.json'),'utf8'));
const definitions=[
 {id:'siesta',anchor:'ear',destination:[280,100],order:[0,1,2,3,3,2,1,0],delay:[600,420,420,420,600,420,420,600],playback:'loop',correction:'Se elimina la oreja discordante y se usa una respiración de ida y vuelta con cuatro poses únicas. El primer y último PNG son idénticos.',limit:'Persisten cambios pequeños de pelaje y contorno entre las cuatro poses; no es una respiración por capas ni arte pixel-perfect aprobado.'},
 {id:'asomarse',anchor:'card',destination:[120,90],order:[0,1,2,3,4,3,2,1,0],delay:[600,180,180,220,800,220,180,180,600],playback:'once',correction:'Se retiran las patas añadidas. La vuelta reutiliza las mismas poses que la entrada, sin generar una segunda cabeza para la retirada.',limit:'La tarjeta aún cambia de ancho y el rostro cambia de inclinación. Borrador: no satisface todavía la invariancia de tarjeta y cabeza.'},
 {id:'reparar-rail',anchor:'rail',destination:[120,430],order:[0,1,2,3,4,5,6,7],delay:[500,300,350,350,350,300,300,900],playback:'once',correction:'Se registra el rail por su extremo inferior izquierdo. La pieza se levanta y baja; la reparación se mantiene al finalizar, sin loop automático.',limit:'La pieza cambia de lugar durante la inserción y el cuerpo deriva respecto al rail. Borrador: falta fijar el hueco y conservar la anatomía.'},
 {id:'intercambio',anchor:'ear',destination:[320,130],order:[0,1,2,3,4,5,6,7],delay:[500,300,350,350,350,350,400,900],playback:'once',correction:'La cola permanece a la derecha y los dos bloques están presentes. El resultado se conserva al terminar; no se presenta como progreso financiero.',limit:'Las patas cambian de postura entre poses y algunos bloques rozan el contorno de la cabeza. Borrador: falta continuidad corporal.'}
];
const canvas={width:640,height:768};
const hash=data=>createHash('sha256').update(data).digest('hex');

function nearestGutter(counts,nominal,radius){
 for(let d=0;d<=radius;d++)for(const p of [nominal+d,nominal-d]){
  if(p>1&&p<counts.length-2&&counts[p-1]===0&&counts[p]===0&&counts[p+1]===0)return p;
 }
 throw Error(`Sin separador realmente transparente alrededor de ${nominal}`);
}
function bounds(data,width,height,predicate){
 let x0=width,y0=height,x1=-1,y1=-1,count=0;
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const p=(y*width+x)*4;
  if(predicate(data[p],data[p+1],data[p+2],data[p+3],x,y)){
   x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);count++;
  }
 }
 if(!count)throw Error('No se encontró el ancla o la silueta');
 return {x0,y0,x1,y1,count};
}

const results=[];
for(const definition of definitions){
 if(definition.id==='siesta')definition.destination=[280,200];
 if(definition.id==='asomarse')definition.destination=[160,90];
 if(definition.id==='reparar-rail')definition.destination=[120,530];
 if(definition.id==='intercambio')definition.destination=[320,220];
 const source=join(dir,'fuentes',definition.id+'-v2.png'),sourceBuffer=await readFile(source);
 const {data,info}=await sharp(sourceBuffer).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const countsY=Array(info.height).fill(0);
 for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>0)countsY[y]++;
 const rows=[0,nearestGutter(countsY,Math.round(info.height/2),Math.round(info.height*.12)),info.height];
 const cells=[];
 for(let row=0;row<2;row++){
  const countsX=Array(info.width).fill(0);
  for(let y=rows[row];y<rows[row+1];y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>0)countsX[x]++;
  const columns=[0,...[1,2,3].map(i=>nearestGutter(countsX,Math.round(info.width*i/4),Math.round(info.width*.06))),info.width];
  for(let col=0;col<4;col++){
   const cell={left:columns[col],top:rows[row],width:columns[col+1]-columns[col],height:rows[row+1]-rows[row]};
   const rgba=await sharp(sourceBuffer).extract(cell).ensureAlpha().raw().toBuffer({resolveWithObject:true});
   const w=rgba.info.width,h=rgba.info.height,d=rgba.data;
   const visible=bounds(d,w,h,(_r,_g,_b,a)=>a>0);
   const contour=bounds(d,w,h,(_r,_g,_b,a)=>a>24);
   if(contour.x0===0||contour.y0===0||contour.x1===w-1||contour.y1===h-1)throw Error('Contorno visible en borde de celda '+definition.id+' '+cells.length);
   let anchor;
   if(definition.anchor==='card'){
    const b=bounds(d,w,h,(r,g,b,a)=>a>128&&r>185&&g>160&&b>150);
    anchor=[b.x0,b.y0];
   }else if(definition.anchor==='rail'){
    const b=bounds(d,w,h,(r,g,b,a)=>a>128&&b>r*1.15&&g>r);
    anchor=[b.x0,b.y1];
   }else{
    const red=(r,g,b,a)=>a>128&&r>130&&g<r*.75&&b<r*.70;
    const b=bounds(d,w,h,red);
    const ear=bounds(d,w,h,(r,g,blue,a,_x,y)=>red(r,g,blue,a)&&y<=b.y0+30);
    anchor=[Math.round((ear.x0+ear.x1)/2),ear.y0];
   }
   // Transparent padding only. Every alpha>0 pixel survives, at original scale.
   const crop={left:visible.x0,top:visible.y0,width:visible.x1-visible.x0+1,height:visible.y1-visible.y0+1};
   const left=definition.destination[0]-(anchor[0]-crop.left),top=definition.destination[1]-(anchor[1]-crop.top);
   if(left<4||top<4||left+crop.width>canvas.width-4||top+crop.height>canvas.height-4)throw Error('Fuera del lienzo '+JSON.stringify({id:definition.id,cell:cells.length,anchor,crop,left,top}));
   const cropped=await sharp(sourceBuffer).extract({left:cell.left+crop.left,top:cell.top+crop.top,width:crop.width,height:crop.height}).png().toBuffer();
   const frame=await sharp({create:{...canvas,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:cropped,left,top}]).png().toBuffer();
   cells.push({frame,qa:{sourceCell:cell,alphaBounds:visible,contourBounds:contour,transparentTrim:crop,sourceAnchor:anchor,destinationAnchor:definition.destination,offset:[left,top],pngSHA256:hash(frame)}});
  }
 }
 const target=join(dir,definition.id),frames=definition.order.map(i=>cells[i].frame);
 await mkdir(join(target,'fotogramas'),{recursive:true});
 const sequence=[];
 for(let i=0;i<frames.length;i++){
  const filename=String(i+1).padStart(2,'0')+'.png';
  await writeFile(join(target,'fotogramas',filename),frames[i]);
  sequence.push({frame:definition.id+'/fotogramas/'+filename,ms:definition.delay[i],sourcePose:definition.order[i]+1,sha256:hash(frames[i])});
 }
 await sharp(frames,{join:{animated:true}}).webp({loop:definition.playback==='loop'?0:1,lossless:true,delay:definition.delay}).toFile(join(target,definition.id+'-v2.webp'));
 const columns=4,rowCount=Math.ceil(frames.length/columns);
 await sharp({create:{width:canvas.width*columns,height:canvas.height*rowCount,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite(frames.map((input,i)=>({input,left:(i%columns)*canvas.width,top:Math.floor(i/columns)*canvas.height}))).png().toFile(join(target,'hoja-normalizada.png'));
 const original=originalManifest.animations.find(a=>a.id===definition.id);
 await mkdir(join(dir,'original',definition.id),{recursive:true});
 for(const s of original.sequence)await copyFile(join(kit,'animaciones',s.frame),join(dir,'original',definition.id,s.frame.split('/').at(-1)));
 await copyFile(join(kit,'animaciones',definition.id+'.webp'),join(dir,'original',definition.id+'.webp'));
 await copyFile(join(kit,'hojas',definition.id+'.png'),join(dir,'original',definition.id+'-hoja.png'));
 const result={id:definition.id,version:2,status:'borrador normalizado; pendiente continuidad artística',method:'image_gen integrado, edición; separación por alfa cero y registro mecánico sin redibujar, recolorear ni reescalar',source:'fuentes/'+definition.id+'-v2.png',sourceSHA256:hash(sourceBuffer),prompt:'prompts/'+definition.id+'-v2.txt',canvas,frames:frames.length,uniquePoses:new Set(definition.order).size,totalMs:definition.delay.reduce((a,b)=>a+b,0),playback:definition.playback,preview:definition.id+'/'+definition.id+'-v2.webp',sequence,original:{...original,sequence:original.sequence.map(s=>({...s,frame:'original/'+definition.id+'/'+s.frame.split('/').at(-1)}))},correction:definition.correction,knownLimit:definition.limit,qa:{loopClosureIdentical:hash(frames[0])===hash(frames.at(-1)),cells:cells.map(c=>c.qa)}};
 await writeFile(join(target,'manifest.json'),JSON.stringify(result,null,2));
 results.push(result);
}
const cola=JSON.parse(await readFile(join(dir,'cola/manifest.json'),'utf8'));
await writeFile(join(dir,'comparativas.json'),JSON.stringify({status:'propuestas independientes, sin aprobación final',animations:[cola,...results]},null,2));
console.log(JSON.stringify(results.map(r=>({id:r.id,frames:r.frames,uniquePoses:r.uniquePoses,loopClosureIdentical:r.qa.loopClosureIdentical,playback:r.playback})),null,2));
