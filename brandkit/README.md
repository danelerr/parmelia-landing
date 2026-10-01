# GatoPago · Brandkit

Edición: 28 de septiembre de 2026. Estado: entrega local de identidad.
Revisión de cierre: 1 de octubre de 2026.
- Listos: logo, color, tipografía y manual.
- Para revisión: 14 ilustraciones y 20 animaciones del personaje, recortadas de los originales. [Abrir galería](./03-personaje/galeria.html). No son arte final aprobado.

**Empieza por [el catálogo visual](./index.html).** Ábrelo en un navegador: funciona sin conexión y carga las fuentes locales.

La marca pública es **GatoPago**. El kit organiza la identidad vigente con los dominios `gatopago.com` y `app.gatopago.com`, y no despliega nada.

## Encuentra lo que necesitas

| Carpeta | Contenido | Para qué usarla |
|---|---|---|
| [01-manual](./01-manual/identidad-y-voz.md) | Identidad y voz, sistema visual, componentes y movimiento, la marca en la app, entrega y mantenimiento | Diseñar y escribir con criterio consistente |
| [02-logos](./02-logos/README.md) | Símbolo en pixel art (SVG y PNG, versión de 16 px, mapas editables), favicons e iconos PWA de la app | Firma de marca e identidad de instalación |
| [03-personaje](./03-personaje/README.md) | Galería descargable, 14 PNG, 20 WebP, 147 fotogramas completos, hojas y versiones HD | Revisar y descargar las propuestas |
| [04-tipografia](./04-tipografia/README.md) | Recursive Variable: 4 WOFF2, CSS y licencia | Tipografía web local |
| [05-colores](./05-colores/README.md) | HEX, RGB, CSS, JSON, CSV, GPL, contraste y tokens de la app | Diseño e implementación |
| [06-originales](./06-originales/README.md) | Ilustraciones originales, sin alteraciones | Referencia del diseño del gato |
| [07-referencias](./07-referencias/README.md) | Narrativa, planes extensos y snapshots del código | Contexto y trazabilidad |
| [08-imagenes](./08-imagenes/README.md) | Avatar SVG sobre Milk, PNG de 180 a 2160 px e imagen Open Graph | Perfiles de redes y comunicación de marca |
| `descartado/` | Trabajo retirado: la mascota en pixel art de septiembre de 2026 | Solo consulta interna; no se entrega |

## Manual de lectura rápida

1. [Identidad y voz](./01-manual/identidad-y-voz.md): qué representa la marca y cómo habla.
2. [Sistema visual](./01-manual/sistema-visual.md): logo, color, tipografía y composición.
3. [Movimiento y componentes](./01-manual/movimiento-y-componentes.md): reglas de experiencia.
4. [Producto: la marca dentro de la app](./01-manual/producto-app.md): tokens, componentes y desajustes de la app web.
5. [Entrega y mantenimiento](./01-manual/entrega-y-mantenimiento.md): procedencia, derechos y actualización.

## Qué tiene autoridad aquí

- **Archivos entregados y valores visuales observados:** este manual y el inventario de esta edición.
  - La paleta es la de `src/styles/rebrand.css` de la landing.
  - Lo que implementa la app está en [producto](./01-manual/producto-app.md) y en `05-colores/tokens-app.json`, como snapshot del 2026-09-28.
- **Narrativa y estrategia:** el índice editorial de `documentacion/` en la landing. Las copias de `07-referencias/` son contexto fechado.
- **Capacidades y disponibilidad del producto:** el código, la configuración y la evidencia vigente de la app. Ningún plan de marca acredita que una funcionalidad esté desplegada.

## Antes de entregar a otra persona

Para regenerar desde este repositorio: `npm ci`, `npm run brandkit:build` y `npm run brandkit:verify`. No hace falta el repositorio de la app.

Para entregar: `npm run brandkit:zip`. El ZIP deja fuera `descartado/`, incluye las propuestas del personaje identificadas como tales y contiene su propio inventario.

- Comparte el ZIP completo: mover solo `index.html` rompe las rutas de imágenes y fuentes.
- [CONTROL-DE-CALIDAD.md](./CONTROL-DE-CALIDAD.md) explica el alcance de la verificación.
- [manifest.json](./manifest.json) registra archivo, procedencia, peso, SHA-256 y metadatos de imágenes.
- La licencia OFL cubre la fuente, no el logo ni los dibujos. Este kit no concede una licencia pública de reutilización de la marca.
- No se incluyen contratos privados, credenciales ni los assets sociales eliminados del repositorio.
