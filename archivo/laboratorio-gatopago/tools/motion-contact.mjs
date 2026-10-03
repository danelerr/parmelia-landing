import {readFile} from 'node:fs/promises';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..'),dir=join(lab,'.qa/motion');
const ids=['ruta','conexion','confirmacion','intercambio','espera','entrada'];
const composites=[];
for(const [i,id] of ids.entries())for(const [col,type] of ['','-reduced'].entries()){
 const file=join(dir,id+type+'-1280.png');
 const input=await sharp(await readFile(file)).resize(530,155,{fit:'contain',background:'#fff8f0'}).png().toBuffer();
 composites.push({input,left:col*550+10,top:i*185+28});
 const text=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="540" height="24"><text x="10" y="19" font-family="sans-serif" font-size="15" fill="#0b0b0f">${id} · ${type?'reducido':'animado, mitad de fase'}</text></svg>`);
 composites.push({input:text,left:col*550,top:i*185});
}
await sharp({create:{width:1100,height:1110,channels:4,background:'#fff8f0'}}).composite(composites).png().toFile(join(dir,'contacto.png'));
console.log('Revisión visual: .qa/motion/contacto.png');
