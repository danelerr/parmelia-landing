# GatoPago · Brandkit

Edición: 24 de septiembre de 2026. Estado: entrega local de identidad y recursos existentes.

**Empieza por [el catálogo visual](./index.html).** Ábrelo en un navegador: funciona sin conexión, carga las fuentes locales y permite explorar las ilustraciones y activar las animaciones de una en una.

La marca pública es **GatoPago**. **Meli** es solamente el nombre interno del personaje. Este kit organiza la identidad vigente con los dominios `gatopago.com` y `app.gatopago.com`. No despliega nada ni crea nuevas variantes del gato. Las capturas de la interfaz anterior fueron retiradas.

## Encuentra lo que necesitas

| Carpeta | Contenido | Para qué usarla |
|---|---|---|
| [01-manual](./01-manual/identidad-y-voz.md) | Identidad, voz, sistema visual, componentes y mantenimiento | Diseñar y escribir con criterio consistente |
| [02-logos](./02-logos/README.md) | Símbolo SVG, favicons e iconos PWA existentes | Firma de marca e identidad de instalación |
| [03-mascota](./03-mascota/CATALOGO.md) | 14 estáticos, 20 secuencias, 152 frames, manifiestos y previews | Personaje y movimiento |
| [04-tipografia](./04-tipografia/README.md) | Recursive Variable, 4 WOFF2, CSS y licencia | Tipografía web local |
| [05-colores](./05-colores/README.md) | HEX, RGB, CSS, JSON, CSV, GPL y contraste | Diseño e implementación |
| [06-originales](./06-originales/README.md) | 8 imágenes fuente sin alteraciones | Conservación del arte original |
| [07-referencias](./07-referencias/README.md) | Narrativa, planes extensos y snapshots del código | Contexto y trazabilidad |
| [08-imagenes](./08-imagenes/README.md) | Imagen Open Graph | Comunicación de marca, sin capturas de la interfaz anterior |

## Manual de lectura rápida

1. [Identidad y voz](./01-manual/identidad-y-voz.md): qué representa la marca y cómo habla.
2. [Sistema visual](./01-manual/sistema-visual.md): logo, color, tipografía y composición.
3. [Movimiento y componentes](./01-manual/movimiento-y-componentes.md): reglas de experiencia.
4. [Entrega y mantenimiento](./01-manual/entrega-y-mantenimiento.md): procedencia, derechos y actualización.

## Qué tiene autoridad aquí

- Para los **archivos entregados y valores visuales observados**, este manual y el inventario de esta edición. La paleta es la de `src/styles/rebrand.css` de la landing; no se presenta como una auditoría de todos los componentes de la app.
- Para **narrativa y estrategia**, el índice editorial de `documentacion/` en la landing. Las copias de `07-referencias/` son contexto fechado, no otra fuente editable que haya que mantener en paralelo.
- Para **capacidades y disponibilidad del producto**, el código, la configuración y la evidencia vigente de la app. Ningún plan de marca acredita que una funcionalidad esté desplegada.

Los planes largos contienen propuestas que no coinciden totalmente con lo implementado. No mezclar sus antiguas tablas visuales con los tokens del kit. Las diferencias concretas están documentadas en [sistema visual](./01-manual/sistema-visual.md).

## Antes de entregar a otra persona

- Comparte la carpeta completa: mover únicamente `index.html` rompe las rutas de imágenes y fuentes.
- Consulta [CONTROL-DE-CALIDAD.md](./CONTROL-DE-CALIDAD.md) para conocer el alcance de la verificación.
- [manifest.json](./manifest.json) registra archivo, procedencia, peso, SHA-256 y metadatos de imágenes.
- La licencia OFL cubre la fuente, no el logo ni los dibujos. No hay una licencia pública de reutilización de la marca concedida por este kit.
- No se incluyen contratos privados, credenciales ni los assets sociales previamente eliminados del repositorio.
