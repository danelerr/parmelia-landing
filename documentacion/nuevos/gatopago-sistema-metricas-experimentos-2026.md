# GatoPago: sistema de métricas y experimentos 2026

> **Estado:** contrato analítico y marco de decisiones.  
> **Fecha de corte:** 19 de agosto de 2026.  
> **Alcance:** taxonomía de eventos, métricas, tableros, experimentos y criterios de decisión para Personal, Embedded y Platform.  
> **Principio:** una métrica sin definición, fuente, owner y decisión asociada es decoración.

---

## 0. Modelo de valor

GatoPago crea valor cuando una intención financiera se completa de forma útil, controlada, confiable y sostenible.

### North star conjunta

> **Ciclos de dinero útiles completados por usuarios y organizaciones en 30 días.**

Un ciclo útil conecta al menos dos momentos con significado, por ejemplo:

- cobrar → usar;
- recibir → guardar;
- recibir → crecer;
- agregar → pagar;
- partner payout → segunda acción Personal;
- crear intent → entregar → reconciliar;
- comparar rutas → completar settlement.

No cuenta:

- faucet;
- self-transfer artificial;
- intento fallido;
- visita/login;
- volumen de prueba etiquetado como real;
- evento duplicado;
- actividad creada solo para capturar incentivo.

### North stars por superficie

| Superficie | North star                                                       |
| ---------- | ---------------------------------------------------------------- |
| Personal   | Usuarios protegidos con 2+ movimientos útiles/30d                |
| Embedded   | Usuarios originados por partner con segunda acción útil/30d      |
| Platform   | Intenciones/corredores completados y reconciliados dentro de SLO |

---

## 1. Principios de medición

1. **Primero la pregunta.** No instrumentar por coleccionar eventos.
2. **Entorno explícito.** Testnet, sandbox, canary y producción nunca se mezclan.
3. **Intento ≠ éxito.** Estados derivados del modelo canónico.
4. **Usuario ≠ wallet.** Identidades separadas.
5. **Volumen ≠ valor.** Medir utilidad, confiabilidad y contribución.
6. **Promedio es insuficiente.** Cohortes, percentiles y colas.
7. **Guardrails.** Crecimiento nunca se optimiza aislado de pérdida, soporte o confianza.
8. **Privacidad.** Recopilar lo mínimo; PII financiera con acceso restringido.
9. **Definición versionada.** Cambios no reescriben silenciosamente historia.
10. **Decisión documentada.** Toda revisión termina en acción, owner y fecha.

---

## 2. Modelo de entidades analíticas

### Entidades

- `anonymous_visitor_id`;
- `user_id`;
- `account_id`;
- `wallet_address`;
- `organization_id`;
- `partner_id`;
- `project_id`;
- `intent_id`;
- `attempt_id`;
- `route_id`;
- `receipt_id`;
- `support_case_id`;
- `experiment_id`;
- `cohort_id`.

### Relaciones

- un usuario puede controlar varias cuentas;
- una cuenta puede tener varios owners/signers según modelo;
- una wallet externa no siempre es usuario;
- un partner user puede reclamar/conectar una cuenta;
- un intent puede tener varios attempts;
- un intent tiene un resultado canónico;
- un receipt proyecta un intent;
- un caso puede unir múltiples intents;
- una exposición a experimento se fija antes del outcome.

### Reglas

- no usar dirección pública como identificador universal de persona;
- no unir marketing identity y compliance identity automáticamente;
- no emitir PII en analytics events;
- documentar identity stitching;
- marcar usuarios internos, bots, testers e incentivados.

---

## 3. Taxonomía de eventos

### Convención

`domain.object_action` o `domain.state_changed`.

Ejemplos:

- `landing.intent_selected`;
- `account.creation_started`;
- `account.created`;
- `security.passkey_added`;
- `security.recovery_configured`;
- `funding.route_selected`;
- `intent.created`;
- `intent.requires_action`;
- `intent.processing`;
- `intent.succeeded`;
- `intent.failed`;
- `receipt.viewed`;
- `receipt.shared`;
- `grow.risk_opened`;
- `grow.supplied`;
- `rule.simulated`;
- `partner.webhook_delivered`;
- `reconciliation.exception_opened`.

