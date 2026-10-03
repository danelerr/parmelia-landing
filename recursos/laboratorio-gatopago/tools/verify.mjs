import {readFile,readdir} from 'node:fs/promises';
import {join,resolve,dirname,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const lab=resolve(dirname(fileURLToPath(import.meta.url)),'..'),kit=resolve(lab,'../../brandkit');
async function hashes(dir){let out={};for(const e of await readdir(dir,{withFileTypes:true})){const p=join(dir,e.name);if(e.isDirectory())Object.assign(out,await hashes(p));else out[relative(kit,p).replaceAll('\\','/')]=createHash('sha256').update(await readFile(p)).digest('hex');}return out;}
const baseline=JSON.parse(await readFile(join(lab,'fuentes/brandkit-baseline.json'),'utf8'));
assert.deepEqual(await hashes(kit),baseline.files,'El brandkit cambió respecto a la evidencia inicial');
const icons=JSON.parse(await readFile(join(lab,'04-iconos/inventario.json'),'utf8')).icons;
assert.equal(new Set(icons.map(i=>i.id)).size,32);
for(const i of icons){const b=await readFile(join(lab,'04-iconos/svg',i.id+'.svg'));const svg=b.toString();assert.match(svg,/currentColor/);assert.match(svg,/<title/);for(const size of [16,24,32,48])await sharp(b).resize(size,size).png().toBuffer();}
const motions=JSON.parse(await readFile(join(lab,'05-movimiento/inventario.json'),'utf8')).motions;
assert.equal(motions.length,6);
for(const m of motions){const animated=await readFile(join(lab,'05-movimiento/svg',m.id+'.svg'),'utf8');const reduced=await readFile(join(lab,'05-movimiento/reducido',m.id+'.svg'),'utf8');assert.match(animated,/prefers-reduced-motion/);assert.doesNotMatch(reduced,/@keyframes|animation:/);await sharp(Buffer.from(reduced)).png().toBuffer();}
console.log(JSON.stringify({brandkitFilesUnchanged:Object.keys(baseline.files).length,iconsRasterizedAtFourSizes:icons.length,motionReducedRendered:motions.length,scope:'estructura y render SVG, no aprobación visual ni funcionamiento del navegador'},null,2));
