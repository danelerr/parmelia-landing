# Laboratorio GatoPago

Propuestas independientes. No sustituye ni modifica `brandkit/`; no integra recursos en la app ni publica nada.

Abrir [index.html](./index.html) para revisar los entregables disponibles. Las piezas financieras son ejemplos, no comprobantes reales.

## Seis entregables

1. `01-animaciones/`: correcciones del personaje, fotogramas y comparativas originales/propuestas. En `rig-raster/` y `rig-revision/` (rechazados) se retiraron los `fotogramas/` y `miniaturas/` el 7 de octubre de 2026: quedan capas, fuentes, escenas, reglas, manifiestos y la vista previa WebP. Recuperables desde el padre del commit «chore(repo): clean stale assets, fix doc drift and slim rejected rigs»; sus galerías ya no muestran los pasos.
2. `02-manual/`: **descartado el 3 de octubre de 2026** por decisión del equipo; el manual vigente es el del kit (`brandkit/01-manual/`). Recuperable desde el historial de Git.
3. `03-editable/`: biblioteca nativa editable en Figma, componentes, estilos y trazabilidad.
4. `04-iconos/`: familia SVG original, galería, tamaños y estados.
5. `05-movimiento/`: movimiento vectorial, temporización y alternativas reducidas.
6. `06-aplicaciones/`: correos, comprobantes, QR, notificaciones y social.

Los seis puntos están preparados y verificados como propuestas independientes. [ENTREGA.md](./ENTREGA.md) organiza la entrega; `estado.json`, `PROGRESO.md` y `entrega-verificada.json` distinguen las comprobaciones ejecutadas de aprobación, integración o publicación.

## Reproducir las entregas locales

Desde la raíz del repositorio, con las dependencias existentes instaladas:

```sh
node archivo/laboratorio-gatopago/tools/build.mjs
node archivo/laboratorio-gatopago/tools/verify.mjs
```

Los generadores escriben solamente dentro de esta carpeta. `fuentes/brandkit-baseline.json` registra hashes de la base antes de empezar: la verificación compara todos sus archivos, no solo el inventario.

El comando `build.mjs` regenera iconos, movimiento y el índice. `tools/frames.mjs` procesa cola v1 y `tools/normalize-candidates.mjs` procesa las otras cuatro fuentes v2; `tools/comparison-gallery.mjs` crea la comparativa conjunta. Ninguno ejecuta llamadas de IA: se trabaja con las fuentes raster conservadas y sus prompts. El manual (`02-manual/`) se descartó; su guía queda en el historial de Git.

```sh
node archivo/laboratorio-gatopago/tools/normalize-candidates.mjs
node archivo/laboratorio-gatopago/tools/comparison-gallery.mjs
node archivo/laboratorio-gatopago/tools/verify-candidates.mjs
node archivo/laboratorio-gatopago/tools/audit-originals.mjs
```

Las galerías se abren localmente, sin servidor. Las comprobaciones de navegador usan `tools/browser.mjs` y las recetas `qa-comparisons.js`, `qa-icons.js`, `qa-motion.js` y `qa-motion-downloads.js`. Las capturas y copias descargadas son evidencia temporal en `.qa/`, excluida de la entrega de producción. `verify-downloads.mjs` compara esas copias con los originales del laboratorio; requiere haber realizado antes las descargas de prueba. El acceso CLI local de navegador depende de la instalación de Playwright y de una sesión configurada, no se presenta como un entorno de CI ya portable.

## Prueba de movimiento por capas

`01-animaciones/rig-controlado/index.html` añade cinco alternativas técnicas con 41 SVG editables, 41 PNG y WebP. La misma cabeza se reutiliza; solo cambia la parte animada. Esto elimina el morphing geométrico, pero el cuerpo vectorial es nuevo y necesita refinamiento visual: no se recomienda sustituir los sprites aprobados. Fuentes, hashes y límites están junto a cada acción.

