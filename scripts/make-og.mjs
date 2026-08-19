import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const publicDir = path.join(root, 'public');
const meliPath = path.join(root, 'src', 'assets', 'meli', 'body-courier.webp');
const markPath = path.join(publicDir, 'Logo_gatopago.svg');
const fontPath = path.join(
  root,
  'node_modules',
  '@fontsource-variable',
  'recursive',
  'files',
  'recursive-latin-wght-normal.woff2',
);

const colors = {
  ink: '#0B0B0F',
  milk: '#FFF8F0',
  paper: '#FFFDF9',
  oat: '#EEE4D8',
  fire: '#F85239',
  shadow: '#CF3433',
  pending: '#F6C65B',
};

const font = (await readFile(fontPath)).toString('base64');

function fontFace() {
  return `
    @font-face {
      font-family: 'Recursive';
      src: url(data:font/woff2;base64,${font}) format('woff2');
      font-weight: 300 1000;
      font-style: normal;
    }
  `;
}

function ogSvg() {
  const track = Array.from({ length: 13 }, (_, index) => {
    const x = 76 + index * 28;
    const fill = index === 5 ? colors.fire : colors.ink;
    return `<rect x="${x}" y="543" width="18" height="9" fill="${fill}"/>`;
  }).join('');

  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <style>
        ${fontFace()}
        .display { font-family: 'Recursive', 'Segoe UI', sans-serif; font-weight: 850; }
        .text { font-family: 'Recursive', 'Segoe UI', sans-serif; font-weight: 520; }
        .mono { font-family: 'Recursive', ui-monospace, monospace; font-weight: 760; }
      </style>

      <rect width="1200" height="630" fill="${colors.milk}"/>
      <rect x="0" y="0" width="1200" height="18" fill="${colors.ink}"/>
      <rect x="0" y="612" width="1200" height="18" fill="${colors.ink}"/>

      <rect x="39" y="69" width="14" height="14" fill="${colors.fire}"/>
      <rect x="108" y="31" width="22" height="22" fill="${colors.oat}"/>
      <rect x="1124" y="53" width="28" height="28" fill="${colors.fire}" opacity=".2"/>
      <rect x="1153" y="501" width="18" height="18" fill="${colors.ink}" opacity=".12"/>
      <path d="M0 450h33v-24h23v46H33v21H0z" fill="${colors.fire}" opacity=".13"/>

      <rect x="72" y="64" width="246" height="42" fill="${colors.ink}"/>
      <rect x="72" y="106" width="246" height="5" fill="${colors.fire}"/>
      <text x="92" y="93" fill="${colors.milk}" class="mono" font-size="21" letter-spacing="1.8">GATOPAGO · ALPHA</text>

      <text x="72" y="205" fill="${colors.ink}" class="display" font-size="67" letter-spacing="-3.8">Tus dólares ya saben</text>
      <text x="72" y="276" fill="${colors.fire}" class="display" font-size="67" letter-spacing="-3.8">moverse.</text>

      <text x="76" y="335" fill="${colors.ink}" class="text" font-size="25">
        <tspan x="76" dy="0">Cobra, paga, cambia y haz crecer dólares digitales</tspan>
        <tspan x="76" dy="38">desde una cuenta que tú controlas.</tspan>
      </text>

      <rect x="76" y="424" width="181" height="45" fill="${colors.pending}" stroke="${colors.ink}" stroke-width="3"/>
      <rect x="264" y="424" width="201" height="45" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="3"/>
      <rect x="472" y="424" width="180" height="45" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="3"/>
      <text x="166.5" y="453" text-anchor="middle" fill="${colors.ink}" class="mono" font-size="17">ALPHA PÚBLICA</text>
      <text x="364.5" y="453" text-anchor="middle" fill="${colors.ink}" class="mono" font-size="17">ARBITRUM SEPOLIA</text>
      <text x="562" y="453" text-anchor="middle" fill="${colors.ink}" class="mono" font-size="17">FONDOS DE PRUEBA</text>

      ${track}
      <text x="76" y="586" fill="${colors.ink}" class="mono" font-size="21" letter-spacing=".4">Meli sigue la pista de tu dinero.</text>

      <rect x="792" y="114" width="330" height="372" fill="${colors.shadow}"/>
      <rect x="780" y="102" width="330" height="372" fill="#FFE5DC" stroke="${colors.ink}" stroke-width="5"/>
      <rect x="780" y="102" width="36" height="18" fill="${colors.ink}"/>
      <rect x="1074" y="456" width="36" height="18" fill="${colors.ink}"/>
      <rect x="822" y="495" width="246" height="43" fill="${colors.ink}"/>
      <text x="945" y="523" text-anchor="middle" fill="${colors.milk}" class="mono" font-size="18" letter-spacing="1.2">PAGO EN CAMINO</text>
    </svg>
  `);
}

async function makeOg() {
  const meli = await sharp(meliPath)
    .resize(350, 348, { fit: 'contain', kernel: sharp.kernel.nearest })
    .png()
    .toBuffer();

  await sharp(ogSvg())
    .composite([{ input: meli, left: 763, top: 120 }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(publicDir, 'og.png'));
}

async function makeAppleTouchIcon() {
  const mark = await sharp(markPath)
    .resize(118, 118, { fit: 'contain', kernel: sharp.kernel.nearest })
    .png()
    .toBuffer();

  const shadow = await sharp(mark)
    .tint(colors.shadow)
    .png()
    .toBuffer();

  const base = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" shape-rendering="crispEdges">
      <rect width="180" height="180" rx="36" fill="${colors.milk}"/>
      <rect x="12" y="12" width="156" height="156" rx="26" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="6"/>
      <rect x="24" y="24" width="14" height="14" fill="${colors.fire}"/>
      <rect x="142" y="142" width="14" height="14" fill="${colors.pending}"/>
    </svg>
  `);

  await sharp(base)
    .composite([
      { input: shadow, left: 35, top: 37 },
      { input: mark, left: 31, top: 33 },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
}

await Promise.all([makeOg(), makeAppleTouchIcon()]);
console.log('Generated GatoPago og.png and apple-touch-icon.png');
