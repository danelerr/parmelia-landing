# GatoPago: plan de operaciones, riesgo y confianza 2026

> **Estado:** modelo operativo objetivo y gates de control.  
> **Fecha de corte:** 19 de agosto de 2026.  
> **Advertencia:** no es asesoría legal ni confirma autorización regulatoria. Cada actividad, entidad, país y flujo requiere análisis profesional actualizado.  
> **Alcance:** seguridad, fraude, compliance, soporte, treasury/liquidez, conciliación, incidentes, continuidad, terceros, Card y protección del usuario.

---

## 0. Tesis

En GatoPago, confianza no es una campaña. Es la capacidad operativa de responder correctamente cuando:

- un pago tarda;
- una ruta falla;
- un usuario pierde el teléfono;
- un partner manda un evento duplicado;
- una stablecoin se desvía;
- un proveedor cae;
- aparece fraude;
- cambia una regla;
- un regulador pregunta;
- la interfaz no está disponible.

La promesa operativa es:

> **Cada movimiento tiene un estado, un responsable, una evidencia y una salida.**

### Prioridades en orden

1. proteger a personas y fondos;
2. conservar integridad de cuenta y ledger;
3. cumplir obligaciones aplicables;
4. detener propagación;
5. comunicar con honestidad;
6. recuperar servicio;
7. reconciliar y compensar cuando corresponda;
8. aprender y reducir recurrencia.

---

## 1. Modelo de tres líneas adaptado

### Primera línea — producto y operaciones

- diseña y ejecuta controles;
- monitorea flujos;
- atiende usuarios/partners;
- concilia;
- escala excepciones;
- mantiene runbooks.

### Segunda línea — riesgo, seguridad y compliance

- define políticas;
- revisa riesgos;
- monitorea independencia de controles críticos;
- interpreta obligaciones con asesores;
- aprueba excepciones;
- reporta exposición.

### Tercera línea — assurance independiente

En etapa temprana:

- auditoría de contratos;
- pentest;
- revisión legal/compliance externa;
- revisión contable/ledger;
- ejercicios de incidentes con terceros.

No fingir un departamento de auditoría interna antes de existir; sí asegurar revisión independiente proporcional.

---

## 2. Taxonomía de riesgo

| Dominio                  | Ejemplos                                             |
| ------------------------ | ---------------------------------------------------- |
| Cuenta/custodia          | takeover, recovery abuse, módulo/upgrade             |
| Smart contract/protocolo | bug, oracle, depeg, liquidity, governance            |
| Pagos                    | doble envío, destinatario incorrecto, finality, fees |
| Ruta/proveedor           | caída, insolvencia, estado falso, settlement         |
| Fraude                   | social engineering, mule, sybil, card fraud          |
| AML/sanciones            | actor/flujo prohibido, Travel Rule, monitoring       |
| Regulatorio              | actividad no autorizada, marketing, país             |
| Privacidad               | exposición, exceso de datos, cross-tenant            |
| Operacional              | runbook ausente, error manual, concentración         |
| Liquidez/treasury        | insuficiencia, FX, prefunding, depeg                 |
| Modelo/IA                | recomendación errónea, drift, autoridad excesiva     |
| Conducta                 | fees opacos, dark patterns, suitability              |
| Reputación               | promesa falsa, incidente mal comunicado              |
| Continuidad              | cloud/RPC/issuer/key person dependency               |

### Escala

Probabilidad 1–5 × impacto 1–5, con dimensiones de impacto:

- fondos;
- usuarios;
- legal/regulatorio;
- privacidad;
- disponibilidad;
- reputación;
- partner.

Riesgos 15–25 requieren owner, tratamiento, fecha y aceptación ejecutiva explícita; riesgos críticos de fondos/legal pueden vetar lanzamiento sin importar score agregado.

---

## 3. Registro y apetito de riesgo

### 3.1 Registro

Campos:

- ID y descripción;
- dominio/capacidad/país;
- causa/escenario;
- impacto;
- controles existentes;
- riesgo inherente/residual;
- owner;
- indicadores;
- tratamiento;
- deadline;
- evidencia;
- aceptación/excepción;
- próxima revisión.

