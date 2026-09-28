# Catálogo del personaje

Nombre interno: Meli. El nombre público es GatoPago. Las expresiones no son variantes del logo.

Pixel art sobre cuadrícula real: cada bloque es un píxel del mapa en [modelo](./modelo/README.md). Los estáticos siguen la [especificación del personaje](./ESPECIFICACION.md): el diseño original de la IA 1 a doble resolución, con cabezas en 64 × 64 y poses en 96 × 96. PNG ×1, ×4 y ×8, SVG y la versión para fondos oscuros (borde Milk) se generan a partir de los mapas con `npm run brandkit:mascota`.

## Estáticos

| Pieza | Uso | Bloques | Archivos | Fondo oscuro |
|---|---|---:|---|---|
| body-conveyor | Procesamiento | 96 × 96 | [×1](./estaticos/1x/body-conveyor.png) · [×4](./estaticos/4x/body-conveyor.png) · [×8](./estaticos/body-conveyor.png) · [SVG](./estaticos/svg/body-conveyor.svg) · [mapa](./modelo/estaticos/body-conveyor.txt) | [×4](./estaticos/4x/body-conveyor-oscuro.png) · [SVG](./estaticos/svg/body-conveyor-oscuro.svg) |
| body-courier | Envío y movimiento | 96 × 96 | [×1](./estaticos/1x/body-courier.png) · [×4](./estaticos/4x/body-courier.png) · [×8](./estaticos/body-courier.png) · [SVG](./estaticos/svg/body-courier.svg) · [mapa](./modelo/estaticos/body-courier.txt) | [×4](./estaticos/4x/body-courier-oscuro.png) · [SVG](./estaticos/svg/body-courier-oscuro.svg) |
| body-peek-card | Tarjeta conceptual | 96 × 96 | [×1](./estaticos/1x/body-peek-card.png) · [×4](./estaticos/4x/body-peek-card.png) · [×8](./estaticos/body-peek-card.png) · [SVG](./estaticos/svg/body-peek-card.svg) · [mapa](./modelo/estaticos/body-peek-card.txt) | [×4](./estaticos/4x/body-peek-card-oscuro.png) · [SVG](./estaticos/svg/body-peek-card-oscuro.svg) |
| body-qr | Cobro y recepción; QR ilustrativo | 96 × 96 | [×1](./estaticos/1x/body-qr.png) · [×4](./estaticos/4x/body-qr.png) · [×8](./estaticos/body-qr.png) · [SVG](./estaticos/svg/body-qr.svg) · [mapa](./modelo/estaticos/body-qr.txt) | [×4](./estaticos/4x/body-qr-oscuro.png) · [SVG](./estaticos/svg/body-qr-oscuro.svg) |
| body-sitting | Bienvenida y estados vacíos | 96 × 96 | [×1](./estaticos/1x/body-sitting.png) · [×4](./estaticos/4x/body-sitting.png) · [×8](./estaticos/body-sitting.png) · [SVG](./estaticos/svg/body-sitting.svg) · [mapa](./modelo/estaticos/body-sitting.txt) | [×4](./estaticos/4x/body-sitting-oscuro.png) · [SVG](./estaticos/svg/body-sitting-oscuro.svg) |
| body-sleeping | Inactividad | 96 × 96 | [×1](./estaticos/1x/body-sleeping.png) · [×4](./estaticos/4x/body-sleeping.png) · [×8](./estaticos/body-sleeping.png) · [SVG](./estaticos/svg/body-sleeping.svg) · [mapa](./modelo/estaticos/body-sleeping.txt) | [×4](./estaticos/4x/body-sleeping-oscuro.png) · [SVG](./estaticos/svg/body-sleeping-oscuro.svg) |
| head-cautious | Advertencia recuperable | 64 × 64 | [×1](./estaticos/1x/head-cautious.png) · [×4](./estaticos/4x/head-cautious.png) · [×8](./estaticos/head-cautious.png) · [SVG](./estaticos/svg/head-cautious.svg) · [mapa](./modelo/estaticos/head-cautious.txt) | [×4](./estaticos/4x/head-cautious-oscuro.png) · [SVG](./estaticos/svg/head-cautious-oscuro.svg) |
| head-curious | Ayuda y exploración | 64 × 64 | [×1](./estaticos/1x/head-curious.png) · [×4](./estaticos/4x/head-curious.png) · [×8](./estaticos/head-curious.png) · [SVG](./estaticos/svg/head-curious.svg) · [mapa](./modelo/estaticos/head-curious.txt) | [×4](./estaticos/4x/head-curious-oscuro.png) · [SVG](./estaticos/svg/head-curious-oscuro.svg) |
| head-excited | Celebración breve | 64 × 64 | [×1](./estaticos/1x/head-excited.png) · [×4](./estaticos/4x/head-excited.png) · [×8](./estaticos/head-excited.png) · [SVG](./estaticos/svg/head-excited.svg) · [mapa](./modelo/estaticos/head-excited.txt) | [×4](./estaticos/4x/head-excited-oscuro.png) · [SVG](./estaticos/svg/head-excited-oscuro.svg) |
| head-focused | Atención y verificación | 64 × 64 | [×1](./estaticos/1x/head-focused.png) · [×4](./estaticos/4x/head-focused.png) · [×8](./estaticos/head-focused.png) · [SVG](./estaticos/svg/head-focused.svg) · [mapa](./modelo/estaticos/head-focused.txt) | [×4](./estaticos/4x/head-focused-oscuro.png) · [SVG](./estaticos/svg/head-focused-oscuro.svg) |
| head-happy | Éxito discreto | 64 × 64 | [×1](./estaticos/1x/head-happy.png) · [×4](./estaticos/4x/head-happy.png) · [×8](./estaticos/head-happy.png) · [SVG](./estaticos/svg/head-happy.svg) · [mapa](./modelo/estaticos/head-happy.txt) | [×4](./estaticos/4x/head-happy-oscuro.png) · [SVG](./estaticos/svg/head-happy-oscuro.svg) |
| head-neutral | Referencia de expresión neutral | 64 × 64 | [×1](./estaticos/1x/head-neutral.png) · [×4](./estaticos/4x/head-neutral.png) · [×8](./estaticos/head-neutral.png) · [SVG](./estaticos/svg/head-neutral.svg) · [mapa](./modelo/estaticos/head-neutral.txt) | [×4](./estaticos/4x/head-neutral-oscuro.png) · [SVG](./estaticos/svg/head-neutral-oscuro.svg) |
| head-peek | Descubrimiento | 64 × 64 | [×1](./estaticos/1x/head-peek.png) · [×4](./estaticos/4x/head-peek.png) · [×8](./estaticos/head-peek.png) · [SVG](./estaticos/svg/head-peek.svg) · [mapa](./modelo/estaticos/head-peek.txt) | [×4](./estaticos/4x/head-peek-oscuro.png) · [SVG](./estaticos/svg/head-peek-oscuro.svg) |
| head-sleepy | Espera tranquila | 64 × 64 | [×1](./estaticos/1x/head-sleepy.png) · [×4](./estaticos/4x/head-sleepy.png) · [×8](./estaticos/head-sleepy.png) · [SVG](./estaticos/svg/head-sleepy.svg) · [mapa](./modelo/estaticos/head-sleepy.txt) | [×4](./estaticos/4x/head-sleepy-oscuro.png) · [SVG](./estaticos/svg/head-sleepy-oscuro.svg) |

