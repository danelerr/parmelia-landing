import {readFile,writeFile} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const source=JSON.parse(await readFile(join(lab,'03-editable/tokens-source.json'),'utf8'));
const symbol=await readFile(join(lab,'assets/simbolo.svg'),'utf8');
let helper=await readFile('C:/Users/danie/.codex/plugins/cache/openai-curated-remote/figma/15.0.0/skills/figma-generate-library/scripts/createDocumentationPage.js','utf8');
// Adaptación explícita del helper oficial a Recursive y correcciones de auto-layout.
helper=helper.replaceAll("'Inter'","'Recursive'").replaceAll("'Bold'","'Sans Linear Bold'").replaceAll("'Regular'","'Sans Linear'").replaceAll("'Medium'","'Sans Linear Medium'").replace('root.resize(1440, 1)','root.resize(1440, 900)\n  root.primaryAxisSizingMode = \'AUTO\'').replace('root.x = 0','root.x = 100');
const utilities=`
const source=${JSON.stringify(source)};
const styles=await figma.getLocalTextStylesAsync(),vars=await figma.variables.getLocalVariablesAsync(),collections=await figma.variables.getLocalVariableCollectionsAsync();
await Promise.all([...source.styles.map(s=>figma.loadFontAsync(s.font)),figma.loadFontAsync({family:'Recursive',style:'Sans Linear Medium'})]);
const styleMap=Object.fromEntries(styles.map(s=>[s.name,s])),varMap=Object.fromEntries(vars.map(v=>[v.name,v]));
const color=collections.find(c=>c.name==='Color');
function paint(name){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',varMap[name])}
async function label(parent,value,style='Body/Medium',width=1280){const t=figma.createText();t.name=value;t.fontName=styleMap[style].fontName;await t.setTextStyleIdAsync(styleMap[style].id);t.resize(width,24);t.textAutoResize='HEIGHT';t.characters=value;t.fills=[paint('color/text/primary')];parent.appendChild(t);t.layoutSizingVertical='HUG';return t}
function stack(parent,name,direction='VERTICAL',width=1280,gap=16){const f=figma.createAutoLayout(direction);f.name=name;f.fills=[];f.resize(width,100);f.setBoundVariable('itemSpacing',varMap['spacing/'+(gap===80?'section':gap===24?'lg':'md')]);parent.appendChild(f);f.layoutSizingHorizontal='FIXED';f.layoutSizingVertical='HUG';return f}
function allIds(node){return [node.id,...('children' in node?node.findAll(()=>true).map(n=>n.id):[])]}
`;
const foundations=helper+'\n'+utilities+`
const old=figma.root.children.find(p=>p.name==='Foundations');
if(old){await figma.setCurrentPageAsync(old);return {pageId:old.id,status:'already_exists',nodes:old.children.map(n=>({id:n.id,name:n.name}))}}
async function swatches(section,tokens,mode,labelText){await label(section,labelText,'Heading/2');for(let start=0;start<tokens.length;start+=8){const row=stack(section,'Swatches/'+mode+'/'+start,'HORIZONTAL');for(const token of tokens.slice(start,start+8)){const card=stack(row,token.name,'VERTICAL',144);card.setExplicitVariableModeForCollection(color,color.modes.find(m=>m.name===mode).modeId);const box=figma.createRectangle();box.name='Color';box.resize(144,72);box.fills=[paint(token.name)];card.appendChild(box);await label(card,token.name,'Code/Metadata',144);await label(card,token.css,'Code/Metadata',144);}}}
const doc=await createDocumentationPage('Foundations',{title:'Una misma marca. Muchas situaciones.',description:'Fundamentos editables del laboratorio: no modifican ni sustituyen el kit vigente.',sections:[
{name:'Primitivos',contentFn:async section=>{await swatches(section,source.primitives,'Light','La paleta de origen');}},
{name:'Semánticos',contentFn:async section=>{await swatches(section,source.semantic,'Light','Light / superficies claras');await swatches(section,source.semantic,'Dark','Dark / superficies oscuras');}},
{name:'Recursive',contentFn:async section=>{for(const definition of source.styles){const row=stack(section,definition.name);await label(row,definition.name+' / '+definition.size+' px · '+definition.line+' px','Code/Metadata');await label(row,definition.name==='Code/Metadata'?'GP-DEMO-1042 / 125,25 USDC':'Tus dólares ya saben moverse.',definition.name);}}},
{name:'Espacio y bordes',contentFn:async section=>{await label(section,'Esquinas rectas para acciones; las curvas de la paleta de origen quedan disponibles, sin aplicarse automáticamente.');for(const metric of source.metrics){const row=stack(section,metric.name,'HORIZONTAL',1280);const block=figma.createRectangle();block.resize(Math.max(metric.value,2),24);block.fills=[paint('color/bg/action')];if(metric.name.startsWith('spacing/'))block.setBoundVariable('width',varMap[metric.name]);row.appendChild(block);await label(row,metric.name+' = '+metric.value+' px · '+metric.css,'Code/Metadata',1120);}}},
{name:'Sombras sin desenfoque',contentFn:async section=>{const row=stack(section,'Shadows','HORIZONTAL',1280,24);const effects=await figma.getLocalEffectStylesAsync();for(const effect of effects){const card=stack(row,effect.name,'VERTICAL',320);card.paddingTop=24;card.paddingBottom=24;card.paddingLeft=24;card.paddingRight=24;for(const field of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])card.setBoundVariable(field,varMap['spacing/lg']);card.fills=[paint('color/bg/surface')];await card.setEffectStyleIdAsync(effect.id);await label(card,effect.name,'Label/Action',272);await label(card,'Desplazamiento cuadrado. Sin blur.','Body/Small',272);}}}
]});
const root=await figma.getNodeByIdAsync(doc.frameIds[0]);root.fills=[paint('color/bg/primary')];root.setBoundVariable('itemSpacing',varMap['spacing/section']);for(const field of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])root.setBoundVariable(field,varMap['spacing/section']);
// El helper conserva sus títulos; asignar estilos compartidos y anchos de reflujo.
const defaults=root.findAllWithCriteria({types:['TEXT']}).filter(t=>t.textStyleId==='');
await Promise.all(defaults.map(async t=>{const role=t===doc.titleNode?'Heading/1':t.fontSize===24?'Heading/2':'Body/Medium';await t.setTextStyleIdAsync(styleMap[role].id);t.resize(1280,24);t.textAutoResize='HEIGHT';t.layoutSizingVertical='HUG';t.fills=[paint('color/text/primary')]}));
root.clipsContent=false;
for(const sectionId of doc.frameIds){const section=await figma.getNodeByIdAsync(sectionId);section.fills=[paint('color/bg/primary')];section.clipsContent=false;}
for(const card of root.findAllWithCriteria({types:['FRAME']}).filter(n=>n.children.some(c=>c.type==='RECTANGLE'&&c.name==='Color'))){card.fills=[paint('color/bg/primary')];const box=card.children.find(c=>c.type==='RECTANGLE'&&c.name==='Color');box.strokes=[paint('color/border/subtle')];box.strokeWeight=1;}
return {pageId:doc.page.id,rootId:root.id,createdNodeIds:[doc.page.id,...allIds(root)],nativeTexts:root.findAllWithCriteria({types:['TEXT']}).length,bounds:{width:root.width,height:root.height},sections:doc.frameIds,stylesApplied:defaults.length};`;
await writeFile(join(lab,'03-editable/foundations-doc.plugin.js'),foundations);
const cover=utilities+`
const page=await figma.getNodeByIdAsync('0:1');await figma.setCurrentPageAsync(page);
if(page.children.some(n=>n.name==='Cover'))return {status:'already_exists',pageId:page.id};
page.name='Cover';const frame=figma.createAutoLayout('VERTICAL');frame.name='Cover';frame.resize(1440,900);frame.x=100;frame.y=100;frame.primaryAxisAlignItems='CENTER';frame.counterAxisAlignItems='MIN';frame.paddingLeft=120;frame.paddingRight=120;frame.paddingTop=80;frame.paddingBottom=80;frame.setBoundVariable('itemSpacing',varMap['spacing/xl']);frame.fills=[paint('color/bg/primary')];frame.setExplicitVariableModeForCollection(color,color.modes.find(m=>m.name==='Dark').modeId);page.appendChild(frame);
const brand=stack(frame,'Brand','HORIZONTAL',1200);brand.counterAxisAlignItems='CENTER';const symbol=figma.createNodeFromSvg(${JSON.stringify(symbol)});symbol.name='Símbolo estable';symbol.resize(48,40);brand.appendChild(symbol);await label(brand,'GatoPago','Heading/2',400);
await label(frame,'GatoPago,\\nen movimiento.','Display/Hero',1200);
await label(frame,'Tus dólares ya saben moverse.','Heading/2',1200);
const rail=stack(frame,'Pixel Rail','HORIZONTAL',640);rail.setBoundVariable('itemSpacing',varMap['spacing/sm']);for(let i=0;i<12;i++){const block=figma.createRectangle();block.name='Segmento '+(i+1);block.resize(42,6);block.fills=[paint(i===4?'color/bg/action':'color/icon/primary')];rail.appendChild(block)}
await label(frame,'LABORATORIO / 0.1.0 / PROPUESTAS','Code/Metadata',1200);
await label(frame,'Fuentes nativas · Variables y componentes · Sin publicación ni integración en la app','Body/Small',1200);
return {pageId:page.id,rootId:frame.id,mutatedNodeIds:[page.id],createdNodeIds:allIds(frame),bounds:{width:frame.width,height:frame.height},nativeTexts:frame.findAllWithCriteria({types:['TEXT']}).length};`;
await writeFile(join(lab,'03-editable/cover.plugin.js'),cover);
console.log('Scripts Figma: portada y fundamentos. No se ejecuta ni publica automáticamente.');