### 3.2 Apetito

#### Cero tolerancia

- esconder pérdida/exposición;
- usar fondos fuera de autoridad;
- claves/secretos en logs o repositorio;
- lanzar actividad prohibida/no evaluada;
- rendimiento garantizado falso;
- manipular estados de pago;
- mezclar fondos/ledger sin trazabilidad;
- represalias por reportar vulnerabilidad/incidente.

#### Muy bajo

- pérdida de fondos por defecto;
- takeover;
- cross-tenant data leak;
- reconciliación material abierta;
- recovery sin control;
- partner sin KYB en live.

#### Moderado y controlado

- operación manual en piloto;
- rutas con poca historia bajo límites;
- fallos UX reversibles;
- experimentos de pricing/activation con guardrails.

#### Alto solo en sandbox

- nuevas redes/protocolos;
- IA generando reglas;
- auto-routing;
- integraciones incompletas;
- pruebas de caos.

---

## 4. Modelo regulatorio por capacidad

### 4.1 No regular la marca; mapear la actividad

Por capacidad responder:

- ¿quién ofrece el servicio?
- ¿quién contrata al usuario?
- ¿quién controla fondos?
- ¿quién convierte fiat/activo?
- ¿quién ejecuta/settles?
- ¿quién hace KYC/monitoring?
- ¿qué país y usuario?
- ¿qué publicidad se usa?
- ¿qué datos se procesan?
- ¿qué licencias/registros/contratos aplican?

### 4.2 Matriz inicial

| Capacidad                 | Riesgo regulatorio          | Revisión mínima                           |
| ------------------------- | --------------------------- | ----------------------------------------- |
| Testnet/faucet            | Bajo, no cero               | términos, privacidad, no valor real       |
| Software de smart account | Depende de control/servicio | custody/control memo                      |
| Pago onchain P2P          | Depende de intermediación   | legal/AML/consumer review                 |
| Swap                      | Alto según rol/jurisdicción | VASP/PSAV, disclosures, provider          |
| Aave/Crecer               | Alto por DeFi/inversión     | distribution, suitability, marketing, tax |
| Fiat on/off-ramp          | Regulado                    | partner autorizado, KYC/AML, funds flow   |
| Card                      | Regulado                    | issuer/program, KYC, PCI, disputes        |
| Embedded                  | Compartido                  | responsibility matrix/DPA/KYB             |
| Platform routing          | Alto                        | payment/VASP/licensing per corridor       |
| Treasury/autopilot        | Alto                        | mandate, fiduciary/advice, controls       |

### 4.3 Bolivia

Señales regulatorias vigentes al corte:

- El BCB habilitó en 2024 el uso de canales e instrumentos electrónicos de pago para compra/venta de activos virtuales.
- ASFI puso en vigencia en 2025 el Reglamento para Empresas de Tecnología Financiera y contempla un Entorno Controlado de Pruebas.
- El marco de pagos incorporó ETF que canalizan o facilitan operaciones con instrumentos/canales de pago.
- UIF publica registro y normativa para PSAV.
- BCB/ASFI han reforzado requisitos de seguridad, interoperabilidad y monitoreo.

Lectura correcta: existe un camino regulatorio más definido. Lectura incorrecta: cualquier app stablecoin puede operar libremente.

### 4.4 Regulatory launch pack

Por país:

- legal memo de actividades;
- entidad/contracting model;
- licencias/partners;
- funds flow;
- custody/control;
- KYC/AML responsibilities;
- privacy/data transfer;
- consumer terms/disclosures;
- tax/accounting considerations;
- claims;
- incident/reporting obligations;
- regulator engagement plan;
- stop/no-go triggers.

---

## 5. AML, sanciones y fraude financiero

### 5.1 Risk-based program

- customer/partner risk assessment;
- product/country/channel risk;
- KYB/KYC where required;
- beneficial ownership;
- sanctions/PEP screening as applicable;
- transaction monitoring;
- case management;
- suspicious activity escalation/reporting;
- record retention;
- training;
- independent review.

