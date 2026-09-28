# Control de calidad

Edición 2026-09-25 · Verificación local de archivos, personaje y catálogo. Repetida el 2026-09-26, tras añadir la [especificación del personaje](./03-mascota/ESPECIFICACION.md), retirar las propuestas de caminata que otras IA dejaron sin integrar y reproducir los 14 estáticos con el diseño original a doble resolución (especificación 2.0).

## Integridad de la entrega

Comando reproducible: `npm ci` y `npm run brandkit:verify`, desde la raíz de la landing. No depende de otro repositorio ni de archivos ignorados.

| Comprobación | Resultado |
|---|---|
| Archivos registrados en el inventario | 724, con tamaño y SHA-256 verificados |
| Comparaciones opcionales con las fuentes actuales (`--sources`) | 9, normalizando LF en snapshots de texto |
| Enlaces locales revisados | 829, sin destinos ausentes |
| Símbolo y favicons | Cada PNG (símbolo ×8, favicons 16/32/48, apple-touch ×4) coincide con su mapa; el ICO contiene esos tres PNG; el apple-touch-icon es opaco |
| Estáticos del personaje | 14, el diseño original a doble resolución: 8 cabezas en 64 × 64 y 6 poses en 96 × 96. Cada PNG ×1 es idéntico a su mapa; ×4 y ×8 son escalados exactos del ×1; todos tienen SVG. La versión oscura de cada uno es exactamente su borde Milk |
| Secuencias / frames | 20 / 166 |
| Lienzo / apoyo | 48 × 44 bloques (384 × 352 px a ×8) / (24, 42), iguales en todas las secuencias |
| Frames | Solo colores de la paleta, alfa 0 o 255; cada ×8 es escalado exacto de su ×1 |
| Tiempos | La suma de cada manifiesto coincide con su preview WebP, frame a frame |
| Píxeles opacos en el borde de los frames | 0 |
| Hojas originales de `06-originales` | Sus hashes coinciden con los del manifiesto de animación |

Además del inventario se entregan `manifest.json` y este registro: **726 archivos en total**. Esos dos no se incluyen en su propio inventario.

El ZIP generado con `brandkit:zip` excluye `03-mascota/qa/`: **640 archivos**, con 638 entradas en su propio inventario y perfil `delivery`. Se valida por sí solo tras la extracción.

## Personaje

`npm run brandkit:mascota` valida los mapas **antes** de escribir nada y, tras generar, aplica las reglas a cada frame. Resultado de esta edición: **0 fallos y 10 avisos** (`03-mascota/qa/informe.json`). Los avisos marcan, con coordenadas, franjas de pelaje de 1 celda que vienen del dibujo original: bordes de zarpas, uniones de mejilla y bigote, punta de la lengua. Se revisaron sobre el arte ampliado.

- **Especificación**: los estáticos siguen la [especificación del personaje](./03-mascota/ESPECIFICACION.md) (versión 2.0). Reproducen el diseño original de la IA 1 a doble resolución, con contorno de 2 celdas, y cada uno se comparó lado a lado con su original. También cumplen lienzo, márgenes y suelo. Las animaciones siguen siendo las de 2026-09-25, compuestas con las piezas de `animaciones/piezas-v1` y a la mitad de densidad; se regeneran byte a byte idénticas. Su rehecho está pendiente.
- **Mapas**: solo caracteres de la paleta, contorno de tinta cerrado y una sola figura por mapa. Los estáticos nuevos no tienen excepciones. La sombra bajo los guiones del rail, antes abierta, queda ahora dentro del contorno. La excepción se mantiene solo para la pieza antigua `piezas-v1/body-conveyor`.
- **Frames**: ninguno vacío ni fuera de la paleta; ninguno toca el borde del lienzo; el apoyo es común; ninguna duración baja de 50 ms; no hay frames consecutivos idénticos que la preview fusione.
- **Revisión visual**: cada estático se comparó con su original de la IA 1 en `03-mascota/qa/comparacion.html` y en la hoja `03-mascota/qa/estaticos-ia1-vs-nuevo.png`. Ambas se generan en el build a partir de recortes exactos de `06-originales`, guardados en `03-mascota/qa/ia1/`. Las animaciones se revisaron frame a frame con hojas de contacto (`03-mascota/qa/revision-*.png`) y se comparan con el material anterior de `03-mascota/qa/antes/` en la misma página.