### Envelope

- `event_id`;
- `event_name`;
- `schema_version`;
- `occurred_at`;
- `received_at`;
- `environment`;
- `user/account/organization` IDs as allowed;
- `session_id`;
- `correlation_id`;
- `source`;
- `properties` allowlisted;
- `experiment_assignments`.

### Quality checks

- uniqueness;
- required properties;
- enum validity;
- timestamp sanity;
- environment;
- no secrets/PII;
- event/order tolerance;
- parity frontend/backend;
- volume anomaly.

---

## 4. Diccionario B2C

### Acquisition

#### Visitante calificado

Sesión que selecciona una intención, ve una demo completa, consulta seguridad/costes o inicia acceso. No todo pageview.

#### Registro iniciado

Usuario inicia el flujo de cuenta; se deduplica por user/device bajo reglas de privacidad.

#### Cuenta creada

Smart account creada/configurada en el entorno y versión declarados.

#### Cuenta protegida

Cuenta creada + controles mínimos exigidos para la etapa. La definición versiona si cambia recovery.

### Activation

#### Fondeado/recibió

Primer saldo legítimo confirmado, excluyendo faucet, transferencias internas de test y duplicados.

#### Segunda acción útil

Una acción distinta o complementaria dentro de 14 días:

- envío/pago entregado;
- receipt compartido;
- bolsillo creado/usado;
- retiro completado;
- Creciendo depositado tras comprensión;
- contacto guardado y reutilizado.

#### Activado

Cuenta protegida + fondeo/recepción + segunda acción útil en 14 días.

#### Time to value

Tiempo desde primer registro iniciado hasta activación. Reportar mediana, p75 y p90; separar tiempo activo vs espera externa.

### Engagement

#### Movimiento útil

Intent financiero `succeeded` o acción de gestión con valor (por definición allowlist), no simple navegación.

#### Ciclo útil

Par/secuencia de movimientos dentro de 30 días que completa un job.

#### WAU/MAU financiero

Usuario con ≥1 movimiento útil en 7/30 días.

### Retention

#### W1

Activado que completa movimiento útil entre días 8–14 desde activación.

#### M1

Activado que completa movimiento útil entre días 31–60.

#### M3

Activado que completa movimiento útil entre días 91–120.

Usar ventanas, no calendario confuso.

### Money lifecycle

- amount received;
- amount sent/paid;
- amount withdrawn;
- amount available;
- amount growing;
- fees paid;
- net inflow/outflow;
- balance age/distribution;
- percentage of income retained/used when inferable with consent.

No sumar ETH/WBTC en USD sin precio, fuente y timestamp.

---

## 5. Diccionario B2B2C

### Partner funnel

- qualified partner;
- blueprint completed;
- sandbox key issued;
- first sandbox intent;
- certification passed;
- pilot committed;
- live limited;
- expanded;
- churned/paused.

### Integration

#### Time to first sandbox intent

Desde credenciales entregadas hasta primer intent válido.

#### Time to certified

Desde inicio técnico hasta test suite y operación aprobadas; reportar tiempo del partner vs GatoPago vs espera legal.

#### Webhook delivery success

Eventos entregados y verificados dentro de ventana / eventos esperados; duplicates no cuentan como fallo si contrato at-least-once.

#### Reconciliation match

Intents elegibles conciliados automáticamente / intents elegibles.

### User outcomes

- invited;
- claim viewed;
- claim completed;
- account protected;
- first value received;
- second Personal action;
- M1 retained;
- support required;
- opted into Personal communication.

### Partner economics

- volume;
- successful intents;
- net revenue;
- provider/gas cost;
- support/implementation cost;
- fraud/loss;
- contribution;
- payback;
- NRR;
- concentration.