### 5.2 No universalizar KYC

Progressive by capability. La experiencia debe decir:

- quién pide datos;
- por qué;
- qué documento;
- cuánto tarda;
- qué puede hacer mientras espera;
- cómo apelar/corregir;
- cómo se protege la información.

### 5.3 Transaction monitoring signals

- velocity in/out;
- burst of new destinations;
- structuring around limits;
- sanctioned/high-risk exposure;
- account/device linkage;
- rapid claim/withdraw;
- referral abuse;
- unusual route/asset;
- repeated failures;
- partner anomaly;
- card-present/not-present patterns future.

Una señal abre evaluación; no declara culpabilidad.

### 5.4 Case outcomes

- no concern;
- monitor;
- require information;
- reduce/hold capability where lawful;
- offboard;
- report/escalate;
- preserve evidence.

### 5.5 Travel Rule/payment transparency

Diseñar datos y responsabilidades para poder cumplir requisitos por jurisdicción/corredor sin publicar más datos onchain de los necesarios. Separar información de compliance de metadata pública.

---

## 6. Fraude y abuso

### 6.1 Personas

- phishing/fake GatoPago;
- social engineering;
- account takeover;
- SIM/device compromise;
- malicious QR/link;
- address poisoning;
- romance/investment scam;
- recovery abuse;
- refund scam.

### 6.2 Partners/API

- stolen API key;
- fake webhook;
- duplicate payout;
- metadata injection;
- tenant abuse;
- partner insider;
- subsidy farming;
- test/live confusion;
- callback tampering.

### 6.3 Card futuro

- card-not-present;
- stolen credentials/device;
- merchant dispute;
- friendly fraud;
- ATM/cash risk;
- authorization/settlement mismatch;
- chargeback abuse.

### 6.4 Control stack

- device/session risk;
- passkey/re-auth;
- destination trust;
- velocity/amount limits;
- delays for sensitive changes;
- transaction simulation;
- contact verification;
- link/domain signing;
- anomaly detection;
- manual review;
- pause/freeze at the capability layer where permitted;
- user reporting;
- evidence retention.

### 6.5 Fraud KPIs

- loss bps;
- prevented vs false positives;
- takeover rate;
- referral abuse;
- review rate/time;
- recovery fraud;
- dispute/chargeback rate;
- user-reported scam rate;
- funds recovery rate;
- repeat offender/linkage.

---

## 7. Seguridad de cuenta y recuperación

### 7.1 Control map

| Momento            | Control                                         |
| ------------------ | ----------------------------------------------- |
| Registro           | passkey + device binding + anti-automation      |
| Nuevo dispositivo  | reauth + notification + cooling period sensible |
| Pago               | exact amount/destination + simulation + passkey |
| Nuevo contacto     | verification + first-payment warning/limit      |
| Cambio de guardian | timelock + notification                         |
| Recovery           | delay + multi-channel + cancellation            |
| Regla              | cap + expiry + revoke + log                     |
| Upgrade            | governance + delay + audit                      |

### 7.2 Recovery operations

- queue visible;
- timestamps;
- identity/guardian evidence;
- risk signals;
- cancellation path;
- support escalation;
- no bypass manual informal;
- post-recovery security review;
- revocation of lost methods.

### 7.3 Escape hatch

- documentación independiente;
- contract addresses/version;
- owner/module state;
- safe withdrawal/management tool or standard compatibility;
- warnings;
- periodic drill;
- continuity if GatoPago frontend/backend is unavailable.

---

## 8. Riesgo de protocolo, stablecoin y red

### 8.1 Stablecoin

Monitorear:

- peg/deviation;
- reserves/attestations where available;
- issuer/regulatory events;
- chain-specific token contract;
- mint/burn/bridge dependencies;
- liquidity and concentration;
- freeze/blacklist capability;
- redemption route.

### 8.2 Aave/DeFi

- protocol version/market;
- contract/asset parameters;
- utilization/liquidity;
- APY source/freshness;
- oracle;
- governance changes;
- incidents;
- withdrawal capacity;
- smart-contract audits;
- UI disclosure.

### 8.3 Network

