# Animaciones del personaje

Edición 2026-09-25 · Paquete de recursos. No está integrado en la landing ni en la app.

## Qué cambió

Las 20 animaciones anteriores se recortaron de hojas generadas con IA, con los problemas que eso trae: colas duplicadas, rasgos que cambian entre frames, trozos de otros frames, un frame sin gato, escala distinta en cada secuencia y bordes borrosos. **Ya no se usan.**

Cada frame se compone con las piezas limpias de la edición 2026-09-25 ([piezas-v1](./piezas-v1/README.md)). Esas piezas usan el lienzo anterior: estas animaciones se rehacen en 144 × 96 con el [modelo vigente](../modelo/README.md), según la [especificación del personaje](../ESPECIFICACION.md). Los movimientos son de bloque entero, y las piezas nuevas se dibujaron a mano: brazo alzado, zarpas, oreja girada, patas del ciclo de paso, accesorios. El gato es idéntico en todas las secuencias.

## Formato

- **Lienzo común** de 48 × 44 bloques, con el apoyo en el bloque (24, 42): los pies de todas las poses descansan sobre la misma línea.
- `frames/<id>/frame-NNN.png`: ×8, 384 × 352 px, RGBA.
- `frames-1x/<id>/frame-NNN.png`: 48 × 44 px, para motores que escalan por su cuenta con `nearest`/`pixelated`.
- `spritesheets/<id>-strip.png` y `<id>-grid.png`: tira horizontal y cuadrícula de 4 columnas, a ×8.
- `previews/<id>.webp` y `.gif`: a ×4. **Siempre en bucle, para revisión**, aunque el uso previsto sea «una vez».
- `manifests/<id>.json`: tiempos por frame, `playback` (`loop` u `once`), uso previsto, lienzo, apoyo y rutas. `manifest.json` resume las 20 secuencias y la procedencia.

No imponer un FPS fijo: cada frame tiene su duración. Para respetar `once`, reproducir los frames según el manifiesto; no dejar un WebP en bucle en una pantalla de resultado.

## Secuencias

| ID | Uso | Reproducción |
|---|---|---|
| parpadeo, ojos, oreja, idle-sentada, cola | Reposo, bienvenida, espera amable | bucle |
| saludo | Bienvenida | una vez |
| asomarse | Descubrimiento | bucle |
| salto-feliz, comprobante, swap | Resultado confirmado | una vez |
| meti-la-pata, reparar-rail | Error recuperable, siempre con texto claro | una vez |
| caminata, preparando-pago | En curso; no indica llegada | bucle |
| siesta | Inactividad sin operación en curso | bucle |
| card, creciendo, linterna, seguridad | Ilustración de concepto; no acredita disponibilidad, rentabilidad ni auditoría | según manifiesto |
| mantenimiento | Pantalla de excepción | bucle |

## Control de calidad

`npm run brandkit:mascota` rechaza cualquier frame que:

- use colores fuera de la paleta o píxeles semitransparentes;
- tenga el contorno abierto;
- esté vacío o toque el borde del lienzo;
- no coincida con su preview en número de frames y tiempos.

`npm run brandkit:verify` comprueba además que cada ×8 sea un escalado exacto del ×1 y que cada estático coincida con su mapa. Las hojas de revisión, el informe y la comparación con el paquete anterior están en `03-mascota/qa/` (solo en el repositorio; el ZIP de entrega no la incluye). Abre `qa/comparacion.html` para ver cada estático junto a su original de la IA 1 y cada animación junto al material anterior (`qa/antes/`), reproduciéndose a la vez.
