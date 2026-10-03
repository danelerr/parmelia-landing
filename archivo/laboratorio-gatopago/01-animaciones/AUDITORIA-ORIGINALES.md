# Revisión de las veinte secuencias originales

Se leyó el manifest vigente, se inspeccionaron las 147 poses únicas mediante dos hojas de contacto y se midieron sus límites alfa. Ninguna silueta con alfa mayor que 24 toca un borde del PNG. Eso descarta un recorte visible en los archivos inspeccionados, pero no acredita anatomía, registro ni continuidad de movimiento.

Las hojas de contacto y las métricas se regeneran con `node recursos/laboratorio-gatopago/tools/audit-originals.mjs` y quedan en `.qa/originals/`. Son material de revisión, no assets de producción.

Se añadió una [galería de reproducción](./originales/index.html): veinte secuencias y 166 pasos, tiempos del manifest, tamaños 96/128/256 px y nativo, paso anterior/siguiente y una vuelta opcional. Las copias se compararon byte a byte con el kit. Una prueba real de Chrome observó los 166 pasos, verificó la parada de cada vuelta/acción y controles en 390/1280 px, sin overflow ni errores de página. También detuvo el reproductor al activar movimiento reducido. Evidencia: `.qa/originals/runtime-verification.json` y `source-verification.json`.

El primer intento falló por renderizado de Chrome limitado a cerca de 1 Hz. Se trajo su ventana al frente y se repitió la prueba, con un muestreo RAF de unos 15 ms. El fallo anterior no se cuenta como prueba de continuidad ni como defecto de los sprites. La prueba de reproducción acredita que los pasos se muestran, no que todas las transiciones tengan anatomía correcta.

## Cinco acciones prioritarias

Cola, siesta, asomarse, reparar-rail e intercambio tienen fuentes independientes y una comparativa en `index.html`. Se añaden cinco [alternativas raster por capas](./rig-raster/index.html), 285 pasos PNG con piezas estables. Sus límites se describen en `rig-raster/REVISION.md` y en cada manifest; no se sustituyó ningún original.

## Quince acciones restantes

Las quince secuencias se reprodujeron con tiempos originales, y se revisaron tres contactos cronológicos que incluyen repeticiones y la unión de loop. **No hay aprobación final**. Las observaciones siguientes describen el original; caminata, preparando pago y mantenimiento tienen ya [candidatos adicionales](./rig-acciones/index.html), con límites documentados y sin reemplazar las fuentes.

| Secuencia | Observación en las poses | Siguiente comprobación o ajuste |
| --- | --- | --- |
| Parpadeo | Tres estados legibles; el cerrado usa ojos curvos. | Revisar el paso entre párpados y el tiempo de cierre a tamaño de app. |
| Oreja | La oreja cambia, pero también parece cambiar el ancho de la cabeza. | Fijar cara, bigotes y oreja opuesta antes de animar solo la oreja. |
| Mirar | La dirección de los ojos se entiende y la silueta parece bastante estable. | Comprobar registro y retorno al primer estado en reproducción. |
| Reposo | Se ve cola lateral y una forma enrollada junto a las patas. Puede repetir el problema de dos colas. | Confirmar anatomía con la pose de referencia y conservar una sola cola. |
| Metí la pata | Hay giro de perfil completo y una lágrima en la última pose. El gesto es más grande que una pequeña sacudida. | Reducir a un gesto breve y coherente; no asociar error financiero a dramatización. |
| Salto | Anticipación, despegue y aterrizaje se distinguen. | Revisar trayectoria, suelo fijo y ausencia de saltos entre extremos. |
| Caminata | Alterna cabeza de perfil y vista más frontal mientras lleva el paquete. | Fijar orientación y tamaño del paquete; comprobar ciclo de patas y una sola cola. |
| Preparando pago | Cambian postura, paquete y chispas; algunos estados parecen celebrar. | Mantener preparación indeterminada sin gesto que parezca confirmar pago. Revisar cierre del loop. |
| Comprobante | La acción y el documento son reconocibles, con cambios de postura y decoración. | Fijar tamaño del papel y registrar el cuerpo; reproducir una vez tras un resultado real. |
| Creciendo | El brote progresa hasta una planta mayor y la acción de regar es clara. | Revisar continuidad de regadera, suelo y crecimiento. No implica rendimiento prometido. |
| Tarjeta | Acercamiento, contacto y confirmación se distinguen. | Fijar terminal y tarjeta; separar ejemplo ilustrativo de disponibilidad real del producto. |
| Linterna | Haz y dirección de búsqueda cambian con el personaje. | Revisar cierre del loop y evitar saltos de cabeza o destellos molestos. |
| Saludo | Se entiende la pata que saluda; la pose también combina cola lateral y forma enrollada. | Revisar la misma anatomía señalada en reposo antes de aceptar el gesto. |
| Mantenimiento | Casco y herramientas explican la acción. Las últimas poses cambian bastante la proporción corporal. | Mantener casco, rail y cuerpo; cerrar el loop con una pose compatible con el comienzo. |
| Seguridad | Escudo y llave son claros; varias poses añaden mucho resplandor. | Revisar luminosidad, legibilidad pequeña y ejecución única. El personaje no debe aparentar verificar seguridad real. |

