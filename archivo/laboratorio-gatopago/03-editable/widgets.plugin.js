/**
 * createComponentWithVariants
 *
 * Creates a component set by generating all combinations of `variantAxes`,
 * building one Figma component per combination, then calling
 * `figma.combineAsVariants` to produce the component set. After combining,
 * the variants are repositioned into a grid so they don't all stack at (0, 0).
 *
 * @param {{
 *   name: string,
 *   description?: string,
 *   variantAxes: Record<string, string[]>,
 *   baseProps: {
 *     width: number,
 *     height: number,
 *     fills?: Paint[],
 *     padding?: {top?: number, bottom?: number, left?: number, right?: number},
 *     radius?: number,
 *     layoutMode?: 'HORIZONTAL' | 'VERTICAL' | 'NONE',
 *     itemSpacing?: number
 *   },
 *   page: PageNode
 * }} config
 *   - `name`: Component set name (e.g. "Button").
 *   - `description`: Optional human-readable purpose and usage guidance.
 *   - `variantAxes`: Each key is a variant property name; each value is an array of
 *     allowed values. All combinations are generated (Cartesian product).
 *     Example: { Size: ['Small', 'Medium', 'Large'], Style: ['Primary', 'Ghost'] }
 *     produces 6 variants.
 *   - `baseProps`: Visual properties applied to every variant.
 *   - `page`: The PageNode to create components on (must be set as current page by caller).
 * @returns {Promise<{
 *   componentSet: ComponentSetNode,
 *   variants: ComponentNode[]
 * }>}
 */
async function createComponentWithVariants(config) {
  const { name, variantAxes, baseProps, page } = config

  // Ensure we are on the correct page
  // La página se selecciona una vez por el llamador.

  // Compute Cartesian product of variant axes
  const axisNames = Object.keys(variantAxes)
  const axisValues = axisNames.map((k) => variantAxes[k])
  const combinations = cartesianProduct(axisValues)

  // Build one component per combination
  const components = []
  for (const combo of combinations) {
    const comp = figma.createComponent()

    // Name: "Property=Value, Property=Value, ..."
    comp.name = axisNames.map((ax, i) => `${ax}=${combo[i]}`).join(', ')

    // Base geometry
    comp.resize(baseProps.width, baseProps.height)

    // Fills
    if (baseProps.fills !== undefined) {
      comp.fills = baseProps.fills
    } else {
      comp.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }]
    }

    // Corner radius
    if (baseProps.radius !== undefined) {
      comp.cornerRadius = baseProps.radius
    }

    // Auto-layout
    if (baseProps.layoutMode && baseProps.layoutMode !== 'NONE') {
      comp.layoutMode = baseProps.layoutMode
      comp.primaryAxisAlignItems = 'CENTER'
      comp.counterAxisAlignItems = 'CENTER'
      if (baseProps.itemSpacing !== undefined) {
        comp.itemSpacing = baseProps.itemSpacing
      }
    }

    // Padding
    if (baseProps.padding) {
      comp.paddingTop = baseProps.padding.top ?? 0
      comp.paddingBottom = baseProps.padding.bottom ?? 0
      comp.paddingLeft = baseProps.padding.left ?? 0
      comp.paddingRight = baseProps.padding.right ?? 0
    }

    page.appendChild(comp)
    components.push(comp)
  }

  // Combine into a component set
  const componentSet = figma.combineAsVariants(components, page)
  componentSet.name = name
  if (config.description) {
    componentSet.description = config.description
  }

  // Grid layout — variants stack at (0, 0) after combineAsVariants; reposition them.
  const GRID_GAP = 16
  const cols = Math.max(1, axisValues[axisValues.length - 1]?.length ?? 1)
  const variantWidth = baseProps.width
  const variantHeight = baseProps.height

  componentSet.children.forEach((variant, idx) => {
    const col = idx % cols
    const row = Math.floor(idx / cols)
    variant.x = col * (variantWidth + GRID_GAP)
    variant.y = row * (variantHeight + GRID_GAP)
  })

  // Resize component set to wrap its children with padding
  const totalCols = Math.min(cols, combinations.length)
  const totalRows = Math.ceil(combinations.length / cols)
  const PADDING = 40
  componentSet.resize(
    totalCols * variantWidth + (totalCols - 1) * GRID_GAP + PADDING * 2,
    totalRows * variantHeight + (totalRows - 1) * GRID_GAP + PADDING * 2,
  )

  // Position component set at a safe canvas location
  componentSet.x = 480
  componentSet.y = 80

  return { componentSet, variants: componentSet.children }
}

