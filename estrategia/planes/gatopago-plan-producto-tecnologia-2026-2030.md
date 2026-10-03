# GatoPago: plan de producto y tecnología 2026–2030

> **Estado:** arquitectura objetivo, principios de producto y secuencia de ejecución.  
> **Fecha de corte:** 19 de agosto de 2026.  
> **Alcance:** arquitectura de Personal, Embedded y Platform, roadmap técnico, APIs, integraciones y calidad operativa.  
> **No es:** certificación de seguridad, declaración de producción ni compromiso de fechas.  
> **Arquitectura actual detallada:** consultar el índice `docs/README.md` del repositorio de la app.
>
> **Contrato API actual:** consultar el mismo índice técnico.
> **Plan B2C:** [GatoPago Personal](./gatopago-plan-maestro-b2c-2026.md).  
> **Plan B2B2C:** [GatoPago Embedded](./gatopago-playbook-b2b2c-embedded-2026.md).  
> **Plan B2B:** [GatoPago Platform](./gatopago-estrategia-b2b-pagos-transfronterizos-2026.md).

---

## 0. Tesis

GatoPago debe parecer tres productos —Personal, Embedded y Platform— pero ser **un solo sistema de capacidades financieras**.

```text
Personal          Embedded          Platform
   │                  │                 │
   └────────────── Experiences ─────────┘
                       │
              Financial capabilities
                       │
     Account · Intent · Route · Guard · Ledger · Trace
                       │
       Chains · protocols · issuers · banks · PSPs
```

La ventaja no aparece por soportar muchas redes. Aparece cuando una intención conserva el mismo significado aunque cambie el camino técnico:

> “Daniel paga 100 USDC a Sofía por Diseño agosto” debe seguir siendo la misma intención para la persona, el partner, el ledger, soporte y auditoría, aunque use gas patrocinado, CCTP, un swap o un proveedor local.

### Objetivo técnico

Construir una plataforma que sea:

- **user-controlled por defecto** en Personal;
- **intent-first** en sus APIs y experiencias;
- **provider-neutral** en el dominio, sin fingir que todos los proveedores son equivalentes;
- **asíncrona y reconciliable**;
- **segura por límites**, no solo por autenticación;
- **observable desde el efecto humano hasta el intento técnico**;
- **capaz de degradarse con honestidad**;
- **portable y abandonable** por el usuario;
- **operable por un equipo pequeño antes de escalar complejidad**.

---

## 1. Verdad presente y arquitectura objetivo

### 1.1 Base documentada hoy

Según la auditoría técnica existente, GatoPago ya cuenta con:

- smart account ERC-4337;
- passkeys múltiples;
- ejecución por lotes;
- upgradeability UUPS;
- recuperación mediante guardian con espera de 48 horas;
- pagos personales, links, QR, usernames, contactos, recibos y actividad;
- swap con cotización y gas patrocinado;
- depósito/retiro de USDC en Aave V3;
- fondeo desde wallet/exchange y recepción crosschain mediante CCTP;
- payment intents, eventos y webhooks firmados;
- dashboard de desarrolladores;
- indexer/ledger operacional documentado.

La red que puede afirmarse para la Alpha es **Arbitrum Sepolia**. Las direcciones de contratos de Arbitrum One observadas estaban sin desplegar/configurar; por tanto, ninguna capa debe declarar mainnet live.

### 1.2 Lo que falta para la visión

- modelo de dominio compartido y versionado;
- reconciliación financiera formal;
- tenant model y RBAC maduros;
- policy/limits engine;
- routing con adaptadores y health;
- partner onboarding/certificación;
- SLO, incident response y capacity planning;
- programabilidad limitada y revocable;
- salida independiente documentada;
- controles de fraude/compliance por capacidad;
- settlement y proveedores locales/Card;
- data platform con definiciones comunes;
- readiness de mainnet.

### 1.3 Regla de claims

En todo documento, demo y UI usar cuatro etiquetas:

- **Disponible:** implementado y verificado en el entorno declarado.
- **Alpha:** implementado, con límites/testnet y posible cambio.
- **Piloto:** acceso controlado, operación manual aceptable.
- **Visión:** arquitectura o capacidad propuesta; no vender como presente.

