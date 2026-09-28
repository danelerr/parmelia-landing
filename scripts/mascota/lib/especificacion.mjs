/**
 * Mascot canvas specification, v2.0 (brandkit/03-mascota/ESPECIFICACION.md).
 * The character is the original AI 1 design redrawn at double resolution (1 cell = half an original block).
 * Single source of truth for canvas sizes, anchors and margins; the guides and the QA read it.
 * Coordinates are cells, origin at the top-left corner.
 */

// Canvases. `margin` = rows/columns at every edge that must stay transparent in the base art.
// `axisX` is the vertical line between columns axisX-1 and axisX; `ground` is the lowest opaque row of a grounded pose.
export const CANVASES = {
  'simbolo-16': { w: 16, h: 16, margin: 0, use: 'Símbolo simplificado: favicon 16 y usos por debajo de 30 px' },
  simbolo: { w: 32, h: 32, margin: 1, use: 'Símbolo, favicon 32, iconos (marca simplificada, aparte del personaje)' },
  cabeza: { w: 64, h: 64, margin: 2, use: 'Cabezas con expresión y avatares' },
  estatico: { w: 96, h: 96, margin: 3, axisX: 48, ground: 92, use: 'Poses completas' },
  animacion: { w: 144, h: 96, margin: 3, axisX: 72, ground: 92, staticOffsetX: 24, use: 'Todas las secuencias' },
};

// Line weights of the model (cells).
export const LINE = { outline: 2, inner: 2 };

// Export scales (nearest neighbour only) and the dark-background border.
export const EXPORT_SCALES = [1, 4, 8];
export const DARK_BORDER = { colour: 'w', width: 1, connectivity: 8, suffix: '-oscuro' };

// Timing rules (ms).
export const TIMING = { minFrameMs: 50, minRegularFrameMs: 80, maxFramesPerSequence: 12 };
