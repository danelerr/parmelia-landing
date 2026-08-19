// Builds the 4 social covers as HTML (SVG + embedded Recursive font) for crisp
// brand typography rendered via Chrome. Profiles are NOT touched.
// Output: HTML wrappers to .cache/covers/, source SVGs to brand/social-assets/socials/.
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const socialsDir = path.join(root, 'brand', 'social-assets', 'socials');
const htmlDir = path.join(root, '.cache', 'covers');

const colors = {
  black: '#050505', bg: '#0A0A0B', text: '#F5F5F3',
  sky: '#F85239', pink: '#CF3433', cream: '#F6C65B',
  glowSky: '#FF8A72', glowPink: '#F85239', glowGold: '#F6C65B',
};

const logoPaths = `
  <path fill="${colors.sky}" d="M8 20V8h12v4h4v4h16v-4h4V8h12v12h4v28h-4v4h-8v4H16v-4H8v-4H4V20h4Z"/>
  <path fill="${colors.pink}" d="M12 12h8v4h4v8h-4v-4h-8V12Zm32 4h4v-4h8v8h-8v4h-4v-8ZM24 16h4v8h-4v-8Zm12 0h4v8h-4v-8ZM16 48h32v4h-4v4H20v-4h-4v-4Z"/>
  <path fill="${colors.black}" d="M16 32h8v8h-8v-8Zm24 0h8v8h-8v-8ZM28 40h8v4h-8v-4Zm-4 4h4v4h-8v-4h4Zm12 0h4v4h-8v-4h4ZM4 36h12v4H4v-4Zm0 8h12v4H4v-4Zm44-8h12v4H48v-4Zm0 8h12v4H48v-4Z"/>`;

const logoMark = ({ x, y, width, opacity = 0.96 }) =>
  `<g transform="translate(${x} ${y}) scale(${width / 64})" opacity="${opacity}" shape-rendering="crispEdges">${logoPaths}</g>`;

function defs() {
  return `<defs>
    <radialGradient id="skyGlow" cx="18%" cy="8%" r="65%"><stop offset="0%" stop-color="${colors.glowSky}" stop-opacity=".24"/><stop offset="58%" stop-color="${colors.sky}" stop-opacity=".06"/><stop offset="100%" stop-color="${colors.bg}" stop-opacity="0"/></radialGradient>
    <radialGradient id="pinkGlow" cx="88%" cy="14%" r="66%"><stop offset="0%" stop-color="${colors.glowPink}" stop-opacity=".18"/><stop offset="58%" stop-color="${colors.pink}" stop-opacity=".045"/><stop offset="100%" stop-color="${colors.bg}" stop-opacity="0"/></radialGradient>
    <radialGradient id="goldGlow" cx="62%" cy="96%" r="68%"><stop offset="0%" stop-color="${colors.glowGold}" stop-opacity=".12"/><stop offset="58%" stop-color="${colors.cream}" stop-opacity=".035"/><stop offset="100%" stop-color="${colors.bg}" stop-opacity="0"/></radialGradient>
    <linearGradient id="tagGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${colors.glowSky}"/><stop offset="52%" stop-color="${colors.glowPink}"/><stop offset="100%" stop-color="${colors.glowGold}"/></linearGradient>
    <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="24"/></filter>
  </defs>`;
}

function glyphField(width, height, cell) {
  const glyphs = ['+', '·', '/', '\\', 'x', '=', '*', 'o', ':'];
  const brand = [[167, 212, 222], [222, 166, 188], [222, 217, 166]];
  const rows = Math.ceil(height / cell) + 1;
  const cols = Math.ceil(width / cell) + 1;
  let f = `<g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="${Math.round(cell * 0.22)}" text-anchor="middle" dominant-baseline="middle">`;
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const wave = Math.sin(x * 0.32 + y * 0.22 - 0.9);
    if (wave < -0.1) continue;
    const g = glyphs[(x * 7 + y * 13) % glyphs.length];
    const hi = wave > 0.82;
    const a = hi ? 0.14 + (wave - 0.82) * 0.42 : 0.026 + Math.max(0, wave) * 0.036;
    const rgb = hi ? brand[(x + y) % 3] : [255, 255, 255];
    f += `<text x="${x * cell + cell / 2}" y="${y * cell + cell / 2}" fill="rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a.toFixed(3)})">${g}</text>`;
  }
  return f + '</g>';
}

