# GatoPago: plan de empresa, finanzas y capital 2026–2030

> **Estado:** modelo operativo y financiero para tomar decisiones; no es una proyección contable ni oferta de inversión.  
> **Fecha de corte:** 19 de agosto de 2026.  
> **Alcance:** estructura de compañía, monetización, planificación financiera, financiación y disciplina de capital.  
> **Regla:** no inventar ingresos, valoración, TAM capturable ni runway. Completar el modelo con datos reales a medida que existan.

---

## 0. Tesis de compañía

GatoPago construye una sola red de capacidades y captura valor de tres maneras:

- **Personal** crea hábito, confianza y demanda;
- **Embedded** distribuye el producto mediante organizaciones;
- **Platform** monetiza infraestructura, rutas y operación.

```text
Personal: love + usage
       ↓
Embedded: distribution + recurring flow
       ↓
Platform: infrastructure + margin
       ↓
better routes and experiences
       └────────────→ Personal
```

### Objetivo económico

No maximizar take rate. Maximizar **contribución sostenible por ciclo útil**, mientras el usuario obtiene un resultado competitivo y transparente.

### Secuencia de monetización

1. validar utilidad y confiabilidad;
2. observar costes reales;
3. cobrar donde GatoPago ahorra trabajo, riesgo o tiempo;
4. evitar subsidios indefinidos;
5. convertir capacidades reutilizables en margen de plataforma;
6. usar capital para desbloquear gates, no para ocultar falta de producto.

---

## 1. Modelo de negocio por superficie

### 1.1 Personal

Ingresos potenciales:

- fee transparente en rutas/swap;
- revenue share de on/off-ramp;
- interchange/Card cuando exista;
- plan Plus futuro;
- servicios de pago internacional;
- conversión a Business para equipos.

Costes:

- gas/paymaster;
- RPC/bundler;
- proveedores;
- fraude;
- KYC where applicable;
- soporte;
- rewards;
- Card operations.

No cobrar:

- seguridad básica;
- acceso al historial;
- retiro/escape mediante una “ransom fee”;
- recuperación esencial;
- soporte de un defecto propio.

### 1.2 Embedded

Ingresos:

- setup;
- plataforma mensual;
- intent completado;
- volumen;
- components/SDK/support tier;
- SLA/enterprise pack;
- revenue share de capacidades.

Costes:

- solución/implementación;
- partner success;
- support escalations;
- tenant/security/compliance;
- provider/gas;
- custom work.

### 1.3 Platform

Ingresos:

- orchestration/platform fee;
- fee por route/transaction;
- Connect/adapters;
- Guard/risk capabilities;
- Ledger/Trace/reconciliation;
- premium analytics/RouteScore;
- enterprise support/SLA;
- corridor implementation.

Costes:

- provider/rail fees;
- liquidity/prefunding;
- compliance/security;
- infrastructure;
- solution engineering;
- on-call/ops;
- vendor concentration and redundancy.

---

## 2. Pricing architecture

### 2.1 Principios

- simple enough to explain;
- aligned with completed value;
- total cost visible;
- margin by capability;
- country/corridor specific where needed;
- no cross-subsidy hidden;
- volume discounts only with commitment;
- failed/duplicate requests not monetized as success;
- enterprise custom pricing has floor.

### 2.2 Personal pricing hypotheses

| Capability        | Model to test                                      |
| ----------------- | -------------------------------------------------- |
| P2P GatoPago      | free/low-cost where economics allow                |
| Swap              | transparent bps/fixed minimum                      |
| Crosschain/route  | provider + GatoPago service fee                    |
| Local on/off-ramp | partner fee/FX + disclosed GatoPago margin         |
| Creciendo         | no hidden yield skim; explicit model if introduced |
| Card              | program fees/FX/interchange, disclosed             |
| Plus              | monthly/annual after willingness-to-pay evidence   |

### 2.3 Embedded packages

- Launch: hosted, limited, standard support.
- Grow: co-brand/components/API, analytics, higher limits.
- Scale: headless, SLO/SLA, policies, dedicated support.

### 2.4 Platform pricing

Could combine:

```text
monthly platform minimum
+ usage per completed intent
+ route/corridor fee
+ premium modules/support
+ pass-through provider costs
```

Avoid a complex menu before one repeatable customer archetype.

---

