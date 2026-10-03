# Biblioteca editable del laboratorio

[Abrir el archivo Figma](https://www.figma.com/design/HSJ40AEahIfLIgjXjB3foS). Es un archivo separado: no reemplaza la marca vigente, no modifica la app y no se publicó como biblioteca.

## Qué contiene

- Cover y muestras de fundamentos claros/oscuros.
- 50 variables: 16 primitivas, 18 alias semánticos y 16 medidas. Ámbitos y sintaxis CSS explícitos; la paleta de origen no cambia.
- 8 estilos Recursive con ejes de la fuente variable, más 2 sombras cuadradas sin desenfoque.
- 32 componentes vectoriales de iconos y 128 muestras en cuatro tamaños.
- 2 familias de botones: 20 variantes, texto editable, visibilidad e intercambio de icono. 40 muestras claras/oscuras.
- 9 familias adicionales: campos de texto e importe, badges, notificaciones, diálogos, QR, comprobante, skeletons y Pixel Rail. 23 variantes.

Los 75 componentes principales viven fuera de los marcos de revisión. Estos muestran instancias reutilizables, no capturas pegadas. Campos y textos usan auto-layout y reflujo; los iconos y el QR son vectores nativos.

## Uso y límites

Los componentes son propuestas visuales, no código de autenticación, cálculo o pago. Los importes, referencias y resultados son ficticios. El QR abre `https://example.org/gatopago-demo`; no sirve para cobrar. Si cambia el destino, hay que regenerar el código y cambiar la etiqueta juntos. En el comprobante, importe, coste y total son propiedades de texto separadas: Figma no realiza la suma.

Para cambiar un botón, editar Label, Show icon e Icon en la instancia. La prueba de estas tres propiedades está registrada en `buttons-property-tests.json`; la muestra quedó restaurada. No cambiar el símbolo estable ni usar el nombre interno del personaje como nombre de funciones.

## Fuentes y trazabilidad

`tokens-source.json` y `tokens.css` conservan la correspondencia de variables. Las recetas `*.plugin.js` son código fuente para construir el archivo mediante la API de Figma; los generadores están en `../tools/figma-*.mjs`. No se ejecutan ni publican automáticamente al generar archivos locales. Los JSON `*-state.json`, los tests de propiedades y la auditoría registran IDs y resultados reales. El registro central es `figma-state.json`.

Figma es la fuente editable en línea. No se ha entregado una copia `.fig` descargada ni se han publicado componentes. La auditoría nativa está en `final-audit.json`: los 50 tokens coinciden con su fuente, no hay alias rotos ni ciclos y la sintaxis CSS es correcta. Los 75 componentes y sus instancias conservan vínculos; los textos principales tienen Recursive, estilo y color vinculados. Se corrigieron el scope de bordes de error y el binding del rail de portada sin cambiar su aspecto.

El PNG del QR renderizado desde Figma se decodificó como el destino de ejemplo. Su fuente sigue siendo dos vectores nativos, sin imagen raster. La página Foundations muestra los 16 alias semánticos iniciales; los dos alias de icono posteriores están en las variables y en `tokens-source.json`, no en sus swatches. Se revisaron las capturas posteriores a los ajustes de borde. No se realizó un ensayo automatizado de contraste de todos los estados. Estas comprobaciones no equivalen a aprobación artística ni a funcionalidad financiera.

La relectura de cierre está en `live-refresh.json`: 50 variables, 8 estilos, 2 sombras y 75 componentes/11 familias; 324 instancias examinadas mantienen vínculo. `tools/verify-delivery.mjs` vuelve a comparar alias, scopes, sintaxis, valores y estilos con las fuentes locales. La relectura fue de solo lectura; no recreó ni publicó recursos y no presenta las capturas anteriores como capturas nuevas.
