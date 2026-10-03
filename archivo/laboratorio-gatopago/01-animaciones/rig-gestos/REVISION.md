# Reposo, saludo, salto, error y oreja

Cinco propuestas raster adicionales, separadas del kit. La [colección](../coleccion/index.html) reúne dieciocho acciones y 1058 pasos PNG tras comprobante y cuidados. Los tamaños 96/128/256/768 px del selector son el ancho del **lienzo completo**, no la altura del gato. Se conserva el padding transparente; no se recorta la silueta para agrandarlo.

## Antes y después

| Acción | Problema del original | Propuesta |
| --- | --- | --- |
| Reposo | Cola lateral y forma enrollada inferior ambiguas; cambios de postura. | Una cola y anatomía fija. Respiración de 1,2 % en torso/pata, anclada al suelo y=520; cabeza y cola quietas. 41 pasos, 4.120 ms. |
| Saludo | La misma ambigüedad de cola y cambios de cabeza/cuerpo. | Cuerpo de tres patas más una cuarta articulada: sube, hace dos gestos y vuelve a descansar. Cabeza/cuerpo/cola constantes. 61 pasos, 2.175 ms, una vez. |
| Salto | Cambios de proporción y orientación entre anticipación y aterrizaje. | Rebote sentado de hasta 64 px, anticipación y aterrizaje con compresión leve del torso; cabeza sin deformación. 61 pasos, 1.980 ms, una vez. |
| Error recuperable | Perfil completo y lágrima final dominaban el gesto. | La misma cabeza hace una pequeña sacudida amortiguada de menos de 3,5 grados; vuelve al reposo sin lágrimas. 41 pasos, 1.780 ms, una vez. |
| Oreja | Se alteraba el contorno de la cabeza, no solo la oreja. | Cara y otra oreja fijas; una pieza separada gira suavemente y vuelve. 49 pasos, 3.415 ms. |

## Procedencia y decisiones

- Se utilizó image_gen integrado, con referencias inspeccionadas antes de generar. Las fuentes completas y prompts están en `../fuentes/` y `../prompts/`.
- `sentada-capas-v1.png` aporta cabeza, cola y pata. Las celdas se separan por líneas con alfa cero, conservando todo su padding y sus píxeles. **Su cuerpo original no se usa**: tenía ambas patas delanteras y añadir la pieza independiente duplicaría una.
- `sentada-cuerpo-v2.png` todavía dejaba un muñón. Se conserva como intento descartado, no como fuente del montaje. `sentada-cuerpo-v3.png` deja tres patas; la cuarta se articula aparte. No se afirma que la IA haya conservado todos los píxeles ajenos a la edición solicitada.
- `oreja-capas-v1.png` aporta la cabeza sin una oreja y esa oreja separada. El montaje usa ambas piezas; los píxeles de la región inferior de cara se conservan en todos los pasos.
- Las seis capas PNG, escenas SVG con PNG incrustados y reglas son fuentes de montaje, **no una vectorización del personaje**. Regenerar con `tools/raster-gestures.mjs` no llama a IA.
- El primer rebote de 88 px rozaba el borde superior con dos píxeles del resplandor de la fuente. Se redujo a 64 px y se volvieron a comprobar los 253 PNG. No se borraron esos píxeles ni se recortó el archivo.

## Revisión realizada y límites

Inspeccionadas las fuentes, hojas de nueve muestras y comparativas de navegador, incluido el lienzo pequeño. La pata y la oreja siguen siendo piezas rígidas. El saludo es pequeño, bajo la mejilla; el salto es un rebote sentado, no una secuencia de extensión y flexión dibujada de cuatro patas. Hay diferencias de proporciones y dibujo respecto a los originales. Esto queda declarado en cada manifest y no se presenta como aprobación artística final.

`tools/verify-raster-gestures.mjs` reconstruyó exactamente los 253 PNG a partir de capas/metadatos: tamaños/anclas constantes, bordes alfa cero, cierre/reposo final idéntico y tiempos/loops WebP comprobados. Las pausas duplicadas se pueden unir al codificar WebP; no deben confundirse los pasos de montaje con los fotogramas únicos codificados. El apoyo del salto se verificó geométricamente con error menor de 0,001 px; no es una prueba biomecánica.

Chrome comprobó las trece acciones a 390 y 1280 px (26 casos); después, al añadir comprobante, se repitió con catorce (28 casos): carga, Recursive, pausa, extremos, lienzos 96/128/nativo y acceso al padding mediante scroll. En los cinco gestos observó todos los 253 pasos a velocidad 1x; reposo y oreja completaron dos ciclos, las otras tres llegaron a su final y permanecieron paradas. Movimiento reducido detuvo la reproducción y no hubo errores de página. Evidencia actual: `.qa/raster-gestures/browser-verification.json`, 2026-10-02T08:13:24.897Z. El comprobante tiene prueba natural separada. No se certifican FPS en teléfonos ni ausencia de todo defecto artístico.

Los 40 enlaces reales de descarga se comprobaron y sus copias coinciden byte a byte con las fuentes: `.qa/raster-gestures/download-verification.json`. El primer intento navegó al WebP por faltar `--allow-file-access-from-files` en la sesión local; no cuenta como éxito. La repetición con la configuración corregida terminó a las 08:03:24 UTC. Esa opción solo se usa en el navegador de pruebas del catálogo local, no en la app ni en el ordenador del usuario en general.

No se modificaron originales, brandkit, frontend, Figma ni publicaciones.
