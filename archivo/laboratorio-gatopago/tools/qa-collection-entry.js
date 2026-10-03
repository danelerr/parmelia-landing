async(page)=>{
 const main='file:///C:/Users/danie/OneDrive/Desktop/parmelia-landing/parmelia-landing/recursos/laboratorio-gatopago/index.html';
 await page.setViewportSize({width:1280,height:920});await page.goto(main);await page.evaluate(()=>document.fonts.ready);
 if(await page.locator('.tile').count()!==6)throw Error('Faltan entregables');
 if(!(await page.locator('.tile').first().textContent()).includes('814 pasos PNG'))throw Error('Índice obsoleto');
 await page.locator('.tile').first().locator('.download').click();await page.waitForFunction(()=>!document.querySelector('#play').disabled);
 const options=await page.locator('#animation option').count();if(options!==18||!page.url().endsWith('/coleccion/index.html'))throw Error('Entrada incorrecta');
 await page.locator('#animation').selectOption('comprobante');await page.waitForFunction(()=>!document.querySelector('#play').disabled);
 await page.screenshot({path:'recursos/laboratorio-gatopago/.qa/receipt/collection-entry.png'});
 const result={checkedAt:new Date().toISOString(),tiles:6,options,url:page.url(),scope:'Navegación real del índice vigente a dieciocho comparativas; no publicación.'};await page.evaluate(r=>window.__gpCollectionEntryAudit=r,result);return result;
}
