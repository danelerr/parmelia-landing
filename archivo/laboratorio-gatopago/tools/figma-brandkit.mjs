import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { resolve, join, relative, extname, basename } from 'node:path';
import sharp from 'sharp';

const root = resolve('.');
const dir = join(root, 'archivo/laboratorio-gatopago/03-editable/brandkit-import');
const skill = 'C:/Users/danie/.codex/plugins/cache/openai-curated-remote/figma/15.0.0/skills';
const read = async p => JSON.parse(await readFile(join(root, p), 'utf8'));
const save = async (name, data) => writeFile(join(dir, name), JSON.stringify(data, null, 2) + '\n');
await mkdir(dir, { recursive: true });
const [action, arg, offsetArg] = process.argv.slice(2);

if (action === 'prepare') {
  const character = await read('brandkit/03-personaje/animaciones/manifest.json');
  const assets = [];
  async function add(path, page, name, note, component = false) {
    const meta = extname(path) === '.svg' ? null : await sharp(join(root, path)).metadata();
    assets.push({ path, page, name, note, component, width: meta?.width, height: meta?.height, kind: extname(path).slice(1) });
  }
  for (const s of character.statics) await add('brandkit/03-personaje/hd/' + s.file, 'Character', s.name, s.purpose + ' · Propuesta de referencia. PNG original ampliado por múltiplo entero; sin redibujo.', true);
  for (const f of await readdir(join(root, 'brandkit/06-originales'))) if (f.endsWith('.png')) await add('brandkit/06-originales/' + f, 'Originals', f, 'Hoja fuente íntegra. No recortada ni reinterpretada.');
  for (const section of ['simbolo', 'horizontal', 'variantes']) for (const f of await readdir(join(root, 'brandkit/02-logos', section))) if (f.endsWith('.svg')) await add('brandkit/02-logos/' + section + '/' + f, 'Logos', section + ' / ' + basename(f, '.svg'), section === 'simbolo' ? 'Símbolo estable. SVG editable.' : 'Variante existente del kit · revisar aprobación. SVG editable.', true);
  for (const section of ['iconos-web', 'pwa']) for (const f of await readdir(join(root, 'brandkit/02-logos', section))) if (f.endsWith('.png') || f.endsWith('.svg')) await add('brandkit/02-logos/' + section + '/' + f, 'Brand Images', section + ' / ' + f, 'Icono web / instalación. Tamaño y margen de origen conservados.');
  for (const f of await readdir(join(root, 'brandkit/08-imagenes/avatar'))) if (f.endsWith('.png') || f.endsWith('.svg')) await add('brandkit/08-imagenes/avatar/' + f, 'Brand Images', f, 'Avatar con fondo Milk intencional, según el kit.');
  await add('brandkit/08-imagenes/open-graph/og.png', 'Brand Images', 'Open Graph', '1200 × 630 · imagen social del kit.');
  await add('brandkit/09-componentes/qr-ejemplo.svg', 'Deliverables', 'QR / SVG editable', 'Abre https://gatopago.com. No es un cobro. Zona libre de cuatro módulos.');
  await add('brandkit/09-componentes/qr-ejemplo.png', 'Deliverables', 'QR / PNG original', 'Abre https://gatopago.com. No es un cobro. Zona libre de cuatro módulos.');
  await add('recursos/social/gatopago-x-cover-2026-10-01-v1.png', 'Deliverables', 'Portada X / arte existente', 'Recurso social existente. Sin texto añadido ni cambios en el dibujo.');
  for (const f of await readdir(join(root, 'brandkit/10-plantillas'))) if (f.endsWith('.svg') || f.endsWith('.png')) await add('brandkit/10-plantillas/' + f, 'Templates', f, f.endsWith('.svg') ? 'Vector original; textos trazados en la fuente. Referencia fiel.' : 'Referencia raster original de la plantilla.');
  for (const a of character.animations) {
    await add('brandkit/03-personaje/hd/hojas/' + a.id + '.png', 'Motion Sheets', a.name, `${a.frames} poses únicas · ${a.sequence.length} pasos · ${a.totalMs} ms · ${a.playback} · revisión artística pendiente.`);
    for (const frame of [...new Set(a.sequence.map(s => s.frame))]) {
      await add('brandkit/03-personaje/hd/animaciones/' + frame, 'Motion Frames', a.id + '/' + basename(frame, '.png'), 'Fotograma íntegro. Lienzo, proporciones y alfa originales. No deformar.', true);
      assets.at(-1).animationId = a.id;
      assets.at(-1).frame = frame;
      assets.at(-1).canvas = a.canvas;
    }
  }
  const manuals = [];
  for (const f of await readdir(join(root, 'brandkit/01-manual'))) if (f.endsWith('.md')) manuals.push({ path: 'brandkit/01-manual/' + f, title: basename(f, '.md'), text: await readFile(join(root, 'brandkit/01-manual', f), 'utf8') });
  for (const folder of ['02-logos', '03-personaje', '04-tipografia', '05-colores', '06-originales', '07-referencias', '08-imagenes', '09-componentes', '10-plantillas']) manuals.push({ path: 'brandkit/' + folder + '/README.md', title: folder, text: await readFile(join(root, 'brandkit', folder, 'README.md'), 'utf8') });
  const inventory = { fileKey: 'HSJ40AEahIfLIgjXjB3foS', assets, animations: character.animations, manuals, sourceStatus: character.status, excluded: ['brandkit/03-personaje/descartado', 'rig-raster', 'rig-revision', 'QA y duplicados HD de la misma pieza'], generatedAt: new Date().toISOString() };
  await save('inventory.json', inventory);
  console.log(JSON.stringify({ assets: assets.length, byPage: Object.fromEntries([...new Set(assets.map(a => a.page))].map(p => [p, assets.filter(a => a.page === p).length])), manuals: manuals.length, animations: inventory.animations.length }));
}

