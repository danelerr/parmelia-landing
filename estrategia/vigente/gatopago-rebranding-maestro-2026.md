# GatoPago 2026 — Rebranding maestro de marca y producto

> **Concepto rector:** dinero vivo, precisión pixel.
>
> **Sistema:** GatoPago + personaje felino + GatoPago UI + Purr Motion.
>
> **Estado:** dirección creativa y especificación de implementación.
>
> **Fecha:** 18 de agosto de 2026.
>
> **Última revisión documental:** 23 de agosto de 2026.
>
> **Alcance:** identidad verbal y visual, logotipo, personaje, tipografía, color, componentes y movimiento.

---

## 0. Contrato de este documento

Este documento define el rediseño integral de GatoPago: estrategia de marca, símbolo, color, tipografía, voz, UI, componentes, diálogos, animaciones, microinteracciones, pequeños juegos, accesibilidad y plan de migración de la aplicación y la landing.

No describe una nueva lista de funciones. Traduce el producto que ya existe a una identidad coherente, memorable y propia.

La realidad del producto sigue siendo la fuente de verdad:

- GatoPago es hoy una **alpha en testnet**.
- La promesa pública vigente es **“Tus dólares ya saben moverse.”**
- La categoría interna es **“cuenta onchain programable.”**
- La Card permanece como **acceso anticipado** hasta que cobertura, proveedor, economía y operación estén confirmados.
- Aave es la única experiencia guiada inicial de rendimiento.
- El usuario ve primero sus intenciones; red, contratos y rutas aparecen en una segunda capa.
- Este documento no autoriza despliegues ni convierte capacidades futuras en capacidades actuales.

Cuando se implemente, esta guía reemplaza la identidad del stack celeste/rosa/crema y el manual visual anterior. La narrativa de producto y las restricciones de claims se conservan.

---

## 1. Decisión ejecutiva

### 1.1 La nueva GatoPago en una frase

**GatoPago es una cuenta onchain que hace que el dinero digital se sienta vivo, cercano y controlable.**

No debe parecer un banco azul, un exchange, una terminal Web3 ni una app infantil. Debe parecer una herramienta financiera precisa que, por primera vez, tiene carácter.

### 1.2 La idea que alguien debe recordar

Una persona abre GatoPago y recuerda tres cosas:

1. Un gato vermilion que parece construido con pequeños bloques de energía.
2. Su dinero organizado con palabras humanas: **Disponible y Creciendo**.
3. Cada movimiento convertido en una ruta pixel clara que siempre explica qué está pasando.

### 1.3 Decisiones cerradas de esta dirección

| Decisión | Resultado |
|---|---|
| Nombre | Se adopta **GatoPago**, siempre unido en la marca. |
| Símbolo | El nuevo gato pixel es el símbolo principal. |
| Mascota | **Meli** es el nombre interno de producción. En copy público se usa “el gato” o “la mascota”. |
| Concepto | **Dinero vivo, precisión pixel.** |
| Color principal | Vermilion tomado del PNG: **Cat Fire `#F85239`**. |
| Sombra de marca | Rojo profundo del PNG: **Cat Shadow `#CF3433`**. |
| Base | Negro tinta cálido + marfil/leche; no negro puro contra blanco puro. |
| Tipografía | **Recursive Variable** en tres voces: Linear, Casual y Mono. |
| Motion | Movimiento discreto por pasos, con propósito financiero. |
| UI | Oscura como superficie principal; clara para recibos, educación y momentos editoriales. |
| Sistema | Tokens semánticos; ningún color crudo repartido por componentes. |
| Juego | Solo recompensa aprendizaje, seguridad y exploración; nunca volumen o riesgo financiero. |

### 1.4 Por qué GatoPago sí conviene

GatoPago es inmediato en español, conecta naturalmente con el gato y permite una voz propia sin esconder que el producto sirve para pagar. La escritura oficial es **GatoPago**, una sola palabra y con ambas iniciales en mayúscula. “Gato pago” se reserva para juegos de palabras dentro del copy, nunca como nombre legal o de producto.

El nombre puede contener Personal, Card, API, Creciendo y futuras reglas bajo una misma familia. La relación queda así:

- **GatoPago** es la compañía y el producto.
- **Meli** es únicamente el nombre interno de la mascota y de algunos archivos de producción.
- **GatoPago UI** es el sistema de componentes.
- **Purr Motion** es el lenguaje de movimiento.
- **Pixel Rails** es el recurso gráfico para representar rutas, estados y programabilidad.

Solo se reabre el naming si una revisión legal, marcaria o de dominio descubre un bloqueo real.

---

## 2. Qué se conserva y qué se reemplaza

### Se conserva

- “Tu dinero sigue siendo tuyo, pero ahora puede hacer más.”
- “Tus dólares ya saben moverse.”
- USDC primero, pero no USDC únicamente.
- El modelo Disponible / Creciendo, con otros activos solo donde sean necesarios.
- La disciplina prepare → confirmar → passkey → enviar → verificar.
- Confirmaciones antes de mover dinero.
- Microcopy sin jerga.
- Estados pendientes y fallos honestos.
- `prefers-reduced-motion`, semántica de teclado, i18n ES/EN y targets táctiles. El contorno visual de foco permanece desactivado por decisión de producto.
- La separación entre experiencia simple y detalles técnicos.
- Recibos como artefactos compartibles de confianza.

### Se reemplaza

- El logo de tres capas celeste/rosa/crema.
- La combinación de tres acentos sin una jerarquía clara.
- Bricolage Grotesque + Inter como pareja principal.
- Gradientes arcoíris para señalar pagos.
- Iconos, brillos o backgrounds que parezcan una wallet genérica.
- Spinners mudos.
- Tarjetas oscuras idénticas apiladas sin una narrativa visual.
- Duplicaciones de sheets, overlays y pantallas de resultado.
- Animación suave genérica aplicada a todo.

---

## 3. Plataforma de marca

### 3.1 Propósito

Hacer que poseer y usar dinero digital no exija entregar control ni convertirse en experto en infraestructura onchain.

### 3.2 Promesa

**Tu dinero sigue siendo tuyo, pero ahora puede hacer más.**

### 3.3 Posicionamiento

Para personas y equipos de LATAM que ya cobran o ahorran en dólares digitales, GatoPago es una cuenta onchain programable que permite recibir, usar y hacer crecer el dinero desde una experiencia humana. A diferencia de una wallet técnica o una fintech custodial cerrada, GatoPago simplifica la operación sin esconder la propiedad, la ruta ni la salida.

### 3.4 Arquetipos

- **Explorador, 50%:** el gato es curioso, encuentra rutas y hace accesible un territorio complejo.
- **Cuidador, 35%:** protege, explica, espera y nunca empuja al usuario a tomar más riesgo.
- **Bufón, 15%:** introduce humor, sorpresa y juego fuera de los momentos críticos.

El Bufón desaparece en recuperación, fallos, riesgo, confirmaciones y soporte. En esas superficies manda el Cuidador.

### 3.5 Valores operativos

| Valor | Cómo se ve en producto |
|---|---|
| Control sin fricción | Passkeys, permisos visibles, salida soberana y lenguaje simple. |
| Honestidad en movimiento | Cada espera explica el estado real y qué puede hacer el usuario. |
| Curiosidad responsable | Los detalles técnicos aparecen progresivamente; explorar no significa apostar. |
| Utilidad cotidiana | Cobrar, pagar, cambiar y crecer antes que exhibir infraestructura. |
| Calidez precisa | Copy humano, datos exactos y visuales con personalidad. |
| Independencia | La experiencia no pertenece a una chain, protocolo o issuer. |

### 3.6 Personalidad

GatoPago es:

- viva, no ruidosa;
- juguetona, no infantil;
- técnica, no críptica;
- audaz, no agresiva;
- cálida, no sentimental;
- sofisticada, no elitista;
- local, no folclórica;
- onchain, no crypto-bro.

---

## 4. Historia: por qué un gato

El gato no se incorpora porque “los gatos son bonitos”. Funciona porque resume cualidades reales del producto:

- **Autonomía:** se mueve con independencia; el dinero sigue siendo del usuario.
- **Agilidad:** cambia de ruta sin hacer visible toda la complejidad.
- **Curiosidad:** explora rutas y posibilidades de manera progresiva.
- **Atención:** observa antes de saltar; GatoPago simula y confirma antes de mover.
- **Resiliencia:** sabe caer y volver; recovery y rutas de salida importan.
- **Cercanía:** vuelve un sistema financiero más humano sin convertirlo en un juguete.

