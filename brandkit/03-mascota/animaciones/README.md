# Meli Animation Kit — entrega procesada

Fecha: 19 de agosto de 2026  
Estado: paquete de recursos únicamente; no integrado en la landing ni en la app.

Esta carpeta es la fuente oficial versionada de las animaciones procesadas. El build del kit la conserva y no lee una copia externa en `output/`. `qa/` y `tools/` son internos: permanecen en Git, pero `npm run brandkit:zip` los excluye del paquete de entrega.

## Resultado

- 20 animaciones.
- 152 frames finales.
- PNG RGBA individuales con fondo transparente.
- Lienzo común de `320 × 256 px`.
- Ancla lógica común en `x: 160`, `y: 244`.
- Spritesheet horizontal y grilla PNG por animación.
- Vista previa WebP lossless por animación.
- Manifiesto JSON general y manifiesto por animación.
- Láminas numeradas para revisión visual.

No se redimensionaron ni regeneraron los dibujos. Los píxeles visibles y el canal alfa provienen de las cinco láminas entregadas, salvo las correcciones deterministas descritas abajo.

## Correcciones realizadas

### Cola

La fila original contenía una segunda forma de cola en los frames 2–7. Se sustituyó por la secuencia sentada limpia incluida en la primera lámina. Sigue teniendo ocho frames y utiliza exclusivamente arte suministrado.

### Siesta

Se amplió el área de extracción para recuperar las `Z` completas. El último frame, cuya cabeza y orejas cambiaban de modelo, se reemplazó por el cierre neutral del ciclo.

### Asomarse

Se eliminó el residuo del rótulo. La secuencia se reordenó para que Meli aparezca, mire y vuelva a esconderse. Se descartaron el ojo blanco y la pose que rompía el modelo del personaje.

### Reparar rail

Meli desaparecía durante el frame de chispas. Ese momento combina los frames originales 8 y 9 para conservar a Meli observando la reparación, sin redibujarla.

### Swap

El glifo azul parecido al de una plataforma social se sustituyó por un símbolo de dólar pixelado y neutral. El bloque, sus colores, flechas y movimientos originales se conservaron.

## Estructura

```text
frames/<animacion>/frame-001.png
spritesheets/<animacion>-strip.png
spritesheets/<animacion>-grid.png
previews/<animacion>.webp
manifests/<animacion>.json
qa/<animacion>-numbered.png
qa/raw-problem-sequences/*.png
manifest.json
```

Las láminas ubicadas en `qa/raw-problem-sequences` muestran la separación anterior a las cinco correcciones. Sirven para comparar el material original con la entrega final.

## Animaciones

| ID | Frames | Reproducción |
|---|---:|---|
| parpadeo | 4 | loop |
| oreja | 4 | loop |
| ojos | 6 | loop |
| idle-sentada | 8 | loop |
| cola | 8 | loop |
| siesta | 8 | loop |
| asomarse | 8 | loop |
| meti-la-pata | 6 | una vez |
| salto-feliz | 8 | una vez |
| caminata | 6 | loop |
| preparando-pago | 8 | loop |
| comprobante | 8 | una vez |
| reparar-rail | 10 | una vez |
| swap | 10 | una vez |
| creciendo | 10 | loop |
| card | 8 | una vez |
| linterna | 8 | loop |
| saludo | 6 | una vez |
| mantenimiento | 10 | loop |
| seguridad | 8 | loop |

## Validación

El reporte `qa/edge-pixel-report.json` distingue dos casos:

- Contacto con el límite de una celda en las láminas originales. Esto ocurre porque algunos destellos, rails y haces fueron dibujados muy cerca entre sí.
- Contacto con el límite del lienzo final. La entrega debe registrar `0` en este segundo conteo; significa que ningún frame final quedó cortado por el lienzo normalizado.

El script reproducible está en `tools/process_meli_frames.py`. Solo escribe dentro de esta carpeta de entrega y no modifica los cinco originales ni archivos de la aplicación.