---

## 2. Principios de producto

### 2.1 Intención antes que rail

El objeto de primer nivel es lo que alguien quiere lograr. La red, token, protocolo y proveedor son atributos de una ruta.

### 2.2 Abstracción sin opacidad

La persona no necesita seleccionar infraestructura, pero puede inspeccionar:

- activo;
- red;
- proveedor/protocolo;
- contrato;
- fees;
- tasa;
- tiempo;
- riesgos;
- estado verificable.

### 2.3 Una acción, un estado canónico

UI, API, webhook, dashboard y soporte no inventan estados distintos. Todos proyectan una máquina de estados común.

### 2.4 Control progresivo

La experiencia empieza simple y revela controles según valor/riesgo:

- monto pequeño: confirmación directa;
- destinatario nuevo: verificación reforzada;
- regla automática: límites y expiración;
- recuperación: demora y cancelación;
- partner: scopes, roles y políticas;
- tesorería: aprobaciones y segregación.

### 2.5 Dinero y datos tienen dueño

- Personal: usuario controla cuenta por defecto.
- Embedded: responsabilidad se define por modelo; no se infiere.
- Platform: la empresa controla su tesorería y permisos.
- GatoPago administra software y rutas dentro de autoridad explícita.

### 2.6 Poda antes que proliferación

Una red, protocolo, activo o proveedor nuevo debe resolver un corredor/caso medible. “Multichain” no es un objetivo aislado.

---

## 3. Dominios del producto

### 3.1 Identity & Access

Responsable de:

- usuarios;
- organizaciones;
- passkeys y dispositivos;
- sesiones;
- roles;
- guardianes/recuperación;
- consentimiento;
- conexiones partner;
- risk-based authentication.

### 3.2 Account

Responsable de:

- smart account;
- owners/signers;
- módulos;
- permisos;
- balances por activo/estado;
- escape hatch;
- upgrades;
- account health.

### 3.3 Intent

Contrato normalizado para:

- payment;
- payout;
- receive;
- swap;
- bridge/crosschain receive;
- supply/withdraw;
- future card funding/authorization;
- future recurring/rule execution.

### 3.4 Quote & Route

Responsable de:

- descubrir rutas elegibles;
- obtener quotes;
- normalizar fees/tiempo/riesgo;
- score;
- seleccionar bajo política;
- preparar ejecución;
- fallback/circuit breaker.

### 3.5 Guard

Responsable de:

- límites;
- allow/deny;
- velocity checks;
- destination trust;
- sanctions/geo rules donde corresponda;
- fraud signals;
- policy evaluation;
- manual review;
- kill switches.

### 3.6 Execution

Responsable de:

- construir operaciones;
- gas sponsorship;
- batching;
- firma;
- submission;
- retries seguros;
- seguimiento de finalidad;
- compensación cuando sea posible.

### 3.7 Ledger

Responsable de:

- entradas económicas normalizadas;
- pending/available/settled;
- fees;
- activos y unidades;
- contraparte y referencia;
- conciliación;
- balances derivados;
- correcciones auditables.

El ledger no confía en la UI ni equivale a un explorador onchain.

### 3.8 Trace

Une:

```text
user action
→ intent
→ quote
→ route
→ policy decision
→ execution attempt
→ provider/network event
→ ledger entry
→ receipt/webhook/support case
```

### 3.9 Experience

Proyecciones específicas:

- Personal web/PWA;
- hosted flows;
- components/SDK;
- partner dashboard;
- operations console;
- Platform API/dashboard.

---

## 4. Modelo de datos canónico

### 4.1 Identificadores

No usar transaction hash como ID de negocio. Identificadores separados:

- `intent_id`;
- `attempt_id`;
- `route_id`;
- `quote_id`;
- `policy_decision_id`;
- `ledger_entry_id`;
- `provider_reference`;
- `chain_transaction_hash`;
- `receipt_id`;
- `case_id`.

### 4.2 Dinero