## Criterio para aceptar una corrección

La [colección conjunta](./coleccion/index.html) agrupa dieciocho candidatos raster y 1058 pasos. Caminata/preparación/mantenimiento conservan perfil/paquete, preparación indeterminada o casco/cuerpo/rail. Los cinco gestos adicionales conservan anatomía o cara y comprobante conserva gato/papel, animando solo el detalle impreso. Las patas se articulan como piezas rígidas: el apoyo geométrico verificado no equivale a animación anatómica dibujada. Las fuentes, verificaciones y 144 descargas reales están separadas por tanda; revisar `rig-acciones/REVISION.md`, `rig-gestos/REVISION.md`  , `rig-documento/README.md` y `rig-cuidados/README.md`. Creciendo, tarjeta, linterna y seguridad tienen ahora piezas PNG estables, objetos SVG propios y finales/loops verificados. El gato frontal y los objetos geométricos son una reinterpretación declarada, no una copia exacta del dibujo de perfil original. Los originales de la tabla se conservan; que una propuesta tenga pruebas técnicas no sustituye la revisión artística.

- La misma cabeza, proporciones y número de colas durante toda la acción.
- Objetos estacionarios realmente fijos; cambios solo donde la acción los necesita.
- Silueta completa y fondo transparente.
- Un loop vuelve sin un salto visible; una acción de éxito conserva su final.
- Lectura a tamaño de app, revisión de cada transición y contraste con el original.
- Procedencia, tiempos, fuente editable o generada y limitaciones documentadas.

Los checks de archivos son evidencia técnica. Ninguna fila de esta tabla equivale a una aprobación artística.

## Hallazgos de la revisión cronológica

- Parpadeo: el ciclo de 3.035 ms contiene dos cierres breves (100 y 90 ms), no una larga cara dormida. La prueba mostró los ocho pasos; no se detecta un salto de registro evidente en el contacto. Mantener en revisión visual a tamaño pequeño.
- Mirar: el ciclo de 2.770 ms muestra seis pasos y su vuelta al primero. El movimiento de ojos se entiende; no se justifica sustituirlo solo porque la prueba de navegador pase.
- Oreja: el movimiento altera parte del contorno de cabeza, no solo la oreja. Necesita piezas estables de cara y oreja independiente.
- Reposo/saludo: la forma enrollada inferior es ambigua frente a la cola lateral; cambian postura y cabeza. Deben reutilizar una anatomía con una cola, no retocar solamente el tiempo.
- Metí la pata: el perfil de 500 ms y la lágrima final de 1.400 ms dominan el gesto. Reducir dramatización y conservar la misma cabeza.
- Salto/caminata: hay cambios de orientación/proporciones. La caminata completa seis poses en 660 ms; ampliar el tiempo por sí solo no corrige el cambio de paquete/cara.
- Preparando pago: el loop añade destellos celebratorios y vuelve a una cara distinta. Separar preparación de confirmación y conservar el mismo objeto/rail.
- Comprobante: cambian el documento, las patas y el utensilio. Fijar el papel y el cuerpo antes de animar el gesto.
- Creciendo: la regadera y el cuerpo cambian, mientras la planta avanza por etapas. Conservar suelo, regadera y gato; animar la planta por separado sin prometer rentabilidad.
- Tarjeta: la terminal cambia posición/forma y el último paso regresa al inicio pese a ser una acción única. Necesita terminal fija y final estable, no solo un loop distinto.
- Linterna: hay giro completo de cuerpo y cambios de posición del haz. No es un pequeño gesto de búsqueda; mantener cuerpo fijo y animar el haz/orejas con criterio.
- Mantenimiento: las últimas dos poses abandonan el rail y cambian bastante el cuerpo; la vuelta al inicio es incompatible. Rehacer con cuerpo, casco y rail estables.
- Seguridad: el escudo brillante aparece y desaparece; el cierre vuelve a una pose inicial. Reducir el brillo y conservar una última pose legible sin fingir una verificación real de seguridad.
