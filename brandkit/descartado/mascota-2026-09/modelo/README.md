# Modelo del personaje

Edición 2026-09-26 · **Fuente canónica de todo el arte de la mascota.** Las reglas están en la [especificación del personaje](../ESPECIFICACION.md). La guía de lienzos se genera en [guias/](./guias/lienzos.svg).

El modelo es el gato que **diseñó la IA 1** en las hojas de [06-originales](../../06-originales/README.md). Aquí está reproducido como pixel art limpio a doble resolución: 1 celda es medio bloque del original y el contorno mide 2 celdas, como en el original.

Cada mapa es texto: un carácter por celda y una fila por línea. Los PNG y SVG de `03-mascota/estaticos` se generan a partir de estos mapas. Ningún PNG se edita a mano.

```text
..######..........     .  transparente
..######..........     #  tinta (contorno)
##oooooo####......     o  Cat Fire
##oossoooooo###...     s  Cat Shadow
```

| Archivo | Contenido |
|---|---|
| `estaticos/head-*.txt` | 8 cabezas en 64 × 64 |
| `estaticos/body-*.txt` | 6 poses en 96 × 96, con el suelo en la fila 92 |
| [paleta.json](./paleta.json) | Caracteres y colores permitidos |

## Paleta

| Carácter | Color | HEX | Uso |
|---|---|---|---|
| `#` | Ink | #0B0B0F | Contorno, ojos, boca, bigotes |
| `o` | Cat Fire | #F85239 | Pelaje |
| `s` | Cat Shadow | #CF3433 | Rayas, orejas internas, nariz, babero y sombras de mejilla |
| `d` | Cat Deep | #9F292E | Reservado; el modelo no lo usa |
| `w` | Milk | #FFF8F0 | Brillo de ojos, papel, QR y borde de la versión oscura |
| `c` | Crema tarjeta | #FCECDD | Cara de la tarjeta |
| `y` · `n` · `b` | Caja | #FAB23A · #DC7C17 · #93421A | Caja, sombra de caja, cinta |
| `g` | Rail | #434F68 | Rail y carrito |
| `p` | Lengua | #F0908A | Lengua |
| `e` · `i` · `l` | Growth · Info · Pending | #71D5A1 · #79B9FF · #F6C65B | Solo accesorios de animación |

La misma paleta está en `paleta.json` y, para editores de pixel art, en `paleta.gpl` (formato GIMP, lo abren Aseprite, LibreSprite, Piskel y GIMP). Ambos se generan en el build.

## Directivas

Las líneas que empiezan por `;` no son arte:

```text
; lienzo: cabeza               lienzo de la especificación: cabeza (64 × 64) o estatico (96 × 96)
; expresión: ... / pose: ...   descripción para personas
```

`npm run brandkit:mascota` comprueba cada mapa antes de generar nada:
- que solo use colores de la paleta y su contorno esté cerrado;
- que el lienzo, los márgenes y el suelo sean los de la especificación.

## Cómo se construyeron

Cada pieza parte de su original de la IA 1:
1. **Traza a doble resolución** sobre la hoja original, con una celda igual para todas las piezas, así que la densidad es idéntica.
2. **Limpieza.**
   - Contorno exterior uniforme de 2 celdas, reconstruido desde la silueta.
   - Los píxeles difuminados de la imagen de IA se reasignan según su contexto.
   - Agujeros y fragmentos sueltos, eliminados; rayas suavizadas en bandas.
3. **Simetría** en las cabezas frontales.
4. **Rasgos redibujados a mano** donde la traza los desdibujaba:
   - la cara del mensajero, en 3/4, y el ojo del carrito, de perfil;
   - los ojos con destello y la lengua de la emocionada;
   - el código QR.
5. **Comparación lado a lado** con el original a tamaño de uso.

