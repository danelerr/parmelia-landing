# GatoPago Embedded: playbook B2B2C 2026–2030

> **Estado:** estrategia objetivo y manual de validación. La mayoría de capacidades descritas no están disponibles como producto comercial.  
> **Fecha de corte:** 19 de agosto de 2026.  
> **Propósito:** explicar cómo una empresa, comunidad o plataforma puede entregar la experiencia GatoPago a sus usuarios sin reconstruir wallets, pagos, seguridad y operación desde cero.  
> **Documento superior:** [estrategia integral B2C, B2B2C y B2B](./gatopago-estrategia-integral-b2c-b2b2c-b2b-2026.md).  
> **Producto de destino:** [plan maestro de GatoPago Personal](./gatopago-plan-maestro-b2c-2026.md).  
> **Contrato API existente:** [API Design](https://github.com/danelerr/parmelia-links/blob/main/API_DESIGN.md).

---

## 0. Tesis ejecutiva

Embedded no es “vender la API”. Es convertir el momento en que alguien recibe, cobra o paga dentro de otra plataforma en una puerta de entrada a una cuenta GatoPago que conserva utilidad fuera de esa plataforma.

La promesa para el partner es:

> **Entrega dinero digital útil, no solo un payout.**

La promesa para el usuario final sigue siendo:

> **Tus dólares ya saben moverse.**

El partner puede originar una experiencia —un pago de nómina, un reward, una venta, una remesa, un cobro— y GatoPago convierte ese evento en:

- una cuenta protegida;
- saldo comprensible;
- comprobante y trazabilidad;
- opciones para usar, guardar, retirar o crecer;
- una relación que el usuario puede conservar sin quedar atrapado en el partner.

El punto de entrada recomendado no son los bancos más grandes. Son organizaciones con un flujo real, una comunidad delimitada y dolor operativo observable:

1. comunidades, grants y programas de incentivos;
2. equipos remotos y plataformas de payroll/contractors;
3. marketplaces de talento o creadores;
4. fintechs y PSP regionales con un caso de payout/cobro concreto;
5. comercios/plataformas que necesitan checkout y conciliación;
6. instituciones financieras, solo después de madurez operativa y regulatoria.

---

## 1. Qué es y qué no es

### 1.1 Definición

**GatoPago Embedded** es la capa de producto que permite a terceros integrar cuentas, cobros, payouts, payment intents, actividad y capacidades financieras de GatoPago dentro de sus propios journeys.

Puede presentarse como:

- link o página alojada;
- checkout co-branded;
- widgets/componentes;
- SDK;
- API headless;
- invitación masiva a GatoPago Personal;
- experiencia de payout que crea o conecta una cuenta del usuario.

### 1.2 Lo que no debe ser

- una white label que borra toda responsabilidad;
- custodia improvisada para acelerar una venta;
- un dashboard genérico de “cripto-as-a-service”;
- una promesa de cobertura global sin partners y licencias;
- un fork de GatoPago para cada cliente;
- una API síncrona que declare éxito antes de la finalidad real;
- un mecanismo para convertir al partner en dueño de fondos del usuario por defecto;
- una vía para hacer KYC una vez y reutilizarlo universalmente sin base legal ni consentimiento.

### 1.3 Resultado ideal

```text
Partner origina una intención
            ↓
GatoPago crea una experiencia segura
            ↓
Usuario recibe o paga
            ↓
Partner obtiene estado y conciliación
            ↓
Usuario conserva cuenta, control y utilidad
```

---

## 2. Por qué B2B2C importa

### 2.1 Reduce el problema del cold start

Una cuenta financiera vacía no tiene valor. Embedded trae al usuario con dinero, un pagador, una compra o una comunidad ya presente. La adquisición incluye el primer caso de uso.

### 2.2 Crea distribución sin convertir la marca en infraestructura invisible

GatoPago puede estar detrás del flujo y, aun así, construir confianza mediante una firma clara: “Cuenta y pagos provistos por GatoPago”, comprobantes, seguridad y una transición voluntaria a Personal.

### 2.3 Mejora el B2C

Cada partner revela:

- orígenes frecuentes;
- preguntas de usuarios reales;
- rutas que fallan;
- tiempos esperados;
- necesidades de soporte;
- patrones de conciliación;
- capacidades que generan hábito después del payout.

### 2.4 Alimenta Platform

Embedded es el producto intermedio que prueba si Connect, Intent, Guard, Ledger y Trace funcionan fuera de la propia app antes de convertirse en una plataforma empresarial más amplia.

---

## 3. ICP y secuencia de entrada

### 3.1 Matriz de partners

| ICP                     | Flujo inicial            | Valor para el partner                     | Valor para el usuario             | Complejidad |
| ----------------------- | ------------------------ | ----------------------------------------- | --------------------------------- | ----------: |
| Grants/comunidades      | Rewards o pagos por lote | Menos wallets erróneas, estados y recibos | Cuenta útil tras recibir          |  Baja–media |
| Equipos remotos         | Payout mensual           | Menos operación manual y trazabilidad     | Cobra, guarda y usa               |       Media |
| Marketplace de talento  | Payout por trabajo       | Mejor experiencia de retiro               | Continuidad fuera del marketplace |       Media |
| Plataforma de creadores | Tips/ingresos            | Payout más rápido y global                | Identidad cobrable                |       Media |
| PSP/fintech regional    | Corredor específico      | Añade ruta sin rehacer todos los flujos   | Nueva forma de recibir/pagar      |        Alta |
| Comercio/plataforma     | Checkout                 | Aceptación y conciliación                 | Pago desde GatoPago o wallet      |  Media–alta |
| Banco/institución       | Cuenta o rail stablecoin | Tiempo de salida al mercado               | Experiencia regulada              |    Muy alta |

### 3.2 Orden recomendado

#### Ola 1 — comunidades y design partners

Características:

- 50–500 usuarios potenciales;
- flujo conocido;
- decisor accesible;
- tolerancia a sandbox/Alpha;
- feedback rápido;
- volumen limitado.

Objetivo: comprobar onboarding, payment intents, lotes, estados, webhooks, recibos y soporte.

#### Ola 2 — payroll y marketplaces pequeños

Características:

- pagos repetitivos;
- mayor exigencia de conciliación;
- necesidad real de KYB/KYC;
- posibilidad de adquisición recurrente.

Objetivo: demostrar repetición, confiabilidad y transición hacia Personal.

#### Ola 3 — fintechs y PSP

Características:

- múltiples proveedores y monedas;
- riesgo regulatorio y operativo mayor;
- SLA, seguridad y procurement;
- integración más profunda.

Objetivo: validar que GatoPago puede agregar una ruta/capacidad sin obligar al partner a reconstruir su core.

### 3.3 Score de oportunidad

Puntuar de 0 a 5 y ponderar:

| Variable                       | Peso |
| ------------------------------ | ---: |
| Flujo real y frecuencia        |  20% |
| Dolor operativo actual         |  15% |
| Usuarios dentro de la cuña B2C |  15% |
| Decisor y sponsor              |  10% |
| Viabilidad regulatoria         |  15% |
| Ruta y liquidez disponibles    |  10% |
| Capacidad técnica del partner  |   5% |
| Aprendizaje reusable           |  10% |

Un design partner debe superar 70/100 y no tener un veto legal, de seguridad o custodia.

### 3.4 Anti-ICP

- pide “todo LATAM” para una fecha fija;
- no puede explicar quién controla fondos;
- quiere ocultar fees o identidad del proveedor;
- depende de un activo/red no soportado;
- exige features exclusivos no reusables;
- no asigna dueño técnico y operativo;
- busca arbitraje regulatorio;
- solo ofrece exposición de marca, sin flujo ni usuarios;
- quiere producción antes de sandbox y shadow mode.

---

## 4. Jobs del partner y del usuario

### 4.1 Jobs del partner

- “Quiero pagar a cien personas sin validar manualmente cien direcciones”.
- “Quiero añadir USDC sin rehacer mi ledger”.
- “Quiero saber si un pago fue recibido, no solo enviado”.
- “Quiero reconciliar cada movimiento con mi orden original”.
- “Quiero que el usuario entienda qué ocurrió sin que mi soporte aprenda blockchain”.
- “Quiero empezar con un link alojado y migrar a API si funciona”.
- “Quiero límites, idempotencia, webhooks y un sandbox realista”.
- “Quiero un responsable cuando un proveedor o red falle”.

### 4.2 Jobs del usuario final

- “Quiero recibir sin abrir otra cuenta inútil”.
- “Quiero saber quién me paga y por qué”.
- “Quiero conservar el dinero o retirarlo por una ruta clara”.
- “Quiero usar la cuenta después de salir del marketplace”.
- “Quiero entender qué información comparte cada empresa”.
- “Quiero recuperar mi acceso sin depender del pagador”.

### 4.3 Trabajo compartido

> **Completar una transferencia de valor con contexto, control y evidencia que ambas partes entienden.**

---

## 5. Casos de uso prioritarios

### 5.1 Community Drops

Una comunidad carga o conecta una lista de destinatarios, montos y conceptos. GatoPago:

- valida formato y duplicados;
- permite reclamar mediante link cuando falta cuenta;
- muestra simulación de costes;
- procesa por lote con estados individuales;
- genera recibos;
- exporta conciliación;
- invita al receptor a conservar su cuenta.

No se usa como airdrop anónimo ni como mecanismo de adquisición sin consentimiento.

### 5.2 Payroll Link

El equipo genera un payout mensual y el trabajador elige recibir en su cuenta GatoPago o en una ruta compatible.

V1:

- monto y concepto;
- estado;
- receipt;
- CSV/API;
- wallet o GatoPago;
- recordatorio y expiración.

Futuro:

- calendario;
- múltiples monedas de origen;
- separación automática en bolsillos;
- documentos/facturas vinculados;
- roles y aprobaciones.

### 5.3 Marketplace Payout

Después de una venta/trabajo:

1. marketplace crea payment intent/payout;
2. usuario conecta o crea cuenta;
3. revisa monto, moneda, fees y disponibilidad;
4. recibe;
5. marketplace recibe webhook final;
6. usuario puede retirar, guardar o usar en Personal.

### 5.4 Checkout

El comercio crea una intención con monto, moneda, referencia y expiración. El pagador usa:

- GatoPago;
- wallet externa cuando esté implementado;
- ruta futura de fiat/partner.

El comercio recibe estado normalizado y evidencia. Un checkout no debe exigir crear GatoPago para pagar, salvo que la capacidad/regulación lo requiera y se explique antes.

### 5.5 Partner-funded account

Una organización invita al usuario y financia el primer saldo o costo de operación. Debe diferenciar:

- incentivo del partner;
- saldo del usuario;
- expiración o condiciones;
- quién paga gas/fees;
- prevención de sybil/fraude.

### 5.6 Embedded Card futuro

Un partner ofrece una tarjeta asociada a la cuenta GatoPago del usuario. Solo después de que el programa de Card de GatoPago cumpla sus propios gates y se defina quién es issuer/program manager, quién hace KYC, quién atiende fraude y cómo se presenta la marca.

---

## 6. Modos de integración

### 6.1 Escalera de madurez

| Nivel | Producto                          | Tiempo objetivo tras madurez | Ideal para                   |
| ----- | --------------------------------- | ---------------------------: | ---------------------------- |
| 0     | Invitaciones y operación asistida |                         Días | Discovery/piloto             |
| 1     | Links alojados                    |                  1–2 semanas | Comunidades/equipos          |
| 2     | Checkout/payout co-branded        |                  2–4 semanas | Marketplaces                 |
| 3     | Componentes embebidos             |                  4–8 semanas | Producto con frontend propio |
| 4     | API + webhooks                    |                 6–12 semanas | Fintech/PSP                  |
| 5     | Headless + políticas/rutas        |                     Proyecto | Partners maduros             |

Los tiempos son objetivos futuros y dependen de compliance, alcance y readiness; no son promesas comerciales actuales.

### 6.2 Hosted

GatoPago controla UI, seguridad, actualización y compliance del flujo dentro del alcance acordado.

Ventajas:

- implementación rápida;
- menor superficie del partner;
- comportamiento consistente;
- mejor para aprender.

Limitación: menor control visual y transición de dominio visible.

### 6.3 Co-branded

Partner aporta logo/acento y GatoPago conserva estructura, disclosures y firma de confianza.

Regla:

> La personalización nunca puede esconder quién opera cada parte del servicio.

### 6.4 Components/SDK

Bloques versionados:

- `<GatoAccountOnboarding>`;
- `<GatoReceive>`;
- `<GatoPay>`;
- `<GatoPayoutClaim>`;
- `<GatoActivity>`;
- `<GatoReceipt>`;
- `<GatoSecurityStatus>`;
- `<GatoSupportContext>`.

Los nombres son arquitectura objetivo, no componentes necesariamente existentes.

### 6.5 Headless API

Solo para partners con capacidad suficiente. Requiere certificación de:

- copy y disclosures;
- autorización;
- tratamiento de estados;
- manejo de datos;
- soporte;
- seguridad de webhooks;
- reconciliación;
- experiencia de recuperación/salida.

---

## 7. Modelos de cuenta, control y custodia

### 7.1 Principio por defecto

Cuando el producto se presenta como GatoPago Personal o cuenta del usuario, el usuario debe conservar control. Un partner no obtiene autoridad amplia sobre fondos por conveniencia.

### 7.2 Matriz

| Modelo                         | Control del dinero          | Inicio de acciones              | Caso                       |
| ------------------------------ | --------------------------- | ------------------------------- | -------------------------- |
| Cuenta Personal conectada      | Usuario                     | Usuario o intent preparado      | Payroll/payout             |
| Cuenta creada al reclamar      | Usuario tras onboarding     | Partner origina, usuario acepta | Grants/marketplace         |
| Cuenta con política limitada   | Usuario + permiso explícito | Regla delimitada                | Pagos recurrentes futuros  |
| Wallet del partner             | Partner                     | Partner                         | Tesorería B2B, no Personal |
| Custodia de proveedor regulado | Proveedor                   | Según contrato                  | Fiat/Card donde aplique    |

### 7.3 Consentimiento granular

Un permiso especifica:

- quién lo recibe;
- propósito;
- datos;
- acciones;
- activo/red;
- límites;
- vigencia;
- revocación;
- consecuencias de revocar.

“Aceptar términos” no sustituye un permiso financiero comprensible.

### 7.4 Portabilidad

El usuario puede:

- conservar cuenta al abandonar el partner;
- ver y revocar conexiones;
- exportar actividad;
- administrar recuperación;
- retirar por rutas disponibles;
- entender qué datos conserva cada parte.

---

## 8. Journey del usuario embebido

### 8.1 Entrada contextual

La pantalla dice primero:

- quién inicia la invitación/pago;
- cuánto y por qué;
- qué es GatoPago;
- si crear cuenta es opcional;
- qué datos se compartirán;
- costes y tiempo.

### 8.2 Cuenta existente

- abrir/deep link;
- verificar dominio y partner;
- mostrar intención;
- autorizar;
- devolver al partner con estado seguro.

### 8.3 Usuario nuevo

- preview del valor antes de registro;
- onboarding mínimo;
- passkey/cuenta;
- KYC solo si la capacidad lo requiere;
- recepción/reclamo;
- siguiente acción voluntaria;
- explicación de independencia respecto del partner.

### 8.4 Estado asíncrono

El usuario puede cerrar y volver. El partner y GatoPago resuelven por `intent_id`, no por una sesión frágil.

Estados mínimos:

- `created`;
- `requires_action`;
- `processing`;
- `succeeded`;
- `failed`;
- `expired`;
- `cancelled`;
- `refunded` cuando exista semántica real;
- `under_review` para rutas reguladas/fraude.

Los nombres públicos se traducen a lenguaje humano.

### 8.5 Salida y retorno

El callback nunca incluye secretos ni confía únicamente en parámetros del navegador. El partner verifica el estado vía API/webhook firmado.

---

## 9. Arquitectura de producto y API

### 9.1 Núcleo común

```text
Organizations / Projects / Environments
                │
                ├── API keys and scoped credentials
                ├── Users / Accounts / Connections
                ├── Payment & Payout Intents
                ├── Routes / Quotes / Fees
                ├── Policies / Limits / Risk decisions
                ├── Ledger / Events / Receipts
                ├── Webhooks / Replay / Dead-letter queue
                └── Support / Audit / Exports
```

### 9.2 Entidades mínimas

- `organization`;
- `project`;
- `environment` (`sandbox`, futuro `live`);
- `partner_user`;
- `gato_account`;
- `connection`;
- `payment_intent`;
- `payout_intent`;
- `quote`;
- `route`;
- `transaction_attempt`;
- `ledger_entry`;
- `receipt`;
- `webhook_endpoint`;
- `event`;
- `risk_decision`;
- `support_case`.

### 9.3 Contrato de intención

Toda intención contiene:

- identificador único;
- idempotency key del partner;
- monto y moneda/activo de referencia;
- propósito/referencia;
- pagador/receptor cuando corresponda;
- métodos/rutas permitidos;
- expiración;
- metadata limitada;
- estado agregado;
- intentos subyacentes;
- fees y resultado neto;
- timestamps;
- receipt/evidence.

### 9.4 Idempotencia

- obligatoria para creación y mutaciones financieras;
- acotada por organización/endpoint;
- mismo key + mismo payload devuelve el resultado previo;
- mismo key + payload distinto produce conflicto;
- ventana y retención documentadas;
- idempotencia no reemplaza conciliación.

### 9.5 Webhooks

- firma con timestamp y secreto rotatable;
- tolerancia de reloj documentada;
- `event_id` único;
- entrega at-least-once;
- consumidor idempotente;
- retries con backoff;
- historial y replay;
- endpoint health;
- dead-letter y alertas;
- orden no garantizado salvo contrato explícito.

### 9.6 Sandbox

Debe simular:

- éxito inmediato;
- procesamiento prolongado;
- rechazo;
- expiración;
- firma pendiente;
- proveedor caído;
- webhook duplicado/desordenado;
- revisión KYC;
- refund cuando aplique;
- rate limits.

Un sandbox que solo responde 200 no prepara una integración.

### 9.7 Versionado

- versión estable explícita;
- changelog;
- deprecación con ventana;
- compatibilidad contractual;
- migraciones probables documentadas;
- SDKs generados/probados desde schema;
- no romper webhooks silenciosamente.

---

## 10. Dashboard del partner

### 10.1 V1

- claves de sandbox;
- payment/payout intents;
- eventos;
- webhooks;
- logs de entrega y replay;
- usuarios/cuentas vinculadas con privacidad;
- estados y receipts;
- exportación CSV;
- documentación contextual;
- estado del sistema.

### 10.2 V2

- proyectos y miembros;
- roles;
- límites;
- branding;
- analytics de embudo;
- conciliación;
- casos de soporte;
- configuración de métodos/rutas;
- test scenarios.

### 10.3 V3

- políticas;
- aprobación de lotes;
- RouteScore y comparación;
- ledger operacional;
- reportes financieros;
- auditoría y compliance exports;
- multi-entity/multi-country.

No llamar “Business” al dashboard actual mientras sea principalmente una consola de desarrolladores.

---

## 11. Responsabilidades y compliance

### 11.1 La matriz se firma por integración

| Área                          |            Partner |          GatoPago | Proveedor regulado |              Compartida |
| ----------------------------- | -----------------: | ----------------: | -----------------: | ----------------------: |
| Adquisición y promesa inicial |                  ✓ |                   |                    |                revisión |
| KYB del partner               |                    |                 ✓ |       puede apoyar |                         |
| KYC del usuario               |            depende |           depende |          frecuente |  definición contractual |
| Custodia/control              | depende del modelo |           depende |            depende |              disclosure |
| Screening/monitoring          |  depende del flujo | depende del flujo |            depende |            coordinación |
| Sanctions/geo restrictions    |                    |                   |                    |                       ✓ |
| Soporte L1                    |          frecuente |           posible |                    |                contrato |
| Soporte técnico L2/L3         |                    |                 ✓ |                  ✓ |            coordinación |
| Chargebacks/disputas Card     |                    |                   |     issuer/program |     partner/GatoPago UX |
| Ledger y conciliación         |             propio |        plataforma |         settlement |                       ✓ |
| Incidente de datos            |             propio |            propio |             propio | notificación coordinada |

No se rellena con “GatoPago se encarga de compliance”. Se determina por entidad, jurisdicción, flujo de fondos y contrato.

### 11.2 KYB del partner

- constitución y actividad;
- beneficiarios finales;
- jurisdicciones;
- caso de uso;
- origen/volumen de fondos;
- licencias aplicables;
- políticas AML/fraude;
- seguridad;
- subprocesadores;
- sanciones y reputación;
- responsable operativo.

### 11.3 Claims gate

El partner no puede publicar sin revisión:

- “cuenta bancaria”;
- “dólares garantizados”;
- “sin comisiones”;
- “instantáneo”;
- “disponible en todo el mundo”;
- “regulado por GatoPago”;
- “rendimiento seguro”;
- “Card disponible”;
- “el usuario conserva control” si la arquitectura usada no lo garantiza.

### 11.4 Bolivia

El marco de ETF y el Entorno Controlado de Pruebas ofrecen una ruta para validar innovación bajo supervisión. A la vez, los flujos con activos virtuales y servicios de pago pueden activar obligaciones ante ASFI, BCB y UIF. Cada piloto local necesita memo legal específico y, si corresponde, socio autorizado o ingreso al entorno regulado; una integración técnica no autoriza la actividad.

---

## 12. Seguridad B2B2C

### 12.1 Modelo de amenazas

- API key filtrada;
- webhook falsificado/replay;
- partner comprometido;
- takeover del usuario;
- callback manipulado;
- sustitución de destinatario;
- doble procesamiento;
- metadata con PII/secreto;
- tenant escape;
- abuso de subsidios;
- integración que declara éxito prematuramente;
- insider con permisos excesivos;
- dependencia de proveedor/ruta.

### 12.2 Controles mínimos

- credenciales por entorno y scopes;
- rotación/revocación;
- rate limits y cuotas;
- allowlists opcionales;
- firma de webhooks;
- RBAC;
- MFA/passkey para dashboard;
- auditoría inmutable de administración;
- cifrado y gestión de secretos;
- tenant isolation probado;
- idempotencia;
- límites por monto/velocidad;
- circuit breakers;
- reconciliación independiente;
- pentest antes de producción;
- programa de vulnerabilidades cuando haya capacidad de respuesta.

### 12.3 Certificación de integración

Antes de live:

- manejo de todos los estados;
- verificación de webhook;
- deduplicación;
- retries;
- mensajes correctos al usuario;
- no exposición de secretos;
- callbacks seguros;
- conciliación;
- soporte/contacto;
- pruebas de carga y límites;
- runbook de caída;
- rollback/feature flag.

---

## 13. Marca distribuida

### 13.1 Tres modos

| Modo           | Firma                         | Uso                                      |
| -------------- | ----------------------------- | ---------------------------------------- |
| GatoPago-first | Marca y UI GatoPago           | Link, claim, cuenta Personal             |
| Co-branded     | Partner × GatoPago            | Payroll, marketplace, checkout           |
| Powered by     | Partner domina, firma visible | Componentes maduros/headless certificado |

### 13.2 Elementos no negociables

- identidad del operador/proveedor;
- estado de testnet/live;
- control/custodia explicados;
- fees y resultado neto;
- soporte y privacidad;
- estados semánticos;
- firma del receipt;
- seguridad y recuperación.

### 13.3 Meli en Embedded

Meli puede:

- recibir al usuario;
- sostener el paquete del payout;
- mostrar QR;
- explicar un estado;
- guiar hacia Personal.

Meli no puede:

- sustituir la marca del partner en cada pantalla;
- aparecer en un error grave sonriendo;
- ocultar un requisito legal;
- celebrar que el usuario aceptó riesgo;
- convertir un flujo empresarial en un juego infantil.

### 13.4 Theming

Variables permitidas:

- logo/acento del partner;
- tipografía secundaria compatible;
- radio dentro de rangos;
- copy contextual;
- imágenes del programa.

Variables protegidas:

- colores de riesgo/éxito;
- estructura de confirmación;
- jerarquía de fees;
- foco accesible;
- disclosures;
- estados;
- controles de seguridad.

---

## 14. Modelo comercial

### 14.1 Paquetes hipotéticos

#### Launch

- hosted links/checkout;
- sandbox;
- dashboard básico;
- volumen limitado;
- soporte estándar;
- setup bajo o nulo para design partners.

#### Grow

- co-branding;
- componentes/API;
- webhooks avanzados;
- analytics;
- mayor volumen;
- soporte de integración;
- fee mensual + uso.

#### Scale

- headless;
- políticas/rutas;
- ambientes adicionales;
- SLA contratado;
- soporte dedicado;
- pricing por compromiso;
- security/compliance pack.

### 14.2 Componentes de precio

- setup/integración;
- plataforma mensual;
- fee por intención completada;
- bps por volumen donde aplique;
- fee por wallet/cuenta activa si existe coste real;
- costos de rutas/proveedores trasladados con transparencia;
- soporte/SLA;
- personalización excepcional.

### 14.3 Principios de pricing

- cobrar por valor completado, no por errores;
- separar fee de GatoPago, network y partner;
- no asumir margen de interchange hasta tener programa;
- no subsidiar una integración irrepetible;
- descuentos atados a compromiso y aprendizaje;
- revisión por país/ruta;
- mínimos solo después de demostrar capacidad.

### 14.4 Unit economics de partner

```text
MRR + fees netos de uso
− proveedores/rutas
− gas/subsidios
− soporte e implementación amortizada
− fraude/pérdidas
− compliance variable
= contribución del partner
```

Medir también valor distribuido a Personal: activados, retenidos y volumen posterior al primer payout.

---

## 15. Venta y discovery

### 15.1 Pitch de 20 segundos

> GatoPago convierte un payout o cobro digital en una cuenta que el usuario realmente puede seguir usando. Tu plataforma origina la intención; nosotros aportamos onboarding, control, estados, comprobantes y las capacidades para guardar, mover o retirar ese dinero, empezando por un flujo alojado y evolucionando hasta API.

### 15.2 Preguntas de discovery

#### Flujo

- ¿Qué evento mueve dinero hoy?
- ¿Quién paga, quién recibe y en qué países?
- ¿Qué monedas, redes y proveedores intervienen?
- ¿Cuántos pasos manuales existen?
- ¿Qué estado consideran final?

#### Dolor

- ¿Dónde se abandonan los usuarios?
- ¿Cuántos tickets genera cada 1.000 pagos?
- ¿Qué fallos requieren intervención?
- ¿Cómo reconcilian?
- ¿Qué integración pendiente no pueden lanzar?

#### Riesgo

- ¿Quién controla fondos en cada etapa?
- ¿Quién hace KYC/KYB/monitoring?
- ¿Qué límites y países?
- ¿Cómo responden a fraude o devolución?
- ¿Qué proveedores son críticos?

#### Economía

- volumen, ticket y frecuencia;
- coste actual;
- margen/spread;
- coste de soporte;
- impacto de una demora;
- presupuesto y decisor.

### 15.3 Cierre de discovery

No cerrar con “te mandamos la API”. Cerrar con:

> “En dos semanas mapeamos un solo flujo, reproducimos sus estados en sandbox y medimos qué parte puede resolverse sin tocar su core. Si la evidencia da, definimos piloto.”

### 15.4 Artefactos comerciales

- one-pager por caso;
- mapa de flujo actual/futuro;
- responsibility matrix;
- threat model resumido;
- demo de sandbox;
- pricing hypothesis;
- pilot charter;
- DPA/security questionnaire;
- SLA solo cuando sea respaldable;
- arquitectura y runbook.

---

## 16. Implementación del partner

### Fase 0 — calificación

- score de oportunidad;
- conflicto regulatorio;
- capacidad/ruta;
- sponsor;
- objetivo medible.

### Fase 1 — blueprint

- current-state map;
- estados;
- datos;
- responsabilidades;
- riesgos;
- UX;
- métrica baseline.

### Fase 2 — contrato normalizado

- seleccionar intent;
- definir idempotencia;
- metadata;
- webhooks;
- receipt;
- reconciliation key;
- test cases.

### Fase 3 — sandbox/shadow

- ejecutar sin dinero real;
- reproducir fallos;
- comparar contra flujo actual;
- medir completitud de estados;
- validar soporte.

### Fase 4 — piloto cerrado

- usuarios y volumen limitados;
- rutas permitidas;
- límites;
- monitoreo en tiempo real;
- soporte conjunto;
- feature flag y kill switch;
- revisión diaria.

### Fase 5 — decisión

- escalar;
- iterar;
- limitar;
- cancelar y documentar aprendizaje.

### Fase 6 — producción progresiva

- aumentar cohortes;
- revisión semanal;
- game days;
- auditoría de conciliación;
- revisión de economía;
- QBR del partner.

---

## 17. Soporte y success

### 17.1 Modelo de atención

| Capa                                | Dueño por defecto                   |
| ----------------------------------- | ----------------------------------- |
| Pregunta sobre producto del partner | Partner L1                          |
| Cuenta GatoPago/recuperación        | GatoPago                            |
| Estado de intención/ruta            | GatoPago L2                         |
| KYC/Card/on-ramp                    | Responsable contractual + proveedor |
| Incidente sistémico                 | Incident command conjunto           |

### 17.2 Context token

Cada transición a soporte lleva un identificador seguro que recupera:

- partner;
- intent;
- estado;
- timestamps;
- ruta;
- códigos de error sanitizados;
- acciones ya intentadas.

El usuario no debe copiar hashes y capturas como primer mecanismo de soporte.

### 17.3 Partner health

Score mensual:

- success rate;
- latencia;
- webhook health;
- conciliación;
- tickets/1.000 intents;
- fraude;
- usuarios activados;
- retención en Personal;
- margen;
- cambios pendientes;
- cumplimiento de revisión.

### 17.4 QBR

- valor entregado;
- problemas y postmortems;
- métricas por cohorte;
- próximos casos;
- riesgos regulatorios;
- roadmap sin promesas no aprobadas;
- decisión de expansión o poda.

---

## 18. Métricas B2B2C

### 18.1 North star

> **Usuarios finales que reciben o pagan mediante un partner y completan otra acción útil con su cuenta GatoPago dentro de 30 días.**

Así se evita optimizar solo por volumen del partner sin crear producto consumer.

### 18.2 Partner funnel

```text
lead calificado
→ blueprint
→ sandbox conectado
→ certificación
→ piloto live
→ flujo estable
→ expansión
```

### 18.3 Métricas de integración

- time to first sandbox intent;
- time to certified integration;
- porcentaje de test scenarios aprobados;
- webhook delivery/recovery;
- reconciliation match rate;
- incidentes por 10.000 intents;
- cambios incompatibles;
- horas de ingeniería por launch.

### 18.4 Métricas del usuario

- claim/onboarding completion;
- tiempo hasta recibir/pagar;
- cuenta protegida;
- segundo movimiento;
- retención 30/90;
- soporte por 1.000 usuarios;
- comprensión de marca/control;
- salida exitosa;
- adopción de Personal voluntaria.

### 18.5 Métricas comerciales

- partners live;
- volumen procesado;
- net revenue retention;
- margen/contribución por partner;
- payback de implementación;
- concentración de ingresos;
- pipeline ponderado;
- expansión de casos/rutas;
- churn y motivo.

### 18.6 Gates de piloto

- un solo caso y flujo;
- 100% de estados mapeados;
- webhooks idempotentes y verificables;
- conciliación ≥99,9% en sandbox controlado;
- cero severidades abiertas antes de live;
- soporte y kill switch probados;
- legal/compliance sign-off;
- límite de usuarios/volumen;
- criterio de salida escrito.

Los umbrales live se ajustan por ruta y nivel de riesgo; no se confunden con un SLA comercial.

---

## 19. Experimentos B2B2C

| Experimento               | Pregunta                            | Evidencia de avance               | Kill condition                             |
| ------------------------- | ----------------------------------- | --------------------------------- | ------------------------------------------ |
| Community payout asistido | ¿Reduce errores y soporte?          | Menos fallos/tiempo vs baseline   | Operación manual crece con volumen         |
| Claim link                | ¿El valor previo mejora onboarding? | Claim + cuenta protegida          | Fraude/abandono superior al flujo actual   |
| Co-branding               | ¿Firma visible aumenta confianza?   | Comprensión y conversión          | Confusión sobre operador/control           |
| Receipt webhook           | ¿Mejora conciliación?               | Match rate y menos horas manuales | Partner aún requiere revisión completa     |
| Sandbox de fallos         | ¿Acelera certificación?             | Menos defectos en piloto          | Complejidad sin reducción de incidentes    |
| Payroll mensual           | ¿Produce hábito consumer?           | Segundo movimiento y M1           | Solo retiro inmediato, sin valor posterior |
| Partner-funded gas        | ¿Mejora activation?                 | Incremental activado              | Sybil/fraude o coste sin retención         |
| Embedded → Personal       | ¿La transición voluntaria funciona? | Uso posterior                     | Sensación de bait-and-switch               |
| Headless certification    | ¿Partner conserva UX segura?        | Test suite completa               | Disclosures/estados inconsistentes         |

---

## 20. Roadmap B2B2C

### 0–30 días — contrato y evidencia

- auditar `API_DESIGN.md` contra implementación;
- definir schemas y estados canónicos;
- preparar demo de payment intent;
- crear partner scorecard;
- entrevistar 5–8 organizaciones;
- seleccionar un solo design partner;
- redactar pilot charter y responsibility matrix.

### 31–90 días — hosted pilot en sandbox

- hosted payout/checkout;
- partner onboarding manual;
- claves y webhooks sandbox;
- receipts;
- logs/replay;
- escenarios de fallo;
- dashboard mínimo;
- soporte/context handoff;
- analytics del journey.

### 3–6 meses — piloto controlado

- certificación;
- KYB;
- límites;
- operación y reconciliación;
- live solo si el core supera gates de mainnet;
- primer caso con usuarios reales limitados;
- medición de Embedded → Personal.

### 6–12 meses — producto repetible

- segundo partner del mismo arquetipo;
- SDK/componentes iniciales;
- projects/environments;
- roles;
- mejor onboarding técnico;
- pricing validado;
- partner health y QBR;
- library de blueprints.

### 12–24 meses — red de distribución

- payroll/marketplace packages;
- políticas limitadas;
- multi-country según gates;
- Card embebida si existe programa;
- routing y conciliación avanzados;
- self-service controlado;
- marketplace de capacidades aprobadas.

### 2028–2030 — protocolo de relación financiera

Visión:

- cualquier plataforma puede originar una intención;
- el usuario aporta su cuenta y preferencias;
- GatoPago selecciona una ruta autorizada;
- partner y usuario reciben evidencia compatible;
- permisos y datos son portables;
- cambiar de empleador/marketplace no obliga a cambiar de cuenta;
- el dinero llega con contexto y reglas elegidas por su dueño.

---

## 21. Riesgos y decisiones difíciles

| Riesgo                                 | Decisión                                                      |
| -------------------------------------- | ------------------------------------------------------------- |
| Cada partner pide un producto distinto | Construir blueprints/arquetipos, no forks                     |
| White label diluye GatoPago            | Firma mínima de confianza y transición voluntaria             |
| Partner controla demasiado             | Política explícita de custodia y permisos                     |
| API distrae del B2C                    | Medir segundo movimiento en Personal como north star          |
| Onboarding/KYC destruye conversión     | Progresivo por capacidad, sin saltarse obligación             |
| Un gran contrato captura el roadmap    | Cap de custom work y comité de reusabilidad                   |
| SLA prematuro                          | Piloto con objetivos internos antes de compromiso contractual |
| Datos se mezclan entre tenants         | Isolation tests, RBAC y minimización                          |
| Partner anuncia capacidades futuras    | Claims approval contractual                                   |
| Volumen sin margen                     | Unit economics por partner y ruta                             |
| GatoPago absorbe todo el soporte       | RACI, context handoff y pricing de soporte                    |

---

## 22. Qué puede afirmarse hoy

### Confirmado en la base documentada

- existen payment intents, consulta, cancelación, simulación, eventos y webhooks firmados;
- existe dashboard con API keys, webhooks, pagos, eventos y sandbox;
- existe una app Personal con smart account, passkeys, pagos, links, QR, usernames y actividad;
- la red declarada para la Alpha es Arbitrum Sepolia.

### Hipótesis/propuesta

- hosted payout/checkout comercial;
- components/SDK públicos;
- onboarding automático de partners;
- KYB/compliance productizado;
- multi-tenant enterprise completo;
- SLA de producción;
- rutas fiat/locales;
- Embedded Card;
- permisos y reglas avanzadas;
- cobertura multi-país.

Ningún pitch debe mezclar ambas listas.

---

## 23. Fuentes de referencia

- [Circle — User-controlled wallets](https://developers.circle.com/wallets/user-controlled): control del usuario, autenticación y casos embedded.
- [Circle — Account types](https://developers.circle.com/wallets/account-types): modelos developer/user-controlled y smart accounts.
- [Circle — Signing and authorization models](https://developers.circle.com/wallets/signing-and-authorization-models): separación entre envío y finalidad, estados asíncronos y webhooks.
- [Coinbase — Smart accounts](https://docs.cdp.coinbase.com/wallets/using-wallets/smart-accounts): ERC-4337, batching, gas sponsorship y multichain como infraestructura.
- [Gnosis Pay documentation](https://docs.gnosispay.com/): APIs para emisión/gestión de Card y experiencia autocustodiada.
- [Circle Payments Network](https://developers.circle.com/cpn): orquestación y pagos transfronterizos mediante instituciones participantes.
- [dLocal — Stablecoins](https://www.dlocal.com/payments/stablecoins/): infraestructura de pagos y conversión local para mercados emergentes.
- [ASFI — Reglamento para Empresas de Tecnología Financiera](https://www.asfi.gob.bo/node/1176): ETF y Entorno Controlado de Pruebas.
- [UIF — normativa para PSAV](https://www.uif.gob.bo/index.php/normativa-externa/): registro y obligaciones asociadas en Bolivia.

---

## 24. Decisión final

Embedded merece prioridad solo si cumple dos objetivos a la vez:

1. elimina una integración u operación dolorosa para el partner;
2. entrega al usuario una cuenta que conserva control y utilidad después del primer pago.

Si solo hace lo primero, GatoPago se convierte en un proveedor sustituible. Si solo hace lo segundo, no hay razón suficiente para que el partner integre.

> **GatoPago Embedded gana cuando una empresa deja de enviar dinero a un callejón sin salida y empieza a entregarlo en una cuenta que acompaña al usuario.**