## 3. Unit economics

### 3.1 Personal contribution

```text
fees + revenue shares + subscription allocation
− provider/network/gas
− fraud/loss
− variable support
− incentives
− KYC/Card variable cost
= contribution per active user
```

### 3.2 Embedded contribution

```text
platform + setup amortized + usage
− route/provider
− support/success
− implementation amortized
− compliance/fraud
= partner contribution
```

### 3.3 Corridor contribution

```text
customer fee/spread
− FX/liquidity
− rail/provider
− settlement/prefunding cost
− losses/compliance/ops
= corridor contribution
```

### 3.4 Cost allocation

- direct costs attributed directly;
- shared infra by usage driver;
- security/compliance partly fixed, partly capability/country;
- founder/engineering implementation hours recorded;
- incentives separate;
- R&D not disguised as COGS, but visible in burn.

### 3.5 Review

Monthly by:

- user cohort;
- partner;
- route/corridor;
- country;
- capability;
- environment (excluding test volume from revenue).

---

## 4. Financial model

### 4.1 Inputs, not fantasies

#### Personal

- qualified acquisitions;
- protected/activated conversion;
- retention;
- movements/user;
- volume/movement;
- take rate;
- variable cost;
- CAC/support.

#### Embedded

- partners by stage;
- time to live;
- end users/partner;
- intents/volume;
- price;
- implementation/support cost;
- churn/expansion.

#### Platform

- corridors/customers;
- volume;
- margin;
- sales cycle;
- implementation;
- liquidity/prefunding;
- SRE/compliance burden.

### 4.2 Three scenarios

#### Survival

- product-led Alpha;
- no Card revenue;
- one partner/corridor;
- low paid acquisition;
- founder-heavy sales/support;
- preserve runway.

#### Base

- B2C wedge retains;
- 2–4 repeatable partners;
- one corridor contributes;
- Card remains pilot or limited;
- small team grows by gates.

#### Breakout

- partner-led loop repeats;
- Card/rail opens daily utility;
- platform corridors scale;
- contribution funds growth;
- multi-country expansion.

Breakout never becomes hiring baseline until leading evidence appears.

### 4.3 Model outputs

- revenue by surface;
- gross/contribution margin;
- operating expenses;
- burn;
- runway;
- cash needs;
- working capital/prefunding;
- break-even sensitivity;
- concentration;
- scenario probabilities;
- capital milestones.

---

## 5. Capital allocation

### 5.1 Current strategic allocation

Default before stronger evidence:

- 60% Personal/core;
- 25% Card/company/rails discovery and readiness;
- 15% API/private partners.

Interpret as attention/capacity guide, not accounting rule. Rebalance quarterly by gates.

### 5.2 Spend priorities

1. security/audit and critical reliability;
2. core product and user research;
3. operational readiness;
4. one distribution experiment;
5. one provider/corridor pilot;
6. growth only after activation;
7. visionary R&D in small bounded budget.

### 5.3 Do not fund yet

- multiple countries simultaneously;
- bespoke enterprise features;
- broad paid acquisition;
- proprietary chain/token;
- many DeFi protocols;
- large sales team before repeatability;
- Card inventory/marketing before signed program;
- certifications demanded by no customer.

### 5.4 Capital request rule

Each material spend states:

- hypothesis/gate;
- amount;
- owner;
- timebox;
- evidence expected;
- stop condition;
- reuse value;
- downside.

---

## 6. Funding strategy

### 6.1 Bootstrap/grants first where useful

Use:

- founder capital within explicit limit;
- ecosystem grants for technical/public goods milestones;
- hackathons for learning and relationships;
- paid pilots/design partnerships;
- cloud/infra credits.

Do not let grant criteria fragment product or force claims.

### 6.2 Angel/pre-seed trigger

Raise when capital accelerates evidence already visible, for example:

- strong activation/retention in a wedge;
- repeatable partner flow;
- mainnet/security gate near completion;
- Card/rail agreement with validated demand;
- corridor pilot with quantified economics.

Not merely because the rebrand looks ready.

### 6.3 Milestone-based use of funds

- security/mainnet;
- core hires;
- first regulated/rail partnerships;
- support/risk operations;
- distribution loop;
- runway to next measurable proof.

### 6.4 Investor narrative

