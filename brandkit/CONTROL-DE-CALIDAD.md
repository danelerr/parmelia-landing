# Control de calidad

Edición 2026-09-24 · Verificación local de archivos y catálogo.

## Integridad de la entrega

Comando reproducible: `npm ci` y `npm run brandkit:verify`, desde la raíz de la landing. No depende de otro repositorio ni de archivos ignorados.

| Comprobación | Resultado |
|---|---|
| Archivos registrados en el inventario | 332, con tamaño y SHA-256 verificados |
| Comparaciones opcionales con las fuentes actuales (`--sources`) | 30, normalizando LF en snapshots de texto |
| Procesador de frames | Una sola adaptación de ruta; contenido restante conservado |
| Enlaces locales revisados | 416, sin destinos ausentes |
| Ilustraciones estáticas | 14 WebP |
| Secuencias / frames | 20 / 152 |
| Canvas / ancla | 320 × 256 / (160, 244), consistentes |
| Tiempos | Sumas de manifiestos y duración de previews coinciden |
| Fuentes de las cinco hojas de animación | Hashes coinciden con el manifiesto original |
| Píxeles de borde con alfa > 8 | 0, conforme al umbral del procesador original |

Además del inventario se entregan `manifest.json` y este registro: **334 archivos en total**. Esos dos no se incluyen en su propio inventario.

Estas cifras describen la carpeta de trabajo. El ZIP generado con `brandkit:zip` excluye QA y herramientas: **305 archivos**, con 303 entradas en su propio inventario y perfil `delivery`. La verificación autónoma no necesita acceder a los orígenes para validar los hashes del paquete.

## Regresión del proceso de generación

`npm run brandkit:test`: nueve escenarios bajo una prueba principal (10 resultados). Cubren verificación aislada, original ausente sin sobrescritura, fallo posterior al preflight sin sobrescritura, build sin archivos ignorados, dos builds idénticos, fuentes CRLF/LF equivalentes, comparación opcional de fuentes, ZIP sin QA validado tras extraer y fallo de empaquetado sin perder el ZIP anterior.

También se exportaron exclusivamente los archivos del índice de Git a una carpeta temporal fuera del checkout. Sin `node_modules/`, `output/`, originales sueltos ni el repositorio de la app, se ejecutó `npm ci` y después verify, build, verify con `--sources`, los 10 tests y zip. Todos pasaron; el manifiesto y el ZIP coincidieron por SHA-256 con los generados en el checkout de trabajo. `astro check` dio 0 errores, 0 advertencias y 0 hints; la landing compiló sus ocho páginas.

La instalación reportó 15 vulnerabilidades en dependencias (1 baja, 5 moderadas, 8 altas y 1 crítica). No se ejecutó `npm audit fix`; esta corrección del empaquetado no resuelve ni certifica la seguridad de esas dependencias.

Se detectaron **131 píxeles de borde con alfa 1/255** repartidos entre los frames. Son residuos casi transparentes preexistentes; se conservan para mantener copias exactas. No se afirma que cada píxel del borde tenga alfa cero ni se ha hecho una limpieza nueva del arte.

## Catálogo en navegador

Evidencia de la revisión anterior del catálogo, conservada como antecedente; no se repitió la inspección visual en la corrección de reproducibilidad. Revisado con Playwright sobre servidor local en `127.0.0.1`; no se desplegó en internet.

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
- QA histórico y herramientas se conservan en Git, pero se excluyen del ZIP de entrega. Las referencias de diseño siguen señaladas como contexto.
- El catálogo utiliza archivos locales y no necesita un servicio de fuentes, CDN o conexión a la app. La prueba automatizada se realizó por HTTP local, no mediante instalación PWA.
- Esta verificación no es una aprobación artística frame por frame ni una auditoría de la app, de seguridad o de disponibilidad comercial.
- La revisión de dominios actualiza la landing a `gatopago.com` y `app.gatopago.com`, elimina las capturas antiguas y retira referencias obsoletas. No se modificó el repositorio de la app ni se restauraron las eliminaciones preexistentes de `brand/social-assets/`. La publicación del código en GitHub no configura DNS ni constituye un despliegue manual.
- La landing completa compila: `astro check` sin errores, advertencias ni hints; `npm run build` genera las ocho páginas.
- Verificación de dominios en navegador: canonical `https://gatopago.com/en/`, CTA a `https://app.gatopago.com/`, sin enlaces vacíos ni imágenes rotas. A 390 px no hay desbordamiento horizontal. La documentación usa el canonical nuevo y un placeholder explícito para la API; no muestra un dashboard sin configurar. Consola sin errores ni advertencias.
- API, dashboard y cuenta social necesitan sus variables públicas. No se han probado DNS, entrega de correo ni disponibilidad de los servicios en los dominios nuevos.
