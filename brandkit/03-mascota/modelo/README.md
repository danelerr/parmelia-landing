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
   - las caras inclinadas de la curiosa, la tarjeta y el durmiendo;
   - los ojos con destello y la lengua de la emocionada;
   - el código QR.
5. **Comparación lado a lado** con el original a tamaño de uso.

El QR de `body-qr` es ilustrativo: tiene tres cuadros de posicionamiento, pero no se puede escanear.

Las piezas de la edición anterior (lienzo de 48 × 44, a la mitad de densidad) están en [animaciones/piezas-v1](../animaciones/piezas-v1/README.md). Solo las usan las animaciones actuales.

## Actualizar

1. Editar el mapa en un editor de texto de ancho fijo.
2. `npm run brandkit:mascota`: valida los mapas antes de escribir nada, regenera estáticos y animaciones y aplica el control de calidad (`../qa/informe.json`).
3. `npm run brandkit:build` y `npm run brandkit:verify`.
