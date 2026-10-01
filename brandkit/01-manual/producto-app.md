# Producto: la marca dentro de la app

Snapshot del 28 de septiembre de 2026 de la app web de GatoPago:
- repositorio `parmelia-links`, paquete `apps/web`, commit `2257fa6`;
- Next.js 16 con Tailwind 4;
- fuentes: `src/consumer/theme.css` (tokens) y `src/consumer/consumer.css` (componentes).

Esta página describe lo que la app **ya implementa** y cómo encaja con el kit. Los valores se leyeron del código y los contrastes se calcularon con la fórmula WCAG 2.x. Las pantallas con cuenta no se revisaron en vivo, porque necesitan sesión real; se documentan desde el código.

## Principio

La app vive en **Milk y Paper**; **Ink** enmarca y da contraste. El dinero va en tarjetas Ink. Todo es recto: esquinas a 0, sombras sólidas desplazadas y bordes definidos. La personalidad está en el gato, en los acentos Cat Fire y en los tres registros de Recursive.

La landing es oscura y la app es clara: son dos superficies de la misma marca, no dos marcas.

## Color de producto

| Rol | Token de la app | HEX | Contraste sobre Milk |
|---|---|---|---:|
| Lienzo | `canvas` / `paper` | #FFF8F0 | — |
| Superficie | `surface` / `canvas-raised` / `paper-2` | #FFFDF9 | — |
| Capa suave | `surface-2` (Oat) | #EEE4D8 | — |
| Capa hundida | `surface-3` | #E4D7CA | — |
| Borde suave | `border` | #D2C5B9 | 1,60:1 |
| Borde fuerte y texto | `border-strong` / `text` (Ink) | #0B0B0F | 18,65:1 |
| Texto secundario | `text-muted` | #5F5650 | 6,80:1 |
| Texto terciario | `text-faint` | #6F625B | 5,58:1 |
| Tinte de acento | `cat-50` | #FFF0EB | — |
| Cat Shadow | `cat-300` | #CF3433 | — |
| Cat Fire | `cat-500` | #F85239 | 3,19:1 (no apto como texto) |
| Cat Deep | `cat-700` | #9F292E | 7,04:1 |
| Rojo más profundo | `cat-900` | #601F16 | — |
| Texto sobre Cat Fire | `on-cat` (Ink) | #0B0B0F | 5,85:1 sobre Cat Fire |

Notas:
- Los enlaces y las etiquetas en rojo usan **Cat Deep**; Cat Fire nunca se usa como texto sobre claro.
- En la escala `cat-*`, el 300 es más oscuro que el 500. Los números no siguen la convención de claro a oscuro: hay que leerlos como nombres.

### Estados: dos juegos según el fondo

| Estado | Sobre claro (app) | Contraste sobre Milk | Sobre Ink (landing, tarjeta de saldo) |
|---|---|---:|---|
| Éxito | #287B55 | 4,92:1 | #71D5A1 (10,98:1 sobre Ink) |
| Información | #256AA8 | 5,38:1 | #79B9FF |
| Pendiente | #8A6200 | 5,21:1 | #F6C65B |
| Error | #B62E47 | 5,74:1 | #FF6B7A |

