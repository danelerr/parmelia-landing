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

const existing=figma.root.children.find(p=>p.name==='Motion');if(existing)return {status:'already_exists',pageId:existing.id,roots:existing.children.map(n=>({id:n.id,name:n.name}))};
const doc=await createDocumentationPage('Motion',{title:'Movimiento sin reinterpretar al gato.',description:'20 secuencias · 147 fotogramas fuente · Tiempos originales · Pistas OPACITY con HOLD, sin morph ni deformaciones.',sections:[]});
const root=await figma.getNodeByIdAsync(doc.frameIds[0]);root.fills=[paint('color/bg/primary')];root.setExplicitVariableModeForCollection(col,col.modes.find(m=>m.name==='Light').modeId);root.clipsContent=false;
await text(root,'Selecciona una tarjeta Animation y reproduce su timeline. Cada secuencia conserva los pasos y milisegundos del manifiesto. La repetición en producto depende de playback; las celebraciones no se reproducen indefinidamente. Todas las secuencias del personaje siguen pendientes de aprobación artística.');
const animations=[{"id":"parpadeo","name":"Parpadeo","purpose":"Señal de vida en reposo, sin distraer","playback":"loop","canvas":{"width":201,"height":186},"frames":3,"totalMs":3035,"preview":"parpadeo.webp","sequence":[{"frame":"fotogramas/parpadeo/01.png","ms":2400},{"frame":"fotogramas/parpadeo/02.png","ms":55},{"frame":"fotogramas/parpadeo/03.png","ms":100},{"frame":"fotogramas/parpadeo/02.png","ms":55},{"frame":"fotogramas/parpadeo/01.png","ms":220},{"frame":"fotogramas/parpadeo/02.png","ms":55},{"frame":"fotogramas/parpadeo/03.png","ms":90},{"frame":"fotogramas/parpadeo/02.png","ms":60}],"sources":[{"frame":"fotogramas/parpadeo/01.png","componentId":"25:422"},{"frame":"fotogramas/parpadeo/02.png","componentId":"25:431"},{"frame":"fotogramas/parpadeo/03.png","componentId":"25:440"}]},{"id":"oreja","name":"Oreja","purpose":"Reacción mínima a un aviso","playback":"loop","canvas":{"width":206,"height":184},"frames":4,"totalMs":2800,"preview":"oreja.webp","sequence":[{"frame":"fotogramas/oreja/01.png","ms":1600},{"frame":"fotogramas/oreja/02.png","ms":70},{"frame":"fotogramas/oreja/03.png","ms":140},{"frame":"fotogramas/oreja/02.png","ms":70},{"frame":"fotogramas/oreja/01.png","ms":260},{"frame":"fotogramas/oreja/02.png","ms":60},{"frame":"fotogramas/oreja/03.png","ms":100},{"frame":"fotogramas/oreja/04.png","ms":500}],"sources":[{"frame":"fotogramas/oreja/01.png","componentId":"25:450"},{"frame":"fotogramas/oreja/02.png","componentId":"25:459"},{"frame":"fotogramas/oreja/03.png","componentId":"25:468"},{"frame":"fotogramas/oreja/04.png","componentId":"25:478"}]},{"id":"mirar","name":"Mirar alrededor","purpose":"Invita a explorar","playback":"loop","canvas":{"width":193,"height":178},"frames":6,"totalMs":2770,"preview":"mirar.webp","sequence":[{"frame":"fotogramas/mirar/01.png","ms":900},{"frame":"fotogramas/mirar/02.png","ms":90},{"frame":"fotogramas/mirar/03.png","ms":700},{"frame":"fotogramas/mirar/04.png","ms":90},{"frame":"fotogramas/mirar/05.png","ms":900},{"frame":"fotogramas/mirar/06.png","ms":90}],"sources":[{"frame":"fotogramas/mirar/01.png","componentId":"25:487"},{"frame":"fotogramas/mirar/02.png","componentId":"25:496"},{"frame":"fotogramas/mirar/03.png","componentId":"25:506"},{"frame":"fotogramas/mirar/04.png","componentId":"25:515"},{"frame":"fotogramas/mirar/05.png","componentId":"25:524"},{"frame":"fotogramas/mirar/06.png","componentId":"25:534"}]},{"id":"reposo","name":"Reposo sentado","purpose":"Bienvenida y estados vacíos","playback":"loop","canvas":{"width":196,"height":241},"frames":7,"totalMs":5050,"preview":"reposo.webp","sequence":[{"frame":"fotogramas/reposo/01.png","ms":1000},{"frame":"fotogramas/reposo/02.png","ms":120},{"frame":"fotogramas/reposo/03.png","ms":800},{"frame":"fotogramas/reposo/02.png","ms":120},{"frame":"fotogramas/reposo/01.png","ms":600},{"frame":"fotogramas/reposo/04.png","ms":90},{"frame":"fotogramas/reposo/01.png","ms":500},{"frame":"fotogramas/reposo/05.png","ms":160},{"frame":"fotogramas/reposo/06.png","ms":160},{"frame":"fotogramas/reposo/01.png","ms":600},{"frame":"fotogramas/reposo/07.png","ms":900}],"sources":[{"frame":"fotogramas/reposo/01.png","componentId":"25:543"},{"frame":"fotogramas/reposo/02.png","componentId":"25:552"},{"frame":"fotogramas/reposo/03.png","componentId":"25:562"},{"frame":"fotogramas/reposo/04.png","componentId":"25:571"},{"frame":"fotogramas/reposo/05.png","componentId":"25:580"},{"frame":"fotogramas/reposo/06.png","componentId":"25:590"},{"frame":"fotogramas/reposo/07.png","componentId":"25:599"}]},{"id":"cola","name":"Cola","purpose":"Espera amable, con más presencia que el reposo","playback":"loop","canvas":{"width":196,"height":193},"frames":8,"totalMs":1690,"preview":"cola.webp","sequence":[{"frame":"fotogramas/cola/01.png","ms":500},{"frame":"fotogramas/cola/02.png","ms":100},{"frame":"fotogramas/cola/03.png","ms":100},{"frame":"fotogramas/cola/04.png","ms":120},{"frame":"fotogramas/cola/05.png","ms":260},{"frame":"fotogramas/cola/06.png","ms":110},{"frame":"fotogramas/cola/07.png","ms":100},{"frame":"fotogramas/cola/08.png","ms":400}],"sources":[{"frame":"fotogramas/cola/01.png","componentId":"25:608"},{"frame":"fotogramas/cola/02.png","componentId":"25:618"},{"frame":"fotogramas/cola/03.png","componentId":"25:627"},{"frame":"fotogramas/cola/04.png","componentId":"25:636"},{"frame":"fotogramas/cola/05.png","componentId":"25:646"},{"frame":"fotogramas/cola/06.png","componentId":"25:655"},{"frame":"fotogramas/cola/07.png","componentId":"25:664"},{"frame":"fotogramas/cola/08.png","componentId":"25:674"}]},{"id":"siesta","name":"Siesta","purpose":"Inactividad o espera larga sin operación en curso","playback":"loop","canvas":{"width":195,"height":193},"frames":7,"totalMs":5920,"preview":"siesta.webp","sequence":[{"frame":"fotogramas/siesta/01.png","ms":600},{"frame":"fotogramas/siesta/02.png","ms":600},{"frame":"fotogramas/siesta/03.png","ms":600},{"frame":"fotogramas/siesta/02.png","ms":600},{"frame":"fotogramas/siesta/01.png","ms":600},{"frame":"fotogramas/siesta/04.png","ms":450},{"frame":"fotogramas/siesta/05.png","ms":600},{"frame":"fotogramas/siesta/06.png","ms":450},{"frame":"fotogramas/siesta/01.png","ms":600},{"frame":"fotogramas/siesta/07.png","ms":220},{"frame":"fotogramas/siesta/01.png","ms":600}],"sources":[{"frame":"fotogramas/siesta/01.png","componentId":"25:683"},{"frame":"fotogramas/siesta/02.png","componentId":"25:692"},{"frame":"fotogramas/siesta/03.png","componentId":"25:702"},{"frame":"fotogramas/siesta/04.png","componentId":"25:711"},{"frame":"fotogramas/siesta/05.png","componentId":"25:720"},{"frame":"fotogramas/siesta/06.png","componentId":"25:730"},{"frame":"fotogramas/siesta/07.png","componentId":"25:739"}]},{"id":"asomarse","name":"Asomarse","purpose":"Descubrimiento: algo nuevo por ver","playback":"once","canvas":{"width":173,"height":177},"frames":8,"totalMs":3980,"preview":"asomarse.webp","sequence":[{"frame":"fotogramas/asomarse/01.png","ms":700},{"frame":"fotogramas/asomarse/02.png","ms":160},{"frame":"fotogramas/asomarse/03.png","ms":160},{"frame":"fotogramas/asomarse/04.png","ms":260},{"frame":"fotogramas/asomarse/05.png","ms":380},{"frame":"fotogramas/asomarse/06.png","ms":420},{"frame":"fotogramas/asomarse/07.png","ms":700},{"frame":"fotogramas/asomarse/08.png","ms":1200}],"sources":[{"frame":"fotogramas/asomarse/01.png","componentId":"25:748"},{"frame":"fotogramas/asomarse/02.png","componentId":"25:758"},{"frame":"fotogramas/asomarse/03.png","componentId":"25:767"},{"frame":"fotogramas/asomarse/04.png","componentId":"25:776"},{"frame":"fotogramas/asomarse/05.png","componentId":"25:786"},{"frame":"fotogramas/asomarse/06.png","componentId":"25:795"},{"frame":"fotogramas/asomarse/07.png","componentId":"25:804"},{"frame":"fotogramas/asomarse/08.png","componentId":"25:814"}]},{"id":"meti-la-pata","name":"Metí la pata","purpose":"Error recuperable, con tono amable","playback":"once","canvas":{"width":188,"height":203},"frames":6,"totalMs":3080,"preview":"meti-la-pata.webp","sequence":[{"frame":"fotogramas/meti-la-pata/01.png","ms":600},{"frame":"fotogramas/meti-la-pata/02.png","ms":160},{"frame":"fotogramas/meti-la-pata/03.png","ms":500},{"frame":"fotogramas/meti-la-pata/04.png","ms":160},{"frame":"fotogramas/meti-la-pata/05.png","ms":260},{"frame":"fotogramas/meti-la-pata/06.png","ms":1400}],"sources":[{"frame":"fotogramas/meti-la-pata/01.png","componentId":"25:823"},{"frame":"fotogramas/meti-la-pata/02.png","componentId":"25:832"},{"frame":"fotogramas/meti-la-pata/03.png","componentId":"25:842"},{"frame":"fotogramas/meti-la-pata/04.png","componentId":"25:851"},{"frame":"fotogramas/meti-la-pata/05.png","componentId":"25:860"},{"frame":"fotogramas/meti-la-pata/06.png","componentId":"25:870"}]},{"id":"salto","name":"Salto feliz","purpose":"Éxito confirmado; una vez y breve","playback":"once","canvas":{"width":191,"height":228},"frames":8,"totalMs":2210,"preview":"salto.webp","sequence":[{"frame":"fotogramas/salto/01.png","ms":400},{"frame":"fotogramas/salto/02.png","ms":220},{"frame":"fotogramas/salto/03.png","ms":70},{"frame":"fotogramas/salto/04.png","ms":80},{"frame":"fotogramas/salto/05.png","ms":200},{"frame":"fotogramas/salto/06.png","ms":80},{"frame":"fotogramas/salto/07.png","ms":160},{"frame":"fotogramas/salto/08.png","ms":1000}],"sources":[{"frame":"fotogramas/salto/01.png","componentId":"25:879"},{"frame":"fotogramas/salto/02.png","componentId":"25:888"},{"frame":"fotogramas/salto/03.png","componentId":"25:898"},{"frame":"fotogramas/salto/04.png","componentId":"25:907"},{"frame":"fotogramas/salto/05.png","componentId":"25:916"},{"frame":"fotogramas/salto/06.png","componentId":"25:926"},{"frame":"fotogramas/salto/07.png","componentId":"25:935"},{"frame":"fotogramas/salto/08.png","componentId":"25:944"}]},{"id":"caminata","name":"Caminata","purpose":"Envío en curso; no indica llegada","playback":"loop","canvas":{"width":201,"height":194},"frames":6,"totalMs":660,"preview":"caminata.webp","sequence":[{"frame":"fotogramas/caminata/01.png","ms":110},{"frame":"fotogramas/caminata/02.png","ms":110},{"frame":"fotogramas/caminata/03.png","ms":110},{"frame":"fotogramas/caminata/04.png","ms":110},{"frame":"fotogramas/caminata/05.png","ms":110},{"frame":"fotogramas/caminata/06.png","ms":110}],"sources":[{"frame":"fotogramas/caminata/01.png","componentId":"25:954"},{"frame":"fotogramas/caminata/02.png","componentId":"25:963"},{"frame":"fotogramas/caminata/03.png","componentId":"25:972"},{"frame":"fotogramas/caminata/04.png","componentId":"25:982"},{"frame":"fotogramas/caminata/05.png","componentId":"25:991"},{"frame":"fotogramas/caminata/06.png","componentId":"25:1000"}]},{"id":"preparando-pago","name":"Preparando el pago","purpose":"Procesamiento de una operación","playback":"loop","canvas":{"width":221,"height":177},"frames":8,"totalMs":1960,"preview":"preparando-pago.webp","sequence":[{"frame":"fotogramas/preparando-pago/01.png","ms":300},{"frame":"fotogramas/preparando-pago/02.png","ms":120},{"frame":"fotogramas/preparando-pago/03.png","ms":120},{"frame":"fotogramas/preparando-pago/04.png","ms":120},{"frame":"fotogramas/preparando-pago/05.png","ms":120},{"frame":"fotogramas/preparando-pago/06.png","ms":120},{"frame":"fotogramas/preparando-pago/07.png","ms":260},{"frame":"fotogramas/preparando-pago/08.png","ms":800}],"sources":[{"frame":"fotogramas/preparando-pago/01.png","componentId":"25:1010"},{"frame":"fotogramas/preparando-pago/02.png","componentId":"25:1019"},{"frame":"fotogramas/preparando-pago/03.png","componentId":"25:1028"},{"frame":"fotogramas/preparando-pago/04.png","componentId":"25:1038"},{"frame":"fotogramas/preparando-pago/05.png","componentId":"25:1047"},{"frame":"fotogramas/preparando-pago/06.png","componentId":"25:1056"},{"frame":"fotogramas/preparando-pago/07.png","componentId":"25:1066"},{"frame":"fotogramas/preparando-pago/08.png","componentId":"25:1075"}]},{"id":"comprobante","name":"Comprobante","purpose":"Comprobante emitido tras un estado confirmado","playback":"once","canvas":{"width":192,"height":201},"frames":8,"totalMs":3200,"preview":"comprobante.webp","sequence":[{"frame":"fotogramas/comprobante/01.png","ms":500},{"frame":"fotogramas/comprobante/02.png","ms":200},{"frame":"fotogramas/comprobante/03.png","ms":120},{"frame":"fotogramas/comprobante/04.png","ms":180},{"frame":"fotogramas/comprobante/05.png","ms":300},{"frame":"fotogramas/comprobante/06.png","ms":200},{"frame":"fotogramas/comprobante/07.png","ms":500},{"frame":"fotogramas/comprobante/08.png","ms":1200}],"sources":[{"frame":"fotogramas/comprobante/01.png","componentId":"25:1084"},{"frame":"fotogramas/comprobante/02.png","componentId":"25:1094"},{"frame":"fotogramas/comprobante/03.png","componentId":"25:1103"},{"frame":"fotogramas/comprobante/04.png","componentId":"25:1112"},{"frame":"fotogramas/comprobante/05.png","componentId":"25:1122"},{"frame":"fotogramas/comprobante/06.png","componentId":"25:1131"},{"frame":"fotogramas/comprobante/07.png","componentId":"25:1140"},{"frame":"fotogramas/comprobante/08.png","componentId":"25:1150"}]},{"id":"reparar-rail","name":"Reparar el rail","purpose":"Recuperación de un error del recorrido","playback":"once","canvas":{"width":181,"height":183},"frames":9,"totalMs":3410,"preview":"reparar-rail.webp","sequence":[{"frame":"fotogramas/reparar-rail/01.png","ms":500},{"frame":"fotogramas/reparar-rail/02.png","ms":450},{"frame":"fotogramas/reparar-rail/03.png","ms":200},{"frame":"fotogramas/reparar-rail/04.png","ms":180},{"frame":"fotogramas/reparar-rail/05.png","ms":220},{"frame":"fotogramas/reparar-rail/06.png","ms":180},{"frame":"fotogramas/reparar-rail/07.png","ms":220},{"frame":"fotogramas/reparar-rail/08.png","ms":260},{"frame":"fotogramas/reparar-rail/09.png","ms":1200}],"sources":[{"frame":"fotogramas/reparar-rail/01.png","componentId":"25:1159"},{"frame":"fotogramas/reparar-rail/02.png","componentId":"25:1168"},{"frame":"fotogramas/reparar-rail/03.png","componentId":"25:1178"},{"frame":"fotogramas/reparar-rail/04.png","componentId":"25:1187"},{"frame":"fotogramas/reparar-rail/05.png","componentId":"25:1196"},{"frame":"fotogramas/reparar-rail/06.png","componentId":"25:1206"},{"frame":"fotogramas/reparar-rail/07.png","componentId":"25:1215"},{"frame":"fotogramas/reparar-rail/08.png","componentId":"25:1224"},{"frame":"fotogramas/reparar-rail/09.png","componentId":"25:1234"}]},{"id":"intercambio","name":"Intercambio","purpose":"Cambio de un activo por otro","playback":"once","canvas":{"width":207,"height":164},"frames":9,"totalMs":3250,"preview":"intercambio.webp","sequence":[{"frame":"fotogramas/intercambio/01.png","ms":500},{"frame":"fotogramas/intercambio/02.png","ms":200},{"frame":"fotogramas/intercambio/03.png","ms":180},{"frame":"fotogramas/intercambio/04.png","ms":220},{"frame":"fotogramas/intercambio/05.png","ms":180},{"frame":"fotogramas/intercambio/06.png","ms":220},{"frame":"fotogramas/intercambio/07.png","ms":250},{"frame":"fotogramas/intercambio/08.png","ms":500},{"frame":"fotogramas/intercambio/09.png","ms":1000}],"sources":[{"frame":"fotogramas/intercambio/01.png","componentId":"25:1243"},{"frame":"fotogramas/intercambio/02.png","componentId":"25:1252"},{"frame":"fotogramas/intercambio/03.png","componentId":"25:1262"},{"frame":"fotogramas/intercambio/04.png","componentId":"25:1271"},{"frame":"fotogramas/intercambio/05.png","componentId":"25:1280"},{"frame":"fotogramas/intercambio/06.png","componentId":"25:1290"},{"frame":"fotogramas/intercambio/07.png","componentId":"25:1299"},{"frame":"fotogramas/intercambio/08.png","componentId":"25:1308"},{"frame":"fotogramas/intercambio/09.png","componentId":"25:1318"}]},{"id":"creciendo","name":"Creciendo","purpose":"Progreso a lo largo del tiempo; no promete rentabilidad","playback":"once","canvas":{"width":203,"height":154},"frames":10,"totalMs":3720,"preview":"creciendo.webp","sequence":[{"frame":"fotogramas/creciendo/01.png","ms":500},{"frame":"fotogramas/creciendo/02.png","ms":200},{"frame":"fotogramas/creciendo/03.png","ms":160},{"frame":"fotogramas/creciendo/04.png","ms":160},{"frame":"fotogramas/creciendo/05.png","ms":160},{"frame":"fotogramas/creciendo/06.png","ms":220},{"frame":"fotogramas/creciendo/07.png","ms":220},{"frame":"fotogramas/creciendo/08.png","ms":300},{"frame":"fotogramas/creciendo/09.png","ms":600},{"frame":"fotogramas/creciendo/10.png","ms":1200}],"sources":[{"frame":"fotogramas/creciendo/01.png","componentId":"25:1327"},{"frame":"fotogramas/creciendo/02.png","componentId":"25:1336"},{"frame":"fotogramas/creciendo/03.png","componentId":"25:1346"},{"frame":"fotogramas/creciendo/04.png","componentId":"25:1355"},{"frame":"fotogramas/creciendo/05.png","componentId":"25:1364"},{"frame":"fotogramas/creciendo/06.png","componentId":"25:1374"},{"frame":"fotogramas/creciendo/07.png","componentId":"25:1383"},{"frame":"fotogramas/creciendo/08.png","componentId":"25:1392"},{"frame":"fotogramas/creciendo/09.png","componentId":"25:1402"},{"frame":"fotogramas/creciendo/10.png","componentId":"25:1411"}]},{"id":"tarjeta","name":"Pago con tarjeta","purpose":"Ilustración conceptual de un pago con tarjeta","playback":"once","canvas":{"width":226,"height":177},"frames":8,"totalMs":3650,"preview":"tarjeta.webp","sequence":[{"frame":"fotogramas/tarjeta/01.png","ms":400},{"frame":"fotogramas/tarjeta/02.png","ms":200},{"frame":"fotogramas/tarjeta/03.png","ms":200},{"frame":"fotogramas/tarjeta/04.png","ms":250},{"frame":"fotogramas/tarjeta/05.png","ms":500},{"frame":"fotogramas/tarjeta/06.png","ms":700},{"frame":"fotogramas/tarjeta/07.png","ms":400},{"frame":"fotogramas/tarjeta/08.png","ms":1000}],"sources":[{"frame":"fotogramas/tarjeta/01.png","componentId":"25:1420"},{"frame":"fotogramas/tarjeta/02.png","componentId":"25:1430"},{"frame":"fotogramas/tarjeta/03.png","componentId":"25:1439"},{"frame":"fotogramas/tarjeta/04.png","componentId":"25:1448"},{"frame":"fotogramas/tarjeta/05.png","componentId":"25:1458"},{"frame":"fotogramas/tarjeta/06.png","componentId":"25:1467"},{"frame":"fotogramas/tarjeta/07.png","componentId":"25:1476"},{"frame":"fotogramas/tarjeta/08.png","componentId":"25:1486"}]},{"id":"linterna","name":"Linterna","purpose":"Buscar o revisar","playback":"loop","canvas":{"width":252,"height":190},"frames":8,"totalMs":3200,"preview":"linterna.webp","sequence":[{"frame":"fotogramas/linterna/01.png","ms":400},{"frame":"fotogramas/linterna/02.png","ms":200},{"frame":"fotogramas/linterna/03.png","ms":500},{"frame":"fotogramas/linterna/04.png","ms":500},{"frame":"fotogramas/linterna/05.png","ms":400},{"frame":"fotogramas/linterna/06.png","ms":300},{"frame":"fotogramas/linterna/07.png","ms":400},{"frame":"fotogramas/linterna/08.png","ms":500}],"sources":[{"frame":"fotogramas/linterna/01.png","componentId":"25:1495"},{"frame":"fotogramas/linterna/02.png","componentId":"25:1504"},{"frame":"fotogramas/linterna/03.png","componentId":"25:1514"},{"frame":"fotogramas/linterna/04.png","componentId":"25:1523"},{"frame":"fotogramas/linterna/05.png","componentId":"25:1532"},{"frame":"fotogramas/linterna/06.png","componentId":"25:1542"},{"frame":"fotogramas/linterna/07.png","componentId":"25:1551"},{"frame":"fotogramas/linterna/08.png","componentId":"25:1560"}]},{"id":"saludo","name":"Saludo","purpose":"Bienvenida","playback":"loop","canvas":{"width":198,"height":237},"frames":6,"totalMs":2200,"preview":"saludo.webp","sequence":[{"frame":"fotogramas/saludo/01.png","ms":600},{"frame":"fotogramas/saludo/02.png","ms":120},{"frame":"fotogramas/saludo/03.png","ms":140},{"frame":"fotogramas/saludo/04.png","ms":160},{"frame":"fotogramas/saludo/05.png","ms":160},{"frame":"fotogramas/saludo/04.png","ms":160},{"frame":"fotogramas/saludo/05.png","ms":160},{"frame":"fotogramas/saludo/06.png","ms":700}],"sources":[{"frame":"fotogramas/saludo/01.png","componentId":"25:1570"},{"frame":"fotogramas/saludo/02.png","componentId":"25:1579"},{"frame":"fotogramas/saludo/03.png","componentId":"25:1588"},{"frame":"fotogramas/saludo/04.png","componentId":"25:1598"},{"frame":"fotogramas/saludo/05.png","componentId":"25:1607"},{"frame":"fotogramas/saludo/06.png","componentId":"25:1616"}]},{"id":"mantenimiento","name":"Mantenimiento","purpose":"Servicio en mantenimiento","playback":"loop","canvas":{"width":185,"height":184},"frames":10,"totalMs":3400,"preview":"mantenimiento.webp","sequence":[{"frame":"fotogramas/mantenimiento/01.png","ms":400},{"frame":"fotogramas/mantenimiento/02.png","ms":200},{"frame":"fotogramas/mantenimiento/03.png","ms":220},{"frame":"fotogramas/mantenimiento/04.png","ms":260},{"frame":"fotogramas/mantenimiento/05.png","ms":220},{"frame":"fotogramas/mantenimiento/06.png","ms":180},{"frame":"fotogramas/mantenimiento/07.png","ms":220},{"frame":"fotogramas/mantenimiento/08.png","ms":300},{"frame":"fotogramas/mantenimiento/09.png","ms":500},{"frame":"fotogramas/mantenimiento/10.png","ms":900}],"sources":[{"frame":"fotogramas/mantenimiento/01.png","componentId":"25:1626"},{"frame":"fotogramas/mantenimiento/02.png","componentId":"25:1635"},{"frame":"fotogramas/mantenimiento/03.png","componentId":"25:1644"},{"frame":"fotogramas/mantenimiento/04.png","componentId":"25:1654"},{"frame":"fotogramas/mantenimiento/05.png","componentId":"25:1663"},{"frame":"fotogramas/mantenimiento/06.png","componentId":"25:1672"},{"frame":"fotogramas/mantenimiento/07.png","componentId":"25:1682"},{"frame":"fotogramas/mantenimiento/08.png","componentId":"25:1691"},{"frame":"fotogramas/mantenimiento/09.png","componentId":"25:1700"},{"frame":"fotogramas/mantenimiento/10.png","componentId":"25:1710"}]},{"id":"seguridad","name":"Seguridad","purpose":"Protección de la cuenta; ilustración, no garantía","playback":"once","canvas":{"width":214,"height":236},"frames":8,"totalMs":3400,"preview":"seguridad.webp","sequence":[{"frame":"fotogramas/seguridad/01.png","ms":500},{"frame":"fotogramas/seguridad/02.png","ms":180},{"frame":"fotogramas/seguridad/03.png","ms":250},{"frame":"fotogramas/seguridad/04.png","ms":150},{"frame":"fotogramas/seguridad/05.png","ms":220},{"frame":"fotogramas/seguridad/06.png","ms":500},{"frame":"fotogramas/seguridad/07.png","ms":700},{"frame":"fotogramas/seguridad/08.png","ms":900}],"sources":[{"frame":"fotogramas/seguridad/01.png","componentId":"25:1719"},{"frame":"fotogramas/seguridad/02.png","componentId":"25:1728"},{"frame":"fotogramas/seguridad/03.png","componentId":"25:1738"},{"frame":"fotogramas/seguridad/04.png","componentId":"25:1747"},{"frame":"fotogramas/seguridad/05.png","componentId":"25:1756"},{"frame":"fotogramas/seguridad/06.png","componentId":"25:1766"},{"frame":"fotogramas/seguridad/07.png","componentId":"25:1775"},{"frame":"fotogramas/seguridad/08.png","componentId":"25:1784"}]}],out=[];
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
return {pageId:doc.page.id,rootId:root.id,createdNodeIds:[doc.page.id,...childrenIds(root),...ids],animations:out};