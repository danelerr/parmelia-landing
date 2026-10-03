/**
 * createVariableCollection
 *
 * Creates a new Figma variable collection with the specified name and modes.
 * If `modeNames` has more than one entry, the first mode is renamed from
 * Figma's default "Mode 1" to the first name, and additional modes are added.
 *
 * @param {string} name - The display name of the collection (e.g. "Color", "Spacing").
 * @param {string[]} modeNames - Ordered list of mode names (e.g. ["Light", "Dark"] or ["Value"]).
 * @returns {Promise<{
 *   collection: VariableCollection,
 *   modeIds: Record<string, string>
 * }>}
 *   `modeIds` maps each mode name to its modeId string.
 */
async function createVariableCollection(name, modeNames) {
  if (!modeNames || modeNames.length === 0) {
    throw new Error('createVariableCollection: modeNames must have at least one entry.')
  }

  // Create the collection — Figma always creates it with one mode named "Mode 1".
  const collection = figma.variables.createVariableCollection(name)

  // modeIds accumulator
  const modeIds = {}

  // Rename the default first mode
  const defaultMode = collection.modes[0]
  collection.renameMode(defaultMode.modeId, modeNames[0])
  modeIds[modeNames[0]] = defaultMode.modeId

  // Add additional modes
  for (let i = 1; i < modeNames.length; i++) {
    const newModeId = collection.addMode(modeNames[i])
    modeIds[modeNames[i]] = newModeId
  }

  return { collection, modeIds }
}

/**
 * createSemanticTokens
 *
 * Creates a batch of Figma variables in the given collection, one per entry in
 * `tokenMap`. Supports raw values, variable alias references, code syntax, and
 * scopes. Returns a map of token name → Variable for use in subsequent steps.
 *
 * @param {VariableCollection} collection - The target variable collection.
 * @param {Record<string, string>} modeIds - Map of {modeName: modeId} from createVariableCollection.
 * @param {Array<{
 *   name: string,
 *   type: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN' | 'TIMING' | 'EASING',
 *   values: Record<string, string | number | boolean | MotionEasing | {type: 'VARIABLE_ALIAS', id: string}>,
 *   scopes?: VariableScope[],
 *   codeSyntax?: {WEB?: string, ANDROID?: string, iOS?: string}
 * }>} tokenMap - Ordered list of token definitions.
 *   - `name`: Variable name using slash hierarchy (e.g. "color/bg/primary").
 *   - `type`: Figma variable type.
 *   - `values`: Map of {modeName: value}. Values can be raw (hex string for COLOR,
 *     number for FLOAT) or alias objects {type: 'VARIABLE_ALIAS', id: variableId}.
 *     For COLOR, raw values are accepted as hex strings ("#rrggbb" or "#rrggbbaa")
 *     and converted to {r, g, b, a} automatically.
 *   - `scopes`: Array of VariableScope strings. Omit to use [] (hidden/primitive).
 *   - `codeSyntax`: Platform code syntax strings. Omit to skip.
 * @returns {Promise<{variables: Record<string, Variable>}>}
 *   `variables` maps each token name to its created Variable object.
 */
async function createSemanticTokens(collection, modeIds, tokenMap) {
  const variables = {}

  for (const token of tokenMap) {
    // Create the variable
    const variable = figma.variables.createVariable(token.name, collection, token.type)

    // Set values for each mode
    for (const [modeName, rawValue] of Object.entries(token.values)) {
      const modeId = modeIds[modeName]
      if (!modeId) {
        throw new Error(
          `createSemanticTokens: mode "${modeName}" not found in modeIds for token "${token.name}". ` +
            `Available modes: ${Object.keys(modeIds).join(', ')}`,
        )
      }

      let value = rawValue

      // Convert hex strings to Figma RGBA for COLOR type
      if (token.type === 'COLOR' && typeof rawValue === 'string' && rawValue.startsWith('#')) {
        value = hexToFigmaColor(rawValue)
      }

      variable.setValueForMode(modeId, value)
    }

    // Set scopes (default: empty array = hidden from property pickers / primitives)
    variable.scopes = token.scopes || []

    // Set code syntax per platform
    if (token.codeSyntax) {
      if (token.codeSyntax.WEB) {
        variable.setVariableCodeSyntax('WEB', token.codeSyntax.WEB)
      }
      if (token.codeSyntax.ANDROID) {
        variable.setVariableCodeSyntax('ANDROID', token.codeSyntax.ANDROID)
      }
      if (token.codeSyntax.iOS) {
        variable.setVariableCodeSyntax('iOS', token.codeSyntax.iOS)
      }
    }

    variables[token.name] = variable
  }

  return { variables }
}

