import {readFile,writeFile} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..'),root=join(lab,'01-animaciones/rig-raster');
const downloaded=JSON.parse(await readFile(join(lab,'.qa/raster-rig/download-browser.json'),'utf8'));
assert.equal(downloaded.downloads.length,40);const checks=[];
for(const d of downloaded.downloads){
 const source=resolve(root,d.href);assert(source.startsWith(lab+'\\')||source.startsWith(lab+'/'));
 const a=await readFile(source),b=await readFile(join(lab,d.file));assert.deepEqual(a,b,'La descarga no coincide: '+d.href);
 checks.push({...d,bytes:b.length,sha256:createHash('sha256').update(b).digest('hex')});
}
await writeFile(join(lab,'.qa/raster-rig/download-verification.json'),JSON.stringify({checkedAt:new Date().toISOString(),checks},null,2));
console.log(JSON.stringify({matchedDownloads:checks.length,actions:new Set(checks.map(x=>x.id)).size}));