Meli no es un asistente parlante omnipresente. Es una presencia silenciosa que reacciona, orienta y celebra. En una confirmación crítica, Meli no hace chistes ni tapa datos.

### Manifiesto breve

> El dinero digital no debería sentirse como una consola.
>
> Debe llegar, descansar, moverse y crecer sin perderse detrás de redes y contratos.
>
> GatoPago le da caminos. Meli los hace visibles.
>
> Tu dinero sigue siendo tuyo. Ahora puede hacer más.

---

## 5. Arquitectura verbal

### 5.1 Jerarquía de mensajes

| Nivel | Mensaje |
|---|---|
| Categoría interna | Cuenta onchain programable. |
| Promesa pública actual | Tus dólares ya saben moverse. |
| Filosofía | Tu dinero sigue siendo tuyo, pero ahora puede hacer más. |
| Concepto creativo | Dinero vivo, precisión pixel. |
| Producto Personal | Tu dinero, listo para moverse o crecer. |
| Developers | Crea cobros y recibe confirmaciones onchain con una API. |
| Card mientras no esté activa | Queremos que tus dólares digitales también puedas usarlos en el mundo cotidiano. |

### 5.2 Voz

La voz es directa, cálida, breve y concreta. Habla como una persona que entiende finanzas y no necesita demostrarlo.

Reglas:

- Verbos antes que sustantivos técnicos.
- Una idea por frase.
- Explicar qué pasó, qué no pasó y qué sigue.
- Montos y destinatarios tienen prioridad visual y verbal.
- No felicitar por asumir riesgo.
- No usar “mágico”, “revolucionario”, “sin fricción” o “para todos”.
- No tratar al usuario como principiante; ocultar jerga no significa infantilizar.
- Español latino neutro; no copiar el voseo de Takenos.

### 5.3 Tono por contexto

| Contexto | Tono | Ejemplo |
|---|---|---|
| Marketing | Enérgico y visual | “Tus dólares ya saben moverse.” |
| Onboarding | Cercano y tranquilizador | “Tu huella protege tu cuenta. No necesitas recordar otra contraseña.” |
| Home | Sereno y útil | “Tienes $240 disponibles.” |
| Confirmación | Preciso | “Enviarás $35 USDC a @ana.” |
| Espera | Informativo | “La red ya recibió el pago. Estamos esperando la confirmación.” |
| Éxito | Cálido, sin exceso | “Listo. @ana recibió $35 USDC.” |
| Error | Calmo y accionable | “No pudimos enviar el pago. Tu saldo no se movió.” |
| Riesgo | Sobrio | “La tasa es variable y puede cambiar. Revisa los riesgos antes de continuar.” |
| Recuperación | Serio | “Hay una solicitud para cambiar tus llaves. Puedes cancelarla hasta el 19 de agosto.” |

### 5.4 Traducción técnico → humano

| Evitar en primera capa | Usar |
|---|---|
| UserOperation | Movimiento |
| Paymaster | Gas patrocinado por GatoPago |
| Bridge | Enviar a otra red |
| Supply Aave | Mover a Creciendo |
| Withdraw Aave | Volver a Disponible |
| Transaction hash | Número de comprobante |
| Wallet address | Dirección de tu cuenta |
| Slippage | Tolerancia de precio |
| Pending | En camino / esperando confirmación |
| Reverted | No se completó; tu saldo no se movió |

### 5.5 Claims prohibidos o condicionados

- No “sin gas”; usar **“Gas patrocinado por GatoPago, sujeto a límites.”**
- No “sin comisiones”; separar comisión GatoPago, red, proveedor, conversión e impacto.
- No “sin KYC” como afirmación absoluta; los rails regulados pueden pedir verificación.
- No “paga sin cuenta” hasta que el flujo lo permita realmente.
- No “gasta donde quieras” hasta tener Card activa y cobertura confirmada.
- No esconder Aave, tasa variable, liquidez o riesgo detrás de una animación bonita.

---

## 6. Sistema del logo y del personaje

### 6.1 Familia de activos obligatoria

El PNG original es la referencia cromática y de carácter, pero no debe ser el único archivo de producción. Hay que producir deliberadamente estas variantes:

| Activo | Proporción | Uso |
|---|---:|---|
| `cat-mark-full` | 3:2 | Hero, piezas editoriales, loading amplio. Conserva el lienzo transparente completo. |
| `cat-glyph` | 1:1 | Navbar, favicon y UI pequeña. Debe exportarse como composición propia, no recortarse con CSS. |
| `app-icon` | 1:1 mask-safe | PWA, App Store, homescreen. Fondo Ink o Cat Fire incorporado al asset. |
| `cat-mono` | libre / 1:1 | Sellos, documentos, grabado de tarjeta y una tinta. |
| `brand-lockup-horizontal` | variable | Gato + palabra “GatoPago”. |
| `brand-lockup-stacked` | variable | Portadas, splash y assets sociales. |
| `cat-sprite` | grilla | Estados animados de Meli. |

**Regla crítica:** nunca volver a forzar `aspect-ratio: 1`, `object-fit: cover` o `transform: scale(...)` sobre `cat-mark-full`. Si una superficie necesita un cuadrado, se usa `cat-glyph`, creado para ese formato.

### 6.2 Wordmark

- Escritura visual recomendada: **`GatoPago`**, en una sola palabra y con ambas iniciales en mayúscula.
- Escritura en texto corrido: **GatoPago**.
- Base tipográfica: Recursive Casual 900–1000.
- El wordmark final debe tener ajustes ópticos propios en `p`, `r`, `m` y punto de `i`; no debe ser solo texto plano exportado.
- La cola de la `p` puede terminar en un único bloque pixel que dialogue con los bigotes.

### 6.3 Área de seguridad

- Símbolo solo: un módulo `x` alrededor, donde `x` es la altura de un ojo de Meli.
- Lockup: `1.5x` a izquierda y derecha; `x` arriba y abajo.
- Ningún texto, borde, glow o fotografía entra en esa zona.

### 6.4 Tamaños mínimos

- Favicon: asset dedicado de 32 px, revisado pixel por pixel.
- UI: 24 px mínimo para `cat-glyph`; 28–32 px recomendado.
- Wordmark completo: 92 px de ancho mínimo en pantalla.
- Hero: 180–320 px según viewport, siempre con proporción completa.

### 6.5 Comportamiento

- Meli mira hacia la acción principal, no aleatoriamente.
- Un parpadeo natural cada 5–9 segundos, con intervalo variable predefinido.
- Nunca animar ojos en pantallas de recuperación, términos, riesgo o error crítico.
- El glow pertenece al contenedor y usa Cat Fire con baja opacidad; no altera los píxeles del PNG.
- No usar Meli como patrón repetido detrás de montos o datos sensibles.

### 6.6 Catálogo de sprites implementado

Los dos sprite sheets entregados se separan en activos WebP con transparencia real; el recorte pertenece al archivo de producción y nunca se hace con `object-fit: cover` en la interfaz.

| Activo | Rol de producto |
|---|---|
| `head-neutral` | Símbolo estable, navbar, PWA y sello de confianza. |
| `head-happy` | Éxito y estado tranquilo. |
| `head-focused` | Firma, verificación y onboarding. |
| `head-cautious` | Advertencia recuperable. |
| `head-curious` | Vacíos y exploración. |
| `head-excited` | Celebración breve, nunca riesgo financiero. |
| `head-sleepy` | Espera pasiva. |
| `head-peek` | Cobros, receipts y pequeños descubrimientos. |
| `body-sitting` | Login y presentación de marca. |
| `body-courier` | Envíos y movimiento. |
| `body-sleeping` | Creciendo y preferencias tranquilas. |
| `body-qr` | Cobrar, recibir y compartir. |
| `body-conveyor` | Faucet y procesos técnicos de testnet. |
| `body-peek-card` | Card conceptual y acceso anticipado. |

El componente canónico es `MeliSprite`; conserva `height: auto`, `object-fit: contain` e `image-rendering: pixelated`. Las variantes pequeñas de marca pasan por `CatGlyph` y no por un recorte CSS del arte grande.

---

## 7. Color: Ember & Ink

La paleta nace del archivo del gato. El análisis del PNG encuentra como tonos dominantes opacos `#F85239` y `#CF3433`; esos dos colores reemplazan la mezcla arbitraria de celeste, rosa y crema.

### 7.1 Marca

| Token | HEX | Función |
|---|---|---|
| `cat-50` | `#FFF0EB` | Fondos tintados, badges claros. |
| `cat-300` | `#FF8065` | Hover, highlights y gráficos grandes. |
| `cat-500` / Cat Fire | `#F85239` | Color primario en modo oscuro. |
| `cat-700` / Cat Shadow | `#CF3433` | Pressed, profundidad pixel y sombreado del gato. |
| `cat-900` | `#601F16` | Sombras duras, ilustración y texto decorativo. |
| `on-cat` | `#210805` | Texto e iconos sobre Cat Fire. |

