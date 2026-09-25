# Sistema visual

Edición 2026-09-24 · Valores observados en la landing y reglas de uso para el kit.

## Dirección

Pixel art cálido sobre una interfaz legible. Bloques, bordes definidos, sombras desplazadas y espacio suficiente. La personalidad vive en el gato, la tipografía y los acentos; no hace falta decorar cada control.

La [paleta entregada](../05-colores/README.md) se extrae del CSS existente. No se han elegido colores nuevos ni corregido las imágenes.

## Logo

Archivo principal: [gatopago.svg](../02-logos/simbolo/gatopago.svg), vector 64 × 64, tres colores, sin rectángulo de fondo.

- Mantener proporciones; usar `object-fit: contain`, no `cover`.
- No cortar orejas, bigotes ni contorno. El espacio transparente forma parte del archivo.
- No añadir resplandor, volumen, rotación o expresiones al símbolo.
- Las versiones ilustradas de la cabeza no reemplazan al SVG en navegación ni favicons.
- Como regla de composición de esta entrega, reservar al menos 1/4 del ancho del símbolo como área libre alrededor del lockup. No es un margen añadido dentro del SVG.
- En navegación, el símbolo existente mide 34 px. Para 16, 32 y 48 px usar los favicons específicos incluidos. Revisar cualquier uso menor: no reducir arbitrariamente una ilustración compleja.
- Sobre fondos oscuros, verificar que los rasgos Ink no se pierdan. Preferir un contenedor claro o el conjunto símbolo + nombre claro; el símbolo tricolor no equivale a una versión inversa optimizada.

### Composición horizontal

La landing compone el símbolo con texto vivo **GatoPago**: Recursive Variable, `MONO 0`, `CASL 1`, `wght 760`, tracking `-0.045em`, separación de 10 px y símbolo de 34 px. El catálogo incluye una muestra escalada de esta composición.

No se ha encontrado un wordmark vectorial trazado independiente ni se entrega uno inventado. Si un proveedor requiere curvas para impresión, hay que exportarlo desde una herramienta de diseño y aprobar visualmente el resultado. Las familias alternativas mencionadas durante la exploración no forman parte del kit vigente.

## Color

| Rol | Token | HEX | Regla |
|---|---|---|---|
| Acento principal | Cat Fire | #F85239 | Acción principal, firma y puntos de atención |
| Sombra del gato | Cat Shadow | #CF3433 | Profundidad del personaje y sombra roja |
| Profundidad | Cat Deep | #9F292E | Detalle secundario de la paleta |
| Texto y bordes | Ink | #0B0B0F | Lectura, contornos y secciones oscuras |
| Fondo cálido | Milk | #FFF8F0 | Lienzo principal |
| Superficie | Paper | #FFFDF9 | Tarjetas claras |
| Separación | Oat | #EEE4D8 | Capas suaves y divisores |
| Neutro secundario | Stone | #A99F96 | Decoración o contenido no esencial; comprobar contraste |
| Éxito | Growth | #71D5A1 | Confirmaciones verificadas |
| Información | Info | #79B9FF | Ayuda o información |
| Pendiente | Pending | #F6C65B | En proceso, sin implicar fallo |
| Error | Danger | #FF6B7A | Error y riesgo; siempre con texto o icono |

Ink Soft y Ink Raised completan superficies oscuras en los archivos de tokens. No asignar colores al azar a cada producto. Priorizar fondos neutros, un acento dominante y estados semánticos puntuales.

Cat Fire con texto Ink es la combinación primaria. Milk sobre Cat Fire no alcanza AA para texto normal: no copiar el aspecto de un botón sin comprobar la legibilidad. El archivo [contraste.json](../05-colores/contraste.json) contiene los cálculos de las combinaciones principales; no certifica toda la interfaz.

## Tipografía

**Recursive Variable** es la única familia vigente identificada en la landing. El detalle de archivos, ejes y licencia está en [tipografía](../04-tipografia/README.md).

| Función observada | Configuración |
|---|---|
| Cuerpo base | MONO 0, CASL 0, peso 450 |
| Copy de sección | CASL 0.4, peso 430, interlineado 1.65 |
| Títulos de sección | MONO 0, CASL 0.18, peso 760, slnt -4, tracking -0.065em, interlineado 0.94 |
| Botones | CASL 0.25, peso 760, 0.9rem |
| Nombre de marca | MONO 0, CASL 1, peso 760 |
| Datos y referencias | MONO 1, CASL 0; cifras tabulares |

No aplicar el interlineado de los titulares a párrafos o instrucciones. En cifras financieras, priorizar estabilidad de ancho, alineación y etiquetas de moneda. No convertir toda la interfaz a monospace.

## Geometría y espacio

- Contenedor de landing observado: 1200 px; separación entre secciones `clamp(6rem, 11vw, 10rem)`.
- Botones existentes: borde 2 px, esquinas rectas, altura mínima 48 px, padding horizontal 20 px, sombra desplazada 4 px.
- Radios disponibles en tokens: 8, 16, 24 y 32 px. Su existencia no significa que deban aplicarse a todos los componentes: botones rectos y contenedores suaves pueden convivir con intención.
- Sombra de marca: 4 px × 4 px Cat Shadow. Sombra Ink: 6 px × 6 px.
- Como pauta para piezas nuevas, partir de una retícula de 4 px y espaciamientos de 8/12/16/24/32/48. Es una regla editorial para el kit, no una afirmación sobre cada medida del código.
- No estirar sprites ni alinear sus bordes visibles ignorando el ancla. El canvas y el punto de apoyo mantienen la continuidad entre frames.

## Imagen

Ilustración de personaje separada del logo. Preservar el pixel art; no sustituirlo por emojis, gatos de otro estilo o iconografía bancaria genérica. `image-rendering: pixelated` es apropiado para sprites; no para fotografías ni tipografía.

El damero del catálogo indica transparencia y no forma parte de los archivos. Los originales, previews y capturas se conservan byte a byte. Si un original tiene color de fondo, esta entrega no lo elimina automáticamente.

## Diferencias con los planes anteriores

- Los planes extensos incluyen exploraciones de paleta y geometría. La entrega usa la tabla extraída de `rebrand.css`, no una mezcla de versiones.
- Las instrucciones antiguas que hablan de modificar letras como “p”, “r”, “m” o un punto de “i” no describen el wordmark actual GatoPago; no se aplican.
- Las menciones públicas del nombre Meli en manifiestos anteriores no son copy vigente.
- Variantes monocromáticas, wordmark trazado, versiones de imprenta y piezas sociales eliminadas no se presentan como archivos finales si no están disponibles.
- Este manual organiza y aclara. No afirma que todos estos criterios estén ya implementados en todas las pantallas de la app.
