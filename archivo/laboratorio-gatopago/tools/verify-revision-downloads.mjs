import {readFile,writeFile} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const audit=JSON.parse(await readFile(join(lab,'.qa/revision/browser-verification.json'),'utf8'));
assert.equal(audit.downloads.length,24);
const checks=[];
for(const d of audit.downloads){const source=resolve(lab,'01-animaciones',d.href),target=join(lab,'.qa/revision/downloads',d.id,d.name);assert(source.startsWith(join(lab,'01-animaciones')+'\\'));const a=await readFile(source),b=await readFile(target);assert.deepEqual(a,b);checks.push({...d,bytes:b.length,sha256:createHash('sha256').update(b).digest('hex')});}
await writeFile(join(lab,'.qa/revision/download-verification.json'),JSON.stringify({checkedAt:new Date().toISOString(),checks},null,2));console.log(JSON.stringify({matchedDownloads:checks.length}));
