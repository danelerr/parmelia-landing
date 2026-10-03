import {readFile,writeFile} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..'),record=JSON.parse(await readFile(join(lab,'.qa/raster-actions/download-browser.json'),'utf8')),results=[];
assert.equal(record.downloads.length,24);const sha=b=>createHash('sha256').update(b).digest('hex');
for(const d of record.downloads){const source=await readFile(resolve(lab,'01-animaciones/coleccion',d.href)),download=await readFile(join(lab,d.file));assert.deepEqual(source,download,'Descarga distinta '+d.href);results.push({...d,bytes:source.length,sha256:sha(source)});}
const output={checkedAt:new Date().toISOString(),files:results.length,downloads:results};await writeFile(join(lab,'.qa/raster-actions/download-verification.json'),JSON.stringify(output,null,2));console.log(JSON.stringify({files:24,allEqual:true}));
