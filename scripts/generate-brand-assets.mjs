import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const socialsDir = path.join(publicDir, 'socials');
const socialOptionsDir = path.join(socialsDir, 'options');
const parmeliaLinksIconsDir = path.join(publicDir, 'parmelia-links-icons');
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
  sky: '#A7D4DE',
  pink: '#DEA6BC',
  cream: '#DED9A6',
  glowSky: '#9CE3F4',
  glowPink: '#F4A9CF',
  glowGold: '#EFE08C',
};

const logoPaths = `
  <path d="M83.3377 0.820332L0.328533 58.6046L8.32585 64.2196L85.1075 118.216L162.136 64.6112L170.082 59.0738L87.3243 0.832505C86.0859 0.0162387 84.5791 0.00937285 83.3377 0.820332Z" fill="${colors.sky}"/>
  <path d="M86.8349 125.155C85.7498 125.866 84.4312 125.863 83.3487 125.146L7.21886 72.2561L0.265018 67.4362L0.196435 98.6944L7.15101 103.514L85.0306 157.652L163.105 103.911L170.078 99.095L170.137 67.8895L163.164 72.6739L86.8349 125.155Z" fill="${colors.pink}"/>
  <path d="M86.7497 164.587C85.6645 165.298 84.3459 165.295 83.2635 164.578L7.13366 111.688L0.179813 106.869L0.11123 138.127L7.0658 142.947L84.9454 197.085L163.02 143.344L169.993 138.527L170.052 107.322L163.079 112.106L86.7497 164.587Z" fill="${colors.cream}"/>
`;

function logoMark({ x, y, width, opacity = 1, shadow = true }) {
  const height = width * (198 / 171);
  const filter = shadow ? ' filter="url(#logoShadow)"' : '';
  return `<g transform="translate(${x} ${y}) scale(${width / 171})" opacity="${opacity}"${filter}>${logoPaths}</g>`;
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

function background(width, height) {
  return `
    <rect width="${width}" height="${height}" fill="${colors.black}"/>
    <rect width="${width}" height="${height}" fill="url(#skyGlow)"/>
    <rect width="${width}" height="${height}" fill="url(#pinkGlow)"/>
    <rect width="${width}" height="${height}" fill="url(#goldGlow)"/>
    <rect width="${width}" height="${height}" fill="url(#glyphs)" opacity=".32"/>
    <path d="M ${-width * 0.08} ${height * 0.74} C ${width * 0.24} ${height * 0.5}, ${width * 0.45} ${height * 0.98}, ${width * 0.72} ${height * 0.62} S ${width * 1.04} ${height * 0.38}, ${width * 1.12} ${height * 0.26}" fill="none" stroke="url(#brandLine)" stroke-width="${Math.max(2, width * 0.0025)}" stroke-opacity=".18"/>
    <path d="M ${width * 0.05} ${height * 0.2} C ${width * 0.36} ${height * 0.08}, ${width * 0.55} ${height * 0.42}, ${width * 0.9} ${height * 0.18}" fill="none" stroke="${colors.text}" stroke-width="${Math.max(1, width * 0.0012)}" stroke-opacity=".055"/>
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

function heroGlyphField(width, height, { opacity = 1, cell = 54 } = {}) {
  const glyphs = ['+', '·', '/', '\\', 'x', '=', '*', 'o', ':'];
  const brand = [
    [167, 212, 222],
    [222, 166, 188],
    [222, 217, 166],
  ];
  const rows = Math.ceil(height / cell) + 1;
  const cols = Math.ceil(width / cell) + 1;
  let field = `<g opacity="${opacity}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="${Math.round(cell * 0.22)}" text-anchor="middle" dominant-baseline="middle">`;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const wave = Math.sin(x * 0.32 + y * 0.22 - 0.9);
      if (wave < -0.1) continue;

      const glyph = glyphs[(x * 7 + y * 13) % glyphs.length];
      const px = x * cell + cell / 2;
      const py = y * cell + cell / 2;
      const highlight = wave > 0.82;
      const alpha = highlight ? 0.14 + (wave - 0.82) * 0.42 : 0.026 + Math.max(0, wave) * 0.036;
      const rgb = highlight ? brand[(x + y) % brand.length] : [255, 255, 255];
      field += `<text x="${px}" y="${py}" fill="rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha.toFixed(3)})">${glyph}</text>`;
    }
  }

  return `${field}</g>`;
}

