# Recursive Variable

Edición 2026-09-24 · Familia tipográfica comprobada en la landing.

Una sola familia, con tres registros: **Linear** para lectura, **Casual** para personalidad y **Mono** para datos. No se añaden Hub 191 Rounded, Bricolage u otras fuentes exploradas anteriormente.

`recursive/` es la fuente canónica versionada para este kit. Los metadatos documentan su origen Fontsource; el generador no necesita leer `node_modules/@fontsource-variable/recursive`. Cualquier actualización de estos archivos y su licencia debe ser explícita y seguida de build y verificación.

## Archivos

- `recursive/files/`: cuatro WOFF2 variables para latin, latin-ext, vietnamese y cyrillic-ext.
- [recursive/full.css](./recursive/full.css): declaraciones `@font-face` originales, con rangos Unicode y ejes completos.
- [uso.css](./uso.css): importa la familia y ofrece `.gp-linear`, `.gp-casual` y `.gp-mono`.
- [LICENSE.txt](./recursive/LICENSE.txt): SIL Open Font License 1.1, con atribución original.
- `metadata.json` y `package.json`: metadatos y versión exacta del paquete copiado.

Son fuentes **web**. No se incluyen archivos TTF/OTF ni se afirma compatibilidad de instalación de estos WOFF2 en aplicaciones de escritorio.

## Ejes disponibles

| Eje | Rango | Control |
|---|---|---|
| `wght` | 300–1000 | Peso |
| `MONO` | 0–1 | Proporcional a monoespaciado |
| `CASL` | 0–1 | Linear a Casual |
| `slnt` | -15–0 | Inclinación |
| `CRSV` | 0–1 | Comportamiento de formas cursivas |

Las clases de `uso.css` no fijan `wght`, para permitir usar `font-weight`. Si se añade `wght` a `font-variation-settings`, ese valor explícito manda: no mezclar ambos sin intención.

```css
@import url('./04-tipografia/uso.css');

.texto {
  font-family: 'Recursive Variable', sans-serif;
  font-weight: 450;
  font-variation-settings: 'MONO' 0, 'CASL' 0;
  line-height: 1.6;
}
.importe {
  font-family: 'Recursive Variable', monospace;
  font-variation-settings: 'MONO' 1, 'CASL' 0;
  font-variant-numeric: tabular-nums;
}
```

Los valores específicos del wordmark, títulos y botones están en [sistema visual](../01-manual/sistema-visual.md). No usar titulares muy apretados para explicar riesgos, comisiones o instrucciones.
