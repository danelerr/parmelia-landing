import {readFile,writeFile,readdir} from 'node:fs/promises';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const files={};
async function scan(dir){for(const e of await readdir(join(lab,dir),{withFileTypes:true})){const p=dir+'/'+e.name;if(e.isDirectory())await scan(p);else files[p]=createHash('sha256').update(await readFile(join(lab,p))).digest('hex');}}
for(const dir of ['02-manual','05-movimiento','06-aplicaciones/social','06-aplicaciones/correo','06-aplicaciones/notificaciones'])await scan(dir);
const path=join(lab,'fuentes/revision-2026-10-02-preservados.json');
if(process.argv.includes('--check')){const baseline=JSON.parse(await readFile(path,'utf8'));assert.deepEqual(files,baseline.files);console.log(JSON.stringify({unchangedFiles:Object.keys(files).length}));}
else{try{await readFile(path);throw Error('La referencia ya existe; usar --check');}catch(e){if(e.code!=='ENOENT')throw e;}await writeFile(path,JSON.stringify({createdAt:new Date().toISOString(),scope:'Manual, movimientos, posts, correo y notificaciones: se conservan byte por byte durante esta revisión.',files},null,2));console.log(JSON.stringify({baselineFiles:Object.keys(files).length}));}
