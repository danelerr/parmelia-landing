# GatoPago 2026: visión de producto y plan de mejora — V2

**Fecha de auditoría:** 9 de agosto de 2026  
**Alcance:** aplicación, smart contracts, Worker/API, dashboard para comercios, documentación interna y landing en español e inglés.  
**Estado observado:** el contenido presente en ambos directorios de trabajo, incluidas modificaciones todavía no confirmadas en Git.  
**Revisión estratégica V2:** incorpora la tarjeta como hipótesis crítica de distribución consumer, separa la cuña Alpha del mercado final y adopta un modelo de saldo preparado para distintos issuers sin depender de ninguno.

---

## 1. Decisión ejecutiva

GatoPago no debe elegir entre ser una wallet para personas y ser infraestructura de pagos. La categoría que integra el producto es:

> **GatoPago es una cuenta onchain programable que conecta tu dinero con pagos, DeFi y el mundo real, sin quitarte el control.**

Esa es la **categoría interna**. No debe intentar cumplir también el papel de hero, propuesta comercial y filosofía de marca. GatoPago necesita tres niveles de comunicación distintos:

| Nivel | Mensaje |
|---|---|
| Categoría interna | **Cuenta onchain programable que conecta dinero, pagos, DeFi y mundo real sin quitar control** |
| Propuesta actual | **Recibe, usa y haz crecer tus dólares digitales** |
| Filosofía permanente | **Tu dinero sigue siendo tuyo, pero ahora puede hacer más** |

Cuando la tarjeta esté activa, la propuesta consumer puede evolucionar a:

> **Recibe dólares digitales. Hazlos crecer. Gástalos donde quieras.**

### La decisión sobre la tarjeta

La tarjeta debe ser:

- **protagonista de la visión consumer**;
- **hipótesis crítica de adquisición y frecuencia de uso**;
- **condicionante del modelo financiero y de saldo desde hoy**;
- **track comercial y regulatorio prioritario desde la primera semana**.

Al mismo tiempo, no debe presentarse como una función disponible hasta que GatoPago tenga cobertura, términos, economía e integración confirmados con Gnosis Pay u otro provider.

Esta distinción resuelve la tensión:

> **Diseñar desde hoy una cuenta cuyo dinero podrá gastarse con tarjeta, sin diseñar una experiencia que finja que la tarjeta ya existe.**

### La cuña y la ambición

La cuña Alpha es deliberadamente crypto-adjacent:

> **Personas y equipos pequeños de LATAM que ya reciben USDC o usan Binance/wallets y quieren una experiencia mucho mejor para cobrar, mantener, hacer crecer y utilizar ese dinero.**

La ambición de mercado es mayor:

> **Personas normales que quieren dólares digitales, ahorro, pagos internacionales, tarjeta y acceso progresivo a oportunidades financieras sin convertirse en expertos Web3.**

La cuña reduce el problema de fondeo inicial; no define el techo de GatoPago.

### El ciclo de vida del dinero

```text
                         COBRAR / RECIBIR
                                │
                                ▼
                       ┌─────────────────┐
                       │   DISPONIBLE    │
                       │ listo para usar │
                       └─────────────────┘
                         │             │
                         ▼             ▼
                    CRECIENDO        GASTAR
                       DeFi            Card
                         │             │
                         └──────┬──────┘
                                ▼
                             GATOPAGO

Disponible también puede → enviar · pagar · retirar · cambiar · entrar a Web3
```

GatoPago no es una colección horizontal de features. **Administra el ciclo de vida del dinero manteniendo al usuario en control.**

---

## 2. Qué debe ser y qué no debe ser GatoPago

### Debe ser

- Una cuenta onchain comprensible antes que una lista de tokens.
- USDC-first en su experiencia monetaria, no USDC-only en su arquitectura.
- Autocustodiada, con recuperación explicada de forma exacta.
- Una experiencia que presenta intenciones financieras y revela la infraestructura al pedir detalles.
- Un único núcleo técnico con superficies distintas para personas, pagadores y desarrolladores.
- Un producto que profundiza un ciclo útil antes de añadir más protocolos, redes o activos.
- Una puerta progresiva a finanzas onchain, no un catálogo de dApps.
- Una cuenta diseñada desde hoy para que el saldo disponible pueda alimentar una tarjeta mañana.
- Una marca consumer emocional; la API es distribución y Business emerge de necesidades reales.

### No debe ser todavía

- Una wallet genérica que compite por cantidad de tokens y protocolos.
- “Stripe para stablecoins” como única identidad.
- Un neobanco masivo para cualquier persona de LATAM.
- Una plataforma institucional para bancos.
- Una app que finja tener una tarjeta antes de confirmar emisor, jurisdicción, economía y operación.
- Un producto que promete automatizaciones que todavía no tienen motor de políticas ni modelo de seguridad.

### Jerarquía estratégica recomendada

1. **GatoPago Personal:** marca, cuenta, movimiento, crecimiento, Web3 accesible y futura tarjeta.
2. **Card:** hipótesis consumer crítica en discovery paralelo; visible hoy como acceso anticipado, activa solo después del gate.
3. **GatoPago API:** distribución mediante links, checkout, payment intents y webhooks.
4. **GatoPago Business:** producto emergente a partir de necesidades observadas, no un ERP anticipado.
5. **Programabilidad:** reglas limitadas, auditadas y revocables sobre el mismo núcleo.

Dentro de Personal, la jerarquía del dinero es:

```text
Disponible → usar ahora
Creciendo  → capital trabajando
Web3       → activos y posiciones avanzadas
```

### Tesis consumer y diferenciación

GatoPago no debe abandonar consumer por temor a competir con otras money accounts autocustodiadas. La existencia de productos como Peanut valida que una experiencia consumer puede ocultar complejidad onchain; no determina que GatoPago deba retirarse hacia B2B.

La tesis propia es:

```text
Money account convencional
recibir → enviar → gastar

GatoPago
recibir → disponible → crecer → gastar → acceder a Web3
                         └──── programar reglas ────┘
```

La diferenciación no consiste en afirmar que ningún competidor puede añadir Earn o tarjeta. Consiste en construir deliberadamente una experiencia donde:

- la propiedad sea verificable;
- el dinero tenga estados comprensibles;
- DeFi sea accesible sin ser opaco;
- la programabilidad responda a intenciones humanas;
- la tarjeta conecte ese sistema con la vida cotidiana;
- el usuario pueda profundizar en Web3 sin cambiar de cuenta.

Personal construye la marca emocional. API distribuye capacidades. Business aparece cuando la demanda operacional lo justifica.

---

## 3. Qué existe realmente hoy

La base técnica es considerablemente más madura que la historia que cuenta la interfaz.