- almacenar enteros en unidad mínima;
- activo y red explícitos;
- no usar `float`;
- moneda de presentación separada del activo de settlement;
- tasa/price con fuente y timestamp;
- redondeo por regla documentada;
- fees como componentes, no número misterioso;
- balances calculados desde fuentes reconciliables.

### 4.3 Estados

Estado agregado de intent:

```text
created
requires_action
processing
succeeded
failed
expired
cancelled
under_review
```

Los intentos pueden tener estados más técnicos. La transición debe ser monotónica salvo correcciones explícitas; “submitted” nunca equivale automáticamente a “succeeded”.

### 4.4 Eventos

Cada evento contiene:

- ID único;
- tipo versionado;
- aggregate ID;
- timestamp de ocurrencia y recepción;
- actor/origen;
- payload mínimo;
- correlation/causation IDs;
- schema version;
- clasificación de sensibilidad.

### 4.5 Receipts

Un receipt es una proyección estable del intent:

- participantes apropiadamente minimizados;
- concepto;
- monto enviado/recibido;
- fees;
- fecha y estados;
- ruta resumida;
- referencias verificables;
- firma/URL verificable;
- versión;
- idioma.

---

## 5. Arquitectura por capas

```text
┌────────────────────────────────────────────────────────────┐
│                    EXPERIENCE LAYER                        │
│ Personal · Hosted · Components · Dashboards · Ops          │
├────────────────────────────────────────────────────────────┤
│                    PRODUCT API LAYER                       │
│ Accounts · Intents · Quotes · Activity · Receipts          │
├────────────────────────────────────────────────────────────┤
│                    CONTROL PLANE                           │
│ Identity · Policy · Limits · Risk · Config · Tenancy       │
├────────────────────────────────────────────────────────────┤
│                    MONEY PLANE                             │
│ Routing · Execution · Ledger · Reconciliation              │
├────────────────────────────────────────────────────────────┤
│                    ADAPTER LAYER                           │
│ Chains · Bundlers · Paymasters · CCTP · DEX · Aave         │
│ Future: banks · PSPs · issuers · card processors           │
├────────────────────────────────────────────────────────────┤
│                    EVIDENCE LAYER                          │
│ Events · Trace · Logs · Metrics · Audit · Receipts         │
└────────────────────────────────────────────────────────────┘
```

### 5.1 Modular monolith first

No migrar a microservicios por estética. Mantener límites de dominio en código y datos; extraer solo cuando exista:

- escala independiente;
- aislamiento de seguridad;
- disponibilidad diferente;
- ownership de equipo;
- carga/latencia incompatibles;
- necesidad operativa demostrada.

### 5.2 Asincronía explícita

- comando acepta intención;
- worker ejecuta/observa;
- eventos actualizan estado;
- reconciliación corrige divergencias;
- webhook notifica;
- UI consulta o recibe actualización.

El usuario obtiene feedback inmediato sin inventar finalidad.

### 5.3 Outbox/inbox

Para mutación financiera + evento:

- persistencia atómica de cambio y outbox;
- consumidor idempotente;
- inbox/deduplication;
- retries;
- dead-letter;
- replay controlado.

---

## 6. Smart account y soberanía

### 6.1 Objetivo

La smart account permite una UX familiar sin transformar a GatoPago en custodio de facto.

### 6.2 Capacidades

- passkey owners;
- múltiples dispositivos;
- guardian recovery;
- batching;
- gas sponsorship;
- spending limits;
- session/policy keys futuras;
- módulos revocables;
- escape/independent management.

### 6.3 Threat model de cuenta

- passkey/dispositivo comprometido;
- guardian coludido;
- upgrade malicioso;
- módulo vulnerable;
- paymaster/bundler caído;
- phishing de firma;
- session key excesiva;
- frontend comprometido;
- recuperación social abusiva;
- cadena/protocolo detenido.

### 6.4 Controles

- timelock para recovery/upgrade sensible;
- notificación fuera de la sesión;
- límites por módulo;
- allowlists de targets/selectors;
- expiración;
- simulación;
- revocación;
- auditorías independientes;
- pausas acotadas;
- documentación para salida;
- multi-provider donde sea necesario.

