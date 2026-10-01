import test from 'node:test';
import assert from 'node:assert/strict';
import { Grid, lineCells, drawLine, polygonCells, outlineCells, mirrorX, defects, fixLone, fixIslands, vectorize } from '../mascota/lib/trazo.mjs';

const runs = cells => { const out = []; let n = 1; for (let i = 1; i < cells.length; i++) { if (cells[i][1] === cells[i - 1][1]) n++; else { out.push(n); n = 1; } } out.push(n); return out; };

test('lines step regularly; { run } forces an exact 1:n slope', () => {
  assert.deepEqual(runs(lineCells(0, 0, 9, 3, { run: 3 })), [3, 3, 3, 1]);
  const r = runs(lineCells(0, 0, 40, 10));
  assert.ok(Math.max(...r) - Math.min(...r.slice(1, -1)) <= 1, `uneven runs ${r}`);
});

test('a 2-cell line holds exactly 2 cells in every column (no thick steps)', () => {
  const g = new Grid(30, 12); drawLine(g, [1, 1], [25, 7], '#', { width: 2 });
  const rows = g.rows();
  for (let x = 1; x <= 25; x++) assert.equal(rows.filter(r => r[x] === '#').length, 2, `column ${x}`);
});

test('a square turned atan(1/4) rasterises with exact 4:1 steps on its top edge', () => {
  const t = Math.atan(1 / 4), c = Math.cos(t), s = Math.sin(t);
  const sq = [[-10, -10], [10, -10], [10, 10], [-10, 10]].map(([u, v]) => [20 + u * c - v * s, 20 + u * s + v * c]);
  const cells = polygonCells([sq], 40, 40), top = {};
  for (const [x, y] of cells) top[x] = Math.min(top[x] ?? Infinity, y);
  const xs = Object.keys(top).map(Number).sort((a, b) => a - b), peak = xs.reduce((a, x) => (top[x] < top[a] ? x : a), xs[0]);
  const edge = xs.filter(x => x > peak).map(x => [x, top[x]]).slice(0, 16);
  assert.deepEqual(runs(edge).slice(1, 3), [4, 4]);
});

test('the outline band is 2 cells on straight edges', () => {
  const g = new Grid(12, 10); for (let y = 1; y < 9; y++) for (let x = 1; x < 11; x++) g.set(x, y, 'o');
  g.paint(outlineCells(g.rows(), 2), '#');
  assert.equal(g.rows()[5], '.##oooooo##.');
  assert.equal(g.rows()[2], '.##########.');
});

test('mirrorX copies the left half onto the right', () => {
  assert.deepEqual(mirrorX(['ab..'], 2), ['abba']);
});

test('defects and clean-ups: lone cells, spikes, notches and tiny islands', () => {
  const rows = ['#####', '#o#o#', '#####', '..#..'];
  const d = defects(rows);
  assert.equal(d.lone.length, 2);
  assert.deepEqual(d.spikes, [[2, 3]]);
  assert.deepEqual(fixLone(rows).slice(0, 3), ['#####', '#####', '#####']);
  assert.deepEqual(fixIslands(['####', '#oo#', '####']), ['####', '####', '####']);
  assert.deepEqual(fixIslands(['#####', '#ooo#', '#####']), ['#####', '#ooo#', '#####']);
});

test('vectorize turns a block staircase into the straight line through its middle', () => {
  const B = 6, loops = vectorize((x, y) => Math.floor(x / B) <= Math.floor(y / B), 60, 60, { eps: 2, corner: 9 });
  assert.equal(loops.length, 1);
  assert.equal(loops[0].length, 3);
});
