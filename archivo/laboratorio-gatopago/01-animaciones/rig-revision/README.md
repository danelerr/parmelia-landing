# Revisión del feedback · 2 de octubre de 2026

**RETIRADA POR RECHAZO VISUAL DEL USUARIO.** La anatomía, proporciones y apariencia de estos montajes no fueron aceptadas. Las pruebas técnicas que siguen describen una iteración histórica, no una recomendación ni una aprobación artística. La [comparativa principal](../index.html) recupera las propuestas anteriores; esta carpeta queda fuera de la selección vigente.

Tres intentos de corrección retirados. La comparativa principal y la colección de dieciocho ya no apuntan a estas versiones.

| Acción | Pasos PNG | Secuencia |
| --- | ---: | --- |
| Asomarse | 97 | Se oculta → primera mirada → sale cabeza y cuerpo → pausa curiosa → se esconde. |
| Reparar el camino | 121 | Baja la pieza → encaja → retira la pata → brillo → signo → flecha → final estable. |
| Intercambio | 109 | Acerca la pata → empuja → dos bloques intercambian lugares junto al gato → retira la pata → brillo breve. |

Son 327 pasos, 144 más que los tres montajes anteriores. La colección vigente tiene 18 acciones y 1202 pasos, no 21 acciones ni originales reemplazados. Los WebP lossless fusionan pausas idénticas; sus tiempos totales coinciden con los manifests PNG.

## Fuentes y método

- [Cuerpo para asomarse](fuentes/asomarse-cuerpo-v2.png), creado con **image_gen integrado**, usando el fotograma original como referencia. [Prompt exacto](prompts/asomarse-v2.txt).
- [Placa de intercambio seleccionada](fuentes/intercambio-capas-v3.png): cuerpo y pata separados por transparencia. [Prompt de extracción](prompts/intercambio-v2.txt), [corrección de boca](prompts/intercambio-boca-v3.txt). La placa v2 se conserva como intento de revisión, no como arte seleccionado.
- La tarjeta y las piezas del camino se copian completas del montaje previo. El personaje no se repinta por código. La separación de cuerpo/pata se hace en una columna alfa cero y se documenta en `capas.json`, conservando las placas originales.
- Los bloques con volumen, las flechas, los brillos y el signo son SVG nativos. `tools/revision-actions.mjs` monta las capas y exporta PNG, miniaturas, WebP, hojas y manifests. El SVG es un compositor con PNG, no un personaje vectorizado.

La tarjeta oculta al gato durante el gesto; el PNG fuente mantiene cabeza, cuerpo, patas y una sola cola íntegros. Las articulaciones giran piezas rígidas y no son flexiones dibujadas. Las poses generadas siguen pendientes de aprobación visual. Ningún signo ni brillo acredita una operación financiera.

## Regeneración y evidencia

Desde la raíz del repositorio:

```powershell
node recursos/laboratorio-gatopago/tools/revision-actions.mjs
node recursos/laboratorio-gatopago/tools/comparison-gallery.mjs
node recursos/laboratorio-gatopago/tools/comparison-gallery.mjs coleccion
node recursos/laboratorio-gatopago/tools/verify-revision-actions.mjs
```

Chrome comprobó 24 combinaciones de fase/ancho (390 y 1280 px), observó los 327 pasos a velocidad 1×, los finales y movimiento reducido, y accionó 24 descargas comparadas byte a byte. Evidencia actual en `.qa/revision/`. La primera prueba perdió pasos en el intercambio tras las descargas; se repitió normalizando la ventana de pruebas antes de cada reproducción y pasó completa. No se convierte esa prueba inicial en una afirmación de rendimiento móvil.

No se modificó `brandkit/`, la app ni el frontend. Manual, movimientos, posts, correo y notificaciones se comparan contra `fuentes/revision-2026-10-02-preservados.json`.
