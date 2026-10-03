async (page) => {
 const base='file:///C:/Users/danie/OneDrive/Desktop/parmelia-landing/parmelia-landing/recursos/laboratorio-gatopago/01-animaciones/rig-raster/index.html';
 const ids=['cola','siesta','asomarse','reparar-rail','intercambio'],results=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.bringToFront();const cdp=await page.context().newCDPSession(page);const window=await cdp.send('Browser.getWindowForTarget');await cdp.send('Browser.setWindowBounds',{windowId:window.windowId,bounds:{windowState:'normal'}});await cdp.detach();
 await page.emulateMedia({reducedMotion:'no-preference'});
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:920});await page.goto(base);
  for(const id of ids){
   await page.locator('#animation').selectOption(id);
   await page.waitForFunction(()=>!document.querySelector('#play').disabled);
   await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()))});
   const initial=await page.evaluate(()=>({noOverflow:document.documentElement.scrollWidth<=innerWidth,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0),playing:document.querySelector('#play').getAttribute('aria-pressed'),font:[...document.fonts].some(f=>f.family==='Recursive'&&f.status==='loaded')}));
   if(!initial.noOverflow||!initial.images||!initial.font||initial.playing!=='false')throw Error(JSON.stringify({id,width,initial}));
   await page.locator('#phase').fill('1000');
   const final=await page.locator('#after').getAttribute('src'),frames=await page.locator('#frames img').count();
   if(!final.endsWith('/'+String(frames).padStart(2,'0')+'.png'))throw Error('Último frame inaccesible '+id);
   await page.locator('#reset').click();if(await page.locator('#phase').inputValue()!=='0')throw Error('Inicio falló');
   await page.locator('.comparison').screenshot({path:'recursos/laboratorio-gatopago/.qa/raster-rig/'+id+'-'+width+'.png'});
   await page.locator('#play').click();await page.waitForTimeout(300);
   const advances=Number(await page.locator('#phase').inputValue())>0;
   await page.locator('#play').click();const paused=await page.locator('#phase').inputValue();await page.waitForTimeout(160);
   if(!advances||await page.locator('#phase').inputValue()!==paused)throw Error('Reproducción/pausa falló '+id);
   results.push({id,width,frames,lastFrame:final,initial,advances,pauseStable:true});
  }
 }
 const holds=[];
 for(const id of ['asomarse','reparar-rail','intercambio']){
  await page.locator('#animation').selectOption(id);await page.waitForFunction(()=>!document.querySelector('#play').disabled);
  await page.locator('#speed').selectOption('2');await page.locator('#play').click();
  await page.waitForFunction(()=>document.querySelector('#phase').value==='1000'&&document.querySelector('#play').getAttribute('aria-pressed')==='false');
  const final=await page.locator('#after').getAttribute('src');await page.waitForTimeout(200);
  if(await page.locator('#after').getAttribute('src')!==final)throw Error('La acción reinicia '+id);
  holds.push({id,holdsFinal:true,phase:1000,frame:final});
 }
 await page.locator('#animation').selectOption('siesta');await page.waitForFunction(()=>!document.querySelector('#play').disabled);
 await page.locator('#play').click();await page.waitForTimeout(200);await page.emulateMedia({reducedMotion:'reduce'});
 await page.waitForFunction(()=>document.querySelector('#play').getAttribute('aria-pressed')==='false');
 const reducedPhase=await page.locator('#phase').inputValue();await page.waitForTimeout(180);
 if(await page.locator('#phase').inputValue()!==reducedPhase)throw Error('Movimiento reducido no detiene');
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.locator('#background').click();if(!await page.locator('body').evaluate(n=>n.classList.contains('dark')))throw Error('Tema oscuro falló');
 await page.locator('#zoom').click();const zoomStages=await page.locator('.stage.zoomed').count();if(zoomStages!==2)throw Error('Detalle falló');
 await page.locator('#zoom').click();await page.locator('#reset').click();
 if(errors.length)throw Error(errors.join('; '));
 const result={checkedAt:new Date().toISOString(),screens:results,oneShot:holds,reducedMotionStops:true,zoomStages,pageErrors:errors,scope:'Chrome visible sin limitación deliberada: carga y controles; no certifica aprobación artística ni rendimiento en otros dispositivos'};
 await page.evaluate(result=>window.__gpRasterAudit=result,result);
 return result;
}