---

## 6. Diccionario B2B/Platform

### Corridor

- corridor defined;
- route candidates;
- coverage;
- quote availability;
- success rate;
- time to finality/settlement;
- all-in cost;
- manual intervention;
- reconciliation lag;
- provider concentration;
- liquidity utilization.

### RouteScore components

Todos con ventana y sample size:

- net cost;
- p50/p95 time;
- success rate;
- timeout/unknown rate;
- capacity/liquidity;
- reconciliation quality;
- operational risk;
- compliance eligibility;
- counterparty concentration.

No publicar índice/score externo antes de metodología, calidad y revisión legal.

### Platform reliability

- intent acceptance availability;
- quote freshness;
- execution success;
- state freshness;
- webhook latency;
- reconciliation exceptions;
- aged pending;
- incidents;
- SLO/error budget.

### Sales

- qualified pipeline;
- stage conversion;
- sales cycle;
- pilot win rate;
- implementation payback;
- ARR/MRR;
- usage revenue;
- expansion;
- gross/net revenue retention;
- lost reason.

---

## 7. Seguridad, confianza y riesgo

### Trust funnel

- seguridad comprendida;
- recovery configured;
- recovery drill;
- fee understood;
- state understood;
- issue reported;
- issue resolved;
- next useful action after issue.

#### Trust recovery rate

Usuarios afectados por fallo que completan otro movimiento útil dentro de 30 días / usuarios afectados elegibles.

### Security

- account takeover;
- suspicious login/device;
- recovery initiated/cancelled/completed;
- recovery abuse;
- critical permission change;
- vulnerabilities by severity/age;
- privileged access reviews;
- security incidents;
- time to detect/contain/recover.

### Fraud/compliance

- loss bps;
- suspected fraud rate;
- false positive rate;
- manual review rate/time;
- referral abuse;
- screening alerts;
- case aging;
- KYC completion/rejection/review;
- suspicious activity escalation.

### Consumer fairness

- quote vs actual received;
- hidden/unexpected fee reports;
- complaints/1.000 users;
- complaint resolution;
- route selection outcome;
- Crecer risk comprehension;
- withdrawal success;
- accessibility defects in critical flows.

---

## 8. Confiabilidad y performance

### SLI

| SLI               | Numerador                       | Denominador                 |
| ----------------- | ------------------------------- | --------------------------- |
| Intent acceptance | válidos aceptados               | requests válidos            |
| Completion        | intents succeeded               | intents elegibles iniciados |
| State freshness   | estados actualizados en ventana | intents activos             |
| Webhook freshness | eventos entregados en ventana   | eventos emitidos            |
| Reconciliation    | matches en ventana              | items elegibles             |
| Balance freshness | balances en ventana             | views/refresh elegibles     |

### Latency

- UI acknowledgement;
- API p50/p95/p99;
- quote;
- signature prompt;
- submission;
- finality;
- CCTP/bridge;
- withdrawal;
- webhook;
- support response/resolution.

Separar controlable vs external wait; ambos importan al usuario.

### Web/PWA

- LCP;
- INP;
- CLS;
- JS transferred/executed;
- memory;
- animation long frames;
- crash/error;
- installability;
- offline/fallback;
- Android device tiers.

No inventar Core Web Vitals: medir con trazas reales.

---

## 9. Economía

### Revenue

- route/swap fees;
- platform subscription;
- usage fees;
- setup;
- Card/interchange future;
- on/off-ramp revenue share;
- Plus future.

### Variable costs

- network gas/paymaster;
- provider/route;
- RPC/bundler;
- KYC/screening;
- Card processing;
- fraud/loss;
- support;
- incentives;
- data/AI.

### Contribution

```text
net revenue
− direct variable costs
− fraud/loss
− attributable support
− amortized implementation where relevant
= contribution
```

### Unit metrics

- contribution/user active;
- contribution/successful intent;
- contribution/partner;
- contribution/corridor;
- CAC activated;
- partner CAC incl. founder/engineering time;
- payback;
- LTV scenarios;
- gross margin vs contribution margin.

