# Propuesta de mejoras de marca en la app

**Estado:** propuesta; nada de esto está aplicado.
**Fecha:** 28 de septiembre de 2026.
**Revisado:**
- repositorio `parmelia-links`, paquete `apps/web`, commit `2257fa6`, sin modificarlo;
- pantallas públicas en local, en el modo de desarrollo documentado (`GATOPAGO_LOCAL_AUTH=1`);
- pantallas con cuenta (saldo, movimientos, recibos), solo desde el código.

**Referencia:** el sistema tal como está implementado se documenta en [brandkit/01-manual/producto-app.md](../../brandkit/01-manual/producto-app.md) y en `brandkit/05-colores/tokens-app.json`.

## Correcciones

| # | Problema | Dónde | Propuesta | Esfuerzo |
|---|---|---|---|---|
| 1 | La app usa tres gatos distintos como marca: el glifo antiguo (favicon y logo), ese glifo en Ink sobre un cuadro Cat Fire (cabecera) y la cabeza de la mascota (iconos PWA). Ninguno es el símbolo vigente | `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `Logo_gatopago.svg`, `src/marketing/CatGlyph.tsx`, `public/pwa/meli-192/512`, `.meli-avatar` | Sustituir los tres por el símbolo del kit (`brandkit/02-logos`). Cabecera: símbolo a ×1 (30 × 23) o ×2 junto a «GatoPago». Rehacer los iconos PWA con el símbolo, con zona segura *maskable* | Medio |
| 2 | El aviso «operación no conectada» usa `border-warning` y `bg-warning/10`, pero `--color-warning` no existe. Tailwind no genera esas clases y el aviso sale sin borde ni fondo en sus 19 usos | `src/consumer/Primitives.tsx` (`IntegrationNotice`), `src/consumer/theme.css` | Usar `pending`, o definir `--color-warning: var(--color-pending)` | Bajo |
| 3 | La mascota es la versión anterior en WebP, y se escala a tamaños no enteros (`max-width: 100%`), así que el píxel queda irregular | `packages/brand/meli/*.webp`, `.meli-sprite` | Sustituirla por la versión nueva del personaje cuando esté aprobada (`brandkit/03-personaje`), a tamaño entero. El movimiento `meli-idle` debe subir en múltiplos del píxel del sprite, no 3 px | Medio |
| 4 | El enlace de cobro de demostración se ve como texto plano, sin cabecera ni marca, y es una página pública | `/pay/demo-cafe-norte` | Darle la cabecera de la app y un recibo (`receipt-paper`) con el aviso de demostración | Bajo |
| 5 | «Instalar app» se parte en dos líneas a 390 px | Cabecera, `pwa-install-button` | Una línea («Instalar») o solo el icono con etiqueta accesible | Bajo |
| 6 | El cuadrado decorativo de los botones cuadrados (5 px Cat Fire) parece una notificación sin leer | `.meli-square-action::after`, `.pwa-install-button::after` | Quitarlo o reservarlo para avisos reales | Bajo |

## Mejoras de sistema

| # | Mejora | Detalle | Esfuerzo |
|---|---|---|---|
| 7 | Bordes suaves visibles | `border` #D2C5B9 da 1,60:1 sobre Milk, y en accesos rápidos y tarjetas es la única señal de que se pueden pulsar. `#968A80` da 3,19:1 (3,31:1 sobre Paper) y mantiene el tono cálido. Otra opción: borde Ink de 2 px en todo lo pulsable | Bajo |
| 8 | Texto mínimo de 11–12 px | Hoy: chips a 9 px; navegación, antetítulos y accesos rápidos a 10 px | Bajo |
| 9 | Una sola sombra roja | Los tokens de sombra usan Cat Shadow (#CF3433) y los componentes Cat Deep (#9F292E). Hay que elegir uno, definirlo como token y quitar los literales (`white`, `#78162B`) de `btn-danger` | Bajo |
| 10 | Juego de iconos propio | Hoy hay 6 iconos de trazo con extremos redondeados, que chocan con la geometría recta. Hacen falta unos 16: inicio, mover, crecer, actividad, enviar, recibir, cobrar, escanear, QR, copiar, compartir, seguridad, perfil, ajustes, volver y cerrar. Con extremos y uniones rectos en retícula de 24, o en pixel art. Se entregarían primero en el kit | Medio |
| 11 | Nombres de la escala roja | `cat-300` es más oscuro que `cat-500`. Mejor nombrar por rol: `cat-fire`, `cat-shadow`, `cat-deep` | Bajo |
| 12 | Colores de estado por fondo | Formalizar dos juegos: sobre claro (#287B55, #256AA8, #8A6200, #B62E47) y sobre Ink (#71D5A1, #79B9FF, #F6C65B, #FF6B7A). Ya documentado en el kit | Bajo |
| 13 | Limpieza | Doble flecha en `ActionCard` (SVG y «→»). `.consumer-ui` declarado tres veces con propiedades repetidas | Bajo |
| 14 | Tema oscuro | No existe. Decidir si la app lo necesita; la tarjeta de saldo ya es Ink | Por decidir |

## Orden sugerido

1. Correcciones 2, 5 y 6 (rápidas) y mejoras 7, 8 y 9 (tokens y CSS).
2. Marca unificada (1): primero preparar en el kit los iconos PWA con el símbolo.
3. Mascota (3) y enlace de demostración (4).
4. Juego de iconos (10), primero en el kit.

## Pendiente de revisar

Las pantallas con sesión (saldo, movimientos, envío, recibos) necesitan una cuenta real o el emulador de autenticación con Wallet Core. Conviene revisarlas en vivo antes de cerrar la propuesta.
