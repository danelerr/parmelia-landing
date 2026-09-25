# Logos e iconos

Edición 2026-09-24 · Copias de archivos existentes, sin redibujar.

| Carpeta | Entrega | Uso |
|---|---|---|
| `simbolo/` | [gatopago.svg](./simbolo/gatopago.svg) | Cabeza vectorial principal, 64 × 64, tres colores, fondo transparente |
| `iconos-web/` | SVG, ICO, PNG 16/32/48 y Apple touch icon de la landing | Identidad del sitio, con formatos dedicados |
| `pwa/` | PNG 192/512, Apple touch icon y manifiesto de la app | Snapshot de instalación de la aplicación |

**No todos son intercambiables.** Un icono de instalación puede tener un fondo deliberado; no usarlo como si fuera el símbolo transparente. Conservar los archivos SVG para escalar sin pérdida.

La composición horizontal combina símbolo y texto vivo Recursive. Está representada en [el catálogo](../index.html#logo), con las especificaciones en [el sistema visual](../01-manual/sistema-visual.md). No se entrega como un wordmark vectorial trazado inexistente.

No recortar, estirar ni eliminar fondos automáticamente. Para fondos oscuros, comprobar la silueta Ink y preferir un contenedor claro cuando haga falta. Este kit no declara que el símbolo tricolor sea una versión inversa o monocromática.

El manifiesto PWA conserva sus rutas de aplicación: sirve de referencia y no debe instalarse desde esta carpeta. Los iconos no se han regenerado ni redeplegado.

`pwa/` es el snapshot canónico versionado para el kit. Solo se refresca desde la app cuando se indica explícitamente `--app-dir`; un build normal no necesita otro repositorio.