- finality/reorg;
- RPC diversity;
- congestion/gas;
- sequencer risk;
- bridge/message risk;
- explorer/indexer lag;
- chain pause/upgrade;
- ecosystem support.

### 8.4 Risk actions

Niveles:

- normal;
- watch;
- warning;
- restrict new exposure;
- exit recommended/prepared;
- emergency pause of affected capability.

No bloquear salida porque se bloqueó entrada, salvo imposibilidad o riesgo mayor documentado.

---

## 9. Treasury, liquidez y settlement

### 9.1 Separación

- corporate treasury;
- operational gas funds;
- paymaster budgets;
- provider prefunding;
- Card/settlement reserves;
- user-controlled funds;
- fees receivable;
- incentives.

No mezclar contable ni operativamente.

### 9.2 Política de treasury

- approved assets/counterparties;
- limits by bank/provider/chain;
- dual approvals;
- daily exposure;
- liquidity buffers;
- FX/depeg thresholds;
- rebalancing;
- settlement calendar;
- access/key management;
- reporting;
- emergency actions.

### 9.3 Liquidity dashboard

- available by asset/rail;
- committed/pending;
- forecast needs;
- provider limits;
- failed/aged settlements;
- concentration;
- cost of capital;
- stress scenarios.

### 9.4 Stress tests

- 2×/5× volume;
- weekend/holiday;
- 1–5% depeg;
- provider frozen;
- bank delay;
- bridge/CCTP delay;
- mass withdrawals;
- Card settlement spike;
- gas spike;
- fraud loss event.

---

## 10. Conciliación y control financiero

### 10.1 Daily controls future live

- intents vs attempts;
- chain/provider vs ledger;
- balances;
- fees;
- prefunding;
- Card authorizations vs clearing/settlement;
- refunds/chargebacks;
- aged pending;
- manual adjustments;
- partner reports.

### 10.2 Exception management

Severity based on:

- amount;
- user count;
- age;
- legal impact;
- systemic pattern;
- inability to exit.

Every exception has owner, due time, evidence, action and financial effect.

### 10.3 Maker-checker

Required for:

- manual financial adjustment;
- payout replay;
- limit override;
- treasury move;
- key/role change;
- provider account change;
- refund above threshold;
- production data export.

---

## 11. Soporte y customer care

### 11.1 Principio

El usuario no debe conocer la arquitectura para recibir ayuda. Support sees the trace; el usuario da un receipt/intent ID.

### 11.2 Canales

- in-app authenticated support;
- email;
- status page;
- emergency security path;
- partner handoff;
- no depender de DM social para casos financieros.

### 11.3 Verificación

Support nunca pide:

- seed phrase;
- passkey secret;
- OTP completo fuera de flujo;
- private key;
- remote control no autorizado;
- enviar fondos para “verificar”.

### 11.4 Taxonomía

- account/access;
- security/recovery;
- receive/funding;
- payment;
- swap;
- grow;
- withdrawal;
- partner/checkout;
- Card future;
- fees;
- bug/accessibility;
- fraud/scam;
- privacy.

### 11.5 Quality

- first response;
- resolution time;
- reopen rate;
- transfers;
- correct classification;
- user effort;
- satisfaction after resolution;
- trust recovery;
- repeated root causes.

### 11.6 Vulnerable users

Procedimientos para:

- coercion/financial abuse;
- scam victim;
- accessibility need;
- language barrier;
- bereavement/incapacity future;
- high distress.

No diseñar recuperación familiar sin threat model de abuso doméstico/coerción.

---

## 12. Gestión de incidentes

### 12.1 Severidad

| Severidad | Definición                            | Ejemplo                                  |
| --------- | ------------------------------------- | ---------------------------------------- |
| SEV-0     | fondos/seguridad sistémicos en curso  | exploit o key compromise                 |
| SEV-1     | impacto material o múltiples usuarios | pagos duplicados, account access failure |
| SEV-2     | capacidad degradada con workaround    | route/provider outage                    |
| SEV-3     | impacto limitado                      | UI/reporting issue                       |

### 12.2 Roles

