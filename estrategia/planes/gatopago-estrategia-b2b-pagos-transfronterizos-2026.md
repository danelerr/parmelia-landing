# GatoPago: estrategia B2B y plataforma de pagos transfronterizos

**Fecha:** 19 de agosto de 2026  
**Estado:** tesis estratégica para validación  
**Uso inmediato:** conversación y discovery con fintechs y potenciales design partners  
**Marca:** GatoPago  
**Promesa maestra:** **Tus dólares ya saben moverse.**

> Este documento describe una dirección de negocio y producto. No presenta a GatoPago como una red global ya operativa ni sustituye una revisión legal, regulatoria, contable o de seguridad por país.

> **Alcance:** este documento profundiza exclusivamente el pilar B2B de GatoPago. La estrategia completa —B2C, B2B2C y B2B— está definida en [GatoPago: estrategia integral](./gatopago-estrategia-integral-b2c-b2b2c-b2b-2026.md).

> **Mapa de todos los planes:** [GatoPago 2026–2030: índice maestro](./gatopago-indice-maestro-estrategia-2026.md).

## 1. Resumen ejecutivo

La oportunidad de GatoPago nace de un problema muy concreto:

> **Las fintechs consiguen contratos y nuevos proveedores más rápido de lo que sus sistemas pueden integrarlos.**

Cada nuevo país, moneda o proveedor puede obligar a reconstruir cotización, estados, manejo de errores, cumplimiento, conciliación y experiencia de usuario. El problema no es únicamente mover una stablecoin: es lograr que todas esas piezas funcionen como un solo sistema.

La nueva tesis recomendada es:

> **GatoPago es la capa de control y orquestación que permite a fintechs latinoamericanas abrir corredores internacionales sin reconstruir su plataforma.**

GatoPago no necesita reemplazar bancos, PSP, proveedores de FX, stablecoins o redes locales. Puede convertirlos en componentes intercambiables detrás de una interfaz estable.

La promesa comercial de GatoPago Platform sería:

> **Abre nuevas rutas sin reconstruir tu plataforma.**

Una expresión breve y especialmente útil para ventas:

> **Tu sistema no cambia. Tus rutas sí.**

La promesa maestra de la marca permanece:

> **Tus dólares ya saben moverse.**

## 2. El problema que reveló PagoFácil

El punto de partida es una situación que ya ocurre dentro de una fintech:

- existen contratos o relaciones con empresas de distintos países;
- cada integración emplea monedas, estados y reglas diferentes;
- la arquitectura actual no permite añadirlas sin modificar numerosos flujos;
- el costo técnico retrasa acuerdos que comercialmente ya podrían generar valor;
- cada nueva integración multiplica la carga de soporte, conciliación y operación.

El trabajo que GatoPago debería resolver no es simplemente “enviar stablecoins”. Es:

> **Activar nuevas monedas, proveedores y países sin obligar al cliente a rediseñar su sistema.**

Ese dolor permite definir un comprador inicial mucho más preciso que “cualquier empresa que quiera pagos globales”.

## 3. La pieza que falta en el sistema

La infraestructura base puede representarse así:

```text
Dinero local ↔ FX ↔ Stablecoins ↔ Multi-chain ↔ Pagos globales
```

Eso todavía es una cadena de componentes. El producto aparece cuando existe una capa común de control:

```text
ERP · Fintech · Marketplace · PagoFácil
                    ↓
           UNA INTENCIÓN DE PAGO
                    ↓
┌────────────────────────────────────────┐
│              GatoPago                  │
│                                        │
│  Guard    políticas y aprobaciones     │
│  Route    cotización y mejor ruta      │
│  Ledger   estado y conciliación        │
│  Trace    seguimiento y comprobante    │
└────────────────────────────────────────┘
                    ↓
 Banco ↔ FX ↔ USDC ↔ cadena ↔ payout local
```