### Incentive accounting

Separar:

- acquisition incentive;
- gas sponsorship;
- cashback;
- partner-funded reward;
- protocol reward;
- organic yield.

Nunca presentar incentivos temporales como economía estructural.

---

## 10. Cohortes y segmentación

### Cohortes obligatorias

- signup/activation week;
- acquisition source;
- initial intent;
- country;
- partner/community;
- device/platform;
- testnet/canary/live;
- incentivized/non-incentivized;
- persona/segment;
- first route;
- assisted/self-serve.

### Segmentos operativos

- new/protected/funded/activated;
- habitual/deep;
- issue affected;
- high support;
- at risk;
- recovered;
- partner-originated;
- Card waitlist eligible;
- rule/Crecer user.

### Prohibiciones

- inferir atributos sensibles sin necesidad/base;
- usar balance para discriminar support;
- personalizar riesgo financiero con modelo opaco;
- mezclar países/rutas y declarar un promedio global;
- comparar cohortes con ventanas distintas.

---

## 11. Dashboards

### Founder cockpit — semanal

- qualified arrivals;
- protected accounts;
- activation;
- useful cycles;
- W1/M1 leading cohorts;
- success/failure;
- support/incidents;
- contribution/burn;
- partner pipeline;
- top experiment decisions.

### Personal product — diario/semanal

- funnel by intent;
- time to value;
- flow drop-offs;
- error taxonomy;
- second action;
- repeat contacts;
- security;
- Crecer/Card demand;
- qualitative clips.

### Embedded — semanal

- partner stage;
- sandbox/live health;
- intents/status;
- webhook/reconciliation;
- end-user activation;
- support;
- partner margin;
- certification gaps.

### Platform/Ops — real time/diario

- route/provider health;
- pending age;
- success/latency;
- ledger exceptions;
- liquidity;
- incident alerts;
- limits;
- exposure.

### Risk — semanal/mensual

- top risks;
- fraud/loss;
- security;
- compliance cases;
- complaints;
- vendor concentration;
- control exceptions;
- gates.

---

## 12. Targets, baselines y gates

### Regla

No convertir hipótesis en promesas. Cada métrica tiene:

- baseline actual;
- target exploratorio;
- target de gate;
- SLO interno;
- SLA contractual, si existe.

### Alpha targets iniciales

| Métrica                            |       Target de aprendizaje |
| ---------------------------------- | --------------------------: |
| Comprende testnet                  |     ≥90% en prueba moderada |
| Account creation completion        |                        ≥70% |
| Funded → second action 14d         |    ≥60% en cohorte asistida |
| Receipt traceability               | 100% de succeeds soportados |
| Critical action simulation         |                        100% |
| Known unresolved fund-loss defects |              0 para avanzar |

### Mainnet gate

No fijar un número único de success antes de baseline por ruta. Requerir:

- auditoría/gates completos;
- canary con límites;
- reconciliación alta y excepciones explicadas;
- pérdida dentro del apetito;
- SLO medido;
- support/incident drill;
- ninguna divergencia material no entendida.

### Stop-the-line metrics

- pérdida/integridad de fondos;
- takeover spike;
- ledger mismatch material;
- recovery abuse;
- provider/route unknown state;
- regulatory/legal veto;
- hidden fee/quote divergence;
- inability to withdraw/exit;
- cross-tenant exposure.

Growth experiments pause automatically where relevant.

---

## 13. Marco de experimentos

### 13.1 Experiment brief

```text
ID:
Owner:
Decisión que informa:
Problema/evidencia:
Hipótesis:
Población y exclusiones:
Unidad de asignación:
Variante/control:
Métrica primaria:
Guardrails:
Mínimo efecto útil:
Duración/sample plan:
Riesgos/ética:
Instrumentation QA:
Stop conditions:
Resultado:
Decisión:
Follow-up:
```

### 13.2 Jerarquía de evidencia

