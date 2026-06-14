# Parmelia — landing

Landing page de Parmelia. Astro + Tailwind v4, sin librerías JS de animación
(los reveals usan IntersectionObserver + CSS) y con imágenes optimizadas vía
`astro:assets`.

## Desarrollo

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/
```

## Idiomas (i18n)

- `/`    → español (idioma por defecto)
- `/en/` → inglés

El idioma se resuelve con `Astro.currentLocale` y cada componente toma su copy
de un objeto `{ es, en }`. El selector de idioma vive en el navbar.

## Analítica (opcional, privacy-friendly)

La analítica está **apagada por defecto**. Para activar Plausible, define la
variable de entorno antes de `build` (o en un archivo `.env`):

```sh
PUBLIC_PLAUSIBLE_DOMAIN=parmelia.me
```

Con eso se inyecta el script de Plausible y los clics en los CTA
(`data-cta="…"`) se reportan como evento `CTA click`. El tracker es
agnóstico: también dispara a Umami o gtag si estuvieran presentes.

Además, todos los CTA hacia `app.parmelia.me` llevan `?ref=landing_*` para
atribuir registros por sección desde la analítica de la propia app.

## Assets generados

- `scripts/make-og.ps1` → `public/og.png` (1200×630) y `public/apple-touch-icon.png`.
  Regenerar con: `pwsh scripts/make-og.ps1`.
