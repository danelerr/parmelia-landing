Sí. Tu landing debe vender **“mover dinero sin fricción”**, no “wallet”, no “ERC-4337”, no “paymaster”, no “Monad”. Peanut hace eso: vende acciones simples como “tap, scan, anywhere”, “pay like a local” y “paying as easy as a text”, no la arquitectura técnica detrás. ([Peanut][1])

## 1. Posicionamiento principal de Parmelia

Tu frase actual:

> pagos globales, tu dinero es tuyo.

Está bien, pero es muy amplia. Puede ser Wise, Binance, PayPal, Lemon, Belo, Mercado Pago, Gnosis Pay, etc.

Yo lo haría más concreto:

# Parmelia

## Mueve dinero digital como mandar un mensaje.

**Envía, recibe, cambia y guarda tu dinero con links, QR y usernames. Sin bancos, sin vueltas y sin comisiones entre usuarios.**

CTA principal: **Probar Parmelia**
CTA secundario: **Crear mi link de pago**

La idea central no es “somos una wallet”. Es:

> Parmelia es una app para mover dólares digitales de forma simple, sin que la otra persona tenga que entender cripto.

---

# 2. Estructura de landing tipo Peanut

## Bloque 1 — Hero

Color sugerido: crema / amarillo suave
Objetivo: explicar en 3 segundos qué hace Parmelia.

**Título:**

> Mueve dinero digital como mandar un mensaje.

**Subtítulo:**

> Envía, recibe y cambia tu dinero desde una sola app. Usa links, QR o usernames. Fácil para ti, fácil para quien recibe.

**Botones:**

> Probar Parmelia
> Crear link de pago

**Microcopy abajo:**

> Sin comisiones entre usuarios. Sin frases semilla. Sin complicarte con redes.

Visual: teléfono con 3 acciones grandes:

1. Enviar
2. Recibir
3. Cambiar

No pongas “depositar USDC, MON, WBTC” en el hero. Eso va más abajo.

---

## Bloque 2 — Links de pago

Color sugerido: verde menta

**Título:**

> Cobra con un link.

**Texto:**

> Crea un link de pago en segundos y compártelo por WhatsApp, Telegram, Instagram o donde quieras. La otra persona abre el link, paga y listo.

**Frases cortas alrededor:**

> Ideal para freelancers.
> Perfecto para eventos.
> Útil para cobrar rápido.
> No necesitas explicar direcciones largas.

Visual: un link tipo:

> parmelia.me/daniel/25

CTA:

> Crear mi primer link

Este bloque es clave porque los links son tu feature más diferenciable y fácil de entender.

---

## Bloque 3 — QR y usernames

Color sugerido: azul claro o celeste

**Título:**

> También puedes pagar con QR o username.

**Texto:**

> Escanea un QR, busca un username o comparte el tuyo. Parmelia hace que enviar dinero se sienta como usar una app normal.

**Tres cards:**

**Escanea**
Paga en segundos con QR.

**Busca**
Envía a un username, no a una dirección rara.

**Comparte**
Recibe con tu link o tu QR.

Visual: QR grande + username `@daniel`.

---

## Bloque 4 — Envía sin comisiones entre usuarios

Color sugerido: naranja / coral

**Título:**

> Enviar dinero no debería sentirse caro.

**Texto:**

> Mueve tu saldo a otros usuarios de Parmelia sin comisiones. Y si necesitas enviar a una wallet externa, también puedes hacerlo desde la app.

**Microcopy:**

> Tú eliges a quién enviar. Parmelia se encarga de que sea simple.

Aquí puedes decir “sin comisiones”, pero evita “gasless”. Para usuarios normales “gasless” no significa nada.

---

## Bloque 5 — Tu saldo, tus monedas

Color sugerido: blanco / gris suave

**Título:**

> Guarda USDC, MON y WBTC en un solo lugar.

**Texto:**

> Deposita dinero digital en Parmelia y úsalo para pagar, enviar, recibir o cambiar dentro de la app.

**Cards:**

**USDC**
Para pagos y estabilidad.

**MON**
Para moverte dentro del ecosistema Monad.

**WBTC**
Para tener exposición a Bitcoin.

