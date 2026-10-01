// Ink outline closure: fill cells that touch the outside become outline (silhouettes are always inked).
import { EMPTY } from './pixmap.mjs';

export function closeOutline(rows, keep = new Set(['#'])) {
  const H = rows.length, W = rows[0].length, out = Array.from({ length: H }, () => new Uint8Array(W)), stack = [];
  for (let x = 0; x < W; x++) stack.push([x, 0], [x, H - 1]);
  for (let y = 0; y < H; y++) stack.push([0, y], [W - 1, y]);
  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || y < 0 || x >= W || y >= H || out[y][x] || rows[y][x] !== EMPTY) continue;
    out[y][x] = 1; stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }
  return rows.map((row, y) => [...row].map((ch, x) => {
    if (ch === EMPTY || keep.has(ch)) return ch;
    const touches = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
      const X = x + dx, Y = y + dy; return X < 0 || Y < 0 || X >= W || Y >= H || out[Y][X];
    });
    return touches ? '#' : ch;
  }).join(''));
}
