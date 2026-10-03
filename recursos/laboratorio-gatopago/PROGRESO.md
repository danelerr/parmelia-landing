# Progreso y comprobaciones

## Estado vigente: restauración tras rechazo visual

El usuario rechazó cola, siesta, camino e intercambio por cambios de color, proporciones y deformaciones. Se retiraron de la selección vigente los montajes de `rig-raster/` y `rig-revision/`, y se recuperaron las cinco propuestas de `01-animaciones/comparativas.json` sin regenerar ni modificar ningún PNG o WebP. La página principal tiene sus 41 pasos anteriores; la colección combina esas cinco propuestas y las otras trece acciones sin cambios, para un total de 814 pasos. `01-animaciones/seleccion-vigente.json` fija esta selección para que regenerar el catálogo no vuelva a promover los montajes rechazados.

Comprobante, QR, manual, movimiento y posts no se revierten. Las verificaciones de abajo son historial y no validan artísticamente las variantes retiradas. La evidencia de la restauración está en `.qa/restoration/`.

## Historial de entrega anterior al rechazo visual

Laboratorio independiente del brandkit. Las propuestas están entregadas para revisión; no se anuncian como arte aprobado ni se integran en la app. [Entrega por punto](./ENTREGA.md), [catálogo](./index.html) y [auditoría de cierre](./entrega-verificada.json).

1. Animaciones: 18 alternativas raster, 1202 pasos PNG vigentes. Se conserva la versión inicial de 1058 pasos (285+183+253+61+276); la revisión sustituye tres montajes (49+61+73) por 327 pasos (97+121+109), sin reemplazar los originales. Fuentes, tiempos, miniaturas y WebP lossless. Las veinte secuencias originales/166 pasos permanecen intactas. Detalle actual en `01-animaciones/rig-revision/README.md`.
2. Manual: HTML y PDF de 12 páginas A4, texto seleccionable, numeración y cuatro fuentes TrueType incrustadas. Se renderizaron y revisaron las doce páginas y la página 10 tras exportar. SHA-256: `883e1ecf3e543ec6d6d5aac44a1528f7daf315a9e639e1f079b6ec186bd7934b`.
3. Figma nativo: cinco páginas, 50 variables, 8 estilos Recursive, 2 sombras, 75 componentes y 11 familias. Relectura de variables/estilos y tres páginas de componentes guardada en `03-editable/live-refresh.json`; 324 instancias examinadas mantienen vínculo a su componente. Las variables/alias/scopes/sintaxis y estilos se compararon nuevamente con las fuentes locales. La auditoría previa de bindings/QR sigue conservada en `final-audit.json`. No hay un archivo .fig descargado ni biblioteca publicada.
4. Iconos: 32 SVG originales y galería con búsqueda, categorías, temas y cuatro tamaños. Renderizados de nuevo; 32 enlaces reales de descarga comparados con las fuentes.
5. Movimiento: seis SVG animados y seis variantes estáticas. Controles, extremos, pausa, finales y preferencia de movimiento reducido probados previamente en 12 casos Chrome/24 capturas; sus fuentes no cambiaron. Doce descargas verificadas nuevamente. No es un benchmark de teléfonos.
6. Aplicaciones: siete piezas y 22 archivos editables/descargables: correo HTML/TXT, comprobante A4, QR A5, tres notificaciones y tres composiciones sociales. Hashes, tamaños, suma y seis decodificaciones QR repetidos; PDFs de una página y texto nativo. Las 22 descargas coinciden con sus fuentes.

## Revisión del feedback · 2 de octubre

La comparativa solicitada en `01-animaciones/index.html` y la colección de dieciocho enlazan las versiones nuevas. Chrome observó los 327 pasos de asomarse/camino/intercambio a velocidad 1× y comprobó 24 combinaciones de fase/ancho, los finales y movimiento reducido. Las 24 descargas de estas acciones coinciden con sus fuentes. Auditorías en `.qa/revision/`.

Comprobante y QR recuperan la composición del frontend anterior; se renderizaron los dos PDF actuales con PyMuPDF, se decodificó el QR nuevo y se repitieron las 22 descargas de aplicaciones. Los hashes de cada render se vinculan a su PDF, evitando reutilizar una captura antigua. Poppler de MiKTeX no funcionó en este entorno; no se usó su salida como evidencia.