No digas todavía “wallet no custodial 100% on-chain”. Para usuario normal, mejor:

> Tu saldo está bajo tu control, no atrapado dentro de Parmelia.

---

## Bloque 6 — Cambia dentro de la app

Color sugerido: morado / lavanda

**Título:**

> Cambia cuando lo necesites.

**Texto:**

> Convierte entre USDC, MON y WBTC sin salir de Parmelia. Pasa de ahorrar a pagar, o de pagar a guardar valor, en pocos taps.

**Ejemplos visuales:**

> USDC → MON
> MON → USDC
> USDC → WBTC

Aquí sí estás vendiendo swaps, pero como una acción cotidiana, no como DeFi.

---

## Bloque 7 — Earn mode

Color sugerido: verde oscuro o azul noche

**Título:**

> Haz que tu saldo trabaje por ti.

**Texto:**

> Activa el modo Earn cuando quieras y busca generar rendimiento con tu saldo. Tú decides cuándo activarlo y cuándo retirarlo.

**Importante:** no prometas “intereses” como algo fijo. Mejor:

> Rendimientos variables. Siempre bajo tu decisión.

**Cards:**

**Activar**
Elige cuánto poner en Earn.

**Ver**
Mira el rendimiento desde la app.

**Retirar**
Desactívalo cuando quieras.

Este bloque tiene que transmitir control, no inversión agresiva.

---

## Bloque 8 — Desde cualquier red

Color sugerido: negro / azul profundo

Este bloque debería ser “próximamente” si aún no está construido.

**Título:**

> Trae tu dinero desde otras redes.

**Texto:**

> Próximamente podrás depositar desde distintas redes y Parmelia lo convertirá automáticamente para que puedas usarlo dentro de la app.

**Subtexto:**

> Menos pasos. Menos errores. Una sola experiencia.

Esto sí es posible conceptualmente. Uniswap ya documenta flujos donde una cotización puede ser para swap normal, bridge cross-chain o wrap/unwrap, y su API lista Monad como chain soportada para swapping. ([Uniswap Developers][2]) ([Uniswap Developers][3])

Pero ojo: que Uniswap soporte Monad para swaps no significa automáticamente que todos los puentes, tokens y rutas cross-chain estén listos para tu caso exacto. La propia documentación recomienda pedir una quote para confirmar ruta y liquidez disponible. ([Uniswap Developers][3])

---

## Bloque 9 — Retira a donde quieras

Color sugerido: amarillo fuerte o verde lima

**Título:**

> Usa Parmelia, pero no te quedes encerrado.

**Texto:**

> Retira a Monad gratis. Y si necesitas mover tu dinero a otra red, Parmelia buscará la mejor ruta y mostrará el costo antes de confirmar.

Esto es mucho más vendible que decir:

> “cobraremos fee por conversiones cross-chain”.

Para el usuario:

> “te mostramos el costo antes de confirmar”.

Para tu negocio:

> margen en conveniencia cross-chain.

---

## Bloque 10 — Control y seguridad

Color sugerido: blanco / negro

Este bloque reemplaza el discurso técnico.

**Título:**

> Tu dinero sigue siendo tuyo.

**Texto:**

> Parmelia no está diseñada para atraparte. Puedes enviar, recibir, cambiar o retirar tu dinero cuando quieras.

**Tres cards:**

**Sin frases raras**
Entra con una experiencia simple.

**Sin direcciones imposibles**
Usa links, QR y usernames.

**Sin encierro**
Retira a wallets externas cuando lo necesites.

Aquí, si quieres, puedes agregar en letra pequeña:

> Construido sobre infraestructura abierta.

No pongas “ERC-4337” aquí.

---

## Bloque 11 — Casos de uso

Color sugerido: rosa / coral suave

**Título:**

> Hecho para pagos reales.

**Cards:**

**Freelancers**
Cobra trabajos con un link.

**Comunidades**
Recibe pagos para eventos, merch o entradas.

**Amigos**
Divide gastos sin pedir datos bancarios.

**Comercios digitales**
Cobra desde redes sociales o WhatsApp.

**Usuarios cripto**
Mueve stablecoins sin vivir copiando direcciones.

---

## Bloque 12 — CTA final

Color sugerido: negro con texto claro

