# Caminata, preparación y mantenimiento

Tres candidatos adicionales, no assets aprobados. La [colección conjunta](../coleccion/index.html) permite comparar todas las alternativas raster con sus originales, ajustar el lienzo a 96/128/256 px, pausar y revisar extremos. Esta tanda amplió la colección de cinco a ocho; desde entonces se añadieron otras acciones. No se modificó `brandkit/`.

## Qué cambió realmente

| Acción | Antes | Nueva propuesta |
| --- | --- | --- |
| Caminata | Seis poses en 660 ms; perfil, cuerpo y paquete cambiaban. | Un perfil raster con paquete fijo, una cola y dos patas independientes. 61 pasos, 1.220 ms. El apoyo de las patas determina la altura del cuerpo. |
| Preparando pago | El loop mezclaba preparación con chispas celebratorias y cambios de objeto/cara. | El mismo mensajero sobre un rail fijo; señal discreta indeterminada que desaparece antes de reiniciar. 61 pasos, 1.525 ms; sin confeti, porcentaje ni confirmación. |
| Mantenimiento | Las últimas poses dejaban el rail y cambiaban cuerpo y proporciones. | Una fuente nueva con casco, cuerpo y cabeza fijos; la misma pata sostiene un martillo para dos golpes pequeños y vuelve al reposo. 61 pasos, 3.065 ms. |

## Fuentes y límites

- `../fuentes/caminata-capas-v1.png` es una placa transparente generada con image_gen integrado usando las referencias del mensajero y caminata originales. Se separa en tres celdas por filas/columnas con alfa cero. No se recortan las siluetas, cambian colores ni retocan píxeles. Se conserva el padding completo de cada celda.
- `../fuentes/mantenimiento-cuerpo-v1.png` añade el casco con image_gen integrado, tomando el cuerpo raster ya separado y la referencia original del casco. La IA también puede alterar detalles del dibujo; **no se afirma una edición idéntica píxel a píxel fuera del casco**. Se conserva la fuente nueva completa. La pata es una copia exacta de la pieza `pata-rail.png` del candidato anterior.
- Los prompts exactos están en `../prompts/`. Rail, señal y martillo tienen fuentes SVG propias. Las escenas SVG incrustan PNG: no son una vectorización del personaje.
- Las patas giran como piezas rígidas. No se prometen flexión dibujada, contacto biomecánico perfecto ni caminata con avance físico: es una caminata en el sitio. Paquete y cola quietos evitan morphing, pero pueden necesitar un gesto secundario tras revisión. El cuerpo del mensajero nuevo tiene proporciones distintas al original.
- El mantenimiento nuevo tiene vista más frontal que la referencia. El martillo nuevo no pretende reproducir exactamente la herramienta original. Su gesto sirve de candidato, no de aprobación final.
- Revisión: hojas completas de nueve muestras, fotogramas individuales y comparativas desktop/móvil inspeccionados. Las pruebas técnicas no sustituyen la valoración del gesto a tamaño real.

## Evidencia

`tools/verify-raster-actions.mjs` comprueba ocho capas/orígenes, reconstruye los 183 PNG desde los metadatos, verifica transparencia en bordes, dimensiones, tiempos WebP lossless y cierre idéntico. Caminata/preparación tienen al menos una pata apoyada sobre y=512 (error máximo medido menor de 0,001 px en la geometría redondeada); ninguna atraviesa ese plano. El cuerpo/casco/rail de mantenimiento permanecen fijos; martillo y pata comparten el giro y el golpe llega al rail.

La señal de preparación usa Cat Fire `#F85239`. Su trayectoria va del borde interior izquierdo del rail al derecho (x=100 hasta x=636 para un bloque de 16 px); se comprueba el encaje geométrico de ambos extremos. En ambos extremos tiene opacidad cero para que el reinicio no sea visible. No es una barra de progreso ni un tiempo estimado de llegada.

La colección pasó 16 casos Chrome (ocho acciones por 390/1280 px): carga, Recursive, ausencia de overflow, pausa, extremo y tamaños 96/128. En las tres nuevas se observaron los 61 pasos y dos vueltas a 1×; los intervalos RAF de esta sesión fueron menores de 16 ms. **No es un benchmark móvil ni una garantía de FPS**. Activar movimiento reducido detuvo la reproducción. Las 24 descargas reales nuevas coinciden byte a byte; con las 40 anteriores suman 64. Evidencia en `.qa/raster-actions/`.

Regenerar con `tools/raster-actions.mjs`, `tools/comparison-gallery.mjs acciones` y `tools/comparison-gallery.mjs coleccion`. Generar no llama a IA, no ejecuta las pruebas de Chrome, no publica y no sustituye el kit. Los manifests conservaron los tiempos y referencias originales.
