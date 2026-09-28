// Rig: face variants, poses and props for the mascot, built only from the 2026-09-25 pieces (animaciones/piezas-v1).
import { load, blank, draw, cells, region, patch, text, CANVAS, ANCHOR } from './lib/anim.mjs';
import { rotspriteBest, line } from './lib/rotsprite.mjs';
import { closeOutline } from './lib/outline.mjs';
import { EMPTY } from './lib/pixmap.mjs';

export const SIT = await load('body-sitting');          // 23 x 33, axis col 11
export const QR = await load('body-qr');
// Sitting sprite placement: axis col 11 -> canvas col 24; bottom row 32 -> baseline row 42.
export const SIT_X = ANCHOR.x - 11, SIT_Y = ANCHOR.y - 32;

// ---- Face (sprite coordinates of body-sitting) -------------------------------------------
const EYE_L = 6, EYE_R = 15, EYE_Y = 10;                // 2x3 eye boxes
const clearEyes = s => { for (const x0 of [EYE_L - 1, EYE_R - 1]) s = patch(s, ['oooo', 'oooo', 'oooo'], x0, EYE_Y); return s; };
export const EYES = {
  open: s => s,
  half: s => { s = clearEyes(s); for (const x of [EYE_L, EYE_R]) s = patch(s, ['##', '##'], x, EYE_Y + 1); return s; },
  closed: s => { s = clearEyes(s); for (const x of [EYE_L, EYE_R]) s = patch(s, ['##'], x, EYE_Y + 2); return s; },
  // Closed but slightly wider line reads better at small sizes.
  shut: s => { s = clearEyes(s); for (const x of [EYE_L - 1, EYE_R - 1]) s = patch(s, ['####'], x, EYE_Y + 2); return s; },
  happy: s => { s = clearEyes(s); for (const x of [EYE_L - 1, EYE_R - 1]) s = draw(s, text('.##.\n#..#'), x, EYE_Y + 1); return s; },
  left: s => { s = clearEyes(s); for (const x of [EYE_L - 1, EYE_R - 1]) s = patch(s, ['##', '##', '##'], x, EYE_Y); return s; },
  right: s => { s = clearEyes(s); for (const x of [EYE_L + 1, EYE_R + 1]) s = patch(s, ['##', '##', '##'], x, EYE_Y); return s; },
  up: s => { s = clearEyes(s); for (const x of [EYE_L, EYE_R]) s = patch(s, ['##', '##', 'oo'], x, EYE_Y - 1); return s; },
  shine: s => { for (const x of [EYE_L, EYE_R]) s = cells(s, [[x + 1, EYE_Y, 'w']]); return s; },
  wide: s => { s = clearEyes(s); for (const x of [EYE_L - 1, EYE_R]) s = patch(s, ['#w#', '###', '###'], x, EYE_Y); return s; },
  dizzy: s => { s = clearEyes(s); for (const x of [EYE_L - 1, EYE_R - 1]) s = draw(s, text('#..#\n.##.\n#..#'), x, EYE_Y); return s; },
};
const clearMouth = s => patch(s, ['o'.repeat(9), 'o'.repeat(9)], 7, 15);
export const MOUTH = {
  smile: s => s,
  open: s => draw(clearMouth(s), text('.###.\n#ppp#\n.###.'), 9, 15),           // excited, jump apex
  wide: s => draw(clearMouth(s), text('#.....#\n.#ppp#.\n..###..'), 8, 15),     // big happy
  flat: s => draw(clearMouth(s), text('#####'), 9, 16),
  wavy: s => draw(clearMouth(s), text('.#..#..\n#.##.##'), 8, 15),             // nervous
  o: s => draw(clearMouth(s), text('.#.\n#p#\n.#.'), 10, 15),                    // small surprised "o"
};
export const face = (s, eyes = 'open', mouth = 'smile') => MOUTH[mouth](EYES[eyes](s));

// ---- Poses ------------------------------------------------------------------------------------
/** Place a sprite so its (ax, ay) sprite point lands on canvas (cx, cy). */
export const place = (canvas, s, ax, ay, cx = ANCHOR.x, cy = ANCHOR.y, clip) => draw(canvas, s, cx - ax, cy - ay, clip);
// Bottom-anchored: taller (stretched) sprites grow upwards, feet stay on the baseline.
const lastRow = s => { let y = s.length - 1; while (y > 0 && /^\.*$/.test(s[y])) y--; return y; };
export const sitAt = (canvas, s, dx = 0, dy = 0, clip) => draw(canvas, s, SIT_X + dx, ANCHOR.y - lastRow(s) + dy, clip);

