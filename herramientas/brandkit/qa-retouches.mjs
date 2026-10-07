/** Local visual comparison; this does not replace artwork or publish anything. */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import crypto from 'node:crypto';
const root = process.cwd();
const work = path.join(root, 'output/qa-retouches-2026-10-05');
const sequences = ['cola', 'meti-la-pata'];
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const mode = process.argv[2] ?? 'before';
const allowed = file => /(?:cola|meti-la-pata)(?:\/|\.|-)/.test(file) || [
  'brandkit/manifest.json', 'brandkit/CONTROL-DE-CALIDAD.md', 'brandkit/CHANGELOG.md',
  'brandkit/03-personaje/README.md', 'brandkit/03-personaje/exportaciones.json',
  'brandkit/03-personaje/animaciones/manifest.json', 'brandkit/03-personaje/galeria.html',
].includes(file);
await fs.mkdir(work, { recursive: true });
if (mode === 'before') {
  const baseline = {};
  async function walk(dir) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(file);
      else baseline[path.relative(root, file).replaceAll('\\', '/')] = hash(await fs.readFile(file));
    }
  }
  await walk(path.join(root, 'brandkit'));
  await fs.writeFile(path.join(work, 'baseline.json'), JSON.stringify(baseline, null, 2));
}
for (const id of sequences) {
  const dir = path.join(root, 'brandkit/03-personaje/animaciones/fotogramas', id);
  const names = (await fs.readdir(dir)).filter(f => f.endsWith('.png')).sort();
  const frames = [];
  for (const name of names) {
    const bytes = await fs.readFile(path.join(dir, name));
    if (mode === 'before') {
      await fs.mkdir(path.join(work, 'before', id), { recursive: true });
      await fs.writeFile(path.join(work, 'before', id, name), bytes);
    }
    const m = await sharp(bytes).metadata();
    const input = await sharp(bytes).resize(m.width * 2, m.height * 2, { kernel: 'nearest' }).png().toBuffer();
    frames.push({ input, left: (frames.length % 4) * 420 + 10, top: Math.floor(frames.length / 4) * 450 + 30 });
  }
  await sharp({ create: { width: 1680, height: Math.ceil(frames.length / 4) * 450, channels: 4, background: '#fff8f0' } })
    .composite(frames).png().toFile(path.join(work, `${mode}-${id}.png`));
}
if (mode === 'after') {
  const baseline = JSON.parse(await fs.readFile(path.join(work, 'baseline.json')));
  const changed = [];
  for (const [file, digest] of Object.entries(baseline)) {
    if (hash(await fs.readFile(path.join(root, file))) !== digest) changed.push(file);
  }
  const unexpected = changed.filter(file => !allowed(file));
  if (unexpected.length) throw new Error(`Unexpected artwork changes: ${unexpected.join(', ')}`);
  const originals = Object.keys(baseline).filter(f => f.startsWith('brandkit/06-originales/'));
  const pixelAudit = [];
  for (const id of sequences) {
    const dir = path.join(root, 'brandkit/03-personaje/animaciones/fotogramas', id);
    const box = id === 'cola' ? [72, 119, 138, 185] : [70, 129, 136, 195];
    for (const name of (await fs.readdir(dir)).filter(f => f.endsWith('.png')).sort()) {
      const before = await sharp(path.join(work, 'before', id, name)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const after = await sharp(path.join(dir, name)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      if (JSON.stringify(before.info) !== JSON.stringify(after.info)) throw new Error(`Canvas changed: ${id}/${name}`);
      // Independently identify the opaque head, above the body, for preservation QA.
      const W = before.info.width, top = before.info.height - 74;
      const seen = new Uint8Array(W * top), components = [];
      for (let i = 0; i < seen.length; i++) {
        if (seen[i] || before.data[i * 4 + 3] < 120) continue;
        const stack = [i], component = []; seen[i] = 1;
        while (stack.length) {
          const p = stack.pop(), x = p % W, y = Math.floor(p / W); component.push(p);
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const X = x + dx, Y = y + dy, q = Y * W + X;
            if (X < 0 || X >= W || Y < 0 || Y >= top || seen[q] || before.data[q * 4 + 3] < 120) continue;
            seen[q] = 1; stack.push(q);
          }
        }
        components.push(component);
      }
      components.sort((a, b) => b.length - a.length);
      const head = new Set(components[0]);
      const tail = components[1];
      const xs = tail.map(p => p % W), ys = tail.map(p => Math.floor(p / W));
      const tailBox = [Math.min(...xs) - 14, Math.min(...ys) - 2, Math.max(...xs) + 2, top - 1];
      let pixels = 0, outside = 0, headChanges = 0, paintedPixels = 0, compositedEdges = 0;
      for (let p = 0; p < before.data.length; p += 4) {
        if (before.data.subarray(p, p + 4).equals(after.data.subarray(p, p + 4))) continue;
        const x = (p / 4) % before.info.width, y = Math.floor(p / 4 / before.info.width);
        const ear = id === 'meti-la-pata' && name === '01.png' && x < 80 && y < 40;
        const inside = x >= box[0] && x <= box[2] && y >= box[1] && y <= box[3];
        const tailArea = (y >= top && y <= box[3] && x >= box[0]) || (x >= tailBox[0] && x <= tailBox[2] && y >= tailBox[1] && y <= tailBox[3]);
        pixels++;
        if (!ear && head.has(p / 4) && before.data[p + 3] === 255) headChanges++;
        if (!inside && !tailArea && !ear) outside++;
        // Above the body, allow only the donor or correct source-over edge blending.
        if (y < top && !ear && after.data[p + 3]) {
          const donor = (y * W + x + 12) * 4;
          if (!after.data.subarray(p, p + 4).equals(before.data.subarray(donor, donor + 4))) {
            const front = before.data[p + 3], back = before.data[donor + 3];
            const remaining = back * (1 - front / 255), alpha = front + remaining;
            const expected = [0,1,2].map(c => Math.round((before.data[p+c]*front + before.data[donor+c]*remaining)/alpha));
            expected.push(Math.round(alpha));
            if (front && front < 255 && after.data.subarray(p,p+4).equals(Buffer.from(expected))) compositedEdges++;
            else paintedPixels++;
          }
        }
      }
      if (outside || headChanges || paintedPixels) throw new Error(`Unexpected pixel changes ${id}/${name}: outside=${outside}, head=${headChanges}, painted=${paintedPixels}`);
      pixelAudit.push({ id, frame: name, pixels, outside, headChanges, paintedPixels, compositedEdges });
    }
  }
  const report = { changedFiles: changed, originalsUnchanged: originals.length, unexpected, pixelAudit };
  await fs.writeFile(path.join(work, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
