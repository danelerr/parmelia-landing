# Entrega al frontend unificado

Paquete local: `@gatopago/brand-assets`, versión `1.0.0-rc.1`.
No está publicado en npm. Este repositorio no instala nada en la app o la landing.

## Qué contiene

Solo identidad base existente: símbolo, favicons, paleta, Recursive WOFF2 con licencia
y avatares. `asset-manifest.json` identifica las copias con hashes. No incluye
personaje en revisión, propuestas de logos, componentes HTML, documentación estratégica
ni manifiestos PWA históricos. No sustituye ningún paquete previo de marca automáticamente.

```sh
# En este repositorio:
npm run brandkit:build
npm run brandkit:frontend

# Solo tras aprobar una integración, en una rama del frontend:
npm install /ruta/al/gatopago-brand-assets-1.0.0-rc.1.tgz
```

El archivo queda en `output/frontend/`. La ruta del ejemplo debe reemplazarse por
la ruta real de la entrega local. No hay dependencia de GitHub ni descarga en runtime.

## Consumo con bundler

```js
import '@gatopago/brand-assets/fonts.css';
import '@gatopago/brand-assets/tokens.css';
import { version, tokens, assetPaths } from '@gatopago/brand-assets';
```

`assetPaths` son rutas relativas al paquete, no URLs HTTP. Para servir imágenes,
usar el mecanismo de imports de assets del bundler o copiarlas explícitamente a
una carpeta estática propia. Mantener la estructura de fuentes y sus URLs.
No asumir que `node_modules` es público ni que el navegador entiende exports de npm.

Los tokens conservan nombres técnicos `--meli-*` por compatibilidad. No convertirlos
a `--gp-*` en esta entrega: eso sería una migración de API. Importar `tokens.css`
afecta `:root`; comparar primero con los tokens propios de la app. `fonts.css`
define la fuente y clases auxiliares, no impone tipografía a todo el producto.

## Secuencia de integración recomendada

1. Inventariar assets/tokens del frontend actual y su paquete de marca, sin reemplazos masivos.
2. Probar el tarball en una rama; comprobar resolución de CSS, fuentes e imágenes en build y offline.
3. Aplicar primero login y botones compartidos. El catálogo de [componentes](../09-componentes/index.html) sirve de referencia, no como código de producción listo para pegar.
4. Revisar pantalla pequeña, escritorio como marco móvil, zoom 200 %, foco de teclado, lectores de pantalla y movimiento reducido.
5. Revisar estados reales: loading, error, timeout, resultado desconocido y reintento sin doble cobro.
6. Probar QR descargado/impreso con lector real y quiet zone; verificar recibos, exports y formatos monetarios.
7. Tratar favicon e instalación PWA como trabajos separados; no instalar el manifest histórico del kit.

No cambiar autenticación, confirmación de pagos ni disponibilidad de servicios por
un ajuste de marca. No se hicieron estas comprobaciones en el frontend durante
la preparación del kit. La presentación comercial sigue pausada.