### 7.2 Neutros oscuros — “Noche GatoPago”

| Token | HEX | Función |
|---|---|---|
| `canvas` | `#0B0B0F` | Fondo raíz. |
| `canvas-raised` | `#111116` | App shell y zonas fijas. |
| `surface` | `#17171D` | Tarjetas y sheets. |
| `surface-2` | `#202028` | Inputs, filas y controles. |
| `surface-3` | `#292932` | Hover/selección. |
| `border` | `#33313A` | División decorativa. |
| `border-strong` | `#6A616D` | Límites de controles cuando el borde comunica affordance. |
| `text` | `#FFF7EF` | Texto principal. |
| `text-muted` | `#C9BDB5` | Texto secundario. |
| `text-faint` | `#9C918B` | Metadatos legibles. |

### 7.3 Neutros claros — “Leche GatoPago”

| Token | HEX | Función |
|---|---|---|
| `canvas-light` | `#FFF8F0` | Landing clara, educación, receipts. |
| `surface-light` | `#FFFFFF` | Tarjetas y documentos. |
| `surface-light-2` | `#F5EEE8` | Inputs y bloques secundarios. |
| `border-light` | `#D9CEC7` | Divisiones. |
| `text-light` | `#1C1211` | Texto principal. |
| `text-light-muted` | `#6E5D56` | Texto secundario. |
| `text-light-faint` | `#7F6C65` | Metadatos pequeños con contraste AA. |
| `brand-light` | `#D23429` | Links y botones en superficies claras. |

### 7.4 Colores semánticos, no decorativos

| Token | HEX | Único significado permitido |
|---|---|---|
| `growth` | `#71D5A1` | Creciendo, rendimiento y entrada positiva confirmada. |
| `info` | `#79B9FF` | Red, ayuda, datos técnicos o cross-chain. |
| `pending` | `#F6C65B` | Espera, revisión o estado incompleto. |
| `danger` | `#FF6B7A` | Error, riesgo destructivo o salida. |

Estos colores no forman gradientes de marca y no compiten en el mismo componente. Siempre se acompañan con icono y texto.

### 7.5 Proporción de uso

- 70% neutros Noche/Leche.
- 20% superficies y tipografía secundaria.
- 8% Cat Fire y su familia.
- 2% colores semánticos.

### 7.6 Contraste comprobado

| Par | Contraste aproximado |
|---|---:|
| `text` sobre `canvas` | 18.52:1 |
| `text-muted` sobre `canvas` | 10.69:1 |
| `text-faint` sobre `canvas` | 6.40:1 |
| `cat-500` sobre `canvas` | 5.85:1 |
| `on-cat` sobre `cat-500` | 5.68:1 |
| blanco sobre `brand-light` | 4.93:1 |
| `text-light-muted` sobre `canvas-light` | 5.93:1 |

No usar marfil sobre Cat Fire para texto pequeño: su contraste es insuficiente. Sobre el botón primario oscuro se usa `on-cat`.

### 7.7 Gradientes permitidos

Solo existen tres familias:

1. **Ember:** `cat-300 → cat-500 → cat-700` para hero, Card conceptual y momentos de marca.
2. **Heat glow:** Cat Fire a transparente, siempre detrás de contenido.
3. **Surface depth:** dos neutros adyacentes para volumen.

Queda prohibido mezclar Cat Fire + Growth + Info en un gradiente. La identidad no es arcoíris.

---

## 8. Tipografía: Recursive como sistema completo

Recursive no se usa como una sola fuente plana. Sus ejes crean tres voces relacionadas.

### 8.1 Voces

| Voz | Ejes | Uso |
|---|---|---|
| **Linear** | `"MONO" 0, "CASL" 0, "slnt" 0, "CRSV" 0.5` | Cuerpo, formularios, navegación, textos críticos. |
| **Casual** | `"MONO" 0, "CASL" 1, "slnt" 0, "CRSV" 0.5` | Titulares, marca, botones, momentos emocionales. |
| **Mono** | `"MONO" 1, "CASL" 0, "slnt" 0, "CRSV" 0.5` | Montos, direcciones, recibos, tasas, fechas y código. |

La app debe incorporar `@fontsource-variable/recursive` y servir la fuente localmente, igual que la landing. No depender de Google Fonts en runtime.

### 8.2 Escala móvil

| Estilo | Tamaño / línea | Peso | Voz |
|---|---|---:|---|
| Display hero | 48/46 | 900 | Casual |
| Balance | 44/44 | 700 | Mono |
| H1 | 34/36 | 850 | Casual |
| H2 | 26/30 | 800 | Casual |
| H3 | 20/24 | 750 | Casual |
| Body large | 17/26 | 450 | Linear |
| Body | 15/23 | 430 | Linear |
| Label | 13/18 | 650 | Linear |
| Caption | 12/17 | 500 | Linear |
| Micro | 11/15 | 600 | Mono o Linear |

### 8.3 Reglas

- Montos siempre con `font-variant-numeric: tabular-nums`.
- No usar `font-weight: 1000` en párrafos.
- Uppercase solo en etiquetas de una o dos palabras; tracking `0.08em` máximo.
- Titulares Casual; datos y detalles técnicos Mono; copy crítico Linear.
- No mezclar las tres voces dentro de una misma frase.
- El gradiente no rellena texto de UI. La marca se expresa con color sólido y ritmo.

---

## 9. Geometría, layout y profundidad

### 9.1 Dos cuadrículas coordinadas

- **Pixel grid:** 4 px. Alinea sprites, bordes escalonados, patrones y animación por pasos.
- **UI grid:** 8 px. Alinea spacing, controles y ritmo de pantalla.

Escala de espacio: `4, 8, 12, 16, 24, 32, 40, 56, 72, 96`.

### 9.2 Radios

| Token | Valor | Uso |
|---|---:|---|
| `radius-pixel` | 4 px | Badges y piezas pixel. |
| `radius-control` | 14 px | Inputs, filas y action tiles. |
| `radius-card` | 20 px | Tarjetas financieras. |
| `radius-dialog` | 28 px | Sheets y modales. |
| `radius-pill` | 999 px | Chips, tabs y botones compactos. |

No todo debe ser píldora. La tensión entre curvas cálidas y muescas pixel crea identidad.

### 9.3 Muesca de Meli

Tarjetas editoriales y botones de marca pueden retirar un cuadrado de 8 × 8 px en una esquina mediante máscara o pseudo-elemento. Nunca usar la muesca en inputs, QR, tablas o componentes donde pueda confundirse con recorte/error.

### 9.4 Sombras

- `e1`: separación suave para filas elevadas.
- `e2`: tarjetas principales.
- `e3`: sheets y receipts.
- `pixel`: `4px 4px 0 cat-700` para botones o stickers; desaparece al presionar.
- `glow`: Cat Fire a 14–22% detrás de Meli o de una acción principal.

Usar una sola estrategia por objeto. No mezclar glow, blur y shadow duro en todos los componentes.

### 9.5 Responsive

- Core mobile: 360–480 px.
- Contenido transaccional: máximo 480 px incluso en desktop.
- En desktop, panel lateral opcional con contexto/actividad; nunca estirar un formulario financiero a toda la pantalla.
- Safe areas obligatorias.
- En pantallas anchas, Pixel Rails ocupa el aire lateral sin invadir la tarea.

---

## 10. Lenguaje gráfico

### 10.1 Pixel Rails

Son rutas de bloques 4 × 4 u 8 × 8 que explican movimiento:

- una ruta recta = movimiento directo;
- una bifurcación = decisión del usuario;
- un bloque que avanza = transacción;
- un bloque que pulsa = espera;
- una ruta que vuelve = retiro a Disponible;
- una ruta punteada = capacidad futura o no confirmada.

Los Pixel Rails no se usan como simple borde decorativo. Cada ruta debe corresponder a un estado o historia.

### 10.2 Bigotes

Tres líneas cortas, derivadas del rostro de Meli, funcionan como:

- separador de sección;
- indicador de dirección;
- asa de bottom sheet;
- visualización mínima de “más caminos”.

No reemplazan el icono de menú ni se convierten en hamburguesa confusa.

### 10.3 Iconos

- Grilla 24 × 24.
- Stroke 1.75–2 px, extremos redondos.
- Una muesca o píxel cuadrado máximo como firma.
- Nunca rellenar todos los iconos con colores distintos.
- Iconos funcionales heredan el color del texto; los fondos semánticos son tenues.
- Los activos USDC, ETH y WBTC conservan sus logos oficiales.

