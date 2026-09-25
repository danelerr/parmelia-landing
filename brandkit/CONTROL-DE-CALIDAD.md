# Control de calidad

Edición 2026-09-24 · Verificación local de archivos y catálogo.

## Integridad de la entrega

Comando reproducible: `node scripts/verify-brandkit.mjs --app-dir <ruta-de-la-app>`, desde la raíz de la landing.

| Comprobación | Resultado |
|---|---|
| Archivos registrados en el inventario | 332, con tamaño y SHA-256 verificados |
| Copias idénticas a sus fuentes | 312 |
| Procesador de frames | Una sola adaptación de ruta; contenido restante conservado |
| Enlaces locales revisados | 416, sin destinos ausentes |
| Ilustraciones estáticas | 14 WebP |
| Secuencias / frames | 20 / 152 |
| Canvas / ancla | 320 × 256 / (160, 244), consistentes |
| Tiempos | Sumas de manifiestos y duración de previews coinciden |
| Fuentes de las cinco hojas de animación | Hashes coinciden con el manifiesto original |
| Píxeles de borde con alfa > 8 | 0, conforme al umbral del procesador original |

Además del inventario se entregan `manifest.json` y este registro: **334 archivos en total**. Esos dos no se incluyen en su propio inventario.

Se detectaron **131 píxeles de borde con alfa 1/255** repartidos entre los frames. Son residuos casi transparentes preexistentes; se conservan para mantener copias exactas. No se afirma que cada píxel del borde tenga alfa cero ni se ha hecho una limpieza nueva del arte.

## Catálogo en navegador

Revisado con Playwright sobre servidor local en `127.0.0.1`; no se desplegó en internet.

- Escritorio: 1440 × 1000. Móvil: 390 × 844; comprobación adicional de ancho a 320 px.
- 38 imágenes del catálogo decodificadas correctamente, sin imágenes rotas.
- Recursive cargada desde los archivos locales.
- Sin desbordamiento horizontal en los tres anchos comprobados.
- Sin errores ni advertencias de consola durante la revisión.
- Sin animaciones activas al entrar. Activar Caminata detiene Asomarse; solo queda una animación activa.
- “Detener animación” restaura las vistas estáticas.
- Con movimiento reducido: desplazamiento automático sin transición y ninguna animación iniciada por defecto.
- Revisadas visualmente las capturas de portada de escritorio, portada móvil y cuadrícula móvil de sprites.

Las evidencias de navegador quedan en `output/playwright/brandkit-*.png` del repositorio, fuera del paquete de distribución.

## Observaciones que no deben perderse

- Los previews WebP son bucles de revisión. `once` en el manifiesto expresa el uso previsto en producto, no el comportamiento intrínseco del WebP.
- Los originales y capturas se preservan; no se recortan ni se modifica su transparencia.
- QA histórico y referencias están separados de los assets de uso y señalados como tales.
- El catálogo utiliza archivos locales y no necesita un servicio de fuentes, CDN o conexión a la app. La prueba automatizada se realizó por HTTP local, no mediante instalación PWA.
- Esta verificación no es una aprobación artística frame por frame ni una auditoría de la app, de seguridad o de disponibilidad comercial.
- La revisión de dominios actualiza la landing a `gatopago.com` y `app.gatopago.com`, elimina las capturas antiguas y retira referencias obsoletas. No se modificó el repositorio de la app ni se restauraron las eliminaciones preexistentes de `brand/social-assets/`. No hubo commit, push, cambios DNS ni despliegue.
- La landing completa compila: `astro check` sin errores, advertencias ni hints; `npm run build` genera las ocho páginas.
- Verificación de dominios en navegador: canonical `https://gatopago.com/en/`, CTA a `https://app.gatopago.com/`, sin enlaces vacíos ni imágenes rotas. A 390 px no hay desbordamiento horizontal. La documentación usa el canonical nuevo y un placeholder explícito para la API; no muestra un dashboard sin configurar. Consola sin errores ni advertencias.
- API, dashboard y cuenta social necesitan sus variables públicas. No se han probado DNS, entrega de correo ni disponibilidad de los servicios en los dominios nuevos.
