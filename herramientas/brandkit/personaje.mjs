/**
 * The character from its original illustrations (brandkit/06-originales), without redrawing:
 * - 14 statics cropped from the expression and pose sheets;
 * - 20 animations cut from the animation sheets, registered on one canvas per sequence (no jitter) and timed by hand
 *   (holds on key poses, quick in-betweens, anticipation and hang time);
 * - a manifest and the gallery page. Output: brandkit/03-personaje. Usage: npm run brandkit:personaje
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import crypto from 'node:crypto';
import { files, removeWorkdir } from './paths.mjs';
import { characterGallery } from './galeria-personaje.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const ORIG = path.join(root, 'brandkit/06-originales');
const current = path.join(root, 'brandkit/03-personaje');
let OUT;
const SHEETS = ['Image Aug 19, 2026, 01_47_20 AM (1).png', ...[2, 3, 4, 5].map(i => `Image Aug 19, 2026, 01_47_21 AM (${i}).png`)];

// Statics: sheet and crop box [left, top, width, height] in sheet pixels.
const STATICS = [
  ['expresion-neutral', 'Neutral', 'Referencia de expresión', 'spritesmeli1.png', [33, 147, 297, 280]],
  ['expresion-contento', 'Contento', 'Éxito discreto', 'spritesmeli1.png', [395, 147, 297, 280]],
  ['expresion-atento', 'Atento', 'Atención y verificación', 'spritesmeli1.png', [755, 147, 297, 280]],
  ['expresion-somnoliento', 'Somnoliento', 'Espera tranquila', 'spritesmeli1.png', [1118, 147, 310, 280]],
  ['expresion-curioso', 'Curioso', 'Ayuda y exploración', 'spritesmeli1.png', [35, 586, 332, 315]],
  ['expresion-asomado', 'Asomado', 'Descubrimiento', 'spritesmeli1.png', [454, 586, 170, 309]],
  ['expresion-cauto', 'Cauto', 'Advertencia recuperable', 'spritesmeli1.png', [734, 627, 343, 247]],
  ['expresion-emocionado', 'Emocionado', 'Celebración breve', 'spritesmeli1.png', [1118, 571, 299, 299]],
  ['pose-sentado', 'Sentado', 'Bienvenida y estados vacíos', 'spritesmeli2.png', [91, 76, 270, 395]],
  ['pose-mensajero', 'Mensajero', 'Envío en curso', 'spritesmeli2.png', [499, 71, 397, 395]],
  ['pose-durmiendo', 'Durmiendo', 'Inactividad', 'spritesmeli2.png', [994, 170, 393, 309]],
  ['pose-tarjeta', 'Tarjeta', 'Tarjeta (ilustración conceptual)', 'spritesmeli2.png', [68, 541, 402, 409]],
  ['pose-qr', 'QR', 'Cobro; el QR es ilustrativo', 'spritesmeli2.png', [585, 549, 316, 433]],
  ['pose-carrito', 'Carrito', 'Procesamiento', 'spritesmeli2.png', [953, 582, 445, 387]],
];

/**
 * Animations. sheet/y: where the row is; erase: label boxes [x0, y0, x1, y1]; n: frames in the row;
 * anchor: 'fur' registers on the cat, 'all' on everything (a fixed prop dominates), 'x' only horizontally (keeps a jump's height);
 * play: [frame, ms] pairs (the timing), frames may repeat or be dropped; loop: true for ambient loops, false for one-shot events.
 */
