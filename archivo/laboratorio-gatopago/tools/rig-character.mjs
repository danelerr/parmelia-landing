import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {dirname,resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const root=join(lab,'01-animaciones/rig-controlado');
await mkdir(root,{recursive:true});
const original=JSON.parse(await readFile(join(lab,'01-animaciones/comparativas.json'),'utf8'));
const symbol=await readFile(join(lab,'assets/simbolo.svg'),'utf8');
const originalHead=symbol.match(/<path[\s\S]+(?=<\/svg>)/)[0];
const ink='#0b0b0f',fire='#f85239',shadow='#cf3433',deep='#9f292e',milk='#fff8f0';
// La expresión pertenece al personaje, no al logo: suprimir únicamente las seis
// filas del ojo de la cabeza reutilizada; ninguna copia del símbolo se modifica.
const sleepingHead=originalHead.replace(/M(?:8|20) (?:12|13|14)h2v1h-2z/g,'')+`<path fill="${fire}" d="M8 12h2v3H8zM20 12h2v3h-2z"/><path fill="${ink}" d="M7 13h5v1H7zM19 13h5v1h-5z"/>`;
const rect=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
const path=(d,c)=>`<path d="${d}" fill="${c}"/>`;
const tails=[
 'M25 31h5v-2h3v-3h2v-9h-2v-2h-4v2h-2v5h2v4h-2v2h-2z',
 'M25 31h5v-2h3v-4h1v-9h-2v-2h-4v2h-2v5h2v5h-1v2h-2z',
 'M25 31h4v-2h3v-5h-1v-9h-2v-2h-4v2h-2v5h2v5h2v3h-2z',
 'M25 31h5v-2h3v-3h3v-8h-2v-2h-4v2h-2v5h3v2h-2v3h-4z'
];
const tailFill=[
 'M26 30h3v-2h3v-3h2v-7h-2v-2h-2v2h-2v3h2v6h-3v2h-1z',
 'M26 30h3v-2h3v-4h1v-7h-2v-2h-2v2h-2v3h2v7h-2v2h-1z',
 'M26 30h2v-2h3v-3h-1v-9h-2v-2h-2v2h-2v3h2v7h2v3h-2z',
 'M26 30h3v-2h3v-3h3v-6h-2v-2h-2v2h-2v3h3v4h-3v3h-3z'
];
function cat(tail=0){return `<g id="character">`+
 `<g id="tail">${path(tails[tail],ink)}${path(tailFill[tail],fire)}${rect(28,24,3,2,shadow)}</g>`+
 `<g id="body">${path('M9 20h12v3h3v4h2v5h-3v3H7v-2H5v-6h2v-4h2z',ink)}${path('M10 21h10v3h3v4h2v3h-3v3H8v-2H6v-4h2v-4h2z',fire)}${rect(9,24,3,3,shadow)}${rect(19,26,4,2,shadow)}${rect(11,28,1,6,ink)}${rect(18,28,1,6,ink)}${rect(7,32,4,2,shadow)}${rect(19,32,4,2,shadow)}${rect(13,23,4,1,deep)}</g>`+
 `<g id="head">${originalHead}</g></g>`;}
function sleep(step){const chest=[0,1,1,0][step];return `<g id="sleeping-character">`+
 `<g id="body">${path('M37 26h17v2h5v3h3v9h-3v3H36v-2h-4v-9h2v-4h3z',ink)}${path('M38 27h15v2h5v3h3v7h-3v3H37v-2h-4v-7h2v-4h3z',fire)}${rect(49,28-chest,6,3,fire)}${rect(52,30,6,2,shadow)}</g>`+
 `<g id="tail">${path('M60 35h-4v3h-9v1H35v3h24v-2h3v-5z',ink)}${path('M59 36h-2v3H35v2h23v-2h3v-3z',shadow)}</g>`+
 `<g id="head" transform="translate(14 19)">${sleepingHead}</g></g>`;}
function block(x,y,color,name){return `<g id="${name}" transform="translate(${x} ${y})">${rect(0,0,8,8,ink)}${rect(1,1,6,6,color)}${rect(2,2,2,1,milk)}</g>`;}
function rail(repaired=false){let result='';for(let x=12;x<=76;x+=8)if(x!==52||repaired)result+=rect(x,59,8,3,ink)+rect(x,60,8,1,x===52?'#79b9ff':'#a99f96');return `<g id="stationary-rail">${result}</g>`;}
function repairPiece(y){return `<g id="repair-piece" transform="translate(52 ${y})">${rect(0,0,8,3,ink)}${rect(0,1,8,1,'#79b9ff')}</g>`;}
const defs=[
 {id:'cola',title:'Cola',poses:8,playback:'loop',delay:[500,180,180,300,180,180,180,500],explain:'Una sola cola. Cabeza, cuerpo y patas reutilizan exactamente los mismos paths; solo cambia la capa de cola.',draw:i=>`<g transform="translate(30 18)">${cat([0,1,2,1,0,3,1,0][i])}</g>`},
 {id:'siesta',title:'Siesta',poses:8,playback:'loop',delay:[700,400,400,400,500,400,400,700],explain:'Respiración localizada en el pecho. Cabeza, orejas, cara y cola quedan fijas. Sin Z ni destellos.',draw:i=>sleep([0,1,2,3,3,2,1,0][i])},
 {id:'asomarse',title:'Asomarse',poses:9,playback:'once',delay:[500,180,180,250,650,250,180,180,500],explain:'Una cabeza idéntica se desplaza detrás de una tarjeta idéntica. El principio y el final muestran solo la tarjeta.',draw:i=>{const y=[39,31,23,16,11,16,23,31,39][i];return `<defs><clipPath id="peek-window"><rect x="20" y="5" width="52" height="48"/></clipPath></defs><g clip-path="url(#peek-window)"><g id="head" transform="translate(32 ${y})">${originalHead}</g></g><g id="stationary-card">${rect(21,36,52,27,ink)}${rect(23,38,48,23,milk)}${rect(27,43,5,5,fire)}${rect(36,44,26,2,'#a99f96')}${rect(27,53,35,2,'#d5c8bb')}</g>`;}},
 {id:'reparar-rail',title:'Reparar el camino',poses:8,playback:'once',delay:[500,320,320,320,320,320,500,700],explain:'Rail y hueco fijos. La misma pieza de 8 × 3 unidades baja a su sitio y conserva forma y color también al finalizar. La pata acompaña la inserción.',draw:i=>{const y=[43,43,46,49,52,55,59,59][i];const pawY=Math.min(y-5,52);return `<g transform="translate(38 18)">${cat(0)}</g>${rail(false)}<g id="working-paw">${rect(49,44,6,Math.max(1,pawY-40),ink)}${rect(50,45,4,Math.max(1,pawY-41),fire)}${rect(50,pawY,6,5,ink)}${rect(51,pawY+1,4,3,fire)}</g>${repairPiece(y)}`;}},
 {id:'intercambio',title:'Intercambio',poses:8,playback:'once',delay:[550,350,350,350,350,350,350,650],explain:'Dos bloques de tamaño constante intercambian posiciones por caminos separados. El personaje no se transforma ni cambia de cola. Es una ilustración de rutas, no una ejecución de cambio.',draw:i=>{const x=[13,13,13,43,77,77,77,77][i],y=[43,23,4,4,4,23,43,43][i],bx=90-x,by=[43,55,63,63,63,55,43,43][i];return `<g id="paths" fill="none" stroke="#a99f96" stroke-width="1" stroke-dasharray="2 3"><path d="M17 47V8h64v39"/><path d="M17 47v20h64V47"/></g><g transform="translate(33 20)">${cat(0)}</g>${block(x,y,'#f6c65b','gold-block')}${block(bx,by,'#79b9ff','blue-block')}`;}}
];
const entries=[];
for(const d of defs){
 const dir=join(root,d.id);await mkdir(join(dir,'fotogramas'),{recursive:true});
 const sequence=[],svgPaths=[],rgba=[];
 for(let i=0;i<d.poses;i++){
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="768" height="576" viewBox="0 0 96 72" shape-rendering="crispEdges" role="img" aria-label="${d.title}, propuesta SVG por capas"><title>${d.title}, paso ${i+1}</title>${d.draw(i)}</svg>`;
  const png=await sharp(Buffer.from(svg)).png().toBuffer();const pathBase=d.id+'/fotogramas/'+String(i+1).padStart(2,'0');
  await writeFile(join(root,pathBase+'.svg'),svg);await writeFile(join(root,pathBase+'.png'),png);
  const hash=createHash('sha256').update(png).digest('hex');
  sequence.push({frame:pathBase+'.png',svg:pathBase+'.svg',ms:d.delay[i],sha256:hash});svgPaths.push(pathBase+'.svg');
  rgba.push(await sharp(png).ensureAlpha().raw().toBuffer());
 }
 // Exportación mecánica del SVG nativo, no edición de un bitmap de origen.
 const raw=Buffer.concat(rgba);await sharp(raw,{raw:{width:768,height:576*d.poses,channels:4,pageHeight:576}}).webp({lossless:true,delay:d.delay,loop:d.playback==='loop'?0:1}).toFile(join(dir,d.id+'-rig-v1.webp'));
 const thumbnails=await Promise.all(sequence.map(s=>sharp(join(root,s.frame)).resize(288,216,{kernel:'nearest'}).png().toBuffer()));
 await sharp({create:{width:1152,height:216*Math.ceil(d.poses/4),channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite(thumbnails.map((input,i)=>({input,left:(i%4)*288,top:Math.floor(i/4)*216}))).png().toFile(join(dir,'hoja-normalizada.png'));
 const ref=original.animations.find(a=>a.id===d.id).original;
 const record={id:d.id,status:'prueba vectorial de continuidad; cuerpo nuevo sin aprobación artística',method:'SVG nativo por capas y geometría determinista; rasterización mecánica con sharp, sin editar los PNG de origen',source:d.id+'/fotogramas/01.svg',prompt:d.id+'/reglas.json',sourceSHA256:createHash('sha256').update(await readFile(join(root,svgPaths[0]))).digest('hex'),headSource:'assets/simbolo.svg',headSourceSHA256:createHash('sha256').update(symbol).digest('hex'),canvas:{width:768,height:576},frames:d.poses,totalMs:d.delay.reduce((n,x)=>n+x,0),playback:d.playback,preview:d.id+'/'+d.id+'-rig-v1.webp',sequence,svgFrames:svgPaths,original:{...ref,sequence:ref.sequence.map(s=>({...s,frame:'../'+s.frame}))},correction:d.explain,knownLimit:'El cuerpo es una prueba vectorial distinta de los sprites raster; siesta y patas todavía necesitan refinamiento visual. No es un sustituto recomendado del personaje aprobado. La biblioteca de marca y sus originales no se modifican.'};
 await writeFile(join(dir,'manifest.json'),JSON.stringify(record,null,2));await writeFile(join(dir,'reglas.json'),JSON.stringify({headSource:record.headSource,headSourceSHA256:record.headSourceSHA256,logoFileUnmodified:true,body:'paths originales del laboratorio en tools/rig-character.mjs',motion:d.explain,rule:'Una cabeza estable, una cola, objetos estacionarios sin morphing',svgFrames:svgPaths},null,2));entries.push(record);
}
await writeFile(join(root,'comparativas.json'),JSON.stringify({status:'alternativas vectoriales, no aprobadas',animations:entries},null,2));
await writeFile(join(root,'README.md'),'# Rig vectorial controlado\n\nCinco alternativas a los candidatos raster. No sustituyen los sprites ni el logo. La cabeza reutiliza el símbolo SVG estable; la expresión dormida es exclusiva del personaje. El cuerpo y los objetos son vectores nuevos del laboratorio.\n\nCada acción tiene SVG editables por capas, PNG transparentes, WebP lossless, hoja y manifest. La anatomía no depende de cinco u ocho dibujos generados independientemente: la geometría estable se reutiliza. Solo se mueve la parte indicada.\n\nLas acciones de inserción e intercambio son ilustraciones; no demuestran ni ejecutan una operación. El estilo del cuerpo requiere revisión artística.\n\nRegenerar con `node recursos/laboratorio-gatopago/tools/rig-character.mjs` y crear la galería con `node recursos/laboratorio-gatopago/tools/comparison-gallery.mjs rig`. El source del movimiento es el generador, no un PNG aplanado.\n');
console.log(JSON.stringify({actions:entries.length,svgFrames:entries.reduce((n,a)=>n+a.frames,0),root,brandkitChanged:false}));