Los valores de [sistema visual](./sistema-visual.md#color) son los de fondo oscuro: sobre Milk no llegan al contraste mínimo (Growth #71D5A1 da 1,70:1). Sobre Milk o Paper se usan los de la columna «sobre claro». Un estado nunca va solo en color: lleva texto o icono.

## Tipografía

Recursive Variable en tres registros, definidos como `font-variation-settings`:

| Registro | Ajustes | Uso |
|---|---|---|
| Lineal | `MONO 0, CASL 0, CRSV .5` | Texto corrido (16 px, interlínea 1,55, tracking -0,01em) |
| Casual | `MONO 0, CASL 1, CRSV .5` | Títulos (peso 720, tracking -0,035em, interlínea 1,06), botones (760) y el nombre en el lockup |
| Mono | `MONO 1, CASL 0, CRSV .5` | Cifras, montos y etiquetas; con `tabular-nums slashed-zero` |

Tamaños en uso:

| Elemento | Tamaño |
|---|---|
| Título de pantalla | 28 px |
| Título de tarjeta | 17 px |
| Texto secundario | 12–13 px |
| Etiquetas en mayúsculas | 10–11 px, tracking 0,1–0,12em |
| Navegación inferior | 10 px |
| Chips | 9 px |

## Geometría y elevación

- **Radio 0 en todo el producto.** El CSS lo fuerza incluso sobre clases `rounded-*`. Solo son redondos los elementos marcados `token-icon` o `keep-round`, y las píldoras (999 px).
- **Bordes:** 2 px Ink en controles, campos, paneles fuertes y diálogos; 1 px `border` en superficies suaves.
- **Sombras sólidas, sin desenfoque:**

| Elemento | Sombra |
|---|---|
| Botón | 4 × 4 Cat Deep |
| Botón con hover | 6 × 6, desplazado -2 px |
| Botón pulsado | 0, desplazado 4 px |
| Paneles | 6 × 6 |
| Recibo | 8 × 8 |
| Diálogo | 12 × 12 Cat Deep |

- **Marca del marco:** en la esquina superior derecha, una pestaña de 44 × 6 Cat Fire con un segmento Cat Deep. Se repite en los paneles de finanzas y en el asa de las hojas inferiores.
- **Foco:** contorno de 3 px Cat Fire, separado 3 px. La selección de texto va en Cat Fire al 32 %.

## Movimiento

Curvas:
- entrada `cubic-bezier(.16, 1, .3, 1)`;
- salida `cubic-bezier(.4, 0, 1, 1)`;
- pulsación `cubic-bezier(.2, .8, .2, 1)`.

Duraciones: 140–180 ms en controles y 180 ms en transiciones de vista.

| Animación | Duración | Uso |
|---|---|---|
| `fade-up` | 260 ms | Entrada de contenido |
| `sheet-up` | 340 ms | Hojas inferiores |
| `pixel-in` | 260 ms | Aparición de bloques |
| `purr` | 680 ms | Confirmación con el gato |
| `packet` | 1850 ms, `steps(22)` | Paquete recorriendo el rail |
| `qr-scan` | 2,4 s | Línea del escáner |
| `skeleton-sweep` | 1,8 s | Carga |
| `meli-idle` | 5,2 s | Reposo del gato |

Con `prefers-reduced-motion`, todo se reduce a un fotograma y el paquete del rail queda quieto en el centro.

## Componentes implementados

| Clase | Qué es | Anatomía |
|---|---|---|
| `btn` + `btn-primary` / `btn-money` / `btn-gradient` | Acción principal (las tres variantes son iguales) | 48 px de alto, borde 2 px, Cat Fire con texto Ink, sombra 4 px Cat Deep |
| `btn-ghost` | Acción secundaria | Paper, borde Ink, sombra Oat |
| `btn-danger` | Acción destructiva | Danger con texto blanco, sombra #78162B |
| `btn-text` | Acción terciaria | 44 px, texto secundario, subrayado al pasar el cursor |
| `btn-sm`, `btn-block` | Tamaño compacto (42 px) y ancho completo | — |
| `meli-field` | Campo | 52 px, borde 2 px Ink, cursor de texto Cat Fire |
| `seg-track` / `seg-item` | Control segmentado | Segmento activo en Cat Fire con filete inferior Cat Deep |
| `meli-chip` | Chip de estado | Mono, mayúsculas, cuadrado de 6 px del color del estado |
| `dialog-backdrop` / `dialog-panel` | Diálogo | Velo Ink al 76 % con desenfoque; panel con sombra de 12 px |
| `sheet-handle` | Asa de hoja inferior | 56 × 8 Cat Fire con segmento Cat Deep |
| `meli-paper-card` / `--strong` | Tarjeta clara | Borde suave o borde Ink con sombra 6 px |
| `meli-ink-card` | Tarjeta oscura | Ink con texto Milk |
| `meli-balance-card-app` | Tarjeta de saldo | Ink, texto Milk, sombra Cat Fire, barra de crecimiento en #71D5A1 |
| `finance-panel` / `finance-inset` / `finance-section-label` / `finance-summary-row` | Resúmenes de dinero | Panel con pestaña, recuadro interior, etiqueta mono con cuadrado y filas de concepto e importe |
| `meli-path-card-app` | Opción de camino (enviar, cobrar…) | 112 px, icono sobre Ink, pasa a Cat Fire al pulsar |
| `meli-quick-grid` / `meli-quick-action` | Accesos rápidos | Cuadrícula de 4 columnas y 78 px de alto, icono sobre Cat Fire |
| `primary-nav` | Navegación inferior | Inicio, Mover, Crecer y Actividad; la activa en Cat Fire con sombra |
| `meli-app-header`, `meli-identity`, `meli-avatar` | Cabecera y cuenta | Avatar de 42 px |
| `meli-square-action`, `pwa-install-button` | Botones cuadrados de 42 px | Punto de 5 px en la esquina |
| `pixel-rail` | Progreso de un pago | Rail de guiones y paquete; estados `active`, `done` (Growth) y `future` |
| `skeleton` (+ `accent`, `ink`) | Carga | Geometría real con barrido |
| `receipt-paper` / `receipt-rail` | Comprobante | Papel Milk con sombra 8 px y ribete de tres rojos |
| `scan-line` | Escáner QR | Línea en degradado Cat Deep y Cat Shadow |
| `meli-kicker` | Antetítulo | Mono de 10 px en Cat Deep con cuadrado |

## Iconografía

Hoy no hay un juego de iconos. La app usa seis iconos de trazo, en retícula de 24 px, trazo de 2 px y extremos redondeados:
- Inicio, Mover, Crecer y Actividad, en la navegación;
- volver y avanzar.

Los extremos redondeados contradicen la geometría recta del producto. Un juego propio debe usar extremos y uniones rectos, o pixel art a la retícula del símbolo.

## La marca dentro de la app hoy

| Elemento | Lo que usa la app | Lo que define este kit |
|---|---|---|
| Favicon y `Logo_gatopago.svg` | El glifo anterior del gato (`CatGlyph`), sin contorno | [Símbolo y favicons actuales](../02-logos/README.md) |
| Lockup de la cabecera | El glifo en Ink sobre un cuadro Cat Fire | Símbolo tricolor a ×1 o ×2 junto al nombre |
| Iconos PWA (192/512) | La cabeza de la mascota | Pendiente de rehacer con el símbolo |
| Mascota (`packages/brand/meli`) | WebP de la edición anterior | Propuestas recortadas para revisión ([03-personaje](../03-personaje/README.md)); el arte final con retícula consistente sigue pendiente |

Resultado del snapshot: la app muestra distintas cabezas como firma de marca. Unificar favicon, lockup e iconos de instalación con el símbolo del kit. El personaje sigue siendo una ilustración separada para estados y acompañamiento.

## Desajustes verificados

1. **`warning` no existe.** `IntegrationNotice` usa `border-warning` y `bg-warning/10`, pero el tema no define `--color-warning`. Tailwind no genera esas clases y el aviso sale sin borde ni fondo en sus 19 usos. El estado que corresponde es Pending.
2. **Bordes suaves de 1,60:1.** En accesos rápidos, botones cuadrados y tarjetas suaves, el borde es la única pista de que el elemento es pulsable. Para límites de componentes se recomienda al menos 3:1.
3. **Textos de 9 y 10 px.** Chips, antetítulos y navegación quedan por debajo de un mínimo cómodo en móvil (11–12 px).
4. **Dos rojos de sombra.** Los tokens de sombra usan Cat Shadow (#CF3433), pero los componentes usan Cat Deep (#9F292E). `btn-danger` usa literales (`white`, `#78162B`).
5. **Mascota a escala no entera.** Los sprites llevan `max-width: 100%`, así que el píxel puede quedar irregular. El movimiento `meli-idle` sube 3 px, sin relación con el tamaño del píxel del sprite.
6. **Enlace de cobro de demostración sin estilo.** `/pay/demo-cafe-norte` se muestra como texto plano, sin cabecera ni marca.
7. **«Instalar app» en dos líneas** a 390 px de ancho, en la cabecera.
8. **Punto decorativo que parece una notificación.** El cuadrado Cat Fire de los botones cuadrados, por ejemplo en ajustes, se lee como aviso pendiente.