if (action === 'script') {
  const inv = await read(relative(root, join(dir, 'inventory.json')));
  let helper = await readFile(join(skill, 'figma-generate-library/scripts/createDocumentationPage.js'), 'utf8');
  helper = helper.replaceAll("'Inter'", "'Recursive'").replaceAll("'Bold'", "'Sans Linear Bold'").replaceAll("'Regular'", "'Sans Linear'").replaceAll("'Medium'", "'Sans Linear Medium'")
    .replace('root.resize(1440, 1)', "root.resize(1440, 900)\n  root.primaryAxisSizingMode = 'AUTO'").replace('root.x = 0', 'root.x = 100');
  const utils = `
const fonts=[{family:'Recursive',style:'Sans Linear'},{family:'Recursive',style:'Sans Linear Bold'},{family:'Recursive',style:'Mono Linear Medium'}];
await Promise.all(fonts.map(f=>figma.loadFontAsync(f)));
const vars=Object.fromEntries((await figma.variables.getLocalVariablesAsync()).map(v=>[v.name,v]));
const styles=Object.fromEntries((await figma.getLocalTextStylesAsync()).map(s=>[s.name,s]));
const col=(await figma.variables.getLocalVariableCollectionsAsync()).find(c=>c.name==='Color');
function paint(name){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',vars[name]);}
const ids=[];
function track(n){ids.push(n.id);return n;}
function stack(parent,name,width=1280,gap=16,direction='VERTICAL'){const f=track(figma.createAutoLayout(direction));f.name=name;f.resize(width,100);f.primaryAxisSizingMode=direction==='VERTICAL'?'AUTO':'FIXED';f.counterAxisSizingMode=direction==='VERTICAL'?'FIXED':'AUTO';f.fills=[];f.itemSpacing=gap;f.clipsContent=false;parent.appendChild(f);f.layoutSizingHorizontal='FIXED';f.layoutSizingVertical='HUG';return f;}
async function text(parent,value,width=1280,role='Body/Medium'){const t=track(figma.createText());t.fontName=styles[role].fontName;await t.setTextStyleIdAsync(styles[role].id);t.textAutoResize='HEIGHT';t.resize(width,24);t.characters=value;t.fills=[paint('color/text/primary')];parent.appendChild(t);t.layoutSizingHorizontal='FIXED';t.layoutSizingVertical='HUG';return t;}
function childrenIds(n){return [n.id,...n.findAll(()=>true).map(x=>x.id)];}
`;
  let code;
  const pageAssets = inv.assets.filter(a => a.page === arg);
  if (pageAssets.length) {
    code = helper + utils + `
const pageName=${JSON.stringify(arg)},assets=${JSON.stringify(pageAssets.map(a=>[a.path,a.name,a.width,a.height,a.kind,a.component,a.animationId,a.frame,a.canvas]))}.map(a=>({path:a[0],name:a[1],width:a[2],height:a[3],kind:a[4],component:a[5],animationId:a[6],frame:a[7],canvas:a[8],note:pageName==='Motion Frames'?'Fotograma íntegro. Lienzo y alfa originales. Revisión pendiente.':pageName==='Character'?'Ilustración de origen. Sin redibujo. Revisión pendiente.':pageName==='Originals'?'Fuente íntegra, sin recortes.':pageName==='Logos'?'Logo del kit. SVG editable. Variantes: revisar aprobación.':pageName==='Templates'?'Plantilla del kit. Revisar aprobación. SVG trazado / PNG referencia.':pageName==='Motion Sheets'?'Hoja completa. Ver manifiesto para orden y tiempos. Revisión pendiente.':'Recurso del kit; dimensiones y margen de origen conservados.'}));
const old=figma.root.children.find(p=>p.name===pageName);
if(old)return {status:'already_exists',pageId:old.id,roots:old.children.map(n=>({id:n.id,name:n.name}))};
const doc=await createDocumentationPage(pageName,{title:pageName==='Character'?'El gato. Todas sus expresiones.':pageName==='Logos'?'Un símbolo estable.':pageName==='Originals'?'Las fuentes, sin reinterpretar.':pageName==='Motion Frames'?'Cada fotograma, íntegro.':pageName==='Motion Sheets'?'Las secuencias, de un vistazo.':pageName==='Templates'?'Formatos para contar lo que hacemos.':'GatoPago en cada formato.',description:'BRANDKIT / 1.0.0-rc.1 · Fuente local conservada · Sin publicación de biblioteca',sections:[]});
const root=await figma.getNodeByIdAsync(doc.frameIds[0]);root.fills=[paint('color/bg/primary')];root.setExplicitVariableModeForCollection(col,col.modes.find(m=>m.name==='Light').modeId);root.clipsContent=false;
const mapped=[];
for(let start=0;start<assets.length;start+=3){const row=stack(root,'Row/'+start,1280,24,'HORIZONTAL');for(const a of assets.slice(start,start+3)){
const card=stack(row,a.name,410,16);card.fills=[paint('color/bg/surface')];for(const field of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])card.setBoundVariable(field,vars['spacing/md']);card.strokes=[paint('color/border/subtle')];card.strokeWeight=1;
const stage=track(figma.createFrame());stage.name='Art/'+a.name;stage.resize(378,300);stage.fills=[];stage.clipsContent=false;card.appendChild(stage);
let target;
if(a.kind!=='svg'){
const scale=Math.min(360/a.width,276/a.height);const w=a.width*scale,h=a.height*scale;
if(a.component){const comp=track(figma.createComponent());comp.name=(pageName==='Motion Frames'?'_Frames/':pageName==='Character'?'Character/':'Asset/')+a.name;comp.resize(w,h);comp.fills=[];comp.description=a.note+'\\nSource: '+a.path;doc.page.appendChild(comp);comp.x=1600+(mapped.length%6)*440;comp.y=100+Math.floor(mapped.length/6)*380;target=track(figma.createRectangle());target.name='RGBA / '+a.path;target.resize(w,h);target.fills=[];comp.appendChild(target);const inst=track(comp.createInstance());stage.appendChild(inst);inst.x=(378-w)/2;inst.y=(300-h)/2;mapped.push({...a,targetId:target.id,componentId:comp.id,stageId:stage.id,cardId:card.id});}
else{target=track(figma.createRectangle());target.name='Source / '+a.path;target.resize(w,h);target.fills=[];stage.appendChild(target);target.x=(378-w)/2;target.y=(300-h)/2;mapped.push({...a,targetId:target.id,stageId:stage.id,cardId:card.id});}
}else mapped.push({...a,stageId:stage.id,cardId:card.id});
await text(card,a.name,378,'Heading/2');await text(card,a.note,378,'Body/Small');await text(card,a.path,378,'Code/Metadata');}}
for(const t of root.findAllWithCriteria({types:['TEXT']}).filter(t=>t.textStyleId==='')){await figma.loadFontAsync(t.fontName);const role=t===doc.titleNode?'Heading/1':'Body/Medium';await t.setTextStyleIdAsync(styles[role].id);t.textAutoResize='HEIGHT';t.resize(1280,24);t.fills=[paint('color/text/primary')];}
return {pageId:doc.page.id,rootId:root.id,createdNodeIds:[doc.page.id,...childrenIds(root),...ids],assets:mapped,bounds:{width:root.width,height:root.height}};`;
  } else if (arg === 'manuals') {
    code = helper + utils + `
const existing=figma.root.children.find(p=>p.name==='Manual');
let doc;if(existing){await figma.setCurrentPageAsync(existing);doc={page:existing,frameIds:[existing.children.find(n=>n.name==='Manual').id]};}else doc=await createDocumentationPage('Manual',{title:'La marca, explicada.',description:'Manuales completos del kit · Texto editable · Origen identificado en cada documento',sections:[]});
const root=await figma.getNodeByIdAsync(doc.frameIds[0]);root.fills=[paint('color/bg/primary')];root.setExplicitVariableModeForCollection(col,col.modes.find(m=>m.name==='Light').modeId);root.clipsContent=false;
if(!existing)await text(root,'El logo permanece estable. El gato puede tener personalidad. Meli es únicamente el nombre interno del personaje.');
const offset=${Number(offsetArg ?? 0)},docs=${JSON.stringify(inv.manuals.slice(Number(offsetArg ?? 0), Number(offsetArg ?? 0) + 4))};const frames=[];
for(let i=0;i<docs.length;i++){const d=docs[i];if(doc.page.children.some(n=>n.name==='Manual/'+d.title))continue;const index=i+offset;const f=stack(doc.page,'Manual/'+d.title,1440,24);f.x=100+(index%4)*1600;f.y=700+Math.floor(index/4)*12000;f.fills=[paint('color/bg/primary')];for(const field of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])f.setBoundVariable(field,vars['spacing/section']);await text(f,d.title,1280,'Heading/1');await text(f,d.path,1280,'Code/Metadata');for(const paragraph of d.text.split(/\\n\\s*\\n/)){const heading=paragraph.match(/^#{1,3}\\s+([^\\n]+)$/);const clean=paragraph.replace(/^#{1,6}\\s+/gm,'').replace(/\\*\\*/g,'').replace(/\\[([^\\]]+)\\]\\([^\\)]+\\)/g,'$1');await text(f,clean,1280,heading?'Heading/2':paragraph.includes('|---')?'Code/Metadata':'Body/Medium');}frames.push({id:f.id,path:d.path,height:f.height});}
for(const t of root.findAllWithCriteria({types:['TEXT']}).filter(t=>t.textStyleId==='')){await figma.loadFontAsync(t.fontName);await t.setTextStyleIdAsync(styles[t===doc.titleNode?'Heading/1':'Body/Medium'].id);t.textAutoResize='HEIGHT';t.resize(1280,24);t.fills=[paint('color/text/primary')];}
return {pageId:doc.page.id,rootId:root.id,frames,createdNodeIds:[doc.page.id,...childrenIds(root),...ids]};`;
  } else if (arg === 'motion') {
    const mapping = await read(relative(root, join(dir, 'Motion-Frames.json')));
    const groups = inv.animations.map(a => ({ ...a, sources: mapping.assets.filter(s => s.animationId === a.id).map(s => ({ frame: s.frame, componentId: s.componentId })) }));
    code = helper + utils + `
const existing=figma.root.children.find(p=>p.name==='Motion');if(existing)return {status:'already_exists',pageId:existing.id,roots:existing.children.map(n=>({id:n.id,name:n.name}))};
const doc=await createDocumentationPage('Motion',{title:'Movimiento sin reinterpretar al gato.',description:'20 secuencias · 147 fotogramas fuente · Tiempos originales · Pistas OPACITY con HOLD, sin morph ni deformaciones.',sections:[]});
const root=await figma.getNodeByIdAsync(doc.frameIds[0]);root.fills=[paint('color/bg/primary')];root.setExplicitVariableModeForCollection(col,col.modes.find(m=>m.name==='Light').modeId);root.clipsContent=false;
await text(root,'Selecciona una tarjeta Animation y reproduce su timeline. Cada secuencia conserva los pasos y milisegundos del manifiesto. La repetición en producto depende de playback; las celebraciones no se reproducen indefinidamente. Todas las secuencias del personaje siguen pendientes de aprobación artística.');
const animations=${JSON.stringify(groups)},out=[];
const components=Object.fromEntries(await Promise.all(animations.flatMap(a=>a.sources).map(async s=>[s.componentId,await figma.getNodeByIdAsync(s.componentId)])));
for(let index=0;index<animations.length;index++){const a=animations[index];const f=stack(doc.page,'Animation/'+a.id,900,20);f.x=100+(index%3)*1000;f.y=700+Math.floor(index/3)*1100;f.fills=[paint('color/bg/primary')];f.setExplicitVariableModeForCollection(col,col.modes.find(m=>m.name==='Light').modeId);for(const field of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])f.setBoundVariable(field,vars['spacing/xl']);f.strokes=[paint('color/border/strong')];f.setBoundVariable('strokeWeight',vars['border/width']);
await text(f,a.name,836,'Heading/1');await text(f,a.purpose,836);await text(f,a.frames+' poses / '+a.sequence.length+' pasos / '+a.totalMs+' ms / '+a.playback,836,'Code/Metadata');
const stage=track(figma.createFrame());stage.name='Playback / lienzo completo';stage.resize(836,500);stage.fills=[paint('color/bg/surface')];stage.clipsContent=false;f.appendChild(stage);
let elapsed=0;const moments=a.sequence.map(s=>{const t=elapsed/1000;elapsed+=s.ms;return {...s,t};});
for(const source of a.sources){const inst=track(components[source.componentId].createInstance());inst.name=source.frame;stage.appendChild(inst);const scale=a.canvas.width*2/inst.width;inst.rescale(scale);inst.x=(836-inst.width)/2;inst.y=(500-inst.height)/2;inst.opacity=source.frame===a.sequence[0].frame?1:0;inst.manualKeyframeTracks={OPACITY:{keyframes:moments.map(s=>({timelinePosition:s.t,value:{type:'FLOAT',value:s.frame===source.frame?1:0},easing:{type:'HOLD'}}))}};ids.push(...inst.findAll(()=>true).map(n=>n.id));}
f.setTimelineDuration(f.timelines[0].id,a.totalMs/1000);
await text(f,'TIEMPOS / '+a.sequence.map((s,i)=>String(i+1).padStart(2,'0')+': '+s.frame.split('/').pop()+' · '+s.ms+' ms').join('  |  '),836,'Code/Metadata');
await text(f,'Origen: brandkit/03-personaje/animaciones/manifest.json · En revisión. El movimiento no confirma una operación financiera.',836,'Body/Small');
out.push({id:a.id,nodeId:f.id,duration:f.timelines[0].duration,steps:a.sequence.length,frames:a.frames,animatedLayers:stage.children.length,holdTracks:stage.children.every(n=>n.manualKeyframeTracks.OPACITY.keyframes.every(k=>k.easing.type==='HOLD'))});}
for(const t of root.findAllWithCriteria({types:['TEXT']}).filter(t=>t.textStyleId==='')){await figma.loadFontAsync(t.fontName);await t.setTextStyleIdAsync(styles[t===doc.titleNode?'Heading/1':'Body/Medium'].id);t.textAutoResize='HEIGHT';t.resize(1280,24);t.layoutSizingVertical='HUG';t.fills=[paint('color/text/primary')];}
return {pageId:doc.page.id,rootId:root.id,createdNodeIds:[doc.page.id,...childrenIds(root),...ids],animations:out};`;
  } else throw new Error('Unknown page ' + arg);
  await writeFile(join(dir, arg.replaceAll(' ', '-') + '.plugin.js'), code);
  console.log(JSON.stringify({ file: relative(root, join(dir, arg.replaceAll(' ', '-') + '.plugin.js')), bytes: code.length }));
}

if (action === 'record') {
  const result = JSON.parse(await readFile(arg, 'utf8'));
  const data = result.content?.find(c => c.type === 'text' && c.text.startsWith('{'));
  const parsed = data ? JSON.parse(data.text) : result;
  await save(basename(arg).replace('.raw', ''), parsed);
  console.log(JSON.stringify({ pageId: parsed.pageId, rootId: parsed.rootId, assets: parsed.assets?.length, error: parsed.error }));
}
