async (page) => {
  const base='file:///C:/Users/danie/OneDrive/Desktop/parmelia-landing/parmelia-landing/archivo/laboratorio-gatopago/';
  await page.goto(base+'06-aplicaciones/comprobante/index.html');
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()))});
  await page.setViewportSize({width:592,height:1000});
  await page.locator('.sheet').screenshot({path:'archivo/laboratorio-gatopago/06-aplicaciones/comprobante/comprobante.png'});
  await page.addStyleTag({content:'@page{size:A4;margin:0}'});
  await page.pdf({path:'archivo/laboratorio-gatopago/06-aplicaciones/comprobante/comprobante.pdf',format:'A4',preferCSSPageSize:true,printBackground:true,tagged:true});
  await page.goto(base+'06-aplicaciones/qr/imprimir.html');
  await page.addStyleTag({content:'main{position:relative;transform:none;zoom:0.94488189}html,body{height:209.8mm;overflow:hidden}'});
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()))});
  await page.pdf({path:'archivo/laboratorio-gatopago/06-aplicaciones/qr/qr-imprimible.pdf',format:'A5',preferCSSPageSize:true,printBackground:true,tagged:true});
  return {created:['comprobante/comprobante.png','comprobante/comprobante.pdf','qr/qr-imprimible.pdf']};
}
