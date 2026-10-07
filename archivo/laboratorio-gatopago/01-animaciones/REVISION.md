# Revisión de las propuestas generadas

Las cinco hojas se produjeron con `image_gen` integrado en modo edición; los prompts exactos están en `prompts/` y los PNG con alfa se conservaron en `fuentes/`. Los originales del brandkit no se editaron.

## Cola v1

- Ocho fotogramas extraídos y registrados; WebP lossless y hoja completa.
- Se elimina la cola enrollada delante de las patas. Queda una cola derecha.
- Registro constante de la parte superior de la cabeza, transparente y sin recorte de contornos visibles. Los separadores se buscaron en espacios transparentes: la generación no respetó una cuadrícula matemática perfecta.
- Galería antes/después con fase normalizada, pausa, velocidad y fotogramas descargables. Comprobado el acceso al último fotograma mediante el slider.
- Límite: pequeñas variaciones de detalle corporal. Es una propuesta, no arte pixel-perfect aprobado.

## Otras hojas v1: no finales

- **Siesta:** ya no hay Z ni un último fotograma con orejas radicalmente distintas. Aún hay pequeñas variaciones de cabeza/cuerpo; falta normalizar, comprobar el loop y comparar con el original.
- **Asomarse:** el comienzo y el final son tarjeta sola, pero la cabeza se inclina y cambia al pasar de medio rostro a rostro completo. No cumple aún el requisito de una sola cabeza que se desplaza detrás de la tarjeta.
- **Reparar rail:** se entiende la intención, pero el hueco y algunas piezas del rail cambian de posición. La cabeza y el gesto todavía varían demasiado. Requiere corrección antes de entregar como animación final.
- **Intercambio:** ambos bloques permanecen, pero el paso 1→2 cambia demasiado su posición y la cola pasa de un lado a otro. No aceptar como sustituto final del original.

Estas cuatro hojas son fuentes de revisión, no animaciones entregadas ni assets de producción. La generación no acredita la calidad: hay que inspeccionar, corregir y probar la continuidad. También falta la revisión individual de las otras quince secuencias del kit.

## Segunda iteración: fotogramas normalizados y comparativa conjunta

Las cuatro hojas v2 se conservan en `fuentes/`, con sus prompts en `prompts/`. Se extraen por separadores de alfa cero, sin retícula ideal que corte una cola. Solo se retira padding completamente transparente: todo píxel con alfa mayor que cero queda en el PNG de salida. No se reescala ni recolorea el arte.

- **Siesta v2:** ocho pasos a partir de cuatro poses, ida y vuelta `[1, 2, 3, 4, 4, 3, 2, 1]`. El primer y último PNG tienen el mismo SHA-256. WebP une las dos poses 4 consecutivas en un frame con la suma de sus tiempos; no es un fotograma perdido. Persisten pequeñas variaciones de contorno.
- **Asomarse v2:** nueve pasos usando cinco poses, con retirada inversa. Se eliminan las patas añadidas; el comienzo y el final son la misma tarjeta. La tarjeta cambia de ancho entre poses y el rostro cambia de inclinación: **todavía no cumple** la continuidad que se busca.
- **Reparar rail v2:** ocho pasos registrados por el rail. Se exporta una sola ejecución y conserva la reparación al finalizar. El hueco y la pieza todavía cambian de posición durante la inserción: **no aprobado**.
- **Intercambio v2:** ocho pasos; cola siempre a la derecha y ambos bloques presentes. Una sola ejecución con resultado conservado. Persisten cambios de postura de las patas y proximidad de los bloques a la cabeza: **no aprobado**.

`index.html` compara las cinco acciones con originales conservados, fase sincronizada, último paso accesible, pausa, velocidad, fondo, tamaño de detalle y descargas individuales. La fase no oculta las diferencias de temporización: cada secuencia usa sus tiempos propios.

### Regeneración local

1. `node archivo/laboratorio-gatopago/tools/normalize-candidates.mjs`
2. `node archivo/laboratorio-gatopago/tools/comparison-gallery.mjs`
3. `node archivo/laboratorio-gatopago/tools/verify-candidates.mjs`

La última comprobación contrasta los píxeles de origen con los PNG registrados, verifica alfa, color visible, temporización y número real de frames codificados en WebP. Esta prueba **no acredita continuidad artística**. Los originales del brandkit siguen sin cambios.
