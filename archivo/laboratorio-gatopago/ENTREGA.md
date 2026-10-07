# Entrega del laboratorio GatoPago

Los seis puntos se entregan separados del brandkit. Abrir [el catálogo local](./index.html); no necesita servidor. Todo son propuestas para revisión, no una sustitución de recursos aprobados.

| Punto | Entrega | Archivos y fuentes |
| --- | --- | --- |
| 01. Personaje | [Cinco propuestas anteriores restauradas](./01-animaciones/index.html); [colección completa](./01-animaciones/coleccion/index.html) de 18 acciones y 814 pasos PNG | PNG y WebP anteriores reutilizados sin cambios. `rig-raster/` y `rig-revision/` retirados por rechazo visual, no recomendados. Las otras trece acciones y los [veinte originales](./01-animaciones/originales/index.html) se conservan. |
| 02. Manual | **Descartado el 3 de octubre de 2026**; el manual vigente es `brandkit/01-manual/`. Recuperable desde el historial de Git | Texto nativo, Recursive incrustada, logo, color, voz, tipografía, composición, ejemplos correctos/incorrectos, componentes y movimiento. |
| 03. Editable | [Biblioteca nativa Figma](https://www.figma.com/design/HSJ40AEahIfLIgjXjB3foS) | 50 variables, 8 estilos, 2 sombras, 75 componentes/11 familias. [Fuentes y acceso](./03-editable/index.html): JSON, CSS, scripts e IDs. No se descargó un .fig. |
| 04. Iconos | [Galería de 32 SVG originales](./04-iconos/index.html) | Seis categorías, buscar, fondos, tamaños 16/24/32/48 y descargas individuales. SVG editables con currentColor. |
| 05. Movimiento | [Seis ejemplos SVG](./05-movimiento/index.html) | Seis animados y seis estáticos; pausa, reinicio, extremo final y movimiento reducido. |
| 06. Aplicaciones | [Siete piezas, 22 archivos](./06-aplicaciones/index.html) | Correo HTML/TXT, comprobante A4, QR A5, tres notificaciones y tres composiciones sociales, con fuentes editables. |

## Cómo revisar las animaciones

Elegir una acción y comparar la referencia intacta con la propuesta. El control de fase sincroniza el avance relativo, no los milisegundos de dos secuencias distintas. Usar pausa, fotogramas individuales, fondo oscuro y tamaños de lienzo. Los enlaces permiten descargar original/propuesta, hoja, manifest, escena y reglas; cada miniatura enlaza el PNG completo.

La nueva tanda de cuidados incluye brote, tarjeta, linterna y llave: cabeza/cuerpo/cola constantes y objetos SVG propios. Se usan piezas raster, no un gato vectorial sustituto. [Procedencia, límites y regeneración](./01-animaciones/rig-cuidados/README.md).

## Comprobaciones

[Auditoría de cierre](./entrega-verificada.json) y [progreso/evidencia](./PROGRESO.md). Inventario vigente tras la restauración: 814 PNG. La comparativa principal carga los 41 pasos anteriores de las cinco acciones, no los montajes rechazados. Las pruebas de 1058/1202 pasos se conservan como historial técnico, sin validez de aprobación artística. Comprobante y QR conservan la revisión anterior; el manual y Figma no se modifican en esta restauración. El manual mantiene su inventario inicial de 1058 pasos, documentado en `fuentes/manual-inventory-v1.json`.

Los 1.197 archivos del brandkit siguen idénticos al baseline. `.qa/` contiene capturas, auditorías y copias de descargas de prueba; no son assets de producción. Los intentos descartados y el prototipo vectorial están identificados como material de revisión.

## Lo que no se afirma

No hubo integración en la app, commit, push ni despliegue. Falta decidir qué propuestas adoptar. La animación usa articulaciones rígidas y algunas poses reinterpretadas; las limitaciones se explican junto a sus fuentes. No se probaron teléfonos físicos, clientes de correo ni impresión. Los importes/QR son ejemplos ficticios: no ejecutan ni acreditan operaciones.

## Repetir la auditoría

Desde la raíz, con las dependencias locales instaladas:

```sh
node archivo/laboratorio-gatopago/tools/verify.mjs
node archivo/laboratorio-gatopago/tools/verify-delivery.mjs
```

Las guías de cada tanda describen regeneración y pruebas específicas. `verify-delivery.mjs` requiere las auditorías previas conservadas; no suplanta una prueba nueva de navegador o Figma. El adaptador Playwright actual depende de esta instalación local, no se presenta como CI portable.