const SEQUENCES = [
  { id: 'parpadeo', name: 'Parpadeo', purpose: 'Señal de vida en reposo, sin distraer', sheet: 0, y: [20, 200], erase: [[0, 0, 266, 1000]], n: 4, anchor: 'fur', loop: true,
    play: [[0, 2400], [1, 55], [2, 100], [1, 55], [0, 220], [1, 55], [2, 90], [1, 60]] },
  { id: 'oreja', name: 'Oreja', purpose: 'Reacción mínima a un aviso', sheet: 0, y: [238, 415], erase: [[0, 0, 266, 1000]], n: 4, anchor: 'fur', loop: true,
    play: [[0, 1600], [1, 70], [2, 140], [1, 70], [0, 260], [1, 60], [2, 100], [3, 500]] },
  { id: 'mirar', name: 'Mirar alrededor', purpose: 'Invita a explorar', sheet: 0, y: [445, 615], erase: [[0, 0, 266, 1000]], n: 6, anchor: 'fur', loop: true,
    play: [[0, 900], [1, 90], [2, 700], [3, 90], [4, 900], [5, 90]] },
  { id: 'reposo', name: 'Reposo sentado', purpose: 'Bienvenida y estados vacíos', sheet: 0, y: [648, 882], erase: [[0, 0, 266, 1000]], n: 8, anchor: 'fur', loop: true,
    play: [[0, 1000], [1, 120], [2, 800], [1, 120], [0, 600], [6, 90], [0, 500], [5, 160], [3, 160], [0, 600], [7, 900]] },
  { id: 'cola', name: 'Cola', purpose: 'Espera amable, con más presencia que el reposo', sheet: 1, y: [17, 250], erase: [[0, 0, 200, 74]], n: 8, anchor: 'fur', loop: true,
    play: [[0, 500], [1, 100], [2, 100], [3, 120], [4, 260], [5, 110], [6, 100], [7, 400]] },
  { id: 'siesta', name: 'Siesta', purpose: 'Inactividad o espera larga sin operación en curso', sheet: 1, y: [259, 456], erase: [[0, 255, 210, 316]], n: 8, anchor: 'fur', loop: true,
    play: [[0, 600], [1, 600], [2, 600], [1, 600], [0, 600], [4, 450], [5, 600], [6, 450], [0, 600], [7, 220], [0, 600]] },
  { id: 'asomarse', name: 'Asomarse', purpose: 'Descubrimiento: algo nuevo por ver', sheet: 1, y: [460, 668], erase: [[0, 455, 245, 521]], n: 8, anchor: 'all', loop: false,
    play: [[0, 700], [1, 160], [2, 160], [3, 260], [4, 380], [5, 420], [6, 700], [7, 1200]] },
  { id: 'meti-la-pata', name: 'Metí la pata', purpose: 'Error recuperable, con tono amable', sheet: 1, y: [677, 912], erase: [[0, 672, 255, 738]], n: 6, anchor: 'fur', loop: false,
    play: [[0, 600], [1, 160], [2, 500], [3, 160], [4, 260], [5, 1400]] },
  { id: 'salto', name: 'Salto feliz', purpose: 'Éxito confirmado; una vez y breve', sheet: 2, y: [51, 265], erase: [[0, 51, 268, 126]], n: 8, anchor: 'x', loop: false,
    play: [[0, 400], [1, 220], [2, 70], [3, 80], [4, 200], [5, 80], [6, 160], [7, 1000]] },
  { id: 'caminata', name: 'Caminata', purpose: 'Envío en curso; no indica llegada', sheet: 2, y: [290, 470], erase: [[0, 290, 262, 470]], n: 6, anchor: 'fur', loop: true,
    play: [[0, 110], [1, 110], [2, 110], [3, 110], [4, 110], [5, 110]] },
  { id: 'preparando-pago', name: 'Preparando el pago', purpose: 'Procesamiento de una operación', sheet: 2, y: [478, 665], erase: [[0, 478, 262, 548]], n: 8, anchor: 'all', loop: true,
    play: [[0, 300], [1, 120], [2, 120], [3, 120], [4, 120], [5, 120], [6, 260], [7, 800]] },
  { id: 'comprobante', name: 'Comprobante', purpose: 'Comprobante emitido tras un estado confirmado', sheet: 2, y: [700, 915], erase: [[0, 698, 294, 757]], n: 8, anchor: 'fur', loop: false,
    play: [[0, 500], [1, 200], [2, 120], [3, 180], [4, 300], [5, 200], [6, 500], [7, 1200]] },
  // Frame 7 of the sheet shows the rail without the cat: dropped, it reads as a flicker.
  { id: 'reparar-rail', name: 'Reparar el rail', purpose: 'Recuperación de un error del recorrido', sheet: 3, y: [13, 226], erase: [[0, 8, 238, 72]], n: 10, anchor: 'all', loop: false,
    play: [[0, 500], [1, 450], [2, 200], [3, 180], [4, 220], [5, 180], [6, 220], [8, 260], [9, 1200]] },
  // Frame 2 of the sheet shows the boxes without the cat: dropped for the same reason.
  { id: 'intercambio', name: 'Intercambio', purpose: 'Cambio de un activo por otro', sheet: 3, y: [253, 440], erase: [[0, 248, 172, 306]], n: 10, anchor: 'fur', loop: false,
    play: [[0, 500], [1, 200], [3, 180], [4, 220], [5, 180], [6, 220], [7, 250], [8, 500], [9, 1000]] },
  { id: 'creciendo', name: 'Creciendo', purpose: 'Progreso a lo largo del tiempo; no promete rentabilidad', sheet: 3, y: [527, 662], erase: [], n: 10, anchor: 'fur', loop: false,
    play: [[0, 500], [1, 200], [2, 160], [3, 160], [4, 160], [5, 220], [6, 220], [7, 300], [8, 600], [9, 1200]] },
  { id: 'tarjeta', name: 'Pago con tarjeta', purpose: 'Ilustración conceptual de un pago con tarjeta', sheet: 3, y: [754, 905], erase: [], n: 8, anchor: 'fur', loop: false,
    play: [[0, 400], [1, 200], [2, 200], [3, 250], [4, 500], [5, 700], [6, 400], [7, 1000]] },
  { id: 'linterna', name: 'Linterna', purpose: 'Buscar o revisar', sheet: 4, y: [62, 244], erase: [], n: 8, anchor: 'fur', loop: true,
    play: [[0, 400], [1, 200], [2, 500], [3, 500], [4, 400], [5, 300], [6, 400], [7, 500]] },
  { id: 'saludo', name: 'Saludo', purpose: 'Bienvenida', sheet: 4, y: [246, 460], erase: [[0, 244, 220, 300]], n: 6, anchor: 'fur', loop: true,
    play: [[0, 600], [1, 120], [2, 140], [3, 160], [4, 160], [3, 160], [4, 160], [5, 700]] },
  { id: 'mantenimiento', name: 'Mantenimiento', purpose: 'Servicio en mantenimiento', sheet: 4, y: [468, 668], erase: [[0, 466, 290, 519]], n: 10, anchor: 'all', loop: true,
    play: [[0, 400], [1, 200], [2, 220], [3, 260], [4, 220], [5, 180], [6, 220], [7, 300], [8, 500], [9, 900]] },
  { id: 'seguridad', name: 'Seguridad', purpose: 'Protección de la cuenta; ilustración, no garantía', sheet: 4, y: [678, 912], erase: [[0, 676, 240, 729]], n: 8, anchor: 'fur', loop: false,
    play: [[0, 500], [1, 180], [2, 250], [3, 150], [4, 220], [5, 500], [7, 700], [6, 900]] },
];

