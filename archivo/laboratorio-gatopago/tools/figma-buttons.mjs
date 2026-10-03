import {readFile,writeFile} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const icons=JSON.parse(await readFile(join(lab,'03-editable/icons-state.json'),'utf8'));
const base='C:/Users/danie/.codex/plugins/cache/openai-curated-remote/figma/15.0.0/skills/figma-generate-library/scripts/';
let helper=await readFile(base+'createComponentWithVariants.js','utf8');
// El llamador selecciona la página una sola vez; el helper conserva el resto de su trabajo.
helper=helper.replace('await figma.setCurrentPageAsync(page)','// Página seleccionada por el llamador.');
const bind=await readFile(base+'bindVariablesToComponent.js','utf8');
const code=helper+'\n'+bind+`
const iconIds=${JSON.stringify(icons.components)};
let page=figma.root.children.find(p=>p.name==='Buttons');const made=[];
if(!page){page=figma.createPage();page.name='Buttons';made.push(page.id)}
await figma.setCurrentPageAsync(page);
if(page.children.some(n=>n.name==='Buttons / Review'))return {status:'already_exists',pageId:page.id};
const vars=await figma.variables.getLocalVariablesAsync(),styles=await figma.getLocalTextStylesAsync(),effects=await figma.getLocalEffectStylesAsync(),collections=await figma.variables.getLocalVariableCollectionsAsync();
const V=Object.fromEntries(vars.map(v=>[v.name,v])),S=Object.fromEntries(styles.map(s=>[s.name,s])),E=Object.fromEntries(effects.map(s=>[s.name,s]));
await Promise.all(styles.map(s=>figma.loadFontAsync(s.fontName)));
const color=collections.find(c=>c.name==='Color');
const paint=name=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',V[name]);
const mainIcon=await figma.getNodeByIdAsync(iconIds.enviar),pending=await figma.getNodeByIdAsync(iconIds.pendiente);
function track(n){made.push(n.id);return n}
function stack(parent,name,width,mode='VERTICAL',gap='spacing/md'){
 const f=track(figma.createAutoLayout(mode));f.name=name;f.resize(width,100);f.fills=[];f.clipsContent=false;f.setBoundVariable('itemSpacing',V[gap]);parent.appendChild(f);f.layoutSizingVertical='HUG';return f;
}
async function label(parent,value,role,width){const t=track(figma.createText());t.name='label';t.fontName=S[role].fontName;await t.setTextStyleIdAsync(S[role].id);t.resize(width,24);t.textAutoResize='HEIGHT';t.characters=value;t.fills=[paint('color/text/primary')];parent.appendChild(t);t.layoutSizingVertical='HUG';return t}
const sets={},checks=[];
for(const [index,kind] of ['Primary','Secondary'].entries()){
 const result=await createComponentWithVariants({name:'Button/'+kind,description:'Acción '+(kind==='Primary'?'principal':'secundaria')+'. Dos tamaños; Default, Hover, Pressed, Disabled y Loading. Texto e icono editables. Loading es una muestra estática: nunca confirma una operación.',variantAxes:{Size:['Medium','Large'],State:['Default','Hover','Pressed','Disabled','Loading']},baseProps:{width:208,height:44,layoutMode:'HORIZONTAL'},page});
 const set=result.componentSet;made.push(set.id);set.x=1500;set.y=100+index*500;set.fills=[paint('color/bg/primary')];set.clipsContent=false;
 const labelKey=set.addComponentProperty('Label','TEXT','Continuar'),showKey=set.addComponentProperty('Show icon','BOOLEAN',true),iconKey=set.addComponentProperty('Icon','INSTANCE_SWAP',mainIcon.id);
 for(const [i,comp] of result.variants.entries()){
  made.push(comp.id);const props=Object.fromEntries(comp.name.split(', ').map(s=>s.split('='))),state=props.State;
  const disabled=state==='Disabled',loading=state==='Loading',primary=kind==='Primary';
  await bindVariablesToComponent(comp,{fills:V[disabled?'color/bg/raised':primary?'color/bg/action':'color/bg/surface'].id,strokes:V['color/border/strong'].id,paddingTop:V[props.Size==='Large'?'spacing/md':'spacing/compact'].id,paddingBottom:V[props.Size==='Large'?'spacing/md':'spacing/compact'].id,paddingLeft:V['spacing/lg'].id,paddingRight:V['spacing/lg'].id,itemSpacing:V['spacing/sm'].id,cornerRadius:V['radius/none'].id});
  comp.setBoundVariable('strokeWeight',V['border/width']);comp.setBoundVariable('minHeight',V['target/minimum']);comp.strokeAlign='INSIDE';comp.clipsContent=false;comp.layoutSizingVertical='HUG';comp.layoutSizingHorizontal='FIXED';
  if(state==='Default'||loading||state==='Hover')await comp.setEffectStyleIdAsync(E[state==='Hover'?'Shadow/Ink':'Shadow/Pixel'].id);else comp.effects=[];
  const slot=stack(comp,'icon-slot',20,'HORIZONTAL');slot.resize(20,20);slot.layoutSizingVertical='FIXED';slot.visible=!loading;
  const icon=track(mainIcon.createInstance());icon.name='icon';slot.appendChild(icon);icon.rescale(20/24);icon.componentPropertyReferences={visible:showKey,mainComponent:iconKey};made.push(...icon.findAll(()=>true).map(n=>n.id));
  const indicator=track(pending.createInstance());indicator.name='loading-indicator';comp.appendChild(indicator);indicator.rescale(20/24);indicator.visible=loading;made.push(...indicator.findAll(()=>true).map(n=>n.id));
  for(const inst of [icon,indicator])for(const n of inst.findAllWithCriteria({types:['VECTOR']})){const key=disabled?'color/icon/secondary':primary?'color/icon/on-action':'color/icon/primary';if(n.strokes.length)n.strokes=n.strokes.map(p=>p.type==='SOLID'?paint(key):p);if(n.fills.length)n.fills=n.fills.map(p=>p.type==='SOLID'?paint(key):p)}
  const t=await label(comp,'Continuar','Label/Action',120);t.layoutSizingHorizontal='FILL';t.fills=[paint(disabled?'color/text/secondary':primary?'color/text/on-action':'color/text/primary')];t.textAlignHorizontal='CENTER';t.componentPropertyReferences={characters:labelKey};
  comp.x=40+(i%5)*240+(state==='Pressed'?4:0);comp.y=40+Math.floor(i/5)*100+(state==='Pressed'?4:0);
 }
 set.resizeWithoutConstraints(1280,244);sets[kind]={id:set.id,labelKey,showKey,iconKey,variants:result.variants.map(n=>({id:n.id,name:n.name,width:n.width,height:n.height}))};
 checks.push({id:set.id,count:set.children.length,properties:set.componentPropertyDefinitions,axes:set.variantGroupProperties});
}
const review=stack(page,'Buttons / Review',1280);review.x=100;review.y=100;review.fills=[paint('color/bg/primary')];for(const k of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])review.setBoundVariable(k,V['spacing/xl']);
await label(review,'Una acción clara. Un botón reconocible.','Heading/1',1184);
await label(review,'Instancias editables · Bordes cuadrados · Recursive · Iconos intercambiables · Área mínima de 44 px','Body/Medium',1184);
const previews=[];
for(const mode of ['Light','Dark']){
 const section=stack(review,'Mode/'+mode,1184);section.fills=[paint('color/bg/primary')];section.setExplicitVariableModeForCollection(color,color.modes.find(m=>m.name===mode).modeId);
 for(const k of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])section.setBoundVariable(k,V['spacing/md']);
 await label(section,mode==='Light'?'Superficies claras':'Superficies oscuras','Heading/2',1152);
 for(const kind of ['Primary','Secondary']){
  await label(section,kind==='Primary'?'Acción principal':'Acción secundaria','Label/Action',1152);
  for(const size of ['Medium','Large']){
   const row=stack(section,kind+'/'+size,1152,'HORIZONTAL','spacing/lg');
   const set=await figma.getNodeByIdAsync(sets[kind].id);
   for(const state of ['Default','Hover','Pressed','Disabled','Loading']){
    const card=stack(row,state,208);await label(card,state+' / '+size,'Code/Metadata',208);
    const comp=set.children.find(n=>n.name==='Size='+size+', State='+state);const instance=track(comp.createInstance());card.appendChild(instance);instance.setProperties({[sets[kind].labelKey]:state==='Loading'?'Preparando…':'Continuar'});made.push(...instance.findAll(()=>true).map(n=>n.id));previews.push({id:instance.id,kind,size,state,mode,mainId:comp.id});
   }
  }
 }
}
await label(review,'Disabled debe explicar su causa. Loading no es porcentaje ni confirmación. Las muestras de Hover y Pressed representan interacción, no ejecutan pagos.','Body/Small',1184);
await review.screenshot({scale:.7});
return {pageId:page.id,reviewId:review.id,createdNodeIds:[...new Set(made)],sets,checks,previews,bounds:{width:review.width,height:review.height},nativeTexts:review.findAllWithCriteria({types:['TEXT']}).length};
`;
await writeFile(join(lab,'03-editable/buttons.plugin.js'),code);
console.log('Receta de botones Figma lista; no publica ni integra en la app.');
