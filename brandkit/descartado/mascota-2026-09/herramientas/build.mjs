/**
 * Regenerate the mascot deliverables from the canonical pixel maps in brandkit/03-mascota/modelo.
 * Usage: node scripts/mascota/build.mjs [animation-id ...]   (no ids = everything)
 * Afterwards run `npm run brandkit:build` so the kit inventory and catalogue pick up the changes.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { KIT, CANVAS, ANCHOR, SCALE } from './lib/anim.mjs';
import { parse, png, svg, borde, PALETTE } from './lib/pixmap.mjs';
import { qaMaps, qaAnimations } from './qa.mjs';
import { writeComparison } from './comparacion.mjs';
import { writeGuides } from './guias.mjs';

const ids = process.argv.slice(2).filter(a => !a.startsWith('--'));
const STATIC_ROLES = {
  'head-neutral': 'Referencia de expresión neutral', 'head-happy': 'Éxito discreto', 'head-focused': 'Atención y verificación',
  'head-cautious': 'Advertencia recuperable', 'head-curious': 'Ayuda y exploración', 'head-excited': 'Celebración breve',
  'head-sleepy': 'Espera tranquila', 'head-peek': 'Descubrimiento', 'body-sitting': 'Bienvenida y estados vacíos',
  'body-courier': 'Envío y movimiento', 'body-sleeping': 'Inactividad', 'body-qr': 'Cobro y recepción; QR ilustrativo',
  'body-conveyor': 'Procesamiento', 'body-peek-card': 'Tarjeta conceptual',
};

// 0. Validate the maps first: a map that breaks the rules never reaches the kit.
const mapReport = await qaMaps(KIT);
if (mapReport.failures.length) { console.error(`Map QA failed; nothing was written:\n${mapReport.failures.join('\n')}`); process.exit(1); }

// 1. Palette and statics (only when rebuilding everything).
if (!ids.length) {
  await fs.writeFile(path.join(KIT, 'modelo/paleta.json'), JSON.stringify({
    schemaVersion: 1,
    note: 'One character per colour in the maps; "." is transparent. Brand tokens from 05-colores plus mascot prop colours.',
    colours: PALETTE.map(({ ch, name, hex }) => ({ char: ch, name, hex })),
  }, null, 2) + '\n');
  // The same palette for pixel editors (Aseprite, LibreSprite, Piskel, GIMP): edits come back with brandkit:importar.
  await fs.writeFile(path.join(KIT, 'modelo/paleta.gpl'), 'GIMP Palette\nName: GatoPago — mascota\nColumns: 7\n# sRGB; one colour per map character\n' + PALETTE.map(p => `${p.rgb.join(' ')} ${p.name} (${p.ch})`).join('\n') + '\n');
  await writeGuides(KIT);
  await fs.rm(path.join(KIT, 'estaticos'), { recursive: true, force: true });
  for (const dir of ['estaticos', 'estaticos/1x', 'estaticos/4x', 'estaticos/svg']) await fs.mkdir(path.join(KIT, dir), { recursive: true });
  for (const file of (await fs.readdir(path.join(KIT, 'modelo/estaticos'))).filter(f => f.endsWith('.txt')).sort()) {
    const name = file.replace('.txt', '');
    if (!STATIC_ROLES[name]) throw new Error(`Unknown static map: ${file}`);
    const rows = parse(await fs.readFile(path.join(KIT, 'modelo/estaticos', file), 'utf8'));
    for (const [suffix, art, title] of [['', rows, STATIC_ROLES[name]], ['-oscuro', borde(rows), `${STATIC_ROLES[name]} (fondo oscuro)`]]) {
      await png(art, 8, path.join(KIT, 'estaticos', `${name}${suffix}.png`));
      await png(art, 4, path.join(KIT, 'estaticos/4x', `${name}${suffix}.png`));
      await png(art, 1, path.join(KIT, 'estaticos/1x', `${name}${suffix}.png`));
      await fs.writeFile(path.join(KIT, 'estaticos/svg', `${name}${suffix}.svg`), svg(art, `GatoPago · ${title}`));
    }
  }
  // Generated animation outputs are replaced wholesale; the README, qa/antes and the before/after sheets stay.
  for (const dir of ['frames', 'frames-1x', 'spritesheets', 'previews', 'manifests']) await fs.rm(path.join(KIT, 'animaciones', dir), { recursive: true, force: true });
  await fs.mkdir(path.join(KIT, 'qa'), { recursive: true });
  for (const f of await fs.readdir(path.join(KIT, 'qa'))) if (f.startsWith('revision-')) await fs.rm(path.join(KIT, 'qa', f));
}

// 2. Animations.
await fs.mkdir(path.join(KIT, 'qa'), { recursive: true });
const { summary } = await import('./animaciones.mjs');

// 3. General manifest: every sequence plus provenance of the original AI sheets.
const manifests = [];
for (const f of (await fs.readdir(path.join(KIT, 'animaciones/manifests'))).filter(f => f.endsWith('.json')).sort()) {
  manifests.push(JSON.parse(await fs.readFile(path.join(KIT, 'animaciones/manifests', f), 'utf8')));
}
const originals = path.join(KIT, '../06-originales');
const sourceSheets = [];
for (const file of (await fs.readdir(originals)).filter(f => f.endsWith('.png')).sort()) {
  sourceSheets.push({ file, sha256: crypto.createHash('sha256').update(await fs.readFile(path.join(originals, file))).digest('hex') });
}
await fs.writeFile(path.join(KIT, 'animaciones/manifest.json'), JSON.stringify({
  schemaVersion: 2, brand: 'GatoPago', character: 'Meli (nombre interno de producción)',
  method: 'Rebuilt as true pixel art: every frame is composed from the 2026-09-25 pieces (animaciones/piezas-v1) with whole-cell moves and hand-drawn parts. No AI frames are reused.',
  grid: { unit: 'block', canvas: { width: CANVAS.w, height: CANVAS.h }, anchor: { ...ANCHOR } },
  export: { scale: SCALE, canvas: { width: CANVAS.w * SCALE, height: CANVAS.h * SCALE }, previewScale: SCALE / 2 },
  palette: '../modelo/paleta.json',
  animationCount: manifests.length, totalFrames: manifests.reduce((n, m) => n + m.frameCount, 0),
  animations: manifests.map(m => ({ id: m.id, name: m.name, purpose: m.purpose, playback: m.playback, frameCount: m.frameCount, totalDurationMs: m.totalDurationMs, manifest: `manifests/${m.id}.json` })),
  provenance: { note: 'Reference art in 06-originales (AI-generated). Statics were reconstructed on their real grid and reviewed by hand; see modelo/README.md.', sourceSheets },
}, null, 2) + '\n');

// 4. Internal before/after review page (qa/comparacion.html).
await writeComparison(KIT);

// 5. QA gate.
const report = await qaAnimations(KIT, mapReport);
await fs.writeFile(path.join(KIT, 'qa/informe.json'), JSON.stringify(report, null, 2) + '\n');
console.log(summary.join('\n'));
console.log(`QA: ${report.failures.length} failures, ${report.warnings.length} warnings`);
if (report.failures.length) { console.error(report.failures.join('\n')); process.exitCode = 1; }