/** Breathing / squash: remove a torso row (head drops 1) or duplicate one (head rises 1). */
export const TORSO_ROW = 21;
export const squash = s => [EMPTY.repeat(s[0].length), ...s.slice(0, TORSO_ROW), ...s.slice(TORSO_ROW + 1)];
export const stretch = s => [...s.slice(0, TORSO_ROW + 1), s[TORSO_ROW], ...s.slice(TORSO_ROW + 1)];   // one row taller

// ---- Tail-up variant: both forepaws visible, tail raised behind the right haunch --------------
const lowerMirrored = (() => {
  // Rows 21-32: mirror the left half (cols 0-10) onto cols 12-22 about the leg separator (col 11).
  let s = SIT.map((row, y) => y < 21 ? row : [...row].map((ch, x) => (x > 11 ? row[22 - x] ?? EMPTY : ch)).join(''));
  return s;
})();
// The raised tail from body-qr (qr cols 19-27, rows 24-34), tail cells only.
export const TAIL = text(`
.....###.
.....#oo#
....#soo#
....#sso#
...#ooss#
...#soo#.
..#sss##.
.#ooss#..
#ssoo#...
sssoo#...
.####....`);
export const TAIL_BASE = [1, 9];                          // pivot inside the tail sprite (bottom-left)
/** Tail rotated about its base; returns { sprite, base } with the base's new position. */
export function tailPose(deg) {
  if (!deg) return { sprite: TAIL, base: TAIL_BASE };
  const r = rotspriteBest(TAIL, deg);
  const [bx, by] = r.forward(TAIL_BASE[0] + 0.5, TAIL_BASE[1] + 0.5);
  // Trim empty borders but keep track of the base.
  let x0 = Infinity, y0 = Infinity, x1 = -1, y1 = -1;
  r.forEach((row, y) => [...row].forEach((ch, x) => { if (ch !== EMPTY) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); } }));
  return { sprite: r.slice(y0, y1 + 1).map(row => row.slice(x0, x1 + 1)), base: [Math.floor(bx) - x0, Math.floor(by) - y0] };
}
/** Sitting cat with raised tail. Tail base sits behind the right haunch at sprite (18, 29). */
export function sittingTailUp(tailDeg = 0, body = lowerMirrored) {
  const { sprite, base } = tailPose(tailDeg);
  // Compose on a wider sprite canvas: 31 x 33 (cols 0-22 body, tail may reach col 30).
  let s = Array.from({ length: 33 }, () => EMPTY.repeat(31));
  s = draw(s, sprite, 18 - base[0], 29 - base[1]);
  s = draw(s, body, 0, 0);
  return s;
}
export { blank, draw, cells, region, patch, text, CANVAS, ANCHOR };

// ---- Props -----------------------------------------------------------------------------------------
export const SPARKLE_S = text(`
.l.
lwl
.l.`);
export const SPARKLE_M = text(`
..l..
..l..
llwll
..l..
..l..`);
export const DROP = text(`
.#..
#i#.
#ii#
#iw#
.##.`);
export const DROP_S = text(`
.#.
#i#
.#.`);

// ---- Waving arm (sprite coords of sittingTailUp), drawn by hand ----------------------------------
// Raised right foreleg on body-sitting: paw beside the cheek, arm kept one cell off the jaw outline
// (jaw outline: (20,15) (19,16) (18,17) (17,18)). Drawn behind the head so whiskers stay on top.
const ARM_ROWS = [
  [10, 23, '###'], [11, 22, '#ooo#'], [12, 22, '#oso#'], [13, 22, '#ooo#'],
  [14, 21, '#ooo#'], [15, 21, '#ooo#'], [16, 20, '#ooo#'], [17, 19, '#ooo#'], [18, 18, '#ooo#'],
  [19, 17, 'oooo#'], [20, 16, 'oooo#'], [21, 16, 'ooo#'],
];
const ARM_OUT_ROWS = [
  [10, 24, '###'], [11, 23, '#ooo#'], [12, 23, '#oso#'], [13, 23, '#ooo#'],
  [14, 22, '#ooo#'], [15, 21, '#ooo#'], [16, 20, '#ooo#'], [17, 19, '#ooo#'], [18, 18, '#ooo#'],
  [19, 17, 'oooo#'], [20, 16, 'oooo#'], [21, 16, 'ooo#'],
];
export function waving(out = false) {
  // Wider sprite so the paw can leave the 23-col sitting box.
  let s = SIT.map(r => r.padEnd(28, EMPTY));
  let arm = Array.from({ length: 33 }, () => EMPTY.repeat(28));
  for (const [y, x, str] of (out ? ARM_OUT_ROWS : ARM_ROWS)) arm = draw(arm, [str], x, y);
  // Arm behind the head: body first, then arm, then the head rows (0-18) again on top.
  s = draw(s, arm, 0, 0);
  s = draw(s, SIT.slice(0, 19).map(r => r.padEnd(28, EMPTY)), 0, 0);
  return s;
}