El manual, movimiento, posts, correo y notificaciones conservan exactamente sus 30 archivos. Los 1197 archivos del brandkit coinciden con la referencia inicial. No hubo cambios en otro checkout, integración, commit, push ni despliegue. El manual conserva deliberadamente su inventario v0.1.0 de 1058 pasos: esta revisión se documenta aquí, no se rediseña el manual que gustó al usuario.

## Verificación anterior de navegador (conservada)

36 casos de las 18 comparativas a 390/1280 px: todas las imágenes y Recursive cargadas, sin overflow ni errores de página; pausa, último paso y tamaños de lienzo 96/128/768 comprobados. Las cuatro acciones nuevas mostraron sus 276 pasos a 1x; linterna completó dos ciclos, las tres acciones únicas conservaron el final. Movimiento reducido detiene la reproducción. Auditoría: `.qa/care/browser-verification.json`, 2 de octubre de 2026, 08:36:03 UTC.

Las tandas anteriores conservan sus pruebas de reproducción natural: los cinco gestos/253 pasos, comprobante/61 y los ciclos/acciones originales se verificaron antes. La prueba actual vuelve a comprobar los controles de todas las acciones, no vuelve a presentar esas pruebas antiguas como ejecuciones nuevas.

La navegación real del índice mostró seis entregables y 18 opciones de comparativa con el inventario de 1058 pasos actualizado, 08:39:03 UTC. La auditoría de cierre comprobó 130 referencias locales, el SHA de cada PNG y todas las fuentes/miniaturas/metadatos de la colección.

210 descargas reales verificadas byte a byte: 44 de iconos/movimiento, 22 aplicaciones y 144 de animaciones (40+24+40+8+32). Es el número de descargas de prueba, no una afirmación de 210 diseños únicos. Evidencias separadas por tanda en `.qa/`.

## Correcciones y fallos conservados con contexto

- Reposo/cuerpo v1 y v2 y comprobante v1 se descartaron por extremidades de más; se seleccionaron cuerpos con una sola cola y cuatro patas. No se borraron fuentes/prompts de revisión ni se presentaron esos intentos como éxito.
- El salto se limitó a 64 px tras detectar dos píxeles en el borde. La tinta del comprobante usa longitudes absolutas; se corrigió un primer trazado normalizado que aparecía demasiado pronto.
- En cuidados se corrigieron chip tapado, tallo oscuro, gotas separadas del pico y el agarre de la llave. La comparación rectangular de cabeza daba falsos fallos al incluir partes externas de la pata; la prueba final exige diferencia cero dentro de la máscara propia con alfa >=250, además de reconstruir la imagen completa byte a byte.
- Un intento de descarga anterior navegó al WebP por faltar acceso local. Se corrigió la configuración y se repitió; no se contó el intento incompleto. Para reproducción se trajo la ventana al frente tras detectar RAF limitado a 1 Hz.
- Al actualizar el PDF se detectó que la receta imprime la pestaña actual. Se volvió a navegar al manual antes de exportar; solo la exportación A4 de doce páginas verificada se considera final.

## Historial de cantidades

Cinco acciones/285 pasos; primera ampliación de ocho/468; cinco gestos hasta trece/721; comprobante hasta catorce/782; cuidados hasta dieciocho/1058. Los manifests, fuentes y auditorías de cada tanda conservan ese historial. Las 41 propuestas raster anteriores y el prototipo de 41 SVG se identifican como referencias, no como los candidatos actuales ni como sustitutos recomendados.

## Límites y separación

Articulación rígida de patas/oreja, salto sentado y reinterpretaciones del cuerpo/objetos declaradas en cada tanda. Las pruebas no certifican anatomía aprobada, fluidez en dispositivos físicos, impresión ni clientes de correo. QR, comprobantes y notificaciones contienen datos ficticios; ningún recurso confirma un pago, rentabilidad, lectura NFC o seguridad real.

Los 1.197 archivos del brandkit permanecen idénticos al baseline del laboratorio. No se tocó el frontend unificado ni hubo commit, push, publicación o despliegue. Los cambios previos ajenos al laboratorio en el worktree se conservaron. La entrega del objetivo completo se cierra como propuestas independientes; su adopción es una decisión posterior, no un bloqueo artificial para realizar el trabajo solicitado.
