async(page)=>{
 const base='file:///C:/Users/danie/OneDrive/Desktop/parmelia-landing/parmelia-landing/recursos/laboratorio-gatopago/01-animaciones/coleccion/index.html',downloads=[];
 for(const id of['reposo','saludo','salto','meti-la-pata','oreja']){await page.goto(base);await page.locator('#animation').selectOption(id);await page.waitForFunction(()=>!document.querySelector('#play').disabled);
  for(const [i,selector] of['#original-download','#proposed-download','#sheet-download','#manifest-download','#source-download','#prompt-download','#frames figure:first-child a','#frames figure:last-child a'].entries()){
   const link=page.locator(selector),href=await link.getAttribute('href'),file='.qa/raster-gestures/downloads/'+id+'-'+i+'-'+href.split('/').at(-1);await page.waitForTimeout(250);const event=page.waitForEvent('download',{timeout:8000});await link.click();const download=await event;await download.saveAs('recursos/laboratorio-gatopago/'+file);if(await download.failure())throw Error('Descarga fallida '+href);downloads.push({id,href,file,name:download.suggestedFilename()});
  }
 }
 const result={checkedAt:new Date().toISOString(),downloads,scope:'40 enlaces reales de Chrome para cinco gestos nuevos; sin publicación ni instalación en la app.'};await page.evaluate(r=>window.__gpGestureDownloadsAudit=r,result);return result;
}
