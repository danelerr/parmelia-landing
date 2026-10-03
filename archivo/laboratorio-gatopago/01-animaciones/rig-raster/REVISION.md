# Revisión de alternativas raster por capas

Estas cinco acciones son propuestas independientes. Conservan el lenguaje raster del gato; no se sustituye el logo ni ningún archivo del brandkit. No se presentan como arte vectorizado.

## Entrega

| Acción | Pasos PNG | Tiempo | Final |
| --- | ---: | ---: | --- |
| Cola | 61 | 3.160 ms | Loop con primer y último PNG idénticos |
| Siesta | 41 | 3.740 ms | Loop con primer y último PNG idénticos |
| Asomarse | 49 | 3.450 ms | Una vez; vuelve a ocultarse y conserva la tarjeta |
| Reparar el camino | 61 | 3.905 ms | Una vez; pieza encajada |
| Intercambio | 73 | 4.140 ms | Una vez; bloques con posiciones intercambiadas |

Total: 285 pasos PNG. Los pasos repetidos de asomarse se compactan en el WebP (39 frames codificados), conservando la duración total. Eso no elimina pasos del manifest ni del control manual.

Cada acción entrega un WebP lossless, todos los PNG completos, miniaturas ligeras, nueve muestras, manifest compacto con tiempos y posiciones, reglas y un SVG de escena que incrusta las piezas PNG. El SVG permite editar el montaje; no convierte automáticamente el arte raster en vectores.

## Qué se corrigió

- Cola: se eliminó la cola enrollada duplicada de la base generada. El cuerpo/cara se dibuja una sola vez y no cambia entre pasos; solo gira una cola independiente por una base fija, detrás de la cadera.
- Siesta: la primera placa separada repetía patas en cabeza y cuerpo. La segunda extracción quita las patas de la cabeza. El montaje usa una cabeza fija y una sola pieza corporal, con respiración de hasta 1,4 % desde un apoyo fijo.
- Asomarse: las fuentes de cara y tarjeta son copias byte a byte de PNG del kit. La tarjeta mantiene dimensiones y posición. Una oclusión de escena permite aparecer/desaparecer a la cabeza; no se recorta ni altera su archivo fuente.
- Rail: se corrigió el gesto preocupado de la primera extracción. La cara/cuerpo y el rail quedan fijos. La misma pata gira desde un hombro fijo; la pieza y el hueco son exactamente 96 x 36 px. La posición final coincide con el hueco y no se reinicia al terminar.
- Intercambio: dos bloques constantes, con fuentes geométricas SVG propias. Se separaron los recorridos para que ninguno cruce la cara, patas o cola; ambos desaceleran en las esquinas. La cara/cuerpo y la única cola permanecen fijos.
- Galería: miniaturas de 160 x 133 px para la rejilla y liberación de referencias al cambiar de acción, en lugar de mantener todas las secuencias decodificadas. Los enlaces siguen descargando los PNG completos de 768 x 640 px.
- Manifests: geometría compacta sin repetir las imágenes base64 en cada paso. El SVG editable contiene las piezas; el JSON registra sus fuentes y posiciones.

## Qué se revisó visualmente

Se inspeccionaron las cinco hojas de nueve muestras y sus comparativas de escritorio. Se contrastaron las piezas nuevas con los PNG originales; la anatomía sigue siendo felina, con una cola, cara reconocible y objetos constantes. Se revisó que la pieza del rail conecte el recorrido y que los bloques de intercambio no invadan al gato.

La extracción con image_gen puede cambiar detalles del dibujo de referencia: cola/siesta/rail no conservan los píxeles del original. Conservan los píxeles de sus **placas finales generadas**, reutilizados sin redibujar entre pasos. Asomarse sí usa los dos PNG canónicos íntegros. Los prompts exactos y todas las placas, incluidas las iteraciones descartadas, están en `../prompts/` y `../fuentes/`.

Cola y pata se articulan como piezas rígidas. La cola no tiene una flexión nueva dibujada; la pata no resuelve un ciclo de caminar. Intercambio mantiene el gato atento y quieto, en lugar de deformar sus patas para tocar cada bloque. Son decisiones de esta propuesta, no equivalentes a todas las poses del original.

## Prueba técnica y límites

`tools/verify-raster-rig.mjs` comprueba las doce capas, celdas de origen o render SVG, hashes, geometría fija, reconstrucción exacta de los 285 PNG, bordes transparentes, cierre y duración/loop del WebP. Para rail comprueba el hueco transparente y el encaje; para intercambio, el intercambio de posiciones y la ausencia de solapamiento con cuerpo/cola o el otro bloque.

La receta Chrome cubre cinco acciones en 390/1280 px, controles, acceso al último paso, finales de acciones únicas y detención por movimiento reducido. Las descargas tienen una receta adicional y se comparan byte a byte después de guardarlas desde sus enlaces reales. Los resultados vigentes están en `.qa/raster-rig/` cuando se ejecutan esas recetas; no se consideran ejecutadas por el mero hecho de existir el script.

El primer intento de revisar los originales encontró RAF limitado a aproximadamente un segundo por frame aun con `document.hidden=false`. Traer la ventana al frente recuperó intervalos de aproximadamente 15 ms en esa sesión. Se conserva el diagnóstico y se repite la auditoría sin aceptar el intento fallido. No se atribuye ese límite al arte ni se extrapola como rendimiento móvil.

No hay aprobación artística final, integración de frontend, publicación ni prueba en teléfonos físicos. Ningún dibujo confirma una operación financiera.
