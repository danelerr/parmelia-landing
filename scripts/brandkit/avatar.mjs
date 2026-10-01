import sharp from 'sharp';
import { zipSync } from 'fflate';
import { parse, raster, svg } from './pixmap.mjs';

export const AVATAR_SIZES = [
  { size:2160, use:'Máster HD' },
  { size:1080, use:'Instagram · Facebook · TikTok' },
  { size:1024, use:'WhatsApp · Telegram' },
  { size:800, use:'YouTube' },
  { size:512, use:'Discord' },
  { size:400, use:'X · LinkedIn' },
  { size:180, use:'Apple touch / referencia' },
];
const dir = '08-imagenes/avatar';

export async function avatarFiles(mapText) {
  const rows = parse(mapText);
  const artwork = svg(rows,'GatoPago').replace(/^<svg[^>]*>\s*/, '').replace(/<\/svg>\s*$/, '');
  const vector = `<svg xmlns="http://www.w3.org/2000/svg" width="2160" height="2160" viewBox="0 0 180 180" shape-rendering="crispEdges" role="img" aria-label="Avatar de GatoPago"><rect width="180" height="180" fill="#FFF8F0"/><g transform="translate(30 44) scale(4)">${artwork}</g></svg>\n`;
  const output = { [`${dir}/gatopago-avatar.svg`]:Buffer.from(vector) };
  const variants = [];
  for (const {size,use} of AVATAR_SIZES) {
    const scale = Math.floor(size / 45);
    const left = Math.floor((size-rows[0].length*scale)/2), top = Math.floor((size-rows.length*scale)/2);
    const art = raster(rows,scale);
    const image = await sharp(art.buf,{raw:{width:art.W,height:art.H,channels:4}}).png().toBuffer();
    const file = `gatopago-avatar-${size}.png`;
    output[`${dir}/${file}`] = await sharp({create:{width:size,height:size,channels:3,background:'#FFF8F0'}})
      .composite([{input:image,left,top}]).removeAlpha().png({compressionLevel:9}).toBuffer();
    variants.push({file,size,use,scale,left,top});
  }
  const manifest = {schemaVersion:1,background:'#FFF8F0',source:'02-logos/modelo/simbolo.txt',svg:'gatopago-avatar.svg',archive:'gatopago-avatares.zip',variants};
  output[`${dir}/manifest.json`] = Buffer.from(JSON.stringify(manifest,null,2)+'\n');
  output[`${dir}/README.md`] = Buffer.from(`# Avatar de GatoPago\n\nEl símbolo original del kit sobre Milk #FFF8F0, como el apple-touch-icon. Todos los PNG son cuadrados y opacos. El SVG conserva el dibujo vectorial y escala a cualquier tamaño. La cabeza mantiene margen para el recorte circular.\n\n**[Descargar todos los avatares](./gatopago-avatares.zip)** · [SVG con fondo](./gatopago-avatar.svg) · [Logo SVG transparente](../../02-logos/simbolo/gatopago.svg)\n\n| PNG | Tamaño | Uso previsto |\n|---|---|---|\n${variants.map(v=>`| [${v.file}](./${v.file}) | ${v.size} × ${v.size} | ${v.use} |`).join('\n')}\n\nLos bloques del logo se dibujan a escala entera, sin suavizado ni pérdida por JPEG. El PNG de 180 coincide visualmente con el apple-touch-icon. El máster de 2160 y el de 1080 conservan exactamente su proporción; en tamaños no divisibles por 45 el bloque se ajusta al entero inferior para mantener nitidez.\n\nEstas son versiones de entrega de la marca. X recomienda [400 × 400](https://help.x.com/en/managing-your-account/common-issues-when-uploading-profile-photo); LinkedIn admite [PNG desde 400 × 400](https://www.linkedin.com/help/linkedin/answer/a549049). YouTube admite [PNG para el avatar](https://support.google.com/youtube/answer/10456525). Revisar el recorte al subir cada archivo.\n`);
  const entries = Object.fromEntries(Object.entries(output).map(([file,bytes])=>[file.slice(dir.length+1),[new Uint8Array(bytes),{mtime:new Date(2026,0,1),level:6}]]));
  output[`${dir}/${manifest.archive}`] = Buffer.from(zipSync(entries));
  return {files:output,manifest};
}
