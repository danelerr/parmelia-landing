// The 20 mascot animations, composed from the static maps through the rig. Called by build.mjs.
import { exportAnim, reviewSheet, blank, draw, cells, region, patch, text, ANCHOR, load } from './lib/anim.mjs';
import { SIT, face, sitAt, squash, stretch, sittingTailUp, waving, SPARKLE_S, SPARKLE_M, DROP, DROP_S, courierPose, CHECK_BADGE, BLOCK_CAT, BLOCK_USD, POT, PLANT, RAIL_PIECE, HELMET, FLASHLIGHT, LOCK_CLOSED, QR } from './rig.mjs';
import { EMPTY } from './lib/pixmap.mjs';

import path from 'node:path';
import { KIT } from './lib/anim.mjs';
const only = process.argv.slice(2).filter(a => !a.startsWith('--'));
const want = id => !only.length || only.includes(id);
const F = (rows, ms) => ({ rows, ms });
const SIT_X_ = ANCHOR.x - 11;
const canvasWith = (sprite, dx = 0, dy = 0) => sitAt(blank(), sprite, dx, dy);
const out = [];
async function emit(anim) {
  const m = await exportAnim(anim);
  await reviewSheet(anim.frames, path.join(KIT, 'qa', `revision-${anim.id}.png`), 5);
  out.push(`${anim.id}: ${m.frameCount} frames, ${m.totalDurationMs} ms, ${anim.playback}`);
}

// Right ear of body-sitting (rows 0-3, cols 14-22) as a movable part.
const EAR_R = region(SIT, 14, 0, 22, 3);
const withEar = (s, dx, dy) => {
  s = patch(s, Array(4).fill(EMPTY.repeat(9)), 14, 0);          // remove the ear above the head line
  // Redraw it shifted, clipped so it never covers the head outline (row 4 and below).
  return draw(s, EAR_R, 14 + dx, dy, (_x, y) => y <= 3);
};

if (want('parpadeo')) await emit({
  id: 'parpadeo', name: 'Parpadeo', playback: 'loop', purpose: 'Reposo; señal de vida sin distraer',
  frames: [F(canvasWith(SIT), 1600), F(canvasWith(face(SIT, 'half')), 50), F(canvasWith(face(SIT, 'closed')), 90), F(canvasWith(face(SIT, 'half')), 50),
           F(canvasWith(SIT), 1300), F(canvasWith(face(SIT, 'half')), 50), F(canvasWith(face(SIT, 'closed')), 70), F(canvasWith(face(SIT, 'half')), 50)],
});

if (want('ojos')) await emit({
  id: 'ojos', name: 'Mirar alrededor', playback: 'loop', purpose: 'Descubrimiento; invita a explorar',
  frames: [F(canvasWith(SIT), 700), F(canvasWith(face(SIT, 'left')), 800), F(canvasWith(SIT), 180), F(canvasWith(face(SIT, 'right')), 800),
           F(canvasWith(SIT), 500), F(canvasWith(face(SIT, 'up')), 450), F(canvasWith(SIT), 300),
           F(canvasWith(face(SIT, 'half')), 50), F(canvasWith(face(SIT, 'closed')), 80), F(canvasWith(face(SIT, 'half')), 50)],
});

if (want('oreja')) {
  const down = withEar(SIT, 0, 1);
  // Flick: the ear tip rotates outward about its base; drawn by hand so the base stays on the head line.
  const flick = patch(SIT, ['......###.', '....##ooo#', '...#ooosо#'.replace('о', 'o'), '.##oooss#.'], 13, 0);
  await emit({
    id: 'oreja', name: 'Oreja', playback: 'loop', purpose: 'Reposo; reacción mínima a una notificación',
    frames: [F(canvasWith(SIT), 1400), F(canvasWith(flick), 70), F(canvasWith(down), 60), F(canvasWith(SIT), 90), F(canvasWith(flick), 70), F(canvasWith(SIT), 900)],
  });
}

if (want('idle-sentada')) {
  const up = stretch(SIT), blinkUp = f => stretch(face(SIT, f));
  await emit({
    id: 'idle-sentada', name: 'Sentada', playback: 'loop', purpose: 'Bienvenida y estados vacíos',
    frames: [F(canvasWith(SIT), 650), F(canvasWith(up), 650), F(canvasWith(SIT), 650), F(canvasWith(up), 500),
             F(canvasWith(blinkUp('half')), 50), F(canvasWith(blinkUp('closed')), 80), F(canvasWith(blinkUp('half')), 50), F(canvasWith(SIT), 650)],
  });
}