**Piezas inclinadas** (`head-curious`, `body-peek-card`, `body-sleeping`; redibujadas el 2026-09-28). Girar píxeles deja bordes con peldaños irregulares, así que estas cabezas se construyen con formas:
1. La silueta de `head-neutral` es un polígono simétrico. Sus proporciones se ajustaron al original inclinado midiendo la coincidencia de siluetas.
2. Se gira atan(1/4) ≈ 14° (curiosa y durmiendo) o atan(1/2) ≈ 26,6° (tarjeta). Con esos ángulos, cada borde recto sale con peldaños constantes de 4:1 o de 2:1.
3. Las rayas y el interior de las orejas son las formas de sombra de `head-neutral`, vectorizadas y giradas con la silueta.
4. Después de rasterizar, el contorno de 2 celdas y los rasgos:
   - ojos rectos;
   - boca en mitades rígidas;
   - bigotes como pares de trazos paralelos.
   
   En la tarjeta y el durmiendo se conservan los ojos, la nariz y la boca que ya estaban medidos sobre el original.
5. En las poses, la cabeza es una capa: el cuerpo va detrás, y la tarjeta y las patas delanteras delante.

Las herramientas están en `scripts/mascota/lib/trazo.mjs` y sirven también para las animaciones:
- líneas con peldaño regular y de 2 celdas;
- relleno de polígonos y banda de contorno;
- simetría;
- detección de celdas sueltas, picos y muescas;
- vectorización de siluetas.

Coincidencia de silueta con el original (IoU, celda a celda) y antes → ahora:

| Pieza | Coincidencia | Defectos (sueltas / picos / muescas) |
|---|---|---|
| `head-curious` | 90 % → 96 % | 0 / 0 / 2 → 0 / 0 / 0 |
| `body-peek-card` | 97 % → 96 % | 1 / 0 / 0 → 0 / 0 / 0 |
| `body-sleeping` | 98 % → 94 % | 0 / 0 / 0 → 0 / 0 / 0 |

La tarjeta y el durmiendo pierden algo de coincidencia porque antes eran una traza directa, con los bordes irregulares del original; ahora la cabeza es la del modelo, limpia y simétrica.

El QR de `body-qr` es ilustrativo: tiene tres cuadros de posicionamiento, pero no se puede escanear.

Las piezas de la edición anterior (lienzo de 48 × 44, a la mitad de densidad) están en [animaciones/piezas-v1](../animaciones/piezas-v1/README.md). Solo las usan las animaciones actuales.

## Editar en un editor de pixel art

Los mapas se pueden retocar en Aseprite, LibreSprite, Piskel o cualquier editor que exporte PNG:

1. Abrir el PNG ×1 del estático (`../estaticos/1x/<nombre>.png`, que es exactamente el lienzo) y cargar la paleta `paleta.gpl`.
2. Editar solo con los colores de la paleta, con lápiz de 1 píxel y sin suavizado.
3. Exportar en PNG a ×1 o a cualquier escala entera, con el mismo nombre.
4. `npm run brandkit:importar -- ruta/<nombre>.png`. Con `--simular` solo informa. Con `--aproximar` acepta colores de la paleta ligeramente desplazados por el editor.

El importador comprueba que la imagen sea el lienzo a escala entera, que cada celda sea de un solo color de la paleta y que no haya semitransparencias. Después aplica al mapa resultante las mismas reglas que el build: contorno cerrado, una figura, márgenes y suelo. Si algo falla, explica qué y dónde, y el mapa no cambia. Si pasa, reescribe el mapa, conservando sus directivas `;`, e indica cuántas celdas cambiaron. La versión `-oscuro` no se edita: se genera.

## Actualizar

1. Editar el mapa en un editor de texto de ancho fijo, o importar un PNG retocado (sección anterior).
2. `npm run brandkit:mascota`: valida los mapas antes de escribir nada, regenera estáticos y animaciones y aplica el control de calidad (`../qa/informe.json`).
3. `npm run brandkit:build` y `npm run brandkit:verify`.
