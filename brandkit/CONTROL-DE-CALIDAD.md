# Control de calidad

Edición 2026-09-28 · Revisión de cierre: 1 de octubre de 2026.

## Resultado de la revisión

El kit principal tiene símbolo, favicons, paleta, tipografía local con licencia y cinco guías. Las propuestas nuevas del personaje se incluyen para revisión, pendientes de aprobación artística. No se considera terminado el arte final del personaje.

Al retomar el trabajo, `brandkit:verify` fallaba porque la galería y sus piezas no estaban inventariadas. El catálogo y los manuales afirmaban que no se entregaba arte del personaje. Se actualizó el inventario, se corrigió esa contradicción y se enlazó la galería desde el catálogo.

## Comprobaciones técnicas

Comandos: `npm run brandkit:build`, `npm run brandkit:verify -- --sources`, `npm run brandkit:test` y `npm run brandkit:zip`.

| Comprobación | Alcance |
|---|---|
| Inventario | 1.162 entradas, con tamaños y SHA-256; 1.164 archivos contando el manifiesto y este registro |
| Enlaces | Rutas del catálogo, galería, manuales, tipografía y manifiesto del personaje |
| Fuentes actuales | 9 snapshots comparados con el repositorio de la landing |
| Símbolo y favicons | PNG fieles a los mapas, tres tamaños dentro del ICO y apple-touch opaco |
| Personaje | 14 PNG estáticos, 20 secuencias y 147 fotogramas únicos; lienzos y duraciones coinciden con los WebP |
| Exportaciones HD | 14 ilustraciones, 147 fotogramas y 20 WebP con lado mayor de al menos 2.048 px; ampliación entera que conserva los valores RGBA de los PNG |
| Hojas de secuencia | 20 PNG completos y sus 20 versiones HD; los fotogramas conservan todo su lienzo |
| Avatar para redes | SVG del símbolo original sobre Milk y siete PNG opacos de 180 a 2.160 px; el logo cabe en el recorte circular y la versión de 180 px coincide con apple-touch-icon |
| Originales | Hashes de las hojas utilizadas, sin modificar los ocho originales |
| Descargas de la galería | ZIP del personaje con 404 archivos y ZIP de avatares con 10 archivos |
| ZIP de revisión | 480 archivos, 478 entradas en su propio inventario; excluye `descartado/` |

El inventario no se incluye en su propio listado. Este registro queda fuera de los hashes para permitir documentar la verificación final. Los enlaces antiguos del material retirado no se revisan.

`brandkit:test` pasa sus 14 resultados: verificación aislada, originales ausentes, conservación del arte ante entradas ausentes, deriva en los tiempos aunque se actualicen los hashes, fallos de generación, build sin archivos ignorados, builds idénticos, preservación RGBA en HD y del lienzo en las hojas, reparación de una exportación HD corrupta, comparación opcional de fuentes, equivalencia CRLF/LF, ZIP validado tras extraer y conservación del ZIP anterior ante un fallo. La prueba de entrega también abre los ZIP del personaje y los avatares y comprueba su contenido.

## Revisión visual

Se revisaron las 14 ilustraciones y una hoja de contacto con los 147 fotogramas. En el navegador local se comprobaron el catálogo y la galería en escritorio y a 390 y 320 px, sin desbordamiento horizontal. La galería ampliada contiene 20 grupos y 147 PNG estáticos completos, con enlaces de descarga original y HD. Se comprobó que «Ver fotogramas» abre su secuencia, que sus imágenes cargan y que la descarga del ZIP de avatares inicia correctamente. Se revisaron las vistas cuadrada y circular del avatar en móvil. Recursive carga desde los archivos locales. El botón de pausa cambia las 20 previews por sus primeros fotogramas; la galería incorpora el tratamiento de movimiento reducido. No se probó cambiando la preferencia del sistema.

## Pendientes concretos

- **Personaje:** los recortes conservan semitransparencias y variaciones de color de las hojas. La expresión neutral contiene 7.018 valores RGB visibles y 71.243 píxeles semitransparentes. No cumple la paleta cerrada ni la retícula uniforme del encargo. Se entregan escalas enteras HD y hojas de secuencia; amplían el original sin inventar detalle. Faltan aprobación pieza a pieza, el arte vectorial del personaje y el borde para oscuro. Ver [estado del personaje](./03-personaje/README.md).
- **Wordmark:** la composición horizontal es texto vivo en Recursive; no se entrega un logotipo trazado para imprenta.
- **PWA:** los iconos incluidos siguen siendo un snapshot anterior. Su migración al símbolo actual está pendiente.
- **Implementación:** la landing y la app aún necesitan aplicar la identidad del kit. Las observaciones de la app en [producto](./01-manual/producto-app.md) son un snapshot del 28 de septiembre, no una nueva revisión de la app en vivo.

Esta revisión cierra la integridad y la organización de la entrega local. No publica cambios, no reemplaza la aprobación artística y no evalúa ejecución financiera ni seguridad de la app. El PDF y los ZIP anteriores de `output/` no forman parte del paquete actualizado.