if (want('cola')) {
  // Tail sway about its base: an ease-in-out swing, 8 poses.
  const angles = [-18, -12, -4, 6, 14, 6, -4, -12];
  const ms = [140, 110, 100, 110, 140, 110, 100, 110];
  await emit({
    id: 'cola', name: 'Cola', playback: 'loop', purpose: 'Reposo con más presencia; espera amable',
    frames: angles.map((a, i) => F(canvasWith(sittingTailUp(a)), ms[i])),
  });
}

if (want('saludo')) {
  const wave = (out, eyes = 'happy', mouth = 'open') => face(waving(out), eyes, mouth);
  const rest = SIT;
  await emit({
    id: 'saludo', name: 'Saludo', playback: 'once', purpose: 'Bienvenida; primer contacto',
    frames: [F(canvasWith(rest), 220), F(canvasWith(wave(false)), 150), F(canvasWith(wave(true)), 150), F(canvasWith(wave(false)), 150),
             F(canvasWith(wave(true)), 150), F(canvasWith(wave(false)), 180), F(canvasWith(face(rest, 'happy')), 320)],
  });
}

if (want('salto-feliz')) {
  const H = face(SIT, 'happy'), HO = face(SIT, 'happy', 'open');
  const at = (s, dy) => canvasWith(s, 0, -dy);
  const spark = (c, big) => {
    c = draw(c, big ? SPARKLE_M : SPARKLE_S, 12, 12); c = draw(c, big ? SPARKLE_M : SPARKLE_S, 33, 9);
    return draw(c, SPARKLE_S, 36, 20);
  };
  await emit({
    id: 'salto-feliz', name: 'Salto feliz', playback: 'once', purpose: 'Éxito confirmado; una sola vez',
    frames: [F(at(H, 0), 140), F(at(squash(H), 0), 90), F(at(stretch(HO), 3), 70), F(at(HO, 6), 90), F(spark(at(HO, 7), false), 130),
             F(spark(at(HO, 6), true), 90), F(at(stretch(HO), 3), 70), F(at(squash(H), 0), 90), F(spark(at(H, 0), true), 160), F(spark(at(H, 0), false), 200)],
  });
}

if (want('meti-la-pata')) {
  const nerv = face(SIT, 'shut', 'wavy'), worried = face(SIT, 'open', 'wavy');
  const drop = (c, big, dy = 0) => draw(c, big ? DROP : DROP_S, 36, 14 + dy);
  await emit({
    id: 'meti-la-pata', name: 'Metí la pata', playback: 'once', purpose: 'Error recuperable; acompaña un texto claro',
    frames: [F(canvasWith(SIT), 160), F(canvasWith(face(SIT, 'wide', 'o')), 180), F(drop(canvasWith(nerv, -1), false), 90), F(drop(canvasWith(nerv, 1), false), 90),
             F(drop(canvasWith(nerv, -1), false), 90), F(drop(canvasWith(nerv, 0), true), 260), F(drop(canvasWith(worried, 0), true, 2), 220), F(drop(canvasWith(worried, 0), true, 4), 380)],
  });
}