La empresa no debería verse obligada a decidir qué token, blockchain, bridge o proveedor utilizar. Debería expresar el resultado empresarial que necesita:

> “Quiero que esta empresa reciba exactamente 50.000 BRL antes de las 16:00, con un costo máximo de 0,9%, usando proveedores autorizados y doble aprobación.”

GatoPago debería responder:

- cuánto dinero debe enviarse;
- cuánto llegará al beneficiario;
- cuándo se estima que llegará;
- cuánto costará toda la operación;
- qué ruta será utilizada;
- qué aprobaciones necesita;
- qué sucedió en cada tramo;
- cómo conciliarlo contablemente.

En este modelo, una blockchain es una posible pieza de la ruta, no la identidad del producto.

## 4. Categoría y posicionamiento

### 4.1 Categoría recomendada

En español:

> **Capa de control y orquestación para pagos transfronterizos en Latinoamérica.**

En inglés:

> **Cross-border money movement control plane for Latin American fintechs.**

Para conversaciones con inversionistas o equipos técnicos también puede utilizarse:

> **Sistema operativo de corredores financieros.**

### 4.2 Qué no debe ser la definición principal

GatoPago no debería presentarse como:

- otra wallet;
- “Stripe para stablecoins”;
- una API multichain;
- una plataforma de trading;
- un bridge;
- una tarjeta;
- una colección de proveedores de pago;
- “pagos globales rápidos” sin explicar control y conciliación.

### 4.3 Declaración de posicionamiento

> Para fintechs y PSP regionales que ya tienen relaciones con proveedores internacionales pero no pueden incorporarlos sin rehacer su plataforma, GatoPago es una capa de orquestación de pagos transfronterizos que normaliza intenciones, rutas, políticas, estados y conciliación. A diferencia de integrar cada proveedor directamente, GatoPago permite añadir corredores como conectores intercambiables detrás de una única interfaz estable.

## 5. Realidad competitiva

“Stablecoins + API + múltiples países” no es una diferenciación suficiente.

