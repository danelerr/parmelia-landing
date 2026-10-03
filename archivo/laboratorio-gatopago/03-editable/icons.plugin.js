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

const source=[{"id":"cobrar","label":"Cobrar","category":"pagos","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-cobrar\"><title id=\"title-cobrar\">Cobrar</title><rect x=\"4\" y=\"4\" width=\"16\" height=\"16\"/><path d=\"M12 6v12m-4-4 4 4 4-4\"/></svg>"},{"id":"enviar","label":"Enviar","category":"pagos","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-enviar\"><title id=\"title-enviar\">Enviar</title><path d=\"M4 20V4h16M4 20 20 4m-8 0h8v8\"/></svg>"},{"id":"pagar","label":"Pagar","category":"pagos","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-pagar\"><title id=\"title-pagar\">Pagar</title><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\"/><path d=\"M3 10h18M6 15h5\"/><rect x=\"16\" y=\"14\" width=\"2\" height=\"2\" fill=\"#0b0b0f\" stroke=\"none\"/></svg>"},{"id":"cambiar","label":"Cambiar","category":"pagos","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-cambiar\"><title id=\"title-cambiar\">Cambiar</title><path d=\"M3 8h17l-4-4m4 12H4l4 4M20 8v4M4 16v-4\"/></svg>"},{"id":"escanear","label":"Escanear","category":"pagos","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-escanear\"><title id=\"title-escanear\">Escanear</title><path d=\"M3 8V3h5m8 0h5v5M3 16v5h5m8 0h5v-5M7 12h10\"/><rect x=\"10\" y=\"6\" width=\"2\" height=\"2\" fill=\"#0b0b0f\" stroke=\"none\"/><rect x=\"10\" y=\"16\" width=\"2\" height=\"2\" fill=\"#0b0b0f\" stroke=\"none\"/></svg>"},{"id":"qr","label":"QR","category":"pagos","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-qr\"><title id=\"title-qr\">QR</title><rect x=\"3\" y=\"3\" width=\"6\" height=\"6\"/><rect x=\"15\" y=\"3\" width=\"6\" height=\"6\"/><rect x=\"3\" y=\"15\" width=\"6\" height=\"6\"/><rect x=\"5\" y=\"5\" width=\"2\" height=\"2\" fill=\"#0b0b0f\" stroke=\"none\"/><rect x=\"17\" y=\"5\" width=\"2\" height=\"2\" fill=\"#0b0b0f\" stroke=\"none\"/><rect x=\"5\" y=\"17\" width=\"2\" height=\"2\" fill=\"#0b0b0f\" stroke=\"none\"/><path d=\"M13 13h4v4h4v4h-8v-4m0-4v2m8-4v2\"/></svg>"},{"id":"actividad","label":"Actividad","category":"cuenta","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-actividad\"><title id=\"title-actividad\">Actividad</title><path d=\"M3 5h18M3 19h18M3 13h4l3-5 4 8 3-5h4\"/></svg>"},{"id":"cuenta","label":"Cuenta","category":"cuenta","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-cuenta\"><title id=\"title-cuenta\">Cuenta</title><rect x=\"8\" y=\"3\" width=\"8\" height=\"7\"/><path d=\"M4 21v-5l4-3h8l4 3v5Z\"/></svg>"},{"id":"saldo","label":"Saldo","category":"cuenta","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-saldo\"><title id=\"title-saldo\">Saldo</title><rect x=\"3\" y=\"5\" width=\"18\" height=\"15\"/><path d=\"M3 5V3h14v2M21 10h-7v5h7\"/><rect x=\"16\" y=\"11\" width=\"2\" height=\"2\" fill=\"#0b0b0f\" stroke=\"none\"/></svg>"},{"id":"contactos","label":"Contactos","category":"cuenta","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-contactos\"><title id=\"title-contactos\">Contactos</title><rect x=\"7\" y=\"5\" width=\"6\" height=\"6\"/><path d=\"M4 20v-5l3-2h6l3 2v5m0-15h4v6h-2m0 2 3 2v5\"/></svg>"},{"id":"comprobante","label":"Comprobante","category":"pagos","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-comprobante\"><title id=\"title-comprobante\">Comprobante</title><path d=\"M5 3h14v18l-3-2-4 2-4-2-3 2ZM8 7h8M8 11h8M8 15h4\"/></svg>"},{"id":"descargar","label":"Descargar","category":"sistema","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-descargar\"><title id=\"title-descargar\">Descargar</title><path d=\"M12 4v12m-4-4 4 4 4-4\"/><path d=\"M3 16v5h18v-5\"/></svg>"},{"id":"compartir","label":"Compartir","category":"sistema","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-compartir\"><title id=\"title-compartir\">Compartir</title><rect x=\"3\" y=\"9\" width=\"6\" height=\"6\"/><rect x=\"15\" y=\"3\" width=\"6\" height=\"6\"/><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\"/><path d=\"M9 10 15 6M9 14l6 4\"/></svg>"},{"id":"copiar","label":"Copiar","category":"sistema","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-copiar\"><title id=\"title-copiar\">Copiar</title><rect x=\"8\" y=\"8\" width=\"13\" height=\"13\"/><path d=\"M16 8V3H3v13h5\"/></svg>"},{"id":"seguridad","label":"Seguridad","category":"seguridad","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-seguridad\"><title id=\"title-seguridad\">Seguridad</title><path d=\"M12 3 3 6v7l3 5 6 3 6-3 3-5V6ZM8 12l3 3 5-6\"/></svg>"},{"id":"passkey","label":"Llave segura","category":"seguridad","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-passkey\"><title id=\"title-passkey\">Llave segura</title><rect x=\"3\" y=\"4\" width=\"8\" height=\"8\"/><rect x=\"6\" y=\"7\" width=\"2\" height=\"2\" fill=\"#0b0b0f\" stroke=\"none\"/><path d=\"M11 12l9 9m-2-2 3-3m-6 0 3-3\"/></svg>"},{"id":"bloquear","label":"Bloquear","category":"seguridad","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-bloquear\"><title id=\"title-bloquear\">Bloquear</title><rect x=\"5\" y=\"10\" width=\"14\" height=\"11\"/><path d=\"M8 10V6l2-3h4l2 3v4M12 14v3\"/></svg>"},{"id":"dispositivo","label":"Dispositivo","category":"seguridad","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-dispositivo\"><title id=\"title-dispositivo\">Dispositivo</title><rect x=\"6\" y=\"2\" width=\"12\" height=\"20\"/><path d=\"M10 5h4M10 19h4\"/></svg>"},{"id":"verificar","label":"Verificar","category":"seguridad","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-verificar\"><title id=\"title-verificar\">Verificar</title><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\"/><path d=\"M7 12l4 4 6-8\"/></svg>"},{"id":"alerta","label":"Precaución","category":"estados","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-alerta\"><title id=\"title-alerta\">Precaución</title><path d=\"M12 3 2 21h20ZM12 9v5\"/><rect x=\"11\" y=\"17\" width=\"2\" height=\"2\" fill=\"#0b0b0f\" stroke=\"none\"/></svg>"},{"id":"pendiente","label":"Pendiente","category":"estados","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-pendiente\"><title id=\"title-pendiente\">Pendiente</title><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\"/><path d=\"M12 6v7h5\"/></svg>"},{"id":"error","label":"Error","category":"estados","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-error\"><title id=\"title-error\">Error</title><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\"/><path d=\"M8 8l8 8M16 8l-8 8\"/></svg>"},{"id":"ayuda","label":"Ayuda","category":"sistema","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-ayuda\"><title id=\"title-ayuda\">Ayuda</title><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\"/><path d=\"M8 8V6h8v5l-4 2v2\"/><rect x=\"11\" y=\"17\" width=\"2\" height=\"2\" fill=\"#0b0b0f\" stroke=\"none\"/></svg>"},{"id":"notificaciones","label":"Notificaciones","category":"cuenta","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-notificaciones\"><title id=\"title-notificaciones\">Notificaciones</title><path d=\"M5 16V7l4-3h6l4 3v9l2 3H3ZM10 21h4M12 2v2\"/></svg>"},{"id":"ajustes","label":"Ajustes","category":"sistema","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-ajustes\"><title id=\"title-ajustes\">Ajustes</title><path d=\"M3 6h18M3 12h18M3 18h18\"/><rect x=\"7\" y=\"4\" width=\"4\" height=\"4\"/><rect x=\"15\" y=\"10\" width=\"4\" height=\"4\"/><rect x=\"5\" y=\"16\" width=\"4\" height=\"4\"/></svg>"},{"id":"buscar","label":"Buscar","category":"sistema","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-buscar\"><title id=\"title-buscar\">Buscar</title><rect x=\"3\" y=\"3\" width=\"12\" height=\"12\"/><path d=\"M15 15l6 6\"/></svg>"},{"id":"correo","label":"Correo","category":"sistema","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-correo\"><title id=\"title-correo\">Correo</title><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\"/><path d=\"M3 6l9 7 9-7\"/></svg>"},{"id":"salir","label":"Salir","category":"sistema","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-salir\"><title id=\"title-salir\">Salir</title><path d=\"M10 3H3v18h7M9 12h12l-4-4m4 4-4 4\"/></svg>"},{"id":"ruta","label":"Ruta","category":"pagos","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-ruta\"><title id=\"title-ruta\">Ruta</title><rect x=\"3\" y=\"3\" width=\"4\" height=\"4\"/><rect x=\"17\" y=\"17\" width=\"4\" height=\"4\"/><path d=\"M7 5h12v6H5v8h12\"/></svg>"},{"id":"crecer","label":"Crecer","category":"cuenta","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-crecer\"><title id=\"title-crecer\">Crecer</title><path d=\"M12 21V9M12 14H7L3 10V5h5l4 4m0 4h5l4-4V4h-5l-4 4M5 21h14\"/></svg>"},{"id":"api","label":"API","category":"negocios","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-api\"><title id=\"title-api\">API</title><path d=\"M8 5 2 12l6 7M16 5l6 7-6 7M14 3l-4 18\"/></svg>"},{"id":"negocio","label":"Negocio","category":"negocios","svg":"<svg width=\"24\" height=\"24\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#0b0b0f\" stroke-width=\"2\" stroke-linecap=\"square\" stroke-linejoin=\"miter\" role=\"img\" aria-labelledby=\"title-negocio\"><title id=\"title-negocio\">Negocio</title><rect x=\"3\" y=\"8\" width=\"18\" height=\"13\"/><path d=\"M8 8V3h8v5M3 13h18M10 13v3h4v-3\"/></svg>"}];
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
