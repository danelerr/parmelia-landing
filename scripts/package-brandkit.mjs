/** Build a deterministic delivery ZIP, excluding internal QA and processing tools. */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { zipSync } from 'fflate';
import { verifyKit } from './verify-brandkit.mjs';
import { files, inside, removeWorkdir, slash } from './brandkit/paths.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const kit = path.join(root,'brandkit');
const checked = await verifyKit(kit);
if(checked.failures.length) throw new Error(`Run brandkit:build first:\n${checked.failures.join('\n')}`);
const manifest = JSON.parse(await fs.readFile(path.join(kit,'manifest.json'),'utf8'));
const excluded = ['03-mascota/animaciones/qa/','03-mascota/animaciones/tools/'];
const included = manifest.files.filter(row=>!excluded.some(prefix=>row.path.startsWith(prefix)));
const work = await fs.mkdtemp(path.join(root,'.brandkit-work-'));
try {
  const delivery = path.join(work,'delivery');
  await fs.mkdir(delivery);
  for(const row of included) {
    const dest = inside(delivery,row.path);
    await fs.mkdir(path.dirname(dest),{recursive:true});
    await fs.copyFile(inside(kit,row.path),dest);
  }
  await fs.copyFile(path.join(kit,'CONTROL-DE-CALIDAD.md'),path.join(delivery,'CONTROL-DE-CALIDAD.md'));
  const deliveryManifest = {...manifest,profile:'delivery',excludedAreas:excluded,files:included};
  await fs.writeFile(path.join(delivery,'manifest.json'),JSON.stringify(deliveryManifest,null,2)+'\n');
  const result = await verifyKit(delivery);
  if(result.failures.length) throw new Error(result.failures.join('\n'));
  const entries = Object.create(null);
  for(const file of await files(delivery)) {
    const name = 'brandkit/'+slash(path.relative(delivery,file));
    entries[name] = [new Uint8Array(await fs.readFile(file)), {mtime:new Date(2026,0,1,0,0,0),level:6}];
  }
  const bytes = zipSync(entries);
  const output = path.join(root,'output');
  await fs.mkdir(output,{recursive:true});
  const filename = `gatopago-brandkit-${manifest.edition}.zip`;
  if(!/^gatopago-brandkit-\d{4}-\d{2}-\d{2}\.zip$/.test(filename)) throw new Error('Invalid package edition');
  const destination = inside(output,filename);
  const temporary = inside(output,filename+'.'+crypto.randomUUID()+'.tmp');
  try {
    await fs.writeFile(temporary,bytes,{flag:'wx'});
    await fs.rename(temporary,destination);
  } finally { await fs.rm(temporary,{force:true}); }
  console.log(JSON.stringify({zip:destination,files:Object.keys(entries).length,excludedAreas:excluded,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),validation:result},null,2));
} finally { await removeWorkdir(root,work).catch(error=>console.warn(`Temporary directory retained at ${work}: ${error.message}`)); }