### 6.5 Upgradeability

UUPS requiere gobernanza explícita:

- quién puede proponer;
- quién puede ejecutar;
- demora;
- comunicación;
- pruebas;
- rollback cuando sea técnicamente posible;
- invariantes;
- opción de no migrar o salir cuando sea viable.

No presentar upgradeability como seguridad por sí misma.

---

## 7. Chain abstraction responsable

### 7.1 No mostrar cadenas como menú principal

La selección parte de:

- origen;
- destino;
- activo;
- disponibilidad;
- coste neto;
- tiempo;
- riesgo;
- preferencia/política del usuario.

### 7.2 Route adapter contract

Cada adaptador expone:

- capabilities;
- supported assets/networks/countries;
- quote;
- fees;
- estimated time;
- limits;
- compliance requirements;
- risk metadata;
- execute/prepare;
- status;
- reconcile;
- health;
- cancellation/refund semantics.

### 7.3 RouteScore

No optimizar solo por precio:

```text
score =
  coste_neto ponderado
  + tiempo esperado
  + tasa histórica de éxito
  + liquidez/capacidad
  + riesgo operativo
  + riesgo de contraparte
  + compatibilidad de políticas
  + calidad de conciliación
```

Primero shadow mode; luego recomendación; después auto-routing limitado. Nunca entrenar directamente sobre dinero real sin constraints.

### 7.4 Fallback

No todo fallo permite reintentar. Clasificar:

- seguro para retry;
- requiere nueva quote;
- requiere nueva firma;
- requiere revisión;
- no reversible;
- ruta alternativa disponible.

---

## 8. Ledger y reconciliación

### 8.1 Tres verdades

- **Intent truth:** qué se pidió.
- **Execution truth:** qué reportan chain/proveedor.
- **Accounting truth:** qué impacto económico se reconoce.

Pueden divergir temporalmente; el sistema debe detectarlo.

### 8.2 Reconciliación

Por fuente:

- indexer/onchain RPC;
- bundler/paymaster;
- CCTP/message attestation;
- DEX/protocolo;
- issuer/processor;
- PSP/banco;
- internal intent store.

Proceso:

1. importar evidencia;
2. normalizar;
3. match determinista;
4. identificar diferencias;
5. auto-resolver casos seguros;
6. abrir exception;
7. corregir con entrada compensatoria;
8. auditar.

### 8.3 Invariantes

- no hay dinero sin unidad/activo;
- cada fee tiene beneficiario y categoría;
- una corrección no reescribe historia;
- suma de débitos/créditos cuadra donde aplique;
- balances no dependen de eventos duplicados;
- finalización tiene evidencia;
- estado público deriva de estado canónico.

### 8.4 Operations console

- buscar por intent, wallet, tx, provider ref o partner;
- timeline completo;
- estado de reconciliación;
- exposición financiera;
- acciones permitidas con doble control;
- notas/case;
- replay seguro;
- exportación auditada;
- PII minimizada por rol.

---

## 9. Policy y programabilidad

### 9.1 Policy engine

Entradas:

- actor;
- cuenta/organización;
- capacidad;
- monto/activo;
- origen/destino;
- dispositivo/sesión;
- historial/velocity;
- país/partner;
- route health;
- reglas del usuario/empresa.

Salidas:

- allow;
- deny;
- require_action;
- require_approval;
- reduce_limit;
- under_review;
- route constraints.

### 9.2 Reglas de usuario

Compilar intención humana a una política limitada:

```text
cuando: ingreso confirmado
si: monto > 0
hacer: separar 10%
destino: bolsillo impuestos
cap: 500 USDC/mes
expira: 2027-12-31
revocable: sí
```

### 9.3 Reglas empresariales

- monto por rol;
- dual approval;
- corredores permitidos;
- horarios;
- beneficiarios;
- proveedores;
- exposición máxima;
- rate/fee tolerance;
- fallback.

### 9.4 Explainability

Cada decisión muestra:

- política aplicada;
- versión;
- inputs relevantes;
- resultado;
- actor;
- override y motivo;
- cómo cambiar/revocar.