Regenerar con `tools/rig-character.mjs`, después `tools/comparison-gallery.mjs rig`; verificar con `tools/verify-rig.mjs`. Usar sus rutas completas bajo `archivo/laboratorio-gatopago/`. La receta de navegador `qa-rig.js` comprueba las cinco acciones a 390/1280 px, controles, final y preferencia de movimiento reducido. El punto 03 tiene auditoría nativa en `03-editable/final-audit.json`; el punto 06 tiene pruebas de las 22 descargas en `tools/qa-application-downloads.js` y `tools/verify-application-downloads.mjs`.

## Alternativas con piezas raster estables

[Comparativa nueva](./01-animaciones/rig-raster/index.html): cinco acciones, 285 pasos PNG, doce capas, WebP lossless, miniaturas, hojas, SVG de montaje y metadatos compactos. La cara/cuerpo u objeto estacionario se conserva durante cada acción. El rail y su pieza encajan; los bloques de intercambio recorren caminos separados. [Revisión y límites](./01-animaciones/rig-raster/REVISION.md) describe la extracción con image_gen integrado, la reutilización de PNG originales en asomarse y la diferencia frente al prototipo vectorial. Las placas y prompts quedan conservados dentro de `01-animaciones/`; regenerar no llama a IA.

```sh
node archivo/laboratorio-gatopago/tools/raster-rig.mjs
node archivo/laboratorio-gatopago/tools/comparison-gallery.mjs raster
node archivo/laboratorio-gatopago/tools/verify-raster-rig.mjs
```

`qa-raster-rig.js` prueba los controles en Chrome; `qa-raster-downloads.js` acciona 40 enlaces reales. `save-browser-audit.mjs` guarda el resultado del navegador antes de navegar a otra página y `verify-raster-downloads.mjs` compara las copias con sus fuentes. No confundir la receta con evidencia de su ejecución; los resultados de la sesión están en `.qa/raster-rig/`.

## Primera ampliación: ocho acciones

[Abrir todas las comparativas raster](./01-animaciones/coleccion/index.html): ocho acciones, 468 pasos PNG. Las tres nuevas viven en `rig-acciones/`: caminata (61), preparando pago (61) y mantenimiento (61). Se añaden 183 miniaturas, tres WebP lossless, hojas de muestras, ocho capas y fuentes/prompts. La caminata conserva perfil y paquete con apoyo calculado de las patas; la preparación evita celebrar antes de una confirmación; mantenimiento conserva cuerpo, casco y rail. Los límites de articulación rígida y diferencias de dibujo están en [REVISION.md](./01-animaciones/rig-acciones/REVISION.md).

```sh
node archivo/laboratorio-gatopago/tools/raster-actions.mjs
node archivo/laboratorio-gatopago/tools/comparison-gallery.mjs acciones
node archivo/laboratorio-gatopago/tools/comparison-gallery.mjs coleccion
node archivo/laboratorio-gatopago/tools/verify-raster-actions.mjs
```

`qa-raster-actions.js` prueba la colección de ocho a 390/1280 px, tamaños 96/128 y dos ciclos completos de las tres nuevas. `qa-actions-downloads.js` acciona 24 enlaces nuevos y `verify-actions-downloads.mjs` compara las copias con las fuentes. Guardar sus resultados con `save-browser-audit.mjs` antes de navegar a otra página. Evidencias en `.qa/raster-actions/`; no confundir generadores con pruebas ejecutadas. La galería conjunta referencia los archivos de las dos colecciones sin duplicarlos ni reemplazar fuentes.

## Colección vigente: dieciocho acciones

