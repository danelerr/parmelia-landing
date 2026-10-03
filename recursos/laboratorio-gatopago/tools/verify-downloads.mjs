import {readFile,writeFile,readdir} from 'node:fs/promises';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..'),checks=[];
const icons=JSON.parse(await readFile(join(lab,'04-iconos/inventario.json'),'utf8')).icons;
const expectedIcons=icons.map(i=>i.id+'.svg').sort();
assert.deepEqual((await readdir(join(lab,'.qa/icons/downloads'))).sort(),expectedIcons);
for(const icon of icons){
 const source='04-iconos/svg/'+icon.id+'.svg',download='.qa/icons/downloads/'+icon.id+'.svg';
 const a=await readFile(join(lab,source)),b=await readFile(join(lab,download));assert.deepEqual(a,b,'Descarga distinta del origen '+icon.id);
 checks.push({source,download,sha256:createHash('sha256').update(b).digest('hex'),bytes:b.length});
}
if(process.argv[2]!=='icons'){
 const motions=JSON.parse(await readFile(join(lab,'05-movimiento/inventario.json'),'utf8')).motions;
 const expected=motions.flatMap(m=>['animado-','reducido-'].map(prefix=>prefix+m.id+'.svg')).sort();
 assert.deepEqual((await readdir(join(lab,'.qa/motion/downloads'))).sort(),expected);
 for(const m of motions)for(const reduced of [false,true]){
  const source='05-movimiento/'+(reduced?'reducido':'svg')+'/'+m.id+'.svg',download='.qa/motion/downloads/'+(reduced?'reducido-':'animado-')+m.id+'.svg';
  const a=await readFile(join(lab,source)),b=await readFile(join(lab,download));assert.deepEqual(a,b,'Descarga distinta del origen '+source);
  checks.push({source,download,sha256:createHash('sha256').update(b).digest('hex'),bytes:b.length});
 }
}
const result={checkedAt:new Date().toISOString(),checks,scope:'archivos descargados mediante Chrome comparados byte a byte con sus fuentes'};
await writeFile(join(lab,'.qa/download-verification.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify({matchedDownloads:checks.length,scope:result.scope},null,2));