---

## 10. IA: dónde sí y dónde no

### 10.1 Usos apropiados

- traducir lenguaje natural a borrador de regla;
- explicar fees/rutas/estados;
- clasificar tickets;
- detectar anomalías para revisión;
- resumir reconciliación/incidentes;
- recomendar documentación;
- proponer escenarios de treasury en shadow mode.

### 10.2 Límites

- no firma;
- no guarda keys;
- no mueve fondos fuera de policy determinista;
- no inventa un estado;
- no aprueba KYC/AML por sí sola;
- no cambia límites sin autorización;
- no promete rendimiento/ruta;
- no aprende de PII financiera sin gobierno específico.

### 10.3 AI control plane

- model/provider registry;
- prompt/version;
- redaction;
- structured output validation;
- confidence/abstention;
- human review;
- audit log;
- offline evaluation;
- cost/latency cap;
- kill switch.

### 10.4 Automatizaciones guiadas

Es una experiencia sobre policy y simulación, no una billetera controlada por un LLM.

---

## 11. Seguridad del producto

### 11.1 Programa mínimo

- asset inventory;
- data classification;
- threat modeling;
- secure SDLC;
- dependency/secret scanning;
- code review;
- contract tests/fuzzing/invariants;
- external audit antes de mainnet;
- penetration test de web/API;
- incident response;
- vulnerability intake;
- key/secret management;
- access reviews;
- backups y restore tests;
- vendor risk.

### 11.2 Security gates

| Cambio                | Gate                                                           |
| --------------------- | -------------------------------------------------------------- |
| Smart account/upgrade | auditoría + invariantes + timelock plan                        |
| Nuevo módulo/permisos | threat model + caps + revoke                                   |
| Nueva ruta/proveedor  | due diligence + sandbox + reconciliación                       |
| Mainnet               | auditoría, monitoring, limits, pause/exit, incident drills     |
| Card/fiat             | compliance, fraud, disputes, reconciliation, vendor continuity |
| IA sobre finanzas     | evals, structured constraints, no authority directa            |

### 11.3 Supply chain

- lockfiles;
- provenance/build reproducible cuando sea viable;
- dependabot/renovate con revisión;
- pinning de acciones CI;
- secretos fuera de repositorio;
- least privilege en CI/deploy;
- artifact signing/SBOM a medida que madure.

---

## 12. Confiabilidad y SRE

### 12.1 SLI

- API availability;
- intent acceptance latency;
- intent success rate;
- time to finalized;
- webhook freshness/delivery;
- indexer lag;
- reconciliation lag;
- quote freshness;
- provider health;
- balance freshness;
- support exposure.

### 12.2 SLO por etapa

No publicar “99,99%” antes de medir. Secuencia:

1. instrumentar;
2. obtener baseline;
3. definir objetivo interno;
4. reservar error budget;
5. probar recuperación;
6. contratar SLA inferior al SLO interno.

### 12.3 Degradación

| Fallo                 | Respuesta                                                       |
| --------------------- | --------------------------------------------------------------- |
| Quote provider        | pausar ruta, mostrar alternativa/indisponibilidad               |
| RPC/indexer retrasado | marcar saldo/estado con timestamp, no fingir actualidad         |
| Paymaster             | opción de retry o gas propio si es segura/comprensible          |
| CCTP/bridge           | estado en camino + tracking + soporte                           |
| Aave                  | bloquear nuevas entradas si riesgo; conservar salida si posible |
| Webhook partner       | retry/replay; no duplicar pago                                  |
| Frontend              | cuenta sigue administrable por vía independiente documentada    |

### 12.4 Game days

- RPC caído;
- webhook duplicado;
- provider responde éxito falso;
- indexer reorg;
- key/credential leak;
- KYC provider outage;
- card processor delay;
- stablecoin depeg scenario;
- contract pause;
- recovery abuse.

---

## 13. Observabilidad y trazabilidad

### 13.1 Tres vistas

- **Usuario:** qué ocurre y qué hacer.
- **Operaciones:** exposición, ruta, dueño y tiempo.
- **Ingeniería:** logs, traces, métricas y dependencia.

