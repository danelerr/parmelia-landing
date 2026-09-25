# GatoPago — landing

Landing page de GatoPago. Astro + Tailwind v4, sin librerías JS de animación
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
PUBLIC_PLAUSIBLE_DOMAIN=gatopago.com
```

Con eso se inyecta el script de Plausible y los clics en los CTA
(`data-cta="…"`) se reportan como evento `CTA click`. El tracker es
agnóstico: también dispara a Umami o gtag si estuvieran presentes.

Además, todos los CTA hacia `app.gatopago.com` llevan `?ref=landing_*` para
atribuir registros por sección desde la analítica de la propia app.

## Dominios y servicios

La landing usa `https://gatopago.com` y los accesos a la app usan `https://app.gatopago.com`. La configuración pública está en `src/config/brand.ts`; `.env.example` enumera las variables disponibles.

API, dashboard de desarrolladores y cuenta de X no tienen una dirección asumida: los enlaces opcionales solo aparecen al configurar `PUBLIC_API_URL`, `PUBLIC_DASHBOARD_URL` y `PUBLIC_SOCIAL_URL`, según corresponda. Los ejemplos de API usan `$GATOPAGO_API_URL`, que debe configurarse con el endpoint entregado para la integración.

Los correos pasan a `hola@gatopago.com` y `privacy@gatopago.com`. Este cambio local no configura DNS, correo, hosting ni servicios. Antes de publicar, comprobar destinos y variables del entorno de despliegue.

## Assets generados

### Brandkit reproducible

```sh
npm ci
npm run brandkit:build
npm run brandkit:verify
npm run brandkit:test
npm run brandkit:zip
```

Las fuentes canónicas están versionadas dentro de `brandkit/`: no se requieren archivos ignorados ni otro repositorio. No borres el kit para regenerarlo. El build prepara y valida una copia temporal antes de sustituir el resultado; el ZIP de `output/` excluye QA y herramientas internas.

Ver [fuentes y mantenimiento](./brandkit/01-manual/entrega-y-mantenimiento.md). La comparación adicional con fuentes actuales usa `npm run brandkit:verify -- --sources`; la app solo interviene si se proporciona explícitamente `--app-dir`.

### Imágenes sociales

- `scripts/make-og.ps1` → `public/og.png` (1200×630) y `public/apple-touch-icon.png`.
  Regenerar con: `pwsh scripts/make-og.ps1`.
