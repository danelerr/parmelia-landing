# Entrega, procedencia y mantenimiento

Edición 2026-09-24 · Paquete local, sin publicación.

## Fuentes

| Grupo | Origen |
|---|---|
| Símbolo y favicons | Landing: `public/` |
| Iconos PWA y manifiesto | App: `client/public/` |
| Ilustraciones estáticas | Landing: `src/assets/meli/` |
| Animaciones procesadas | Landing: `output/meli-animation-kit-2026-08-19/` |
| Dibujos originales | PNG entregados en la raíz de la landing |
| Fuente | Paquete instalado `@fontsource-variable/recursive` |
| Paleta, geometría y tipografía observadas | `src/styles/rebrand.css`, `global.css` y componentes de la landing |
| Narrativa y planes | `documentacion/nuevos/` de la landing |
| Imagen social | `public/og.png`; las capturas de la interfaz anterior fueron retiradas |

Las imágenes se copian sin alteraciones. El procesador de frames se conserva con una única adaptación de ruta para leer `06-originales/`; no se ha ejecutado para regenerar el arte en esta entrega.

## Derechos y distribución

- Recursive incluye su licencia SIL Open Font License 1.1 y metadatos de origen. Conservarla al redistribuir la fuente.
- La licencia tipográfica no cubre el logo, la mascota, las capturas ni el contenido de marca.
- No se asigna una licencia Creative Commons o comercial a los dibujos: este kit no acredita por sí solo la titularidad ni amplía permisos sobre el arte aportado.
- Antes de dar acceso público al paquete, revisar derechos y contexto de las capturas y documentos de referencia. Esta entrega es para trabajo y transferencia de marca, no una publicación automática.

## Inventario

`manifest.json` contiene un registro por archivo: ruta, peso, huella SHA-256 y procedencia. Para imágenes compatibles también registra formato, dimensiones, transparencia y páginas/frames.

El propio manifiesto y `CONTROL-DE-CALIDAD.md` quedan fuera del listado de hashes para evitar una autorreferencia y permitir registrar la verificación final. Los originales y las copias de uso se mantienen separados, aunque compartan contenido.

## Actualizar sin crear otra versión paralela

1. Cambiar primero la fuente correcta: documentación editorial en `documentacion/`, código visual en `src/`, arte aprobado en su carpeta de producción.
2. Actualizar las reglas del manual si cambió una decisión de marca.
3. Desde la raíz de la landing, ejecutar `node scripts/build-brandkit.mjs --app-dir <ruta-del-repositorio-de-la-app>`. Requiere las dependencias del proyecto. También acepta la variable `GATOPAGO_APP_DIR`; no supone un nombre ni una ubicación para el checkout de la app.
4. El script vuelve a copiar snapshots y generar catálogo, paleta e inventario. No cambia `src/`, `public/` ni la app. Sobrescribe los archivos generados de `brandkit/`; no usar esas copias como única fuente editable.
5. Ejecutar `node scripts/verify-brandkit.mjs --app-dir <ruta-del-repositorio-de-la-app>`, revisar visualmente el catálogo y actualizar el registro de calidad.
6. Si se retira un asset de la fuente, revisar expresamente su copia: el generador no borra archivos sobrantes. Aprobar el objetivo antes de eliminarlo.
7. Distribuir la carpeta completa o un ZIP de ella. No hace falta desplegar para consultar el catálogo.

El template editable del catálogo es `scripts/brandkit/catalogo.html`. Los manuales cortos dentro de `01-manual/` se editan directamente; no los sobreescribe el generador.

## Límites de esta edición

- No restaura los assets sociales borrados previamente en el árbol de trabajo.
- No inventa un wordmark trazado, logos monocromáticos o versiones CMYK/Pantone.
- Incluye fuentes WOFF2 para web, no una distribución TTF/OTF de escritorio.
- No prueba ejecución financiera, disponibilidad comercial ni instalación PWA.
- No migra ni elimina los documentos originales de los repositorios.
- No implementa el kit en pantallas ni corrige los dibujos: ordena lo existente y documenta las diferencias.
