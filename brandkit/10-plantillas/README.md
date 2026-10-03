# Plantillas de comunicación

[Ver colección](./index.html). Estado: **en revisión**.

| Pieza | Formato | Uso |
|---|---|---|
| Post cuadrado | SVG + PNG 1080 × 1080 | Una idea principal |
| Novedad vertical | SVG + PNG 1080 × 1350 | Cambio concreto, público y siguiente paso |
| Portada horizontal | SVG + PNG 1500 × 500 | Fondo Ink; espacio izquierdo libre para el avatar |
| Documento A4 | HTML local con CSS print | Documento editorial, no contrato |

El copy editable de las piezas gráficas está en [modelo.json](./modelo.json); la composición se genera desde `herramientas/brandkit/design-files.mjs`. El PNG no es la fuente editable. El copy se transforma en contornos Recursive al generar SVG: editar el JSON, regenerar y revisar. El build rechaza titulares demasiado anchos. A4 conserva texto editable HTML, pero para conservar cambios entre builds hay que editar su receta en el generador. No se usan fuentes externas.

Mantener una idea por pieza, margen de 80 px en posts y zonas seguras en portada. No añadir tres acentos nuevos ni utilizar a la mascota como garantía de seguridad. Conservar versiones, revisar recortes y no prometer funciones sin comprobarlas. No se reanudó ni modificó el pitch deck existente.
