import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dir=join(lab,'01-animaciones'),kit=resolve(lab,'../../brandkit/03-personaje');
const source=join(dir,'fuentes/cola-v1.png');
const meta=await sharp(source).metadata();
const gridY=Array.from({length:3},(_,i)=>Math.round(meta.height*i/2));
const sheetRaw=await sharp(source).ensureAlpha().raw().toBuffer();
// Los modelos no garantizan una retícula matemática. Buscar separadores
// transparentes cercanos: no cortar una cola que atraviesa la celda ideal.
const rowsX=[];
for(let row=0;row<2;row++){
 const counts=Array(meta.width).fill(0);
 for(let y=gridY[row];y<gridY[row+1];y++)for(let x=0;x<meta.width;x++)if(sheetRaw[(y*meta.width+x)*4+3]>24)counts[x]++;
 const boundaries=[0];
 for(let col=1;col<4;col++){
  const nominal=Math.round(meta.width*col/4);let selected=-1;
  for(let d=0;d<Math.round(meta.width*.04)&&selected<0;d++)for(const x of [nominal+d,nominal-d])if(counts[x]===0&&counts[x-1]===0&&counts[x+1]===0){selected=x;break;}
  if(selected<0)throw Error('No hay separador transparente; requiere revisión manual');
  boundaries.push(selected);
 }
 boundaries.push(meta.width);rowsX.push(boundaries);
}
await mkdir(join(dir,'cola/fotogramas'),{recursive:true});
await mkdir(join(dir,'original/cola'),{recursive:true});
const sourceManifest=JSON.parse(await readFile(join(kit,'animaciones/manifest.json'),'utf8'));
const original=sourceManifest.animations.find(x=>x.id==='cola');
const frames=[],qa=[];
for(let i=0;i<8;i++){
 const col=i%4,row=Math.floor(i/4),gridX=rowsX[row],sourceLeft=gridX[col],sourceTop=gridY[row];
 const cellW=gridX[col+1]-sourceLeft,cellH=gridY[row+1]-sourceTop;
 const cell=await sharp(source).extract({left:sourceLeft,top:sourceTop,width:cellW,height:cellH}).ensureAlpha().png().toBuffer();
 const {data,info}=await sharp(cell).raw().toBuffer({resolveWithObject:true});
 let minX=info.width,minY=info.height,maxX=0,maxY=0,anchorX=info.width,anchorY=info.height;
 for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++){
  const p=(y*info.width+x)*4,r=data[p],g=data[p+1],b=data[p+2],a=data[p+3];
  if(a>24){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);}
  // Solo el tercio superior izquierdo: orejas/cabeza, no la cola derecha.
  if(y<info.height*.33&&x<info.width*.67&&a>128&&r>120&&g<r*.7&&b<r*.7){anchorX=Math.min(anchorX,x);anchorY=Math.min(anchorY,y);}
 }
 const left=120-anchorX,top=60-anchorY;
 if(left<0||top<0||left+cellW>640||top+cellH>512)throw Error('Registro fuera del lienzo: '+JSON.stringify({i,left,top,anchorX,anchorY,cellW,cellH}));
 const frame=await sharp({create:{width:640,height:512,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:cell,left,top}]).png().toBuffer();
 const file=`fotogramas/${String(i+1).padStart(2,'0')}.png`;
 await writeFile(join(dir,'cola',file),frame);frames.push(frame);
 qa.push({frame:i+1,sourceCell:[sourceLeft,sourceTop,cellW,cellH],alphaBounds:[minX,minY,maxX,maxY],sourceHeadAnchor:[anchorX,anchorY],destinationHeadAnchor:[120,60],offset:[left,top],touchesCellEdge:minX<=0||minY<=0||maxX>=cellW-1||maxY>=cellH-1});
}
const delay=[350,130,130,250,130,180,130,240];
await sharp(frames,{join:{animated:true}}).webp({loop:0,lossless:true,delay}).toFile(join(dir,'cola/cola-v1.webp'));
await sharp({create:{width:640*4,height:512*2,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite(frames.map((input,i)=>({input,left:(i%4)*640,top:Math.floor(i/4)*512}))).png().toFile(join(dir,'cola/hoja-normalizada.png'));
const originalFrames=[...new Set(original.sequence.map(x=>x.frame))];
for(const file of originalFrames)await copyFile(join(kit,'animaciones',file),join(dir,'original/cola',file.split('/').at(-1)));
await copyFile(join(kit,'animaciones/cola.webp'),join(dir,'original/cola.webp'));
await copyFile(join(kit,'hojas/cola.png'),join(dir,'original/cola-hoja.png'));
const manifest={id:'cola',status:'propuesta corregida; pendiente aprobación artística',method:'image_gen built-in edit; separación mecánica de celdas y registro por cabeza; sin recolorear ni redibujar por código',source:'fuentes/cola-v1.png',prompt:'prompts/cola-v1.txt',sourceSHA256:createHash('sha256').update(await readFile(source)).digest('hex'),canvas:{width:640,height:512},frames:8,totalMs:delay.reduce((a,b)=>a+b,0),playback:'loop',preview:'cola/cola-v1.webp',sequence:delay.map((ms,i)=>({frame:`cola/fotogramas/${String(i+1).padStart(2,'0')}.png`,ms})),original:{...original,sequence:original.sequence.map(x=>({...x,frame:'original/cola/'+x.frame.split('/').at(-1)}))},correction:'Retirada la cola enrollada frontal duplicada; queda una cola derecha y dos patas. Registro constante de la cabeza. Ritmo más regular sin pausa de 500 ms.',knownLimit:'La generación conserva pequeñas variaciones de detalle corporal entre poses. No se afirma pixel-perfect ni aprobación final.',qa};
await writeFile(join(dir,'cola/manifest.json'),JSON.stringify(manifest,null,2));
// Comparación por fase normalizada: cada secuencia conserva su temporización original.
const css=await readFile(join(lab,'assets/laboratorio.css'),'utf8');
const html=`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cola · Comparativa GatoPago</title><link rel="stylesheet" href="../assets/laboratorio.css"><style>.comparison{display:grid;grid-template-columns:1fr 1fr;gap:24px}.stage{height:320px;display:flex;align-items:center;justify-content:center;background-color:#fffdf9;background-image:linear-gradient(45deg,#eee4d8 25%,transparent 25%),linear-gradient(-45deg,#eee4d8 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#eee4d8 75%),linear-gradient(-45deg,transparent 75%,#eee4d8 75%);background-size:24px 24px;background-position:0 0,0 12px,12px -12px,-12px 0;border:2px solid var(--ink)}.stage img{max-width:92%;max-height:92%;image-rendering:pixelated;object-fit:contain}.dark .stage{background-image:none;background-color:#15151b}.frames{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.frames img{width:100%;background:#eee4d8;image-rendering:pixelated}input[type=range]{width:220px;max-width:100%}@media(max-width:600px){.comparison{grid-template-columns:1fr}.stage{height:250px}.frames{grid-template-columns:repeat(2,1fr)}}</style></head><body><div class="wrap"><header class="mast"><a class="brand" href="../index.html"><img src="../assets/simbolo.svg" alt="">GatoPago LAB</a><span class="eyebrow">01 / Comparativa</span></header><section class="hero"><span class="eyebrow">Primera corrección artística</span><h1>Una cola.<br>No dos.</h1><p>La propuesta elimina la cola enrollada duplicada y registra la cabeza en el mismo punto. Antes y después comparten una fase de reproducción; cada secuencia conserva sus tiempos relativos.</p></section><div class="controls"><button id="play" aria-pressed="false">Reproducir</button><button id="reset">Inicio</button><label>Fase <input id="phase" type="range" min="0" max="1000" value="0"></label><label>Velocidad <select id="speed"><option value=".5">0,5×</option><option value="1" selected>1×</option><option value="2">2×</option></select></label><button id="background" aria-pressed="false">Fondo oscuro</button><span id="info" role="status"></span></div><div class="comparison"><article><h2>Antes</h2><div class="stage"><img id="before" alt="Fotograma original de la cola"></div><p class="notes">${original.frames} fotogramas · ${original.totalMs} ms · cola frontal duplicada.</p><a class="download" href="original/cola.webp" download>WebP original</a></article><article><h2>Propuesta</h2><div class="stage"><img id="after" alt="Fotograma propuesto con una sola cola"></div><p class="notes">8 fotogramas · ${manifest.totalMs} ms · cabeza registrada, cola única.</p><a class="download" href="cola/cola-v1.webp" download>WebP propuesto</a></article></div><aside class="spec"><h2>Qué cambió y qué queda por revisar.</h2><p>${manifest.correction}</p><p>${manifest.knownLimit}</p><p>La comparativa se detiene por defecto y respeta movimiento reducido. El registro corrige posición, no inventa fotogramas intermedios.</p></aside><h2>Los ocho fotogramas entregados</h2><div class="frames">${manifest.sequence.map((s,i)=>`<figure><a href="${s.frame}" download><img src="${s.frame}" alt="Propuesta, fotograma ${i+1}" loading="lazy"></a><figcaption>${i+1} · ${s.ms} ms</figcaption></figure>`).join('')}</div><a class="download" href="cola/hoja-normalizada.png" download>Hoja completa</a> <a class="download" href="cola/manifest.json" download>Temporización y procedencia</a><footer class="notes">Propuesta independiente; el kit vigente no ha cambiado. Meli sigue siendo el nombre interno del personaje.</footer></div><script>const data=${JSON.stringify(manifest)};const $=s=>document.querySelector(s);let playing=false,phase=0,last=0,handle=0;function frame(seq,total,p){let t=p*total,end=0;for(let i=0;i<seq.length;i++){end+=seq[i].ms;if(t<end||i===seq.length-1)return{...seq[i],number:i+1}}}function paint(){const b=frame(data.original.sequence,data.original.totalMs,phase),a=frame(data.sequence,data.totalMs,phase);if(!$('#before').src.endsWith(b.frame))$('#before').src=b.frame;if(!$('#after').src.endsWith(a.frame))$('#after').src=a.frame;$('#info').textContent='Antes '+b.number+' / Después '+a.number;$('#phase').value=Math.round(phase*1000)}function tick(now){if(!playing)return;if(last)phase=(phase+(now-last)*Number($('#speed').value)/data.totalMs)%1;last=now;paint();handle=requestAnimationFrame(tick)}function setPlay(on){playing=on;cancelAnimationFrame(handle);last=0;$('#play').setAttribute('aria-pressed',String(on));$('#play').textContent=on?'Pausar':'Reproducir';if(on)handle=requestAnimationFrame(tick)}$('#play').addEventListener('click',()=>setPlay(!playing));$('#reset').addEventListener('click',()=>{phase=0;last=0;paint()});$('#phase').addEventListener('input',e=>{setPlay(false);phase=Math.min(.999,Number(e.target.value)/1000);paint()});$('#background').addEventListener('click',e=>{const dark=document.body.classList.toggle('dark');e.target.setAttribute('aria-pressed',String(dark));e.target.textContent=dark?'Fondo claro':'Fondo oscuro'});matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches)setPlay(false)});document.addEventListener('visibilitychange',()=>{if(document.hidden)setPlay(false)});paint();</script></body></html>`;
// Keep the multi-action gallery when rebuilding the first cola candidate.
let catalog;try{catalog=JSON.parse(await readFile(join(dir,'comparativas.json'),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;catalog={status:'propuestas independientes',animations:[]};}
catalog.animations=[manifest,...catalog.animations.filter(a=>a.id!=='cola')];
await writeFile(join(dir,'comparativas.json'),JSON.stringify(catalog,null,2));
await import('./comparison-gallery.mjs');
console.log(JSON.stringify({source:{width:meta.width,height:meta.height,hasAlpha:meta.hasAlpha},frames:8,edgeTouches:qa.filter(x=>x.touchesCellEdge),qa},null,2));
