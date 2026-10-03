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


const source={"status":"experimental, separado y no publicado","source":"assets/paleta-base.json y herramientas del laboratorio","primitives":[{"name":"cat/fire","css":"--meli-cat-fire","value":"#f85239","type":"COLOR","scopes":[]},{"name":"cat/shadow","css":"--meli-cat-shadow","value":"#cf3433","type":"COLOR","scopes":[]},{"name":"cat/deep","css":"--meli-cat-deep","value":"#9f292e","type":"COLOR","scopes":[]},{"name":"ink","css":"--meli-ink","value":"#0b0b0f","type":"COLOR","scopes":[]},{"name":"ink-soft","css":"--meli-ink-soft","value":"#15151b","type":"COLOR","scopes":[]},{"name":"ink-raised","css":"--meli-ink-raised","value":"#1d1d24","type":"COLOR","scopes":[]},{"name":"milk","css":"--meli-milk","value":"#fff8f0","type":"COLOR","scopes":[]},{"name":"paper","css":"--meli-paper","value":"#fffdf9","type":"COLOR","scopes":[]},{"name":"oat","css":"--meli-oat","value":"#eee4d8","type":"COLOR","scopes":[]},{"name":"stone","css":"--meli-stone","value":"#a99f96","type":"COLOR","scopes":[]},{"name":"growth","css":"--meli-growth","value":"#71d5a1","type":"COLOR","scopes":[]},{"name":"info","css":"--meli-info","value":"#79b9ff","type":"COLOR","scopes":[]},{"name":"pending","css":"--meli-pending","value":"#f6c65b","type":"COLOR","scopes":[]},{"name":"danger","css":"--meli-danger","value":"#ff6b7a","type":"COLOR","scopes":[]},{"name":"border/light","css":"--meli-border-light","value":{"r":0.043137254901960784,"g":0.043137254901960784,"b":0.058823529411764705,"a":0.14},"type":"COLOR","scopes":[]},{"name":"border/dark","css":"--meli-border-dark","value":{"r":1,"g":0.9725490196078431,"b":0.9411764705882353,"a":0.14},"type":"COLOR","scopes":[]}],"semantic":[{"name":"color/bg/primary","light":"milk","dark":"ink","scopes":["FRAME_FILL","SHAPE_FILL"],"css":"--gp-lab-color-bg-primary"},{"name":"color/bg/surface","light":"paper","dark":"ink-soft","scopes":["FRAME_FILL","SHAPE_FILL"],"css":"--gp-lab-color-bg-surface"},{"name":"color/bg/raised","light":"oat","dark":"ink-raised","scopes":["FRAME_FILL","SHAPE_FILL"],"css":"--gp-lab-color-bg-raised"},{"name":"color/bg/action","light":"cat/fire","dark":"cat/fire","scopes":["FRAME_FILL","SHAPE_FILL"],"css":"--gp-lab-color-bg-action"},{"name":"color/text/primary","light":"ink","dark":"milk","scopes":["TEXT_FILL"],"css":"--gp-lab-color-text-primary"},{"name":"color/text/secondary","light":"cat/deep","dark":"oat","scopes":["TEXT_FILL"],"css":"--gp-lab-color-text-secondary"},{"name":"color/text/on-action","light":"ink","dark":"ink","scopes":["TEXT_FILL"],"css":"--gp-lab-color-text-on-action"},{"name":"color/icon/primary","light":"ink","dark":"milk","scopes":["SHAPE_FILL","STROKE_COLOR"],"css":"--gp-lab-color-icon-primary"},{"name":"color/icon/on-action","light":"ink","dark":"ink","scopes":["SHAPE_FILL","STROKE_COLOR"],"css":"--gp-lab-color-icon-on-action"},{"name":"color/icon/secondary","light":"cat/deep","dark":"oat","scopes":["SHAPE_FILL","STROKE_COLOR"],"css":"--gp-lab-color-icon-secondary"},{"name":"color/border/strong","light":"ink","dark":"milk","scopes":["STROKE_COLOR"],"css":"--gp-lab-color-border-strong"},{"name":"color/border/subtle","light":"border/light","dark":"border/dark","scopes":["STROKE_COLOR"],"css":"--gp-lab-color-border-subtle"},{"name":"color/feedback/confirmed","light":"growth","dark":"growth","scopes":["FRAME_FILL","SHAPE_FILL"],"css":"--gp-lab-color-feedback-confirmed"},{"name":"color/feedback/pending","light":"pending","dark":"pending","scopes":["FRAME_FILL","SHAPE_FILL"],"css":"--gp-lab-color-feedback-pending"},{"name":"color/feedback/info","light":"info","dark":"info","scopes":["FRAME_FILL","SHAPE_FILL"],"css":"--gp-lab-color-feedback-info"},{"name":"color/feedback/danger","light":"danger","dark":"danger","scopes":["FRAME_FILL","SHAPE_FILL","STROKE_COLOR"],"css":"--gp-lab-color-feedback-danger"},{"name":"color/shadow/pixel","light":"cat/shadow","dark":"cat/shadow","scopes":["EFFECT_COLOR"],"css":"--gp-lab-color-shadow-pixel"},{"name":"color/shadow/ink","light":"ink","dark":"ink","scopes":["EFFECT_COLOR"],"css":"--gp-lab-color-shadow-ink"}],"metrics":[{"name":"spacing/none","value":0,"css":"--gp-lab-spacing-none","scopes":["GAP"]},{"name":"spacing/xs","value":4,"css":"--gp-lab-spacing-xs","scopes":["GAP"]},{"name":"spacing/sm","value":8,"css":"--gp-lab-spacing-sm","scopes":["GAP"]},{"name":"spacing/compact","value":12,"css":"--gp-lab-spacing-compact","scopes":["GAP"]},{"name":"spacing/md","value":16,"css":"--gp-lab-spacing-md","scopes":["GAP"]},{"name":"spacing/lg","value":24,"css":"--gp-lab-spacing-lg","scopes":["GAP"]},{"name":"spacing/xl","value":32,"css":"--gp-lab-spacing-xl","scopes":["GAP"]},{"name":"spacing/2xl","value":48,"css":"--gp-lab-spacing-2xl","scopes":["GAP"]},{"name":"spacing/section","value":80,"css":"--gp-lab-spacing-section","scopes":["GAP"]},{"name":"radius/none","value":0,"css":"--gp-lab-radius-none","scopes":["CORNER_RADIUS"]},{"name":"radius/sm","value":8,"css":"--meli-radius-sm","scopes":["CORNER_RADIUS"]},{"name":"radius/md","value":16,"css":"--meli-radius-md","scopes":["CORNER_RADIUS"]},{"name":"radius/lg","value":24,"css":"--meli-radius-lg","scopes":["CORNER_RADIUS"]},{"name":"radius/xl","value":32,"css":"--meli-radius-xl","scopes":["CORNER_RADIUS"]},{"name":"border/width","value":2,"css":"--gp-lab-border-width","scopes":["STROKE_FLOAT"]},{"name":"target/minimum","value":44,"css":"--gp-lab-target-minimum","scopes":["WIDTH_HEIGHT"]}],"styles":[{"name":"Display/Hero","size":64,"line":68,"font":{"family":"Recursive","style":"Sans Casual Black Italic","variationSettings":{"wght":850,"MONO":0,"CASL":0.5,"slnt":-8,"CRSV":0.5}}},{"name":"Heading/1","size":40,"line":46,"font":{"family":"Recursive","style":"Sans Casual Black Italic","variationSettings":{"wght":850,"MONO":0,"CASL":0.5,"slnt":-8,"CRSV":0.5}}},{"name":"Heading/2","size":24,"line":30,"font":{"family":"Recursive","style":"Sans Linear Bold","variationSettings":{"wght":700,"MONO":0,"CASL":0,"slnt":0,"CRSV":0}}},{"name":"Body/Medium","size":16,"line":24,"font":{"family":"Recursive","style":"Sans Linear","variationSettings":{"wght":400,"MONO":0,"CASL":0,"slnt":0,"CRSV":0}}},{"name":"Body/Small","size":14,"line":21,"font":{"family":"Recursive","style":"Sans Linear","variationSettings":{"wght":400,"MONO":0,"CASL":0,"slnt":0,"CRSV":0}}},{"name":"Label/Action","size":14,"line":20,"font":{"family":"Recursive","style":"Sans Linear Bold","variationSettings":{"wght":700,"MONO":0,"CASL":0,"slnt":0,"CRSV":0}}},{"name":"Code/Metadata","size":11,"line":17,"font":{"family":"Recursive","style":"Mono Linear Medium","variationSettings":{"wght":500,"MONO":1,"CASL":0,"slnt":0,"CRSV":0}}},{"name":"Amount/Large","size":48,"line":54,"font":{"family":"Recursive","style":"Sans Casual Black Italic","variationSettings":{"wght":850,"MONO":0,"CASL":0.5,"slnt":-8,"CRSV":0.5}}}]};
const styles=await figma.getLocalTextStylesAsync(),vars=await figma.variables.getLocalVariablesAsync(),collections=await figma.variables.getLocalVariableCollectionsAsync();
await Promise.all([...source.styles.map(s=>figma.loadFontAsync(s.font)),figma.loadFontAsync({family:'Recursive',style:'Sans Linear Medium'})]);
const styleMap=Object.fromEntries(styles.map(s=>[s.name,s])),varMap=Object.fromEntries(vars.map(v=>[v.name,v]));
const color=collections.find(c=>c.name==='Color');
function paint(name){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',varMap[name])}
async function label(parent,value,style='Body/Medium',width=1280){const t=figma.createText();t.name=value;t.fontName=styleMap[style].fontName;await t.setTextStyleIdAsync(styleMap[style].id);t.resize(width,24);t.textAutoResize='HEIGHT';t.characters=value;t.fills=[paint('color/text/primary')];parent.appendChild(t);t.layoutSizingVertical='HUG';return t}
function stack(parent,name,direction='VERTICAL',width=1280,gap=16){const f=figma.createAutoLayout(direction);f.name=name;f.fills=[];f.resize(width,100);f.setBoundVariable('itemSpacing',varMap['spacing/'+(gap===80?'section':gap===24?'lg':'md')]);parent.appendChild(f);f.layoutSizingHorizontal='FIXED';f.layoutSizingVertical='HUG';return f}
function allIds(node){return [node.id,...('children' in node?node.findAll(()=>true).map(n=>n.id):[])]}

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
return {pageId:doc.page.id,rootId:root.id,createdNodeIds:[doc.page.id,...allIds(root)],nativeTexts:root.findAllWithCriteria({types:['TEXT']}).length,bounds:{width:root.width,height:root.height},sections:doc.frameIds,stylesApplied:defaults.length};