import {readFile,writeFile} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const icons=JSON.parse(await readFile(join(lab,'03-editable/icons-state.json'),'utf8'));
const buttons=JSON.parse(await readFile(join(lab,'03-editable/buttons-state.json'),'utf8'));
const qr=(await readFile(join(lab,'06-aplicaciones/qr/codigo.svg'),'utf8')).replace('<svg ','<svg width="296" height="296" ');
const helper=(await readFile('C:/Users/danie/.codex/plugins/cache/openai-curated-remote/figma/15.0.0/skills/figma-generate-library/scripts/createComponentWithVariants.js','utf8')).replace('await figma.setCurrentPageAsync(page)','// La página se selecciona una vez por el llamador.');
const families=[
 {name:'Field/Text',axis:'State',values:['Default','Error','Disabled'],kind:'field',description:'Campo textual con etiqueta y ayuda persistentes. El error requiere explicación, no solo color.'},
 {name:'Field/Amount',axis:'State',values:['Empty','Filled','Error'],kind:'amount',description:'Importe y moneda separados. Datos ilustrativos; no calcula ni consulta saldo.'},
 {name:'Badge',axis:'Status',values:['Info','Pending','Confirmed','Danger'],kind:'badge',description:'Estado con texto y símbolo. Confirmed se usa únicamente con evidencia del sistema.'},
 {name:'Notification',axis:'Status',values:['Info','Pending','Danger'],kind:'notification',description:'Mensaje contextual con título, detalle y salida. Sin celebraciones en situaciones de riesgo.'},
 {name:'Dialog',axis:'Purpose',values:['Review','Info','Risk'],kind:'dialog',description:'Una decisión por diálogo. Texto y acciones editables; no ejecuta operaciones financieras.'},
 {name:'QR/Receive',axis:'Format',values:['Card'],kind:'qr',description:'QR vectorial de demostración: example.org/gatopago-demo. Quiet zone de cuatro módulos; no sirve para cobrar.'},
 {name:'Receipt',axis:'Format',values:['Card'],kind:'receipt',description:'Comprobante ficticio, importes consistentes y metadatos editables. No acredita una transacción.'},
 {name:'Skeleton',axis:'Screen',values:['Home','Activity'],kind:'skeleton',description:'Esqueleto geométrico estático de carga. Conserva la estructura; no es un saldo ni una operación.'},
 {name:'Pixel Rail',axis:'State',values:['Preparing','Idle','Confirmed'],kind:'rail',description:'Ruta indeterminada, sin porcentaje. La animación real y su variante reducida viven en 05-movimiento.'}
];
const code=helper+`
const iconIds=${JSON.stringify(icons.components)},buttonSource=${JSON.stringify(buttons.sets)},qrSVG=${JSON.stringify(qr)},families=${JSON.stringify(families)};
let page=figma.root.children.find(p=>p.name==='Components');const made=[];
if(!page){page=figma.createPage();page.name='Components';made.push(page.id)}
await figma.setCurrentPageAsync(page);
if(page.children.some(n=>n.name==='Components / Review'))return {status:'already_exists',pageId:page.id};
const vars=await figma.variables.getLocalVariablesAsync(),styles=await figma.getLocalTextStylesAsync(),effects=await figma.getLocalEffectStylesAsync(),collections=await figma.variables.getLocalVariableCollectionsAsync();
const V=Object.fromEntries(vars.map(v=>[v.name,v])),S=Object.fromEntries(styles.map(s=>[s.name,s])),E=Object.fromEntries(effects.map(s=>[s.name,s]));await Promise.all(styles.map(s=>figma.loadFontAsync(s.fontName)));
const color=collections.find(c=>c.name==='Color');
const paint=name=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',V[name]);
function track(n){made.push(n.id);return n}
function configure(n,width,mode='VERTICAL',padding='spacing/md',gap='spacing/compact'){
 n.layoutMode=mode;n.resize(width,100);n.fills=[];n.clipsContent=false;n.primaryAxisAlignItems='MIN';n.counterAxisAlignItems='MIN';n.layoutSizingVertical='HUG';n.layoutSizingHorizontal='FIXED';n.setBoundVariable('itemSpacing',V[gap]);
 for(const k of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])n.setBoundVariable(k,V[padding]);for(const k of ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'])n.setBoundVariable(k,V['radius/none']);return n;
}
function stack(parent,name,width,mode='VERTICAL',padding='spacing/none',gap='spacing/compact'){
 const n=track(figma.createAutoLayout(mode));n.name=name;parent.appendChild(n);return configure(n,width,mode,padding,gap);
}
async function text(parent,value,role='Body/Small',width=308,property){const n=track(figma.createText());n.name=property||value;n.fontName=S[role].fontName;await n.setTextStyleIdAsync(S[role].id);n.resize(width,24);n.textAutoResize='HEIGHT';n.characters=value;n.fills=[paint('color/text/primary')];parent.appendChild(n);n.layoutSizingVertical='HUG';if(property)n.componentPropertyReferences={characters:property};return n}
async function icon(parent,id,size=24,key='color/icon/primary'){
 const comp=await figma.getNodeByIdAsync(iconIds[id]);const n=track(comp.createInstance());parent.appendChild(n);n.rescale(size/24);made.push(...n.findAll(()=>true).map(c=>c.id));
 for(const v of n.findAllWithCriteria({types:['VECTOR']})){if(v.strokes.length)v.strokes=v.strokes.map(p=>p.type==='SOLID'?paint(key):p);if(v.fills.length)v.fills=v.fills.map(p=>p.type==='SOLID'?paint(key):p)}return n;
}
async function button(parent,kind,labelValue,iconId='enviar',width=308){const info=buttonSource[kind];const set=await figma.getNodeByIdAsync(info.id);const comp=set.children.find(n=>n.name==='Size=Medium, State=Default');const n=track(comp.createInstance());parent.appendChild(n);n.resize(width,n.height);n.setProperties({[info.labelKey]:labelValue,[info.showKey]:false,[info.iconKey]:iconIds[iconId]});made.push(...n.findAll(()=>true).map(c=>c.id));return n}
function border(n,key='color/border/strong'){n.strokes=[paint(key)];n.setBoundVariable('strokeWeight',V['border/width']);n.strokeAlign='INSIDE'}
function block(parent,width,height,key='color/bg/raised'){const n=track(figma.createRectangle());n.name='Bloque';n.resize(width,height);n.fills=[paint(key)];parent.appendChild(n);return n}
const results={},sets=[];let mainY=100;
for(const family of families){
 const {componentSet:set,variants}=await createComponentWithVariants({name:family.name,description:family.description,variantAxes:{[family.axis]:family.values},baseProps:{width:family.kind==='badge'?164:340,height:100,layoutMode:'VERTICAL'},page});made.push(set.id);set.x=1500;set.y=mainY;set.fills=[paint('color/bg/primary')];set.clipsContent=false;
 const props={};const add=(name,value)=>props[name]=set.addComponentProperty(name,'TEXT',value);
 if(family.kind==='field'){add('Label','Destinatario');add('Value','@dani');add('Help','Nombre o dirección de destino.');add('Error help','Comprueba el nombre o la dirección.');add('Disabled help','Disponible al completar el paso anterior.');}
 if(family.kind==='amount'){add('Label','Importe');add('Amount','125,00');add('Currency','USDC');add('Placeholder','0,00');}
 if(family.kind==='notification'||family.kind==='dialog'){add('Title',family.kind==='dialog'?'Antes de continuar':'Una actualización');add('Body',family.kind==='dialog'?'Revisa los datos antes de autorizar. Este ejemplo no mueve dinero.':'Puedes revisar el detalle en la actividad. Esta muestra no corresponde a un pago real.');}
 if(family.kind==='badge')add('Label','Estado de ejemplo');
 if(family.kind==='qr'){add('Title','Escanea este ejemplo');add('Destination','example.org/gatopago-demo');}
 if(family.kind==='receipt'){add('Amount','125,00');add('Recipient','Taller Norte');add('Reference','GP-DEMO-1042');add('Cost','Coste ilustrativo: 0,25 USDC');add('Total','Total: 125,25 USDC');}
 for(const [index,c] of variants.entries()){
  made.push(c.id);const value=family.values[index];configure(c,family.kind==='badge'?164:340);c.fills=[paint('color/bg/surface')];
  if(family.kind!=='badge'&&family.kind!=='rail'&&family.kind!=='skeleton')border(c);
  if(family.kind==='field'){
   await text(c,'Destinatario','Label/Action',308,props.Label);const box=stack(c,'Control',308,'HORIZONTAL','spacing/compact');box.fills=[paint(value==='Disabled'?'color/bg/raised':'color/bg/primary')];border(box,value==='Error'?'color/feedback/danger':'color/border/strong');await icon(box,'contactos',20);await text(box,'@dani','Body/Medium',228,props.Value);
   await text(c,value==='Error'?'Comprueba el nombre o la dirección.':value==='Disabled'?'Disponible al completar el paso anterior.':'Nombre o dirección de destino.','Body/Small',308,value==='Error'?props['Error help']:value==='Disabled'?props['Disabled help']:props.Help);
  }else if(family.kind==='amount'){
   await text(c,'Importe','Label/Action',308,props.Label);const box=stack(c,'Importe y moneda',308);box.fills=[paint('color/bg/primary')];border(box,value==='Error'?'color/feedback/danger':'color/border/subtle');await text(box,value==='Filled'?'125,00':'0,00','Amount/Large',308,value==='Filled'?props.Amount:props.Placeholder);await text(box,'USDC','Code/Metadata',308,props.Currency);await text(c,value==='Error'?'Introduce un importe mayor que cero.':'Importe de demostración. No se consultó saldo.');
  }else if(family.kind==='badge'){
   configure(c,164,'HORIZONTAL','spacing/compact','spacing/sm');c.counterAxisAlignItems='CENTER';const role={Info:'info',Pending:'pending',Confirmed:'confirmed',Danger:'danger'}[value];c.fills=[paint('color/feedback/'+role)];await icon(c,{Info:'ayuda',Pending:'pendiente',Confirmed:'verificar',Danger:'alerta'}[value],16,'color/icon/on-action');const t=await text(c,'Estado de ejemplo','Label/Action',104,props.Label);t.fills=[paint('color/text/on-action')];
  }else if(family.kind==='notification'){
   const head=stack(c,'Cabecera',308,'HORIZONTAL','spacing/none','spacing/sm');await icon(head,value==='Danger'?'seguridad':value==='Pending'?'pendiente':'notificaciones',20);await text(head,'Una actualización','Label/Action',256,props.Title);const band=block(c,308,4,'color/feedback/'+(value==='Danger'?'danger':value==='Pending'?'pending':'info'));band.name='Estado';await text(c,'Puedes revisar el detalle en la actividad. Esta muestra no corresponde a un pago real.','Body/Small',308,props.Body);await button(c,'Secondary','Ver detalle','actividad');
  }else if(family.kind==='dialog'){
   await icon(c,value==='Risk'?'alerta':value==='Review'?'enviar':'ayuda',24);await text(c,'Antes de continuar','Heading/2',308,props.Title);await text(c,'Revisa los datos antes de autorizar. Este ejemplo no mueve dinero.','Body/Small',308,props.Body);
   if(value==='Review'){await text(c,'25 USDC → @dani','Heading/2');await text(c,'Importe ficticio. Coste y destino se deben verificar.');}
   if(value==='Risk')await text(c,'Si no reconoces el destino, vuelve y compruébalo.');
   await button(c,'Primary',value==='Info'?'Entendido':'Revisar datos');if(value!=='Info')await button(c,'Secondary','Volver');
  }else if(family.kind==='qr'){
   await text(c,'Escanea este ejemplo','Heading/2',308,props.Title);const code=track(figma.createNodeFromSvg(qrSVG));code.name='QR vectorial · quiet zone 4';c.appendChild(code);made.push(...code.findAll(()=>true).map(n=>n.id));await text(c,'example.org/gatopago-demo','Code/Metadata',308,props.Destination);await text(c,'Demostración. No es un enlace de cobro.');await button(c,'Secondary','Descargar ejemplo','descargar');
  }else if(family.kind==='receipt'){
   await text(c,'GatoPago / COMPROBANTE DE EJEMPLO','Code/Metadata');await text(c,'125,00','Amount/Large',308,props.Amount);await text(c,'USDC · importe enviado','Code/Metadata');await text(c,'Taller Norte','Heading/2',308,props.Recipient);await text(c,'Coste ilustrativo: 0,25 USDC','Body/Small',308,props.Cost);await text(c,'Total: 125,25 USDC','Label/Action',308,props.Total);await text(c,'GP-DEMO-1042','Code/Metadata',308,props.Reference);await text(c,'2 oct 2026 · 10:42 UTC');await text(c,'Sin transacción. Muestra visual sin validez.');await button(c,'Secondary','Descargar ejemplo','descargar');
  }else if(family.kind==='skeleton'){
   await text(c,value==='Home'?'Cargando tu cuenta…':'Cargando actividad…','Label/Action');
   if(value==='Home'){block(c,120,14);block(c,208,48);const row=stack(c,'Acciones',308,'HORIZONTAL','spacing/none','spacing/md');for(let j=0;j<3;j++)block(row,92,44);block(c,308,64);}
   else for(let j=0;j<3;j++){const row=stack(c,'Movimiento '+j,308,'HORIZONTAL');block(row,32,32);const col=stack(row,'Texto',260);block(col,180,12);block(col,120,10);}
   await text(c,'Los bloques no representan importes ni movimientos.');
  }else if(family.kind==='rail'){
   await text(c,value==='Confirmed'?'Resultado confirmado · ejemplo':value==='Idle'?'Todo listo · ejemplo':'Preparando tu pago…','Label/Action');const row=stack(c,'Rail',308,'HORIZONTAL','spacing/none','spacing/sm');for(let j=0;j<13;j++)block(row,16,8,j===6?'color/bg/action':'color/icon/primary');await text(c,value==='Confirmed'?'Usar solo después de una respuesta verificada.':'Espera indeterminada. No indica porcentaje.');
  }
  c.x=40+index*(c.width+40);c.y=40;
 }
 const width=Math.max(...variants.map(n=>n.x+n.width))+40,height=Math.max(...variants.map(n=>n.height))+80;set.resizeWithoutConstraints(width,height);mainY+=height+120;
 results[family.name]={id:set.id,properties:props,variants:variants.map(n=>({id:n.id,name:n.name,width:n.width,height:n.height})),axes:set.variantGroupProperties,definitions:set.componentPropertyDefinitions};sets.push(set);
}
const review=stack(page,'Components / Review',1200,'VERTICAL','spacing/xl','spacing/xl');review.x=100;review.y=100;review.fills=[paint('color/bg/primary')];await text(review,'Una cuenta. Un lenguaje visual.','Heading/1',1104);await text(review,'Componentes nativos del laboratorio. Los datos son ficticios; ninguna muestra mueve dinero.','Body/Medium',1104);
const sectionIds=[];
for(const family of families){
 const section=stack(review,'Review/'+family.name,1104);sectionIds.push(section.id);await text(section,family.name,'Heading/2',1104);await text(section,family.description,'Body/Small',1104);const row=stack(section,'Instancias',1104,'HORIZONTAL','spacing/none','spacing/lg');
 const set=sets.find(n=>n.name===family.name);for(const [i,comp] of set.children.entries()){
  const card=stack(row,comp.name,comp.width);await text(card,family.values[i],'Code/Metadata',comp.width);const instance=track(comp.createInstance());card.appendChild(instance);
  if(family.kind==='badge')instance.setProperties({[results[family.name].properties.Label]:{Info:'Información',Pending:'Pendiente',Confirmed:'Confirmado',Danger:'Atención'}[family.values[i]]});
  made.push(...instance.findAll(()=>true).map(n=>n.id));
 }
}
const dark=stack(review,'Review/Dark',1104,'VERTICAL','spacing/md','spacing/lg');dark.fills=[paint('color/bg/primary')];dark.setExplicitVariableModeForCollection(color,color.modes.find(m=>m.name==='Dark').modeId);sectionIds.push(dark.id);await text(dark,'También en superficies oscuras','Heading/2',1072);
const darkRow=stack(dark,'Ejemplos oscuros',1072,'HORIZONTAL','spacing/none','spacing/lg');for(const name of ['Field/Text','Notification','Receipt']){const set=sets.find(s=>s.name===name);const instance=track(set.children[0].createInstance());darkRow.appendChild(instance);made.push(...instance.findAll(()=>true).map(n=>n.id));}
for(const id of sectionIds){const section=await figma.getNodeByIdAsync(id);section.fills=[paint('color/bg/primary')];await section.screenshot({scale:.75})}
return {pageId:page.id,reviewId:review.id,createdNodeIds:[...new Set(made)],families:results,componentSets:sets.length,variants:sets.reduce((n,s)=>n+s.children.length,0),reviewSections:sectionIds,bounds:{width:review.width,height:review.height},instances:review.findAllWithCriteria({types:['INSTANCE']}).length};
`;
await writeFile(join(lab,'03-editable/widgets.plugin.js'),code);
console.log('Receta nativa: campos, estados, notificaciones, diálogos, QR, comprobante, cargas y rail.');
