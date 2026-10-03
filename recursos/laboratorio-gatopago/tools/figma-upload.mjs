import { readFile, writeFile } from 'node:fs/promises';
const job = JSON.parse(await readFile(process.argv[2], 'utf8'));
const results = [];
let cursor = 0;
async function worker() {
  while (cursor < job.uploads.length) {
    const i = cursor++;
    const asset = job.assets[i];
    const response = await fetch(job.uploads[i].submitUrl, { method: 'POST', headers: { 'Content-Type': asset.kind === 'svg' ? 'image/svg+xml' : 'image/' + asset.kind }, body: await readFile(asset.path) });
    const body = await response.text();
    let parsed; try { parsed = JSON.parse(body); } catch { parsed = { message: body.slice(0, 400) }; }
    results[i] = { path: asset.path, targetId: asset.targetId, status: response.status, result: parsed };
    console.log(JSON.stringify({ index: i, path: asset.path, status: response.status, nodeId: parsed.nodeId, error: response.ok ? undefined : parsed }));
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
if (job.commitUrl && results.every(r => r.status >= 200 && r.status < 300)) {
  const response = await fetch(job.commitUrl, { method: 'POST' });
  if (!response.ok) throw new Error('Batch commit failed: ' + response.status);
}
await writeFile(job.resultPath, JSON.stringify(results, null, 2) + '\n');
if (results.some(r => r.status < 200 || r.status >= 300)) process.exitCode = 1;
