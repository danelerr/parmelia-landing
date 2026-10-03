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
  // Página seleccionada por el llamador.

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

/**
 * bindVariablesToComponent
 *
 * Binds design token variables to the visual properties of a component node.
 * Supports fills, strokes, all padding directions, item spacing, and corner radius.
 * Only binds properties for which a variable ID is provided in `bindings`.
 *
 * This function should be called on each variant individually within a component
 * set, OR on the component set itself for properties shared by all variants.
 *
 * @param {ComponentNode | FrameNode | RectangleNode} component
 *   The Figma node to mutate. Usually a ComponentNode or one of its children.
 * @param {{
 *   fills?: string,
 *   strokes?: string,
 *   paddingTop?: string,
 *   paddingBottom?: string,
 *   paddingLeft?: string,
 *   paddingRight?: string,
 *   itemSpacing?: string,
 *   cornerRadius?: string
 * }} bindings
 *   Each key is a visual property name; each value is a Figma Variable ID
 *   (e.g. "VariableID:123:456"). Omit a key to skip binding that property.
 * @returns {Promise<{ mutatedNodeIds: string[] }>}
 *   List of node IDs that were mutated (for audit/validation purposes).
 */
async function bindVariablesToComponent(component, bindings) {
  const mutatedNodeIds = []

  if (!component) {
    return { mutatedNodeIds }
  }

  // Batch every getVariableByIdAsync call upfront in a single Promise.all rather
  // than awaiting per-property — the lookups are independent and IPC-bound.
  const floatBindings = [
    ['paddingTop', 'paddingTop'],
    ['paddingBottom', 'paddingBottom'],
    ['paddingLeft', 'paddingLeft'],
    ['paddingRight', 'paddingRight'],
    ['itemSpacing', 'itemSpacing'],
    ['cornerRadius', 'cornerRadius'],
  ]

  const requestedIds = []
  if (bindings.fills) requestedIds.push(['fills', bindings.fills])
  if (bindings.strokes) requestedIds.push(['strokes', bindings.strokes])
  for (const [bindingKey] of floatBindings) {
    if (bindings[bindingKey]) requestedIds.push([bindingKey, bindings[bindingKey]])
  }

  const resolved = await Promise.all(
    requestedIds.map(([, id]) => figma.variables.getVariableByIdAsync(id)),
  )
  const varByKey = {}
  for (let i = 0; i < requestedIds.length; i++) {
    varByKey[requestedIds[i][0]] = resolved[i]
  }

  const markMutated = () => {
    if (!mutatedNodeIds.includes(component.id)) {
      mutatedNodeIds.push(component.id)
    }
  }

  // --- Fills ---
  const fillVar = varByKey.fills
  if (fillVar) {
    const existingFills = component.fills
    if (Array.isArray(existingFills) && existingFills.length > 0) {
      // Bind the color of the first fill to the variable
      const boundFill = figma.variables.setBoundVariableForPaint(existingFills[0], 'color', fillVar)
      component.fills = [boundFill, ...existingFills.slice(1)]
    } else {
      // No existing fill — create a solid fill bound to the variable
      const boundFill = figma.variables.setBoundVariableForPaint(
        { type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } },
        'color',
        fillVar,
      )
      component.fills = [boundFill]
    }
    markMutated()
  }

  // --- Strokes ---
  const strokeVar = varByKey.strokes
  if (strokeVar) {
    const existingStrokes = component.strokes
    if (Array.isArray(existingStrokes) && existingStrokes.length > 0) {
      const boundStroke = figma.variables.setBoundVariableForPaint(
        existingStrokes[0],
        'color',
        strokeVar,
      )
      component.strokes = [boundStroke, ...existingStrokes.slice(1)]
    } else {
      const boundStroke = figma.variables.setBoundVariableForPaint(
        { type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } },
        'color',
        strokeVar,
      )
      component.strokes = [boundStroke]
    }
    markMutated()
  }

  // --- Spacing properties (FLOAT variables bound via setBoundVariable) ---
  for (const [bindingKey, figmaProp] of floatBindings) {
    const variable = varByKey[bindingKey]
    if (variable) {
      component.setBoundVariable(figmaProp, variable)
      markMutated()
    }
  }

  return { mutatedNodeIds }
}

const iconIds={"cobrar":"7:6","enviar":"7:10","pagar":"7:13","cambiar":"7:18","escanear":"7:21","qr":"7:26","actividad":"7:35","cuenta":"7:38","saldo":"7:42","contactos":"7:47","comprobante":"7:51","descargar":"7:54","compartir":"7:58","copiar":"7:64","seguridad":"7:68","passkey":"7:71","bloquear":"7:76","dispositivo":"7:80","verificar":"7:84","alerta":"7:88","pendiente":"7:92","error":"7:96","ayuda":"7:100","notificaciones":"7:105","ajustes":"7:108","buscar":"7:114","correo":"7:118","salir":"7:122","ruta":"7:125","crecer":"7:130","api":"7:133","negocio":"7:136"};
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