```text
Problem: money crosses borders through fragmented products and workflows.
Wedge: LATAM earners already using digital dollars.
Product: account that turns receiving into a usable lifecycle.
Distribution: partners originate users with money/context.
Platform: common intent/routing/ledger layer.
Moat: experience + workflows + distribution + route data + trust.
Proof: only verified product/cohort/partner evidence.
Expansion: Personal → Embedded → Platform flywheel.
```

### 6.5 Data room

- incorporation/cap table;
- IP/contractor assignments;
- financials/budget;
- product metrics;
- architecture/security;
- legal/regulatory memos;
- partner contracts/LOIs clearly labeled;
- roadmap/gates;
- market/competition;
- risk register;
- hiring plan;
- references.

---

## 7. Team plan

### 7.1 Stage 0 — founder + specialists

Required responsibilities:

- product/founder;
- frontend/design system;
- smart contract/backend;
- payments/data;
- security review;
- legal/compliance counsel;
- user research/growth;
- operations/support.

People can cover multiple responsibilities; critical review cannot disappear.

### 7.2 First hires by gate

| Gate               | Hire/profile                              |
| ------------------ | ----------------------------------------- |
| Core users repeat  | product engineer/full-stack               |
| Mainnet/security   | senior smart contract/security capability |
| Partner pilot      | platform/solutions engineer               |
| Live money/support | payments operations lead                  |
| Regulatory flow    | compliance/risk owner + counsel           |
| Growth loop        | growth/product marketer                   |
| Data scale         | analytics/data engineer                   |

Do not hire a large sales team before founder can close/repeat the motion.

### 7.3 Org target

```text
CEO/Product
├── Personal Product
├── Platform & Money Movement
├── Risk, Security & Operations
└── Growth, Brand & Partner Success
```

Finance/legal may be fractional early, then internalize by exposure.

### 7.4 Hiring score

- mission/product understanding;
- craft;
- security/financial judgment;
- ability to operate ambiguity;
- writing/communication;
- respect for users;
- evidence of ownership;
- no hype dependency.

---

## 8. Decision rights and governance

### Founder/CEO

- vision/portfolio;
- capital;
- material partnerships;
- risk acceptance;
- final launch decision with functional sign-offs.

### Product

- user outcomes;
- prioritization;
- claims coordination;
- experiments.

### Engineering/security

- architecture;
- technical gates;
- incident containment;
- security veto for unsafe launch.

### Risk/compliance/legal

- activity/market gates;
- control requirements;
- regulatory communication;
- veto for prohibited/unapproved activity.

### Operations/finance

- reconciliation;
- liquidity;
- support readiness;
- operational veto when service cannot be safely run.

### Two-key launch

No live money launch with only product approval. Requires business owner + independent security/risk/operations sign-offs appropriate to capability.

---

## 9. Operating cadence

### Daily

- health/incidents;
- pending/exceptions;
- user/partner blockers.

### Weekly

- product outcomes;
- cohort/experiments;
- engineering delivery;
- risk/ops;
- sales/partner pipeline;
- cash exceptions.

### Monthly

- P&L/cash/runway;
- unit economics;
- roadmap gates;
- vendor/country risk;
- hiring/capacity;
- strategy assumptions.

### Quarterly

- portfolio allocation;
- scenario/reforecast;
- stop/start/continue;
- board/advisors;
- risk appetite;
- fundraising timing;
- brand/product coherence.

### Decision log

Capture:

- decision;
- date;
- owner;
- context/evidence;
- options;
- rationale;
- reversibility;
- revisit trigger.

---

## 10. Planning system

### Company outcomes

Limit to 3–4 per quarter:

- useful B2C cycle;
- reliability/mainnet gate;
- partner/corridor proof;
- operational/economic readiness.

### Team goals

Tie outputs to outcome. Example:

Bad: “ship 12 features”.

Good: “raise funded-to-second-action from baseline to target without increasing support/failure”.

### Capacity

- commitments;
- reliability/security;
- discovery;
- maintenance/debt;
- interrupt buffer.

No plan 100% of capacity in a financial system.

---

## 11. Partnerships portfolio

### Categories

- distribution;
- regulated rails;
- Card;
- liquidity/FX;
- chain/protocol;
- compliance/security;
- ecosystem/grants;
- technology.

### Partnership score