### 13.2 Correlation

Cada request/intento/evento usa correlation IDs sin exponer secretos. Los logs no incluyen:

- passkeys/credential material;
- tokens;
- webhook secrets;
- documentos KYC;
- conceptos sensibles completos;
- saldo/dirección si no es indispensable.

### 13.3 Alertas

Alertar sobre síntomas con impacto:

- caída de success rate;
- aumento de tiempo pendiente;
- mismatch de ledger;
- webhook backlog;
- provider health;
- error por versión;
- velocity/fraude;
- retiros bloqueados.

Evitar alertas por cada error aislado sin contexto.

---

## 14. Data platform y privacidad

### 14.1 Capas

- operational store;
- event stream/outbox;
- analytics warehouse;
- semantic metrics layer;
- experimentation;
- restricted risk/compliance datasets.

### 14.2 Identidad analítica

Separar:

- anonymous visitor;
- product user;
- account;
- wallet/address;
- organization/partner;
- compliance identity.

No unirlas por comodidad sin propósito y controles.

### 14.3 Eventos de producto

Convención:

`noun.verb` o `domain.event`, por ejemplo:

- `account.created`;
- `security.backup_completed`;
- `intent.created`;
- `intent.requires_action`;
- `intent.succeeded`;
- `receipt.shared`;
- `rule.simulated`;
- `route.failed`.

Cada evento tiene owner, definición y test.

### 14.4 Retención

Tabla por clase:

- financiera/ledger;
- seguridad/audit;
- compliance;
- soporte;
- analytics;
- marketing;
- raw logs.

Definir base legal, plazo, acceso, borrado y residencia antes de escalar países.

---

## 15. Integraciones y estrategia build/buy/partner

### 15.1 Construir

Capacidades que expresan la diferencia:

- intent model;
- experience orchestration;
- account/control UX;
- policy/limits;
- route normalization/score;
- ledger/trace;
- receipts;
- Meli experience;
- partner journey.

### 15.2 Comprar/usar infraestructura

Cuando no crea ventaja y el proveedor supera seguridad/economía:

- RPC/bundler;
- KYC/KYB;
- sanctions screening;
- email/SMS;
- analytics tooling;
- observability;
- card issuing/processing;
- fiat rails;
- audits.

### 15.3 Partner

Para licencias, liquidez, cobertura y distribución:

- issuer/program manager;
- bancos/PSP;
- on/off-ramp;
- liquidity providers;
- payroll/marketplaces;
- compliance counsel;
- communities.

### 15.4 Vendor score

- cobertura;
- licencia/responsabilidad;
- API/estado;
- reconciliation;
- fees/FX;
- uptime/incidentes;
- security/audits;
- datos/subprocesadores;
- soporte;
- exit plan;
- concentración;
- contrato/SLA.

---

## 16. DX y plataforma para desarrolladores

### 16.1 Golden path

```text
crear project sandbox
→ obtener scoped key
→ crear intent
→ completar test flow
→ verificar webhook
→ consultar receipt
→ simular fallo
→ pasar certificación
```

### 16.2 Documentación

- quickstart de 10 minutos;
- conceptual guides;
- API reference generada;
- state diagrams;
- errors y retry semantics;
- webhook verification;
- test scenarios;
- security checklist;
- go-live checklist;
- changelog/status.

### 16.3 SDK

Priorizar TypeScript cuando el contrato sea estable. Criterios:

- generado/validado contra schema;
- tree-shakeable cuando aplique;
- retries no mágicos;
- idempotency explícita;
- tipos para estados;
- ejemplos probados en CI;
- semver/deprecation.

### 16.4 Error design

Error incluye:

- código estable;
- mensaje humano;
- tipo retriable/no retriable;
- campo/acción;
- docs link;
- request/correlation ID;
- no filtra internals.

---

## 17. Estrategia de testing

### 17.1 Pirámide adaptada

