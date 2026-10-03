import {readFile,writeFile} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const html=await readFile(join(lab,'06-aplicaciones/index.html'),'utf8');
const hrefs=[...html.matchAll(/href="([^"]+)" download/g)].map(m=>m[1]);
assert.equal(hrefs.length,22);assert.equal(new Set(hrefs).size,22);
const checks=[];
for(const href of hrefs){
 assert(!href.includes('..')&&!href.startsWith('/')&&!href.includes(':'),'Ruta fuera del catálogo');
 const source='06-aplicaciones/'+href,download='.qa/applications/downloads/'+href;
 const a=await readFile(join(lab,source)),b=await readFile(join(lab,download));
 assert.deepEqual(a,b,'La descarga no coincide: '+href);
 checks.push({source,download,bytes:b.length,sha256:createHash('sha256').update(b).digest('hex')});
}
await writeFile(join(lab,'.qa/applications/download-verification.json'),JSON.stringify({checkedAt:new Date().toISOString(),checks},null,2));
console.log(JSON.stringify({matchedDownloads:checks.length}));
