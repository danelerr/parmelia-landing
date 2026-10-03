# Aplicaciones de marca

Siete propuestas independientes: correo, comprobante, QR A5, tres notificaciones y tres piezas sociales. Nada está integrado, enviado ni publicado.

## Editar y regenerar

Editar `fuentes.json` para textos y datos, `../tools/applications.mjs` para composición. Ejecutar desde la raíz `node recursos/laboratorio-gatopago/tools/applications.mjs`. Solo escribe en esta carpeta. El catálogo es `index.html`.

Los SVG principales mantienen texto editable y cuatro instancias de Recursive incrustadas. También se entregan versiones `-trazado.svg`, sin dependencia tipográfica, y PNG del tamaño indicado. Algunas aplicaciones no admiten fuentes incrustadas: instalar las TTF de `../assets/fonts/` y conservar su licencia OFL; no confundir la versión trazada con texto editable. La portada de 1500 × 500 no contiene texto.

## Correo

`correo/actualizacion.html` es una plantilla real de tablas y CSS inline; incluye alternativa `.txt`. Recursive funciona en la vista de navegador, pero la plantilla tiene Arial como fallback deliberado para clientes de correo. Antes de enviar, sustituir la imagen data URI por un HTTPS o CID permitido por el proveedor, adaptar datos reales, y verificar Gmail, Outlook y Apple Mail. No se ha probado ni enviado en esos clientes.

## Comprobante

Revisión del 2 de octubre: se recupera la composición centrada de `ReceiptModal.tsx` y la envoltura de `exportCard.ts` del frontend anterior (fuente consultada en el padre de `6042b43`, sin restaurar ese código). Logo discreto, importe y moneda en una línea, destinatario, información formal dentro de un panel y advertencia de ejemplo al pie. No se usa el titular gigante del primer prototipo.

HTML adaptable, captura PNG y PDF A4. Los importes suman 125,00 + 0,25 = 125,25 USDC. Los nombres, referencia, red y estado son ficticios. No acredita pago ni saldo. Un comprobante real debe obtener estos datos del sistema; no del texto de esta muestra.

## QR

Revisión del 2 de octubre: composición de tarjeta inspirada directamente en `CreateLink.tsx` y `exportCard.ts` anteriores. Logo arriba, código con margen limpio, cuenta debajo, borde Ink y sombra Cat Shadow. Sin «Un QR. Un destino claro.». El destino y todos los datos siguen siendo de demostración: se recupera el estilo, no un cobro real.

SVG editable, SVG trazado, PNG y PDF A5 (148 × 210 mm). Quiet zone de cuatro módulos; código separado de 29 × 29 módulos. El destino `https://example.org/gatopago-demo` es una página de ejemplo, no un cobro. El código permanece libre de logos y decoración. El verificador decodifica el PNG completo y el código aislado a tres escalas. La lectura digital no sustituye probar una impresión física al 100 % y varios teléfonos antes de una aplicación real.

## Verificación

`python recursos/laboratorio-gatopago/tools/verify-applications.py recursos/laboratorio-gatopago` verifica hashes, tamaños, textos editables, importes y lectura del QR. Las notificaciones permiten cerrar y restaurar ejemplos sin ejecutar operaciones. Las pruebas del navegador y los PDF se conservan en `.qa/applications/`, fuera de la entrega productiva.

Los 22 enlaces de descarga del catálogo se accionaron en Chrome y se compararon byte a byte con sus fuentes. También se cerraron y restauraron las tres notificaciones. Reproducir con `tools/browser.mjs run-code-file tools/qa-application-downloads.js` usando sus rutas completas bajo el laboratorio, y después `node recursos/laboratorio-gatopago/tools/verify-application-downloads.mjs`. El resultado está en `.qa/applications/download-verification.json`; no prueba envío de correo ni impresión física.

Propuestas sin aprobación artística. Marca y personaje no tienen una licencia pública de reutilización; la tipografía conserva su OFL. El nombre interno del personaje no aparece en las piezas públicas.