| Área | Estado observado | Lectura de producto |
|---|---|---|
| Smart account | ERC-4337, passkeys múltiples, ejecución por lotes, UUPS y recuperación con guardian y espera de 48 horas | Base fuerte para una cuenta autocustodiada; todavía no es un motor de reglas financieras |
| Pagos personales | Envíos, links, QR, usernames, contactos, recibos y actividad | Es el ciclo más visible y coherente de la app |
| Swap | Cotización, mínimo recibido, ruta, tolerancia, desglose, firma y gas patrocinado | Ya aplica buena parte de “abstracción sin opacidad”; el texto estratégico auditado describe una versión anterior |
| Crecimiento | Depósito y retiro de USDC en Aave V3, APY variable, riesgos y firma con passkey | La primera experiencia DeFi ya existe; conviene profundizarla, no añadir otro protocolo |
| Fondeo | Recepción directa, guía desde Binance y recepción crosschain mediante CCTP | La nueva pantalla de recepción ya agrupa mejor la intención “agregar dinero” |
| API de pagos | `payment_intents`, consulta, cancelación, simulación, eventos y webhooks firmados | Base real para distribución B2B y checkout |
| Dashboard | API keys, webhooks, pagos, eventos y sandbox | Es una consola para desarrolladores, no todavía “GatoPago Business” con tesorería y equipos |
| Read model | Balance, actividad e indexación con D1, Queue, Durable Objects, finality y manejo de reorgs | La infraestructura permite una home más útil sin consultar RPC en cada carga |
| Automatizaciones | No existe un motor de reglas, session keys, permisos de estrategia ni políticas de gasto | Es visión futura, no funcionalidad actual |
| Tarjeta | Solo aparece como “próximamente” en el menú y en la landing; Daniel ya tiene contacto directo con Gnosis Pay | No existe integración en código, pero ya es un frente estratégico real de discovery y negociación |
| Mainnet | Arbitrum One está modelado, pero los contratos propios siguen en `TODO_DEPLOY` | El producto actual es una alpha de testnet, no una cuenta mainnet lista para dinero real |
| Negocios avanzados | No hay organizaciones, RBAC, aprobaciones, payouts ni tesorería | No se debe presentar el dashboard actual como producto financiero para equipos |

### Tamaño y complejidad auditados

| Superficie | Archivos fuente aproximados | Líneas aproximadas |
|---|---:|---:|
| Cliente | 75 | 10.399 |
| Dashboard | 19 | 1.666 |
| Worker/API | 71 | 23.302 |
| Tests del servidor | 33 | 3.431 |
| Contratos | 6 | 849 |
| Tests de contratos | 7 | 1.659 |
| Landing | 37 | 4.682 |

La asimetría es relevante: el servidor es más de dos veces el cliente y contiene un sistema operacional sofisticado de indexación, colas y conciliación. Para un equipo pequeño, el riesgo inmediato ya no es falta de infraestructura; es continuar ampliándola antes de demostrar que un segmento repite el ciclo principal.

---

## 4. Fortalezas que deben preservarse

### Arquitectura y seguridad

- El servidor no posee una vía normal para gastar fondos sin una firma válida del usuario.
- Los contratos separan cuenta, factory, paymaster, router de pagos y router crosschain.
- El código falla de forma cerrada cuando faltan contratos en una red.
- El paymaster, los límites de gas y la separación de roles de firma reducen el radio de impacto.
- El read model evita convertir la home en una cascada de RPCs.
- D1, Queues y Durable Objects se están usando para persistencia, trabajos asíncronos y control de concurrencia, no como decoración arquitectónica.
- Existen pruebas sustanciales para rutas de pago, settlement, UserOperations, balances, webhooks y runtime de Workers.

### Producto

- Los comprobantes compartibles son una pieza auténtica y diferenciadora.
- La recepción desde Binance, wallet directa o CCTP ya traduce infraestructura a una intención humana.
- Swap muestra ruta, mínimo y red sin obligar a entenderlos antes de operar.
- Ahorro ya permite entrar y salir de Aave desde la smart account.
- Links, QR, usernames y referencias dan significado humano a las operaciones.
- La landing tiene una identidad visual sólida, coherente y reconocible; el problema es principalmente narrativo y de jerarquía, no de calidad gráfica.

### Rendimiento y disciplina técnica

- Los presupuestos actuales de JavaScript pasan: aproximadamente 312 KB gzip para el cliente y 185 KB gzip para el dashboard.
- Cliente, dashboard, servidor y landing compilan.
- La landing es estática, bilingüe y respeta `prefers-reduced-motion`.
- La configuración de Workers usa tipos generados, observabilidad y primitives apropiadas de Cloudflare.

La recomendación es conservar esta base y aplicar una regla de producto: **ninguna nueva abstracción de infraestructura sin una necesidad medida del ciclo principal o de un design partner real**.

---

## 5. Brechas y contradicciones que deben corregirse primero

### 5.1 Mainnet frente a testnet

`shared/networks.ts:238-242` mantiene factory, paymaster, verifier, payment router y crosschain router de Arbitrum One en cero. Por tanto:

- La landing debe identificar el producto como **Alpha en Arbitrum Sepolia** mientras esa sea la red activa.
- El dashboard no debe describir claves `live` como dinero real en Arbitrum One si esa red no está desplegada.
- “Probar GatoPago” debe llevar a una experiencia que explique que se usan fondos de prueba.
- No debe publicarse una fecha de mainnet hasta cerrar auditoría, despliegue, monitoreo, límites y salida de emergencia.

### 5.2 Autocustodia frente a recuperación asistida

La landing afirma que GatoPago “no puede recuperar” fondos. El contrato, en cambio, permite que un guardian proponga reemplazar firmantes y que la recuperación se ejecute después de 48 horas. La app sí lo explica mejor.

La formulación correcta es:

> **GatoPago no puede gastar ni congelar tus fondos. Si activas la recuperación asistida, el guardian puede iniciar un reemplazo de llaves con 48 horas de espera; mientras conserves una llave válida, puedes cancelarlo.**

Esto no elimina la autocustodia, pero sí exige explicar el modelo de confianza. También deben documentarse:

- quién controla actualmente el guardian;
- cómo se protege esa llave;
- cómo se rota o desactiva;
- qué alertas recibe el usuario;
- qué ocurre si GatoPago desaparece;
- cómo ejecutar una salida directa y gestionar firmantes desde otra interfaz.

### 5.3 “Pagar sin cuenta” frente al flujo real

La FAQ de la landing afirma que quien abre un link paga sin cuenta previa. La pantalla pública actual ofrece **“Inicia sesión para pagar”** cuando no existe una sesión. Hay infraestructura para flujos externos, pero esa promesa no está conectada al checkout consumer actual.

Solo hay dos opciones honestas:

1. integrar una wallet externa o una ruta de pago verdaderamente sin cuenta; o
2. retirar temporalmente esa afirmación de la landing.

La segunda debe hacerse inmediatamente. La primera es una buena prioridad de adquisición posterior.

### 5.4 “0%” y costos reales

“0% de comisión GatoPago entre usuarios” puede ser válido si se expresa como tarifa de plataforma, pero no debe confundirse con costo total cero. Hay gas, posibles costos/rutas crosschain, impacto de swap y una política de fee de swap configurable.

Usar:

> **0% de comisión GatoPago en transferencias entre usuarios. Antes de confirmar mostramos cualquier costo de red, proveedor o conversión.**

“Sin gas” debe reemplazarse por “gas patrocinado por GatoPago, sujeto a límites” cuando corresponda.

### 5.5 Tarjeta y QR local

La tarjeta debe ganar presencia narrativa desde ahora sin convertirse en una promesa falsa. El contacto directo con Gnosis Pay justifica tratarla como **acceso anticipado** y abrir un canal de aprendizaje real.

En Home y landing puede aparecer:

> **GatoPago Card**  
> **Tus dólares digitales, listos para gastar.**  
> Tarjeta internacional desde tu saldo GatoPago.  
> **Quiero acceso anticipado →**

“En desarrollo” solo debe utilizarse cuando haya un programa acordado y un plan de implementación. Antes de eso, “acceso anticipado” o “lista de interés” comunica la intención sin afirmar disponibilidad.

La landing no debe prometer cobertura, Apple Pay, Google Pay, ausencia de mensualidad ni comisiones hasta tener esos términos por escrito. Sí puede explicar la visión y recolectar demanda cualificada.

### 5.6 Accesibilidad del cliente

`client/src/index.css:172` y `:179` eliminan el `outline` de controles sin un reemplazo global de `:focus-visible`. La prueba E2E lo detecta tanto en desktop como en móvil. Además, el código de onboarding contiene un input de invitación dependiente del placeholder.

Acción inmediata:

- restaurar un foco visible consistente para botones, enlaces, inputs y selectores;
- agregar label o `aria-label` y `name` al campo de invitación;
- mantener el foco dentro de sheets y diálogos;
- volver a ejecutar las 12 pruebas E2E.

---

## 6. Evaluación de los tres textos estratégicos

### Texto 1: cuenta programable, pagos y DeFi

**Veredicto: adoptar como tesis central, con reducción de alcance para el lanzamiento.**

| Propuesta | Decisión | Matiz necesario |
|---|---|---|
| La dicotomía wallet/B2B es falsa | Adoptar | Un mismo núcleo puede tener superficies y mensajes distintos |
| “Cuenta onchain autocustodiada y programable” | Adoptar internamente | Es una categoría; el hero necesita una promesa más concreta |
| Pagos traen dinero y DeFi le da utilidad | Adoptar | Es el ciclo más coherente con lo ya construido |
| Mostrar intenciones y ocultar complejidad | Adoptar | Siempre con protocolo, contrato, costos, liquidez y riesgos accesibles |
| Saldo Disponible / Creciendo / Web3 | Adoptar | Mostrar Web3 de forma contextual; no crear un total USD falso sin precios fiables |
| Reglas automáticas | Adoptar como horizonte | Hoy no existen; requieren permisos limitados, revocación, caps, simulación y auditoría |
| Personal, Business, Checkout y Core | Adoptar como arquitectura objetivo | No intentar lanzar las cuatro superficies completas al mismo tiempo |
| Aave primero, Morpho después | Adoptar la primera mitad | Aave ya está integrado; no añadir Morpho hasta medir uso, riesgo y soporte de Aave |
| Soberanía progresiva | Adoptar como principio | Hace falta una vía documentada de salida y administración independiente de GatoPago |
| LATAM stablecoin-native como mercado inicial | Adoptar | Elegir un solo segmento y un solo caso de uso durante el primer ciclo |
| Instituciones | Posponer | El producto actual no tiene controles, compliance ni operación institucional |

La frase “Propiedad + pagos + DeFi + automatización + infraestructura” funciona en un documento de estrategia. No debe convertirse en una lista de cinco promesas en el hero.

### Texto 2: auditoría de la interfaz y nueva navegación

**Veredicto: buena dirección de UX, pero parte del diagnóstico ya quedó desactualizado por cambios presentes en el working tree.**

Aspectos todavía correctos:

- el selector de token sigue dominando la home;
- la dirección onchain conserva demasiado peso visual;
- la home comunica wallet/pagos antes que cuenta financiera;
- la actividad debe narrar personas, conceptos y resultados, no transacciones genéricas;
- el saldo debe organizarse por disponibilidad y función;
- Request necesita una decisión explícita entre monto fijo y monto abierto;
- la home debe volver visible el crecimiento;
- el dashboard actual no equivale a GatoPago Business.

Aspectos que ya mejoraron en el código actual:

- Inicio volvió a mostrar Ahorro como utilidad y muestra la posición cuando existe.
- “Agregar dinero” agrupa Binance, recepción directa y crosschain.
- Swap ya revela mínimo recibido, ruta, tolerancia, red, comisión y detalles de firma.
- Los cobros recientes permiten reabrir links pendientes y comprobantes pagados.
- Seguridad explica la capacidad limitada de GatoPago en la recuperación.

Correcciones a la navegación propuesta:

- **No añadir “Explorar” todavía.** Sin más experiencias maduras, crearía una tienda vacía o presión para integrar protocolos sin señal de demanda.
- **No poner “Tarjeta” como tab todavía.** Debe elevarse solo cuando exista un programa real.
- Para la alpha actual basta con **Inicio, Mover, Crecer y Actividad**, dejando Seguridad en el perfil.
- Cuando la tarjeta esté activa, puede ocupar la quinta superficie. “Explorar” debe ser posterior y opcional.

### Texto 3: tarjeta como centro de GatoPago Personal

**Veredicto V2: dirección estratégica correcta; debe influir desde ahora en producto, marca y discovery, sin presentarse todavía como disponible.**

Lo correcto:

- una tarjeta resuelve la utilidad cotidiana que pagos onchain y DeFi no cubren por sí solos;
- el servicio regulado puede separarse del núcleo autocustodiado;
- un vault de gasto separado reduce el radio de impacto;
- la tarjeta debería consumir saldo disponible, no liquidar una posición DeFi durante una autorización;
- la economía debe incluir KYC, emisión, fraude, disputas, soporte, FX y mínimos, no solo interchange;
- la constitución y operación de la empresa entran en el camino crítico si se decide lanzar tarjeta.

Lo que debe convertirse en acción desde ahora:

- usar la tarjeta como hipótesis principal de distribución y frecuencia consumer;
- diseñar `Disponible` como dinero inmediatamente utilizable, incluida la futura Card;
- mostrar acceso anticipado en Home y landing;
- recolectar país, caso de uso, gasto mensual esperado, preferencia virtual/física y relevancia de Apple Pay/Google Pay;
- negociar en paralelo cobertura, entidad, pricing, reservas, revenue share, KYC y arquitectura;
- mantener la experiencia de GatoPago independiente de la infraestructura particular del issuer.

Lo que todavía requiere prudencia:

- “KYC solo para tarjeta” es demasiado absoluto. También pueden exigirlo ramps, límites, cuentas fiat y servicios empresariales.
- El vault de tarjeta y la red dependerán del proveedor; no debe fijarse esa implementación antes de conocer contratos y cadenas.
- Las estadísticas de crecimiento del sector validan una tendencia, pero no demuestran distribución, margen o elegibilidad para GatoPago.
- No conviene congelar el aprendizaje del núcleo onchain mientras se negocia un programa de emisión.

La investigación actual además modifica dos supuestos del texto:

- [Gnosis Pay](https://help.gnosispay.com/hc/en-us/articles/39401751918612-Eligible-Countries-for-Gnosis-Pay) enumera a Bolivia entre los países **coming soon**, no entre los países actualmente soportados.
- [Bridge](https://apidocs.bridge.xyz/platform/cards/overview/noncustodial) documenta actualmente el gasto directo desde wallet autocustodiada en Solana y World Chain; Arbitrum no figura en esa tabla.
- [Rain](https://www.rain.xyz/resources/how-to-launch-global-card-programs-without-starting-over-in-every-market) confirma que sus programas incorporan KYC/AML, pero cobertura, mínimos, entidad aceptada y soporte de Arbitrum requieren una propuesta comercial.

La frase futura es buena:

> **Recibe dólares digitales. Hazlos crecer. Gástalos en cualquier lugar.**

Debe convertirse en la propuesta completa después de cumplir el gate de disponibilidad. Mientras tanto, Card ya puede ser protagonista de la visión y aparecer como acceso anticipado con métricas de demanda, sin describirse como una capacidad activa.

---

## 7. Modelo de producto recomendado

### 7.1 GatoPago Account

El núcleo común y neutral respecto de proveedores:

- smart account y passkeys;
- backup y recuperación;
- actividad y comprobantes;
- balance/indexación;
- simulación y firma;
- clasificación conceptual `Disponible / Creciendo / Web3`;
- adaptadores de pagos, DeFi, tarjeta y rails;
- permisos y aplicaciones conectadas, más adelante;
- salida soberana.

El modelo de dominio pertenece a GatoPago. Un issuer puede exigir otro Safe, otra red, un allowance, un módulo o una cuenta dedicada; ninguna de esas decisiones debe convertirse en el modelo mental permanente del usuario.

### 7.2 GatoPago Personal

Es el producto principal y donde debe construirse la marca emocional. La primera experiencia completa es:

```text
Crear y proteger cuenta
        ↓
Agregar o recibir USDC
        ↓
Disponible
   ├── Enviar / pagar / retirar / cambiar
   ├── Mover a Creciendo
   ├── Entrar a Web3
   └── Gastar con Card cuando esté disponible
        ↓
Volver a cobrar, recibir y administrar
```

V1:

- USDC como unidad principal;
- links, QR y usernames;
- agregar desde Binance, wallet o CCTP;
- `Disponible`, `Creciendo` y `Web3` como modelo del dinero;
- USDC creciendo en Aave como única estrategia guiada;
- swap como herramienta secundaria;
- actividad humana;
- seguridad y recuperación visibles;
- ETH/WBTC dentro de Web3, sin dominar la home;
- GatoPago Card visible como acceso anticipado y fuente de investigación comercial.

### 7.3 GatoPago Card

Es una parte de GatoPago Personal, no un producto desconectado. Su función estratégica es convertir saldo onchain en uso cotidiano y aumentar frecuencia, retención y atractivo para personas no cripto.

Antes de la integración:

- card de acceso anticipado en Home;
- sección temprana en landing;
- formulario de demanda cualificada;
- entrevistas y negociación con Gnosis Pay;
- comparación de respaldo con otros providers;
- arquitectura provider-neutral.

Después del gate:

- tab principal;
- tarjeta virtual y física según el programa;
- saldo gastable y estado de fondeo;
- freeze, límites, transacciones, suscripciones y soporte;
- KYC dentro del flujo regulado;
- conciliación entre autorizaciones y movimientos onchain.

### 7.4 GatoPago Checkout

Una superficie neutral para completar una intención de pago:

- link o payment intent;
- monto, concepto, destinatario y estado;
- pago con cuenta GatoPago;
- wallet externa sin crear cuenta, cuando esté implementado;
- otras rutas futuras sin obligar al pagador a adoptar GatoPago.

El checkout es un canal de adquisición porque un usuario de GatoPago invita a un pagador. La Card es la hipótesis de distribución consumer masiva; checkout es distribución orgánica y B2B2C. Ambos deben medirse por separado.

### 7.5 GatoPago API

Es distribución, no el centro emocional de la marca. El dashboard ya soporta de forma creíble:

- claves test/live alineadas con redes realmente disponibles;
- payment intents;
- eventos;
- webhooks y reintentos;
- sandbox;
- documentación y ejemplos.

Mensaje actual recomendado:

> **Crea cobros y recibe confirmaciones onchain con una API.**

Durante este ciclo basta con 1–2 integraciones privadas. No necesita la misma prominencia narrativa que Personal.

### 7.6 GatoPago Business

Debe emerger cuando merchants reales pidan capacidades de equipo. Puede investigarse con los partners privados, pero antes de presentarse como producto completo necesita:

- organizaciones separadas del usuario individual;
- roles y permisos;
- miembros y auditoría;
- conciliación/exportaciones;
- payouts o pagos operativos;
- balance operativo y tesorería;
- políticas y aprobaciones;
- soporte y términos empresariales.

No inventar un ERP ni una tesorería antes de observar esos pedidos.

### 7.7 Rails regulados

Tarjeta, on-ramp, off-ramp y QR local son adaptadores del sistema. Pueden ser protagonistas de la experiencia y de la distribución sin apropiarse del modelo de dominio. Cada uno requiere compliance, límites, soporte y conciliación propios.

---

## 8. El saldo que puede sobrevivir varios años

La estructura conceptual recomendada es **Disponible / Creciendo / Web3**. Describe qué puede hacer el dinero, no qué token o protocolo lo contiene, y permite integrar la tarjeta sin reconstruir después el modelo mental.

### Home V1, USDC-first

```text
Tu USDC
$1.150,40

Disponible                         $350,40
Listo para enviar, pagar o retirar

Creciendo                          $800,00
En Aave · tasa variable

Web3
0,03 ETH · 0,001 WBTC
```

### Qué significa cada estado

#### Disponible

Dinero listo para usar:

- enviar;
- pagar;
- retirar;
- cambiar;
- mover a Creciendo o Web3;
- gastar con GatoPago Card cuando esté activa.

#### Creciendo

Capital colocado en estrategias de rendimiento seleccionadas. Hoy significa USDC suministrado a Aave. Mañana puede incorporar otras estrategias, pero solo después de demostrar uso y capacidad de riesgo.

#### Web3

Activos y posiciones que no son el dinero cotidiano principal:

- ETH;
- WBTC;
- collateral;
- posiciones DeFi futuras;
- activos usados en aplicaciones conectadas.

Web3 puede permanecer colapsado o no aparecer en la home cuando el usuario solo tiene USDC. Es una puerta progresiva, no una obligación de complejidad.

### Disponible no es igual a Card Vault

Conceptualmente:

```text
Disponible → dinero inmediatamente utilizable → pagar / enviar / retirar / tarjeta
```

Técnicamente puede componerse de varios buckets:

```text
Cuenta GatoPago en Arbitrum
Card Safe o cuenta del issuer
Fondos en tránsito o pendientes de settlement
Allowance o módulo con límites
```

GatoPago debe presentar una experiencia coherente y decir con precisión qué monto está **listo para tarjeta**. No debe asumir que `availableBalance == cardVaultBalance` ni filtrar al usuario la arquitectura particular de Gnosis Pay. Eso permite cambiar de issuer o red sin romper el producto.

Principio:

> **La experiencia pertenece a GatoPago; la infraestructura del issuer no.**

No mostrar `Total en GatoPago: $X` para ETH, WBTC y posiciones hasta tener:

- fuente de precios definida;
- timestamp de valoración;
- comportamiento claro cuando la fuente falla;
- tratamiento de posiciones ilíquidas;
- indicación de valor estimado.

### Jerarquía de Inicio

1. Cuenta, estado de red y condición Alpha.
2. USDC disponible, USDC creciendo y Web3 si existe.
3. Acciones: Agregar, Enviar, Recibir y Retirar.
4. Módulo de Crecer con tasa variable y ganancia.
5. GatoPago Card y CTA de acceso anticipado.
6. Sugerencia o regla de asignación, cuando exista.
7. Estado de seguridad y backup si requiere atención.
8. Actividad reciente con lenguaje humano.

La dirección hexadecimal debe permanecer disponible en “Detalles de cuenta” y en Recibir, no competir con el propósito de la home.

### Navegación progresiva

| Alpha actual | Tarjeta integrada | Etapa avanzada |
|---|---|---|
| Inicio | Inicio | Inicio |
| Mover | Tarjeta | Tarjeta |
| Crecer | Mover | Mover |
| Actividad | Crecer | Crecer |
| Perfil/Seguridad | Actividad | Explorar |

En la Alpha, Card vive como módulo de Home y acceso anticipado, no como tab vacío. “Explorar” debe aparecer únicamente cuando existan oportunidades seleccionadas, simulación, permisos revocables y una política editorial de riesgo. Hasta entonces, Web3 es un estado del patrimonio y una progresión contextual.

---

## 9. Programabilidad: de una sugerencia a una regla segura

Las smart accounts de terceros demuestran que límites, whitelists y transacciones recurrentes son posibles. Eso no significa que estén presentes en la cuenta personalizada de GatoPago. Los [módulos de Safe](https://docs.safe.global/advanced/smart-account-modules) validan el espacio de diseño; no son una funcionalidad que GatoPago herede automáticamente. Además, Safe advierte que un guard defectuoso puede bloquear la cuenta, por lo que requiere auditoría y recuperación segura ([Safe Guards](https://docs.safe.global/advanced/smart-account-guards)).

### Escalera recomendada

#### Etapa 0 — Recomendación, sin automatización

Después de recibir USDC:

> Recibiste $500. ¿Quieres mantenerlo disponible o mover una parte a Crecer?

El usuario decide y firma cada vez. Esto valida intención sin introducir nuevos permisos.

#### Etapa 1 — División confirmada en un toque

```text
Mantener disponible       $350
Mover a Crecer            $150
[Confirmar con passkey]
```

Puede aprovechar el batch existente, pero sigue siendo una decisión explícita.

#### Etapa 2 — Regla limitada

> Al recibir un pago confirmado, proponer o ejecutar 20% hacia el adaptador Aave aprobado.

Requisitos mínimos:

- contrato/adaptador allowlisted;
- porcentaje y monto máximo por evento;
- límite diario y mensual;
- mínimo que siempre queda disponible;
- pausa global y revocación inmediata;
- expiración del permiso;
- simulación previa;
- notificación y log legible;
- protección contra reintentos y eventos duplicados;
- retiro que no dependa del motor de reglas;
- auditoría externa antes de mover dinero sin firma por evento.

#### Etapa 3 — Políticas para equipos

Solo después de organizaciones y roles:

- doble aprobación;
- proveedores autorizados;
- límites por rol;
- reserva operativa;
- auto-sweep de tesorería;
- reportes y trazabilidad.

No implementar múltiples reglas personales y empresariales en el mismo primer ciclo.

---

## 10. Rediseño narrativo de la landing

La landing actual es visualmente buena, pero su orden —browser, links, QR, fees, activos, swap, Earn, crosschain, control, tarjeta, API— se lee como catálogo de funciones. El hero y la navegación siguen definiendo GatoPago como una app de pagos.

### Hero recomendado para el producto actual

**Badge**

> Alpha en Arbitrum Sepolia · GatoPago Card en acceso anticipado

**Título**

> **Tu dinero sigue siendo tuyo. Ahora puede hacer más.**

**Subtítulo**

> Recibe, paga y haz crecer USDC desde una cuenta onchain que controlas. Y únete al acceso anticipado de GatoPago Card.

**CTA primario**

> Probar GatoPago Alpha

**CTA secundario**

> Quiero GatoPago Card

El CTA secundario abre la investigación de Card, no una pantalla ficticia. “Mueve dinero digital como mandar un mensaje” puede conservarse como principio de experiencia o encabezado de la sección de pagos. No usar todavía “gástalos donde quieras” como descripción de una capacidad activa.

### Formulario de acceso anticipado

Solicitar únicamente información accionable, con consentimiento y propósito claros:

- país de residencia;
- email o usuario GatoPago;
- principal caso de uso: suscripciones, compras online, publicidad, viajes o gasto cotidiano;
- rango de gasto mensual esperado;
- preferencia virtual, física o ambas;
- importancia de Apple Pay/Google Pay;
- campo opcional para el problema que intenta resolver.

El resultado no debe ser solo una lista de emails. Debe producir una ficha comercial por país y segmento para negociar con Gnosis Pay:

```text
Interesados cualificados
Distribución geográfica
Casos de uso principales
Gasto mensual esperado
Preferencia virtual/física
Demanda de wallets móviles
Conversión desde usuario activo vs visitante
```

### Nueva estructura de la página

1. Hero emocional con estado Alpha y CTA de Card.
2. El ciclo `Recibir → Disponible → Crecer / Gastar`.
3. Una demo de `Disponible / Creciendo / Web3`.
4. GatoPago Card como acceso anticipado y visión de uso cotidiano.
5. Cobros y movimiento: links, QR, username, Binance y crosschain.
6. Crecer: Aave, tasa variable, liquidez, riesgos y salida.
7. Web3 progresivo: otros activos, transparencia y control, sin catálogo de protocolos.
8. Control: passkeys, guardian, 48 horas y verificabilidad.
9. Para desarrolladores: API, payment intents y webhooks, con enlace propio.
10. Fees, red activa, contratos y riesgos.
11. FAQ y CTA final.

### Separación de audiencias

La landing principal debe vender GatoPago Personal. Crear rutas distintas:

- `/business` cuando exista un alpha para equipos;
- `/developers` para API y checkout;
- `/security` para arquitectura, contratos, recuperación y auditorías;
- `/status` o un bloque equivalente para red y disponibilidad.

No pedirle a una sola página que venda simultáneamente una wallet consumer, un procesador, una tesorería y una API.

### Claims que deben cambiar

| Actual | Recomendado ahora |
|---|---|
| Mueve dinero digital como mandar un mensaje | Tu dinero sigue siendo tuyo. Ahora puede hacer más |
| Quien paga no necesita cuenta | Paga desde GatoPago; wallet externa próximamente, hasta implementar el flujo |
| GatoPago no puede recuperar fondos | Recuperación asistida opcional con guardian y espera de 48 horas |
| Tarjeta “en desarrollo” | GatoPago Card en acceso anticipado |
| Disponible en Arbitrum | Alpha en Arbitrum Sepolia; Arbitrum One después de auditoría y despliegue |
| Sin comisiones | 0% de comisión GatoPago entre usuarios; otros costos se muestran antes de confirmar |

La misma corrección debe aplicarse a metadata, datos estructurados, FAQ, `llms.txt`, Términos y Privacidad.

---

## 11. Plan operativo de 12 semanas: tres tracks asimétricos

La estrategia no debe ser una secuencia donde Card empieza después de Personal. Son tres tracks simultáneos con pesos distintos:

| Track | Capacidad orientativa | Resultado esperado |
|---|---:|---|
| GatoPago Personal | 60% | Ciclo `recibir → disponible → crecer/usar`, mainnet cerrada y experiencia de marca |
| Card, compañía y rails | 25% | Factibilidad comercial verificable, demanda cualificada y arquitectura decidida |
| API y partners privados | 15% | 1–2 integraciones reales sin construir Business completo |

Los porcentajes expresan prioridad, no una obligación horaria exacta. Seguridad crítica y bloqueos externos pueden cambiar temporalmente la asignación.

### Semanas 1–2 — Verdad, diseño del sistema y discovery Card

#### Personal — 60%

- Acordar categoría, propuesta actual, filosofía y cuña Alpha.
- Marcar landing, app y dashboard como Alpha/Testnet.
- Corregir claims de recuperación, link sin cuenta, fees y mainnet.
- Sincronizar Términos, Privacidad, FAQ, metadata y `llms.txt`.
- Restaurar foco visible y etiquetar onboarding.
- Definir el modelo `Disponible / Creciendo / Web3`.
- Instrumentar onboarding, fondeo, cobro, pago, Earn y retorno.

#### Card — 25%

- Preparar dossier de GatoPago, arquitectura, usuarios objetivo y mercados.
- Reunirse con Gnosis Pay y obtener respuestas escritas de elegibilidad y programa.
- Abrir el formulario de acceso anticipado en Home y landing.
- Definir eventos y dashboard de demanda Card.
- Iniciar matriz de entidad, compliance, costos, redes y tiempos.

#### API — 15%

- Elegir 1–2 potenciales partners privados.
- Validar si `payment intent → checkout → webhook` resuelve un trabajo real.
- No añadir roles ni tesorería todavía.

**Criterios de salida:** 12/12 E2E, claims alineados, reuniones Card iniciadas, analytics activo y partners identificados.

### Semanas 3–6 — Nueva experiencia Personal y evidencia comercial

#### Personal — 60%

- Rediseñar Home con Disponible, Creciendo y Web3 contextual.
- Reducir el protagonismo del selector de token y la dirección.
- Navegación `Inicio / Mover / Crecer / Actividad`.
- Humanizar actividad por persona, concepto, protocolo y resultado.
- Mostrar Aave, tasa variable, riesgos y salida en segunda capa.
- Hacer explícito monto fijo frente a monto abierto.
- Después de cobrar, ofrecer asignación manual a Crecer.

#### Card — 25%

- Analizar interesados por país, uso y gasto mensual.
- Confirmar con Gnosis Pay: Bolivia, tipo de partnership, entidad, KYC, Safe/red, pricing, reservas, revenue share y soporte.
- Comparar como respaldo al menos una ruta alternativa sin iniciar integración profunda.
- Modelar cómo `Disponible` agrega o fondea buckets del issuer.
- Definir privacy notice y consentimiento del acceso anticipado.

#### API — 15%

- Ejecutar primera integración privada.
- Medir tiempo a primer intent, conversión y entrega de webhooks.
- Implementar solo el mínimo de conciliación que el partner utilice.

**Criterios de salida:** usuarios entienden los tres estados, Card tiene demanda segmentada y una conversación comercial concreta, primer partner ejecuta sandbox o testnet.

### Semanas 7–10 — Mainnet readiness y decisión Card

#### Personal — 60%

- Auditoría externa de contratos y flujos críticos.
- Deploy verificable en Arbitrum One.
- Límites prudentes de paymaster, swap y Earn.
- Alertas, runbooks, salida soberana e incident response.
- Cohorte de prueba y soporte humano.
- Mantener Aave USDC como única estrategia.

#### Card — 25%

- Obtener propuesta, LOI o definición escrita del siguiente paso con Gnosis Pay.
- Completar unit economics con escenarios conservador/base/alto.
- Decidir Card Safe, funding y settlement solo con requisitos reales.
- Prototipar la experiencia de tarjeta sin conectar aún dinero real si el acuerdo no está cerrado.
- Definir entidad y ruta legal/compliance.

#### API — 15%

- Llevar 1–2 partners a una prueba privada estable.
- Mejorar observabilidad y reintentos solo a partir de incidencias reales.
- Documentar necesidades repetidas que podrían justificar Business.

**Criterios de salida:** mainnet técnicamente autorizable, decisión Card respaldada por datos y al menos un partner API completo de extremo a extremo.

### Semanas 11–12 — Alpha mainnet cerrada

- Lanzar GatoPago Personal a una cohorte cerrada de 25–50 usuarios si el gate de seguridad está verde.
- Mantener 1–2 integraciones API privadas como aprendizaje, no como segundo lanzamiento de marca.
- Publicar el estado real de GatoPago Card y próximos pasos sin fecha especulativa.
- Revisar la distribución 60/25/15 con datos de uso, negociación y soporte.
- No construir todavía múltiples automatizaciones, Business completo ni un segundo protocolo.

La elección ya no es “Personal o API”. Es:

> **Personal mainnet como producto principal + Card como apuesta estratégica + API privada como distribución y aprendizaje.**

---

## 12. GatoPago Card: programa estratégico crítico

No asignar fecha pública hasta tener dependencias confirmadas. Sí asignar tiempo, métricas y entregables desde la primera semana.

### Gate 1 — Elegibilidad

- tipo de programa disponible mediante el contacto con Gnosis Pay;
- país de residencia soportado por escrito;
- entidad/jurisdicción que el proveedor acepta contratar;
- KYC/KYB, sanciones y edades;
- cobertura de tarjeta virtual/física;
- Apple Pay/Google Pay si forman parte de la promesa.

### Gate 2 — Economía

- setup y mínimos mensuales;
- costo KYC y emisión;
- processor/program manager;
- fraude, chargebacks, 3DS y declines;
- soporte y disputas;
- FX, ATM, reemplazos y envío;
- reservas/colateral;
- participación real en interchange.

No subsidiar una pérdida sin límite. Cualquier incentivo de lanzamiento debe tener cohorte, duración y presupuesto máximos.

### Gate 3 — Arquitectura

- cadenas y tokens soportados;
- compatibilidad con smart accounts/ERC-4337;
- allowance o módulo que el proveedor exige;
- vault de tarjeta separado;
- límites y revocación;
- latencia de autorización;
- fallos y reversos;
- conciliación entre evento de red y movimiento onchain;
- fondeo desde Arbitrum si la tarjeta vive en otra red.

La arquitectura debe implementar un adaptador y un modelo propio de GatoPago. `Disponible` es un concepto de producto; Card Safe, allowance, módulo o settlement son implementaciones sustituibles.

### Gate 4 — Operación

- atención, fraude y disputas;
- términos del emisor;
- privacidad y vínculo KYC/onchain;
- monitoreo y reclamos;
- incident response;
- cierre o migración del programa.

### Dos gates distintos de producto

#### Gate de protagonismo estratégico — activo desde ahora

- Card visible en Home y landing como acceso anticipado;
- demanda cualificada e interviews;
- `Disponible` diseñado para futuro gasto;
- negociación, entidad y economía como trabajo prioritario;
- marca consumer construida alrededor de recibir, crecer y gastar.

#### Gate de disponibilidad — pendiente

Solo después de superar elegibilidad, economía, arquitectura y operación:

- elevar Tarjeta a navegación principal;
- adoptar públicamente “Recibe, haz crecer y gasta” como capacidad completa;
- mostrar datos, freeze, límites, compras y soporte;
- mover fondos hacia el bucket gastable del issuer;
- permitir reglas de recarga limitadas y revocables.

Gnosis Pay es el lead estratégico por el contacto existente, no una dependencia irreversible. GatoPago debe aprender profundamente su modelo sin ceder la propiedad de la experiencia ni bloquear una futura migración.

---

## 13. Seguridad, regulación y soberanía

### Mainnet no es solo cambiar el `chainId`

Checklist mínimo:

- auditoría externa y resolución de hallazgos;
- contratos desplegados, verificados y con owners documentados;
- política de upgrades y timelock;
- rotación/backup de claves del guardian, paymaster y relayer;
- límites de exposición por cuenta y por día;
- monitoreo de UserOps, colas, RPC, settlement y reorgs;
- pruebas de recuperación y cancelación;
- runbook de proveedor caído;
- salida directa de Aave;
- disclosure de riesgos y soporte.

### Bolivia

La [R.D. 082/2024 del BCB](https://www.bcb.gob.bo/?q=node%2F235234) dejó sin efecto la prohibición anterior y habilitó canales e instrumentos electrónicos para compra y venta de activos virtuales. Eso no equivale a una autorización universal para cualquier servicio financiero con cripto.

En julio de 2025, [ASFI puso en vigencia el Reglamento para Empresas de Tecnología Financiera](https://www.asfi.gob.bo/node/1176), que cubre constitución y funcionamiento y contempla un Entorno Controlado de Pruebas. La clasificación de cada flujo de GatoPago debe revisarse con asesoría legal boliviana y con la jurisdicción del proveedor correspondiente.

Recomendación de copy:

> **Puedes usar el núcleo onchain de GatoPago sin una verificación general de identidad, sujeto a los términos y la jurisdicción aplicable. Los servicios regulados pueden requerir verificación.**

No prometer que “solo la tarjeta” solicitará KYC.

### Soberanía progresiva verificable

Para que no sea solo marketing, GatoPago debe ofrecer progresivamente:

- contratos y transacciones visibles;
- exportación de actividad;
- guardian identificable y desactivable;
- backup de llaves;
- permisos visibles y revocables;
- documentación para retirar sin el frontend principal;
- compatibilidad con otra interfaz o herramienta de rescate;
- ausencia de dependencia del paymaster para retirar fondos propios.

---

## 14. Métricas que deben decidir el roadmap

### North Star

> **Cuentas financiadas que completan el ciclo recibir → decidir → usar o crecer y vuelven a hacerlo dentro de 30 días.**

No usar registros, descargas o TVL aislado como métrica principal.

### Activación

- cuenta creada;
- passkey funcional;
- backup o recuperación comprendida;
- primer fondeo;
- tiempo hasta primera operación útil.

### Pagos

- links creados;
- links abiertos;
- inicio de pago;
- conversión a pago confirmado;
- porcentaje que requiere crear cuenta;
- repetición de cobros y pagos.

### Crecer

- usuarios financiados que abren Crecer;
- depósito iniciado/completado;
- porcentaje del USDC disponible asignado;
- retiro exitoso;
- retención a 7 y 30 días;
- incidencias o dudas de riesgo.

### Card discovery

- visitantes y usuarios que abren acceso anticipado;
- formulario iniciado/completado;
- interesados cualificados por país;
- principales casos de uso;
- rango de gasto mensual esperado;
- virtual frente a física;
- relevancia de Apple Pay/Google Pay;
- usuarios activos frente a leads externos;
- entrevistas completadas;
- estado de elegibilidad, propuesta y contrato con provider.

Estas métricas sirven para producto y para negociación. Una cifra bruta de waitlist sin país, intención ni capacidad de gasto tiene poco valor.

### API

- tiempo a primer payment intent;
- intención creada → pagada;
- entrega exitosa de webhooks;
- reintentos y latencia;
- integradores activos semanales.

### Calidad

- éxito de UserOperations;
- tiempo de confirmación;
- errores por flujo;
- recuperaciones iniciadas/canceladas/ejecutadas;
- solicitudes de soporte por cada 100 operaciones;
- Web Vitals y tasa de abandono por pantalla.

### Umbrales de decisión sugeridos

- No añadir un segundo protocolo hasta que Aave tenga uso repetido y operación estable.
- No construir Business completo sin al menos tres design partners activos.
- No presentar Card como disponible ni crear su tab operativo sin provider, elegibilidad y unit economics confirmados.
- Sí mantener Card como hipótesis central y medirla desde ahora.
- No abrir mainnet masiva sin auditoría y cohorte cerrada exitosa.

---

## 15. Backlog priorizado

| Prioridad | Iniciativa | Impacto | Dependencia |
|---|---|---|---|
| P0 | Copy exacto de red, custodia, recuperación, fees y tarjeta | Evita una promesa materialmente incorrecta | Ninguna |
| P0 | Foco visible y label de onboarding | Accesibilidad y cierre de E2E | Ninguna |
| P0 | Desactivar copy mainnet de claves live cuando no hay deploy | Evita confusión y riesgo operacional | Config compartida |
| P0 | Analytics del ciclo principal | Permite decidir qué construir | Esquema de eventos |
| P0 | Acceso anticipado Card y encuesta cualificada | Valida adquisición y fortalece negociación | Privacy notice y analytics |
| P0 | Dossier y discovery estructurado con Gnosis Pay | Determina factibilidad consumer | Contacto existente |
| P1 | Saldo Disponible/Creciendo/Web3 | Expresa la nueva categoría y prepara Card | Read model existente |
| P1 | Navegación Inicio/Mover/Crecer/Actividad | Reordena el producto sin añadir alcance | Diseño y tests |
| P1 | Actividad humana y comprobantes enriquecidos | Confianza y comprensión | Metadata existente |
| P1 | Monto fijo/abierto explícito y lifecycle de cobro | Mejora links y API | Modelo de links |
| P1 | Salida soberana documentada de recuperación y Aave | Hace verificable la autocustodia | Seguridad/docs |
| P1 | Landing basada en el ciclo, no en catálogo | Alinea adquisición con producto | Decisión de copy |
| P1 | Modelo provider-neutral de saldo gastable | Evita acoplamiento futuro al issuer | Requisitos de Gnosis Pay |
| P2 | Pago con wallet externa sin cuenta | Mejora adquisición | Checkout y conexión wallet |
| P2 | Asignación manual después de cobrar | Valida pagos + DeFi | Batch actual |
| P2 | Primera regla limitada | Diferenciación real | Threat model y auditoría |
| P2 | Organizaciones/RBAC básico | Abre Business real | Design partners |
| P3 | Segundo protocolo, borrow o Explore | Amplía DeFi | Uso probado y marco de riesgo |
| Track crítico | Tarjeta, compañía y rails | Utilidad y distribución consumer | Cuatro gates externos |

---

## 16. Qué dejar de hacer durante este ciclo

- No integrar más redes solo para ampliar una lista.
- No agregar Morpho, vaults, borrow, perps o LPs antes de demostrar Aave USDC.
- No fingir que Card está disponible; sí diseñar el saldo y la marca para que encaje naturalmente.
- No acoplar `Disponible` a un Card Safe, una red o un issuer específico.
- No vender “GatoPago Business” como tesorería cuando el dashboard es una consola API.
- No perseguir bancos ni instituciones en esta etapa.
- No continuar refactors profundos del Worker salvo por seguridad, confiabilidad o una métrica real.
- No mezclar Personal, Business, Developers e Institutional en el mismo hero.
- No permitir que API/Business desplacen la marca emocional de GatoPago Personal.
- No publicar cifras de APY, fees o cobertura geográfica como constantes.
- No usar “sin gas”, “sin cuenta”, “sin KYC” o “en cualquier lugar” sin condiciones visibles.
- No lanzar mainnet masiva para cumplir una fecha de marketing.

---

## 17. Estado de verificación técnica

### Aplicación principal

- El repositorio usa Node 24.19.0 y pnpm 11.21.0; `pnpm verify` pasa completo en Windows con lint, OpenAPI, chequeos RPC/indexer, tipos de Cloudflare, builds y presupuestos de bundle.
- Pasaron 207 pruebas unitarias del servidor y 18 pruebas del runtime de Workers.
- Pasaron 124 pruebas Solidity; el único fork queda omitido cuando no se proporciona `ARBITRUM_SEPOLIA_RPC_URL`. Storage layout, cobertura, tamaños y lint también pasan. Foundry mantiene un aviso informativo de hashing en `PaymentRouter.sol:135`.
- E2E: 18 pruebas pasaron en Chrome desktop/móvil y 6 casos exclusivos del cliente se omitieron correctamente en los proyectos del dashboard. Los campos de texto, selectores personalizados, teclado y WCAG quedaron verdes.

### Landing

- `npm run build` pasó y generó 8 páginas estáticas.
- `astro check` terminó con 0 errores, 0 warnings y 4 hints por variables sin uso en scripts.
- La revisión visual desktop y mobile mostró un hero pulido y consistente, pero muy alto en móvil y todavía centrado exclusivamente en pagos.

### Interpretación

La base no está en estado “fallido”; está cerca de una buena alpha técnica. Los bloqueos para una promesa mayor son:

1. verdad de producto y accesibilidad;
2. mainnet y auditoría;
3. una experiencia que revele Disponible/Creciendo/Web3 y haga visible la visión Card;
4. evidencia de retención en un segmento;
5. acuerdo, economía y operación verificables para activar rails regulados.

---

## 18. Decisiones concretas para Daniel

1. **Adoptar la categoría:** cuenta onchain programable que conecta dinero, pagos, DeFi y mundo real sin quitar control.
2. **Adoptar la filosofía:** tu dinero sigue siendo tuyo, pero ahora puede hacer más.
3. **Adoptar la promesa Alpha:** recibe, usa y haz crecer tus dólares digitales, con USDC como unidad principal.
4. **Separar cuña y ambición:** empezar con usuarios de USDC; construir para personas que no quieren aprender Web3.
5. **Hacer protagonista la tarjeta desde la estrategia**, visible hoy como acceso anticipado y activa después del gate.
6. **Usar inmediatamente el contacto con Gnosis Pay** para resolver cobertura, entidad, economía y arquitectura.
7. **Rediseñar la home como Disponible/Creciendo/Web3**, no como selector de tokens.
8. **Mantener `Disponible` independiente del Card Vault o issuer.**
9. **Profundizar Aave USDC**, no sumar protocolos.
10. **Validar asignación manual antes de automatizar.**
11. **Mantener API/checkout como distribución** con 1–2 partners privados, sin construir Business completo.
12. **Llevar Personal a mainnet cerrada** cuando auditoría y operación estén verdes.
13. **Corregir inmediatamente claims y accesibilidad.**
14. **Asignar el esfuerzo 60/25/15** entre Personal, Card/rails y API durante el próximo ciclo.

---

## 19. Posicionamiento final recomendado

### Definición interna

> **GatoPago es una cuenta onchain programable que conecta tu dinero con pagos, DeFi y el mundo real, sin quitarte el control.**

### Promesa pública actual

> **Recibe, usa y haz crecer tus dólares digitales.**

Subcopy de precisión:

> USDC es el dinero principal de GatoPago. Puedes cobrar, pagar, cambiar y hacer crecer una parte desde una cuenta que controlas.

### Para desarrolladores hoy

> **Crea cobros y recibe confirmaciones onchain con una API.**

### Para negocios, cuando exista la superficie operativa

> **Acepta stablecoins y controla pagos y tesorería onchain desde un solo lugar.**

### Para consumidores, cuando la tarjeta esté activa

> **Recibe dólares digitales. Hazlos crecer. Gástalos donde quieras.**

### Modelo mental del producto

> **Disponible → Creciendo → Web3 → Gastar**

### Filosofía de marca

> **Tu dinero sigue siendo tuyo, pero ahora puede hacer más.**

---

## 20. Conclusión

GatoPago no necesita escoger entre consumer, pagos, DeFi y API. Necesita darles una jerarquía:

- **GatoPago Personal** construye la marca y la relación cotidiana con el dinero.
- **Card** es la hipótesis crítica para convertir dinero onchain en uso frecuente y ampliar el mercado más allá de usuarios cripto.
- **Pagos y cobros** alimentan el saldo.
- **Crecer** convierte capital ocioso en capital productivo.
- **Web3** permite profundizar sin obligar a hacerlo.
- **Smart account** conserva propiedad, seguridad y futura programabilidad.
- **API** distribuye cobros y checkout mediante otros productos.
- **Business** aparece cuando merchants reales necesitan equipos, conciliación y políticas.

La prudencia correcta es no prometer una tarjeta antes de tenerla. La ambición correcta es construir desde ahora una cuenta diseñada para recibir, crecer y gastar.

> **GatoPago administra el ciclo de vida del dinero onchain: llega, permanece disponible, crece, entra a Web3 o se gasta, mientras el usuario conserva el control.**

La estrategia operativa queda así:

> **Personal mainnet como producto principal. Card como apuesta estratégica y comercial desde hoy. API privada como distribución y aprendizaje.**

Y la idea que debe mantener coherente cada feature futura es:

> **Tu dinero sigue siendo tuyo, pero ahora puede hacer más.**

---

## Fuentes externas consultadas

- [Aave: supplying tokens y naturaleza variable de la tasa](https://aave.com/help/supplying/supply-tokens)
- [Safe: módulos de smart accounts](https://docs.safe.global/advanced/smart-account-modules)
- [Safe: riesgos de guards](https://docs.safe.global/advanced/smart-account-guards)
- [Circle: cadenas soportadas por CCTP](https://developers.circle.com/cctp/concepts/supported-chains-and-domains)
- [Gnosis Pay: países elegibles](https://help.gnosispay.com/hc/en-us/articles/39401751918612-Eligible-Countries-for-Gnosis-Pay)
- [Bridge: tarjetas financiadas desde wallet autocustodiada](https://apidocs.bridge.xyz/platform/cards/overview/noncustodial)
- [Rain: alcance y obligaciones de programas globales](https://www.rain.xyz/resources/how-to-launch-global-card-programs-without-starting-over-in-every-market)
- [Banco Central de Bolivia: R.D. 082/2024](https://www.bcb.gob.bo/?q=node%2F235234)
- [ASFI: Reglamento para Empresas de Tecnología Financiera](https://www.asfi.gob.bo/node/1176)

> Este documento contiene una recomendación de producto y arquitectura. No sustituye asesoría legal, regulatoria, contable ni una auditoría externa de seguridad.