- unit: money math, policies, state transitions;
- property/invariant: ledger y contracts;
- integration: adapters/providers;
- contract: API/webhooks;
- end-to-end: intents completos;
- chaos/game day: fallos de dependencias;
- visual/accessibility: flujos críticos;
- security: static/dynamic/fuzz/pentest.

### 17.2 Matriz financiera

Por capacidad:

- happy path;
- amount boundaries;
- insufficient balance;
- stale quote;
- duplicate request;
- delayed finality;
- dropped/replaced transaction;
- provider timeout;
- reorg;
- partial batch;
- reconciliation mismatch;
- user cancels;
- recovery during pending action;
- locale/decimal errors.

### 17.3 Testnet no basta

Antes de mainnet:

- fork tests;
- simulations;
- contract audit;
- load tests;
- limited canary;
- real monitoring;
- operational drill;
- financial reconciliation;
- rollback/pause/exit.

---

## 18. Ambientes y release

### 18.1 Ambientes

- local;
- CI ephemeral;
- shared dev;
- sandbox partner;
- testnet staging;
- future mainnet canary;
- future production.

No llamar `live` a testnet.

### 18.2 Feature flags

Por:

- user/cohort;
- partner;
- country;
- capability;
- asset/network;
- route/provider;
- amount.

Flags sensibles requieren owner, expiry y audit.

### 18.3 Progressive delivery

- internal;
- trusted testers;
- design partner sandbox;
- canary con límites;
- cohort expansion;
- general availability solo con gates.

### 18.4 Database/contract migrations

- expand/contract;
- backward compatibility;
- shadow reads;
- dry run;
- migration metrics;
- recovery plan;
- contract version coexistence.

---

## 19. Roadmap técnico integrado

### Horizonte A — coherencia Alpha (0–30 días)

- inventario de capacidades y claims;
- estado de red único;
- eliminar contradicciones UI/docs;
- esquema canónico de intents/events;
- observabilidad de flujos actuales;
- auditoría de descargas/QR/PWA;
- performance/motion fixes;
- threat models de cuenta/pago/recuperación;
- baseline de tests.

### Horizonte B — core confiable (31–90 días)

- state machine única;
- idempotencia y webhook hardening;
- trace/correlation;
- reconciliation V1;
- security center/escape docs;
- operations console mínima;
- sandbox failure modes;
- SLI baselines;
- data dictionary.

### Horizonte C — mainnet readiness y piloto (3–6 meses)

- audits;
- limits/policy V1;
- circuit breakers;
- key/upgrade governance;
- incident drills;
- canary plan;
- partner certification;
- first corridor adapters solo si aprobados;
- ledger invariants;
- vendor due diligence.

### Horizonte D — producto repetible (6–12 meses)

- tenant/RBAC;
- hosted Embedded;
- partner dashboard maduro;
- route adapter standard;
- shadow RouteScore;
- wallets/rules limitadas;
- Card integration si supera gates;
- SLO/error budgets;
- warehouse/experiments.

### Horizonte E — plataforma (12–24 meses)

- multi-route orchestration;
- policy engine completo;
- automated reconciliation;
- treasury/approvals;
- components/SDK;
- regional rails;
- guarded auto-routing;
- portable permissions/receipts.

### Horizonte F — red programable (2028–2030)

- cross-partner identity bajo consentimiento;
- personal/business policies interoperables;
- near-real-time multi-rail settlement;
- privacy-preserving trust signals;
- automatizaciones guiadas sobre reglas verificables;
- open adapter ecosystem certificado;
- corridor intelligence como ventaja acumulativa.

---

## 20. Gates de lanzamiento

### 20.1 Mainnet Personal

- contratos desplegados y verificados;
- auditoría y hallazgos resueltos/aceptados;
- recovery y exit probados;
- límites;
- observabilidad;
- reconciliación;
- soporte/on-call;
- incident playbooks;
- legal/claims;
- cohort canary;
- gas/provider budget;
- backups/restore.

### 20.2 Embedded live

- core mainnet aprobado;
- tenant/scopes;
- KYB;
- responsabilidad firmada;
- partner certification;
- webhook/reconciliation;
- limits/kill switch;
- support RACI;
- pricing/economics;
- DPA/security review.