- incident commander;
- operations lead;
- technical lead;
- security/compliance lead;
- communications;
- scribe;
- executive/legal liaison;
- partner/vendor liaison.

En equipo pequeño roles pueden acumularse, excepto controles que requieran independencia.

### 12.3 Proceso

1. detectar;
2. declarar severidad;
3. detener propagación;
4. preservar evidencia;
5. evaluar fondos/datos/usuarios;
6. comunicar internamente;
7. notificar usuarios/partners/reguladores según obligación;
8. restaurar;
9. reconciliar/compensar;
10. postmortem y acciones.

### 12.4 Comunicación

Plantilla:

- qué pasa;
- desde cuándo;
- quién/capacidad afectada;
- estado de fondos;
- acción segura;
- qué estamos haciendo;
- próxima actualización;
- timestamp/timezone.

No usar “mantenimiento programado” para ocultar incidente.

### 12.5 Postmortem

- impacto;
- timeline;
- detection;
- root/contributing causes;
- qué funcionó/no;
- reconciliación;
- comunicación;
- acciones con owner/date;
- seguimiento de efectividad.

---

## 13. Continuidad y disaster recovery

### 13.1 Servicios críticos

- account authorization;
- intent/state store;
- execution monitoring;
- ledger/reconciliation;
- secrets/keys;
- user communication;
- support/ops access;
- status page;
- escape docs/tools.

### 13.2 BIA

Para cada servicio:

- maximum tolerable downtime;
- RTO;
- RPO;
- dependencies;
- manual fallback;
- data restore;
- owner;
- drill frequency.

No publicar RTO/RPO sin pruebas.

### 13.3 Backups

- encrypted;
- access controlled;
- geographic/logical separation;
- retention;
- restore tests;
- tamper/ransomware considerations;
- backup no incluye secretos que no deban existir.

### 13.4 Key person continuity

- documented access;
- emergency roles;
- no single founder-only secret;
- succession/escrow appropriate;
- runbooks;
- vendor contacts;
- signing governance.

---

## 14. Vendor y partner risk

### 14.1 Due diligence

- entity/licensing;
- financial viability;
- security/audits;
- incident history;
- data/subprocessors;
- SLA/support;
- API/state/reconciliation;
- custody/funds flow;
- geographic coverage;
- concentration;
- termination/export;
- regulatory cooperation.

### 14.2 Critical vendor controls

- owner;
- contract;
- credentials/scopes;
- health monitoring;
- limits;
- reconciliation;
- contingency;
- annual/trigger review;
- incident contacts;
- data map.

### 14.3 Exit plan

- data export;
- credential revocation;
- user/partner communication;
- funds/settlement closure;
- adapter replacement;
- contract/data deletion;
- timeline/cost.

---

## 15. Card operations future

### 15.1 Responsibility stack

- network;
- issuer;
- BIN sponsor/program manager;
- processor;
- KYC/AML provider;
- GatoPago;
- user.

Mostrar en contrato/UX quién hace autorización, settlement, disputes, custody y support.

### 15.2 Daily operation

- card status;
- authorization rates;
- declines;
- balance/funding;
- clearing/settlement;
- FX/fees;
- chargebacks;
- fraud;
- disputes;
- limits;
- processor/issuer incidents.

### 15.3 Consumer controls

- freeze;
- spending controls;
- merchant/online/international/contactless;
- notifications;
- dispute flow;
- replacement;
- credential security;
- card vault separation.

### 15.4 PCI

Minimizar alcance: tokenization/hosted fields/provider SDK; no almacenar PAN/CVV innecesariamente. Obtener evaluación profesional de alcance antes de diseño final.

---

## 16. Privacidad y datos

### 16.1 Data map

- identity/contact;
- authentication/device;
- wallet/account;
- transaction/ledger;
- compliance/KYC;
- support;
- analytics;
- marketing;
- partner metadata;
- logs.

### 16.2 Principles

- purpose limitation;
- minimization;
- least privilege;
- encryption;
- retention;
- consent/legal basis;
- user rights;
- secure deletion;
- vendor controls;
- incident notification.