**Título:**

> Empieza con tu primer link.

**Texto:**

> Crea una cuenta, comparte tu link y empieza a mover dinero digital sin complicarte.

Botones:

> Probar Parmelia
> Crear link de pago

---

# 3. Versión completa de textos para la landing

## Hero

**Mueve dinero digital como mandar un mensaje.**

Envía, recibe, cambia y guarda tu dinero con links, QR y usernames. Sin comisiones entre usuarios. Sin bancos. Sin complicaciones.

**Probar Parmelia**
**Crear link de pago**

---

## Cobra con un link

Crea un link de pago en segundos y compártelo donde ya hablas con tus clientes, amigos o comunidad: WhatsApp, Telegram, Instagram, X o email.

La otra persona abre el link, paga y listo.

---

## Paga con QR o username

No más direcciones largas.
Escanea un QR, busca un username o comparte el tuyo.

Parmelia hace que enviar dinero digital se sienta como usar una app normal.

---

## Envía sin comisiones entre usuarios

Mover dinero no debería sentirse caro.
Envía saldo a otros usuarios de Parmelia sin comisiones y retira a wallets externas cuando lo necesites.

---

## Guarda USDC, MON y WBTC

Mantén tu saldo en la app y úsalo para pagar, recibir, enviar o cambiar.
USDC para estabilidad, MON para moverte en Monad y WBTC para exposición a Bitcoin.

---

## Cambia sin salir de Parmelia

Convierte entre USDC, MON y WBTC desde la app.
Menos pasos, menos pantallas, menos errores.

---

## Earn mode

Activa Earn cuando quieras y busca generar rendimiento con tu saldo.
Tú eliges cuánto activar, cuándo verlo y cuándo retirarlo.

Rendimientos variables. Siempre bajo tu decisión.

---

## Próximamente: trae dinero desde otras redes

Deposita desde distintas redes y Parmelia lo convertirá automáticamente para que puedas usarlo en la app.

Sin puentes confusos.
Sin cambiar de aplicación.
Sin tener que entender cada red.

---

## Tu dinero sigue siendo tuyo

Parmelia no está hecha para encerrarte.
Puedes enviar, recibir, cambiar, activar Earn o retirar cuando quieras.

Simple para usar.
Abierta por debajo.
Bajo tu control.

---

# 5. Estilo visual

Usaría:

**Tipografía:**
Una sans redondeada y amable. Ejemplos: Inter, Satoshi, Geist, Plus Jakarta Sans.

**Botones:**
Grandes, redondeados, con sombra suave.

**Ilustraciones:**
No usar demasiados gráficos de blockchain. Mejor:

* chats
* QR
* links
* teléfonos
* stickers
* recibos
* usernames
* monedas simples
* mapas/rutas simplificadas

**Motion:**
Bloques que entran con scroll.
QR que se transforma en pago exitoso.
Link que viaja de WhatsApp a Parmelia.
Swap USDC → MON con animación simple.

**No usar como elemento principal:**

* nodos
* cadenas
* cubos 3D genéricos
* logos de Ethereum/Monad por todas partes
* diagramas técnicos

---

# 6. Qué NO decir en la landing

Evita estas frases en la parte pública principal:

* “ERC-4337”
* “Account Abstraction”
* “Paymaster”
* “Smart accounts”
* “100% on-chain”
* “Payment intent”
* “Gasless”
* “No custodial” como frase principal
* “Yield farming”
* “Bridge automático”
* “Liquidity routing”

Puedes tener una sección escondida o para builders:

> For builders / Docs

Ahí sí explicas la parte técnica.

---

# 7. Cómo mejorar tu Notion de Parmelia

El problema de tu Notion actual es que mezcla pitch técnico, features, roadmap y visión, pero no define con fuerza:

1. usuario objetivo inicial,
2. caso de uso inicial,
3. promesa concreta,
4. por qué Parmelia es mejor que alternativas,
5. qué está construido hoy vs qué es roadmap.

Yo lo reescribiría así:

---

# Parmelia

## One-liner

Parmelia permite mover dólares digitales con links, QR y usernames, sin comisiones entre usuarios y sin fricción cripto.

## Versión corta