### 20.3 Route/corridor

- legal viability;
- provider contracts;
- quote/fee transparency;
- liquidity/capacity;
- status/reconciliation;
- failure semantics;
- fallback;
- pilot limits;
- user/support copy.

### 20.4 Card

Usar el gate del plan B2C más issuer/processor integration, disputes, daily reconciliation, PCI scope, fraud ops y continuity.

---

## 21. Organización y ownership

### 21.1 Mapa de ownership

| Dominio               | Product owner    | Engineering owner | Operador              |
| --------------------- | ---------------- | ----------------- | --------------------- |
| Account/security      | Personal         | Core              | Security/Support      |
| Intent/receipt        | Core Product     | Payments          | Payments Ops          |
| Route/execution       | Platform         | Money Movement    | Treasury/Payments Ops |
| Ledger/reconciliation | Platform/Finance | Data/Backend      | Finance Ops           |
| Embedded              | Partner Product  | Platform          | Partner Success       |
| Risk/policy           | Risk             | Core/Risk Eng     | Risk Ops              |
| Meli/experience       | Brand/Product    | Frontend          | Content/Support       |

### 21.2 Architecture decisions

Usar ADR para:

- custody/control model;
- state machine;
- ledger;
- adapter contract;
- upgrade governance;
- data residency;
- AI authority;
- provider selection;
- chain additions.

### 21.3 FinOps

Coste por:

- active account;
- intent;
- successful movement;
- chain/provider;
- webhook/event;
- support case;
- partner;
- AI call;
- subsidized gas.

No optimizar infraestructura sin relacionarla con valor y confiabilidad.

---

## 22. Deuda y poda

Registro trimestral:

- dependencias sin owner;
- flags vencidas;
- rutas no usadas;
- estados duplicados;
- jobs manuales;
- datos sin retención;
- claims que no coinciden;
- componentes legacy;
- proveedores sin exit plan;
- testnet assumptions en producción futura.

Presupuesto recomendado por ciclo:

- 60% resultados de producto;
- 20% confiabilidad/seguridad;
- 10% developer/operations experience;
- 10% poda/deuda.

Ajustar ante incidentes o gates; no usar el porcentaje como dogma.

---

## 23. Fuentes técnicas

- [ERC-4337 documentation](https://docs.erc4337.io/): account abstraction, bundlers, paymasters y user operations.
- [Circle — User-controlled wallets](https://developers.circle.com/wallets/user-controlled): modelos de control y autenticación.
- [Circle — Account types](https://developers.circle.com/wallets/account-types): SCA/MSCA, gas sponsorship y batching.
- [Circle — Signing and authorization models](https://developers.circle.com/wallets/signing-and-authorization-models): separación de submission y finality.
- [Coinbase — Smart accounts](https://docs.cdp.coinbase.com/wallets/using-wallets/smart-accounts): smart accounts multichain y capacidades ERC-4337.
- [FIDO Alliance — Enterprise passkeys](https://fidoalliance.org/passkey-use-case/enterprise/): propiedades, despliegue y gestión de passkeys.
- [Aave — Supply tokens](https://aave.com/help/supplying/supply-tokens): dinámica de suministro y tasas variables.
- [Gnosis Pay documentation](https://docs.gnosispay.com/): cuenta autocustodiada y Card como referencia de integración.
- [FATF — Update to Recommendation 16](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/update-Recommendation-16-payment-transparency-june-2025.html): transparencia en pagos y evolución de requisitos.

---

## 24. Decisión final

GatoPago no necesita construir cada rail. Necesita controlar el significado, la autorización, la evidencia y la experiencia de cada movimiento.

La disciplina tecnológica es:

1. hacer verdadero el core actual;
2. observar y reconciliar todo movimiento;
3. poner políticas alrededor de la autoridad;
4. integrar proveedores mediante contratos sustituibles;
5. escalar de recomendación a automatización solo con límites;
6. mantener una salida para el usuario y para la propia empresa.

> **El producto es la intención. La infraestructura es el camino. La confianza nace cuando ambos coinciden y pueden comprobarse.**