### 16.3 Onchain privacy

No poner públicamente:

- nombre completo;
- email/teléfono;
- invoice/concept sensible;
- KYC status/details;
- partner internal ID;
- support case.

Usar hashes/references solo si no permiten inferencia o correlación indebida; evaluar linkability.

### 16.4 Analytics

- financial amounts bucketed/minimized when full amount not needed;
- separate production analytics access;
- no session replay on secrets/auth/financial inputs;
- mask PII;
- consent for marketing;
- documented event schema.

---

## 17. Protección del consumidor y conducta

### 17.1 Fee transparency

Antes de confirmar:

- envías;
- recibe;
- fee GatoPago;
- network/proveedor;
- FX/rate;
- total;
- quote expiry;
- estimated time.

### 17.2 Fair outcomes

- no default a opción más rentable si es peor para usuario sin disclosure;
- no ranking de rutas pagado oculto;
- no dark patterns para Crecer/Card;
- cancellation/refund semantics claras;
- complaints y appeals;
- accessible support;
- claims by eligibility.

### 17.3 Suitability/appropriateness

Para DeFi y futuras capacidades complejas:

- comprensión mínima;
- riesgo visible;
- monto de prueba;
- no garantía;
- exit;
- restrictions for vulnerable/ineligible users where required;
- records.

### 17.4 Complaints

- acknowledge;
- classify;
- investigate;
- resolve/explain;
- appeal;
- root-cause trend;
- regulator/ombudsman route where applicable.

---

## 18. Seguridad corporativa

### 18.1 Access

- SSO/MFA/passkeys;
- role-based;
- joiner/mover/leaver;
- quarterly reviews;
- break-glass;
- privileged access logging;
- no shared accounts.

### 18.2 Endpoints

- managed devices for production/admin;
- encryption;
- patching;
- EDR proportional;
- screen lock;
- secrets manager;
- phishing training;
- lost device response.

### 18.3 Secrets/keys

- managed vault/HSM/MPC as appropriate;
- rotation;
- scopes;
- no plaintext/local docs;
- dual control for critical keys;
- audit;
- recovery/destruction.

### 18.4 Change management

- peer review;
- CI checks;
- approvals by risk;
- environment separation;
- deploy log;
- rollback;
- emergency change review after event.

---

## 19. Training y cultura

### Onboarding

- product/funds flow;
- secure handling;
- phishing/social engineering;
- privacy;
- incident escalation;
- claims;
- support red flags;
- conflicts of interest.

### Role-specific

- developers: secure SDLC/contracts;
- support: verification/scams/vulnerable users;
- sales/marketing: claims/regulatory boundaries;
- ops: reconciliation/maker-checker;
- leadership: incident command/risk acceptance.

### Drills

- quarterly tabletop;
- semiannual recovery/vendor drill initially;
- pre-launch game day;
- phishing simulations proportionate;
- post-incident retraining targeted.

---

## 20. Dashboards e indicadores

### Trust

- success/finality;
- pending age;
- trust recovery;
- complaints;
- incident frequency;
- claim accuracy.

### Security

- account takeover;
- recovery anomalies;
- vulnerabilities/SLA;
- privileged changes;
- secret exposures;
- patch/dependency risk.

### Compliance/fraud

- KYC completion/review;
- screening hits;
- cases/aging;
- false positives;
- loss bps;
- suspicious activity escalations.

### Operations

- reconciliation breaks;
- manual interventions;
- support backlog;
- vendor health;
- liquidity buffers;
- SLA/SLO attainment;
- aged settlements.

### Board/founder risk report

- top risks/change;
- incidents/losses;
- control gaps;
- regulatory changes;
- vendor concentration;
- liquidity;
- audit findings;
- launch gates;
- accepted exceptions.

---

## 21. Gates por producto

### Personal mainnet

- legal activity review;
- security audit;
- account/recovery/escape;
- reconciliation;
- monitoring/incident;
- limits;
- support;
- terms/privacy/fees;
- canary.

### Creciendo

- protocol/asset risk;
- APY freshness;
- disclosure/appropriateness;
- withdrawal test;
- incident/depeg plan;
- accounting/tax review.

