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

const existing=figma.root.children.find(p=>p.name==='Manual');
let doc;if(existing){await figma.setCurrentPageAsync(existing);doc={page:existing,frameIds:[existing.children.find(n=>n.name==='Manual').id]};}else doc=await createDocumentationPage('Manual',{title:'La marca, explicada.',description:'Manuales completos del kit · Texto editable · Origen identificado en cada documento',sections:[]});
const root=await figma.getNodeByIdAsync(doc.frameIds[0]);root.fills=[paint('color/bg/primary')];root.setExplicitVariableModeForCollection(col,col.modes.find(m=>m.name==='Light').modeId);root.clipsContent=false;
if(!existing)await text(root,'El logo permanece estable. El gato puede tener personalidad. Meli es únicamente el nombre interno del personaje.');
const offset=12,docs=[{"path":"brandkit/07-referencias/README.md","title":"07-referencias","text":"# Referencias y snapshots\n\nEdición 2026-09-24. **Contexto de consulta, no una segunda fuente editable.**\n\n## Documentos\n\n- [Narrativa completa](./documentos/gatopago_nueva_narrativa_contexto_completo_2026-08-18.txt): contexto editorial de la etapa GatoPago.\n- [Rebranding maestro](./documentos/gatopago-rebranding-maestro-2026.md): plan amplio de identidad y experiencia.\n- [Plan de marca y experiencia](./documentos/gatopago-plan-marca-experiencia-2026.md): objetivos, criterios y líneas de trabajo.\n\nEstas copias preservan los textos originales. Algunas propuestas visuales y menciones públicas de Meli están superadas por decisiones posteriores; consultar [las diferencias](../01-manual/sistema-visual.md#diferencias-con-los-planes-anteriores). Un plan no acredita que una funcionalidad esté implementada.\n\nEl conjunto de documentación estratégica sigue centralizado en `documentacion/` de este repositorio de marca; la documentación técnica vive en `docs/` de la app. No se copian aquí planes de negocio, contratos privados o documentación técnica sin relación directa con identidad.\n\n## Implementación en producto\n\nEl código y los snapshots de la antigua landing se retiraron el 1 de octubre de 2026. Este kit no distribuye páginas, componentes Astro ni un frontend alternativo.\n\nLos tokens reutilizables y fuentes autocontenidas están en `05-colores/` y `04-tipografia/`. Para componentes reales, trabajar en su repositorio con dependencias, pruebas y contexto completos.\n"},{"path":"brandkit/08-imagenes/README.md","title":"08-imagenes","text":"# Imágenes de comunicación y producto\n\n- **[Avatar de GatoPago](./avatar/README.md)**: símbolo del kit sobre el mismo fondo Milk del apple-touch-icon. SVG con fondo y PNG cuadrados de 180, 400, 512, 800, 1024, 1080 y 2160 px. [Descargar todos](./avatar/gatopago-avatares.zip). La galería muestra también el recorte circular.\n- `open-graph/og.png`: fuente canónica de la imagen social existente, conservada sin cambios al retirar la landing.\n- Las capturas de la interfaz anterior se retiraron del kit. No se sustituyen por imágenes ficticias de producto: cualquier nueva captura debe salir de la app vigente.\n\nAntes de usarlas en una campaña, comprobar nombres, importes, red, disponibilidad de funciones y coherencia con la versión vigente. No anunciar la tarjeta, cobertura internacional, rentabilidad o mainnet basándose en una imagen conceptual.\n\nLa portada de X existente se conserva fuera del kit en `recursos/social/`, junto con su encargo. Las presentaciones están en `recursos/presentaciones/`. Los archivos sociales retirados previamente no se restauran.\n"},{"path":"brandkit/09-componentes/README.md","title":"09-componentes","text":"# Referencia de componentes\n\n[Catálogo local](./index.html). Propuesta en revisión, no librería de componentes de la app. Incluye botones, campos, errores, alertas, diálogos con teclado y retorno de foco, skeletons, rail suave, comprobante y QR descargable.\n\nEl QR codifica únicamente https://gatopago.com. No es un enlace de cobro. Los importes y resultados son ejemplos identificados como tales. El movimiento respeta la preferencia reducida y se puede pausar.\n\nLa plantilla editable está en `scripts/brandkit/design-files.mjs`; cambiarla y regenerar el kit. No copiar lógica financiera o de autenticación desde este catálogo.\n"},{"path":"brandkit/10-plantillas/README.md","title":"10-plantillas","text":"# Plantillas de comunicación\n\n[Ver colección](./index.html). Estado: **en revisión**.\n\n| Pieza | Formato | Uso |\n|---|---|---|\n| Post cuadrado | SVG + PNG 1080 × 1080 | Una idea principal |\n| Novedad vertical | SVG + PNG 1080 × 1350 | Cambio concreto, público y siguiente paso |\n| Portada horizontal | SVG + PNG 1500 × 500 | Fondo Ink; espacio izquierdo libre para el avatar |\n| Documento A4 | HTML local con CSS print | Documento editorial, no contrato |\n\nEl copy editable de las piezas gráficas está en [modelo.json](./modelo.json); la composición se genera desde `scripts/brandkit/design-files.mjs`. El PNG no es la fuente editable. El copy se transforma en contornos Recursive al generar SVG: editar el JSON, regenerar y revisar. El build rechaza titulares demasiado anchos. A4 conserva texto editable HTML, pero para conservar cambios entre builds hay que editar su receta en el generador. No se usan fuentes externas.\n\nMantener una idea por pieza, margen de 80 px en posts y zonas seguras en portada. No añadir tres acentos nuevos ni utilizar a la mascota como garantía de seguridad. Conservar versiones, revisar recortes y no prometer funciones sin comprobarlas. No se reanudó ni modificó el pitch deck existente.\n"}];const frames=[];
for(let i=0;i<docs.length;i++){const d=docs[i];if(doc.page.children.some(n=>n.name==='Manual/'+d.title))continue;const index=i+offset;const f=stack(doc.page,'Manual/'+d.title,1440,24);f.x=100+(index%4)*1600;f.y=700+Math.floor(index/4)*12000;f.fills=[paint('color/bg/primary')];for(const field of ['paddingTop','paddingBottom','paddingLeft','paddingRight'])f.setBoundVariable(field,vars['spacing/section']);await text(f,d.title,1280,'Heading/1');await text(f,d.path,1280,'Code/Metadata');for(const paragraph of d.text.split(/\n\s*\n/)){const heading=paragraph.match(/^#{1,3}\s+([^\n]+)$/);const clean=paragraph.replace(/^#{1,6}\s+/gm,'').replace(/\*\*/g,'').replace(/\[([^\]]+)\]\([^\)]+\)/g,'$1');await text(f,clean,1280,heading?'Heading/2':paragraph.includes('|---')?'Code/Metadata':'Body/Medium');}frames.push({id:f.id,path:d.path,height:f.height});}
for(const t of root.findAllWithCriteria({types:['TEXT']}).filter(t=>t.textStyleId==='')){await figma.loadFontAsync(t.fontName);await t.setTextStyleIdAsync(styles[t===doc.titleNode?'Heading/1':'Body/Medium'].id);t.textAutoResize='HEIGHT';t.resize(1280,24);t.fills=[paint('color/text/primary')];}
return {pageId:doc.page.id,rootId:root.id,frames,createdNodeIds:[doc.page.id,...childrenIds(root),...ids]};