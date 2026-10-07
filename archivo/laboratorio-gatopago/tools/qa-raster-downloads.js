async(page)=>{
 const base='file:///C:/Users/danie/OneDrive/Desktop/parmelia-landing/parmelia-landing/archivo/laboratorio-gatopago/01-animaciones/rig-raster/index.html';
 await page.goto(base);const ids=await page.locator('#animation option').evaluateAll(nodes=>nodes.map(n=>n.value)),downloads=[];
 for(const id of ids){
  await page.goto(base);
  await page.locator('#animation').selectOption(id);await page.waitForFunction(()=>!document.querySelector('#play').disabled);
  const selectors=['#original-download','#proposed-download','#sheet-download','#manifest-download','#source-download','#prompt-download','#frames figure:first-child a','#frames figure:last-child a'];
  for(const [i,selector] of selectors.entries()){
   const link=page.locator(selector),href=await link.getAttribute('href'),filename=id+'-'+i+'-'+href.split('/').at(-1);
   await page.waitForTimeout(250);
   let download,attempts=0;
   while(!download&&attempts<2){attempts++;const event=page.waitForEvent('download',{timeout:5000});await link.click();try{download=await event}catch(e){if(attempts===2)throw Error('Chrome no emitió descarga para '+href)}}
   await download.saveAs('archivo/laboratorio-gatopago/.qa/raster-rig/downloads/'+filename);
   if(await download.failure())throw Error('Descarga falló '+href);
   downloads.push({id,href,file:'.qa/raster-rig/downloads/'+filename,name:download.suggestedFilename(),attempts});
  }
 }
 const result={checkedAt:new Date().toISOString(),downloads,scope:'40 enlaces reales en Chrome; WebP, hoja, manifest, escena, prompt/reglas y PNG extremos de las cinco acciones'};
 await page.evaluate(result=>window.__gpRasterDownloadsAudit=result,result);return result;
}