### Embedded

- KYB;
- responsibility matrix;
- DPA/security;
- certification;
- limits;
- support/escalation;
- reconciliation;
- claims.

### Platform corridor

- legal per jurisdiction;
- provider due diligence;
- liquidity;
- AML/payment transparency;
- route states;
- settlement/reconciliation;
- shadow/pilot;
- SLA/exit.

### Card

- issuer/program/coverage;
- KYC/AML;
- PCI;
- fraud/disputes;
- settlement;
- reserves;
- support;
- economics;
- beta.

---

## 22. Roadmap operativo

### 0–30 días

- risk register;
- capability/regulatory map;
- incident severity/roles;
- contact/runbook inventory;
- data/vendor map;
- claims registry;
- reconciliation baseline;
- support taxonomy;
- recovery/escape review.

### 31–90 días

- policy set mínimo;
- security center/process;
- exception/case management;
- provider scorecards;
- tabletop exercises;
- sandbox fraud/failure tests;
- legal memos para primer piloto;
- operational dashboards.

### 3–6 meses

- audits/pentest;
- mainnet canary controls;
- on-call/support coverage;
- daily reconciliation;
- KYB/partner certification;
- treasury/liquidity policy;
- BCP/restore drill;
- complaints process.

### 6–12 meses

- formal monitoring/case tooling;
- vendor redundancy where justified;
- independent review;
- Card ops build if gate;
- multi-country compliance cells;
- insurance assessment;
- vulnerability program.

### 12–24 meses

- mature risk committee;
- automated reconciliation/control evidence;
- regional regulatory operations;
- SOC 2/ISO readiness only if customers require and controls exist;
- model risk governance;
- enterprise assurance packs;
- recurring external audits.

---

## 23. Fuentes regulatorias y operativas

- [ASFI — Reglamento para Empresas de Tecnología Financiera](https://www.asfi.gob.bo/node/1176): ETF y Entorno Controlado de Pruebas.
- [Gaceta Oficial — Decreto Supremo 5384](https://www.gacetaoficialdebolivia.gob.bo/normas/listadonor/11/page%3A5): marco para constitución y funcionamiento de ETF.
- [BCB — actualización normativa sobre activos virtuales](https://www.bcb.gob.bo/?q=content%2Fel-bcb-en-coordinaci%C3%B3n-con-asfi-y-uif-actualiza-normativa-en-torno-los-activos-virtuales): habilitación de IEP para compra/venta de activos virtuales.
- [BCB — Informe de vigilancia del sistema de pagos 2025](https://www.bcb.gob.bo/webdocs/publicacionesbcb/2026/05/24/IVSP%202025vf.pdf): pagos, ETF, instrumentos integrados con activos virtuales y gestión de riesgos.
- [UIF — normativa externa](https://www.uif.gob.bo/index.php/normativa-externa/): PSAV y sujetos obligados.
- [FATF — Recommendation 16 update](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/update-Recommendation-16-payment-transparency-june-2025.html): transparencia y datos en pagos transfronterizos.
- [FIDO Alliance — Enterprise passkeys](https://fidoalliance.org/passkey-use-case/enterprise/): propiedades y gestión de autenticación con passkeys.
- [Gnosis Pay — Self-custody](https://help.gnosispay.com/hc/en-us/articles/39400375822484-Understanding-Self-Custody-with-Gnosis-Pay): control, módulos de seguridad y relación con KYC/Card.
- [Visa — Stablecoin settlement](https://corporate.visa.com/en/sites/visa-perspectives/newsroom/visa-launches-stablecoin-settlement-in-the-united-states.html): settlement en USDC como señal de infraestructura multi-rail.

---

## 24. Decisión final

GatoPago no debe presentarse como seguro porque usa blockchain, passkeys o autocustodia. Debe demostrar seguridad mediante límites, recuperación, observabilidad, reconciliación, soporte y capacidad de salir.

> **La confianza no es que nada falle. Es que GatoPago sepa qué ocurrió, proteja lo que todavía puede proteger, diga la verdad y complete la reparación.**
