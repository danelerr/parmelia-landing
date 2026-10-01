/** Symbol and web icons generated from the canonical pixel maps in brandkit/02-logos/modelo. */
import sharp from 'sharp';
import { parse, raster, svg } from './pixmap.mjs';

const MILK = { r: 0xff, g: 0xf8, b: 0xf0, alpha: 1 };
const pngOf = async (rows, scale) => { const r = raster(rows, scale); return sharp(r.buf, { raw: { width: r.W, height: r.H, channels: 4 } }).png({ compressionLevel: 9 }).toBuffer(); };
/** `rows` at `scale`, centred on a square canvas (transparent unless `background`). */
async function onSquare(rows, scale, side, background) {
  const img = await pngOf(rows, scale), w = rows[0].length * scale, h = rows.length * scale;
  const left = Math.floor((side - w) / 2), top = Math.floor((side - h) / 2);
  return sharp({ create: { width: side, height: side, channels: 4, background: background || { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: img, left, top }]).png({ compressionLevel: 9 }).toBuffer();
}
/** Windows icon container holding PNG images (supported by every current browser). */
function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, e); header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt8(0, e + 2); header.writeUInt8(0, e + 3); header.writeUInt16LE(1, e + 4); header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8); header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map(i => i.data)]);
}

/** Returns { 'relative/path': Buffer } for the kit. */
export async function symbolFiles(mapText, map16Text) {
  const full = parse(mapText), small = parse(map16Text);
  const f16 = await pngOf(small, 1), f32 = await onSquare(full, 1, 32), f48 = await pngOf(small, 3);
  return {
    '02-logos/simbolo/gatopago.svg': Buffer.from(svg(full, 'Símbolo de GatoPago')),
    '02-logos/simbolo/gatopago-16.svg': Buffer.from(svg(small, 'Símbolo de GatoPago, versión 16 px')),
    '02-logos/simbolo/gatopago.png': await pngOf(full, 8),
    '02-logos/iconos-web/favicon.svg': Buffer.from(svg(small, 'GatoPago')),
    '02-logos/iconos-web/favicon-16x16.png': f16,
    '02-logos/iconos-web/favicon-32x32.png': f32,
    '02-logos/iconos-web/favicon-48x48.png': f48,
    '02-logos/iconos-web/favicon.ico': ico([{ size: 16, data: f16 }, { size: 32, data: f32 }, { size: 48, data: f48 }]),
    '02-logos/iconos-web/apple-touch-icon.png': await sharp(await onSquare(full, 4, 180, MILK)).flatten({ background: MILK }).png({ compressionLevel: 9 }).toBuffer(),
  };
}
