/** Prepare a local, unpublished npm tarball of the existing identity baseline. */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { inside, removeWorkdir } from './brandkit/paths.mjs';
import { readRelease, approvedAssets } from './brandkit/release.mjs';
import { verifyKit } from './verify-brandkit.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const kit=path.join(root,'brandkit');
const result=await verifyKit(kit);
if(result.failures.length) throw new Error(result.failures.join('\n'));
const release=await readRelease(kit);
const manifest=JSON.parse(await fs.readFile(path.join(kit,'manifest.json'),'utf8'));
if(manifest.version!==release.version) throw new Error('Rebuild kit after changing release version');
const rows=approvedAssets(manifest.files,release);
const output=path.join(root,'output/frontend');
await fs.mkdir(output,{recursive:true});
const work=await fs.mkdtemp(path.join(root,'.brandkit-work-'));
try {
  const packageRoot=path.join(work,'package');
  await fs.mkdir(packageRoot);
  for(const row of rows) {
    const target=inside(packageRoot,'assets/'+row.path);
    await fs.mkdir(path.dirname(target),{recursive:true});
    const bytes=await fs.readFile(inside(kit,row.path));
    if(bytes.length!==row.bytes || crypto.createHash('sha256').update(bytes).digest('hex')!==row.sha256) throw new Error(`Asset changed during packaging: ${row.path}`);
    await fs.writeFile(target,bytes);
  }
  const write=(name,value)=>fs.writeFile(inside(packageRoot,name),value);
  const pkg={name:'@gatopago/brand-assets',version:release.version,private:true,type:'module',description:'GatoPago identity baseline: local delivery, not automatically integrated.',sideEffects:['**/*.css'],files:['assets','index.js','index.d.ts','asset-manifest.json','README.md'],exports:{'.':{types:'./index.d.ts',import:'./index.js'},'./tokens.json':'./assets/05-colores/tokens.json','./tokens.css':'./assets/05-colores/tokens.css','./fonts.css':'./assets/04-tipografia/uso.css','./assets/*':'./assets/*'},license:'SEE LICENSE IN assets/04-tipografia/recursive/LICENSE.txt'};
  await write('package.json',JSON.stringify(pkg,null,2)+'\n');
  const tokens=JSON.parse(await fs.readFile(path.join(kit,'05-colores/tokens.json'),'utf8'));
  await write('index.js',`export const version=${JSON.stringify(release.version)};\nexport const tokens=${JSON.stringify(tokens,null,2)};\nexport const assetPaths=Object.freeze(${JSON.stringify(rows.map(row=>'assets/'+row.path),null,2)});\n`);
  await write('index.d.ts','export declare const version: string;\nexport declare const tokens: Readonly<Record<string, unknown>>;\nexport declare const assetPaths: readonly string[];\n');
  await write('asset-manifest.json',JSON.stringify({schemaVersion:1,version:release.version,status:'existing-baseline-only',files:rows.map(row=>({...row,path:'assets/'+row.path}))},null,2)+'\n');
  await write('README.md',`# @gatopago/brand-assets ${release.version}\n\nEntrega local y privada; no está publicada en npm ni integrada en el frontend. Contiene solo la identidad base existente, no las propuestas de logos, componentes, plantillas ni sprites en revisión.\n\nInstalar el tarball en una rama de integración, previa revisión. Se pueden importar @gatopago/brand-assets/tokens.css y @gatopago/brand-assets/fonts.css con un bundler, o copiar assets a una carpeta estática propia. Las rutas exportadas son relativas al paquete, no URLs públicas. Conservar los directorios de fuentes para resolver sus URLs.\n\nNo reemplaza automáticamente otros paquetes de marca o contratos del producto. Los tokens conservan nombres técnicos históricos para no introducir un cambio de API. La licencia OFL cubre únicamente la fuente Recursive; el resto no implica cesión de derechos. No aplicar CSS global sin comprobar colisiones. Revisar login, botones, contraste, skeletons, QR, descargas, PWA, móviles y movimiento reducido antes de integrar.\n`);
  const npmCli=process.env.npm_execpath;
  if(!npmCli) throw new Error('Run through npm run brandkit:frontend (npm_execpath required).');
  const packed=spawnSync(process.execPath,[npmCli,'pack','--ignore-scripts','--json','--pack-destination',output],{cwd:packageRoot,encoding:'utf8',windowsHide:true});
  if(packed.status!==0) throw new Error(packed.stderr||packed.stdout||'npm pack failed');
  // npm <=11 returns an array; npm 12 returns an object keyed by package name.
  const parsed=JSON.parse(packed.stdout);
  const report=Array.isArray(parsed)?parsed[0]:parsed[pkg.name];
  if(!report?.filename) throw new Error('npm pack did not report an archive filename.');
  const tarball=inside(output,report.filename);
  const bytes=await fs.readFile(tarball);
  console.log(JSON.stringify({tarball,version:release.version,assetCount:rows.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),published:false,frontendModified:false},null,2));
} finally { await removeWorkdir(root,work); }
