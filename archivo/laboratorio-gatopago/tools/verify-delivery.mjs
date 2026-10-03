import {readFile,writeFile,stat} from 'node:fs/promises';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const json=async p=>JSON.parse(await readFile(join(lab,p),'utf8'));
const sha=b=>createHash('sha256').update(b).digest('hex');
const collection=await json('01-animaciones/coleccion/comparativas.json');
assert.equal(collection.animations.length,18);
const selection=await json('01-animaciones/seleccion-vigente.json');
assert.equal(collection.animations.reduce((n,a)=>n+a.frames,0),selection.collectionPNGSteps);
for(const id of selection.restored){const a=collection.animations.find(x=>x.id===id);assert(a.preview.startsWith('../'+id+'/'));assert(!a.preview.includes('rig-'));}
for(const a of collection.animations){
 assert.equal(a.frames,a.sequence.length);
 for(const s of a.sequence){assert.equal(sha(await readFile(resolve(lab,'01-animaciones/coleccion',s.frame))),s.sha256);if(s.thumbnail)await stat(resolve(lab,'01-animaciones/coleccion',s.thumbnail));}
 for(const k of ['source','preview','prompt','sheet','manifest'])await stat(resolve(lab,'01-animaciones/coleccion',a[k]));
}
const batches=['raster-rig','raster-actions','raster-gestures','receipt','care'];
const technical=await Promise.all(batches.map(d=>json('.qa/'+d+'/technical-verification.json')));
assert.equal(technical.reduce((n,a)=>n+a.frames,0),1058);
const restoration=await json('.qa/restoration/browser-verification.json');
assert.equal(restoration.screens.length,10);assert.equal(restoration.collectionRestored.length,5);
const previous=await json('01-animaciones/comparativas.json');
for(const a of previous.animations){const selected=collection.animations.find(x=>x.id===a.id);assert.equal(a.frames,selected.frames);assert.equal(a.totalMs,selected.totalMs);for(let i=0;i<a.sequence.length;i++)assert.equal(sha(await readFile(join(lab,'01-animaciones',a.sequence[i].frame))),selected.sequence[i].sha256);}
const browser=await json('.qa/care/browser-verification.json');
assert.equal(browser.screens.length,36);assert.deepEqual(browser.pageErrors,[]);assert(browser.reducedStops);
assert.equal(browser.runtime.reduce((n,a)=>n+a.steps.length,0),276);
for(const r of browser.runtime)assert(r.once?r.holdsFinal:r.wraps>=2);
const original=await json('.qa/originals/source-verification.json');
const pdf=await json('.qa/manual/text-check.json');assert.equal(pdf.pages.length,12);
assert.equal(sha(await readFile(join(lab,pdf.file))),pdf.sha256);

const source=await json('03-editable/tokens-source.json'),native=await json('03-editable/live-refresh.json');
assert.equal(native.variables.length,50);assert.equal(native.textStyles.length,8);assert.equal(native.effectStyles.length,2);
const byName=new Map(native.variables.map(v=>[v.name,v])),byId=new Map(native.variables.map(v=>[v.id,v]));
assert.equal(byName.size,50);
function sameValue(a,b){if(a&&typeof a==='object'){assert.deepEqual(Object.keys(a).sort(),Object.keys(b).sort());for(const k of Object.keys(a))sameValue(a[k],b[k]);}else if(typeof a==='number')assert(Math.abs(a-b)<1e-6);else assert.equal(a,b);}
function color(v){if(typeof v!=='string')return v;return{r:parseInt(v.slice(1,3),16)/255,g:parseInt(v.slice(3,5),16)/255,b:parseInt(v.slice(5,7),16)/255,a:1};}
for(const group of ['primitives','metrics','semantic'])for(const s of source[group]){
 const v=byName.get(s.name);assert(v);assert.deepEqual(v.scopes,s.scopes);assert.equal(v.codeSyntax.WEB,'var('+s.css+')');
 if(group==='semantic'){const c=native.collections.find(c=>c.variableIds.includes(v.id));for(const mode of c.modes){const ref=byName.get(s[mode.name.toLowerCase()]);assert(ref);assert.deepEqual(v.valuesByMode[mode.modeId],{type:'VARIABLE_ALIAS',id:ref.id});}}
 else for(const actual of Object.values(v.valuesByMode))sameValue(actual,group==='primitives'?color(s.value):s.value);
}
for(const v of native.variables){const walk=(id,ancestors)=>{assert(!ancestors.includes(id),'Ciclo de alias');const n=byId.get(id);assert(n,'Alias no resuelto');for(const x of Object.values(n.valuesByMode))if(x?.type==='VARIABLE_ALIAS')walk(x.id,[...ancestors,id]);};walk(v.id,[]);}
for(const s of source.styles){const n=native.textStyles.find(n=>n.name===s.name);assert(n);assert.equal(n.fontSize,s.size);assert.deepEqual(n.lineHeight,{unit:'PIXELS',value:s.line});assert.deepEqual(n.fontName,s.font);}
assert.equal(native.pageAudits.reduce((n,p)=>n+p.components.length,0),75);
assert.equal(native.pageAudits.reduce((n,p)=>n+p.sets.length,0),11);
for(const p of native.pageAudits)for(const i of p.instances)assert(i.mainComponentId);

