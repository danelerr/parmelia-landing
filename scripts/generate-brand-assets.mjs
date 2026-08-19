import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
// Covers are built separately by `scripts/build-covers.mjs` (Chrome render with
// the real Bricolage display font). This script handles favicons (public/),
// profiles and app icons (brand/social-assets/). It does NOT generate covers.
const publicDir = path.join(root, 'public');
const brandAssetsDir = path.join(root, 'brand', 'social-assets');
const socialsDir = path.join(brandAssetsDir, 'socials');
const gatoPagoAppIconsDir = path.join(brandAssetsDir, 'gatopago-app-icons');
const cacheDir = path.join(root, '.cache');
const fontCacheDir = path.join(cacheDir, 'fontconfig');

process.env.XDG_CACHE_HOME ??= cacheDir;
process.env.FONTCONFIG_CACHE ??= fontCacheDir;

let sharp;

const colors = {
  black: '#050505',
  bg: '#0A0A0B',
  surface: '#101117',
  text: '#F5F5F3',
  muted: 'rgba(245,245,243,0.66)',
  sky: '#F85239',
  pink: '#CF3433',
  cream: '#F6C65B',
  glowSky: '#FF8A72',
  glowPink: '#F85239',
  glowGold: '#F6C65B',
};

const logoPaths = `
  <path fill="${colors.sky}" d="M8 20V8h12v4h4v4h16v-4h4V8h12v12h4v28h-4v4h-8v4H16v-4H8v-4H4V20h4Z"/>
  <path fill="${colors.pink}" d="M12 12h8v4h4v8h-4v-4h-8V12Zm32 4h4v-4h8v8h-8v4h-4v-8ZM24 16h4v8h-4v-8Zm12 0h4v8h-4v-8ZM16 48h32v4h-4v4H20v-4h-4v-4Z"/>
  <path fill="${colors.black}" d="M16 32h8v8h-8v-8Zm24 0h8v8h-8v-8ZM28 40h8v4h-8v-4Zm-4 4h4v4h-8v-4h4Zm12 0h4v4h-8v-4h4ZM4 36h12v4H4v-4Zm0 8h12v4H4v-4Zm44-8h12v4H48v-4Zm0 8h12v4H48v-4Z"/>
`;

function logoMark({ x, y, width, opacity = 1, shadow = true }) {
  const filter = shadow ? ' filter="url(#logoShadow)"' : '';
  return `<g transform="translate(${x} ${y}) scale(${width / 64})" opacity="${opacity}"${filter} shape-rendering="crispEdges">${logoPaths}</g>`;
}

function defs() {
  return `
    <defs>
      <radialGradient id="skyGlow" cx="18%" cy="8%" r="65%">
        <stop offset="0%" stop-color="${colors.glowSky}" stop-opacity=".24"/>
        <stop offset="58%" stop-color="${colors.sky}" stop-opacity=".06"/>
        <stop offset="100%" stop-color="${colors.bg}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="pinkGlow" cx="88%" cy="14%" r="66%">
        <stop offset="0%" stop-color="${colors.glowPink}" stop-opacity=".18"/>
        <stop offset="58%" stop-color="${colors.pink}" stop-opacity=".045"/>
        <stop offset="100%" stop-color="${colors.bg}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="goldGlow" cx="62%" cy="96%" r="68%">
        <stop offset="0%" stop-color="${colors.glowGold}" stop-opacity=".12"/>
        <stop offset="58%" stop-color="${colors.cream}" stop-opacity=".035"/>
        <stop offset="100%" stop-color="${colors.bg}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="brandLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${colors.sky}"/>
        <stop offset="50%" stop-color="${colors.pink}"/>
        <stop offset="100%" stop-color="${colors.cream}"/>
      </linearGradient>
      <filter id="logoShadow" x="-60%" y="-60%" width="220%" height="220%">
        <feDropShadow dx="0" dy="22" stdDeviation="26" flood-color="#000000" flood-opacity=".45"/>
        <feDropShadow dx="0" dy="0" stdDeviation="18" flood-color="${colors.sky}" flood-opacity=".16"/>
      </filter>
      <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="24"/>
      </filter>
      <pattern id="glyphs" width="96" height="96" patternUnits="userSpaceOnUse">
        <text x="12" y="24" fill="rgba(255,255,255,.045)" font-size="18" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">+</text>
        <text x="64" y="42" fill="rgba(255,255,255,.036)" font-size="16" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">/</text>
        <text x="34" y="78" fill="rgba(255,255,255,.032)" font-size="17" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">=</text>
      </pattern>
    </defs>
  `;
}

function avatarBackground(width, height) {
  return `
    <rect width="${width}" height="${height}" fill="${colors.black}"/>
    <rect width="${width}" height="${height}" fill="url(#skyGlow)" opacity=".72"/>
    <rect width="${width}" height="${height}" fill="url(#pinkGlow)" opacity=".54"/>
    <rect width="${width}" height="${height}" fill="url(#goldGlow)" opacity=".42"/>
    <rect width="${width}" height="${height}" fill="url(#glyphs)" opacity=".18"/>
  `;
}