[Comparativa principal](./01-animaciones/index.html): recupera las cinco propuestas anteriores, sin modificar sus PNG ni WebP (41 pasos). Los montajes de `rig-raster/` y `rig-revision/` fueron rechazados por alterar la apariencia del gato y ya no son la selección vigente. La [colección completa](./01-animaciones/coleccion/index.html) reúne estas cinco y las otras trece sin cambios: 18 acciones y 814 pasos. [Selección explícita](./01-animaciones/seleccion-vigente.json). La segunda ampliación incorporó reposo, saludo, salto, error recuperable, oreja y comprobante, que permanecen intactos. Una prueba técnica verde no equivale a calidad artística.

Regenerar gestos con `tools/raster-gestures.mjs` y comprobante con `tools/receipt-action.mjs` (anteponer `archivo/laboratorio-gatopago/` desde la raíz). Después generar las galerías con `tools/comparison-gallery.mjs gestos`, `documento` y `coleccion`. Verificación técnica con `verify-raster-gestures.mjs` y `verify-receipt-action.mjs`. Estas herramientas no llaman a IA. [Límites de gestos](./01-animaciones/rig-gestos/REVISION.md) y [procedencia del comprobante](./01-animaciones/rig-documento/README.md).

Las 144 descargas iniciales de las dieciocho acciones se conservan con sus fechas en `.qa/raster-rig/`, `.qa/raster-actions/`, `.qa/raster-gestures/`, `.qa/receipt/` y `.qa/care/`. Tras el feedback se repitieron 24 descargas de las tres acciones modificadas, en `.qa/revision/`, y las 22 de aplicaciones. El manual, movimiento y posts se conservan byte por byte; el manual documenta el inventario inicial de 1058 pasos, no se presenta como una nueva edición. La configuración de navegador es local a esta máquina, no un CI portable: usa Chrome, CLI cacheado y acceso a `file://`; guarda artefactos únicamente dentro de `.qa/`. No modifica el navegador habitual ni la app.

La última tanda añade creciendo (81), tarjeta (61), linterna (73) y seguridad (61): 276 PNG, 276 miniaturas, cuatro WebP lossless, cuatro escenas y nueve objetos SVG editables. Reutiliza las cuatro piezas PNG del gato, con una cola al otro lado del cuerpo, sin retocar los píxeles. Regenerar con `tools/care-actions.mjs`, después `comparison-gallery.mjs cuidados` y `coleccion`; verificar con `verify-care-actions.mjs`. Revisar [procedencia y límites](./01-animaciones/rig-cuidados/README.md).

`qa-care.js` comprobó las 18 comparativas/36 casos y los 276 pasos nuevos a 1x; `qa-care-downloads.js` realizó 32 descargas nuevas y `verify-care-downloads.mjs` las comparó byte a byte. Parpadeo y mirar se revisaron sin encontrar motivo para redibujarlos solo por aumentar la colección. El laboratorio sigue separado del kit oficial y los candidatos requieren aprobación antes de adoptarlos.

## Revisión en reproducción de los originales (evidencia)

[Galería de las veinte secuencias](./01-animaciones/originales/index.html), con 166 pasos y tiempos originales, una vuelta y controles de tamaño. `originals-gallery.mjs` genera la galería y copias byte a byte; `verify-originals.mjs` verifica fuentes y crea tres contactos cronológicos de las quince acciones restantes. `qa-originals.js` reproduce las veinte y comprueba que se observan todos los pasos.

La prueba vuelve a traer la ventana de revisión al frente: se detectó renderizado limitado a 1 Hz incluso con documento visible, recuperado a unos 15 ms por frame en esa sesión. Es evidencia del entorno de prueba, no un defecto atribuido al arte ni una promesa de rendimiento móvil. La [auditoría](./01-animaciones/AUDITORIA-ORIGINALES.md) mantiene separados hallazgos, correcciones y pendientes.

## Dirección

Milk e Ink como superficies, Cat Fire como acento, bordes rectos, desplazamientos cuadrados y Recursive local. El símbolo permanece estable. El gato aporta personalidad sin dar nombre a las funciones públicas. No se prometen costes, cobertura, seguridad absoluta ni liquidación por medio de una ilustración.