Esta verificación garantiza consistencia técnica: el mismo modelo, la misma paleta y la misma cuadrícula. La aprobación artística de cada secuencia en su contexto de producto sigue siendo humana.

## Regresión del proceso de generación

`npm run brandkit:test`: once escenarios bajo una prueba principal (12 resultados, todos correctos):

- verificación aislada;
- original ausente sin sobrescritura;
- fallo posterior al preflight sin sobrescritura;
- build sin archivos ignorados;
- dos builds idénticos;
- fuentes CRLF/LF equivalentes;
- comparación opcional de fuentes;
- regeneración de la mascota byte a byte idéntica;
- rechazo de un mapa con el contorno abierto sin tocar el kit;
- ZIP sin QA validado tras extraer;
- fallo de empaquetado sin perder el ZIP anterior.

El estado de trabajo completo (archivos versionados y nuevos, sin `node_modules/`, `output/` ni archivos ignorados) se copió a una carpeta aislada. Allí se ejecutaron `npm ci`, verify, `brandkit:mascota`, build, verify con `--sources`, los tests y zip; todo pasó. El manifiesto (`8b2484af…`) y el ZIP coincidieron por SHA-256 con los del checkout de trabajo. El hash del ZIP no se anota aquí porque el ZIP contiene este registro. `astro check` dio 0 errores, 0 advertencias y 0 hints; la landing compiló sus ocho páginas.

`npm audit` sigue reportando 15 vulnerabilidades en dependencias (1 baja, 5 moderadas, 8 altas y 1 crítica), las mismas de la edición anterior. No se ejecutó `npm audit fix`; esta entrega no resuelve ni certifica la seguridad de esas dependencias.

## Catálogo en navegador

Revisado con Playwright sobre un servidor local en `127.0.0.1`; no se desplegó en internet.

- Anchos: escritorio 1440 × 1000, móvil 390 × 844 y 320 px. La revisión del 2026-09-26 encontró un desbordamiento en 320 px en la sección del logo; se corrigió reduciendo la muestra y la composición oscura en móvil, siempre a escalas enteras (×6 y ×2).
- Las 38 imágenes del catálogo se decodifican correctamente, sin imágenes rotas.
- Los sprites se muestran a escala entera y con un solo múltiplo por sección: estáticos a ×2 (×1 en la cuadrícula móvil de dos columnas) y frames a ×4 (×3 en móvil). La portada usa la versión con borde Milk, porque el gato va sobre fondo Cat Fire.
- Recursive se carga desde los archivos locales.
- Sin desbordamiento horizontal en los tres anchos.
- Sin errores ni advertencias de consola.
- Las cifras de portada (14 / 20 / 166) se calculan en el build, no están escritas a mano.
- Activar una segunda animación detiene la primera: solo hay una activa. «Detener animación» restaura las vistas estáticas.

Las capturas quedan en `output/playwright/brandkit-2026-09-25-*.png` del repositorio, fuera del paquete de distribución.

## Observaciones que no deben perderse

- **Material retirado**: la mascota anterior (estáticos WebP y 20 secuencias recortadas de hojas generadas con IA, con su QA y su procesador) ya no forma parte del kit y se puede recuperar desde Git. Las hojas originales siguen en `06-originales` como referencia.
- **Previews**: los WebP y GIF son bucles de revisión. `once` en el manifiesto expresa el uso previsto en producto.
- **Símbolo**: el de `02-logos/` es el reconstruido a partir de la cabeza original (30 × 23, más una versión de 16 × 16), junto con los favicons generados desde él. La landing sigue usando el símbolo anterior hasta que se migre. Los iconos PWA de `02-logos/pwa/` siguen siendo el snapshot de la app, pendiente de rehacer.
- **Originales**: se preservan byte a byte; no se recortan ni se modifica su transparencia.
- **Catálogo**: usa archivos locales y no necesita un servicio de fuentes, CDN ni conexión a la app. No se probó una instalación PWA.
- **Alcance**: esta verificación no es una auditoría de la app, de seguridad ni de disponibilidad comercial.
- **Landing y app**: no se modificó el repositorio de la app ni el código de la landing. La landing solo gana el script `brandkit:mascota` en `package.json`. La publicación en GitHub no configura DNS ni constituye un despliegue.