/**
 * Computes the Cartesian product of multiple arrays.
 * cartesianProduct([[A, B], [1, 2]]) → [[A,1], [A,2], [B,1], [B,2]]
 *
 * @param {Array<string[]>} arrays
 * @returns {string[][]}
 */
function cartesianProduct(arrays) {
  return arrays.reduce(
    (acc, curr) => acc.flatMap((combo) => curr.map((val) => [...combo, val])),
    [[]],
  )
}

const iconIds={"cobrar":"7:6","enviar":"7:10","pagar":"7:13","cambiar":"7:18","escanear":"7:21","qr":"7:26","actividad":"7:35","cuenta":"7:38","saldo":"7:42","contactos":"7:47","comprobante":"7:51","descargar":"7:54","compartir":"7:58","copiar":"7:64","seguridad":"7:68","passkey":"7:71","bloquear":"7:76","dispositivo":"7:80","verificar":"7:84","alerta":"7:88","pendiente":"7:92","error":"7:96","ayuda":"7:100","notificaciones":"7:105","ajustes":"7:108","buscar":"7:114","correo":"7:118","salir":"7:122","ruta":"7:125","crecer":"7:130","api":"7:133","negocio":"7:136"},buttonSource={"Primary":{"id":"8:13","labelKey":"Label#8:0","showKey":"Show icon#8:11","iconKey":"Icon#8:22","variants":[{"id":"8:3","name":"Size=Medium, State=Default","width":208,"height":46},{"id":"8:4","name":"Size=Medium, State=Hover","width":208,"height":46},{"id":"8:5","name":"Size=Medium, State=Pressed","width":208,"height":46},{"id":"8:6","name":"Size=Medium, State=Disabled","width":208,"height":46},{"id":"8:7","name":"Size=Medium, State=Loading","width":208,"height":46},{"id":"8:8","name":"Size=Large, State=Default","width":208,"height":54},{"id":"8:9","name":"Size=Large, State=Hover","width":208,"height":54},{"id":"8:10","name":"Size=Large, State=Pressed","width":208,"height":54},{"id":"8:11","name":"Size=Large, State=Disabled","width":208,"height":54},{"id":"8:12","name":"Size=Large, State=Loading","width":208,"height":54}]},"Secondary":{"id":"8:104","labelKey":"Label#8:33","showKey":"Show icon#8:44","iconKey":"Icon#8:55","variants":[{"id":"8:94","name":"Size=Medium, State=Default","width":208,"height":46},{"id":"8:95","name":"Size=Medium, State=Hover","width":208,"height":46},{"id":"8:96","name":"Size=Medium, State=Pressed","width":208,"height":46},{"id":"8:97","name":"Size=Medium, State=Disabled","width":208,"height":46},{"id":"8:98","name":"Size=Medium, State=Loading","width":208,"height":46},{"id":"8:99","name":"Size=Large, State=Default","width":208,"height":54},{"id":"8:100","name":"Size=Large, State=Hover","width":208,"height":54},{"id":"8:101","name":"Size=Large, State=Pressed","width":208,"height":54},{"id":"8:102","name":"Size=Large, State=Disabled","width":208,"height":54},{"id":"8:103","name":"Size=Large, State=Loading","width":208,"height":54}]}},qrSVG="<svg width=\"296\" height=\"296\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 37 37\"  role=\"img\" aria-label=\"QR de demostración · https://example.org/gatopago-demo\"><title>QR de demostración · https://example.org/gatopago-demo</title><rect x=\"0\" y=\"0\" width=\"37\" height=\"37\" fill=\"#ffffff\"/><path d=\"M4 4h7v1h-7zM15 4h2v1h-2zM18 4h1v1h-1zM23 4h1v1h-1zM26 4h7v1h-7zM4 5h1v1h-1zM10 5h1v1h-1zM12 5h1v1h-1zM14 5h1v1h-1zM16 5h2v1h-2zM21 5h4v1h-4zM26 5h1v1h-1zM32 5h1v1h-1zM4 6h1v1h-1zM6 6h3v1h-3zM10 6h1v1h-1zM13 6h4v1h-4zM19 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM28 6h3v1h-3zM32 6h1v1h-1zM4 7h1v1h-1zM6 7h3v1h-3zM10 7h1v1h-1zM13 7h2v1h-2zM16 7h2v1h-2zM20 7h1v1h-1zM22 7h2v1h-2zM26 7h1v1h-1zM28 7h3v1h-3zM32 7h1v1h-1zM4 8h1v1h-1zM6 8h3v1h-3zM10 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM16 8h2v1h-2zM20 8h4v1h-4zM26 8h1v1h-1zM28 8h3v1h-3zM32 8h1v1h-1zM4 9h1v1h-1zM10 9h1v1h-1zM13 9h2v1h-2zM16 9h1v1h-1zM18 9h3v1h-3zM22 9h3v1h-3zM26 9h1v1h-1zM32 9h1v1h-1zM4 10h7v1h-7zM12 10h1v1h-1zM14 10h1v1h-1zM16 10h1v1h-1zM18 10h1v1h-1zM20 10h1v1h-1zM22 10h1v1h-1zM24 10h1v1h-1zM26 10h7v1h-7zM14 11h3v1h-3zM19 11h1v1h-1zM21 11h2v1h-2zM24 11h1v1h-1zM4 12h1v1h-1zM6 12h1v1h-1zM8 12h1v1h-1zM10 12h1v1h-1zM14 12h1v1h-1zM20 12h2v1h-2zM24 12h1v1h-1zM28 12h1v1h-1zM31 12h1v1h-1zM4 13h1v1h-1zM6 13h3v1h-3zM13 13h1v1h-1zM16 13h2v1h-2zM19 13h4v1h-4zM24 13h1v1h-1zM26 13h1v1h-1zM29 13h1v1h-1zM32 13h1v1h-1zM4 14h2v1h-2zM7 14h9v1h-9zM18 14h3v1h-3zM22 14h1v1h-1zM26 14h3v1h-3zM30 14h3v1h-3zM4 15h1v1h-1zM8 15h2v1h-2zM14 15h2v1h-2zM17 15h2v1h-2zM20 15h2v1h-2zM24 15h2v1h-2zM28 15h1v1h-1zM31 15h1v1h-1zM4 16h4v1h-4zM9 16h2v1h-2zM12 16h5v1h-5zM18 16h4v1h-4zM23 16h4v1h-4zM29 16h1v1h-1zM31 16h2v1h-2zM13 17h1v1h-1zM18 17h2v1h-2zM21 17h1v1h-1zM25 17h2v1h-2zM29 17h1v1h-1zM32 17h1v1h-1zM5 18h1v1h-1zM7 18h2v1h-2zM10 18h1v1h-1zM15 18h3v1h-3zM22 18h1v1h-1zM25 18h1v1h-1zM27 18h3v1h-3zM31 18h2v1h-2zM12 19h3v1h-3zM20 19h3v1h-3zM24 19h2v1h-2zM27 19h1v1h-1zM29 19h1v1h-1zM31 19h1v1h-1zM5 20h2v1h-2zM8 20h1v1h-1zM10 20h1v1h-1zM15 20h2v1h-2zM19 20h3v1h-3zM24 20h3v1h-3zM29 20h1v1h-1zM31 20h2v1h-2zM6 21h1v1h-1zM9 21h1v1h-1zM11 21h2v1h-2zM17 21h1v1h-1zM20 21h2v1h-2zM24 21h3v1h-3zM29 21h2v1h-2zM32 21h1v1h-1zM4 22h1v1h-1zM6 22h2v1h-2zM10 22h5v1h-5zM16 22h1v1h-1zM18 22h1v1h-1zM21 22h1v1h-1zM24 22h3v1h-3zM28 22h1v1h-1zM31 22h2v1h-2zM5 23h2v1h-2zM8 23h2v1h-2zM11 23h3v1h-3zM15 23h1v1h-1zM17 23h6v1h-6zM27 23h3v1h-3zM31 23h1v1h-1zM4 24h1v1h-1zM7 24h4v1h-4zM13 24h3v1h-3zM18 24h4v1h-4zM24 24h5v1h-5zM12 25h1v1h-1zM14 25h1v1h-1zM18 25h1v1h-1zM20 25h1v1h-1zM24 25h1v1h-1zM28 25h1v1h-1zM30 25h3v1h-3zM4 26h7v1h-7zM13 26h1v1h-1zM15 26h1v1h-1zM17 26h1v1h-1zM21 26h1v1h-1zM23 26h2v1h-2zM26 26h1v1h-1zM28 26h2v1h-2zM31 26h2v1h-2zM4 27h1v1h-1zM10 27h1v1h-1zM13 27h1v1h-1zM15 27h1v1h-1zM19 27h4v1h-4zM24 27h1v1h-1zM28 27h2v1h-2zM4 28h1v1h-1zM6 28h3v1h-3zM10 28h1v1h-1zM12 28h3v1h-3zM16 28h1v1h-1zM20 28h3v1h-3zM24 28h5v1h-5zM32 28h1v1h-1zM4 29h1v1h-1zM6 29h3v1h-3zM10 29h1v1h-1zM13 29h3v1h-3zM17 29h1v1h-1zM20 29h1v1h-1zM24 29h2v1h-2zM28 29h1v1h-1zM30 29h3v1h-3zM4 30h1v1h-1zM6 30h3v1h-3zM10 30h1v1h-1zM12 30h2v1h-2zM18 30h1v1h-1zM20 30h1v1h-1zM23 30h1v1h-1zM27 30h3v1h-3zM32 30h1v1h-1zM4 31h1v1h-1zM10 31h1v1h-1zM14 31h1v1h-1zM18 31h7v1h-7zM26 31h1v1h-1zM31 31h1v1h-1zM4 32h7v1h-7zM12 32h4v1h-4zM17 32h2v1h-2zM20 32h2v1h-2zM23 32h2v1h-2zM27 32h2v1h-2zM31 32h2v1h-2z\" fill=\"#0b0b0f\"/></svg>",families=[{"name":"Field/Text","axis":"State","values":["Default","Error","Disabled"],"kind":"field","description":"Campo textual con etiqueta y ayuda persistentes. El error requiere explicación, no solo color."},{"name":"Field/Amount","axis":"State","values":["Empty","Filled","Error"],"kind":"amount","description":"Importe y moneda separados. Datos ilustrativos; no calcula ni consulta saldo."},{"name":"Badge","axis":"Status","values":["Info","Pending","Confirmed","Danger"],"kind":"badge","description":"Estado con texto y símbolo. Confirmed se usa únicamente con evidencia del sistema."},{"name":"Notification","axis":"Status","values":["Info","Pending","Danger"],"kind":"notification","description":"Mensaje contextual con título, detalle y salida. Sin celebraciones en situaciones de riesgo."},{"name":"Dialog","axis":"Purpose","values":["Review","Info","Risk"],"kind":"dialog","description":"Una decisión por diálogo. Texto y acciones editables; no ejecuta operaciones financieras."},{"name":"QR/Receive","axis":"Format","values":["Card"],"kind":"qr","description":"QR vectorial de demostración: example.org/gatopago-demo. Quiet zone de cuatro módulos; no sirve para cobrar."},{"name":"Receipt","axis":"Format","values":["Card"],"kind":"receipt","description":"Comprobante ficticio, importes consistentes y metadatos editables. No acredita una transacción."},{"name":"Skeleton","axis":"Screen","values":["Home","Activity"],"kind":"skeleton","description":"Esqueleto geométrico estático de carga. Conserva la estructura; no es un saldo ni una operación."},{"name":"Pixel Rail","axis":"State","values":["Preparing","Idle","Confirmed"],"kind":"rail","description":"Ruta indeterminada, sin porcentaje. La animación real y su variante reducida viven en 05-movimiento."}];
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