1. comportamiento financiero completado;
2. task test observado;
3. uso repetido;
4. elección/willingness to pay;
5. entrevista contextual;
6. encuesta;
7. click/like/waitlist.

No descartar cualitativo; usarlo para explicar el porqué y generar hipótesis.

### 13.3 Tipos

- discovery prototype;
- usability;
- fake-door ético y etiquetado;
- concierge;
- A/B;
- holdout/incrementality;
- pricing research;
- sandbox/shadow;
- canary;
- operational drill.

### 13.4 Guardrails financieros

- no variar disclosures de forma engañosa;
- no esconder fees/riesgo a un control;
- no probar seguridad más débil;
- no experimentar con recovery irreversible;
- no asignar rutas inferiores solo para medir conversión;
- no usar usuarios vulnerables sin protección;
- no automatizar fondos sin autorización.

---

## 14. Priorización de experimentos

Score `ICE-R`:

- Impact 1–5;
- Confidence 1–5;
- Ease 1–5;
- Risk modifier 0,25–1.

```text
score = Impact × Confidence × Ease × RiskModifier
```

RiskModifier:

- 1: contenido/UI reversible;
- 0,75: workflow no financiero;
- 0,5: dinero limitado/sandbox;
- 0,25: seguridad/compliance/fondos live.

Alta puntuación no salta un gate.

### Portafolio

- 50% core activation/reliability;
- 20% retention;
- 15% distribution;
- 10% monetization;
- 5% vision bets.

Revisar por etapa; no dejar que visionary bets consuman el core.

---

## 15. Catálogo inicial de experimentos

### P0 — verdad y comprensión

1. Alpha/testnet comprehension.
2. Home Disponible/Creciendo/Otros activos.
3. Un único Escanear.
4. QR descargado y escaneable.
5. Estados submitted/finalized.
6. Security/recovery explanation.

### P1 — activación

7. Onboarding por intención.
8. Funding by origin.
9. Guided first receive.
10. Receipt next action.
11. Contacts.
12. Pocket prototype.

### P1 — confianza

13. Recovery drill.
14. Fee disclosure formats.
15. Pending progress animation.
16. Issue recovery comms.
17. Meli guardiana.

### P2 — distribución

18. Community payout.
19. Payroll claim.
20. Co-branded receipt.
21. Referral by activation.
22. Developer sandbox failure kit.

### P2 — monetización

23. Willingness to pay Plus.
24. Partner pricing packaging.
25. Gas subsidy threshold.
26. Route transparency vs conversion.

### P3 — visión

27. Rule simulation.
28. Explicación de automatizaciones guiadas.
29. Money Map.
30. Card waitlist qualification.
31. RouteScore shadow.

---

## 16. Análisis y estadística

### 16.1 Antes de ejecutar

- unidad de randomización;
- contaminación;
- sample feasibility;
- minimum detectable effect útil;
- novelty/seasonality;
- multiple metrics;
- instrumentation test;
- duración mínima por ciclo de conducta.

### 16.2 Early stage

Con muestras pequeñas:

- no fingir significancia;
- usar intervalos/incertidumbre;
- combinar task observation + behavior;
- repetir cohortes;
- buscar fallos graves y dirección de efecto;
- declarar inconcluso.

### 16.3 Segment analysis

Predefinir segmentos. No buscar después un grupo donde “ganó” sin etiquetar exploración.

### 16.4 Result record

- exposure counts;
- metric quality;
- effect/uncertainty;
- guardrails;
- qualitative evidence;
- anomalies;
- decision;
- generalizability limits;
- follow-up.

---

## 17. Data quality y governance

### Owners

- product analytics owner;
- domain metric owner;
- data/security owner;
- finance reconciliation owner;
- experiment owner.

### Metric contract

Cada métrica:

- nombre;
- definición;
- fórmula;
- source tables/events;
- filters;
- environment;
- grain;
- timezone/window;
- owner;
- version;
- tests;
- caveats.

