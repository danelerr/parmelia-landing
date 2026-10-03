async (page) => {
 const base='file:///C:/Users/danie/OneDrive/Desktop/parmelia-landing/parmelia-landing/recursos/laboratorio-gatopago/04-iconos/index.html',checks=[];
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:920});await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  for(const size of ['16','24','32','48']){
   await page.locator('#size').selectOption(size);
   const result=await page.evaluate(()=>{
    const icons=[...document.querySelectorAll('.icon-stage svg')],ids=[...document.querySelectorAll('[id]')].map(n=>n.id);
    return {icons:icons.length,renderedWidths:icons.map(n=>n.getBoundingClientRect().width),named:icons.every(n=>!!n.querySelector('title')?.textContent),duplicateIds:ids.filter((id,i)=>ids.indexOf(id)!==i),noOverflow:document.documentElement.scrollWidth<=innerWidth,font:[...document.fonts].some(f=>f.family==='Recursive'&&f.status==='loaded')};
   });
   if(result.icons!==32||result.renderedWidths.some(w=>Math.abs(w-Number(size))>.1)||!result.named||result.duplicateIds.length||!result.noOverflow||!result.font)throw Error(JSON.stringify(result));
   await page.screenshot({path:'recursos/laboratorio-gatopago/.qa/icons/gallery-'+width+'-'+size+'.png',fullPage:true});
   checks.push({width,size,...result});
  }
 }
 const categoryCounts=[];
 for(const category of ['pagos','cuenta','seguridad','estados','sistema','negocios']){
  await page.locator('#category').selectOption(category);
  const visible=await page.locator('.tile:visible').count();
  if(!visible||await page.locator('.tile:visible').evaluateAll(nodes=>nodes.some(n=>n.dataset.category!==document.querySelector('#category').value)))throw Error('Filtro incorrecto '+category);
  categoryCounts.push({category,visible});
 }
 if(categoryCounts.reduce((n,c)=>n+c.visible,0)!==32)throw Error('La partición por categorías no contiene 32 iconos');
 await page.locator('#category').selectOption('');await page.locator('#search').fill('precaucion');
 const accentSearch=await page.locator('.tile:visible h2').allTextContents();
 if(!accentSearch.length||accentSearch.some(t=>!t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes('precaucion')))throw Error('Búsqueda sin acento falló');
 await page.locator('#search').fill('zzzzzz');if(await page.locator('.tile:visible').count()!==0)throw Error('Búsqueda vacía no filtra');
 await page.locator('#search').fill('');await page.locator('#theme').click();
 if(!await page.locator('body').evaluate(n=>n.classList.contains('dark')))throw Error('Tema oscuro falló');
 await page.screenshot({path:'recursos/laboratorio-gatopago/.qa/icons/gallery-dark-390-48.png',fullPage:true});
 const links=await page.locator('.tile .download').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href'))),downloads=[];
 for(const href of links){
  const event=page.waitForEvent('download');await page.locator('.tile .download[href="'+href+'"]').click();const download=await event;
  const file=download.suggestedFilename();await download.saveAs('recursos/laboratorio-gatopago/.qa/icons/downloads/'+file);
  if(!file.endsWith('.svg')||await download.failure())throw Error('Descarga falló '+href);
  downloads.push({href,file});
 }
 const result={checks,categoryCounts,accentSearch,downloads,darkTheme:true,scope:'32 SVG a cuatro tamaños, etiquetas, filtros, tema y descargas reales; revisar capturas para aprobación visual'};
 await page.evaluate(result=>window.__gpIconAudit=result,result);
 return result;
}