### 10.4 Ilustración

- Meli y objetos financieros en pixel art de baja paleta.
- Escalas enteras: 1×, 2×, 3×, 4×.
- `image-rendering: pixelated` solo en sprites; nunca en QR, texto o logos de tokens.
- Fondos con dithering controlado, no ruido fotográfico genérico.
- Evitar estética arcade neon/cyberpunk. GatoPago es cálida, no retro por nostalgia.

### 10.5 Fotografía

Para landing y campañas:

- personas reales de LATAM en contextos cotidianos;
- luz cálida, contraste alto, encuadres cercanos;
- mezcla de vida diaria y producto tangible;
- overlays pixel mínimos que conectan la foto con la UI;
- no manos sosteniendo teléfonos genéricos en todas las piezas;
- no imagery de traders, gráficos de velas, Lamborghinis o monedas flotantes.

---

## 11. Arquitectura de GatoPago UI

El sistema se divide por responsabilidad. Los componentes de marca no deben contaminar los componentes financieros con lógica de negocio.

```text
components/
├─ brand/
│  ├─ CatMark.tsx
│  ├─ CatGlyph.tsx
│  ├─ CatSprite.tsx
│  ├─ BrandLockup.tsx
│  └─ PixelRail.tsx
├─ ui/
│  ├─ Button.tsx
│  ├─ IconButton.tsx
│  ├─ Input.tsx
│  ├─ Select.tsx
│  ├─ SegmentedControl.tsx
│  ├─ Card.tsx
│  ├─ Badge.tsx
│  ├─ Dialog.tsx
│  ├─ Sheet.tsx
│  └─ Toast.tsx
├─ money/
│  ├─ MoneyAmount.tsx
│  ├─ AmountInput.tsx
│  ├─ BalanceCard.tsx
│  ├─ MoneyStateCard.tsx
│  ├─ MoneyConfirmSheet.tsx
│  ├─ QuoteSummary.tsx
│  ├─ TokenSelect.tsx
│  ├─ NetworkRoute.tsx
│  ├─ ActivityRow.tsx
│  └─ Receipt.tsx
└─ feedback/
   ├─ MoneyJourney.tsx
   ├─ OutcomeScreen.tsx
   ├─ EmptyState.tsx
   ├─ ErrorState.tsx
   ├─ Skeleton.tsx
   └─ StatusToast.tsx
```

### Principios de API

- Base → variante → tamaño → estado → override.
- Props semánticas: `intent="money"`, no `className="bg-[#F85239]"`.
- Ningún componente recibe HEX desde una página.
- React 19: `ref` como prop; evitar wrappers innecesarios.
- No agregar una librería de componentes por defecto. El `useDialog` actual, portales y manejo de foco son una base válida.
- i18n permanece fuera del primitive cuando sea posible; el componente recibe labels traducidos.
- Todos los componentes de dinero soportan loading, error, pending, success y datos ausentes.

---

## 12. Botones

### 12.1 Anatomía

- Altura estándar: 52 px.
- Compacto: 44 px.
- Target mínimo: 44 × 44 px.
- Padding horizontal: 20–24 px.
- Radio: 14 px para acciones principales; pill solo para acciones compactas.
- Label en Recursive Casual 700 o Linear 650.
- Icono 18–20 px.
- Una acción primaria visible por bloque.

### 12.2 Variantes

| Variante | Apariencia | Uso |
|---|---|---|
| `brand` | Cat Fire, texto `on-cat`, sombra pixel | Continuar, crear, guardar, compartir. |
| `money` | Cat Fire + borde inferior Cat Shadow + icono de huella/candado | Confirmación final que mueve dinero. |
| `secondary` | `surface-2`, texto principal | Alternativa clara. |
| `quiet` | Transparente, texto muted | Cancelar, ver detalles, después. |
| `danger` | Berry tonal + icono + label explícito | Salir, cancelar recovery, remover. |
| `icon` | 44 × 44, superficie tonal | Escanear, copiar, menú, visibilidad. |
| `link` | Texto con underline en hover/focus | Navegación editorial, no acción crítica. |

### 12.3 Estados

| Estado | Comportamiento |
|---|---|
| Hover | Sube 2 px; sombra pixel aumenta un módulo. Solo pointer fino. |
| Active | Baja 2 px y colapsa la sombra; haptic `light` en móvil compatible. |
| Focus | Ring de 3 px Cat Fire + offset de 3 px. |
| Loading | Mantiene label y ancho; un bloque viaja por el borde. No spinner aislado. |
| Success | El icono se convierte en check por 500–700 ms antes de navegar. |
| Disabled | Superficie desaturada, texto legible y razón cercana; no solo opacidad. |

### 12.4 Copy

Los botones dicen qué ocurrirá:

- “Crear link”, no “Continuar”.
- “Enviar $35 USDC”, no “Confirmar”.
- “Mover $100 a Creciendo”, no “Depositar”.
- “Volver a Disponible”, no “Withdraw”.
- “Cancelar recuperación”, no “Cancelar” aislado.

---

## 13. Inputs y controles financieros

### 13.1 Input normal

- Label siempre visible.
- Altura 52 px.
- Placeholder no reemplaza label.
- Fondo `surface-2`; borde fuerte solo en focus/error.
- Ayuda debajo, no dentro del placeholder.
- Error explica corrección, no repite “inválido”.

### 13.2 AmountInput

- El monto es el primer foco visual.
- Números en Recursive Mono.
- Unidad visible y seleccionable sin desplazar el monto.
- “Usar todo” muestra el balance, pero el servidor resuelve el entero exacto.
- Separador decimal localizado; el valor de backend no depende del formato visual.
- Nunca animar dígitos mientras el usuario escribe.

### 13.3 Selectores

- Token: logo oficial, nombre, balance y estado de disponibilidad.
- Red: en capa avanzada o cuando la elección sea necesaria.
- Segmentados: máximo 3 opciones visibles.
- Picker largo: bottom sheet con búsqueda.

### 13.4 QR

- El QR conserva módulos y quiet zone sin decoración interna.
- Meli puede rodear el QR, nunca invadirlo.
- La línea de escaneo se mueve con `transform`; se apaga al detectar.
- Siempre ofrecer fallback manual.

---

## 14. Tarjetas y superficies

### 14.1 BalanceCard

La Home no empieza con una lista de tokens. Empieza con el estado del dinero.

Anatomía:

1. Label “Disponible”.
2. Monto principal.
3. Unidad/selector discreto.
4. Estado de frescura.
5. Acciones rápidas o acceso a Mover.
6. Pixel Rail corto que conecta con Creciendo.

El gato no ocupa el centro de esta tarjeta. Puede asomarse desde una esquina solo si no compite con el monto.

### 14.2 MoneyStateCard

- `Disponible`: Cat Fire como detalle, no como fondo completo.
- `Creciendo`: Growth solo en tasa, ganancia y ruta activa.
- `Otros activos`: neutral y contextual; los token icons aportan color sin crear una sección llamada “Web3”.
- Card futura: Ember en modo editorial con borde punteado y “Acceso anticipado”.

### 14.3 ActionTile

- Icono grande 24 px.
- Verbo + explicación de una línea.
- Una muesca pixel opcional.
- Nunca más de cuatro en un hub visible.

### 14.4 ActivityRow

Debe contar una historia:

```text
Pagaste a @ana
Diseño del logo · hoy, 18:42                 −$35
Completado
```

El estado no depende solo de color. El hash vive en el recibo, no en la fila.

### 14.5 Receipt

El recibo es una pieza de marca compartible:

- variante clara por defecto para parecer documento;
- Cat Glyph y wordmark;
- borde superior de bloques Ember;
- monto, persona, concepto, fecha, red y número de comprobante;
- QR/enlace de verificación opcional;
- sin balance total ni datos privados;
- exportable a imagen con metadata mínima.

---

## 15. Diálogos, modales y sheets

Todos nacen de un `DialogRoot` común: portal, bloqueo de scroll, foco inicial, focus trap, retorno de foco, `aria-modal`, label, descripción, Escape/Back y safe-area.

### 15.1 Tipos