function faviconSvg() {
  const size = 128;
  const markWidth = 72;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
  ${defs()}
  <rect width="${size}" height="${size}" rx="30" fill="${colors.black}"/>
  <rect width="${size}" height="${size}" rx="30" fill="url(#skyGlow)"/>
  <rect width="${size}" height="${size}" rx="30" fill="url(#pinkGlow)" opacity=".9"/>
  ${logoMark({ x: (size - markWidth) / 2, y: (size - markWidth) / 2, width: markWidth, shadow: false })}
</svg>
`;
}

function appIconSvg({ size, maskable = false }) {
  const markWidth = Math.round(size * (maskable ? 0.48 : 0.58));
  const markHeight = markWidth;
  const corner = maskable ? 0 : Math.round(size * 0.18);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
  ${defs()}
  <rect width="${size}" height="${size}" rx="${corner}" fill="${colors.black}"/>
  <rect width="${size}" height="${size}" rx="${corner}" fill="url(#skyGlow)" opacity=".72"/>
  <rect width="${size}" height="${size}" rx="${corner}" fill="url(#pinkGlow)" opacity=".56"/>
  <rect width="${size}" height="${size}" rx="${corner}" fill="url(#goldGlow)" opacity=".42"/>
  <rect width="${size}" height="${size}" rx="${corner}" fill="url(#glyphs)" opacity=".16"/>
  ${logoMark({
    x: (size - markWidth) / 2,
    y: (size - markHeight) / 2 + size * 0.018,
    width: markWidth,
    shadow: false,
  })}
</svg>
`;
}

function profileSvg({ width, height }) {
  const markWidth = Math.round(width * 0.54);
  const markHeight = markWidth;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  ${defs()}
  ${avatarBackground(width, height)}
  ${logoMark({
    x: (width - markWidth) / 2,
    y: (height - markHeight) / 2 + width * 0.018,
    width: markWidth,
    shadow: false,
  })}
</svg>
`;
}

const socialTargets = [
  { network: 'x', kind: 'profile', width: 400, height: 400 },
  { network: 'instagram', kind: 'profile', width: 1080, height: 1080 },
  { network: 'linkedin', kind: 'profile', width: 400, height: 400 },
  { network: 'facebook', kind: 'profile', width: 1080, height: 1080 },
];

async function renderSvgToPng(svg, outputPath, width, height) {
  await sharp(Buffer.from(svg))
    .resize(width, height, { fit: 'fill' })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outputPath);
}

async function main() {
  await mkdir(fontCacheDir, { recursive: true });
  await mkdir(socialsDir, { recursive: true });
  await mkdir(gatoPagoAppIconsDir, { recursive: true });
  ({ default: sharp } = await import('sharp'));

  const favicon = faviconSvg();
  await writeFile(path.join(publicDir, 'favicon.svg'), favicon, 'utf8');
  await renderSvgToPng(favicon, path.join(publicDir, 'favicon-16x16.png'), 16, 16);
  await renderSvgToPng(favicon, path.join(publicDir, 'favicon-32x32.png'), 32, 32);
  await renderSvgToPng(favicon, path.join(publicDir, 'favicon-48x48.png'), 48, 48);
  await renderSvgToPng(favicon, path.join(publicDir, 'apple-touch-icon.png'), 180, 180);

  const appIcons = [
    { name: 'icon-192', size: 192, maskable: false },
    { name: 'icon-512', size: 512, maskable: false },
    { name: 'maskable-192', size: 192, maskable: true },
    { name: 'maskable-512', size: 512, maskable: true },
  ];
  for (const icon of appIcons) {
    const svg = appIconSvg({ size: icon.size, maskable: icon.maskable });
    await writeFile(path.join(gatoPagoAppIconsDir, `${icon.name}.svg`), svg, 'utf8');
    await renderSvgToPng(svg, path.join(gatoPagoAppIconsDir, `${icon.name}.png`), icon.size, icon.size);
  }

  // Profiles only — covers are built by scripts/build-covers.mjs.
  for (const target of socialTargets) {
    const svg = profileSvg(target);
    const base = `${target.network}-${target.kind}`;
    await writeFile(path.join(socialsDir, `${base}.svg`), svg, 'utf8');
    await renderSvgToPng(svg, path.join(socialsDir, `${base}.png`), target.width, target.height);
  }

  const readme = `# GatoPago social assets

These assets live in \`brand/social-assets/\` (out of \`public/\`, so they are NOT
deployed with the site).

- **Profiles + app icons:** generated by \`scripts/generate-brand-assets.mjs\` (sharp).
  Profiles are intentionally simple: GatoPago logo over a dark, detailed background.
- **Covers:** generated by \`scripts/build-covers.mjs\` (rendered via Chrome with the
  real Recursive variable font). Current promise, 2nd line in the brand
  gradient. Spanish for Facebook/Instagram, English for X/LinkedIn.

| File | Size | Usage |
| --- | ---: | --- |
${socialTargets
  .map((target) => `| \`${target.network}-${target.kind}.png\` | ${target.width}x${target.height} | ${target.network} ${target.kind} |`)
  .join('\n')}
| \`x-cover.png\` | 1500x500 | x cover |
| \`linkedin-cover.png\` | 1584x396 | linkedin cover |
| \`facebook-cover.png\` | 1640x624 | facebook cover |
| \`instagram-cover.png\` | 1080x1080 | instagram cover (square) |

GatoPago app icons live in \`gatopago-app-icons/\`.

Favicons (used by the site) are generated into \`public/\`: \`favicon.svg\`,
\`favicon-16x16.png\`, \`favicon-32x32.png\`, \`favicon-48x48.png\`, \`apple-touch-icon.png\`.
`;

  await writeFile(path.join(socialsDir, 'README.md'), readme, 'utf8');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
