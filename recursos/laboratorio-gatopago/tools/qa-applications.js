async (page) => {
 const base='file:///C:/Users/danie/OneDrive/Desktop/parmelia-landing/parmelia-landing/recursos/laboratorio-gatopago/06-aplicaciones/';
 const results=[];
 for(const width of [390,1280])for(const file of ['index.html','comprobante/index.html','notificaciones/index.html','correo/actualizacion.html']){
  await page.setViewportSize({width,height:920});await page.goto(base+file);
  const check=await page.evaluate(async()=>{
   document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');
   await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));
   const ids=[...document.querySelectorAll('[id]')].map(n=>n.id);
   return {title:document.title,noOverflow:document.documentElement.scrollWidth<=innerWidth,duplicateIds:ids.filter((id,i)=>ids.indexOf(id)!==i),loadedFonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family),images:[...document.images].every(i=>i.complete&&i.naturalWidth>0)};
  });
  if(!check.noOverflow||check.duplicateIds.length||!check.images)throw Error(JSON.stringify(check));
  await page.screenshot({path:`recursos/laboratorio-gatopago/.qa/applications/${file.split('/')[0].replace('.html','')}-${width}.png`,fullPage:true});
  results.push({file,width,...check});
 }
 await page.goto(base+'social/camino.svg');
 const editable=await page.evaluate(async()=>{await document.fonts.ready;return {texts:document.querySelectorAll('text').length,fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family)}});
 if(editable.texts<6||editable.fonts.length<3)throw Error('SVG: fuente o texto faltante');
 const result={checkedAt:new Date().toISOString(),screens:results,editableSVG:editable};
 await page.evaluate(r=>window.__gpApplicationViewAudit=r,result);
 return result;
}
