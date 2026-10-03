/** Offline gallery with full static frames, HD downloads and social avatars. */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
const link = (file,label,cls='') => `<a class="download ${cls}" href="${file}" download>${label} ↓</a>`;
const dims = f => `${f.width} × ${f.height}`;

export function characterGallery(character, exports=null, avatar=null) {
  const {statics,animations} = character;
  const staticCard = s => `<article><div class="art"><img src="${s.file}" alt="${esc(s.name)}" loading="lazy"></div><h3>${esc(s.name)}</h3><p>${esc(s.purpose)}</p><small>${dims(s)} px</small><div class="downloads">${link(s.file,'PNG original')}${exports ? link(exports.statics[s.id].file,`PNG HD · ${dims(exports.statics[s.id])}`) : ''}</div></article>`;
  const animationCard = a => `<article><div class="art anim"><img src="animaciones/${a.sequence[0].frame}" data-static="animaciones/${a.sequence[0].frame}" data-animated="animaciones/${a.preview}" alt="${esc(a.name)}" loading="lazy"></div><h3>${esc(a.name)}</h3><p>${esc(a.purpose)}</p><small>${a.frames} fotogramas · ${(a.totalMs/1000).toFixed(1).replace('.',',')} s · ${a.playback==='loop'?'en bucle':'una vez en producto'}</small><div class="downloads">${link(`animaciones/${a.preview}`,'WebP original')}${exports ? link(exports.animations[a.id].preview.file,`WebP HD · ${dims(exports.animations[a.id].preview)}`) : ''}<a class="download frame-jump" href="#frames-${a.id}" data-sequence="frames-${a.id}">Ver fotogramas →</a></div></article>`;
  const frameGroup = a => {
    const unique = [...new Set(a.sequence.map(f=>f.frame))];
    const hd = exports?.animations[a.id];
    return `<details class="sequence" id="frames-${a.id}"><summary><span>${esc(a.name)}</span><small>${unique.length} fotogramas completos · ${dims(a.canvas)} px</small></summary>${hd ? `<div class="downloads sheet-links">${link(hd.sheet.file,'Hoja PNG completa')}${link(hd.sheetHD.file,`Hoja HD · ${dims(hd.sheetHD)}`)}</div>` : ''}<div class="grid frames">${unique.map((f,i)=>`<article class="frame"><div class="art"><img src="animaciones/${f}" width="${a.canvas.width}" height="${a.canvas.height}" alt="${esc(a.name)}: fotograma ${i+1} completo" loading="lazy"></div><h3>Fotograma ${String(i+1).padStart(2,'0')}</h3><small>${dims(a.canvas)} px · lienzo completo</small><div class="downloads">${link(`animaciones/${f}`,'PNG original')}${hd ? link(hd.frames[i].file,'PNG HD') : ''}</div></article>`).join('')}</div></details>`;
  };
  const avatarDir = '../08-imagenes/avatar/';
  const heads = statics.filter(s=>s.id.startsWith('expresion-'));
  const bodies = statics.filter(s=>s.id.startsWith('pose-'));
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>GatoPago · Galería y descargas</title>
<link rel="icon" href="../02-logos/iconos-web/favicon.svg"><link rel="stylesheet" href="../04-tipografia/uso.css">
<style>
:root{--ink:#0b0b0f;--milk:#fff8f0;--paper:#fffdf9;--muted:#6f625b;--fire:#f85239;--deep:#9f292e;--line:#d2c5b9}
*{box-sizing:border-box}html{scroll-padding-top:24px}body{margin:0;background:var(--milk);color:var(--ink);font:16px/1.55 'Recursive Variable',system-ui,sans-serif}
main{max-width:1240px;margin:0 auto;padding:40px 20px 88px}header{display:flex;align-items:center;gap:14px;margin-bottom:12px}header img{width:60px;height:46px;flex-shrink:0;image-rendering:pixelated}
h1{margin:0;font-size:clamp(2rem,5vw,3rem);font-variation-settings:'CASL' 1;letter-spacing:-.035em;line-height:1.08}h2{margin:56px 0 4px;font-size:1.7rem;font-variation-settings:'CASL' 1;letter-spacing:-.02em}
.lead{color:var(--muted);max-width:74ch;margin:0}.toolbar,nav{display:flex;gap:12px;flex-wrap:wrap;margin:22px 0 0}.download,button,nav a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;border:2px solid var(--ink);padding:7px 12px;color:var(--ink);text-decoration:none;font:inherit;font-weight:700;background:var(--paper);box-shadow:3px 3px 0 var(--deep)}
.download{font-size:.78rem}button{cursor:pointer}.primary{background:var(--fire)}button[hidden]{display:none}a:focus-visible,button:focus-visible,summary:focus-visible{outline:3px solid var(--deep);outline-offset:5px}.downloads{display:flex;gap:9px;flex-wrap:wrap;margin-top:14px}
.grid{display:grid;gap:18px;margin-top:18px;grid-template-columns:repeat(auto-fill,minmax(min(260px,100%),1fr))}.wide{grid-template-columns:repeat(auto-fill,minmax(min(330px,100%),1fr))}
article{border:1px solid var(--line);padding:12px;background:var(--paper);min-width:0}.art{height:230px;display:grid;place-items:center;background-color:var(--paper);background-image:linear-gradient(45deg,#f3ebe1 25%,transparent 25%),linear-gradient(-45deg,#f3ebe1 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#f3ebe1 75%),linear-gradient(-45deg,transparent 75%,#f3ebe1 75%);background-size:18px 18px;background-position:0 0,0 9px,9px -9px,-9px 0;margin-bottom:8px}
.art img{max-width:100%;max-height:210px;width:auto;height:auto;object-fit:contain}.art.anim{height:250px}.art.anim img{max-height:230px}
h3{margin:0;font-size:1.05rem;font-variation-settings:'CASL' 1}article p{margin:0;font-size:.85rem;color:var(--muted)}small{display:block;font-family:ui-monospace,monospace;font-size:.72rem;color:var(--muted)}
.note{margin:22px 0;border-left:4px solid var(--fire);padding:8px 12px;color:var(--muted);font-size:.9rem;max-width:85ch}
.sequence{margin-top:14px;border:1px solid var(--ink);background:var(--paper)}summary{cursor:pointer;padding:16px 18px;font-weight:760;font-size:1.05rem;min-height:56px}summary small{margin-left:20px;font-weight:400}.frames{margin:0;padding:18px;grid-template-columns:repeat(auto-fill,minmax(min(220px,100%),1fr))}.frame .art{height:190px}.frame .art img{max-height:174px}.sheet-links{padding:0 18px 6px}.sources .art{height:180px}.sources .art img{max-height:160px}
.avatar-panel{display:grid;grid-template-columns:1fr 1fr;gap:24px;border:1px solid var(--ink);padding:28px;margin-top:20px;background:var(--paper)}.avatar-samples{display:flex;gap:24px;flex-wrap:wrap;align-items:center;justify-content:center}.avatar-samples figure{margin:0;max-width:100%;text-align:center}.avatar-samples img{display:block;width:180px;height:180px;max-width:100%;object-fit:contain;image-rendering:pixelated}.avatar-samples .circle{border-radius:50%}figcaption{margin-top:8px;font-size:.8rem;color:var(--muted)}.avatar-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(220px,100%),1fr));gap:12px;margin-top:18px}.avatar-grid .download{display:block;min-height:78px;padding:12px}.avatar-grid small{margin-top:4px;font-weight:400}
@media(max-width:650px){main{padding:28px 16px 56px}header{align-items:flex-start}header img{width:30px;height:23px;margin-top:6px}.avatar-panel{grid-template-columns:1fr;padding:18px}.avatar-samples img{width:126px;height:126px}.avatar-samples{gap:14px}.frames{padding:12px}.toolbar>*{flex-grow:1}}
</style></head><body><main>
<header><img src="../02-logos/simbolo/gatopago.svg" alt=""><h1>El gato de GatoPago</h1></header>
<p class="lead">14 ilustraciones, 20 animaciones y sus 147 fotogramas completos. Explora las piezas y descarga el tamaño original o su versión HD.</p>
${avatar ? `<div class="toolbar">${link(avatarDir+avatar.archive,'Descargar avatares','primary')}</div>` : ''}
<nav aria-label="Secciones de la galería"><a href="../index.html#personaje">Brandkit</a><a href="#expresiones">Expresiones</a><a href="#poses">Poses</a><a href="#animaciones">Animaciones</a><a href="#fotogramas">Fotogramas</a>${avatar ? '<a href="#avatar">Avatar</a>' : ''}<a href="#originales">Hojas originales</a></nav>
<p class="note">Las versiones HD conservan el dibujo, los colores y la transparencia del original. Se amplían sin suavizar los bordes; no añaden detalle nuevo. El arte del personaje sigue <a href="README.md">en revisión</a>.</p>
<h2 id="expresiones">Expresiones</h2><p class="lead">La cabeza del gato para estados y reacciones.</p><div class="grid">${heads.map(staticCard).join('')}</div>
<h2 id="poses">Poses</h2><p class="lead">El cuerpo completo para bienvenida, envío, espera y cobro.</p><div class="grid wide">${bodies.map(staticCard).join('')}</div>
<h2 id="animaciones">Animaciones</h2><p class="lead">Las previews se repiten para comparar. Las piezas de éxito se reproducen una sola vez en producto.</p><div class="toolbar"><button id="motion-toggle" type="button" aria-pressed="false" hidden>Reproducir animaciones</button></div><div class="grid wide">${animations.map(animationCard).join('')}</div>
<h2 id="fotogramas">Todos los fotogramas, quietos.</h2><p class="lead">Abre una secuencia para ver cada PNG completo, con su lienzo y transparencia. Las hojas reúnen los fotogramas únicos en orden de primera aparición.</p>${animations.map(frameGroup).join('')}
${avatar ? `<h2 id="avatar">El avatar de GatoPago.</h2><p class="lead">El logo original del kit, centrado sobre Milk. La misma identidad del apple-touch-icon, lista para los perfiles de la marca.</p><div class="avatar-panel"><div class="avatar-samples"><figure><img src="${avatarDir}gatopago-avatar-1080.png" width="180" height="180" alt="Avatar cuadrado de GatoPago sobre fondo Milk" loading="lazy"><figcaption>Archivo cuadrado</figcaption></figure><figure><img class="circle" src="${avatarDir}gatopago-avatar-1080.png" width="180" height="180" alt="Vista circular del avatar de GatoPago" loading="lazy"><figcaption>Vista circular</figcaption></figure></div><div><h3>Un avatar. Todos los perfiles.</h3><p>PNG opaco, con margen alrededor de las orejas y los bigotes. El SVG mantiene el dibujo vectorial a cualquier tamaño.</p><div class="downloads">${link(avatarDir+avatar.svg,'Avatar SVG con fondo')}${link('../02-logos/simbolo/gatopago.svg','Logo SVG transparente')}${link(avatarDir+avatar.archive,'Todos los avatares','primary')}</div></div></div><div class="avatar-grid">${avatar.variants.map(v=>`<a class="download" href="${avatarDir+v.file}" download>PNG · ${v.size} × ${v.size}<small>${esc(v.use)}</small></a>`).join('')}</div>` : ''}
<h2 id="originales">Hojas originales completas.</h2><p class="lead">Las hojas de origen, sin recortes ni cambios.</p><div class="grid sources">${character.sourceSheets.map((s,i)=>{const url='../06-originales/'+encodeURIComponent(s.file);const name=s.file==='spritesmeli1.png'?'Hoja de expresiones':s.file==='spritesmeli2.png'?'Hoja de poses':`Hoja de animación ${i-1}`;return `<article><div class="art"><img src="${url}" alt="${name} completa" loading="lazy"></div><h3>${name}</h3><div class="downloads">${link(url,'Descargar hoja original')}</div></article>`;}).join('')}</div>
<p class="note">El QR y la tarjeta son ilustraciones. Celebrar solo estados verificados y respetar <code>prefers-reduced-motion</code>. <a href="../01-manual/movimiento-y-componentes.md">Reglas de movimiento y uso</a>.</p>
</main><script>
const control=document.getElementById('motion-toggle');
const previews=document.querySelectorAll('[data-animated]');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let playing=false;
function setPlaying(value){playing=value;previews.forEach(img=>{img.src=value?img.dataset.animated:img.dataset.static;});control.textContent=value?'Pausar animaciones':'Reproducir animaciones';control.setAttribute('aria-pressed',String(value));}
control.hidden=false;control.addEventListener('click',()=>setPlaying(!playing));reduced.addEventListener('change',()=>setPlaying(!reduced.matches));setPlaying(!reduced.matches);
document.querySelectorAll('[data-sequence]').forEach(link=>link.addEventListener('click',()=>{document.getElementById(link.dataset.sequence).open=true;}));
const initial=document.getElementById(location.hash.slice(1));if(initial?.tagName==='DETAILS')initial.open=true;
</script></body></html>\n`;
}