### Tests

- freshness;
- completeness;
- uniqueness;
- referential integrity;
- volume anomaly;
- cross-source reconciliation;
- schema drift;
- PII scan.

### Change process

- proposal;
- impact analysis;
- version/new metric;
- backfill policy;
- dashboard migration;
- changelog;
- stakeholder notice.

---

## 18. Research repository

Por entrevista/test:

- participant segment;
- consent;
- task/context;
- observations;
- direct evidence with minimal personal data;
- severity;
- related metric/flow;
- hypothesis;
- decision;
- follow-up.

### Insight criteria

Un insight debe decir:

- quién;
- en qué situación;
- qué intentó;
- qué ocurrió;
- por qué importa;
- qué evidencia faltaría.

Evitar “los usuarios quieren X” por una frase aislada.

---

## 19. Cadencia de decisiones

### Diario

- incidents;
- pending/failed;
- data freshness;
- experiment safety.

### Semanal

- activation/funnel;
- reliability;
- qualitative clips;
- partner health;
- experiments ship/stop.

### Mensual

- cohort retention;
- unit economics;
- trust/risk;
- roadmap gates;
- country/channel performance;
- metric definition changes.

### Trimestral

- strategy/portfolio;
- moat evidence;
- kill/continue bets;
- risk appetite;
- vendor/country expansion;
- annual plan reforecast.

---

## 20. Scorecards

### Personal launch scorecard

| Dimensión   | Gate                            |
| ----------- | ------------------------------- |
| Value       | activation y repeat evidence    |
| Clarity     | testnet/control/fees understood |
| Reliability | success/state/reconciliation    |
| Security    | audit/recovery/limits           |
| Operations  | support/incident/exit           |
| Economics   | cost/subsidy understood         |
| Legal       | claims/activity approved        |

### Embedded pilot scorecard

| Dimensión   | Gate                            |
| ----------- | ------------------------------- |
| Partner     | sponsor/flow/volume             |
| Integration | certification/webhooks          |
| User        | claim/activation                |
| Ops         | RACI/support/reconciliation     |
| Risk        | KYB/KYC/limits                  |
| Economics   | contribution/payback hypothesis |
| Reuse       | second partner potential        |

### Corridor scorecard

| Dimensión      | Gate                           |
| -------------- | ------------------------------ |
| Coverage       | route available/contracts      |
| Cost           | all-in competitive/transparent |
| Speed          | measured percentiles           |
| Reliability    | success/unknown                |
| Liquidity      | capacity/buffers               |
| Compliance     | jurisdictions/responsibilities |
| Reconciliation | evidence/matching              |
| Exit           | fallback/vendor replacement    |

---

## 21. Roadmap de medición

### 0–30 días

- event inventory;
- environment separation;
- north star implementation;
- B2C funnel;
- error taxonomy;
- analytics privacy review;
- experiment registry;
- founder cockpit V0.

### 31–90 días

- metric contracts/tests;
- cohort retention;
- trust/security events;
- partner sandbox dashboard;
- performance monitoring;
- qualitative repository;
- unit cost baseline.

### 3–6 meses

- reconciliation analytics;
- contribution by user/route;
- feature flags/exposure;
- experiment analysis templates;
- risk/ops scorecards;
- canary gates.

### 6–12 meses

- semantic metric layer;
- partner/corridor scorecards;
- automated data quality;
- attribution/incrementality;
- forecast/scenario models;
- SLO/error budgets.

### 12–24 meses

- RouteScore shadow datasets;
- privacy-preserving cross-partner insights;
- model monitoring;
- mature FinOps;
- board/external assurance metrics;
- methodology for any public corridor index.

---

## 22. Decisión final

La medición de GatoPago debe impedir dos autoengaños: creer que testnet es adopción y creer que volumen es confianza.

> **La métrica que importa no es cuánto dinero tocó el sistema, sino cuántas intenciones completó correctamente, cuánta utilidad dejó después y cuánto control conservó cada dueño.**
