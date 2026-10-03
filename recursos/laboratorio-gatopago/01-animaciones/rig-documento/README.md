# Comprobante ilustrado

[Comparativa](./index.html) y [colección completa](../coleccion/index.html). Una cabeza reutilizada y un nuevo cuerpo/papel raster constantes; solo se dibuja el detalle dentro del papel. 61 pasos PNG en 2.580 ms, una ejecución con final distinto al inicio, mantenido. WebP lossless, miniaturas, hoja de nueve muestras, SVG de montaje y manifest.

## Fuentes, decisiones y límites

La base `../fuentes/comprobante-cuerpo-v1.png`, generada con image_gen integrado usando las referencias originales de comprobante y sentado, tenía seis extremidades. **No se usa en el montaje.** La edición `comprobante-cuerpo-v2.png` elimina las dos patas exteriores extra; quedan dos patas que sujetan el papel y dos pies inferiores. Fuente completa y prompts v1/v2 conservados. La IA puede cambiar píxeles fuera de lo solicitado: no se afirma fidelidad exacta a la fuente v1 ni a los originales.

La cabeza es copia exacta de la capa `rig-gestos/capas/cabeza-sentada.png`. No se vuelve a dibujar entre pasos. Los PNG se colocan completos en el lienzo; no se recortan ni se retocan por software. Las coordenadas del papel se obtienen de sus píxeles claros para colocar el detalle SVG. Ese detalle geométrico nativo no convierte al personaje en vector.

La primera exportación del detalle usó `pathLength=1`, que el renderizador no normalizó como se esperaba: la marca se veía desde el inicio. La revisión visual detectó el fallo. Se sustituyó por longitud absoluta y opacidad inicial cero; se regeneraron todos los pasos. El inicio está en blanco y el final conserva tres líneas y una marca discretas, sin confeti, números inventados ni QR.

Es una pose sentada y quieta, no una firma animada con flexión dibujada. La cabeza nueva es más grande que la referencia original; la unión y anatomía se revisaron visualmente, no por una prueba anatómica automática. La marca ilustra un documento preparado; no acredita firma, identidad, pago ni liquidación. En producto el estado debe provenir del sistema. Sin sustitución del kit ni aprobación artística final.

## Regeneración y evidencia

Desde la raíz, `node recursos/laboratorio-gatopago/tools/receipt-action.mjs`, después `tools/comparison-gallery.mjs documento` y `tools/comparison-gallery.mjs coleccion` con el mismo prefijo de ruta. No se llama a IA al regenerar.

`verify-receipt-action.mjs` reconstruyó exactamente los 61 PNG y comparó todos los píxeles fuera de la zona de tinta: gato y papel constantes, bordes transparentes, origen/hash y tiempos WebP válidos, inicio/final distintos. El WebP une pasos de pausa idénticos en 48 frames codificados, conservando los 2.580 ms. La mayor cantidad de PNG no se presenta como un aumento de complejidad del gesto.

`qa-receipt.js` observó los 61 pasos a 1x, probó pausa, lienzos 96/128/nativo, final natural y movimiento reducido en Chrome. Dos viewports (390/1280), sin imágenes rotas, overflow ni errores de página. Capturas del inicio, final y lienzo 128 revisadas. `qa-receipt-downloads.js` accionó ocho enlaces reales; `verify-receipt-downloads.mjs` comparó sus copias byte a byte. Resultados en `.qa/receipt/`. No es una prueba de FPS en teléfonos ni de estado financiero real.
