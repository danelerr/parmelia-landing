# Brandkit en Figma

Importación del 2 de octubre de 2026 sobre el archivo existente, sin publicar biblioteca.

[Abrir la portada](https://www.figma.com/design/HSJ40AEahIfLIgjXjB3foS?node-id=4-298).

## Contenido

16 páginas: portada, guía, fundamentos, logos, personaje, timelines, hojas, frames,
iconos, botones, componentes, imágenes de marca, plantillas, entregables, manuales y originales.

- 225 recursos importados: 209 raster y 16 SVG vectoriales.
- 14 ilustraciones, 147 fotogramas únicos, 20 hojas y 8 originales íntegros.
- 20 timelines nativas: opacidad HOLD de frames completos, orden y tiempos del manifiesto.
- 10 componentes de logo nuevos; gatos y fotogramas como componentes reutilizables.
- Se conservan los 50 tokens, 8 estilos Recursive, 2 efectos y componentes existentes.
- 7 manuales y 9 guías como texto nativo; plantilla A4 con texto editable.
- Avatares, favicon, snapshot PWA, Open Graph, QR de demostración y portada X existente.

## Uso y límites

En **Motion**, seleccionar un frame `Animation/...` y reproducir su timeline.
Los usos `loop` y `once` están documentados; no confundir la preview con un estado financiero.
Los PNG no se convirtieron en anatomía vectorial. Los SVG sociales conservan texto trazado.
El QR abre gatopago.com: no cobra ni solicita autorización. El PWA es un snapshot de referencia.

Las variantes, personaje, componentes y plantillas conservan su condición de revisión.
Los rigs rechazados y material retirado están excluidos. No se inventó arte ni se cambiaron
colores, silueta o fotogramas. CSS, JSON, WOFF2, licencia, recetas, planes y ZIP permanecen
en el repositorio; Figma es la representación visual, no su reemplazo técnico.

## Evidencia y mantenimiento

`REPORT.json` resume cobertura y límites. Los JSON por página guardan IDs concretos;
`*.uploads.json` registra la fuente y resultado, sin URLs temporales. `motion-audit.json`
comprueba las 20 timelines y sus 147 capas con imagen y pistas HOLD, sin geometrías animadas.
Intercambio se exportó a MP4 de QA de 320 px / 5 fps y se inspeccionaron seis momentos;
las otras secuencias tienen auditoría estructural, no revisión individual de vídeo.

La verificación local confirmó **1.197 archivos del brandkit sin cambios**. No se hizo
commit, push, despliegue ni modificación de la app.

`tools/figma-brandkit.mjs` prepara inventario y scripts; `tools/figma-upload.mjs` envía bytes
originales a URLs de carga otorgadas por Figma. Ejecutarlos no publica una biblioteca.
Antes de reutilizarlos, leer los IDs actuales: no recrear páginas ni volver a aplicar escala
a vectores ya importados. El ledger preserva el estado de esta importación, no declara
que una regeneración completa y automática haya sido probada.

Los jobs con URLs de un solo uso y capturas de QA se guardaron en `output/`, ignorado por Git.