function heroCoverBackground(width, height, { square = false } = {}) {
  const stroke = Math.max(2, width * 0.0024);
  const cell = square ? Math.max(48, width * 0.06) : Math.max(48, height * 0.12);

  return `
    <rect width="${width}" height="${height}" fill="${colors.black}"/>
    <rect width="${width}" height="${height}" fill="url(#skyGlow)" opacity=".95"/>
    <rect width="${width}" height="${height}" fill="url(#pinkGlow)" opacity=".9"/>
    <rect width="${width}" height="${height}" fill="url(#goldGlow)" opacity=".75"/>
    ${heroGlyphField(width, height, { opacity: 0.9, cell })}
    <path d="M ${-width * 0.08} ${height * 0.73} C ${width * 0.19} ${height * 0.58}, ${width * 0.41} ${height * 0.96}, ${width * 0.69} ${height * 0.7} S ${width * 1.04} ${height * 0.34}, ${width * 1.12} ${height * 0.54}" fill="none" stroke="${colors.sky}" stroke-width="${stroke}" stroke-opacity=".24"/>
    <path d="M ${width * 0.05} ${height * 0.24} C ${width * 0.34} ${height * 0.1}, ${width * 0.58} ${height * 0.38}, ${width * 0.92} ${height * 0.18}" fill="none" stroke="${colors.text}" stroke-width="${Math.max(1, stroke * 0.45)}" stroke-opacity=".07"/>
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
  ${logoMark({ x: (size - markWidth) / 2, y: 20, width: markWidth, shadow: false })}
</svg>
`;
}

