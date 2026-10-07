async (page) => {
 const base='file:///C:/Users/danie/OneDrive/Desktop/parmelia-landing/parmelia-landing/archivo/laboratorio-gatopago/05-movimiento/index.html';
 await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:390,height:920});await page.goto(base);
 const downloads=[];
 for(const id of ['ruta','conexion','confirmacion','intercambio','espera','entrada']){
  await page.locator('#motion').selectOption(id);
  for(const reduced of [false,true]){
   if(reduced)await page.locator('#reduce').click();
   const href=await page.locator('#download').getAttribute('href');
   if(href!==(reduced?'reducido/':'svg/')+id+'.svg')throw Error('Descarga apunta a otra variante');
   const event=page.waitForEvent('download');await page.locator('#download').click();const download=await event;
   await download.saveAs('archivo/laboratorio-gatopago/.qa/motion/downloads/'+(reduced?'reducido-':'animado-')+id+'.svg');
   if(await download.failure())throw Error('Descarga falló '+id);
   downloads.push({id,reduced,href,file:download.suggestedFilename()});
  }
  await page.locator('#reduce').click();
 }
 const completed=[];
 for(const id of ['confirmacion','entrada']){
  await page.locator('#motion').selectOption(id);await page.locator('#restart').click();
  await page.waitForFunction(()=>document.querySelector('#stage').getAnimations({subtree:true}).every(a=>a.playState==='finished'));
  const state=await page.locator('#stage').evaluate(n=>({states:n.getAnimations({subtree:true}).map(a=>a.playState),opacity:getComputedStyle(n.querySelector('.check,.card')).opacity,dash:getComputedStyle(n.querySelector('.check,.card')).strokeDashoffset,transform:getComputedStyle(n.querySelector('.check,.card')).transform}));
  if(state.opacity!=='1'||(id==='confirmacion'&&parseFloat(state.dash)!==0)||(id==='entrada'&&state.transform!=='matrix(1, 0, 0, 1, 0, 0)'))throw Error('No conserva el estado final '+id);
  await page.waitForTimeout(200);
  if(!await page.locator('#stage').evaluate(n=>n.getAnimations({subtree:true}).every(a=>a.playState==='finished')))throw Error('Reinicio indebido de '+id);
  completed.push({id,...state,holdsFinal:true});
 }
 const result={downloads,completed,scope:'descargas locales reales y final natural de las dos animaciones de una sola ejecución en Chrome'};
 await page.evaluate(result=>window.__gpMotionDownloads=result,result);
 return result;
}