Parmelia es una app de pagos para enviar, recibir, cambiar y guardar dinero digital de forma simple. Los usuarios pueden cobrar con links, pagar con QR, enviar a usernames y retirar a wallets externas, manteniendo control sobre sus fondos.

## Tesis

El mayor problema de cripto no es la infraestructura: es la experiencia.

Hoy enviar stablecoins sigue siendo difícil para usuarios normales: redes, gas, wallets, direcciones, puentes, exchanges y miedo a equivocarse.

Parmelia abstrae esa complejidad y convierte el movimiento de dinero digital en una experiencia parecida a usar una app de pagos tradicional.

## Usuario inicial

Parmelia está pensada inicialmente para:

* usuarios cripto que ya manejan stablecoins, pero quieren una experiencia más simple;
* freelancers y creadores que quieren cobrar con links;
* comunidades y eventos que necesitan recibir pagos rápido;
* usuarios de LATAM que quieren mover dólares digitales sin depender de bancos o procesos lentos.

## Problema

Mover dinero digital sigue siendo demasiado complejo.

Para hacer un pago, un usuario normalmente debe entender:

* qué red usar;
* qué token enviar;
* cómo pagar gas;
* cómo copiar una dirección;
* cómo evitar equivocarse;
* cómo retirar o convertir después.

Esto limita la adopción real de stablecoins como dinero cotidiano.

## Solución

Parmelia convierte esas acciones en flujos simples:

* enviar a un username;
* cobrar con un link;
* pagar con QR;
* cambiar entre activos desde la app;
* activar Earn con consentimiento;
* retirar cuando el usuario quiera.

La infraestructura cripto existe, pero queda invisible para el usuario.

## Qué puede hacer hoy un usuario

1. Depositar USDC, MON o WBTC en Parmelia.
2. Enviar saldo a otros usuarios de Parmelia sin comisión.
3. Enviar a wallets externas.
4. Crear links de pago.
5. Generar códigos QR.
6. Pagar desde un link.
7. Pagar a un username.
8. Escanear códigos QR.
9. Ver historial de transacciones y comprobantes.

## Próximas funciones

1. Swaps entre USDC, MON y WBTC.
2. Earn mode con consentimiento del usuario.
3. Retiro del modo Earn cuando el usuario quiera.
4. Depósitos desde otras redes con conversión automática hacia Monad.
5. Retiros hacia otras redes con fee de conveniencia.
6. Tarjeta prepaga para compras online.
7. Liquidación fiat/QR en mercados locales.
8. Parmelia SDK para que otros productos integren pagos con links, QR y usernames.

## Diferenciación

Parmelia no busca ser otra wallet cripto.

Metamask está pensada para usuarios cripto.
Binance está pensado como exchange.
Neobancos cripto suelen ser custodiales o cerrados.
Apps bancarias no son globales ni abiertas.

Parmelia busca combinar:

* experiencia simple de app fintech;
* control del usuario sobre sus fondos;
* pagos con links, QR y usernames;
* costos bajos;
* interoperabilidad con wallets externas;
* infraestructura abierta por debajo.

## Wedge inicial

El primer caso de uso fuerte de Parmelia es:

> cobrar y pagar con links, QR y usernames usando dólares digitales.

No intenta resolver todos los pagos del mundo desde el día uno. Primero resuelve una experiencia concreta: mover stablecoins sin fricción.

## Modelo de negocio

Parmelia puede generar ingresos mediante:

1. margen en swaps dentro de la app;
2. fees de conveniencia en conversiones cross-chain;
3. spread o comisión en rutas de liquidez;
4. participación en rendimiento generado por Earn, siempre con consentimiento explícito del usuario;
5. integraciones B2B o SDK para comercios, comunidades y apps.

## Principio de producto

Las transferencias entre usuarios deben sentirse gratis o casi gratis.

En mercados como Bolivia y LATAM, los usuarios ya están acostumbrados a pagos QR sin costo directo. Por eso Parmelia no debería monetizar agresivamente el acto básico de enviar dinero entre usuarios.

La monetización debe venir de acciones de valor agregado:

* cambiar;
* mover entre redes;
* retirar a otros ecosistemas;
* Earn;
* integraciones.

## Por qué ahora

