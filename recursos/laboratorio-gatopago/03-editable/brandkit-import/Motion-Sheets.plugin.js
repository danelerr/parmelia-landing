/**
 * createDocumentationPage
 *
 * Creates a new Figma page with a standardized documentation layout: a page
 * title, optional description, and an ordered list of sections each built by
 * a caller-supplied `contentFn`. The content function receives the section
 * frame and may append any nodes to it.
 *
 * This function is used for standalone documentation pages (e.g. a Foundations
 * page, a Getting Started page, or a component page with documentation).
 * It does not handle component sets — those live on separate pages created by
 * createComponentWithVariants.
 *
 * @param {string} pageName - The Figma page name (e.g. "Foundations", "Getting Started").
 * @param {{
 *   title: string,
 *   description?: string,
 *   sections: Array<{
 *     name: string,
 *     contentFn: (sectionFrame: FrameNode) => Promise<void>
 *   }>
 * }} config
 *   - `title`: Large heading displayed at the top of the page.
 *   - `description`: Optional subtitle displayed below the heading.
 *   - `sections`: Ordered list of sections. Each section gets its own frame
 *     with a heading and is passed to `contentFn` for population.
 * @returns {Promise<{
 *   page: PageNode,
 *   titleNode: TextNode,
 *   frameIds: string[]
 * }>}
 *   `frameIds` is an ordered list of IDs for the root frame and each section frame.
 */
async function createDocumentationPage(pageName, config) {
  // Verify required fonts are available before loading
  const allFonts = await figma.listAvailableFontsAsync()
  const requiredStyles = ['Sans Linear Bold', 'Sans Linear', 'Sans Linear Medium']
  for (const style of requiredStyles) {
    const found = allFonts.some((f) => f.fontName.family === 'Recursive' && f.fontName.style === style)
    if (!found) {
      const interFonts = allFonts.filter((f) => f.fontName.family === 'Recursive')
      throw new Error(
        `Font "Inter ${style}" not available. Available Inter styles: ${interFonts.map((f) => f.fontName.style).join(', ') || 'none'}`,
      )
    }
  }
  await Promise.all([
    figma.loadFontAsync({ family: 'Recursive', style: 'Sans Linear Bold' }),
    figma.loadFontAsync({ family: 'Recursive', style: 'Sans Linear' }),
    figma.loadFontAsync({ family: 'Recursive', style: 'Sans Linear Medium' }),
  ])

  // Create and activate the page
  const page = figma.createPage()
  page.name = pageName
  await figma.setCurrentPageAsync(page)

  const frameIds = []

  // Root scroll container — 1440px wide, auto-height
  const root = figma.createAutoLayout('VERTICAL')
  root.name = pageName
  root.primaryAxisAlignItems = 'MIN'
  root.counterAxisAlignItems = 'MIN'
  root.itemSpacing = 80
  root.paddingTop = 80
  root.paddingBottom = 120
  root.paddingLeft = 80
  root.paddingRight = 80
  root.resize(1440, 900)
  root.primaryAxisSizingMode = 'AUTO'
  root.layoutSizingHorizontal = 'FIXED'
  root.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
  root.x = 100
  root.y = 0
  page.appendChild(root)

  frameIds.push(root.id)

  // Page header: title + optional description
  const header = figma.createAutoLayout('VERTICAL')
  header.name = 'Header'
  header.itemSpacing = 12
  header.fills = []
  root.appendChild(header)
  header.layoutSizingHorizontal = 'FILL'

  const titleNode = figma.createText()
  titleNode.fontName = { family: 'Recursive', style: 'Sans Linear Bold' }
  titleNode.characters = config.title
  titleNode.fontSize = 40
  titleNode.fills = [{ type: 'SOLID', color: { r: 0.07, g: 0.07, b: 0.07 } }]
  header.appendChild(titleNode)
  titleNode.layoutSizingHorizontal = 'FILL'

  if (config.description) {
    const descNode = figma.createText()
    descNode.fontName = { family: 'Recursive', style: 'Sans Linear' }
    descNode.characters = config.description
    descNode.fontSize = 16
    descNode.lineHeight = { value: 24, unit: 'PIXELS' }
    descNode.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.4 } }]
    header.appendChild(descNode)
    descNode.layoutSizingHorizontal = 'FILL'
  }

  // Sections
  for (const section of config.sections) {
    const sectionFrame = figma.createAutoLayout('VERTICAL')
    sectionFrame.name = `Section/${section.name}`
    sectionFrame.itemSpacing = 20
    sectionFrame.fills = []
    root.appendChild(sectionFrame)
    sectionFrame.layoutSizingHorizontal = 'FILL'

    // Section heading
    const sectionHeading = figma.createText()
    sectionHeading.fontName = { family: 'Recursive', style: 'Sans Linear Bold' }
    sectionHeading.characters = section.name
    sectionHeading.fontSize = 24
    sectionHeading.fills = [{ type: 'SOLID', color: { r: 0.07, g: 0.07, b: 0.07 } }]
    sectionFrame.appendChild(sectionHeading)
    sectionHeading.layoutSizingHorizontal = 'FILL'

    // Invoke the caller's content function to populate the section
    await section.contentFn(sectionFrame)

    frameIds.push(sectionFrame.id)
  }

  return { page, titleNode, frameIds }
}

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