| Tipo | Forma | Se puede cerrar | Uso |
|---|---|---|---|
| `ActionSheet` | Bottom sheet | Tap fuera, swipe, cerrar | Menús y elecciones reversibles. |
| `PickerSheet` | Bottom sheet alto | Sí | Token, red, país, contacto. |
| `MoneyConfirmSheet` | Bottom sheet | Sí antes de firmar | Confirmación única para todo movimiento. |
| `PasskeyStage` | Overlay sobrio | El OS decide | Puente hacia huella/Face ID. |
| `MoneyJourney` | Full-screen | No mientras se envía; sí para background si es seguro | Progreso transaccional. |
| `OutcomeSheet` | Sheet o screen | Sí | Éxito, pendiente o fallo. |
| `ReceiptSheet` | Modal centrado/sheet | Sí | Comprobante. |
| `RiskDisclosure` | Sheet alto | Sí; lectura explícita | Aave, permisos, límites. |
| `DangerDialog` | Modal compacto | Solo botones explícitos | Salir, revocar, cancelar recovery. |
| `EducationPopover` | Popover | Sí | Definiciones breves. |
| `BlockingDialog` | Full-screen | No | Solo incidente de seguridad, versión incompatible o mantenimiento real. |

### 15.2 MoneyConfirmSheet

Orden fijo para crear memoria muscular:

1. Meli Glyph pequeño + tipo de movimiento.
2. Monto grande.
3. Destinatario/origen.
4. Concepto.
5. Recibirás / mínimo / fee / red, según corresponda.
6. Línea de confianza.
7. Advertencia si existe.
8. Botón `money`: “Enviar $35 USDC”.
9. Acción quiet: “Cancelar”.

No reordenar esta jerarquía por pantalla.

### 15.3 Dismissal

- Antes de firmar: siempre cancelable.
- Durante preparación local: cancelable si no se envió nada.
- Después de broadcast: cerrar solo cambia de pantalla; no sugiere que se canceló.
- Pendiente largo: permitir “Seguir en segundo plano” y persistir el seguimiento.
- Un tap fuera nunca confirma ni destruye.

### 15.4 Backdrop

Ink al 72–78%, blur máximo 8 px. El blur no debe ocultar el hecho de que se abrió una capa sobre la pantalla actual.

---

## 16. Estados y feedback

### 16.1 La secuencia universal del dinero

```text
Revisando → Confirma con tu huella → Preparando → Enviado → Verificando → Listo
```

Cada producto adapta el verbo sin inventar una máquina de estados distinta.

### 16.2 Copy de referencia

| Estado real | Copy |
|---|---|
| Esperando passkey | “Confirma con tu huella.” |
| Preparando UserOp | “Preparando el movimiento.” |
| Broadcast | “Ya salió de tu cuenta.” |
| Esperando red | “Esperando confirmación de la red.” |
| Cross-chain burn | “El USDC salió de Arbitrum.” |
| Cross-chain attestation | “Preparando la llegada a Base.” |
| Éxito | “Listo. @ana recibió $35 USDC.” |
| Cancelación de passkey | “Cancelaste la huella. No se movió dinero.” |
| Fallo antes de enviar | “No pudimos preparar el pago. Tu saldo no se movió.” |
| Timeout | “Está tardando más de lo normal. Seguimos verificando.” |

### 16.3 Meli por estado

- Idle: respira y parpadea.
- Preparando: ordena tres píxeles delante de sí.
- Firmando: pone una pata sobre un bloque; la atención está en el prompt del OS.
- Enviado: empuja el bloque hacia un Pixel Rail.
- Pendiente: observa el bloque, sin loop frenético.
- Éxito: cola dibuja un check y el gato hace un “purr bounce” de 4 px.
- Error recuperable: orejas bajan un frame y vuelven; no animación triste larga.
- Error crítico: Meli queda quieta; manda el texto.

### 16.4 Toasts

- Success, info, warning, error y loading.
- Máximo dos visibles.
- 4–6 s; persiste si requiere acción.
- No usar toast como única confirmación de un movimiento financiero.
- En móvil aparece arriba para no competir con navegación y sheets.

### 16.5 Empty states

Estructura:

1. Pequeño sprite contextual.
2. Qué falta.
3. Por qué importa.
4. Una acción.

Ejemplo: “Todavía no tienes movimientos. Crea un link y Meli guardará aquí cada pago.”

### 16.6 Skeletons

- Reproducen la geometría final.
- Barrido de un único píxel luminoso, no shimmer grande.
- Se detienen con reduced motion.

---

## 17. Purr Motion

### 17.1 Principio

El movimiento explica estado, causa y dirección. Si una animación no responde “qué cambió” o “hacia dónde va”, se elimina.

### 17.2 Escala temporal

| Token | Duración | Uso |
|---|---:|---|
| `instant` | 80 ms | Feedback táctil. |
| `snap` | 140 ms | Icono, hover, chip. |
| `move` | 220 ms | Card, selección, transición corta. |
| `sheet` | 320 ms | Sheets y diálogos. |
| `journey` | 480 ms | Cambio de etapa. |
| `celebrate` | 680 ms | Éxito único. |
| `ambient` | 2400–6000 ms | Parpadeo, respiración, fondo. |

### 17.3 Easings

- Entrada: `cubic-bezier(.16, 1, .3, 1)`.
- Salida: `cubic-bezier(.4, 0, 1, 1)`.
- Press: `cubic-bezier(.2, .8, .2, 1)`.
- Pixel: `steps(n, end)`.

### 17.4 Animaciones de firma

| Nombre | Qué hace | Dónde |
|---|---|---|
| `pixel-reveal` | Construye de izquierda a derecha en 4–6 pasos. | Titles, stickers, no body copy. |
| `paw-press` | Botón baja 2 px y colapsa su sombra. | Todas las acciones. |
| `packet-run` | Un bloque recorre un rail. | Pago, cross-chain, share. |
| `cat-blink` | Dos frames rápidos. | Idle. |
| `purr-bounce` | Escala 1 → 1.03 → 1, traslada 4 px. | Éxito. |
| `tail-check` | La cola dibuja una marca. | Outcome. |
| `receipt-print` | El recibo aparece por filas desde arriba. | Comprobante. |
| `scan-lock` | Marco QR se contrae 4 px al detectar. | Escáner. |
| `growth-sprout` | Tres píxeles suben con la ganancia real. | Creciendo. |

### 17.5 Reglas de rendimiento

- Animar `transform` y `opacity`.
- `clip-path` solo en elementos pequeños y breves.
- Nunca animar `filter`, `top`, `left`, `width` o blur continuamente en mobile.
- Sprites empaquetados en WebP/AVIF o SVG discreto; cargar los de una pantalla bajo demanda.
- `will-change` se añade durante la interacción, no permanentemente a toda la app.
- Loops ambientales máximos: uno visible por viewport.

### 17.6 Reduced motion

Con `prefers-reduced-motion: reduce`:

- los rails saltan al estado final;
- el gato no parpadea ni rebota;
- sheets aparecen con fade de 80 ms o instantáneamente;
- el progreso mantiene texto y estados;
- ningún significado desaparece.

---

## 18. Sonido y háptica

Son opcionales, apagados por defecto en web y configurables en app instalada.

- Tap: haptic light.
- Confirmación biométrica: controlada por el sistema operativo.
- Pago completado: haptic success + sonido corto tipo “pop/purr”, menor a 350 ms.
- Error: haptic warning; no alarma.
- No sonidos al contar dinero, crecer o navegar.
- Respetar silent mode y preferencias del dispositivo.

---

## 19. Juego, sorpresa y detalles bonitos

La gamificación premia comprensión, seguridad y autonomía. Nunca premia depositar más, hacer más swaps, perseguir APY, mantener rachas financieras o asumir riesgo.

### 19.1 Patio

Un espacio opcional dentro de Perfil. La mascota vive en una pequeña habitación pixel que cambia con hitos saludables:

- crear backup key;
- completar onboarding;
- leer y aceptar la explicación de Creciendo;
- crear el primer link;
- recibir el primer pago;
- exportar el primer comprobante;
- revisar permisos;
- completar una recuperación simulada en testnet.

Los objetos son cosméticos: cojín, planta, ventana, taza, lámpara. No tienen precio, token ni rareza monetizable.

### 19.2 Ruta de los siete caminos

Mini experiencia educativa de 45–60 s durante onboarding o Ayuda. El usuario arrastra un bloque de dinero desde Disponible hacia:

1. Enviar.
2. Cobrar.
3. Agregar.
4. Cambiar.
5. Creciendo.
6. Retirar.
7. Card futura.

Al llegar a cada destino aparece una explicación de una línea. Card usa ruta punteada y “Acceso anticipado”. No se presenta como disponible.

### 19.3 Atrapa el bloque

Mini juego de 10–15 s exclusivo de **testnet/demo** y del faucet `/test-funds`. Meli atrapa bloques Cat Fire y evita bloques rotos. Sirve para llenar una espera no financiera; no entrega dinero, tokens, puntos canjeables ni prioridad.

