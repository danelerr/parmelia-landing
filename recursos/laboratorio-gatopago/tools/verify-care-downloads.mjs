import {readFile,writeFile} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..'),record=JSON.parse(await readFile(join(lab,'.qa/care/download-browser.json'),'utf8')),results=[];
assert.equal(record.downloads.length,32);
for(const d of record.downloads){const source=await readFile(resolve(lab,'01-animaciones/coleccion',d.href)),copy=await readFile(join(lab,d.file));assert.deepEqual(source,copy);results.push({...d,bytes:source.length,sha256:createHash('sha256').update(source).digest('hex')});}
await writeFile(join(lab,'.qa/care/download-verification.json'),JSON.stringify({checkedAt:new Date().toISOString(),files:32,downloads:results},null,2));console.log(JSON.stringify({files:32,allEqual:true}));
