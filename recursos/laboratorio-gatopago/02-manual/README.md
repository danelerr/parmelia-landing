# Manual visual del laboratorio

12 páginas en HTML y PDF A4, con ejemplos correctos e incorrectos: voz, símbolo, color, tipografía, composición, componentes, iconos, movimiento, personaje, aplicaciones y revisión.

Es una propuesta independiente. Las piezas ilustradas son ejemplos. El punto 06 contiene siete piezas y 22 archivos descargables; el manual no sustituye esas fuentes. La página del personaje informa de dieciocho alternativas con piezas raster estables y 1058 pasos PNG, además de las comparativas anteriores de 41 pasos raster y 41 SVG editables. El generador y la comprobación de texto toman estas cifras del catálogo actual. Reposo, saludo y salto comparten una anatomía con una cola; oreja y error mantienen una cara estable. Comprobante conserva gato y papel; solo cambia el detalle impreso. Cuidados reutiliza cuatro piezas raster y añade nueve objetos SVG; el brote crece desde una raíz fija, la terminal/escudo no se mueven y la linterna evita destellos. Pata y oreja se articulan rígidamente; el salto es un rebote sentado, no una secuencia de patas extendidas. El cuerpo de la prueba SVG sigue siendo un prototipo, no un reemplazo de los sprites. Las variantes nuevas tampoco tienen aprobación artística final.

## Regeneración

Desde la raíz:

```sh
node recursos/laboratorio-gatopago/tools/static-fonts.mjs
node recursos/laboratorio-gatopago/tools/manual.mjs
```

Abrir el HTML en un navegador con acceso a archivos locales. La exportación verificada usa Chrome mediante Playwright y `tools/export-pdf.js`, con A4, fondos e incrustación tipográfica. Requiere las dependencias locales existentes y Python con fontTools para instanciar la fuente.

Las instancias TTF conservan los contornos de Recursive y tienen nombres privados distintos; sus ejes y hashes están en `assets/fonts/procedencia.json`. Incluyen la licencia OFL. No se modifica la fuente original. Esta exportación evita la fragmentación de la fuente variable al imprimir con Chrome.

Las muestras del logo usan el PNG canónico sin redibujarlo. Los seis iconos del manual son exportaciones PNG de los SVG nativos del laboratorio, para evitar artefactos de cosido de trazos en ciertos renderizadores PDF. Los archivos SVG editables siguen disponibles en el punto 04.

Se renderizaron las 12 páginas con pdftoppm. El PDF final conserva texto seleccionable y cuatro fuentes TrueType incrustadas; no es una serie de capturas de pantalla.