### 19.4 Easter eggs

- Siete taps lentos sobre Meli activan “modo siesta” durante esa sesión.
- Al copiar una dirección, un bigote se convierte en un pequeño rail.
- En cumpleaños de la cuenta, Meli usa un gorro durante 24 h.
- Un recibo de exactamente `7.00` puede incluir una huella minúscula no intrusiva.

No colocar Easter eggs en confirmaciones, recovery, errores o disclosure de riesgo.

### 19.5 Colección de estampas

El usuario puede elegir un sello para receipts: Meli dormida, Meli viajera, Meli jardinera. Los sellos no cambian el contenido legal ni la información de verificación.

### 19.6 Principios éticos

- Sin loot boxes.
- Sin streaks de pagos.
- Sin confetti por rendimiento o tamaño de depósito.
- Sin FOMO, pérdidas simuladas o countdowns falsos.
- Sin recompensas por abrir posiciones de riesgo.
- La diversión siempre es descartable y nunca bloquea el flujo.

---

## 20. Navegación

### Alpha

1. **Inicio**
2. **Mover**
3. **Crecer**
4. **Actividad**

Perfil y Seguridad quedan en el account sheet. Escanear puede ser una acción rápida prominente.

### Cuando Card esté activa

1. Inicio
2. Card
3. Mover
4. Crecer
5. Actividad

No existe una tab vacía. Card entra cuando el producto puede completar tareas reales.

### DockNav

- Fondo Ink elevado.
- Selección: Cat Fire + label; no un color distinto por tab.
- Iconos neutrales; Meli no reemplaza todos los iconos.
- Transición de 140 ms, sin burbujas elásticas.
- Debe dejar espacio a safe area y teclado.

---

## 21. Rediseño pantalla por pantalla

| Ruta/superficie | Objetivo visual | Momento de Meli / motion | Componentes clave |
|---|---|---|---|
| `/login` | Presentar control y carácter, no una lista de features. | Meli se construye por filas pixel y mira al CTA. | `BrandLockup`, `Button`, `Notice`. |
| `/onboarding` | 3 pasos: identidad, passkey, listo. | Cola funciona como progreso; cada paso añade un tramo. | `OnboardingStep`, `Input`, `PasskeyStage`. |
| `/` Home | Estado del dinero, no catálogo de tokens. | Un rail une Disponible y Creciendo; Meli aparece solo en estado vacío/seguridad. | `BalanceCard`, `MoneyStateCard`, `ActivityRow`, `DockNav`. |
| `/move` | Hub de intenciones humanas. | Bigotes se abren como siete caminos al entrar. | `ActionTile`, `PixelRail`, `BackHeader`. |
| `/charge` | Crear un cobro en menos de 20 s. | El link sale como una tira de recibo que Meli sostiene. | `AmountInput`, `PaymentLinkCard`, `ShareSheet`. |
| `/receive` | Hub para agregar dinero propio. | Meli guía con una linterna pixel hacia dirección, Binance u otra red. | `AddressQRCard`, `DepositOption`, `NetworkDetails`. |
| `/scan` | Cámara confiable y directa. | Pupilas siguen el centro del marco; se congelan al detectar. | `ScanFrame`, `PermissionState`, `ManualFallback`. |
| `/send` / PayPage | Checkout anti-phishing, receptor primero. | Meli queda como sello de confianza, sin loop. | `PayeeCard`, `AmountInput`, `MoneyConfirmSheet`. |
| `/pay/status` | Mostrar verdad del estado. | Bloque viaja por etapas; tail-check al completar. | `MoneyJourney`, `OutcomeScreen`, `Receipt`. |
| `/swap` | Dos bolsillos que intercambian valor. | La cola forma el botón de invertir tokens; sin celebración por swap. | `TokenAmount`, `QuoteSummary`, `MoneyConfirmSheet`. |
| `/earn` | “Disponible ↔ Creciendo”, no tienda DeFi. | Pequeño jardín pixel cambia solo con datos reales; Meli duerme junto al saldo. | `GrowthCard`, `RiskDisclosure`, `MoneyConfirmSheet`. |
| `/crosschain` | Ruta entre orígenes y destinos. | Metro-map pixel y un único packet que avanza por estados CCTP. | `NetworkRoute`, `CrosschainTimeline`, `OutcomeScreen`. |
| `/cc/:recipient` | Checkout externo claro. | Sello Meli pequeño; receptor y monto dominan. | `TrustHeader`, `WalletConnect`, `MoneyConfirmSheet`. |
| `/contacts` | Personas antes que direcciones. | Bigotes conectan avatares conocidos; cero mapa de red cripto. | `ContactRow`, `SearchInput`, `InviteCard`. |
| `/statement` | Historia del dinero y filtros útiles. | Recibos se ordenan al cambiar filtro, 140 ms. | `FilterSheet`, `ActivityRow`, `ReceiptSheet`. |
| `/profile` | Identidad, username y Patio. | Personalización cosmética opcional. | `ProfileHeader`, `MeliRoom`, `ShareProfile`. |
| `/settings` | Preferencias tranquilas. | Meli duerme; casi sin motion. | `SettingsSection`, `Select`, `Toggle`. |
| `/security` | Hacer visible control y recovery. | Meli guarda una llave; se queda quieta al explicar riesgos. | `SecurityStatus`, `KeyRow`, `EducationPopover`. |
| `/recover` | Recuperación exacta, seria y cancelable. | Sin juego; solo un Pixel Rail temporal de 48 h. | `RecoveryTimeline`, `DangerDialog`, `OutcomeScreen`. |
| `/test-funds` | Sandbox explícito. | Atrapa el bloque puede llenar la espera. | `TestnetBadge`, `FaucetStatus`, `MiniGame`. |
| Card waitlist | Recoger evidencia, no fingir producto. | Tarjeta conceptual Ember con borde punteado. | `CardPreview`, `InterestSheet`, `PendingBadge`. |

### 21.1 Login propuesto

```text
                 [ Meli completa, sin recorte ]

          Tus dólares ya saben moverse.
 Cobra, paga, cambia y haz crecer dólares
    desde una cuenta que tú controlas.

              [ Entrar a GatoPago ]
               Continuar con correo

        Sin contraseña. Tu huella es tu llave.
```

El CTA no debe quedar pegado al borde inferior en teléfonos altos; el layout respira, pero mantiene la acción visible sin scroll en 390 × 844.

### 21.2 Home propuesta

```text
[ Meli glyph + @daniel ]                [ Escanear ] [ avatar ]

┌─ Disponible ─────────────────────────────────────────────┐
│ $ 1,248.32                                       [ USDC ] │
│ Listo para usar                                           │
│ [ Agregar ] [ Enviar ] [ Cobrar ]                         │
└───────────────────■────────────────────────────────────────┘
                    └─ pixel rail
┌─ Creciendo ───────────────────────────────────────────────┐
│ $ 320.00                         +$2.14 · 4.2% variable    │
│ [ Mover a Creciendo ]                 [ Ver riesgos ]      │
└────────────────────────────────────────────────────────────┘

[ Card — acceso anticipado ]

Actividad reciente
…
```

Otros activos solo aparecen donde exista una acción o posición real. La dirección 0x vive en detalles.

---

## 22. Landing y marketing

### 22.1 Ritmo

Alternar cuatro tipos de escena:

1. Noche GatoPago con hero y gato completo.
2. Leche GatoPago para explicar el ciclo del dinero.
3. Bloque Ember para Card/visión futura, claramente etiquetada.
4. Producto real sobre Noche para features actuales.

No repetir fondos negros idénticos en toda la página.

### 22.2 Hero

- Gato PNG completo y transparente, nunca recortado.
- Pixel Rails detrás del gato con opacidad baja.
- H1 actual: “Tus dólares ya saben moverse.”
- Apoyo: “Cobra, paga, cambia y haz crecer dólares digitales desde una cuenta que tú controlas.”
- CTA Cat Fire: “Probar la alpha”.
- Badge honesto: “Alpha pública · Arbitrum Sepolia · fondos de prueba”.
- Al cargar, gato → título → copy → CTA, con stagger total menor a 700 ms.

### 22.3 Scroll story

Un bloque de dinero recorre la landing:

```text
Recibir → Disponible → Creciendo → volver → Pagar
```

La Card aparece como ramal punteado “acceso anticipado”; otros activos, solo como una puerta contextual. La animación explica el producto sin convertir la página en un videojuego.

### 22.4 Secciones