## Animación

20 secuencias · 166 frames · lienzo 48 × 44 bloques (384 × 352 px a ×8) · apoyo común en (24, 42). No implica que estén integradas en la app.

| Ciclo | Uso | Frames | Duración | Reproducción |
|---|---|---:|---:|---|
| [Asomarse](./animaciones/previews/asomarse.webp) | Descubrimiento; algo nuevo por ver | 11 | 2540 ms | bucle |
| [Caminata](./animaciones/previews/caminata.webp) | Envío en curso; no indica llegada | 8 | 760 ms | bucle |
| [Tarjeta](./animaciones/previews/card.webp) | Tarjeta conceptual; no acredita disponibilidad | 10 | 1500 ms | una vez |
| [Cola](./animaciones/previews/cola.webp) | Reposo con más presencia; espera amable | 8 | 920 ms | bucle |
| [Comprobante](./animaciones/previews/comprobante.webp) | Resultado verificado; mostrar solo con confirmación | 9 | 1750 ms | una vez |
| [Creciendo](./animaciones/previews/creciendo.webp) | Progreso o ahorro; no anuncia rentabilidad | 10 | 2580 ms | bucle |
| [Sentada](./animaciones/previews/idle-sentada.webp) | Bienvenida y estados vacíos | 8 | 3280 ms | bucle |
| [Linterna](./animaciones/previews/linterna.webp) | Búsqueda o revisión; no es sello de auditoría | 6 | 1020 ms | bucle |
| [Mantenimiento](./animaciones/previews/mantenimiento.webp) | Servicio en mantenimiento; pantalla de excepción | 4 | 760 ms | bucle |
| [Metí la pata](./animaciones/previews/meti-la-pata.webp) | Error recuperable; acompaña un texto claro | 8 | 1470 ms | una vez |
| [Mirar alrededor](./animaciones/previews/ojos.webp) | Descubrimiento; invita a explorar | 10 | 3910 ms | bucle |
| [Oreja](./animaciones/previews/oreja.webp) | Reposo; reacción mínima a una notificación | 6 | 2590 ms | bucle |
| [Parpadeo](./animaciones/previews/parpadeo.webp) | Reposo; señal de vida sin distraer | 8 | 3260 ms | bucle |
| [Preparando pago](./animaciones/previews/preparando-pago.webp) | Procesamiento; no indica que el pago llegó | 6 | 660 ms | bucle |
| [Reparar rail](./animaciones/previews/reparar-rail.webp) | Error recuperable en reparación; texto claro primero | 7 | 1340 ms | una vez |
| [Salto feliz](./animaciones/previews/salto-feliz.webp) | Éxito confirmado; una sola vez | 10 | 1130 ms | una vez |
| [Saludo](./animaciones/previews/saludo.webp) | Bienvenida; primer contacto | 7 | 1320 ms | una vez |
| [Seguridad](./animaciones/previews/seguridad.webp) | Seguridad de la cuenta; ilustración, no garantía | 9 | 1950 ms | bucle |
| [Siesta](./animaciones/previews/siesta.webp) | Inactividad o espera larga sin operación en curso | 8 | 3040 ms | bucle |
| [Cambio](./animaciones/previews/swap.webp) | Cambio de activo completado; usar con el estado real | 13 | 1590 ms | una vez |

Cada manifiesto define tiempos por frame, apoyo y rutas. No reproducir con un FPS fijo. Las previews repiten en bucle para revisión aunque el uso previsto sea «una vez». La carpeta `qa/` (solo en el repositorio; no viaja en el ZIP de entrega) contiene hojas de revisión y la comparación con el material anterior; no son assets de producto.
