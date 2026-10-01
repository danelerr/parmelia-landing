import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { unzipSync } from 'fflate';
import sharp from 'sharp';
import { files, inside, removeWorkdir, slash } from './paths.mjs';
import { verifyKit } from '../verify-brandkit.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const hash = bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
async function inventory(dir) {
  const result={};
  for(const file of await files(dir)) result[slash(path.relative(dir,file))]=hash(await fs.readFile(file));
  return result;
}

test('brandkit pipeline is self-contained and fail-safe', async t=>{
  const work = await fs.mkdtemp(path.join(root,'.brandkit-work-'));
  const fixture = path.join(work,'fixture');
  await fs.mkdir(fixture);
  try {
    for(const relative of ['scripts','brandkit','src','public','documentacion/nuevos']) {
      await fs.cp(path.join(root,relative),path.join(fixture,relative),{recursive:true});
    }
    const kit=path.join(fixture,'brandkit');
    function run(script,args=[],expected=0) {
      // Node resolves installed tooling from the enclosing checkout. No app checkout is provided.
      const result=spawnSync(process.execPath,[path.join(fixture,'scripts',script),...args],{
        cwd:fixture,encoding:'utf8',maxBuffer:3_000_000,
        env:{...process.env,GATOPAGO_APP_DIR:path.join(work,'does-not-exist')},
      });
      assert.equal(result.status,expected,result.stderr+'\n'+result.stdout);
      return result;
    }
    await t.test('standalone verification needs neither source files nor another repository',async()=>{
      const isolated=path.join(work,'isolated-kit');
      await fs.cp(kit,isolated,{recursive:true});
      const result=run('verify-brandkit.mjs',['--kit',isolated]);
      assert.equal(JSON.parse(result.stdout).identicalSourceCopies,0);
    });
    await t.test('missing canonical original fails without changing any kit bytes',async()=>{
      const original=path.join(kit,'06-originales/spritesmeli1.png');
      const saved=path.join(work,'saved-original.png');
      await fs.rename(original,saved);
      try {
        const before=await inventory(kit);
        const result=run('build-brandkit.mjs',[],1);
        assert.match(result.stderr,/Preflight failed/);
        assert.deepEqual(await inventory(kit),before);
      } finally { await fs.rename(saved,original); }
    });
    await t.test('character generation with a missing original preserves the existing artwork',async()=>{
      const original=path.join(kit,'06-originales/spritesmeli1.png');
      const saved=path.join(work,'saved-original.png');
      await fs.rename(original,saved);
      try {
        const before=await inventory(kit);
        run('brandkit/personaje.mjs',[],1);
        assert.deepEqual(await inventory(kit),before);
      } finally { await fs.rename(saved,original); }
    });
    await t.test('character timing drift fails even when the inventory hashes are refreshed',async()=>{
      const motionPath=path.join(kit,'03-personaje/animaciones/manifest.json');
      const inventoryPath=path.join(kit,'manifest.json');
      const originalMotion=await fs.readFile(motionPath), originalInventory=await fs.readFile(inventoryPath);
      try {
        const motion=JSON.parse(originalMotion);
        motion.animations[0].sequence[0].ms+=100;
        motion.animations[0].totalMs+=100;
        const bytes=Buffer.from(JSON.stringify(motion,null,2)+'\n');
        await fs.writeFile(motionPath,bytes);
        const updated=JSON.parse(originalInventory);
        const row=updated.files.find(r=>r.path==='03-personaje/animaciones/manifest.json');
        row.sha256=hash(bytes); row.bytes=bytes.length;
        await fs.writeFile(inventoryPath,JSON.stringify(updated,null,2)+'\n');
        const result=run('verify-brandkit.mjs',[],1);
        assert.match(result.stdout,/Preview timing: parpadeo/);
        assert.doesNotMatch(result.stdout,/Hash mismatch/);
      } finally { await fs.writeFile(motionPath,originalMotion); await fs.writeFile(inventoryPath,originalInventory); }
    });
    await t.test('a generation failure after preflight leaves the current kit untouched',async()=>{
      const source=path.join(fixture,'public/og.png');
      const original=await fs.readFile(source);
      try {
        await fs.writeFile(source,'not an image');
        const before=await inventory(kit);
        run('build-brandkit.mjs',[],1);
        assert.deepEqual(await inventory(kit),before);
      } finally { await fs.writeFile(source,original); }
    });
    await t.test('build succeeds with no output directory, loose originals or font package input',async()=>{
      await assert.rejects(fs.access(path.join(fixture,'output')));
      await assert.rejects(fs.access(path.join(fixture,'spritesmeli1.png')));
      await assert.rejects(fs.access(path.join(fixture,'node_modules/@fontsource-variable/recursive')));
      run('build-brandkit.mjs');
      run('verify-brandkit.mjs');
      run('verify-brandkit.mjs',['--sources']);
    });
    await t.test('two builds produce the exact same files, including the manifest',async()=>{
      const before=await inventory(kit);
      run('build-brandkit.mjs');
      assert.deepEqual(await inventory(kit),before);
    });
    await t.test('HD exports preserve source RGBA, and complete contact sheets preserve the canvas',async()=>{
      const source=await sharp(path.join(kit,'03-personaje/estaticos/expresion-neutral.png')).ensureAlpha().raw().toBuffer({resolveWithObject:true});
      const hd=await sharp(path.join(kit,'03-personaje/hd/estaticos/expresion-neutral.png')).ensureAlpha().raw().toBuffer({resolveWithObject:true});
      const k=hd.info.width/source.info.width;
      assert.equal(Number.isInteger(k),true);
      assert.ok(Math.max(hd.info.width,hd.info.height)>=2048);
      for(let y=0;y<source.info.height;y++) for(let x=0;x<source.info.width;x++) {
        const a=(y*source.info.width+x)*4;
        for(const [dx,dy] of [[0,0],[k-1,k-1],[Math.floor(k/2),Math.floor(k/2)]]) {
          const b=((y*k+dy)*hd.info.width+x*k+dx)*4;
          assert.equal(source.data.readUInt32LE(a),hd.data.readUInt32LE(b),`RGBA at ${x},${y}`);
        }
      }
      const frame=await sharp(path.join(kit,'03-personaje/animaciones/fotogramas/parpadeo/01.png')).ensureAlpha().raw().toBuffer({resolveWithObject:true});
      const sheet=await sharp(path.join(kit,'03-personaje/hojas/parpadeo.png')).ensureAlpha().raw().toBuffer({resolveWithObject:true});
      for(let y=0;y<frame.info.height;y++) assert.deepEqual(sheet.data.subarray(y*sheet.info.width*4,(y*sheet.info.width+frame.info.width)*4),frame.data.subarray(y*frame.info.width*4,(y+1)*frame.info.width*4));
    });
    await t.test('a corrupted cached HD export is rebuilt from its original',async()=>{
      const file=path.join(kit,'03-personaje/hd/estaticos/expresion-neutral.png');
      const original=await fs.readFile(file);
      await fs.writeFile(file,'broken HD export');
      run('build-brandkit.mjs');
      assert.equal(hash(await fs.readFile(file)),hash(original));
      run('verify-brandkit.mjs');
    });
    await t.test('explicit source comparison detects drift; standalone verification still passes',async()=>{
      const source=path.join(fixture,'public/og.png');
      const original=await fs.readFile(source);
      try {
        await fs.writeFile(source,Buffer.concat([original,Buffer.from('changed')]));
        run('verify-brandkit.mjs');
        const result=run('verify-brandkit.mjs',['--sources'],1);
        assert.match(result.stdout,/Copy differs from source/);
      } finally { await fs.writeFile(source,original); }
    });
    await t.test('CRLF and LF source checkouts produce identical packages',async()=>{
      const before=await inventory(kit);
      const originals=new Map();
      try {
        for(const relative of ['src/styles/rebrand.css','scripts/brandkit/catalogo.html','public/Logo_gatopago.svg','public/favicon.svg']) {
          const file=path.join(fixture,relative);
          const bytes=await fs.readFile(file);
          originals.set(file,bytes);
          await fs.writeFile(file,bytes.toString().replace(/\r\n/g,'\n').replace(/\n/g,'\r\n'));
        }
        run('build-brandkit.mjs');
        assert.deepEqual(await inventory(kit),before);
      } finally { for(const [file,bytes] of originals) await fs.writeFile(file,bytes); }
    });
    await t.test('delivery ZIP excludes retired work and verifies independently',async()=>{
      const result=JSON.parse(run('package-brandkit.mjs').stdout);
      const zipped=await fs.readFile(result.zip);
      const entries=unzipSync(zipped);
      assert.equal(Object.keys(entries).some(name=>name.startsWith('brandkit/descartado/')),false);
      assert.equal(Object.keys(entries).some(name=>name.startsWith('brandkit/02-logos/simbolo/')),true);
      assert.equal(Object.keys(entries).filter(name=>/^brandkit\/03-personaje\/estaticos\/.*\.png$/.test(name)).length,14);
      assert.equal(Object.keys(entries).filter(name=>/^brandkit\/03-personaje\/animaciones\/[^/]+\.webp$/.test(name)).length,20);
      const characterZip=unzipSync(entries['brandkit/03-personaje/descargas/gatopago-personaje-hd.zip']);
      assert.equal(Object.keys(characterZip).length,404);
      assert.equal(Object.keys(characterZip).filter(name=>/^hd\/animaciones\/fotogramas\/.*\.png$/.test(name)).length,147);
      const avatars=unzipSync(entries['brandkit/08-imagenes/avatar/gatopago-avatares.zip']);
      assert.equal(Object.keys(avatars).filter(name=>name.endsWith('.png')).length,7);
      assert.ok(avatars['gatopago-avatar.svg']);
      const extracted=path.join(work,'extracted');
      await fs.mkdir(extracted);
      for(const [name,bytes] of Object.entries(entries)) {
        const dest=inside(extracted,name);
        await fs.mkdir(path.dirname(dest),{recursive:true});
        await fs.writeFile(dest,bytes);
      }
      const verification=await verifyKit(path.join(extracted,'brandkit'));
      assert.deepEqual(verification.failures,[]);
      assert.equal(verification.profile,'delivery');
      run('package-brandkit.mjs');
      assert.equal(hash(await fs.readFile(result.zip)),hash(zipped));
    });
    await t.test('a failed ZIP validation does not overwrite the last good archive',async()=>{
      const destination=path.join(fixture,'output/gatopago-brandkit-2026-09-28.zip');
      const before=hash(await fs.readFile(destination));
      const entry=path.join(kit,'README.md');
      const original=await fs.readFile(entry);
      try {
        await fs.appendFile(entry,'\nUninventoried change\n');
        run('package-brandkit.mjs',[],1);
        assert.equal(hash(await fs.readFile(destination)),before);
      } finally { await fs.writeFile(entry,original); }
    });
  } finally { await removeWorkdir(root,work); }
});