// ---- Parametric legs (for the courier walk) ---------------------------------------------------------
/** Leg from hip to paw: a thick stroke (brush 2x2, 3 cells near the hip) with a rounded paw and ink outline. */
export function legLayer(w, h, legs) {
  let g = Array.from({ length: h }, () => EMPTY.repeat(w));
  for (const { hip, paw, fill } of legs) {                   // far leg first, near leg last
    let layer = Array.from({ length: h }, () => EMPTY.repeat(w));
    const pts = line(hip[0], hip[1], paw[0], paw[1]);
    pts.forEach(([x, y], i) => {
      const thick = i < pts.length / 2 ? [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]] : [[0, 0], [1, 0], [0, 1], [1, 1]];
      layer = cells(layer, thick.map(([dx, dy]) => [x + dx, y + dy, fill]));
    });
    layer = cells(layer, [[paw[0] - 1, paw[1] + 1, fill], [paw[0], paw[1] + 1, fill], [paw[0] + 1, paw[1] + 1, fill], [paw[0] + 2, paw[1] + 1, fill]]);
    // Outline this leg, then paint it over the previous ones (near leg overlaps far leg).
    const withEdge = layer.map((row, y) => [...row].map((ch, x) => {
      if (ch !== EMPTY) return ch;
      const n = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => (layer[y + dy]?.[x + dx] ?? EMPTY) !== EMPTY);
      return n ? '#' : EMPTY;
    }).join(''));
    g = draw(g, withEdge, 0, 0);
  }
  return g;
}
export const COURIER = await load('body-courier');           // 32 x 32
/** Courier body with legs redrawn: pose = { near: [x,y], far: [x,y] } paw positions; bob lifts the body. */
export function courierPose({ near, far }, bob = 0) {
  const W = COURIER[0].length, H = COURIER.length;
  // Body = rows 0-24 everywhere, plus the box bottom (cols >= 22) below.
  const body = COURIER.map((row, y) => y <= 24 ? row : [...row].map((ch, x) => (x >= 22 ? ch : EMPTY)).join(''));
  const legs = legLayer(W, H, [{ hip: [16, 23], paw: far, fill: 's' }, { hip: [11, 23], paw: near, fill: 'o' }]);
  let s = Array.from({ length: H }, () => EMPTY.repeat(W));
  s = draw(s, legs, 0, 0);
  s = draw(s, body, 0, -bob);
  return closeOutline(s);
}

// ---- More props (brand colours only; ink outlines) ---------------------------------------------------
export const CHECK_BADGE = text(`
.#####.
#eeeee#
#eeeew#
#weewe#
#ewwee#
#eeeee#
.#####.`);
export const BLOCK_CAT = text(`
#######
#yyyyy#
#ysyys#
#ysssy#
#ysssy#
#yyyyy#
#######`);
export const BLOCK_USD = text(`
#######
#iwwwi#
#iwiii#
#iwwwi#
#iiiwi#
#iwwwi#
#######`);
export const POT = text(`
#########
#bbbbbbb#
#nnnnnnn#
.#bbbbb#.
.#bbbbb#.
.#bbbbb#.
..#####..`);
export const PLANT = [
  text(`
.#.
#e#`),
  text(`
.#.#.
#e#e#
.#e#.
..#..`),
  text(`
#..#.
e#.#e
#e#e#
.#e#.
..e..
..e..`).map(r => r),
  text(`
..###..
.#yyy#.
.#yly#.
.#yyy#.
#e###e#
e#.e.#e
#e#e#e#
.#.e.#.
...e...
...e...`),
];
export const RAIL_PIECE = text(`
#######
gggyygg
#######`);
export const HELMET = text(`
...#######...
..#yyyyyyy#..
.#yyyyyyyyy#.
#############`);
export const FLASHLIGHT = text(`
.####..
#gggg##
#ggggyy
#gggg##
.####..`);
export const LOCK_CLOSED = text(`
..#####..
.#.....#.
.#.....#.
#########
#yyyyyyy#
#yyy#yyy#
#yyy#yyy#
#yyyyyyy#
#########`);
