import {readFile,writeFile} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const skill='C:/Users/danie/.codex/plugins/cache/openai-curated-remote/figma/15.0.0/skills/figma-generate-library';
const canonical=JSON.parse(await readFile(join(lab,'assets/paleta-base.json'),'utf8')).tokens;
const primitives=Object.entries(canonical).filter(([,v])=>/^#[a-f\d]{6}$/i.test(v)).map(([css,value])=>({name:css.replace('--meli-','').replace('cat-','cat/'),css,value,type:'COLOR',scopes:[]}));
primitives.push({name:'border/light',css:'--meli-border-light',value:{r:11/255,g:11/255,b:15/255,a:.14},type:'COLOR',scopes:[]},{name:'border/dark',css:'--meli-border-dark',value:{r:1,g:248/255,b:240/255,a:.14},type:'COLOR',scopes:[]});
const pairs=[
 ['bg/primary','milk','ink',['FRAME_FILL','SHAPE_FILL']],
 ['bg/surface','paper','ink-soft',['FRAME_FILL','SHAPE_FILL']],
 ['bg/raised','oat','ink-raised',['FRAME_FILL','SHAPE_FILL']],
 ['bg/action','cat/fire','cat/fire',['FRAME_FILL','SHAPE_FILL']],
 ['text/primary','ink','milk',['TEXT_FILL']],
 ['text/secondary','cat/deep','oat',['TEXT_FILL']],
 ['text/on-action','ink','ink',['TEXT_FILL']],
 ['icon/primary','ink','milk',['SHAPE_FILL','STROKE_COLOR']],
 ['icon/on-action','ink','ink',['SHAPE_FILL','STROKE_COLOR']],
 ['icon/secondary','cat/deep','oat',['SHAPE_FILL','STROKE_COLOR']],
 ['border/strong','ink','milk',['STROKE_COLOR']],
 ['border/subtle','border/light','border/dark',['STROKE_COLOR']],
 ['feedback/confirmed','growth','growth',['FRAME_FILL','SHAPE_FILL']],
 ['feedback/pending','pending','pending',['FRAME_FILL','SHAPE_FILL']],
 ['feedback/info','info','info',['FRAME_FILL','SHAPE_FILL']],
 ['feedback/danger','danger','danger',['FRAME_FILL','SHAPE_FILL','STROKE_COLOR']],
 ['shadow/pixel','cat/shadow','cat/shadow',['EFFECT_COLOR']],
 ['shadow/ink','ink','ink',['EFFECT_COLOR']]
];
const semantic=pairs.map(([name,light,dark,scopes])=>({name:'color/'+name,light,dark,scopes,css:'--gp-lab-color-'+name.replaceAll('/','-')}));
const metrics=[...[[0,'none'],[4,'xs'],[8,'sm'],[12,'compact'],[16,'md'],[24,'lg'],[32,'xl'],[48,'2xl'],[80,'section']].map(([value,name])=>({name:'spacing/'+name,value,css:'--gp-lab-spacing-'+name,scopes:['GAP']})),{name:'radius/none',value:0,css:'--gp-lab-radius-none',scopes:['CORNER_RADIUS']},...[['sm',8],['md',16],['lg',24],['xl',32]].map(([name,value])=>({name:'radius/'+name,value,css:'--meli-radius-'+name,scopes:['CORNER_RADIUS']})),{name:'border/width',value:2,css:'--gp-lab-border-width',scopes:['STROKE_FLOAT']},{name:'target/minimum',value:44,css:'--gp-lab-target-minimum',scopes:['WIDTH_HEIGHT']}];
const axes=(wght=400,MONO=0,CASL=0,slnt=0)=>({wght,MONO,CASL,slnt,CRSV:slnt?.5:0});
const styles=[
 ['Display/Hero',64,68,'Sans Casual Black Italic',axes(850,0,.5,-8)],
 ['Heading/1',40,46,'Sans Casual Black Italic',axes(850,0,.5,-8)],
 ['Heading/2',24,30,'Sans Linear Bold',axes(700)],
 ['Body/Medium',16,24,'Sans Linear',axes()],
 ['Body/Small',14,21,'Sans Linear',axes()],
 ['Label/Action',14,20,'Sans Linear Bold',axes(700)],
 ['Code/Metadata',11,17,'Mono Linear Medium',axes(500,1)],
 ['Amount/Large',48,54,'Sans Casual Black Italic',axes(850,0,.5,-8)]
].map(([name,size,line,style,variationSettings])=>({name,size,line,font:{family:'Recursive',style,variationSettings}}));
const source={status:'experimental, separado y no publicado',source:'assets/paleta-base.json y herramientas del laboratorio',primitives,semantic,metrics,styles};
await writeFile(join(lab,'03-editable/tokens-source.json'),JSON.stringify(source,null,2));
const css=[':root {',...primitives.map(p=>`  ${p.css}: ${typeof p.value==='string'?p.value:`rgb(${Math.round(p.value.r*255)} ${Math.round(p.value.g*255)} ${Math.round(p.value.b*255)} / ${p.value.a*100}%)`};`),...semantic.map(s=>`  ${s.css}: var(${primitives.find(p=>p.name===s.light).css});`),...metrics.map(m=>`  ${m.css}: ${m.value}px;`),'}','[data-gp-lab-theme="dark"] {',...semantic.map(s=>`  ${s.css}: var(${primitives.find(p=>p.name===s.dark).css});`),'}'].join('\n');
await writeFile(join(lab,'03-editable/tokens.css'),css);
const helpers=(await Promise.all(['createVariableCollection.js','createSemanticTokens.js'].map(f=>readFile(join(skill,'scripts',f),'utf8')))).join('\n');
// Helpers oficiales: filtrar antes de crear preserva idempotencia tras una interrupción.
const code=helpers+'\n'+`
const source=${JSON.stringify(source)};
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
return {collections:[primitives,colors,metric].map(c=>({id:c.collection.id,name:c.collection.name,modes:c.collection.modes})),variables:all.map(v=>({id:v.id,name:v.name,collection:v.variableCollectionId,scopes:v.scopes,codeSyntax:v.codeSyntax,valuesByMode:v.valuesByMode})),textStyles,effectStyles,createdNodeIds:[],counts:{primitives:Object.keys(p).length,semantic:Object.keys(c).length,metrics:Object.keys(m).length,textStyles:textStyles.length,effectStyles:effectStyles.length},invalid:bad.length};`;
await writeFile(join(lab,'03-editable/foundations.plugin.js'),code);
console.log(JSON.stringify({variables:primitives.length+semantic.length+metrics.length,styles:styles.length,code:join(lab,'03-editable/foundations.plugin.js')}));
