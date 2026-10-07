async(page)=>{
 const base='file:///C:/Users/danie/OneDrive/Desktop/parmelia-landing/parmelia-landing/archivo/laboratorio-gatopago/01-animaciones/coleccion/index.html',downloads=[];
 for(const id of['caminata','preparando-pago','mantenimiento']){await page.goto(base);await page.locator('#animation').selectOption(id);await page.waitForFunction(()=>!document.querySelector('#play').disabled);
  for(const [i,selector] of['#original-download','#proposed-download','#sheet-download','#manifest-download','#source-download','#prompt-download','#frames figure:first-child a','#frames figure:last-child a'].entries()){
   const link=page.locator(selector),href=await link.getAttribute('href'),file='.qa/raster-actions/downloads/'+id+'-'+i+'-'+href.split('/').at(-1);await page.waitForTimeout(250);const event=page.waitForEvent('download',{timeout:8000});await link.click();const download=await event;await download.saveAs('archivo/laboratorio-gatopago/'+file);if(await download.failure())throw Error('Descarga fallida '+href);downloads.push({id,href,file,name:download.suggestedFilename()});
  }
 }
 const result={checkedAt:new Date().toISOString(),downloads,scope:'24 enlaces reales de Chrome: ocho archivos por cada acción nueva; colección no publica ni instala recursos.'};await page.evaluate(r=>window.__gpActionDownloadsAudit=r,result);return result;
}
