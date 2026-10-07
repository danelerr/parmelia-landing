async(page)=>{
 const base='file:///C:/Users/danie/OneDrive/Desktop/parmelia-landing/parmelia-landing/archivo/laboratorio-gatopago/01-animaciones/originales/index.html';
 const results=[],screens=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.bringToFront();const cdp=await page.context().newCDPSession(page);const window=await cdp.send('Browser.getWindowForTarget');await cdp.send('Browser.setWindowBounds',{windowId:window.windowId,bounds:{windowState:'normal'}});await cdp.detach();
 await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1280,height:920});await page.goto(base);
 const rafSamples=await page.evaluate(()=>new Promise(resolve=>{const a=[];function sample(t){a.push(t);if(a.length===8)resolve(a);else requestAnimationFrame(sample)}requestAnimationFrame(sample)}));
 const rafIntervals=rafSamples.slice(1).map((t,i)=>t-rafSamples[i]);if(Math.max(...rafIntervals)>100)throw Error('Ventana limitada/oculta: intervalos RAF '+JSON.stringify(rafIntervals));
 const ids=await page.locator('#action option').evaluateAll(nodes=>nodes.map(n=>n.value));
 for(const id of ids){
  await page.locator('#action').selectOption(id);await page.waitForFunction(()=>!document.querySelector('#play').disabled);
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()))});
  const initial=await page.evaluate(()=>({noOverflow:document.documentElement.scrollWidth<=innerWidth,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0),font:[...document.fonts].some(f=>f.family==='Recursive'&&f.status==='loaded'),paused:document.querySelector('#play').getAttribute('aria-pressed')==='false'}));
  if(!Object.values(initial).every(Boolean))throw Error(JSON.stringify({id,initial}));
  await page.locator('#size').selectOption('128');
  await page.locator('.stage').screenshot({path:'archivo/laboratorio-gatopago/.qa/originals/runtime-'+id+'.png'});
  await page.locator('#speed').selectOption('1');await page.locator('#play').click();
  await page.waitForFunction(()=>document.querySelector('#play').getAttribute('aria-pressed')==='false');
  const trail=await page.evaluate(()=>window.__gpOriginalTrail);
  const expected=await page.locator('#timeline button').count();
  const observed=new Set(trail.map(t=>t.index));if(observed.size!==expected)throw Error('Se saltó un paso de '+id+': '+observed.size+'/'+expected);
  const final=await page.locator('#sprite').getAttribute('src'),status=await page.locator('#status').innerText();
  await page.waitForTimeout(120);if(await page.locator('#sprite').getAttribute('src')!==final)throw Error('No conserva parada '+id);
  results.push({id,expectedSteps:expected,observedSteps:observed.size,initial,trail,final,status,stopsAfterOneCycle:true});
 }
 for(const width of [390,1280]){
  await page.setViewportSize({width,height:920});await page.locator('#action').selectOption('caminata');await page.waitForFunction(()=>!document.querySelector('#play').disabled);
  const noOverflow=await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth);if(!noOverflow)throw Error('Overflow '+width);
  await page.locator('#frame').fill('5');const final=await page.locator('#sprite').getAttribute('src');
  await page.locator('#prev').click();const previous=await page.locator('#sprite').getAttribute('src');
  await page.locator('#next').click();if(await page.locator('#sprite').getAttribute('src')!==final||previous===final)throw Error('Pasos anterior/siguiente fallaron');
  await page.locator('#reset').click();
  await page.screenshot({path:'archivo/laboratorio-gatopago/.qa/originals/gallery-'+width+'.png'});
  screens.push({width,noOverflow,stepControls:true});
 }
 await page.locator('#single').uncheck();await page.locator('#play').click();await page.waitForTimeout(150);
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('#play').getAttribute('aria-pressed')==='false');
 const before=await page.locator('#frame').inputValue();await page.waitForTimeout(150);
 if(before!==await page.locator('#frame').inputValue())throw Error('Reducción no detiene');
 await page.emulateMedia({reducedMotion:'no-preference'});
 if(errors.length)throw Error(errors.join('; '));
 const result={checkedAt:new Date().toISOString(),results,screens,rafIntervals,reducedMotionStops:true,pageErrors:errors,scope:'Reproducción real, todos los pasos y controles; muestreo RAF de esta sesión Chrome, no aprobación artística ni rendimiento móvil'};
 await page.evaluate(result=>window.__gpOriginalAudit=result,result);return {sequences:results.length,steps:results.reduce((n,a)=>n+a.observedSteps,0),screens,reducedMotionStops:true,pageErrors:errors};
}
