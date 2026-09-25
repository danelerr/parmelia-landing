# Entrega, procedencia y mantenimiento

Edición 2026-09-24 · Fuentes versionadas y generación reproducible.

## Fuentes

| Grupo | Origen |
|---|---|
| Símbolo y favicons | Landing: `public/` |
| Iconos PWA y manifiesto | Fuente versionada: `brandkit/02-logos/pwa/`; actualización desde la app solo con `--app-dir` |
| Ilustraciones estáticas | Landing: `src/assets/meli/` |
| Animaciones procesadas | Fuente versionada: `brandkit/03-mascota/animaciones/` |
| Dibujos originales | Fuente única versionada: `brandkit/06-originales/`; sin duplicados en la raíz |
| Fuente tipográfica | Fuente versionada: `brandkit/04-tipografia/recursive/`, con licencia y versión de origen |
| Paleta, geometría y tipografía observadas | `src/styles/rebrand.css`, `global.css` y componentes de la landing |
| Narrativa y planes | `documentacion/nuevos/` de la landing |
| Imagen social | `public/og.png`; las capturas de la interfaz anterior fueron retiradas |

Estas cuatro carpetas del kit son fuentes oficiales, no copias descartables. Los manuales también se editan dentro de `brandkit/`. Los snapshots de CSS, componentes y planes sí se regeneran desde `src/` y `documentacion/`: no editarlos como única fuente.

Los PNG, WebP, JPG e ICO se conservan byte a byte. En los snapshots SVG solo se normalizan saltos de línea a LF, sin cambiar el dibujo. El procesador de frames lee `06-originales/` y permanece como herramienta opcional de producción; el build normal reutiliza los frames aprobados, sin ejecutar Python ni generar dibujos. No depende de ningún archivo en `output/`, de imágenes sueltas ni del checkout de la app.

## Derechos y distribución

- Recursive incluye su licencia SIL Open Font License 1.1 y metadatos de origen. Conservarla al redistribuir la fuente.
- La licencia tipográfica no cubre el logo, la mascota, las capturas ni el contenido de marca.
- No se asigna una licencia Creative Commons o comercial a los dibujos: este kit no acredita por sí solo la titularidad ni amplía permisos sobre el arte aportado.
- Antes de dar acceso público al paquete, revisar derechos y contexto de las capturas y documentos de referencia. Esta entrega es para trabajo y transferencia de marca, no una publicación automática.

## Inventario

`manifest.json` contiene un registro por archivo: ruta, peso, huella SHA-256 y procedencia. Para imágenes compatibles también registra formato, dimensiones, transparencia y páginas/frames.

El propio manifiesto y `CONTROL-DE-CALIDAD.md` quedan fuera del listado de hashes para evitar una autorreferencia y permitir registrar la verificación final. Los snapshots de texto generados normalizan saltos de línea a LF; los recursos canónicos se preservan. No se inserta la hora del build en el inventario: con las mismas fuentes, el resultado es idéntico. `.gitattributes` preserva los bytes del kit al clonar.

## Actualizar sin crear otra versión paralela

Desde un clon limpio, con Node compatible con `package.json`:

```sh
npm ci
npm run brandkit:verify
npm run brandkit:build
npm run brandkit:verify -- --sources
npm run brandkit:test
npm run brandkit:zip
```

`npm ci` instala las dependencias fijadas en el lockfile. Ignorar `node_modules/` es correcto; no se requiere versionarlo. La tipografía del kit se toma de su carpeta canónica, no del paquete instalado para la landing.

1. Editar la fuente indicada en la tabla; mantener la licencia al actualizar una fuente tipográfica.
2. Ejecutar el build. Primero comprueba entradas y rechaza enlaces simbólicos; después prepara y valida una copia temporal. Solo tras la validación sustituye el kit, con restauración del anterior si falla el intercambio. Un error de entrada o generación no sobrescribe el kit actual.
3. `brandkit:verify` comprueba inventario exacto, hashes, enlaces, fuentes locales, frames y tiempos sin consultar fuentes externas. También admite `--kit <carpeta>` para validar un paquete extraído fuera del checkout.
4. `brandkit:verify -- --sources` añade la comparación con `src/`, `public/` y `documentacion/`. Es opcional, no una dependencia del paquete entregado.
5. Para refrescar únicamente los iconos PWA desde otra app: `npm run brandkit:build -- --app-dir <ruta-app>`. Para compararlos sin modificarlos: `npm run brandkit:verify -- --app-dir <ruta-app>`. La variable ambiental antigua ya no controla el proceso.
6. Revisar y aprobar cualquier retirada de assets. El build no elimina recursos canónicos por considerarlos sobrantes.

No borres `brandkit/` para regenerarlo: contiene fuentes versionadas. Si falta un original, recupera el archivo correspondiente desde Git. Los tests cubren entradas ausentes, fallos posteriores al preflight, builds idénticos y la conservación del ZIP previo cuando falla una validación.

## ZIP de entrega

`npm run brandkit:zip` crea `output/gatopago-brandkit-2026-09-24.zip`, tras validar el kit. No empaqueta `03-mascota/animaciones/qa/` ni `03-mascota/animaciones/tools/`; por tanto, tampoco incluye `raw-problem-sequences/`. Esos recursos permanecen versionados para trabajo interno.

El ZIP tiene un manifiesto propio con `profile: delivery` y los hashes de sus archivos reales. Se valida antes de reemplazar el ZIP anterior y se genera con metadatos de fecha fijos. Puede abrirse sin conexión. El catálogo y sus assets siguen incluidos; los planes de referencia permanecen identificados como contexto, no como assets de producción.

El template editable del catálogo es `scripts/brandkit/catalogo.html`. Los manuales cortos dentro de `01-manual/` se editan directamente; no los sobreescribe el generador.

## Límites de esta edición

- No restaura los assets sociales borrados previamente en el árbol de trabajo.
- No inventa un wordmark trazado, logos monocromáticos o versiones CMYK/Pantone.
- Incluye fuentes WOFF2 para web, no una distribución TTF/OTF de escritorio.
- No prueba ejecución financiera, disponibilidad comercial ni instalación PWA.
- No elimina originales canónicos: los duplicados de la raíz se retiraron tras verificar sus hashes.
- No implementa el kit en pantallas ni corrige los dibujos: ordena lo existente y documenta las diferencias.