function appIconSvg({ size, maskable = false }) {
  const markWidth = Math.round(size * (maskable ? 0.48 : 0.58));
  const markHeight = markWidth * (198 / 171);
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
  const markHeight = markWidth * (198 / 171);
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

function coverSvg({ width, height, square = false, variant = 'try' }) {
  const padX = Math.round(width * (square ? 0.09 : 0.073));
  const titleSize = square ? Math.round(width * 0.105) : Math.round(height * 0.17);
  const smallSize = square ? Math.round(width * 0.044) : Math.round(height * 0.065);
  const logoWidth = square ? Math.round(width * 0.36) : Math.round(height * 0.52);
  const logoHeight = logoWidth * (198 / 171);
  const textX = square ? width / 2 : padX;
  const anchor = square ? 'middle' : 'start';
  const logoX = square ? (width - logoWidth) / 2 : width - padX - logoWidth;
  const logoY = square ? Math.round(height * 0.1) : (height - logoHeight) / 2;
  const textY = square ? Math.round(height * 0.62) : Math.round(height * 0.5);
  const showLogo = variant !== 'wordmark';
  const logoOpacity = variant === 'quiet' ? 0.92 : 0.96;

  const copy = {
    try: {
      primary: 'try parmelia.me',
      secondary: '',
    },
    domain: {
      primary: 'parmelia.me',
      secondary: '',
    },
    quiet: {
      primary: '',
      secondary: '',
    },
    wordmark: {
      primary: 'Parmelia',
      secondary: 'parmelia.me',
    },
  }[variant] ?? {
    primary: 'try parmelia.me',
    secondary: '',
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  ${defs()}
  ${heroCoverBackground(width, height, { square })}
  <circle cx="${square ? width / 2 : width * 0.78}" cy="${square ? height * 0.33 : height * 0.52}" r="${square ? width * 0.34 : height * 0.56}" fill="rgba(255,255,255,.025)" filter="url(#softBlur)"/>
  ${showLogo ? logoMark({ x: logoX, y: logoY, width: logoWidth, opacity: logoOpacity }) : ''}
  ${
    copy.primary
      ? `<text x="${textX}" y="${textY}" text-anchor="${anchor}" fill="${colors.text}" font-family="'Bricolage Grotesque', 'Inter', 'Segoe UI', Arial, sans-serif" font-size="${titleSize}" font-weight="800" letter-spacing="-.03em">${copy.primary}</text>`
      : ''
  }
  ${
    copy.secondary
      ? `<text x="${textX}" y="${textY + titleSize * 0.7}" text-anchor="${anchor}" fill="${colors.text}" fill-opacity=".6" font-family="'Inter', 'Segoe UI', Arial, sans-serif" font-size="${smallSize}" font-weight="650">${copy.secondary}</text>`
      : ''
  }
</svg>
`;
}

const socialTargets = [
  { network: 'x', kind: 'profile', width: 400, height: 400 },
  { network: 'x', kind: 'cover', width: 1500, height: 500, variant: 'try' },
  { network: 'instagram', kind: 'profile', width: 1080, height: 1080 },
  { network: 'instagram', kind: 'cover', width: 1080, height: 1080, square: true, variant: 'try' },
  { network: 'linkedin', kind: 'profile', width: 400, height: 400 },
  { network: 'linkedin', kind: 'cover', width: 1584, height: 396, variant: 'try' },
  { network: 'facebook', kind: 'profile', width: 1080, height: 1080 },
  { network: 'facebook', kind: 'cover', width: 1640, height: 624, variant: 'try' },
];

const coverOptions = [
  { key: 'a-try', label: 'try parmelia.me', variant: 'try' },
  { key: 'b-domain', label: 'parmelia.me', variant: 'domain' },
  { key: 'c-logo-only', label: 'logo only', variant: 'quiet' },
  { key: 'd-wordmark', label: 'wordmark', variant: 'wordmark' },
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
  await mkdir(socialOptionsDir, { recursive: true });
  await mkdir(parmeliaLinksIconsDir, { recursive: true });
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
    await writeFile(path.join(parmeliaLinksIconsDir, `${icon.name}.svg`), svg, 'utf8');
    await renderSvgToPng(svg, path.join(parmeliaLinksIconsDir, `${icon.name}.png`), icon.size, icon.size);
  }

  for (const target of socialTargets) {
    const svg =
      target.kind === 'profile'
        ? profileSvg(target)
        : coverSvg({ ...target, square: Boolean(target.square), variant: target.variant });
    const base = `${target.network}-${target.kind}`;
    await writeFile(path.join(socialsDir, `${base}.svg`), svg, 'utf8');
    await renderSvgToPng(svg, path.join(socialsDir, `${base}.png`), target.width, target.height);
  }

  const coverTargets = socialTargets.filter((target) => target.kind === 'cover');
  for (const target of coverTargets) {
    for (const option of coverOptions) {
      const svg = coverSvg({
        ...target,
        square: Boolean(target.square),
        variant: option.variant,
      });
      const base = `${target.network}-cover-${option.key}`;
      await writeFile(path.join(socialOptionsDir, `${base}.svg`), svg, 'utf8');
      await renderSvgToPng(svg, path.join(socialOptionsDir, `${base}.png`), target.width, target.height);
    }
  }

  const readme = `# Parmelia social assets

Generated from \`scripts/generate-brand-assets.mjs\`.

Main profile assets are intentionally simple: Parmelia logo over a dark, lightly detailed background.
Main cover assets use option A: \`try parmelia.me\`.

| File | Size | Usage |
| --- | ---: | --- |
${socialTargets
  .map((target) => `| \`${target.network}-${target.kind}.png\` | ${target.width}x${target.height} | ${target.network} ${target.kind} |`)
  .join('\n')}

Cover alternatives live in \`public/socials/options/\`:

${coverOptions.map((option) => `- \`${option.key}\`: ${option.label}`).join('\n')}

Parmelia Links app icons live in \`public/parmelia-links-icons/\`: \`icon-192.png\`, \`icon-512.png\`, \`maskable-512.png\`.

Favicons generated in \`public/\`: \`favicon.svg\`, \`favicon-16x16.png\`, \`favicon-32x32.png\`, \`favicon-48x48.png\`, \`favicon.ico\`, \`apple-touch-icon.png\`.
`;

  await writeFile(path.join(socialsDir, 'README.md'), readme, 'utf8');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
