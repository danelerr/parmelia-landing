async (page) => {
 const base='file:///C:/Users/danie/OneDrive/Desktop/parmelia-landing/parmelia-landing/archivo/laboratorio-gatopago/05-movimiento/index.html';
 const cases=[['ruta',2400],['conexion',2800],['confirmacion',650],['intercambio',2600],['espera',1800],['entrada',280]],checks=[];
 const sample=async(fraction,duration)=>page.evaluate(({fraction,duration})=>{const stage=document.querySelector('#stage');for(const a of stage.getAnimations({subtree:true})){a.pause();a.currentTime=duration*fraction;}return [...stage.querySelectorAll('.packet,.trace,.check,.out,.back,.pulse,.card')].map(n=>{const s=getComputedStyle(n);return {class:n.getAttribute('class'),transform:s.transform,opacity:Number(s.opacity),dash:s.strokeDashoffset}})},{fraction,duration});
 await page.emulateMedia({reducedMotion:'no-preference'});
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:920});await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  for(const [id,duration] of cases){
   await page.locator('#motion').selectOption(id);
   const endpoint=await sample(.85,duration);
   if(id==='ruta'){
    const tx=Number(endpoint[0].transform.match(/matrix\([^,]+,[^,]+,[^,]+,[^,]+,\s*([^,]+)/)[1]);
    if(Math.abs(tx+24-280)>.01)throw Error('El bloque no alcanza el final del rail');
   }
   if(id==='intercambio'){
    const tx=n=>Number(n.transform.match(/matrix\([^,]+,[^,]+,[^,]+,[^,]+,\s*([^,]+)/)[1]);
    if(Math.abs(tx(endpoint[0])+64-240)>.01||Math.abs(tx(endpoint[1])+240-64)>.01)throw Error('Intercambio: extremos incorrectos');
   }
   if(['ruta','conexion','intercambio'].includes(id)){
    const reset=await sample(.995,duration);if(reset.some(n=>n.opacity!==0))throw Error('Reinicio visible '+id);
   }
   await sample(.5,duration);await page.locator('#stage').screenshot({path:'archivo/laboratorio-gatopago/.qa/motion/'+id+'-'+width+'.png'});
   await page.locator('#restart').click();
   await page.locator('#pause').click();
   const states=await page.locator('#stage').evaluate(n=>n.getAnimations({subtree:true}).map(a=>a.playState));
   if(!states.length||states.some(s=>s!=='paused'))throw Error('Pausa incorrecta '+id);
   await page.locator('#pause').click();await page.locator('#restart').click();
   const restarted=await page.locator('#stage').evaluate(n=>n.getAnimations({subtree:true}).every(a=>a.currentTime<200));
   if(!restarted)throw Error('Reinicio incorrecto '+id);
   await page.emulateMedia({reducedMotion:'reduce'});
   await page.waitForFunction(()=>document.querySelector('#reduce').getAttribute('aria-pressed')==='true');
   const reduced=await page.locator('#stage').evaluate(n=>n.getAnimations({subtree:true}).length);
   if(reduced!==0||!await page.locator('#pause').isDisabled())throw Error('Reducción automática falló '+id);
   await page.locator('#stage').screenshot({path:'archivo/laboratorio-gatopago/.qa/motion/'+id+'-reduced-'+width+'.png'});
   const noOverflow=await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth);
   if(!noOverflow)throw Error('Overflow '+id+' '+width);
   checks.push({id,width,endpoint,pauseStates:states,restartFromStart:restarted,reducedAnimations:reduced,noOverflow});
   await page.emulateMedia({reducedMotion:'no-preference'});
   await page.waitForFunction(()=>document.querySelector('#reduce').getAttribute('aria-pressed')==='false');
  }
 }
 return {checks,scope:'endpoints, reinicio oculto, pausa, reinicio y preferencia del sistema en Chrome; no prueba estados financieros'};
}
