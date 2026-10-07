# Cuatro acciones con piezas estables

Propuestas independientes: creciendo, tarjeta, linterna y seguridad. No reemplazan archivos de `brandkit/` ni se integran en la app.

| Acción | Pasos PNG | Duración | Reproducción |
| --- | ---: | ---: | --- |
| Cuidar un brote | 81 | 3.870 ms | Una vez, final conservado |
| Acercar la tarjeta | 61 | 2.775 ms | Una vez, final conservado |
| Buscar con luz | 73 | 3.485 ms | Loop, extremos idénticos |
| Resguardar la llave | 61 | 2.875 ms | Una vez, final conservado |

276 PNG de 768 x 640 con transparencia, 276 miniaturas, cuatro WebP lossless, cuatro hojas de nueve muestras y cuatro escenas SVG de montaje. Nueve objetos SVG originales en `objetos/`: regadera, tarjeta, linterna, llave, terminal, escudo, maceta, hojas y haz.

## Procedencia y cambios

Se reutilizan exactamente los archivos PNG de cabeza, cuerpo con tres patas, cuarta pata y cola de `rig-gestos/capas/`. Cada manifest guarda ubicación, SHA-256 y transformaciones. El gato sigue siendo raster: los SVG contienen esas imágenes y los objetos geométricos propios. No hubo una nueva generación de imagen ni retoque de sus píxeles en esta tanda. Las fuentes y prompts anteriores permanecen conservados.

La cola se refleja al lado izquierdo mediante una transformación de montaje; no se añade otra. Cabeza, cuerpo, suelo y cola permanecen fijos. La pata rota alrededor del mismo hombro y lleva siempre el mismo objeto.

- Brote: una raíz fija; tallo verde legible también en oscuro. La regadera inclina y vuelve, y las gotas salen del pico. El crecimiento termina sin monedas ni porcentajes.
- Tarjeta: terminal fija y chip visible fuera de la pata. La tarjeta se aproxima y conserva su final. La pequeña señal azul no confirma una transacción.
- Linterna: haz escalonado de baja opacidad (capas 0,12/0,14), sin filtros ni pulsos; solo gira cuatro grados por lado.
- Llave: escudo siempre presente, sin glow. La punta llega al ojo de la llave y se mantiene; no anuncia una verificación real.

## Comprobaciones ejecutadas

`tools/verify-care-actions.mjs`: reconstrucción exacta de los 276 PNG, fuentes incrustadas byte a byte, bordes transparentes, geometría, tiempos y loops WebP. Los 75.146 píxeles interiores de cabeza y 7.610 de cola (alfa del render de la capa >= 250) permanecen exactamente iguales en todos los pasos. Los bordes semitransparentes no se presentan como una región compuesta idéntica.

Se corrigió el método de comparación: un rectángulo arbitrario alrededor de la cabeza incluía píxeles externos de la pata y producía falsos fallos. La comprobación final deriva la máscara de la propia capa, exige diferencia cero en su interior y conserva la reconstrucción exacta de cada imagen completa. No es un detector de anatomía.

`qa-care.js` mostró las 18 comparativas en 36 casos Chrome (390/1280 px), tamaños de lienzo 96/128/768, carga de imágenes/Recursive, pausa y extremos. Las cuatro acciones nuevas mostraron los 276 pasos a 1x; la linterna completó dos ciclos y las otras conservaron su final. Movimiento reducido detiene la reproducción. Cero errores de página. Las 32 descargas reales nuevas coinciden byte a byte con sus fuentes. Evidencia en `.qa/care/` del laboratorio.

Se revisaron las cuatro hojas, fotogramas grandes, comparativas finales y el haz sobre fondo oscuro. La referencia original está intacta en cada comparación.

## Límites

Es una reinterpretación frontal sentada, no una copia del perfil de los originales. La pata es rígida y los objetos nuevos son vectoriales; no se dibujaron flexiones nuevas ni se afirma pixel-perfect en rotaciones. El selector mide el lienzo completo, no la altura del gato: la legibilidad de objetos pequeños depende del tamaño elegido. NFC, seguridad, rentabilidad y autorización son temas ilustrados, no capacidades financieras acreditadas. Las propuestas requieren aprobación artística antes de adoptarse.

## Regenerar

Desde la raíz, con dependencias instaladas:

```sh
node archivo/laboratorio-gatopago/tools/care-actions.mjs
node archivo/laboratorio-gatopago/tools/verify-care-actions.mjs
node archivo/laboratorio-gatopago/tools/comparison-gallery.mjs cuidados
node archivo/laboratorio-gatopago/tools/comparison-gallery.mjs coleccion
```

Los generadores no llaman a IA. La prueba de navegador necesita la sesión local configurada; sus recetas no se confunden con evidencia de ejecución. Guardar cada auditoría antes de navegar y ejecutar `verify-care-downloads.mjs` después de las descargas.