const ALPHA = 24; // ink on the sheet
const isFur = (r, g, b) => r > 150 && r - g > 70 && g < 140 && b < 120;

async function sheet(file) {
  const { data, info } = await sharp(path.join(ORIG, file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, W: info.width, H: info.height };
}

/** Frames of one row: connected components grouped around the n cat bodies; labels erased first. */
function cut(S, seq) {
  const [y0, y1] = seq.y, W = S.W, H = y1 - y0 + 1, at = (x, y) => ((y + y0) * W + x) * 4;
  const erased = (x, y) => seq.erase.some(([a, b, c, d]) => x >= a && x < c && y + y0 >= b && y + y0 < d);
  const on = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (S.data[at(x, y) + 3] > ALPHA && !erased(x, y)) on[y * W + x] = 1;
  const lab = new Int32Array(W * H).fill(-1), comps = [];
  for (let i = 0; i < W * H; i++) {
    if (!on[i] || lab[i] >= 0) continue;
    const c = { id: comps.length, x0: 1e9, x1: -1, y0: 1e9, y1: -1, n: 0, fur: 0 }, st = [i]; lab[i] = c.id;
    while (st.length) {
      const j = st.pop(), x = j % W, y = (j / W) | 0, k = at(x, y);
      c.n++; c.x0 = Math.min(c.x0, x); c.x1 = Math.max(c.x1, x); c.y0 = Math.min(c.y0, y); c.y1 = Math.max(c.y1, y);
      if (isFur(S.data[k], S.data[k + 1], S.data[k + 2])) c.fur++;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= W || Y >= H) continue;
        const q = Y * W + X; if (on[q] && lab[q] < 0) { lab[q] = c.id; st.push(q); }
      }
    }
    comps.push(c);
  }
  const cats = [...comps].sort((a, b) => b.fur - a.fur).slice(0, seq.n).sort((a, b) => a.x0 - b.x0);
  const owner = new Map(cats.map((c, i) => [c.id, i]));
  const dist = (c, k) => Math.max(0, k.x0 - c.x1, c.x0 - k.x1) + Math.max(0, k.y0 - c.y1, c.y0 - k.y1) * 0.25;
  for (const c of comps) if (!owner.has(c.id) && c.n >= 12) owner.set(c.id, cats.reduce((b, k, i) => (dist(c, k) < dist(c, cats[b]) ? i : b), 0));
  const boxes = cats.map(() => ({ x0: 1e9, x1: -1, y0: 1e9, y1: -1 }));
  for (const c of comps) { const f = owner.get(c.id); if (f === undefined) continue; const B = boxes[f]; B.x0 = Math.min(B.x0, c.x0); B.x1 = Math.max(B.x1, c.x1); B.y0 = Math.min(B.y0, c.y0); B.y1 = Math.max(B.y1, c.y1); }
  return boxes.map((B, fi) => {
    const w = B.x1 - B.x0 + 1, h = B.y1 - B.y0 + 1, buf = Buffer.alloc(w * h * 4), fur = new Uint8Array(w * h), all = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const X = B.x0 + x, Y = B.y0 + y, l = lab[Y * W + X]; if (l < 0 || owner.get(l) !== fi) continue;
      const k = at(X, Y); S.data.copy(buf, (y * w + x) * 4, k, k + 4); all[y * w + x] = 1;
      if (isFur(S.data[k], S.data[k + 1], S.data[k + 2])) fur[y * w + x] = 1;
    }
    return { y: B.y0 + y0, w, h, buf, fur, all };
  });
}

