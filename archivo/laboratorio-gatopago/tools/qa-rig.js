async (page) => {
 const base='file:///C:/Users/danie/OneDrive/Desktop/parmelia-landing/parmelia-landing/recursos/laboratorio-gatopago/01-animaciones/rig-controlado/index.html';
 const ids=['cola','siesta','asomarse','reparar-rail','intercambio'],results=[];
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
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
   const final=await page.locator('#after').getAttribute('src');
   const frames=await page.locator('#frames img').count();
   if(!final.endsWith('/'+String(frames).padStart(2,'0')+'.png'))throw Error('El slider no llega al último frame '+id);
   await page.locator('#reset').click();
   if(await page.locator('#phase').inputValue()!=='0')throw Error('Inicio no vuelve a cero');
   await page.locator('.comparison').screenshot({path:'recursos/laboratorio-gatopago/.qa/rig/'+id+'-'+width+'.png'});
   await page.locator('#play').click();
   await page.waitForTimeout(240);
   const advanced=Number(await page.locator('#phase').inputValue())>0;
   await page.locator('#play').click();
   const paused=await page.locator('#phase').inputValue();await page.waitForTimeout(180);
   if(!advanced||await page.locator('#phase').inputValue()!==paused)throw Error('Reproducción/pausa falló '+id);
   results.push({id,width,frames,lastFrame:final,initial,advances:advanced,pauseStable:true});
  }
 }
 await page.setViewportSize({width:1280,height:920});
 const holds=[];
 for(const id of ['asomarse','reparar-rail','intercambio']){
  await page.locator('#animation').selectOption(id);await page.waitForFunction(()=>!document.querySelector('#play').disabled);
  await page.locator('#speed').selectOption('2');await page.locator('#play').click();
  await page.waitForFunction(()=>document.querySelector('#phase').value==='1000'&&document.querySelector('#play').getAttribute('aria-pressed')==='false');
  const final=await page.locator('#after').getAttribute('src');await page.waitForTimeout(250);
  if(await page.locator('#after').getAttribute('src')!==final)throw Error('Se reinició la acción '+id);
  holds.push({id,phase:1000,holdsFinal:true,frame:final});
 }
 await page.locator('#animation').selectOption('siesta');await page.waitForFunction(()=>!document.querySelector('#play').disabled);
 await page.locator('#play').click();await page.waitForTimeout(200);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.waitForFunction(()=>document.querySelector('#play').getAttribute('aria-pressed')==='false');
 const reducedPhase=await page.locator('#phase').inputValue();await page.waitForTimeout(200);
 if(await page.locator('#phase').inputValue()!==reducedPhase)throw Error('Movimiento reducido no detuvo el frame');
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.locator('#background').click();
 if(!await page.locator('body').evaluate(n=>n.classList.contains('dark')))throw Error('Tema oscuro falló');
 await page.locator('#zoom').click();
 const zoom=await page.locator('.stage.zoomed').count();if(zoom!==2)throw Error('Detalle no se activó');
 await page.locator('#zoom').click();await page.locator('#reset').click();
 if(errors.length)throw Error(errors.join('; '));
 const result={screens:results,oneShot:holds,reducedMotionStops:true,zoomStages:zoom,pageErrors:errors,scope:'controles, carga y ejecución real en Chrome; no prueba aprobación artística'};
 await page.evaluate(result=>window.__gpRigAudit=result,result);
 return result;
}
