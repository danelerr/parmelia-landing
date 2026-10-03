import {readFile,writeFile} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const inventory=JSON.parse(await readFile(join(lab,'04-iconos/inventario.json'),'utf8'));
const icons=await Promise.all(inventory.icons.map(async i=>({...i,svg:(await readFile(join(lab,'04-iconos/svg',i.id+'.svg'),'utf8')).replace('<svg ','<svg width="24" height="24" ').replaceAll('currentColor','#0b0b0f')})));
const helper=await readFile('C:/Users/danie/.codex/plugins/cache/openai-curated-remote/figma/15.0.0/skills/figma-generate-library/scripts/bindVariablesToComponent.js','utf8');
const code=helper+`
const source=${JSON.stringify(icons)};
let page=figma.root.children.find(p=>p.name==='Icons');const made=[];
if(!page){page=figma.createPage();page.name='Icons';made.push(page.id)}
await figma.setCurrentPageAsync(page);
if(page.children.some(n=>n.name==='Icons / Review'))return {status:'already_exists',pageId:page.id};
const vars=await figma.variables.getLocalVariablesAsync(),styles=await figma.getLocalTextStylesAsync();
const V=Object.fromEntries(vars.map(v=>[v.name,v])),S=Object.fromEntries(styles.map(s=>[s.name,s]));
await Promise.all(styles.map(s=>figma.loadFontAsync(s.fontName)));
const paint=name=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',V[name]);
function track(n){made.push(n.id);return n}
function auto(parent,name,width,direction='VERTICAL',gap='spacing/md'){
 const f=track(figma.createAutoLayout(direction));f.name=name;f.resize(width,100);f.fills=[];
 f.setBoundVariable('itemSpacing',V[gap]);parent.appendChild(f);f.layoutSizingVertical='HUG';return f;
}
async function text(parent,value,role,width){const n=track(figma.createText());n.fontName=S[role].fontName;await n.setTextStyleIdAsync(S[role].id);n.name=value;n.resize(width,24);n.textAutoResize='HEIGHT';n.characters=value;n.fills=[paint('color/text/primary')];parent.appendChild(n);n.layoutSizingVertical='HUG';return n}
const review=auto(page,'Icons / Review',1280);review.x=100;review.y=100;review.fills=[paint('color/bg/primary')];
for(const k of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])review.setBoundVariable(k,V['spacing/xl']);
await text(review,'Pequeños caminos. Acciones claras.','Heading/1',1184);
await text(review,'32 componentes vectoriales propios. Las muestras son instancias de 16, 24, 32 y 48 px; no imágenes pegadas.','Body/Medium',1184);
const components={},bindings=[];
for(let i=0;i<source.length;i++){
 const item=source[i],comp=track(figma.createComponent());comp.name='Icon/'+item.id;comp.resize(24,24);comp.fills=[];comp.clipsContent=false;comp.description=item.label+' · '+item.category+'. Retícula 24 px, contorno cuadrado de 2 px. Usar con etiqueta accesible; no es un logo ni un QR escaneable.';
 page.appendChild(comp);comp.x=1500+(i%8)*80;comp.y=100+Math.floor(i/8)*80;
 const svg=track(figma.createNodeFromSvg(item.svg));svg.name='Vector editable';comp.appendChild(svg);
 for(const n of svg.findAll(()=>true)){made.push(n.id);if(n.type==='VECTOR'){
  if(n.strokes.length)await bindVariablesToComponent(n,{strokes:V['color/icon/primary'].id});
  if(n.fills.length)await bindVariablesToComponent(n,{fills:V['color/icon/primary'].id});
  bindings.push({id:n.id,strokes:n.strokes.map(p=>p.boundVariables?.color?.id),fills:n.fills.map(p=>p.boundVariables?.color?.id)});
 }}
 components[item.id]=comp.id;
}
for(let rowIndex=0;rowIndex<8;rowIndex++){
 const row=auto(review,'Fila '+(rowIndex+1),1184,'HORIZONTAL');
 for(const item of source.slice(rowIndex*4,rowIndex*4+4)){
  const card=auto(row,item.label,284);card.fills=[paint('color/bg/surface')];
  for(const k of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])card.setBoundVariable(k,V['spacing/md']);
  const stage=auto(card,'16 / 24 / 32 / 48',252,'HORIZONTAL');stage.counterAxisAlignItems='CENTER';stage.setBoundVariable('itemSpacing',V['spacing/md']);
  const comp=await figma.getNodeByIdAsync(components[item.id]);
  for(const size of [16,24,32,48]){const instance=track(comp.createInstance());instance.name=item.label+' / '+size;stage.appendChild(instance);instance.rescale(size/24);made.push(...instance.findAll(()=>true).map(n=>n.id))}
  await text(card,item.label,'Label/Action',252);await text(card,item.id+' · '+item.category,'Code/Metadata',252);
 }
}
await text(review,'Para acciones, preferir 24 px. El área táctil del control debe medir al menos 44 × 44 px. Los detalles finos necesitan revisión especial a 16 px.','Body/Small',1184);
await review.screenshot({scale:.65});
return {pageId:page.id,reviewId:review.id,createdNodeIds:[...new Set(made)],components,count:Object.keys(components).length,instances:review.findAllWithCriteria({types:['INSTANCE']}).length,bindings,bounds:{width:review.width,height:review.height}};
`;
await writeFile(join(lab,'03-editable/icons.plugin.js'),code);
console.log('Receta de iconos Figma lista; no ejecuta ni publica automáticamente.');
