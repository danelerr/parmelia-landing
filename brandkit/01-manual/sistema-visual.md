# Sistema visual

Edición 2026-09-25 · Valores observados en la landing y reglas de uso para el kit.

## Dirección

Pixel art cálido sobre una interfaz legible. Bloques, bordes definidos, sombras desplazadas y espacio suficiente. La personalidad vive en el gato, la tipografía y los acentos; no hace falta decorar cada control.

La [paleta entregada](../05-colores/README.md) se extrae del CSS existente. No se han elegido colores nuevos ni corregido las imágenes.

## Logo

Archivo principal: [gatopago.svg](../02-logos/simbolo/gatopago.svg). Es pixel art de 30 × 23 bloques en tres colores (Ink, Cat Fire y Cat Shadow), simétrico y sin fondo. Es la cabeza del personaje original reconstruida sobre su rejilla real, y sustituye al símbolo plano anterior, que se descartó. Su fuente editable son los mapas de [02-logos/modelo](../02-logos/README.md).

- **Escala entera**: 30 × 23, 60 × 46, 90 × 69, 120 × 92… A escalas no enteras los bloques quedan desiguales. El ×1,5 queda descartado: solo es exacto en pantallas 2×.
- **Tamaños pequeños**: por debajo de 30 px de ancho, usar la versión de 16 × 16 ([gatopago-16.svg](../02-logos/simbolo/gatopago-16.svg)) o los favicons dedicados. No reducir la versión completa.
- **Encuadre**: mantener proporciones y usar `object-fit: contain`, no `cover`. No cortar orejas, bigotes ni contorno.
- **Sin efectos**: no añadir resplandor, volumen, rotación ni expresiones al símbolo. Las expresiones pertenecen al personaje.
- **Área libre**: al menos 3 bloques (1/10 del ancho) alrededor del símbolo o del lockup.
- **Fondos oscuros**: el contorno Ink desaparece. Colocar el símbolo sobre un contenedor Milk; el símbolo tricolor no tiene versión inversa.

### Composición horizontal

El símbolo se compone con texto vivo **GatoPago**: Recursive Variable, `MONO 0`, `CASL 1`, `wght 760`, tracking `-0.045em` y separación de 10 px. En navegación, el símbolo va a ×1 (30 × 23 px) o ×2 (60 × 46 px), según la altura de la barra. El catálogo incluye la composición a tamaño de navegación y sobre fondo oscuro con contenedor Milk.

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

Estos cuatro estados son los de fondo oscuro. Sobre Milk o Paper, la app usa variantes oscuras con contraste AA (ver [producto](./producto-app.md#estados-dos-juegos-según-el-fondo)). Ink Soft y Ink Raised completan superficies oscuras en los archivos de tokens. No asignar colores al azar a cada producto. Priorizar fondos neutros, un acento dominante y estados semánticos puntuales.

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

El personaje tiene [propuestas de revisión](../03-personaje/galeria.html) recortadas de los originales. Conservan semitransparencias y variaciones de color: no son todavía pixel art de paleta cerrada. Los requisitos del arte final siguen en [03-personaje](../03-personaje/README.md): contorno de tinta continuo, retícula consistente y escalado solo por múltiplos enteros.

El damero del catálogo indica transparencia y no forma parte de los archivos. Los originales de `06-originales` se conservan byte a byte como referencia; si un original tiene color de fondo, esta entrega no lo elimina automáticamente.

## Diferencias con los planes anteriores

- Los planes extensos incluyen exploraciones de paleta y geometría. La entrega usa la tabla extraída de `rebrand.css`, no una mezcla de versiones.
- Las instrucciones antiguas que hablan de modificar letras como “p”, “r”, “m” o un punto de “i” no describen el wordmark actual GatoPago; no se aplican.
- Las menciones públicas del nombre Meli en manifiestos anteriores no son copy vigente.
- Variantes monocromáticas, wordmark trazado, versiones de imprenta y piezas sociales eliminadas no se presentan como archivos finales si no están disponibles.
- Este manual organiza y aclara. No afirma que todos estos criterios estén ya implementados en todas las pantallas de la app.