- [Circle Payments Network](https://developers.circle.com/cpn) ofrece una integración para aceptar, convertir, mover y liquidar fondos, además de modelos managed y self-managed, FX y payouts locales.
- [BVNK](https://www.bvnk.com/self-managed-payments) ya comunica intelligent routing, trading, múltiples venues, proveedores propios y externos, custodia configurable y orquestación entre fiat y stablecoins.
- [dLocal Stablecoin Full](https://www.dlocal.com/payments/stablecoins/) combina stablecoins, FX, tesorería y rails locales en mercados emergentes.
- [Bitso Business](https://bitso.com/business/developers) ofrece liquidez, stablecoins, rails locales y APIs empresariales para Latinoamérica.
- [Stripe y Bridge](https://stripe.com/blog/everything-we-announced-at-sessions-2026) ya desarrollan FX con monto de destino exacto, cross-chain, on/off-ramps y cuentas financieras basadas en stablecoins.
- [Payrails](https://www.payrails.com/orchestration) demuestra que smart routing, failover, reglas y optimización basada en rendimiento ya forman parte de la categoría de payment orchestration.

Por tanto:

> **Una API, multichain y smart routing son capacidades necesarias, pero no constituyen por sí solas el moat de GatoPago.**

La oportunidad más defendible es combinar:

1. especialización en fintechs regionales con sistemas heredados;
2. integración con contratos, licencias y proveedores que el cliente ya posee;
3. una intención de pago común e independiente del proveedor;
4. compatibilidad hacia atrás y migración progresiva;
5. rutas y decisiones transparentes;
6. un ledger y una conciliación comunes;
7. conocimiento operacional profundo de corredores latinoamericanos.

GatoPago no competiría inicialmente por tener más países. Competiría por ser la manera más rápida y controlable de convertir contratos existentes en corredores operativos.

## 6. Arquitectura de producto propuesta

Los siguientes nombres son provisionales y sirven para organizar capacidades.

| Producto | Función | Resultado que compra la empresa |
|---|---|---|
| **GatoPago Connect** | Conecta bancos, PSP, proveedores de FX, stablecoins y payout partners | No rehacer integraciones |
| **GatoPago Intent** | Recibe una instrucción empresarial normalizada | Una sola API estable |
| **GatoPago Route** | Compara costo, tiempo, liquidez, riesgo y confiabilidad | Una ruta explicable |
| **GatoPago Guard** | Aplica roles, límites, beneficiarios y aprobaciones | Control y seguridad |
| **GatoPago Ledger** | Unifica estados y movimientos | Conciliación común |
| **GatoPago Trace** | Explica cada tramo, error y comprobante | Operación y soporte |
| **GatoPago Treasury** | Predice liquidez y exposición | Menos capital atrapado |

### 6.1 GatoPago Connect

Debe permitir un modelo **bring your own providers**:

- el cliente mantiene sus contratos;
- conserva sus proveedores de liquidez;
- conserva las relaciones regulatorias aplicables;
- GatoPago aporta conectores, normalización, ejecución y observabilidad;
- sustituir o añadir un proveedor no obliga a cambiar los flujos de negocio.

Cada adaptador debe traducir entre el lenguaje del proveedor y el modelo estable de GatoPago:

- cotización;
- beneficiario;
- transferencia;
- estado;
- cancelación o devolución cuando corresponda;
- error normalizado;
- comprobante;
- conciliación.

### 6.2 GatoPago Intent

La intención de pago es el contrato estable. Describe el resultado, no la infraestructura.

Ejemplo conceptual:

```json
{
  "destination": {
    "amount": "50000.00",
    "currency": "BRL",
    "beneficiary": "ben_123"
  },
  "source_currency": "BOB",
  "constraints": {
    "deliver_before": "2026-08-21T20:00:00Z",
    "max_total_cost_bps": 90
  },
  "policy": "international_supplier"
}
```

Respuesta conceptual:

```json
{
  "source_amount": "locked_quote",
  "landed_amount": "50000.00 BRL",
  "estimated_arrival": "14 min",
  "required_approvals": 2,
  "route_plan": [
    "local_rail",
    "fx",
    "usdc",
    "local_payout"
  ],
  "status": "awaiting_approval"
}
```

La innovación no está en el JSON. Está en que un proveedor pueda reemplazarse o añadirse sin modificar el contrato que consume el cliente.

### 6.3 GatoPago Route

Debe separar tres momentos:

1. **Cotizar:** encontrar rutas posibles y fijar sus condiciones.
2. **Planificar:** seleccionar la ruta de acuerdo con las políticas del cliente.
3. **Ejecutar:** mover el dinero y reaccionar ante degradaciones o fallos.

Las variables relevantes incluyen:

- costo total;
- monto final;
- ETA;
- tasa histórica de éxito;
- liquidez;
- exposición a FX;
- proveedor y jurisdicción;
- límites operativos;
- disponibilidad del rail;
- calidad de conciliación.

### 6.4 GatoPago Guard

La seguridad debe formar parte del dominio del producto, no ser una pantalla aislada.

Capacidades objetivo:

- passkeys por miembro autorizado;
- roles y permisos;
- doble o triple aprobación según monto;
- proveedores permitidos;
- beneficiarios permitidos;
- límites por persona, corredor y periodo;
- simulación antes de ejecutar;
- cotizaciones firmadas y con expiración;
- separación entre creación, aprobación y conciliación;
- pausa de emergencia;
- recuperación con espera;
- registro auditable de cada acción.

### 6.5 GatoPago Ledger y Trace

El sistema debería normalizar estados como:

```text
created
→ quoted
→ awaiting_approval
→ executing
→ in_transit
→ delivered
→ reconciled
```

Los estados específicos de cada proveedor deben vivir dentro del adaptador. El cliente recibe una máquina de estados estable.

Cada operación debe incluir:

- un identificador único;
- idempotencia;
- historial de eventos;
- proveedor y ruta utilizados;
- cotización original;
- costos esperados y reales;
- tiempos esperados y reales;
- aprobadores;
- evidencia de cada tramo;
- comprobante compartible;
- causa normalizada si falla.

El objetivo es crear una especie de **trace ID para el dinero**.

## 7. Inteligencia de rutas: la idea inspirada en el S&P 500

No se recomienda comenzar con un sistema de trading especulativo. La analogía útil del S&P 500 es la capacidad de condensar muchas señales en un índice comprensible.

### 7.1 GatoPago RouteScore

Cada ruta podría recibir una puntuación calculada con:

- costo total real;
- velocidad p50 y p95;
- tasa de éxito;
- estabilidad del proveedor;
- liquidez disponible;
- desviación entre cotización y monto final;
- riesgo operativo;
- requisitos regulatorios;
- calidad de conciliación.

Ejemplo:

```text
BOB → BRL

Ruta A     92/100   11 min   0,74%   confiabilidad 99,2%
Ruta B     86/100    4 min   1,08%   confiabilidad 97,8%
Ruta C     pausada   liquidez insuficiente
```

### 7.2 Evolución por etapas

#### Etapa 0: shadow mode

GatoPago observa operaciones o datos históricos y calcula qué ruta habría seleccionado, sin mover dinero.

#### Etapa 1: recomendación

GatoPago propone una ruta, explica el motivo y espera aprobación humana.

#### Etapa 2: auto-routing protegido

El sistema ejecuta automáticamente solo dentro de límites, proveedores y corredores previamente autorizados.

#### Etapa 3: treasury autopilot

GatoPago recomienda dónde prefundear, cuándo rebalancear y qué exposición puede reducirse.

#### Etapa 4: índice de corredores

Con suficiente volumen y permiso para agregar información, GatoPago podría publicar métricas de costo, velocidad y confiabilidad por corredor. Esto puede convertirse en producto de datos, contenido y distribución.

### 7.3 Papel de la IA

La IA puede:

- explicar anomalías;
- resumir incidentes;
- predecir falta de liquidez;
- proponer rutas;
- sugerir ajustes de políticas;
- ayudar a investigar conciliaciones.

No debería mover dinero fuera de políticas deterministas porque “el modelo consideró que era conveniente”. Toda automatización financiera debe ser:

- limitada;
- explicable;
- auditable;
- revocable;
- simulable;
- protegida por aprobaciones cuando corresponda.

## 8. Velocidad como diferencial

La velocidad de una blockchain no equivale a la velocidad completa de un pago internacional. Compliance, FX, liquidez y payout local pueden dominar el tiempo total.

La promesa correcta es:

> **Rápido cuando puede. Predecible siempre.**

GatoPago debería vender:

- monto de destino exacto;
- hora estimada de llegada;
- costo total visible;
- estado de cada tramo;
- fallback cuando un proveedor falla;
- explicación precisa de cualquier retraso.

En pagos B2B, saber que llegarán exactamente 50.000 BRL dentro de un rango conocido puede ser más valioso que una transferencia presentada como “instantánea” cuya liquidación final nadie entiende.

### 8.1 Métricas de velocidad y confiabilidad

- tiempo para activar un corredor;
- latencia de cotización;
- tiempo end-to-end p50 y p95;
- porcentaje de operaciones entregadas dentro del ETA;
- diferencia entre costo cotizado y costo real;
- tasa de éxito por proveedor y corredor;
- número de reintentos;
- tiempo de recuperación ante una degradación;
- número de flujos que fue necesario modificar para añadir un proveedor.

## 9. Seguridad y cumplimiento como producto

Las passkeys son una base valiosa: [FIDO Alliance](https://fidoalliance.org/passkey-use-case/enterprise/) las describe como resistentes al phishing y a la reutilización de credenciales. En escenarios empresariales de alta seguridad también deben definirse políticas sobre dispositivos, recuperación, attestation y nivel de assurance.

La seguridad completa de GatoPago debería incluir:

- passkeys;
- roles y permisos;
- aprobaciones por umbral;
- allowlists;
- límites;
- simulación;
- idempotencia;
- webhooks firmados;
- ledger auditable;
- separación de responsabilidades;
- recuperación con espera;
- pausa de emergencia;
- fallback controlado;
- monitoreo y respuesta a incidentes.

También debe existir un **sobre de compliance** que pueda acompañar la operación:

- originador;
- beneficiario;
- propósito;
- factura o referencia comercial;
- entidad responsable;
- proveedor utilizado;
- resultado de las validaciones;
- evidencia necesaria para auditoría.

La actualización de la [Recomendación 16 de FATF](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/update-Recommendation-16-payment-transparency-june-2025.html) refuerza la trazabilidad de las cadenas de pago, la claridad de responsabilidades y la protección contra fraude y errores, incluida la verificación del beneficiario.

GatoPago no debe afirmar que está autorizado automáticamente en todos los países. La formulación correcta es:

> **GatoPago aplica políticas, normaliza datos y coordina la operación. Los movimientos regulados se ejecutan mediante las entidades y partners autorizados para cada jurisdicción.**

## 10. Cliente inicial y estrategia de entrada

### 10.1 ICP recomendado

> **Fintechs o PSP regionales que ya tienen contratos con proveedores de distintos países, pero cuyo sistema no puede incorporarlos sin reescribir múltiples flujos.**

Características:

- tienen operaciones existentes;
- conocen su marco regulatorio;
- poseen contratos o negociaciones avanzadas;
- cuentan con un backlog real de integraciones;
- sufren conciliación y soporte fragmentados;
- tienen personal técnico que comprende el costo del problema;
- pueden convertirse en design partners.

### 10.2 Por qué PagoFácil puede ser un buen design partner

PagoFácil podría aportar:

- un dolor auténtico;
- corredores que comercialmente ya interesan;
- relaciones con proveedores;
- flujos y datos históricos;
- conocimiento de operación;
- criterios reales de cumplimiento y conciliación;
- un entorno donde medir si la abstracción funciona.

### 10.3 Mercados posteriores

Después de demostrar el modelo con una fintech regional:

- marketplaces;
- plataformas de payroll;
- exportadores e importadores;
- agencias y equipos remotos;
- plataformas que pagan proveedores;
- empresas con tesorería distribuida;
- PSP que quieren añadir stablecoin settlement sin reconstruir su core.

## 11. Modelo comercial

Una estructura posible:

- tarifa inicial de discovery e integración del corredor;
- suscripción mensual por plataforma, sandbox y observabilidad;
- fee por transferencia exitosa o por volumen;
- fee transparente de routing o FX cuando corresponda;
- niveles premium para SLA, soporte y conciliación;
- conectores privados;
- modalidad white-label;
- módulos empresariales de seguridad y tesorería.

No se recomienda competir con “0% de comisión”. Una empresa compra:

- meses de ingeniería evitados;
- velocidad de lanzamiento;
- menos conciliación manual;
- menos errores;
- trazabilidad;
- continuidad operacional;
- control sobre proveedores;
- capacidad de cambiar de rail sin reconstruir su producto.

### 11.1 Moat potencial

El moat no existe únicamente por escribir un router. Se acumularía con:

1. biblioteca de conectores regionales;
2. modelo de dominio estable;
3. datos reales de desempeño por corredor;
4. conocimiento de fallos y conciliación;
5. políticas regulatorias y operativas por mercado;
6. relaciones con design partners;
7. capacidad de cambiar proveedores sin migraciones traumáticas;
8. confianza obtenida mediante auditorías, operación y SLA.

La ventaja de datos y red solo aparece después de procesar suficiente volumen. Antes de eso es una hipótesis, no una afirmación.

## 12. Arquitectura de marca

GatoPago no necesita elegir entre consumer y B2B. Necesita darles funciones distintas.

### GatoPago Personal

Es la vitrina y el centro emocional:

- demuestra facilidad;
- crea relación cotidiana con el dinero;
- prueba passkeys y smart accounts;
- ofrece pagos, cobros y comprobantes;
- mantiene viva la personalidad de la marca.

### GatoPago Platform

Es el motor empresarial:

- APIs;
- payment intents;
- conectores;
- rutas;
- políticas;
- webhooks;
- ledger;
- conciliación;
- observabilidad.

### GatoPago Business

Es la cabina operativa y solo debe venderse como tal cuando existan:

- organizaciones;
- miembros;
- roles;
- aprobaciones;
- conciliación;
- reportes;
- políticas;
- tesorería;
- soporte y términos empresariales.

La relación puede resumirse así:

> **Personal es la vitrina. Platform es el motor. Business es la cabina.**

## 13. Sistema verbal

### Promesa maestra

> **Tus dólares ya saben moverse.**

### GatoPago Platform

> **Abre nuevas rutas sin reconstruir tu plataforma.**

### Frase de ventas

> **Tu sistema no cambia. Tus rutas sí.**

### Frase orientada a producto

> **Dinos qué debe llegar. GatoPago resuelve el camino.**

### Frase orientada a operación

> **Una intención. Un estado. Un recibo.**

### Frase de seguridad

> **Tu dinero sigue siendo tuyo. Tus reglas también.**

### Filosofía

> **Tu dinero sigue siendo tuyo. GatoPago se ocupa del camino.**

### Palabras preferidas

- intención;
- ruta;
- corredor;
- monto final;
- costo total;
- tiempo estimado;
- control;
- política;
- aprobación;
- conciliación;
- comprobante;
- proveedor;
- dinero local;
- dólares digitales.

### Palabras que deben ir en segunda capa

- multichain;
- CCTP;
- ERC-4337;
- paymaster;
- bridge;
- settlement;
- liquidity venue;
- smart account;
- stablecoin rail.

### Evitar

- “revolucionamos las finanzas”;
- “la wallet definitiva”;
- “instantáneo siempre”;
- “sin comisiones”;
- “compliance incluido en todo el mundo”;
- “IA autónoma que hace trading por ti”;
- “una API para cualquier cosa”;
- presentar multichain como beneficio humano.

## 14. Meli dentro de la experiencia empresarial

Meli puede funcionar como guía visual del movimiento sin quitar seriedad al producto.

Puede:

- recorrer los tramos pixelados de una ruta;
- mostrar qué parte está esperando;
- indicar cuando cambia el proveedor seleccionado;
- celebrar una liquidación exitosa;
- explicar un problema en lenguaje humano;
- acompañar sandbox, onboarding y estados vacíos;
- mostrar visualmente que el dinero sigue avanzando.

No debe:

- reemplazar una advertencia de riesgo;
- trivializar una operación fallida;
- ocultar el proveedor o costo;
- aparecer como única señal en una aprobación crítica;
- distraer durante firmas o incidentes.

La personalidad visual puede utilizar:

- rutas segmentadas inspiradas en píxeles;
- cuadrados que se activan cuando cada tramo se completa;
- movimiento con propósito, no loops decorativos;
- Meli transportando un paquete en estados de preparación;
- un comprobante final que conserve la identidad cálida de GatoPago;
- soporte de `prefers-reduced-motion` y animaciones pausables.

La identidad permite contar la complejidad de forma humana:

> Meli muestra el recorrido. GatoPago ejecuta las reglas. La empresa conserva el control.

## 15. Propuesta para la reunión

El objetivo de la reunión no debe ser obtener una opinión general. Debe ser conseguir un caso real que pueda convertirse en piloto.

### 15.1 Preguntas de discovery

1. ¿Cuál es la integración internacional firmada que más valor tiene y sigue bloqueada?
2. ¿Qué país, monedas, proveedor y volumen esperado involucra?
3. ¿Cuántos servicios, flujos o pantallas deben modificarse actualmente?
4. ¿Dónde está el acoplamiento principal: moneda, estados, ledger, compliance, refunds o conciliación?
5. ¿Quién entrega la cotización de FX?
6. ¿Quién asume la variación de precio y cuánto dura una cotización?
7. ¿Qué significa exactamente “completado” para PagoFácil?
8. ¿Qué sucede con pagos parciales, duplicados, devueltos o demorados?
9. ¿Cuánto trabajo manual existe después de la transferencia?
10. ¿Qué datos de originador y beneficiario exige cada partner?
11. ¿Quién realiza KYB, KYC, sanctions screening y Travel Rule cuando aplica?
12. ¿Pueden compartir un flujo, payload y estados anonimizados?
13. ¿Qué métrica demostraría que una nueva arquitectura resolvió el problema?
14. ¿Estarían dispuestos a probar una capa normalizada con uno de esos corredores?

### 15.2 Petición de cierre

> “Dame la integración pendiente más dolorosa. La modelamos sin tocar producción y comprobamos si GatoPago puede convertirla en un conector reutilizable. Si funciona, PagoFácil se convierte en nuestro primer design partner.”

## 16. Piloto recomendado

### Fase 1: mapa del corredor

- elegir un solo corredor;
- seleccionar un único caso, por ejemplo pago a proveedores;
- documentar actores, contratos, monedas y estados;
- identificar dónde cambia hoy el sistema;
- definir criterios de éxito.

### Fase 2: contrato normalizado

- definir la intención de pago;
- definir una máquina de estados común;
- mapear errores del proveedor;
- diseñar idempotencia y webhooks;
- preparar el adaptador;
- definir el registro de auditoría.

### Fase 3: shadow mode

- utilizar operaciones o datos históricos anonimizados;
- calcular rutas y cotizaciones hipotéticas;
- comparar costo, tiempo y fallos;
- medir cuánto código existente tendría que cambiar;
- no mover dinero.

### Fase 4: sandbox

- integrar el ambiente de pruebas del partner;
- ejecutar operaciones simuladas;
- probar reintentos, expiraciones y duplicados;
- verificar webhooks y conciliación;
- ensayar fallback si existe más de un proveedor.

### Fase 5: operación controlada

Solo después de validar seguridad, contratos y responsabilidades regulatorias:

- volumen limitado;
- beneficiarios permitidos;
- doble aprobación;
- límites de monto;
- monitoreo manual reforzado;
- plan de pausa y reversión operacional;
- revisión conjunta después de cada operación.

### 16.1 Criterios de éxito

El piloto gana si:

- PagoFácil integra una sola interfaz;
- el segundo proveedor puede añadirse sin cambiar sus flujos de negocio;
- cada operación tiene un estado y comprobante;
- los fallos son explicables;
- costo y ETA pueden compararse;
- la conciliación deja de ser artesanal;
- existe una reducción medible del tiempo de integración;
- las responsabilidades regulatorias quedan claramente asignadas.

## 17. Pitch de 30 segundos

> Hoy una fintech puede conseguir contratos en cinco países y aun así tardar meses en activarlos, porque cada moneda y proveedor obliga a rehacer cotización, estados, seguridad y conciliación. GatoPago crea una capa única entre el producto y esos rieles. La empresa nos dice quién debe recibir, cuánto, en qué moneda y cuándo; GatoPago aplica sus reglas, selecciona la ruta, ejecuta y devuelve un solo estado y comprobante. No vendemos “multichain”. Vendemos abrir corredores nuevos sin reconstruir la plataforma.

## 18. Pitch extendido

> Los pagos internacionales no fallan por falta de proveedores. Fallan porque bancos, FX, stablecoins, cadenas y payouts hablan lenguajes distintos. Cada nueva integración termina filtrándose al producto, al ledger, a soporte y a conciliación.
>
> GatoPago convierte ese conjunto de proveedores en una sola capa de control. La fintech expresa una intención: quién debe recibir, cuánto, en qué moneda, antes de qué momento y bajo qué políticas. GatoPago cotiza las rutas disponibles, aplica límites y aprobaciones, ejecuta mediante los proveedores autorizados y devuelve un estado y comprobante normalizados.
>
> El objetivo es que una fintech pueda incorporar un país o cambiar un proveedor sin reconstruir sus flujos. Empezamos con un corredor y un design partner real. Con cada integración acumulamos conectores, datos de desempeño y conocimiento operativo que hacen mejores las siguientes rutas.

## 19. Qué puede afirmarse hoy

GatoPago ya posee una base técnica relevante:

- payment intents;
- API y sandbox;
- idempotencia;
- webhooks firmados;
- ledger;
- pagos mediante links y QR;
- passkeys;
- smart accounts ERC-4337;
- gas patrocinado;
- conciliación de eventos onchain;
- una aplicación consumer que puede actuar como referencia.

Pero el estado actual también debe comunicarse honestamente:

- es una alpha en Arbitrum Sepolia;
- no es una red global productiva;
- no cuenta todavía con organizaciones, RBAC y aprobaciones empresariales completas;
- no posee todos los conectores locales;
- no debe afirmar cobertura regulatoria global;
- no debe prometer velocidad, costo o disponibilidad sin un corredor operativo medido.

La reunión debe presentar una dirección construible y una invitación a diseñar el primer corredor, no una infraestructura que ya procesa dinero empresarial en producción.

## 20. Decisión estratégica

La oportunidad B2B no obliga a eliminar GatoPago Personal. Permite que cada superficie tenga una función:

- **Personal construye confianza y demuestra la experiencia.**
- **Platform convierte capacidades en infraestructura integrable.**
- **Business aparece cuando existen necesidades reales de equipos y operación.**

No se recomienda cambiar todo el roadmap por una conversación prometedora. La hipótesis debe subir de prioridad cuando existan:

1. un corredor real;
2. acceso al problema técnico;
3. un responsable del lado del partner;
4. datos o payloads anonimizados;
5. una métrica de éxito;
6. disposición para ejecutar un piloto.

Si la reunión obtiene esos elementos, GatoPago ya no tendría únicamente una idea creativa. Tendría el comienzo de una empresa B2B validable.

## 21. Síntesis final

La narrativa completa queda así:

> **Tus dólares ya saben moverse.**  
> GatoPago Personal les da una cuenta.  
> GatoPago Platform les encuentra el camino.  
> **Abre nuevas rutas sin reconstruir tu plataforma.**

La tesis empresarial puede resumirse en una sola oración:

> **GatoPago transforma una intención empresarial en un pago transfronterizo controlado, trazable y conciliable, sin obligar a la fintech a reconstruir su producto para cada proveedor, moneda o país.**

## Fuentes de referencia

- [Circle Payments Network](https://developers.circle.com/cpn)
- [BVNK: Self-managed stablecoin payments](https://www.bvnk.com/self-managed-payments)
- [dLocal: Stablecoin Full](https://www.dlocal.com/payments/stablecoins/)
- [Bitso Business para developers](https://bitso.com/business/developers)
- [Stripe Sessions 2026](https://stripe.com/blog/everything-we-announced-at-sessions-2026)
- [Payrails: Payment Orchestration](https://www.payrails.com/orchestration)
- [FIDO Alliance: Enterprise passkeys](https://fidoalliance.org/passkey-use-case/enterprise/)
- [FATF: actualización de la Recomendación 16](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/update-Recommendation-16-payment-transparency-june-2025.html)
