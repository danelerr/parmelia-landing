async (page) => {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(image => image.decode()));
  });
  await page.pdf({
    path:'recursos/laboratorio-gatopago/02-manual/manual-visual-gatopago.pdf',
    format:'A4',
    preferCSSPageSize:true,
    printBackground:true,
    tagged:true,
    margin:{top:'0',right:'0',bottom:'0',left:'0'}
  });
  return {created:'manual-visual-gatopago.pdf'};
}