const pageName="Motion Sheets",assets=[{"path":"brandkit/03-personaje/hd/hojas/parpadeo.png","page":"Motion Sheets","name":"Parpadeo","note":"3 poses únicas · 8 pasos · 3035 ms · loop · revisión artística pendiente.","component":false,"width":2412,"height":744,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/oreja.png","page":"Motion Sheets","name":"Oreja","note":"4 poses únicas · 8 pasos · 2800 ms · loop · revisión artística pendiente.","component":false,"width":2472,"height":552,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/mirar.png","page":"Motion Sheets","name":"Mirar alrededor","note":"6 poses únicas · 6 pasos · 2770 ms · loop · revisión artística pendiente.","component":false,"width":2316,"height":1068,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/reposo.png","page":"Motion Sheets","name":"Reposo sentado","note":"7 poses únicas · 11 pasos · 5050 ms · loop · revisión artística pendiente.","component":false,"width":2352,"height":1446,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/cola.png","page":"Motion Sheets","name":"Cola","note":"8 poses únicas · 8 pasos · 1690 ms · loop · revisión artística pendiente.","component":false,"width":2352,"height":1158,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/siesta.png","page":"Motion Sheets","name":"Siesta","note":"7 poses únicas · 11 pasos · 5920 ms · loop · revisión artística pendiente.","component":false,"width":2340,"height":1158,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/asomarse.png","page":"Motion Sheets","name":"Asomarse","note":"8 poses únicas · 8 pasos · 3980 ms · once · revisión artística pendiente.","component":false,"width":2076,"height":1062,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/meti-la-pata.png","page":"Motion Sheets","name":"Metí la pata","note":"6 poses únicas · 6 pasos · 3080 ms · once · revisión artística pendiente.","component":false,"width":2256,"height":1218,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/salto.png","page":"Motion Sheets","name":"Salto feliz","note":"8 poses únicas · 8 pasos · 2210 ms · once · revisión artística pendiente.","component":false,"width":2292,"height":1368,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/caminata.png","page":"Motion Sheets","name":"Caminata","note":"6 poses únicas · 6 pasos · 660 ms · loop · revisión artística pendiente.","component":false,"width":2412,"height":1164,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/preparando-pago.png","page":"Motion Sheets","name":"Preparando el pago","note":"8 poses únicas · 8 pasos · 1960 ms · loop · revisión artística pendiente.","component":false,"width":2652,"height":1062,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/comprobante.png","page":"Motion Sheets","name":"Comprobante","note":"8 poses únicas · 8 pasos · 3200 ms · once · revisión artística pendiente.","component":false,"width":2304,"height":1206,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/reparar-rail.png","page":"Motion Sheets","name":"Reparar el rail","note":"9 poses únicas · 9 pasos · 3410 ms · once · revisión artística pendiente.","component":false,"width":2172,"height":1647,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/intercambio.png","page":"Motion Sheets","name":"Intercambio","note":"9 poses únicas · 9 pasos · 3250 ms · once · revisión artística pendiente.","component":false,"width":2484,"height":1476,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/creciendo.png","page":"Motion Sheets","name":"Creciendo","note":"10 poses únicas · 10 pasos · 3720 ms · once · revisión artística pendiente.","component":false,"width":2436,"height":1386,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/tarjeta.png","page":"Motion Sheets","name":"Pago con tarjeta","note":"8 poses únicas · 8 pasos · 3650 ms · once · revisión artística pendiente.","component":false,"width":2712,"height":1062,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/linterna.png","page":"Motion Sheets","name":"Linterna","note":"8 poses únicas · 8 pasos · 3200 ms · loop · revisión artística pendiente.","component":false,"width":3024,"height":1140,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/saludo.png","page":"Motion Sheets","name":"Saludo","note":"6 poses únicas · 8 pasos · 2200 ms · loop · revisión artística pendiente.","component":false,"width":2376,"height":1422,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/mantenimiento.png","page":"Motion Sheets","name":"Mantenimiento","note":"10 poses únicas · 10 pasos · 3400 ms · loop · revisión artística pendiente.","component":false,"width":2220,"height":1656,"kind":"png"},{"path":"brandkit/03-personaje/hd/hojas/seguridad.png","page":"Motion Sheets","name":"Seguridad","note":"8 poses únicas · 8 pasos · 3400 ms · once · revisión artística pendiente.","component":false,"width":2568,"height":1416,"kind":"png"}];
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
if(a.component){const comp=track(figma.createComponent());comp.name=(pageName==='Motion Frames'?'_Frames/':pageName==='Character'?'Character/':'Asset/')+a.name;comp.resize(w,h);comp.fills=[];comp.description=a.note+'\nSource: '+a.path;doc.page.appendChild(comp);comp.x=1600+(mapped.length%6)*440;comp.y=100+Math.floor(mapped.length/6)*380;target=track(figma.createRectangle());target.name='RGBA / '+a.path;target.resize(w,h);target.fills=[];comp.appendChild(target);const inst=track(comp.createInstance());stage.appendChild(inst);inst.x=(378-w)/2;inst.y=(300-h)/2;mapped.push({...a,targetId:target.id,componentId:comp.id,stageId:stage.id,cardId:card.id});}
else{target=track(figma.createRectangle());target.name='Source / '+a.path;target.resize(w,h);target.fills=[];stage.appendChild(target);target.x=(378-w)/2;target.y=(300-h)/2;mapped.push({...a,targetId:target.id,stageId:stage.id,cardId:card.id});}
}else mapped.push({...a,stageId:stage.id,cardId:card.id});
await text(card,a.name,378,'Heading/2');await text(card,a.note,378,'Body/Small');await text(card,a.path,378,'Code/Metadata');}}
for(const t of root.findAllWithCriteria({types:['TEXT']}).filter(t=>t.textStyleId==='')){await figma.loadFontAsync(t.fontName);const role=t===doc.titleNode?'Heading/1':'Body/Medium';await t.setTextStyleIdAsync(styles[role].id);t.textAutoResize='HEIGHT';t.resize(1280,24);t.fills=[paint('color/text/primary')];}
return {pageId:doc.page.id,rootId:root.id,createdNodeIds:[doc.page.id,...childrenIds(root),...ids],assets:mapped,bounds:{width:root.width,height:root.height}};