const icons=await json('04-iconos/inventario.json'),motion=await json('05-movimiento/inventario.json'),apps=await json('06-aplicaciones/manifest.json');
assert.equal(icons.icons.length,32);assert.equal(motion.motions.length,6);assert.equal(apps.items.length,7);assert.equal(apps.files.length,22);
for(const f of apps.files)assert.equal(sha(await readFile(join(lab,'06-aplicaciones',f.file))),f.sha256);
let localReferences=0;
for(const page of ['index.html','01-animaciones/index.html','01-animaciones/coleccion/index.html','02-manual/index.html','03-editable/index.html','04-iconos/index.html','05-movimiento/index.html','06-aplicaciones/index.html']){
 const html=(await readFile(join(lab,page),'utf8')).split('<script>')[0];
 for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){if(/^(https?:|data:|#)/.test(m[1]))continue;await stat(resolve(lab,dirname(page),decodeURIComponent(m[1].split('#')[0])));localReferences++;}
}
const result={checkedAt:new Date().toISOString(),status:'seis entregables locales verificados; propuestas independientes, no aprobadas ni integradas',items:[{id:'01-animaciones',actions:18,PNGSteps:1058,browserCases:36,newStepsObservedAt1x:276,technicalAuditTimes:technical.map(a=>a.checkedAt),originalAudit:original},{id:'02-manual',pages:12,sha256:pdf.sha256},{id:'03-editable',fileKey:native.fileKey,variables:50,textStyles:8,effectStyles:2,mainComponents:75,componentSets:11,linkedInstances:native.pageAudits.reduce((n,p)=>n+p.instances.length,0),nativeReadAt:native.checkedAt},{id:'04-iconos',SVG:32},{id:'05-movimiento',animatedSVG:6,staticSVG:6},{id:'06-aplicaciones',pieces:7,downloadableFiles:22}],localReferencesChecked:localReferences,limits:['Revisión visual humana final pendiente de adopción; no bloquea la entrega de propuestas','No prueba de teléfonos físicos, clientes de correo ni impresión','Sin integración, publicación, commit, push ni despliegue']};
// Los resultados anteriores se conservan con su fecha: no se anuncian como pruebas nuevas.
result.items[0].PNGSteps=selection.collectionPNGSteps;
result.items[0].historicalBrowserCases=result.items[0].browserCases;delete result.items[0].browserCases;
result.items[0].historicalStepsObservedAt1x=result.items[0].newStepsObservedAt1x;delete result.items[0].newStepsObservedAt1x;
result.items[0].restoration={browserAudit:restoration.checkedAt,actions:selection.restored,PNGSteps:selection.principalPNGSteps,cases:10,rejected:selection.withdrawnDirectories,selection:'01-animaciones/seleccion-vigente.json'};
result.items[1].inventorySnapshot='fuentes/manual-inventory-v1.json';
result.items[5].currentQRAndReceiptVerification=await json('.qa/applications/verification.json');
result.items[5].downloadAudit=(await json('.qa/applications/download-verification.json')).checkedAt;
await writeFile(join(lab,'entrega-verificada.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify({sixDeliverablesVerified:6,actions:18,PNGSteps:selection.collectionPNGSteps,restoredActions:5,mainComponents:75,localReferencesChecked:localReferences}));