- strategic fit;
- user value;
- speed to evidence;
- economics;
- regulatory/security;
- integration effort;
- reusability;
- dependency/concentration;
- brand fit;
- exit.

### Rules

- no exclusive deal without material reciprocal value;
- no logo before scope/permission;
- LOI ≠ revenue;
- pilot has charter and stop condition;
- partner roadmap does not silently become company roadmap;
- shared incident and claims process.

---

## 12. Corporate/legal foundations

Checklist:

- correct legal entity/structure;
- founder/cap table docs;
- IP assignments;
- contractor/employee agreements;
- trademarks/domain/social handles;
- privacy/terms;
- vendor/partner contracts;
- DPAs;
- insurance assessment;
- tax/accounting;
- corporate approvals;
- records;
- regulatory counsel;
- conflict policies.

Consolidating the GatoPago identity requires:

- trademark/domain search;
- entity/DBA review;
- contract and privacy updates;
- asset migration;
- app store/PWA/social metadata;
- communication plan;
- archive/redirects.

No asumir disponibilidad legal por gusto de nombre.

---

## 13. Financial controls

- bank/treasury account separation;
- bookkeeping monthly close;
- expense approval thresholds;
- vendor onboarding;
- invoice/contract matching;
- corporate card controls;
- cash forecast;
- runway report;
- tax calendar;
- dual approval for treasury;
- user funds excluded/separated according to model;
- audit trail.

### Close pack

- P&L;
- balance sheet;
- cash flow;
- runway;
- revenue by surface;
- deferred/setup revenue if applicable;
- provider liabilities/receivables;
- incentives;
- treasury exposure;
- reconciliations;
- budget variance.

---

## 14. Strategic options

### Option A — Consumer-first account

Best if B2C retention/Card demand appears before enterprise pull.

Risk: costly distribution and regulation.

### Option B — Embedded wedge

Best if communities/payroll produce repeated activated cohorts.

Risk: services/customization trap.

### Option C — Platform/corridor-first

Best if PagoFácil or similar yields paid pilot with strong reuse.

Risk: B2B complexity overshadows brand and Personal.

### Recommended portfolio

Personal remains product center; pursue exactly one Embedded/B2B design partnership that reuses the same core. Let evidence change weights, not excitement.

### Strategic no-go

- launch a token to finance operations;
- become custodial casually;
- sell user data;
- become a generic dev shop;
- promise all rails/countries;
- trade company treasury speculatively;
- build exchange/trading feed to fake engagement.

---

## 15. Milestones

### 0–3 months

- complete documentation/source-of-truth;
- user cohort evidence;
- core Alpha coherence;
- risk/financial baseline;
- design partner selected;
- budget/runway model;
- legal structure/naming review.

### 3–6 months

- mainnet readiness decision;
- first limited live pilot only if gates;
- first partner sandbox/live decision;
- unit economics baseline;
- hiring/funding choice based on evidence.

### 6–12 months

- repeatability in one growth loop;
- 2+ partners only if same blueprint;
- Card go/no-go;
- country expansion go/no-go;
- contribution path;
- pre-seed/grant strategy.

### 12–24 months

- surface/corridor portfolio validated;
- dedicated risk/ops;
- platform repeatability;
- regional partnerships;
- Series Seed decision based on growth and economics, not calendar.

### 2028–2030

- multi-country network only where regulated/operable;
- Personal/Embedded/Platform flywheel evidenced;
- durable route/trust data moat;
- optional strategic paths: independent scale, infrastructure partnerships or regional consolidation—evaluated without compromising user control.

---

## 16. Founder dashboard

### Product

- useful cycles;
- activation/retention;
- reliability/trust;
- current gates.

### Business

- revenue/contribution;
- active partners/corridors;
- pipeline;
- concentration.

### Capital

- cash;
- burn;
- runway;
- commitments;
- scenario.

### Risk

- top risks;
- incidents/losses;
- regulatory status;
- audit/control gaps.

### Team

- capacity;
- critical ownership gaps;
- hiring;
- founder bottlenecks.

---

## 17. Decisión final

GatoPago debe financiar una secuencia de pruebas, no una fantasía de escala simultánea.

> **Construir Personal hasta que genere hábito; usar Embedded para distribuir ese hábito; convertir Platform en margen solo cuando las capacidades se repitan. El capital compra tiempo para cruzar gates, no permiso para saltarlos.**
