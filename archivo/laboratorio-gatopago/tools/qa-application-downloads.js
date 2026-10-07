async (page) => {
 const base='file:///C:/Users/danie/OneDrive/Desktop/parmelia-landing/parmelia-landing/archivo/laboratorio-gatopago/06-aplicaciones/';
 await page.goto(base+'index.html');
 await page.locator('details').evaluateAll(nodes=>nodes.forEach(n=>n.open=true));
 const hrefs=await page.locator('a[download]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
 if(hrefs.length!==22||new Set(hrefs).size!==22)throw Error('Catálogo: no hay exactamente 22 fuentes únicas');
 const downloads=[];
 for(const href of hrefs){
  const event=page.waitForEvent('download');
  await page.locator(`a[download][href="${href}"]`).click();
  const download=await event;
  await download.saveAs('archivo/laboratorio-gatopago/.qa/applications/downloads/'+href);
  if(await download.failure())throw Error('Descarga falló: '+href);
  downloads.push({href,name:download.suggestedFilename()});
 }
 await page.goto(base+'notificaciones/index.html');
 for(const button of await page.locator('[data-close]').all())await button.click();
 if(await page.locator('.notification:visible').count()!==0)throw Error('Cierre no aplicado');
 if(await page.locator('#status').innerText()!=='0 ejemplos visibles.')throw Error('Estado de cierre incorrecto');
 await page.locator('#reset').click();
 if(await page.locator('.notification:visible').count()!==3)throw Error('Restauración incompleta');
 const result={downloads,notifications:{closed:3,restored:3},scope:'descargas reales mediante Chrome y controles de notificación, no envío ni impresión'};
 await page.evaluate(result=>window.__gpApplicationDownloads=result,result);
 return result;
}