function overlap(A, B, dx, dy, step = 1) {
  let I = 0, U = 0;
  const X0 = Math.min(0, dx), Y0 = Math.min(0, dy), X1 = Math.max(A.w, B.w + dx), Y1 = Math.max(A.h, B.h + dy);
  for (let y = Y0; y < Y1; y += step) for (let x = X0; x < X1; x += step) {
    const a = x >= 0 && y >= 0 && x < A.w && y < A.h && A.m[y * A.w + x];
    const bx = x - dx, by = y - dy, b = bx >= 0 && by >= 0 && bx < B.w && by < B.h && B.m[by * B.w + bx];
    if (a && b) I++; if (a || b) U++;
  }
  return U ? I / U : 0;
}

/** Positions on a common canvas: base-centre of the anchor mask, refined by overlap with the first and previous frames. */
function register(frames, anchor, refine = 10) {
  const masks = frames.map(f => ({ w: f.w, h: f.h, m: anchor === 'all' ? f.all : f.fur }));
  const pos = masks.map((M, i) => {
    let x0 = 1e9, x1 = -1, y1 = -1;
    for (let y = 0; y < M.h; y++) for (let x = 0; x < M.w; x++) if (M.m[y * M.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
    return { x: Math.round(-(x0 + x1) / 2), y: anchor === 'x' ? frames[i].y : -y1 };
  });
  if (anchor === 'x') return pos;
  const score = (i, dx, dy, step) => overlap(masks[0], masks[i], pos[i].x + dx - pos[0].x, pos[i].y + dy - pos[0].y, step) + overlap(masks[i - 1], masks[i], pos[i].x + dx - pos[i - 1].x, pos[i].y + dy - pos[i - 1].y, step);
  for (let i = 1; i < frames.length; i++) {
    let best = { s: -1, dx: 0, dy: 0 };
    for (let dy = -refine; dy <= refine; dy += 2) for (let dx = -refine; dx <= refine; dx += 2) { const s = score(i, dx, dy, 2); if (s > best.s) best = { s, dx, dy }; }
    let fine = { s: -1, dx: best.dx, dy: best.dy };
    for (let dy = best.dy - 1; dy <= best.dy + 1; dy++) for (let dx = best.dx - 1; dx <= best.dx + 1; dx++) { const s = score(i, dx, dy, 1); if (s > fine.s) fine = { s, dx, dy }; }
    pos[i] = { x: pos[i].x + fine.dx, y: pos[i].y + fine.dy };
  }
  return pos;
}

// Validate every source before replacing any generated output.
const sourceNames = [...new Set([...STATICS.map(s => s[3]), ...SHEETS])];
const sourceSheets = [];
for (const file of sourceNames) {
  const bytes = await fs.readFile(path.join(ORIG, file));
  const m = await sharp(bytes).metadata();
  for (const [, , , source, [left, top, width, height]] of STATICS) {
    if (source === file && (left + width > m.width || top + height > m.height)) throw new Error(`Crop outside original: ${file}`);
  }
  sourceSheets.push({ file, sha256: crypto.createHash('sha256').update(bytes).digest('hex') });
}
if ((await fs.lstat(current)).isSymbolicLink()) throw new Error('Character folder cannot be a symlink');
await files(current);
async function fingerprint(dir) {
  const digest = crypto.createHash('sha256');
  for (const file of await files(dir)) {
    digest.update(path.relative(dir,file)+'\0');
    digest.update(await fs.readFile(file));
  }
  return digest.digest('hex');
}
const lockPath = path.join(root, '.brandkit-build.lock');
const lock = await fs.open(lockPath, 'wx');
let work, keepWork = false;
try {
const initialFingerprint = await fingerprint(current);
work = await fs.mkdtemp(path.join(root, '.brandkit-work-'));
OUT = path.join(work, 'character');
await fs.cp(current, OUT, { recursive: true });
for (const dir of ['estaticos', 'animaciones']) await fs.rm(path.join(OUT, dir), { recursive: true, force: true });
await fs.mkdir(path.join(OUT, 'estaticos'), { recursive: true });
await fs.mkdir(path.join(OUT, 'animaciones/fotogramas'), { recursive: true });

// 2. Statics: exact crops, trimmed to their content.
const statics = [];
for (const [id, name, purpose, file, [left, top, width, height]] of STATICS) {
  const crop = await sharp(path.join(ORIG, file)).extract({ left, top, width, height }).png().toBuffer(); // trim runs before extract in one pipeline
  const png = await sharp(crop).trim({ threshold: 0 }).png({ compressionLevel: 9 }).toBuffer();
  await fs.writeFile(path.join(OUT, 'estaticos', `${id}.png`), png);
  const m = await sharp(png).metadata();
  statics.push({ id, name, purpose, file: `estaticos/${id}.png`, width: m.width, height: m.height, source: { file, crop: [left, top, width, height] } });
}

// 3. Animations.
const sheets = {}, animations = [];
for (const seq of SEQUENCES) {
  const S = sheets[seq.sheet] ??= await sheet(SHEETS[seq.sheet]);
  const frames = cut(S, seq);
  if (frames.length !== seq.n) throw new Error(`${seq.id}: expected ${seq.n} frames, found ${frames.length}`);
  const pos = register(frames, seq.anchor);
  const m = 8, x0 = Math.min(...pos.map(p => p.x)) - m, y0 = Math.min(...pos.map(p => p.y)) - m;
  const W = Math.max(...frames.map((f, i) => pos[i].x + f.w)) - x0 + m, H = Math.max(...frames.map((f, i) => pos[i].y + f.h)) - y0 + m;
  const canvas = [];
  for (let i = 0; i < frames.length; i++) {
    const f = frames[i], img = await sharp(f.buf, { raw: { width: f.w, height: f.h, channels: 4 } }).png().toBuffer();
    canvas.push(await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: img, left: pos[i].x - x0, top: pos[i].y - y0 }]).png({ compressionLevel: 9 }).toBuffer());
  }
  // Only the frames the timing uses are delivered, numbered in playing order of first appearance.
  const used = [...new Set(seq.play.map(([f]) => f))];
  const dir = path.join(OUT, 'animaciones/fotogramas', seq.id);
  await fs.mkdir(dir, { recursive: true });
  const number = new Map(used.map((f, k) => [f, k + 1]));
  for (const f of used) await fs.writeFile(path.join(dir, `${String(number.get(f)).padStart(2, '0')}.png`), canvas[f]);
  const playback = seq.play.map(([f, ms]) => ({ frame: `fotogramas/${seq.id}/${String(number.get(f)).padStart(2, '0')}.png`, ms }));
  await sharp(seq.play.map(([f]) => canvas[f]), { join: { animated: true } })
    .webp({ loop: 0, delay: seq.play.map(([, ms]) => ms), lossless: true }).toFile(path.join(OUT, 'animaciones', `${seq.id}.webp`));
  animations.push({ id: seq.id, name: seq.name, purpose: seq.purpose, playback: seq.loop ? 'loop' : 'once', canvas: { width: W, height: H },
    frames: used.length, totalMs: seq.play.reduce((n, [, ms]) => n + ms, 0), preview: `${seq.id}.webp`, sequence: playback });
}
const manifest = { schemaVersion: 1, status: 'candidate', source: '06-originales', sourceSheets, statics,
  note: 'Raster crops from original sheets, not closed-palette pixel art. All WebP previews loop; playback specifies the intended product mode. ms = duration of each step; frames may repeat.',
  animations };
await fs.writeFile(path.join(OUT, 'animaciones/manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
await fs.writeFile(path.join(OUT, 'galeria.html'), characterGallery(manifest));
if (initialFingerprint !== await fingerprint(current)) throw new Error('Character changed during generation; refusing replacement');
const previous = path.join(work, 'previous');
await fs.rename(current, previous);
try { await fs.rename(OUT, current); }
catch (error) {
  try { await fs.rename(previous, current); }
  catch (rollbackError) { keepWork = true; throw new AggregateError([error, rollbackError], `Recovery copy retained at ${previous}`); }
  throw error;
}
console.log(JSON.stringify({ statics: statics.length, animations: animations.length, frames: animations.reduce((n, a) => n + a.frames, 0), status: 'candidate' }));
} finally {
  await lock.close();
  await fs.unlink(lockPath);
  if (work && !keepWork) await removeWorkdir(root, work);
}