Hace unos años esta experiencia era difícil de construir: las wallets eran incómodas, las redes caras y la UX de cripto demasiado técnica.

Hoy existen redes más rápidas, mejores herramientas de smart wallets, passkeys, stablecoins más maduras y APIs de liquidez que permiten ocultar gran parte de la complejidad.

Parmelia nace para convertir esa infraestructura en una experiencia de pagos simple.

## Métricas clave

Para validar Parmelia, las métricas importantes no son solo usuarios registrados.

Métricas de producto:

* número de links creados;
* número de links pagados;
* porcentaje de links pagados exitosamente;
* tiempo promedio para completar un pago;
* transferencias por usuario;
* volumen movido en USDC/MON/WBTC;
* usuarios que repiten después de su primer pago;
* swaps realizados;
* usuarios que activan Earn;
* retiros externos completados.

## Riesgos

1. Liquidez insuficiente para swaps o conversiones.
2. Costos de gas/paymaster si el uso crece.
3. Riesgo regulatorio si se comunica como inversión o rendimiento garantizado.
4. Complejidad en soporte al usuario.
5. Educación del mercado sobre stablecoins.
6. Dependencia de integraciones externas para cross-chain, fiat o tarjeta.

## Estado actual

Parmelia se encuentra en etapa de validación de producto y experiencia de usuario.

El foco actual es probar si los usuarios entienden y valoran:

* crear links de pago;
* recibir dinero;
* enviar a otros usuarios;
* pagar con QR;
* usar una experiencia cripto sin sentir que están usando cripto.

## Próximo hito

Lanzar una versión pública simple enfocada en:

1. onboarding limpio;
2. links de pago;
3. pagos por QR;
4. usernames;
5. historial/comprobantes;
6. landing clara;
7. primeras pruebas con usuarios reales.

---

# 8. Sobre las features 6 y 7

Sí, tienen sentido, pero deben estar en roadmap, no en la promesa principal todavía.

## 6. Depositar desde cualquier red y convertir a Monad

Conceptualmente sí. Sería una experiencia tipo:

> “Deposita desde Base, Arbitrum, Ethereum, Avalanche, etc. Parmelia recibe, convierte y deja el saldo listo para usar.”

Uniswap API ya contempla quotes para swaps, bridges cross-chain y wrap/unwrap. ([Uniswap Developers][2]) Además, su documentación actual lista Monad entre las cadenas soportadas para swapping. ([Uniswap Developers][3])

Pero la implementación depende de:

* rutas disponibles;
* liquidez;
* tokens soportados;
* costo del bridge;
* tiempo de liquidación;
* manejo de errores;
* soporte de Monad para esa ruta concreta.

## 7. Retirar desde Parmelia a cualquier red

También tiene sentido. Lo vendería así:

> Retira a Monad gratis. Para otras redes, Parmelia te muestra el costo antes de confirmar.

No digas:

> “Parmelia te cobra fee”.

Di:

> “Parmelia encuentra la ruta y te muestra el costo total.”

Eso suena más usuario-céntrico.

---

# 9. La versión más vendible de Parmelia

Si Elton te dijo que sonaba muy general, yo resumiría Parmelia así:

> Parmelia es una app para mover stablecoins sin fricción. El usuario no copia direcciones, no piensa en gas y no cambia de app para hacer lo básico. Puede cobrar con links, pagar con QR, enviar a usernames, cambiar entre activos y retirar cuando quiera. La tesis es que las stablecoins pueden ser dinero cotidiano en LATAM, pero solo si la experiencia deja de sentirse como cripto.

Esa versión ya suena menos genérica porque dice:

* qué mueve: stablecoins/dinero digital;
* cómo: links, QR, usernames;
* para qué mercado: LATAM;
* cuál es la tesis: cripto como dinero cotidiano;
* cuál es el enemigo: fricción.

[1]: https://peanut.me/ "Peanut - Instant Global P2P Payments in Digital Dollars"
[2]: https://api-docs.uniswap.org/guides/swapping "Swapping via the Uniswap API | Uniswap Developers"
[3]: https://developers.uniswap.org/docs/trading/swapping-api/supported-chains "Supported Chains & Tokens | Uniswap Developers"
