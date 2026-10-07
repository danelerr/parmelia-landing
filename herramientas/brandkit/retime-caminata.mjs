/** Timing only: retain the existing WebP frame payloads, artwork and frame order. */
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

export function retimeWebp(bytes, delays) {
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  assert.equal(bytes.readUInt32LE(4) + 8, bytes.length);
  assert(delays.every(ms => Number.isInteger(ms) && ms >= 50 && ms <= 0xffffff));
  const result = Buffer.from(bytes);
  let frame = 0, offset = 12;
  while (offset < bytes.length) {
    assert(offset + 8 <= bytes.length, 'Truncated WebP chunk');
    const size = bytes.readUInt32LE(offset + 4);
    assert(offset + 8 + size <= bytes.length, 'Truncated WebP payload');
    if (bytes.toString('ascii', offset, offset + 4) === 'ANMF') {
      assert(size >= 16 && frame < delays.length, 'Unexpected animation frame');
      // ANMF has 12 bytes of geometry, then a three-byte duration. No re-encoding.
      result.writeUIntLE(delays[frame++], offset + 20, 3);
    }
    offset += 8 + size + (size & 1);
  }
  assert.equal(offset, bytes.length);
  assert.equal(frame, delays.length);
  return result;
}

async function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const base = path.join(root, 'brandkit/03-personaje/animaciones');
  const manifestPath = path.join(base, 'manifest.json');
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  const walk = manifest.animations.find(a => a.id === 'caminata');
  assert.equal(walk.frames, 6);
  assert.equal(walk.sequence.length, 6);
  assert.equal(walk.preview, 'caminata.webp');
  const delays = Array(6).fill(130);
  const previewPath = path.join(base, walk.preview);
  const preview = retimeWebp(await fs.readFile(previewPath), delays);
  walk.sequence.forEach((step, i) => { step.ms = delays[i]; });
  walk.totalMs = delays.reduce((a, b) => a + b, 0);
  await fs.writeFile(previewPath, preview);
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(JSON.stringify({ animation: walk.id, frames: walk.frames, delayMs: 130,
    totalMs: walk.totalMs, framePayloadsUnchanged: true }));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
