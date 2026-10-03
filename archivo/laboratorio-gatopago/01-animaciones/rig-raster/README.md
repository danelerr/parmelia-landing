# Animación con capas raster

Cinco alternativas con 285 pasos PNG: cola (61), siesta (41), asomarse (49), reparar el camino (61) e intercambio (73).

Las piezas de cola/siesta/rail fueron extraídas mediante image_gen integrado; se conservan fuentes y prompts, incluida la corrección de patas duplicadas y el gesto de la boca. Cada placa se separó en un gutter con alfa cero, sin retocar los píxeles. Asomarse reutiliza la cabeza y la tarjeta originales completas. Las piezas se reutilizan mediante SVG: es un compositor con PNG, no un personaje vectorizado. Los objetos geométricos nuevos tienen fuentes SVG. La oclusión de la cabeza tras la tarjeta es parte del gesto, no un recorte del PNG fuente.

Cada acción incluye PNG completos, miniaturas, WebP lossless, hoja de nueve muestras, manifest compacto con tiempos/geometría y un SVG de escena editable. El código de movimiento está en `tools/raster-rig.mjs`. Las capas independientes, con hashes y celdas de origen, están en `capas.json`. El hueco del rail y su pieza miden exactamente 96 × 36 px. Intercambio usa dos recorridos separados y mantiene el gato quieto. Cola y pata son piezas rígidas articuladas, no flexión dibujada. No hay sustitución del brandkit ni integración en la app. Consultar `REVISION.md` y la evidencia de `.qa/raster-rig/`; regenerar archivos no ejecuta la prueba de navegador ni otorga aprobación artística.