1. Hero.
2. Ciclo de vida del dinero.
3. Recibe/Cobra.
4. Disponible.
5. Creciendo con Aave y riesgos visibles.
6. Mover/Cambiar/Cross-chain.
7. Card acceso anticipado.
8. Control, passkeys y recovery.
9. Developers/API.
10. Estado alpha y límites.
11. CTA final.

### 22.5 Social y campañas

- Avatar: Cat Glyph, no el PNG completo reducido dentro de un cuadrado.
- Cover: Meli cruza un Pixel Rail de Disponible a Creciendo.
- OG article: título grande Casual + un solo objeto pixel.
- Comprobante compartido: formato propio, nunca screenshot crudo de la app.
- Video corto: 6–8 s, un movimiento completo, sin montaje frenético.

---

## 23. Qué tomar de Takenos y qué no

La web y la página de rebranding actuales de Takenos muestran una marca más vívida y energética, con grandes campos de color, fotografía de uso cotidiano, patrón cuadriculado/pixel, jerarquía fuerte de tarjeta y mensajes locales muy directos.

### Adaptar como principio

- El producto debe sentirse tangible, no una abstracción Web3.
- Grandes cambios de ritmo entre secciones.
- Color con valentía y función.
- Tipografía que no pide disculpas.
- Fotografía y contexto latinoamericano.
- Movimiento geométrico que acompaña el relato.
- Mostrar qué puede hacer el dinero, no la infraestructura que lo ejecuta.

### No copiar

- Paleta púrpura/naranja.
- Checkerboard exacto.
- Composición de hero, tarjetas o fotografía.
- Claim de conexión global.
- Voseo y tono argentino.
- Identidad de tarjetas o símbolos de Takenos.

La firma propia de GatoPago es **gato vermilion + Pixel Rails + estados del dinero + autocustodia visible**.

Referencias revisadas el 17-08-2026:

- [Takenos Bolivia](https://takenos.com/bolivia)
- [Takenos — nueva identidad](https://takenos.com/crecimos-nueva-identidad)

---

## 24. Tokens Tailwind v4 listos para migrar

Este bloque expresa la dirección; debe introducirse en `client/src/index.css` después de eliminar gradualmente los aliases viejos.

```css
@import "tailwindcss";

@theme {
  /* Brand — sampled from the cat artwork */
  --color-cat-50: #fff0eb;
  --color-cat-300: #ff8065;
  --color-cat-500: #f85239;
  --color-cat-700: #cf3433;
  --color-cat-900: #601f16;
  --color-on-cat: #210805;

  /* Dark roles */
  --color-canvas: #0b0b0f;
  --color-canvas-raised: #111116;
  --color-surface: #17171d;
  --color-surface-2: #202028;
  --color-surface-3: #292932;
  --color-border: #33313a;
  --color-border-strong: #6a616d;
  --color-text: #fff7ef;
  --color-text-muted: #c9bdb5;
  --color-text-faint: #9c918b;

  /* Semantic — never decorative */
  --color-growth: #71d5a1;
  --color-info: #79b9ff;
  --color-pending: #f6c65b;
  --color-danger: #ff6b7a;

  /* Typography */
  --font-sans: "Recursive Variable", "Recursive", system-ui, sans-serif;
  --font-display: "Recursive Variable", "Recursive", system-ui, sans-serif;
  --font-mono: "Recursive Variable", "Recursive", ui-monospace, monospace;

  /* Geometry */
  --radius-pixel: 4px;
  --radius-control: 14px;
  --radius-card: 20px;
  --radius-dialog: 28px;
  --radius-pill: 999px;

  /* Elevation */
  --shadow-e1: 0 8px 24px rgb(0 0 0 / 0.28);
  --shadow-e2: 0 18px 48px rgb(0 0 0 / 0.38);
  --shadow-e3: 0 30px 90px rgb(0 0 0 / 0.54);
  --shadow-pixel: 4px 4px 0 #cf3433;
  --shadow-cat-glow: 0 0 36px rgb(248 82 57 / 0.2);

  /* Motion */
  --ease-enter: cubic-bezier(.16, 1, .3, 1);
  --ease-exit: cubic-bezier(.4, 0, 1, 1);
  --ease-press: cubic-bezier(.2, .8, .2, 1);

  --animate-pixel-in: pixel-in 220ms steps(5, end) both;
  --animate-sheet-in: sheet-in 320ms var(--ease-enter) both;
  --animate-purr: purr 680ms var(--ease-enter) both;
  --animate-packet: packet 1200ms steps(8, end) infinite;

  @keyframes pixel-in {
    from { opacity: 0; clip-path: inset(0 100% 0 0); }
    to { opacity: 1; clip-path: inset(0); }
  }

  @keyframes sheet-in {
    from { opacity: 0; transform: translateY(48px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes purr {
    0% { transform: translateY(4px) scale(.98); }
    55% { transform: translateY(-2px) scale(1.03); }
    100% { transform: translateY(0) scale(1); }
  }

  @keyframes packet {
    from { transform: translateX(0); }
    to { transform: translateX(var(--packet-distance, 96px)); }
  }
}

:root {
  color-scheme: dark;
  --recursive-linear: "MONO" 0, "CASL" 0, "slnt" 0, "CRSV" 0.5;
  --recursive-casual: "MONO" 0, "CASL" 1, "slnt" 0, "CRSV" 0.5;
  --recursive-mono: "MONO" 1, "CASL" 0, "slnt" 0, "CRSV" 0.5;
}

[data-theme="light"] {
  color-scheme: light;
  --color-canvas: #fff8f0;
  --color-canvas-raised: #ffffff;
  --color-surface: #ffffff;
  --color-surface-2: #f5eee8;
  --color-surface-3: #ede3dc;
  --color-border: #d9cec7;
  --color-border-strong: #9f8f87;
  --color-text: #1c1211;
  --color-text-muted: #6e5d56;
  --color-text-faint: #7f6c65;
  --color-cat-500: #d23429;
  --color-on-cat: #ffffff;
}

.type-linear { font-variation-settings: var(--recursive-linear); }
.type-casual { font-variation-settings: var(--recursive-casual); }
.type-mono {
  font-variation-settings: var(--recursive-mono);
  font-variant-numeric: tabular-nums;
}

.pixel-art { image-rendering: pixelated; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

### Regla de migración

Durante la transición puede existir un alias temporal, pero las páginas nuevas solo usan roles:

```css
/* temporal, borrar al terminar */
--color-bg: var(--color-canvas);
--color-glow-sky: var(--color-cat-500);
```

No se permiten nuevos `#hex`, `rgb()` o colores Tailwind arbitrarios dentro de TSX.

---

## 25. Mapeo desde los componentes actuales

| Actual | Destino | Acción |
|---|---|---|
| `Logo.tsx` | `brand/CatGlyph.tsx` + `BrandLockup.tsx` | Reemplazar el stack; preservar API temporal. |
| `ConfirmSheet.tsx` | `money/MoneyConfirmSheet.tsx` | Mantener portal/foco; adoptar jerarquía única. |
| `MenuSheet.tsx` | `ui/AccountSheet.tsx` | Migrar filas, identidad y motion. |
| `ReceiptModal.tsx` | `money/ReceiptSheet.tsx` + `Receipt.tsx` | Crear variante clara compartible. |
| `StageOverlay.tsx` | `feedback/MoneyJourney.tsx` | Estados reales + Meli sprite + persistencia. |
| `TxResult.tsx` | `feedback/OutcomeScreen.tsx` | Unificar success/pending/failed. |
| `Screen.tsx` | `ui/AppFrame.tsx` | Safe areas, max width, rails laterales. |
| `OptionCard.tsx` | `ui/ActionTile.tsx` | Variantes semánticas sin HEX por prop. |
| `NoticeCard.tsx` | `ui/Notice.tsx` | Info/warning/danger con icono y copy. |
| `PrimaryNav.tsx` | `ui/DockNav.tsx` | Nueva IA Inicio/Mover/Crecer/Actividad. |
| `Skeleton.tsx` | `feedback/Skeleton.tsx` | Barrido pixel + reduced motion. |
| `ToastViewport.tsx` | `feedback/ToastViewport.tsx` | Variantes y límite de pila. |
| `TokenSelect.tsx` | `money/TokenPicker.tsx` | Mantener logos oficiales y balances. |
| `AmountInput.tsx` | `money/AmountInput.tsx` | Recursive Mono y formato localizado. |
| `CrosschainTimeline.tsx` | `money/NetworkRoute.tsx` | Pixel Rail basado en la máquina CCTP. |
| `FinancialPrimitives.tsx` | primitives separados | Evitar un archivo cajón de sastre. |

### Archivos de impacto directo

- `client/src/index.css`
- `client/src/App.tsx`
- `client/src/components/Logo.tsx`
- `client/src/components/ConfirmSheet.tsx`
- `client/src/components/MenuSheet.tsx`
- `client/src/components/ReceiptModal.tsx`
- `client/src/components/StageOverlay.tsx`
- `client/src/components/TxResult.tsx`
- `client/src/components/PrimaryNav.tsx`
- `client/src/pages/Login.tsx`
- `client/src/pages/Onboarding.tsx`
- `client/src/pages/Home.tsx`
- todas las pantallas de movimiento listadas en §21
- `client/src/locales/es.json`
- `client/src/locales/en.json`
- landing Astro: `src/styles/global.css`, layout y componentes de marca

---

## 26. Accesibilidad y seguridad perceptual

### Obligatorio

- WCAG AA para todo texto funcional.
- 44 × 44 px mínimo en objetivos táctiles.
- Foco visible; no borrar outline sin sustituto.
- Labels permanentes.
- Errores con `role="alert"`; progreso con `aria-live="polite"`.
- Diálogos con foco inicial, trap, Escape y retorno.
- No depender de color o motion para estado.
- Montos leídos con unidad y signo correctos.
- Dirección y hash con copy accesible completo aunque visualmente se trunquen.
- Soporte a zoom 200% y tamaño de texto del sistema.
- Teclado no tapa CTA ni AmountInput.
- reduced motion completo.
- Dark y light definen `meta[name="theme-color"]` coherente.

### Seguridad perceptual

- Destinatario + monto siempre antes de confirmar.
- Los links de pago tienen encabezado GatoPago verificable.
- Mostrar dominio real en web externa.
- El detalle técnico es accesible, no protagonista.
- Nunca animar un resultado como éxito antes de confirmación autoritativa.
- Si el estado es ambiguo, mostrar “verificando”, no “listo”.
- La animación no puede ocultar fee, riesgo, mínimo recibido o ruta.

---

## 27. Plan de implementación

### Fase 0 — Preparación de activos

1. Vectorizar/limpiar Cat Glyph.
2. Exportar familia completa sin recortes CSS.
3. Crear sprites de 2–8 frames por estado.
4. Generar app icons y favicons mask-safe.
5. Documentar licencia y fuente de cada asset.

**Gate:** legibilidad a 16/24/32 px, fondo claro/oscuro, monocromo y máscara circular.

### Fase 1 — Foundations

1. Instalar/autohospedar Recursive en la app.
2. Introducir tokens Ember & Ink.
3. Crear clases de voces tipográficas.
4. Implementar focus, spacing, radii, elevation y reduced motion.
5. Mantener aliases viejos solo como capa temporal.

**Gate:** ninguna regresión de contraste; build/lint; screenshot matrix.

### Fase 2 — Primitives

1. Button/IconButton.
2. Input/AmountInput/Select/Segmented.
3. Card/Badge/Notice.
4. DialogRoot/SheetRoot.
5. Toast/Skeleton/Empty/Error.

**Gate:** Storybook o galería local de todos los estados, teclado y screen reader.

### Fase 3 — Marca y shell

1. Logo → Cat assets.
2. AppFrame y DockNav.
3. Login.
4. Onboarding.
5. Home.
6. Account sheet y Profile.

**Gate:** flujos de auth sin cambios funcionales; 360/390/430 px; desktop.

### Fase 4 — Dinero

1. Mover.
2. Cobrar/CreateLink.
3. Recibir/Agregar.
4. Scan.
5. PayPage.
6. Swap.
7. Earn.
8. Cross-chain.
9. Actividad y receipts.

**Gate:** cada operación usa el mismo MoneyConfirmSheet, MoneyJourney y OutcomeScreen.

### Fase 5 — Purr Motion

1. Pixel Rails.
2. Sprites del personaje.
3. Transiciones por estado.
4. Haptics opt-in.
5. Presupuesto de performance.

**Gate:** ningún loop jank en teléfono de gama media; reduced motion equivalente.

### Fase 6 — Delicia responsable

1. Patio.
2. Ruta de los siete caminos.
3. Mini juego testnet.
4. Estampas de recibo.
5. Easter eggs.

**Gate:** todo es opcional, no bloquea tareas y no recompensa riesgo/volumen.

### Fase 7 — Landing y ecosistema

1. Hero y ciclo animado.
2. Social assets.
3. Dashboard/API con variante más sobria.
4. Email, push, docs y recibos.
5. Guía de prensa y asset pack.

**Gate:** misma marca, distinta densidad según superficie.

### Fase 8 — Retiro del sistema viejo

1. Eliminar stack logo y assets huérfanos.
2. Eliminar Bricolage/Inter si ya no tienen consumidores.
3. Eliminar tokens sky/pink/cream y HEX inline.
4. Eliminar componentes duplicados.
5. Actualizar manual, README y screenshots.

---

## 28. Checklist de aceptación

### Marca

- [ ] El gato reemplaza al stack en app, landing, favicon, PWA, receipts y social.
- [ ] El PNG completo nunca se recorta por CSS.
- [ ] Existe un asset cuadrado dedicado.
- [ ] El wordmark es legible y consistente.
- [ ] No quedan gradientes celeste/rosa/crema.

### Color y tipo

- [ ] Cat Fire y Cat Shadow son la única firma cromática principal.
- [ ] Los colores semánticos no se usan como decoración.
- [ ] Recursive está autohospedada y usa Linear/Casual/Mono.
- [ ] No hay valores HEX nuevos dentro de TSX.
- [ ] Contraste AA verificado en ambos temas.

### Componentes

- [ ] Una API de Button cubre todas las acciones.
- [ ] Todos los movimientos usan MoneyConfirmSheet.
- [ ] Todas las esperas usan MoneyJourney.
- [ ] Todos los resultados usan OutcomeScreen.
- [ ] Receipt tiene variante compartible.
- [ ] DialogRoot cubre foco, Escape, Back y safe areas.

### Experiencia

- [ ] Home habla de Disponible/Creciendo, no de infraestructura.
- [ ] No existe una sección llamada “Web3”; otros activos aparecen solo cuando son relevantes.
- [ ] Card dice acceso anticipado.
- [ ] La dirección 0x no domina Home.
- [ ] Cada espera explica qué ocurre.
- [ ] Cada error dice si el saldo se movió.
- [ ] Meli no interrumpe riesgo, recovery ni confirmaciones.

### Motion y juego

- [ ] Cada animación explica estado/dirección o se elimina.
- [ ] Solo un loop ambiental por viewport.
- [ ] reduced motion conserva significado.
- [ ] No hay recompensas por volumen, rachas o riesgo.
- [ ] El mini juego solo vive en testnet/demo.

### QA

- [ ] 360 × 800.
- [ ] 390 × 844.
- [ ] 430 × 932.
- [ ] 768 px tablet.
- [ ] 1440 px desktop.
- [ ] Teclado y screen reader.
- [ ] Zoom 200%.
- [ ] Gama media Android/iOS.
- [ ] Build, lint, tests y bundle budget.
- [ ] ES/EN con paridad de keys.

---

## 29. Do / Don’t

### Do

- Usar el gato como sistema, no como sticker aleatorio.
- Explicar movimiento con Pixel Rails.
- Dejar respirar montos y destinatarios.
- Combinar una base sobria con momentos Ember intensos.
- Hacer del recibo una pieza deseable y verificable.
- Usar humor solo cuando no hay dinero ni seguridad en juego.
- Mantener abstracción sin opacidad.

### Don’t

- No recortar el gato para hacerlo entrar en un cuadrado.
- No añadir un fondo negro al PNG transparente.
- No mezclar tres colores porque “se ven fintech”.
- No llenar cada card con glow.
- No convertir cada icono en pixel art.
- No ocultar riesgo detrás de una mascota.
- No mostrar confetti por abrir una posición.
- No copiar el púrpura, naranja o checker de Takenos.
- No convertir GatoPago en CatPay sin una razón legal/estratégica real.
- No desplegar el rediseño por partes incoherentes a producción.

---

## 30. Resultado esperado

La nueva GatoPago debe poder reconocerse sin leer el nombre: un gato vermilion, un fondo Ink, tipografía Recursive y bloques que muestran el camino del dinero.

La app seguirá siendo precisa en los momentos que importan, pero dejará de parecer una wallet genérica. El personaje aportará memoria y calidez; Pixel Rails convertirá la complejidad onchain en movimiento legible; Ember & Ink dará una identidad única; y GatoPago UI evitará que cada nueva función vuelva a fragmentar el producto.

La frase que gobierna cada decisión sigue siendo:

> **Tu dinero sigue siendo tuyo, pero ahora puede hacer más.**
