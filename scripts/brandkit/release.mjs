import fs from 'node:fs/promises';
import path from 'node:path';

export async function readRelease(kit) {
  const release=JSON.parse(await fs.readFile(path.join(kit,'release.json'),'utf8'));
  if(release.schemaVersion!==1 || !/^\d+\.\d+\.\d+(?:-rc\.\d+)?$/.test(release.version)) throw new Error('Invalid brandkit release');
  for(const field of ['approvedPrefixes','approvedFiles','reviewPrefixes','referencePrefixes','retiredPrefixes']) {
    if(!Array.isArray(release[field]) || release[field].some(s=>typeof s!=='string' || s.includes('..') || s.startsWith('/'))) throw new Error(`Invalid release policy: ${field}`);
  }
  return release;
}
export function statusOf(name,release) {
  const matches = field => release[field].some(prefix=>name.startsWith(prefix));
  if(matches('retiredPrefixes')) return 'retired';
  if(matches('reviewPrefixes')) return 'review';
  if(matches('referencePrefixes')) return 'reference';
  if(matches('approvedPrefixes') || release.approvedFiles.includes(name)) return 'approved-baseline';
  return 'internal';
}
export function approvedAssets(rows,release) {
  return rows.filter(row=>statusOf(row.path,release)==='approved-baseline' && !row.path.endsWith('.md'));
}
export function externalReadme(version) {
  return `# GatoPago — entrega externa ${version}\n\nRecursos de la identidad base vigente. No incluye nuevas variantes pendientes de aprobación, personaje en revisión, originales, documentación estratégica, material retirado ni configuración de producto. Esta entrega no autoriza publicación ni uso libre de la marca.\n\n[Catálogo local](./index.html). El SVG principal es transparente; en fondo oscuro usar un contenedor Milk. No estirar, girar, recortar ni recolorear el símbolo. El gato ilustrado no es el logo. Área libre mínima: tres bloques. Para 16 px usar el símbolo simplificado.\n\nCat Fire #F85239, Cat Shadow #CF3433, Ink #0B0B0F, Milk #FFF8F0. Botón principal: texto Ink, nunca texto claro pequeño sobre Cat Fire. Tipografía: Recursive Variable, Linear para lectura, Casual para personalidad y Mono para datos. Conservar la licencia OFL en 04-tipografia/recursive/LICENSE.txt; no cubre el logo.\n\nVoz: cálida, directa y competente. Una idea por frase. El nombre interno de la mascota no se usa en copy público. Tus dólares ya saben moverse.\n\nLa versión candidata identifica esta preparación, no una aprobación de todos los recursos internos ni capacidades de producto. Los colores son sRGB, sin CMYK/Pantone certificado. Cambios e integración al frontend requieren revisión explícita.\n`;
}
export function externalCatalog(version) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>GatoPago · Kit externo ${version}</title><link rel="stylesheet" href="04-tipografia/uso.css"><link rel="icon" href="02-logos/iconos-web/favicon.svg"><style>body{margin:0;background:#fff8f0;color:#0b0b0f;font-family:'Recursive Variable',sans-serif;line-height:1.6}main{max-width:900px;padding:48px 24px;margin:auto}h1{font-size:clamp(2.4rem,6vw,4rem);line-height:1.05;letter-spacing:-.05em}.brand{display:flex;gap:24px;align-items:center;margin:40px 0;padding:32px;background:#fffdf9;border:2px solid #0b0b0f;box-shadow:6px 6px 0 #cf3433}.brand img{width:120px;height:92px;image-rendering:pixelated}.brand b{font-size:2rem;font-variation-settings:'CASL' 1,'wght' 760}a{color:inherit;text-underline-offset:4px}:focus-visible{outline:3px solid #0b0b0f;outline-offset:4px}.colors{display:flex;flex-wrap:wrap;gap:16px}.colors span{padding:18px;border:1px solid #0b0b0f}code{font-variation-settings:'MONO' 1}@media(max-width:440px){.brand{padding:20px;gap:16px;flex-direction:column;align-items:flex-start}}</style></head><body><main><p>Entrega externa / ${version}</p><h1>Lo esencial de GatoPago.</h1><p>Recursos base de marca. Sin documentación interna ni propuestas pendientes de aprobación.</p><div class="brand"><img src="02-logos/simbolo/gatopago.svg" alt="Símbolo de GatoPago"><b>GatoPago</b></div><div class="colors"><span style="background:#f85239">Cat Fire<br><code>#F85239</code></span><span style="background:#0b0b0f;color:#fff8f0">Ink<br><code>#0B0B0F</code></span><span>Milk<br><code>#FFF8F0</code></span></div><h2>Una fuente, tres registros.</h2><p class="gp-linear">Recursive Linear: lectura clara.</p><p class="gp-casual">Recursive Casual: personalidad.</p><p class="gp-mono">Recursive Mono: 1.234,56 USDC.</p><h2>Archivos</h2><p><a href="02-logos/simbolo/gatopago.svg" download>Logo SVG</a> · <a href="02-logos/simbolo/gatopago-16.svg" download>Versión 16 px</a> · <a href="05-colores/tokens.json">Tokens JSON</a> · <a href="08-imagenes/avatar/gatopago-avatares.zip" download>Avatares</a></p><p><a href="README.md">Reglas y derechos</a> · <a href="04-tipografia/recursive/LICENSE.txt">Licencia de la fuente</a> · <a href="manifest.json">Inventario</a></p><p>No anuncia productos disponibles, red, velocidad, rentabilidad ni auditorías.</p></main></body></html>`;
}