if (want('siesta')) {
  const SL = await load('body-sleeping');                          // 33 x 26
  const breathe = s => [...s.slice(0, 13), s[12], ...s.slice(13)];  // back rises one row
  const Z = [text('###\n.#.\n#..\n###').map(r => r.replace(/#/g, 's')),     // tiny (reads as Z, not I)
             text('###\n..#\n.#.\n###').map(r => r.replace(/#/g, 's')),
             text('####\n..#.\n.#..\n####').map(r => r.replace(/#/g, 's')),
             text('#####\n...#.\n..#..\n.#...\n#####').map(r => r.replace(/#/g, 's'))];
  const path = [[27, 16], [29, 12], [31, 8], [34, 3]];              // rises up and to the right, growing
  const frame = (k) => {
    const s = [1, 2].includes(k % 4) ? breathe(SL) : SL;
    let c = draw(blank(), s, 8, ANCHOR.y - (s.length - 1));
    for (const ph of [k % 4, (k + 2) % 4]) { const [x, y] = path[ph]; c = draw(c, Z[ph], x, y); }
    return c;
  };
  await emit({ id: 'siesta', name: 'Siesta', playback: 'loop', purpose: 'Inactividad o espera larga sin operación en curso',
    frames: Array.from({ length: 8 }, (_, k) => F(frame(k), 380)) });
}

if (want('asomarse')) {
  // A tall cream panel (any card/container edge) at cols 4-18; the cat exists only right of its edge.
  const EDGE = 18;
  const panel = c => {
    for (let y = 5; y <= 41; y++) c = draw(c, ['#' + 'c'.repeat(13) + '#'], 4, y);
    return draw(draw(c, ['#'.repeat(13)], 5, 4), ['#'.repeat(13)], 5, 42);
  };
  const at = (s, x) => panel(draw(blank(), s, x, ANCHOR.y - (s.length - 1), cx => cx > EDGE));
  const xs = { hidden: -5, ears: -1, half: 3, peek: 7 };
  await emit({ id: 'asomarse', name: 'Asomarse', playback: 'loop', purpose: 'Descubrimiento; algo nuevo por ver',
    // The loop starts on the recognisable pose (peeking) so the first frame works as a poster.
    frames: [F(at(face(SIT, 'shine'), xs.peek), 500),
             F(at(face(SIT, 'half'), xs.peek), 50), F(at(face(SIT, 'closed'), xs.peek), 80), F(at(face(SIT, 'half'), xs.peek), 50),
             F(at(face(SIT, 'left'), xs.peek), 450), F(at(face(SIT, 'shine'), xs.peek), 350), F(at(SIT, xs.half), 110), F(at(SIT, xs.ears), 110),
             F(at(SIT, xs.hidden), 600), F(at(SIT, xs.ears), 120), F(at(SIT, xs.half), 120)] });
}

if (want('card')) {
  const PC = await load('body-peek-card');                          // 34 x 35; card face cols 2-14, rows 8-32
  const base = s => draw(blank(), s, 7, ANCHOR.y - (s.length - 1));
  // Diagonal shine: a 2-cell band (milk) sweeping across the cream face only.
  const shine = (s, k) => s.map((row, y) => [...row].map((ch, x) => (ch === 'c' && x >= 2 && x <= 14 && y >= 8 && y <= 32 && [0, 1].includes((x + y - k) - 18) ? 'w' : ch)).join(''));
  const frames = [F(base(PC), 350)];
  for (let k = 0; k <= 25; k += 5) frames.push(F(base(shine(PC, k)), 60));
  frames.push(F(base(PC), 300));
  // Eye blink on the tilted head (eyes 3x3 at canvas-sprite (17-19, 11-13) and (25-27, 15-17)).
  const blinkPC = PC.map((row, y) => [...row].map((ch, x) => ((x >= 17 && x <= 19 && y >= 11 && y <= 12) || (x >= 25 && x <= 27 && y >= 15 && y <= 16)) ? 'o' : ch).join(''));
  frames.push(F(base(blinkPC), 90), F(base(PC), 400));
  await emit({ id: 'card', name: 'Tarjeta', playback: 'once', purpose: 'Tarjeta conceptual; no acredita disponibilidad', frames });
}

if (want('caminata')) {
  // Walk in place, 8 frames: stance foot slides back on the ground, swing foot travels forward lifted.
  const stance = [[16, 29], [14, 29], [12, 29], [10, 29]], swing = [[10, 28], [12, 27], [14, 27], [16, 28]];
  const near = [...stance, ...swing], far = [...swing, ...stance].map(([x, y]) => [x + 3, y]);
  const bob = [0, 1, 1, 0, 0, 1, 1, 0];
  const frames = near.map((n, i) => F(draw(blank(), courierPose({ near: n, far: far[i] }, bob[i]), ANCHOR.x - 16, ANCHOR.y - 31), 95));
  await emit({ id: 'caminata', name: 'Caminata', playback: 'loop', purpose: 'Envío en curso; no indica llegada', frames });
}

if (want('preparando-pago')) {
  const CV = await load('body-conveyor');                           // 39 x 33; rail rows 30-32, eye (19-21, 11-13)
  const rail = (s, off) => s.map((row, y) => {
    if (y !== 31 && y !== 32) return row;
    return [...row].map((ch, x) => {
      if (x < 3 || x > 37) return ch;
      const dash = ((x + off) % 9 + 9) % 9 < 2;
      if (y === 31) return dash ? 'y' : 'g';
      return dash ? 'n' : '#';
    }).join('');
  });
  const blink = s => patch(s, ['ooo', 'ooo', '###'], 19, 11);
  const place = s => draw(blank(), s, 5, ANCHOR.y - 32);
  const offs = [0, 3, 6, 0, 3, 6];
  await emit({ id: 'preparando-pago', name: 'Preparando pago', playback: 'loop', purpose: 'Procesamiento; no indica que el pago llegó',
    frames: offs.map((o, i) => F(place(i === 4 ? blink(rail(CV, o)) : rail(CV, o)), 110)) });
}

if (want('comprobante')) {
  // body-qr with the sign turned into a receipt: interior cols 5-18, rows 19-32.
  const paper = QR.map((row, y) => y >= 19 && y <= 32 ? [...row].map((ch, x) => (x >= 5 && x <= 18 ? 'w' : ch)).join('') : row);
  const lines = [[21, 7, 16], [23, 7, 12], [25, 7, 13], [27, 7, 11]];
  const withLines = (n, total) => {
    let s = paper;
    lines.slice(0, n).forEach(([y, a, b], i) => { s = patch(s, ['#'.repeat(b - a + 1)], a, y); if (i) s = patch(s, ['##'], 15, y); });
    if (total) s = patch(s, ['#'.repeat(10)], 7, 30);
    return s;
  };
  const place = s => draw(blank(), s, ANCHOR.x - 12, ANCHOR.y - 37);
  const badge = (c, big) => draw(c, big ? CHECK_BADGE : text('.###.\n#eee#\n.###.'), big ? 31 : 32, big ? 21 : 23);
  await emit({ id: 'comprobante', name: 'Comprobante', playback: 'once', purpose: 'Resultado verificado; mostrar solo con confirmación',
    frames: [F(place(paper), 260), F(place(withLines(1)), 110), F(place(withLines(2)), 110), F(place(withLines(3)), 110), F(place(withLines(4)), 110),
             F(place(withLines(4, true)), 160), F(badge(place(withLines(4, true)), false), 90), F(badge(place(face(withLines(4, true), 'happy')), true), 380),
             F(draw(badge(place(face(withLines(4, true), 'happy')), true), SPARKLE_S, 38, 17), 420)] });
}

if (want('swap')) {
  const cat = e => draw(blank(), face(SIT, e), SIT_X_, ANCHOR.y - 32);
  // Arc paths over the head (block top-left corners); B mirrors A.
  const A = [[3, 35], [2, 27], [3, 19], [5, 11], [8, 3], [16, 1], [24, 1], [33, 3], [36, 11], [38, 19], [39, 27], [38, 35]];
  const mirror = ([x, y]) => [41 - x, y];
  const frames = A.map(([x, y], i) => {
    const eyes = i === 0 ? 'open' : i < 3 ? 'up' : i < 9 ? 'up' : 'happy';
    let c = cat(i === A.length - 1 ? 'happy' : eyes);
    c = draw(c, BLOCK_CAT, x, y); const [bx, by] = mirror([x, y]); c = draw(c, BLOCK_USD, bx, by);
    return F(c, i === 0 ? 320 : i === A.length - 1 ? 200 : 65);
  });
  let end = cat('happy'); end = draw(draw(end, BLOCK_CAT, 38, 35), BLOCK_USD, 3, 35);
  end = draw(draw(end, SPARKLE_M, 1, 28), SPARKLE_M, 42, 28);
  frames.push(F(end, 420));
  await emit({ id: 'swap', name: 'Cambio', playback: 'once', purpose: 'Cambio de activo completado; usar con el estado real', frames });
}

if (want('creciendo')) {
  const cat = e => draw(blank(), face(SIT, e), SIT_X_ - 8, ANCHOR.y - 32);
  const scene = (e, stage, sway = 0) => {
    let c = draw(cat(e), POT, 31, 36);
    if (stage >= 0) { const p = PLANT[stage]; c = draw(c, sway ? p.map(r => (sway > 0 ? '.' + r.slice(0, -1) : r.slice(1) + '.')) : p, 35 - Math.floor(p[0].length / 2), 36 - p.length); }
    return c;
  };
  await emit({ id: 'creciendo', name: 'Creciendo', playback: 'loop', purpose: 'Progreso o ahorro; no anuncia rentabilidad',
    frames: [F(scene('right', -1), 300), F(scene('right', 0), 220), F(scene('right', 1), 220), F(scene('right', 2), 240), F(scene('shine', 3), 300),
             F(scene('happy', 3), 360), F(scene('happy', 3, 1), 180), F(scene('happy', 3), 180), F(scene('happy', 3, -1), 180), F(scene('happy', 3), 400)] });
}

if (want('reparar-rail')) {
  const cat = e => draw(blank(), face(SIT, e), SIT_X_ - 10, ANCHOR.y - 32);
  const rail = (c, gap) => {
    for (let x = 27; x <= 46; x++) c = cells(c, [[x, 40, '#'], [x, 41, (x % 6 < 2) ? 'y' : 'g'], [x, 42, '#']]);
    if (gap) for (let x = 32; x <= 38; x++) c = cells(c, [[x, 40, '.'], [x, 41, '.'], [x, 42, '.']]);
    return c;
  };
  const piece = (c, y) => draw(c, RAIL_PIECE, 32, y);
  await emit({ id: 'reparar-rail', name: 'Reparar rail', playback: 'once', purpose: 'Error recuperable en reparación; texto claro primero',
    frames: [F(rail(cat('right'), true), 360), F(piece(rail(cat('shine'), true), 26), 140), F(piece(rail(cat('shine'), true), 32), 90), F(piece(rail(cat('shine'), true), 37), 80),
             F(rail(cat('shine'), false), 90), F(draw(draw(rail(cat('happy'), false), SPARKLE_M, 30, 33), SPARKLE_S, 40, 35), 200), F(draw(rail(cat('happy'), false), SPARKLE_S, 32, 34), 380)] });
}

if (want('linterna')) {
  const base = e => draw(blank(), face(waving(false), e), SIT_X_ - 11, ANCHOR.y - 32);
  // Flashlight in the raised paw (paw at sprite ~ (23-25, 11-13) -> canvas +SIT_X_-6), beam to the right.
  const beam = (c, dy) => {
    const x0 = SIT_X_ - 11 + 27, y0 = ANCHOR.y - 32 + 12;
    c = draw(c, FLASHLIGHT, x0 - 3, y0 - 2);
    for (let i = 1; i <= 12; i++) { const half = Math.floor(i / 3); for (let j = -half; j <= half; j++) {
      const y = y0 + j + Math.round(dy * i / 12); c = cells(c, [[x0 + 3 + i, y, (Math.abs(j) === half && i > 3) ? 'l' : 'w']]); } }
    return c;
  };
  await emit({ id: 'linterna', name: 'Linterna', playback: 'loop', purpose: 'Búsqueda o revisión; no es sello de auditoría',
    frames: [-3, -1, 1, 3, 1, -1].map(dy => F(beam(base('right'), dy), 170)) });
}

if (want('mantenimiento')) {
  const hat = s => draw(s, HELMET, 5, 1);
  const X = SIT_X_ - 4, Y = ANCHOR.y - 32;
  // Wrench mirrored so it points up and away from the head; its handle end (sprite 0,5) sits in the paw.
  const WR = text(`
......#.#.
.....#g#g#
.....#ggg#
....#ggg#.
...#gg#...
..#gg#....
.#gg#.....
#gg#......
##........`);
  const scene = (out, e, spark) => {
    let c = blank();
    const px = X + (out ? 25 : 24), py = Y + 12 + (out ? 1 : 0);
    c = draw(c, WR, px - 1, py - 8);
    c = draw(c, hat(face(waving(out), e)), X, Y);
    if (spark) c = draw(c, SPARKLE_S, px + 8, py - 10);
    return c;
  };
  await emit({ id: 'mantenimiento', name: 'Mantenimiento', playback: 'loop', purpose: 'Servicio en mantenimiento; pantalla de excepción',
    frames: [F(scene(false, 'shine'), 280), F(scene(true, 'shut'), 100), F(scene(true, 'shut', true), 120), F(scene(false, 'shine'), 260)] });
}

if (want('seguridad')) {
  const cat = e => draw(blank(), face(SIT, e), SIT_X_ - 8, ANCHOR.y - 32);
  const lock = (c, shine) => {
    c = draw(c, LOCK_CLOSED, 32, 33);
    if (shine >= 0) c = cells(c, [[33 + shine, 37, 'w'], [34 + shine, 37, 'w']].filter(([x]) => x <= 39));
    return c;
  };
  await emit({ id: 'seguridad', name: 'Seguridad', playback: 'loop', purpose: 'Seguridad de la cuenta; ilustración, no garantía',
    frames: [F(lock(cat('shine'), -1), 700), F(lock(cat('shine'), 0), 70), F(lock(cat('shine'), 2), 70), F(lock(cat('shine'), 4), 70), F(draw(lock(cat('shine'), -1), SPARKLE_S, 40, 30), 160),
             F(lock(cat('shine'), -1), 700), F(lock(cat('half'), -1), 50), F(lock(cat('closed'), -1), 80), F(lock(cat('half'), -1), 50)] });
}

export const summary = out;