function bg(width, height, square) {
  const cell = square ? Math.max(48, width * 0.06) : Math.max(48, height * 0.12);
  // Cleaner background: softer glows, no wavy brand line.
  return `
    <rect width="${width}" height="${height}" fill="${colors.black}"/>
    <rect width="${width}" height="${height}" fill="url(#skyGlow)" opacity=".48"/>
    <rect width="${width}" height="${height}" fill="url(#pinkGlow)" opacity=".4"/>
    <rect width="${width}" height="${height}" fill="url(#goldGlow)" opacity=".28"/>
    ${glyphField(width, height, cell)}`;
}

function coverSvg(t) {
  const { width: w, height: h, square, line1, line2, domain, T, logoW } = t;
  const padX = Math.round(w * (square ? 0.09 : 0.072));
  const display = `font-family:'Recursive','Segoe UI',sans-serif;font-weight:850;letter-spacing:-.03em;font-variation-settings:'CASL' 1`;
  const lh = T * 1.04;
  const domainSize = Math.round(T * 0.34);

  let textBlock, logo;
  if (square) {
    const cx = w / 2;
    const lw = logoW;
    logo = logoMark({ x: (w - lw) / 2, y: Math.round(h * 0.12), width: lw });
    const baseY = Math.round(h * 0.62);
    textBlock = `
      <text x="${cx}" y="${baseY}" text-anchor="middle" fill="${colors.text}" style="${display}" font-size="${T}">${line1}</text>
      <text x="${cx}" y="${baseY + lh}" text-anchor="middle" fill="url(#tagGrad)" style="${display}" font-size="${T}">${line2}</text>
      <text x="${cx}" y="${baseY + lh + domainSize * 1.7}" text-anchor="middle" fill="${colors.text}" fill-opacity=".62" font-family="'Recursive','Segoe UI',sans-serif" font-weight="600" font-size="${domainSize}">${domain}</text>`;
  } else {
    const lw = logoW, lhh = lw;
    logo = logoMark({ x: w - padX - lw, y: (h - lhh) / 2, width: lw });
    const blockH = lh + lh + domainSize * 1.7;
    const top = (h - blockH) / 2 + T * 0.82;
    textBlock = `
      <text x="${padX}" y="${top}" fill="${colors.text}" style="${display}" font-size="${T}">${line1}</text>
      <text x="${padX}" y="${top + lh}" fill="url(#tagGrad)" style="${display}" font-size="${T}">${line2}</text>
      <text x="${padX}" y="${top + lh + domainSize * 1.7}" fill="${colors.text}" fill-opacity=".62" font-family="'Recursive','Segoe UI',sans-serif" font-weight="600" font-size="${domainSize}">${domain}</text>`;
  }

  const blurCx = square ? w / 2 : w * 0.78;
  const blurCy = square ? h * 0.3 : h * 0.5;
  const blurR = square ? w * 0.32 : h * 0.55;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
  ${defs()}
  ${bg(w, h, square)}
  <circle cx="${blurCx}" cy="${blurCy}" r="${blurR}" fill="rgba(255,255,255,.012)" filter="url(#softBlur)"/>
  ${logo}
  ${textBlock}
</svg>`;
}

const targets = [
  { network: 'x', width: 1500, height: 500, line1: 'Your dollars already', line2: 'know how to move.', domain: 'GatoPago', T: 70, logoW: 250 },
  { network: 'linkedin', width: 1584, height: 396, line1: 'Your dollars already', line2: 'know how to move.', domain: 'GatoPago', T: 62, logoW: 196 },
  { network: 'facebook', width: 1640, height: 624, line1: 'Tus dólares ya saben', line2: 'moverse.', domain: 'GatoPago', T: 76, logoW: 300 },
  { network: 'instagram', width: 1080, height: 1080, square: true, line1: 'Tus dólares ya saben', line2: 'moverse.', domain: 'GatoPago', T: 60, logoW: 380 },
];

async function main() {
  await mkdir(htmlDir, { recursive: true });
  const recursive = await readFile(path.join(root, 'node_modules/@fontsource-variable/recursive/files/recursive-latin-wght-normal.woff2'));
  const recursive64 = recursive.toString('base64');

  for (const t of targets) {
    const svg = coverSvg(t);
    await writeFile(path.join(socialsDir, `${t.network}-cover.svg`), svg, 'utf8');
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Recursive';src:url(data:font/woff2;base64,${recursive64}) format('woff2');font-weight:300 1000;font-display:block}
*{margin:0;padding:0}html,body{width:${t.width}px;height:${t.height}px;overflow:hidden;background:${colors.black}}svg{display:block}
</style></head><body>${svg}</body></html>`;
    await writeFile(path.join(htmlDir, `${t.network}.html`), html, 'utf8');
    console.log(`${t.network}-cover: ${t.width}x${t.height}`);
  }
  console.log('HTML wrappers ->', htmlDir);
}

main().catch((e) => { console.error(e); process.exit(1); });
