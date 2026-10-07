/** Place foreground over background using straight RGBA, without a white matte. */
function overPixel(background, bi, foreground, fi) {
  const front = foreground[fi + 3], back = background[bi + 3];
  if (!front) return;
  if (front === 255 || !back) {
    foreground.copy(background, bi, fi, fi + 4);
    return;
  }
  const remaining = back * (1 - front / 255), alpha = front + remaining;
  for (let c = 0; c < 3; c++) background[bi + c] = Math.round((foreground[fi + c] * front + background[bi + c] * remaining) / alpha);
  background[bi + 3] = Math.round(alpha);
}

/** Copy the intact left lower-body pixels in mirror; no painting or interpolation. */
export function mirrorPaw(data, width, height) {
  const at = (x, y) => (y * width + x) * 4;
  const scores = [];
  for (let x = 65; x <= 95; x++) {
    let score = 0;
    for (let y = height - 58; y < height - 12; y++) {
      const p = at(x, y);
      if (data[p + 3] > 150 && data[p] < 45 && data[p + 1] < 45 && data[p + 2] < 45) score++;
    }
    scores.push({ x, score });
  }
  const max = Math.max(...scores.map(p => p.score));
  if (max < 15) throw new Error('Could not locate the front-paw separator');
  const line = scores.filter(p => p.score >= max - 1).map(p => p.x);
  const axis = line[Math.floor(line.length / 2)];
  const output = Buffer.from(data);
  const top = height - 74, bottom = height - 8;
  // The head and tail are separate connected silhouettes above the shoulders.
  // Track a whole component, not independent scanlines (which split at whiskers).
  const labels = new Int32Array(width * top).fill(-1), components = [];
  for (let i = 0; i < labels.length; i++) {
    if (labels[i] >= 0 || data[i * 4 + 3] < 120) continue;
    const id = components.length, stack = [i], pixels = [];
    labels[i] = id;
    while (stack.length) {
      const p = stack.pop(), x = p % width, y = Math.floor(p / width);
      pixels.push(p);
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const X = x + dx, Y = y + dy, q = Y * width + X;
        if (X < 0 || X >= width || Y < 0 || Y >= top || labels[q] >= 0 || data[q * 4 + 3] < 120) continue;
        labels[q] = id; stack.push(q);
      }
    }
    components.push({ id, pixels });
  }
  const [head, tip] = components.sort((a, b) => b.pixels.length - a.pixels.length);
  if (!head || !tip || tip.pixels.length < 100) throw new Error('Could not separate the tail silhouette');
  const ranges = Array.from({ length: top }, () => [width, -1]);
  for (const p of tip.pixels) {
    const x = p % width, y = Math.floor(p / width);
    ranges[y][0] = Math.min(ranges[y][0], x);
    ranges[y][1] = Math.max(ranges[y][1], x);
  }
  const tail = [];
  for (let y = 0; y <= bottom; y++) {
    let start = axis + 44;
    let end = width - 1;
    if (y < top) {
      // Two pixels include the existing translucent contour, without resampling.
      start = width; end = -1;
      for (let Y = Math.max(0, y - 2); Y <= Math.min(top - 1, y + 2); Y++) {
        if (ranges[Y][1] < 0) continue;
        start = Math.min(start, ranges[Y][0] - 2);
        end = Math.max(end, ranges[Y][1] + 2);
      }
    }
    for (let x = start; x <= end; x++) {
      const p = at(x, y);
      if (!data[p + 3] || (y < top && labels[y * width + x] === head.id)) continue;
      tail.push({ x, y, pixel: Buffer.from(data.subarray(p, p + 4)) });
      output.fill(0, p, p + 4);
    }
  }
  // Clear the old hip, including its rectangular remnant. Put the intact tail
  // behind the narrower mirrored paw; its cropped root is hidden by that paw.
  for (let y = top; y <= bottom; y++) for (let x = axis + 1; x <= axis + 56; x++) output.fill(0, at(x, y), at(x, y) + 4);
  for (const { x, y, pixel } of tail) {
    const X = x - 12;
    // Keep the head in front, but blend its translucent edge over the tail.
    // Merely skipping that edge leaves a light seam where the background bleeds through.
    overPixel(pixel, 0, output, at(X, y));
    pixel.copy(output, at(X, y));
  }
  for (let y = height - 74; y <= height - 8; y++) {
    for (let x = axis + 1; x <= axis + 56; x++) {
      const source = at(2 * axis - x, y);
      overPixel(output, at(x, y), data, source);
    }
  }
  return output;
}
