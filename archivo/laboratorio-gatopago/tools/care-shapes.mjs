// Objetos nativos del laboratorio. El personaje sigue siendo PNG, no un sustituto vectorial.
export const ink='#0b0b0f',milk='#fff8f0',oat='#eee4d8',fire='#f85239',info='#79b9ff',growth='#71d5a1',pending='#f6c65b';
const outline=`fill="${milk}" stroke="${ink}" stroke-width="4" stroke-linejoin="miter"`;
export const objects={
 regadera:{box:[-42,-24,136,66],name:'Regadera',body:`<path d="M-22 -12H28V30H-22Z" ${outline}/><path d="M-24 -8H-38V12H-24" fill="none" stroke="${ink}" stroke-width="6"/><path d="M28 6H44L78 -8L86 -2L50 18H28Z" fill="${info}" stroke="${ink}" stroke-width="4"/><rect x="-16" y="-6" width="36" height="28" fill="${info}"/><rect x="-10" y="-20" width="28" height="8" fill="${ink}"/>`},
 tarjeta:{box:[-28,-28,88,56],name:'Tarjeta ilustrativa',body:`<rect x="-24" y="-24" width="80" height="48" fill="${fire}" stroke="${ink}" stroke-width="4"/><rect x="19" y="-13" width="17" height="14" fill="${milk}" stroke="${ink}" stroke-width="2"/><path d="M27 -13V1M19 -6H36" fill="none" stroke="${ink}" stroke-width="1"/><path d="M-12 11H13M32 11H43" stroke="${ink}" stroke-width="3"/>`},
 linterna:{box:[-18,-20,68,40],name:'Linterna',body:`<path d="M-14 -10H24V-16H44V16H24V10H-14Z" fill="${pending}" stroke="${ink}" stroke-width="4"/><path d="M27 -14V14M-2 -10V10" stroke="${ink}" stroke-width="4"/><rect x="32" y="-10" width="10" height="20" fill="${milk}"/><rect x="4" y="-14" width="8" height="4" fill="${fire}"/>`},
 llave:{box:[-20,-20,106,44],name:'Llave',body:`<path d="M-16 -8H-8V-16H8V-8H16V-4H82V8H74V18H62V8H16V8H8V16H-8V8H-16Z" fill="${pending}" stroke="${ink}" stroke-width="4"/><rect x="-4" y="-4" width="8" height="8" fill="${milk}"/>`},
 terminal:{box:[-4,-4,110,162],name:'Terminal ilustrativa',body:`<path d="M8 0H94V12H102V144H94V154H8V144H0V12H8Z" ${outline}/><rect x="10" y="16" width="82" height="102" fill="${ink}"/><path d="M46 40Q66 56 46 72M54 32Q84 56 54 80M38 47Q48 56 38 65" fill="none" stroke="${info}" stroke-width="4"/><rect x="12" y="128" width="18" height="8" fill="${ink}"/><rect x="42" y="128" width="18" height="8" fill="${ink}"/><rect x="72" y="128" width="18" height="8" fill="${ink}"/>`},
 escudo:{box:[-4,-4,116,156],name:'Escudo ilustrativo',body:`<path d="M8 0H100V8H108V80H100V96H88V112H72V128H54L36 128V112H20V96H8V80H0V8H8Z" ${outline}/><path d="M12 14H94V74H86V90H74V104H62V114H46V104H34V90H22V74H12Z" fill="${oat}"/><path d="M28 20H36V28H32V38H24V28H20V20Z" fill="${ink}"/>`},
 maceta:{box:[-42,-4,84,38],name:'Maceta',body:`<path d="M-38 0H38V10H30V28H22V32H-22V28H-30V10H-38Z" fill="${fire}" stroke="${ink}" stroke-width="4"/><rect x="-32" y="2" width="64" height="6" fill="${oat}"/>`},
 hojas:{box:[-30,-14,60,30],name:'Hojas pixel',body:`<path d="M0 0H-8V-6H-16V-12H-28V0H-20V6H-8V10H0ZM0 0H8V-6H16V-12H28V0H20V6H8V10H0Z" fill="${growth}" stroke="${ink}" stroke-width="3"/>`},
 haz:{box:[42,-34,144,68],name:'Haz discreto',body:`<path d="M44 -8H70V-16H104V-24H140V-32H182V32H140V24H104V16H70V8H44Z" fill="${pending}" opacity=".12"/><path d="M44 -4H92V-8H142V-12H182V12H142V8H92V4H44Z" fill="${pending}" opacity=".14"/>`}
};
export const definitions=[
 {id:'creciendo',name:'Cuidar un brote',frames:81,playback:'once',firstMs:500,lastMs:1000,stepMs:30,correction:'Gato y suelo constantes. Una sola regadera se inclina, deja caer gotas hacia la maceta y vuelve. El mismo brote crece desde su raíz fija; el final se mantiene, sin monedas, porcentajes ni rentabilidad prometida.'},
 {id:'tarjeta',name:'Acercar la tarjeta',frames:61,playback:'once',firstMs:400,lastMs:900,stepMs:25,correction:'Una tarjeta geométrica y una terminal fijas en forma y escala. La pata acerca la tarjeta al lector, cuya pequeña señal queda estable al final; no regresa sola a la pose inicial ni muestra un pago real.'},
 {id:'linterna',name:'Buscar con luz',frames:73,playback:'loop',firstMs:500,lastMs:500,stepMs:35,correction:'Cara, cuerpo y cola constantes. La misma linterna y un haz de baja opacidad giran juntos apenas cuatro grados por lado. No hay giro completo del gato, destellos ni saltos de intensidad.'},
 {id:'seguridad',name:'Resguardar la llave',frames:61,playback:'once',firstMs:400,lastMs:1000,stepMs:25,correction:'Escudo siempre presente, sin resplandor intermitente. La misma pata presenta una llave al escudo y conserva la posición final. La ilustración no dice que el dispositivo o la operación se hayan verificado.'}
];
export const clamp=t=>Math.max(0,Math.min(1,t));
export const ease=t=>{t=clamp(t);return t*t*(3-2*t);};
const f=n=>(Math.abs(n)<1e-10?0:n).toFixed(4);
const put=(id,x,y,body)=>`<g id="${id}" transform="translate(${f(x)} ${f(y)})">${body}</g>`;
export function stateFor(id,t){
 if(id==='creciendo'){const pour=Math.sin(Math.PI*clamp((t-.15)/.6))**2;return{angle:-90+14*pour,height:30+38*ease((t-.22)/.58),secondary:ease((t-.42)/.32),pour,waterOpacity:ease((t-.2)/.1)*(1-ease((t-.65)/.1))};}
 if(id==='tarjeta')return{angle:-58-32*ease((t-.1)/.5),signal:ease((t-.65)/.18)};
 if(id==='linterna')return{angle:-90+4*Math.sin(2*Math.PI*t),beamAlphaLayers:[.12,.14]};
 if(id==='seguridad')return{angle:-60-30*ease((t-.1)/.55)};
 throw Error('Acción desconocida '+id);
}
export function sceneFor(id,t,R){
 const state=stateFor(id,t),shoulder=R.shoulder,grip={x:shoulder.x,y:shoulder.y+(id==='seguridad'?110:96)};
 const prop={creciendo:'regadera',tarjeta:'tarjeta',linterna:'linterna',seguridad:'llave'}[id];
 const tool=put('tool',grip.x,grip.y,`<g id="object" transform="rotate(90)">${id==='linterna'?objects.haz.body:''}${objects[prop].body}</g>`);
 const arm=`<g id="arm" transform="rotate(${f(state.angle)} ${f(shoulder.x)} ${f(shoulder.y)})">${tool}${R.armImage}</g>`;
 let stationary='',dynamic='';
 if(id==='creciendo'){
  const root={x:650,y:488},top=root.y-state.height;
  stationary=put('pot',root.x,root.y,objects.maceta.body);
  dynamic=`<g id="plant"><rect x="647" y="${f(top)}" width="6" height="${f(state.height)}" fill="${ink}"/><rect x="648" y="${f(top+2)}" width="4" height="${f(state.height-2)}" fill="${growth}"/>${put('leaves-upper',root.x,top+12,objects.hojas.body)}<g id="leaves-lower" opacity="${f(state.secondary)}">${put('leaves-lower-position',root.x,top+35,objects.hojas.body)}</g></g>`;
  const a=state.angle*Math.PI/180,p={x:grip.x+2,y:grip.y+86},dx=p.x-shoulder.x,dy=p.y-shoulder.y,start={x:shoulder.x+dx*Math.cos(a)-dy*Math.sin(a),y:shoulder.y+dx*Math.sin(a)+dy*Math.cos(a)};
  const droplets=Array.from({length:4},(_,i)=>{const q=(t*3+i/4)%1,x=start.x+(650-start.x)*q,y=start.y+(492-start.y)*q,opacity=state.waterOpacity*Math.sin(Math.PI*q)**2;return `<rect id="drop-${i}" x="${f(x-2)}" y="${f(y-2)}" width="4" height="4" fill="${info}" opacity="${f(opacity)}"/>`;}).join('');
  dynamic+=`<g id="water">${droplets}</g>`;state.spout=start;state.root=root;
 }else if(id==='tarjeta')stationary=put('terminal',600,370,objects.terminal.body)+`<rect id="terminal-signal" x="636" y="458" width="28" height="4" fill="${info}" opacity="${f(state.signal)}"/>`;
 else if(id==='seguridad')stationary=put('shield',605,388,objects.escudo.body);
 const markup=R.tailImage+R.bodyImage+stationary+dynamic+arm+R.headImage;
 return{markup,state};
}