/**
 * Converts a hex color string to a Figma RGBA object.
 * Supports "#rgb", "#rrggbb", and "#rrggbbaa".
 *
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number, a: number }}
 */
function hexToFigmaColor(hex) {
  let h = hex.replace('#', '')

  // Expand shorthand #rgb → #rrggbb
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('')
  }

  const r = parseInt(h.substring(0, 2), 16) / 255
  const g = parseInt(h.substring(2, 4), 16) / 255
  const b = parseInt(h.substring(4, 6), 16) / 255
  const a = h.length === 8 ? parseInt(h.substring(6, 8), 16) / 255 : 1

  return { r, g, b, a }
}


const source={"status":"experimental, separado y no publicado","source":"assets/paleta-base.json y herramientas del laboratorio","primitives":[{"name":"cat/fire","css":"--meli-cat-fire","value":"#f85239","type":"COLOR","scopes":[]},{"name":"cat/shadow","css":"--meli-cat-shadow","value":"#cf3433","type":"COLOR","scopes":[]},{"name":"cat/deep","css":"--meli-cat-deep","value":"#9f292e","type":"COLOR","scopes":[]},{"name":"ink","css":"--meli-ink","value":"#0b0b0f","type":"COLOR","scopes":[]},{"name":"ink-soft","css":"--meli-ink-soft","value":"#15151b","type":"COLOR","scopes":[]},{"name":"ink-raised","css":"--meli-ink-raised","value":"#1d1d24","type":"COLOR","scopes":[]},{"name":"milk","css":"--meli-milk","value":"#fff8f0","type":"COLOR","scopes":[]},{"name":"paper","css":"--meli-paper","value":"#fffdf9","type":"COLOR","scopes":[]},{"name":"oat","css":"--meli-oat","value":"#eee4d8","type":"COLOR","scopes":[]},{"name":"stone","css":"--meli-stone","value":"#a99f96","type":"COLOR","scopes":[]},{"name":"growth","css":"--meli-growth","value":"#71d5a1","type":"COLOR","scopes":[]},{"name":"info","css":"--meli-info","value":"#79b9ff","type":"COLOR","scopes":[]},{"name":"pending","css":"--meli-pending","value":"#f6c65b","type":"COLOR","scopes":[]},{"name":"danger","css":"--meli-danger","value":"#ff6b7a","type":"COLOR","scopes":[]},{"name":"border/light","css":"--meli-border-light","value":{"r":0.043137254901960784,"g":0.043137254901960784,"b":0.058823529411764705,"a":0.14},"type":"COLOR","scopes":[]},{"name":"border/dark","css":"--meli-border-dark","value":{"r":1,"g":0.9725490196078431,"b":0.9411764705882353,"a":0.14},"type":"COLOR","scopes":[]}],"semantic":[{"name":"color/bg/primary","light":"milk","dark":"ink","scopes":["FRAME_FILL","SHAPE_FILL"],"css":"--gp-lab-color-bg-primary"},{"name":"color/bg/surface","light":"paper","dark":"ink-soft","scopes":["FRAME_FILL","SHAPE_FILL"],"css":"--gp-lab-color-bg-surface"},{"name":"color/bg/raised","light":"oat","dark":"ink-raised","scopes":["FRAME_FILL","SHAPE_FILL"],"css":"--gp-lab-color-bg-raised"},{"name":"color/bg/action","light":"cat/fire","dark":"cat/fire","scopes":["FRAME_FILL","SHAPE_FILL"],"css":"--gp-lab-color-bg-action"},{"name":"color/text/primary","light":"ink","dark":"milk","scopes":["TEXT_FILL"],"css":"--gp-lab-color-text-primary"},{"name":"color/text/secondary","light":"cat/deep","dark":"oat","scopes":["TEXT_FILL"],"css":"--gp-lab-color-text-secondary"},{"name":"color/text/on-action","light":"ink","dark":"ink","scopes":["TEXT_FILL"],"css":"--gp-lab-color-text-on-action"},{"name":"color/icon/primary","light":"ink","dark":"milk","scopes":["SHAPE_FILL","STROKE_COLOR"],"css":"--gp-lab-color-icon-primary"},{"name":"color/icon/on-action","light":"ink","dark":"ink","scopes":["SHAPE_FILL","STROKE_COLOR"],"css":"--gp-lab-color-icon-on-action"},{"name":"color/icon/secondary","light":"cat/deep","dark":"oat","scopes":["SHAPE_FILL","STROKE_COLOR"],"css":"--gp-lab-color-icon-secondary"},{"name":"color/border/strong","light":"ink","dark":"milk","scopes":["STROKE_COLOR"],"css":"--gp-lab-color-border-strong"},{"name":"color/border/subtle","light":"border/light","dark":"border/dark","scopes":["STROKE_COLOR"],"css":"--gp-lab-color-border-subtle"},{"name":"color/feedback/confirmed","light":"growth","dark":"growth","scopes":["FRAME_FILL","SHAPE_FILL"],"css":"--gp-lab-color-feedback-confirmed"},{"name":"color/feedback/pending","light":"pending","dark":"pending","scopes":["FRAME_FILL","SHAPE_FILL"],"css":"--gp-lab-color-feedback-pending"},{"name":"color/feedback/info","light":"info","dark":"info","scopes":["FRAME_FILL","SHAPE_FILL"],"css":"--gp-lab-color-feedback-info"},{"name":"color/feedback/danger","light":"danger","dark":"danger","scopes":["FRAME_FILL","SHAPE_FILL","STROKE_COLOR"],"css":"--gp-lab-color-feedback-danger"},{"name":"color/shadow/pixel","light":"cat/shadow","dark":"cat/shadow","scopes":["EFFECT_COLOR"],"css":"--gp-lab-color-shadow-pixel"},{"name":"color/shadow/ink","light":"ink","dark":"ink","scopes":["EFFECT_COLOR"],"css":"--gp-lab-color-shadow-ink"}],"metrics":[{"name":"spacing/none","value":0,"css":"--gp-lab-spacing-none","scopes":["GAP"]},{"name":"spacing/xs","value":4,"css":"--gp-lab-spacing-xs","scopes":["GAP"]},{"name":"spacing/sm","value":8,"css":"--gp-lab-spacing-sm","scopes":["GAP"]},{"name":"spacing/compact","value":12,"css":"--gp-lab-spacing-compact","scopes":["GAP"]},{"name":"spacing/md","value":16,"css":"--gp-lab-spacing-md","scopes":["GAP"]},{"name":"spacing/lg","value":24,"css":"--gp-lab-spacing-lg","scopes":["GAP"]},{"name":"spacing/xl","value":32,"css":"--gp-lab-spacing-xl","scopes":["GAP"]},{"name":"spacing/2xl","value":48,"css":"--gp-lab-spacing-2xl","scopes":["GAP"]},{"name":"spacing/section","value":80,"css":"--gp-lab-spacing-section","scopes":["GAP"]},{"name":"radius/none","value":0,"css":"--gp-lab-radius-none","scopes":["CORNER_RADIUS"]},{"name":"radius/sm","value":8,"css":"--meli-radius-sm","scopes":["CORNER_RADIUS"]},{"name":"radius/md","value":16,"css":"--meli-radius-md","scopes":["CORNER_RADIUS"]},{"name":"radius/lg","value":24,"css":"--meli-radius-lg","scopes":["CORNER_RADIUS"]},{"name":"radius/xl","value":32,"css":"--meli-radius-xl","scopes":["CORNER_RADIUS"]},{"name":"border/width","value":2,"css":"--gp-lab-border-width","scopes":["STROKE_FLOAT"]},{"name":"target/minimum","value":44,"css":"--gp-lab-target-minimum","scopes":["WIDTH_HEIGHT"]}],"styles":[{"name":"Display/Hero","size":64,"line":68,"font":{"family":"Recursive","style":"Sans Casual Black Italic","variationSettings":{"wght":850,"MONO":0,"CASL":0.5,"slnt":-8,"CRSV":0.5}}},{"name":"Heading/1","size":40,"line":46,"font":{"family":"Recursive","style":"Sans Casual Black Italic","variationSettings":{"wght":850,"MONO":0,"CASL":0.5,"slnt":-8,"CRSV":0.5}}},{"name":"Heading/2","size":24,"line":30,"font":{"family":"Recursive","style":"Sans Linear Bold","variationSettings":{"wght":700,"MONO":0,"CASL":0,"slnt":0,"CRSV":0}}},{"name":"Body/Medium","size":16,"line":24,"font":{"family":"Recursive","style":"Sans Linear","variationSettings":{"wght":400,"MONO":0,"CASL":0,"slnt":0,"CRSV":0}}},{"name":"Body/Small","size":14,"line":21,"font":{"family":"Recursive","style":"Sans Linear","variationSettings":{"wght":400,"MONO":0,"CASL":0,"slnt":0,"CRSV":0}}},{"name":"Label/Action","size":14,"line":20,"font":{"family":"Recursive","style":"Sans Linear Bold","variationSettings":{"wght":700,"MONO":0,"CASL":0,"slnt":0,"CRSV":0}}},{"name":"Code/Metadata","size":11,"line":17,"font":{"family":"Recursive","style":"Mono Linear Medium","variationSettings":{"wght":500,"MONO":1,"CASL":0,"slnt":0,"CRSV":0}}},{"name":"Amount/Large","size":48,"line":54,"font":{"family":"Recursive","style":"Sans Casual Black Italic","variationSettings":{"wght":850,"MONO":0,"CASL":0.5,"slnt":-8,"CRSV":0.5}}}]};
const collections=await figma.variables.getLocalVariableCollectionsAsync();
const existingVars=await figma.variables.getLocalVariablesAsync();
async function ensureCollection(name,modes){const old=collections.find(c=>c.name===name);return old?{collection:old,modeIds:Object.fromEntries(old.modes.map(m=>[m.name,m.modeId]))}:await createVariableCollection(name,modes)}
async function ensureTokens(c,defs){const missing=defs.filter(d=>!existingVars.some(v=>v.name===d.name&&v.variableCollectionId===c.collection.id));const made=await createSemanticTokens(c.collection,c.modeIds,missing);const variables={...Object.fromEntries(existingVars.filter(v=>v.variableCollectionId===c.collection.id).map(v=>[v.name,v])),...made.variables};return variables}
const primitives=await ensureCollection('Primitives',['Value']);
const p=await ensureTokens(primitives,source.primitives.map(t=>({name:t.name,type:t.type,values:{Value:t.value},scopes:t.scopes,codeSyntax:{WEB:'var('+t.css+')'}})));
const colors=await ensureCollection('Color',['Light','Dark']);
const c=await ensureTokens(colors,source.semantic.map(t=>({name:t.name,type:'COLOR',values:{Light:{type:'VARIABLE_ALIAS',id:p[t.light].id},Dark:{type:'VARIABLE_ALIAS',id:p[t.dark].id}},scopes:t.scopes,codeSyntax:{WEB:'var('+t.css+')'}})));
const metric=await ensureCollection('Metrics',['Value']);
const m=await ensureTokens(metric,source.metrics.map(t=>({name:t.name,type:'FLOAT',values:{Value:t.value},scopes:t.scopes,codeSyntax:{WEB:'var('+t.css+')'}})));
await Promise.all(source.styles.map(s=>figma.loadFontAsync(s.font)));
const oldStyles=await figma.getLocalTextStylesAsync(),textStyles=[];
for(const definition of source.styles){let s=oldStyles.find(t=>t.name===definition.name);if(!s){s=figma.createTextStyle();s.name=definition.name;s.fontName=definition.font;s.fontSize=definition.size;s.lineHeight={value:definition.line,unit:'PIXELS'};s.letterSpacing={value:0,unit:'PIXELS'};}textStyles.push({id:s.id,name:s.name,font:s.fontName,size:s.fontSize,lineHeight:s.lineHeight})}
const oldEffects=await figma.getLocalEffectStylesAsync(),effectStyles=[];
for(const [name,key,offset] of [['Shadow/Pixel','color/shadow/pixel',4],['Shadow/Ink','color/shadow/ink',6]]){let s=oldEffects.find(t=>t.name===name);if(!s){s=figma.createEffectStyle();s.name=name;s.effects=[figma.variables.setBoundVariableForEffect({type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:1},offset:{x:offset,y:offset},radius:0,spread:0,visible:true,blendMode:'NORMAL'},'color',c[key])];}effectStyles.push({id:s.id,name:s.name,effects:s.effects})}
const all=[...Object.values(p),...Object.values(c),...Object.values(m)],known=new Set(all.map(v=>v.id));
const bad=all.filter(v=>v.scopes.includes('ALL_SCOPES')||!v.codeSyntax.WEB||Object.values(v.valuesByMode).some(x=>x&&x.type==='VARIABLE_ALIAS'&&!known.has(x.id)));
if(bad.length)throw Error('Invalid foundations: '+bad.map(v=>v.name));
return {collections:[primitives,colors,metric].map(c=>({id:c.collection.id,name:c.collection.name,modes:c.collection.modes})),variables:all.map(v=>({id:v.id,name:v.name,collection:v.variableCollectionId,scopes:v.scopes,codeSyntax:v.codeSyntax,valuesByMode:v.valuesByMode})),textStyles,effectStyles,createdNodeIds:[],counts:{primitives:Object.keys(p).length,semantic:Object.keys(c).length,metrics:Object.keys(m).length,textStyles:textStyles.length,effectStyles:effectStyles.length},invalid:bad.length};