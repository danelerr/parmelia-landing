async(page)=>{
 const base='file:///C:/Users/danie/OneDrive/Desktop/parmelia-landing/parmelia-landing/archivo/laboratorio-gatopago/01-animaciones/';
 const ids=['cola','siesta','asomarse','reparar-rail','intercambio'],screens=[],checks=[];
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:920});await page.goto(base+'index.html');
  for(const id of ids){await page.locator('#animation').selectOption(id);await page.waitForFunction(()=>!document.querySelector('#play').disabled);await page.locator('#phase').fill('500');await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()))});
   const result=await page.evaluate(()=>({src:document.querySelector('#after').getAttribute('src'),download:document.querySelector('#proposed-download').getAttribute('href'),imagesLoaded:[...document.images].every(i=>i.complete&&i.naturalWidth>0),noOverflow:document.documentElement.scrollWidth<=innerWidth}));
   if(result.src.includes('rig-')||result.download.includes('rig-')||!result.imagesLoaded||!result.noOverflow)throw Error(JSON.stringify({id,width,result}));
   if(width===1280)await page.locator('.comparison').screenshot({path:`archivo/laboratorio-gatopago/.qa/restoration/${id}.png`});screens.push({id,width,...result});
  }
 }
 await page.goto(base+'coleccion/index.html');
 for(const id of ids){await page.locator('#animation').selectOption(id);await page.waitForFunction(()=>!document.querySelector('#play').disabled);const src=await page.locator('#after').getAttribute('src');if(!src.startsWith('../'+id+'/fotogramas/'))throw Error('La colección no restauró '+id);checks.push({id,src});}
 const result={checkedAt:new Date().toISOString(),screens,collectionRestored:checks,scope:'Cargas reales a dos anchos y referencias restauradas; no aprobación artística nueva.'};await page.evaluate(r=>window.__gpRestorationAudit=r,result);return result;
}
