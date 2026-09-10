# GatoPago 2026–2030: índice maestro de estrategia

> **Última actualización:** 23 de agosto de 2026.  
> **Función:** punto de entrada, jerarquía de verdad, matriz de cobertura y roadmap integrado.  
> **Estado:** sistema de planes para validación; no implica despliegue, licencia, Card, mainnet ni cobertura comercial.

---

## 0. La respuesta corta

Sí: el plan B2C completo ya existe como documento propio, y ahora forma parte de un sistema que cubre también B2B2C, B2B y las funciones transversales necesarias para ejecutar.

El documento integral original explica **la tesis y cómo encajan las tres superficies**. No debe usarse como sustituto de los planes operativos.

### Leer primero

1. [Estrategia integral B2C, B2B2C y B2B](./gatopago-estrategia-integral-b2c-b2b2c-b2b-2026.md) — columna vertebral.
2. [Plan maestro B2C](./gatopago-plan-maestro-b2c-2026.md) — producto consumer completo.
3. [Playbook B2B2C / Embedded](./gatopago-playbook-b2b2c-embedded-2026.md) — distribución mediante partners.
4. [Estrategia B2B / Platform](./gatopago-estrategia-b2b-pagos-transfronterizos-2026.md) — corredores, routing y empresas.

### Después, según responsabilidad

- [Producto y tecnología](./gatopago-plan-producto-tecnologia-2026-2030.md)
- [Marca y experiencia](./gatopago-plan-marca-experiencia-2026.md)
- [Crecimiento y distribución](./gatopago-plan-crecimiento-distribucion-2026-2028.md)
- [Operaciones, riesgo y confianza](./gatopago-plan-operaciones-riesgo-confianza-2026.md)
- [Métricas y experimentos](./gatopago-sistema-metricas-experimentos-2026.md)
- [Empresa, finanzas y capital](./gatopago-plan-empresa-finanzas-capital-2026-2030.md)
- [Marketing 2026](./gatopago-plan-marketing-2026.md)

---

## 1. La compañía en una página

### Propósito

Hacer que el dinero digital global se sienta utilizable, propio y cercano para personas y organizaciones de América Latina.

### Promesa

> **Tus dólares ya saben moverse.**

### Filosofía

> **Tu dinero sigue siendo tuyo. GatoPago se ocupa del camino.**

### Arquitectura

```text
GatoPago Personal
relación + hábito + utilidad
          │
          ▼
GatoPago Embedded
distribución + flujo recurrente
          │
          ▼
GatoPago Platform
rutas + control + monetización
          │
          └──────────────→ mejora Personal
```

### Cuña inicial

Personas y equipos pequeños de LATAM que ya reciben USDC o usan wallets/exchanges y quieren cobrar, mantener, hacer crecer y utilizar ese dinero con una experiencia mucho más clara.

### Expansión

Personas que quieren dólares digitales y pagos globales sin aprender Web3; partners que desean entregar una cuenta útil; empresas que necesitan agregar rutas sin reconstruir su core.

### Diferencia

GatoPago combina:

- cuenta controlada por el usuario;
- intenciones financieras legibles;
- identidad cobrable, links, QR y receipts;
- estados y trazabilidad consistentes;
- rutas debajo de una experiencia humana;
- reglas limitadas y revocables;
- Meli como guía y lenguaje vivo;
- distribución por partners;
- inteligencia de corredores acumulativa.

### Enemigo

El laberinto: aplicaciones, redes, proveedores, estados y soporte desconectados.

---

## 2. Qué existe y qué es visión

### Implementado/documentado en la Alpha

- smart account ERC-4337;
- passkeys múltiples;
- batch execution y gas patrocinado;
- guardian recovery con espera documentada;
- pagos, links, QR, usernames, contactos, receipts y actividad;
- swap;
- USDC en Aave V3;
- fondeo/recepción desde wallets, exchange guides y CCTP;
- payment intents, eventos y webhooks firmados;
- dashboard developer/sandbox;
- identidad visual GatoPago/Meli aplicada en landing y parcialmente en app.

### Entorno afirmable

> **Alpha en Arbitrum Sepolia con fondos de prueba.**

No afirmar mainnet/Arbitrum One live mientras contratos, auditoría, operación y pruebas no lo demuestren.

### En piloto/propuesta

- hosted checkout/payout;
- Embedded commercial product;
- tenant/RBAC/certification;
- routing adapters y RouteScore;
- reconciliación madura;
- bolsillos y reglas programables;
- local fiat rails;
- Card;
- Platform production;
- multi-country expansion;
- automatizaciones guiadas;
- treasury automation.

### Prohibido confundir

- mockup con disponibilidad;
- testnet con producción;
- waitlist con demanda elegible;
- LOI con ingreso;
- partner conversation con contrato;
- “self-custody” con salida realmente probada;
- transacción enviada con pago entregado;
- APY actual con retorno garantizado;
- habilitación general de activos virtuales con licencia de GatoPago.

---

## 3. Jerarquía de fuentes de verdad

Cuando dos documentos se contradicen, aplicar este orden:

### 1. Código, configuración y despliegue verificado

Define qué existe técnicamente y en qué entorno.

### 2. Contratos, dictámenes y documentos aprobados

Define qué puede ofrecerse, dónde y bajo qué responsabilidades.

### 3. Plan técnico actual de la app

- [Visión y plan de mejora](./gatopago-vision-plan-mejora-2026.md)
- [Architecture](https://github.com/danelerr/parmelia-links/blob/main/ARCHITECTURE.md)
- [API Design](https://github.com/danelerr/parmelia-links/blob/main/API_DESIGN.md)

### 4. Este sistema estratégico

Define intención, prioridad, gates y roadmap.

### 5. Narrativa y marketing

- [Narrativa completa](./gatopago_nueva_narrativa_contexto_completo_2026-08-18.txt)
- [Plan de marketing](./gatopago-plan-marketing-2026.md)

La narrativa nunca eleva una capacidad por encima de la verdad técnica/legal.

---

## 4. Mapa documental

| Documento             | Pregunta que responde                              | Owner sugerido         |
| --------------------- | -------------------------------------------------- | ---------------------- |
| Estrategia integral   | ¿Qué compañía estamos construyendo?                | Founder/CEO            |
| Plan B2C              | ¿Cómo gana y retiene Personal?                     | Consumer Product       |
| Playbook Embedded     | ¿Cómo distribuimos mediante partners?              | Partner Product        |
| Estrategia B2B        | ¿Cómo resolvemos corredores/empresas?              | Platform/Founder Sales |
| Producto y tecnología | ¿Cómo funciona como un solo core?                  | CTO/Product            |
| Marca y experiencia   | ¿Cómo se ve, habla y comporta?                     | Brand/Design/Product   |
| Crecimiento           | ¿Cómo llegan y vuelven usuarios/partners?          | Growth/Partnerships    |
| Operaciones/riesgo    | ¿Cómo operamos dinero con confianza?               | Risk/Ops/Security      |
| Métricas              | ¿Cómo sabemos y decidimos?                         | Product/Data           |
| Empresa/finanzas      | ¿Cómo financiamos y organizamos la ejecución?      | CEO/Finance            |
| Marketing             | ¿Qué campaña, contenido y canales usamos ya?       | Marketing/Founder      |
| Rebrand maestro       | ¿Cuáles son los tokens/componentes/motion exactos? | Design/Frontend        |

---

## 5. Matriz de cobertura

Leyenda: **Principal** = fuente operativa; **Apoya** = contexto; **Gate** = control obligatorio.

| Tema                            | Documento principal          | Complementos        |
| ------------------------------- | ---------------------------- | ------------------- |
| Propósito, visión, portafolio   | Estrategia integral          | Marca, Empresa      |
| Segmentos/personas/JTBD         | Plan B2C                     | Growth, Integral    |
| Journey consumer completo       | Plan B2C                     | Marca, Tech, Ops    |
| Home/navegación/“Web3”          | Plan B2C                     | Rebrand maestro     |
| Card                            | Plan B2C                     | Ops, Empresa, Tech  |
| Aave/Crecer                     | Plan B2C                     | Ops, Tech           |
| Bolsillos/reglas/Autopilot      | Plan B2C                     | Tech, Ops           |
| Lifecycle/CRM                   | Plan B2C                     | Growth, Métricas    |
| Monetización B2C                | Plan B2C                     | Empresa, Métricas   |
| Partner ICP/casos               | Embedded                     | Growth              |
| Hosted/co-brand/headless        | Embedded                     | Marca, Tech         |
| Custodia/consentimiento partner | Embedded                     | Ops, Tech           |
| API/webhooks/sandbox            | Embedded                     | API Design, Tech    |
| Partner pricing/sales/pilot     | Embedded                     | Empresa, Growth     |
| Corredores/RouteScore           | B2B                          | Tech, Ops, Métricas |
| Security/compliance             | Ops                          | Tech, B2C, Embedded |
| Bolivia/regulación              | Ops                          | Empresa, B2C        |
| Ledger/reconciliación           | Tech                         | Ops, Métricas       |
| SRE/performance/testing         | Tech                         | Métricas, Marca     |
| IA/autoridad                    | Tech                         | B2C, Ops            |
| Identidad/Meli/motion           | Marca                        | Rebrand maestro     |
| Accesibilidad/QR/skeleton       | Marca                        | B2C, Tech           |
| Adquisición/referrals/content   | Growth                       | Marketing, B2C      |
| Partner-led/founder-led sales   | Growth                       | Embedded, B2B       |
| Country launch                  | Growth                       | Ops, Empresa        |
| North stars/dictionary          | Métricas                     | todos               |
| Experiment governance           | Métricas                     | Growth, B2C         |
| Pricing/unit economics          | Empresa                      | B2C, Embedded, B2B  |
| Capital/hiring/governance       | Empresa                      | Ops, Tech           |
| Claims/status real              | Índice + documentos técnicos | Ops, Marca          |

No hay un hueco estratégico conocido de primer orden sin owner documental. Los detalles legales, financieros y técnicos deben evolucionar con evidencia y revisión profesional; “completo” significa que el área y su proceso están definidos, no que el futuro ya esté resuelto.

---

## 6. Decisiones vigentes

| Decisión           | Estado                                                    |
| ------------------ | --------------------------------------------------------- |
| Nombre de trabajo  | GatoPago, sujeto a revisión marcaria/legal                |
| Mascota            | Meli                                                      |
| Promesa            | Tus dólares ya saben moverse                              |
| Filosofía          | Tu dinero sigue siendo tuyo. GatoPago se ocupa del camino |
| Producto centro    | GatoPago Personal                                         |
| Cuña               | LATAM crypto-adjacent que cobra/usa USDC                  |
| Unidad principal   | USDC-first, no USDC-only                                  |
| Home               | Disponible / Creciendo / Bolsillos / Otros activos        |
| “Web3”             | No es sector principal de Home                            |
| Card               | Hipótesis consumer crítica; acceso anticipado hasta gate  |
| DeFi               | Aave primero; no agregar protocolos sin evidencia         |
| Distribución       | Embedded mediante flows reales                            |
| B2B                | Orquestación/control de corredores, no un exchange        |
| Tecnología         | Intent-first, user-controlled, reconciliable              |
| IA                 | Explica/sugiere; autoridad en políticas verificables      |
| Marca              | Ember & Ink, Recursive, pixel cálido/competente           |
| Estado producto    | Alpha Arbitrum Sepolia                                    |
| Portafolio inicial | 60% Personal, 25% Card/company/rails, 15% API/partners    |

### Decisiones abiertas prioritarias

1. Resultado de búsqueda/registro de marca GatoPago.
2. Primer país/cohorte para dinero real.
3. Arquitectura y partner de Card.
4. Red/configuración exacta de mainnet y gobierno de upgrades.
5. Modelo legal/entidad/licencias/partners.
6. Primer design partner y flujo.
7. Primera ruta local/transfronteriza.
8. Pricing basado en costes reales.
9. Baselines de activación, retención, success y soporte.
10. Responsable y presupuesto de seguridad/operaciones.

---

## 7. Prioridad de portafolio

### Personal — 60%

- coherencia Alpha;
- flujo cobrar/recibir → segunda acción;
- seguridad/recuperación;
- Home y actividad;
- receipts/QR;
- Aave/Crecer;
- research y retention.

### Card, company y rails — 25%

- Card discovery/program economics;
- legal/company foundations;
- mainnet/security readiness;
- primer rail/corridor;
- operations.

### API y partners — 15%

- payment intents/webhooks;
- hosted sandbox;
- design partner;
- certification blueprint;
- no custom platform masiva.

### Regla de rebalanceo

Revisar trimestralmente. Una oportunidad solo mueve >10 puntos de capacidad si trae evidencia, owner, gate, economía y reuse. Un contrato potencial no basta.

---

## 8. Roadmap integrado

Las ventanas indican secuencia, no fecha de disponibilidad pública.

### Horizonte 0 — 0 a 30 días: una sola verdad

#### Personal y marca

- declarar Alpha/testnet consistentemente;
- retirar “Web3” de Home;
- un único Escanear;
- arreglar QR/descargas;
- skeletons y motion suaves;
- PWA icon/name/manifest/screenshots;
- 404 GatoPago;
- focus visible accesible;
- limpiar residuos Parmelia;
- consolidar assets Meli.

#### Core

- inventario capacidades/contratos/config;
- state/event schema;
- analytics environments;
- trace baseline;
- threat models;
- claims registry.

#### Negocio

- 12–20 entrevistas;
- score de países/partners;
- 5–8 conversaciones Embedded/B2B;
- escoger un design partner;
- risk register;
- budget/runway model;
- marca/legal review.

**Gate H0:** cualquier persona/equipo puede distinguir qué existe, probar el flujo actual y obtener estados/receipts coherentes.

### Horizonte 1 — 31 a 90 días: ciclo útil y sandbox serio

#### Personal

- onboarding por intención;
- seguridad/recovery guiado;
- Home Disponible/Creciendo/Otros activos;
- contactos/receipts;
- Aave como única estrategia;
- soporte contextual;
- cohortes y activation.

#### Core/ops

- state machine única;
- idempotencia/webhooks;
- reconciliation V1;
- operations console mínima;
- SLI baselines;
- incident/tabletop;
- data/metric contracts.

#### Embedded/growth

- hosted sandbox flow;
- failure scenarios;
- partner blueprint/RACI;
- receipt/referral loops;
- founder/community cadence;
- Card demand research.

**Gate H1:** cohorte asistida completa y repite un ciclo; partner supera certificación sandbox sin estados desconocidos.

### Horizonte 2 — 3 a 6 meses: decisión de dinero real

#### Security/legal

- audits/pentest;
- legal/regulatory memo;
- limits/policies;
- upgrade/key governance;
- incident/on-call;
- reconciliation and exit drills.

#### Product

- mainnet canary only if all gates;
- bolsillos V1;
- one local/cross-border route only if viable;
- first Embedded pilot with limits;
- lifecycle and support.

#### Business

- unit economics baseline;
- partner pricing;
- hiring/funding go/no-go;
- first honest case study;
- contribution/burn review.

**Gate H2:** seguridad, regulación, operación, reconciliación y economía permiten un piloto limitado; si no, se permanece en sandbox/testnet.

### Horizonte 3 — 6 a 12 meses: repetibilidad

- retention M1/M3;
- simple rules and recurring preparation;
- Card beta only if its gate;
- second partner of same archetype;
- second route only if first stable;
- tenant/RBAC/dashboard;
- shadow RouteScore;
- partner/community growth loop;
- SLO/error budgets;
- dedicated ops/risk ownership.

**Gate H3:** al menos un canal y un partner/corridor repiten valor con contribución plausible, sin subsidio indefinido.

### Horizonte 4 — 12 a 24 meses: cuenta y plataforma programables

- automatizaciones guiadas limitadas;
- bolsillos compartidos/roles;
- guarded auto-routing;
- components/SDK;
- multi-route reconciliation;
- Card/rails regionales por país;
- treasury/policy tools;
- mature data/risk/vendor governance;
- Plus/enterprise modules if paid value proven.

**Gate H4:** reglas son auditables/revocables, plataforma se integra repetidamente y la expansión no rompe confiabilidad.

### Horizonte 5 — 2028 a 2030: red de dinero con intención

- cuenta portable entre empleadores, marketplaces y apps;
- pasaporte de cobro con privacidad;
- routes selected by user/company policy;
- multi-rail settlement;
- family/team circles;
- open adapter ecosystem certified;
- RouteScore/corridor intelligence;
- receipts and permissions interoperables;
- user can leave any interface without losing account/control.

**Gate H5:** cada expansión mantiene consentimiento, transparencia, viabilidad legal y salida.

---

## 9. Plan de los próximos 14 días

### Producto/app

1. Auditar implementación contra el plan B2C.
2. Resolver P0 visuales/funcionales ya observados.
3. Instrumentar journey básico.
4. Definir prueba moderada de comprensión.
5. Preparar recovery/receipt demos.

### Usuario

1. Reclutar 12 perfiles de cuña.
2. Ejecutar tareas, no solo entrevistas.
3. Clasificar bloqueos por frecuencia/severidad.
4. Elegir un job primario.
5. Publicar aprendizaje, no métricas vanity.

### Partner

1. Convertir la reunión con fintech en discovery de corredor.
2. Mapear flujo actual de PagoFácil u otro design partner.
3. Cuantificar tiempo, fallos y trabajo manual.
4. Proponer sandbox/shadow de un solo flujo.
5. No prometer integración completa.

### Empresa

1. Modelo de caja/runway real.
2. Legal/naming check.
3. Risk register inicial.
4. Identificar owners externos de seguridad/legal.
5. Definir qué no se construirá este trimestre.

---

## 10. Foros y cadencia

| Foro                 | Frecuencia | Resultado                  |
| -------------------- | ---------- | -------------------------- |
| Product truth review | semanal    | claims/código/UI alineados |
| User evidence        | semanal    | decisiones de journey      |
| Reliability/ops      | semanal    | fallos, owners, fixes      |
| Partner pipeline     | semanal    | next action/qualification  |
| Metrics/experiments  | semanal    | ship/stop/iterate          |
| Financial/risk       | mensual    | runway, exposure, gates    |
| Portfolio            | trimestral | allocation y poda          |

### Regla de reunión

Cada foro termina con:

- decisión;
- owner;
- fecha;
- evidencia;
- métrica/gate;
- qué se deja de hacer.

---

## 11. Definition of ready

Una iniciativa entra a construcción cuando tiene:

- usuario/partner y job;
- evidencia;
- outcome/metric;
- scope y no-scope;
- design/journey;
- data/analytics;
- security/risk/compliance review proporcional;
- operational owner;
- dependencies;
- kill/rollback;
- claims.

## 12. Definition of done

Una capacidad financiera está terminada cuando tiene:

- todos los estados;
- idempotencia;
- autorización;
- límites;
- observabilidad;
- ledger/reconciliation;
- soporte/runbook;
- seguridad y privacidad;
- accesibilidad;
- copy/fees/risks;
- analytics;
- receipt/export;
- fallback/exit;
- documentación;
- launch gate aprobado.

---

## 13. Preguntas que validan la visión

### Usuario

- ¿Qué parte de cobrar hoy es más dolorosa?
- ¿Qué hace inmediatamente después de recibir?
- ¿Qué significa “control” para él?
- ¿Pudo explicar el estado sin ayuda?
- ¿Usaría GatoPago otra vez sin incentivo?

### Partner

- ¿Qué flujo no puede integrar?
- ¿Qué cambia en su core?
- ¿Dónde pierde tiempo/dinero?
- ¿Qué estado y evidencia necesita?
- ¿Pagaría por eliminar ese trabajo?

### Plataforma

- ¿La capacidad se reutiliza?
- ¿La ruta puede reemplazarse?
- ¿Se concilia?
- ¿Se puede pausar/salir?
- ¿Mejora con más volumen sin crear lock-in abusivo?

### Empresa

- ¿Qué evidencia desbloquea el próximo gasto?
- ¿Qué riesgo puede destruir confianza?
- ¿Qué contratación elimina un bottleneck real?
- ¿Qué partner concentra demasiado?
- ¿Qué no debemos construir?

---

## 14. Checklist de comunicación pública

Antes de publicar:

- [ ] nombre/producto correcto;
- [ ] entorno visible;
- [ ] capability actually verified;
- [ ] país/eligibilidad;
- [ ] Card marked future if not live;
- [ ] APY/risk variable;
- [ ] fees/costs not hidden;
- [ ] partner status accurate;
- [ ] no “regulated” without basis;
- [ ] security claims provable;
- [ ] visual assets current;
- [ ] CTA destination matches promise;
- [ ] English/Spanish consistent;
- [ ] accessibility/performance checked.

---

## 15. Auditoría de completitud

### B2C

- [x] mercado y cuña;
- [x] personas/JTBD;
- [x] posicionamiento/diferencia;
- [x] producto y journeys;
- [x] lifecycle/CRM;
- [x] seguridad/recovery/privacy;
- [x] Aave/Crecer;
- [x] Card;
- [x] bolsillos/reglas/visión;
- [x] monetización/unit economics;
- [x] growth/referrals/content;
- [x] support/operations;
- [x] accessibility/performance;
- [x] metrics/experiments;
- [x] roadmap/gates/risks.

### B2B2C

- [x] ICP/cases;
- [x] hosted/co-brand/components/headless;
- [x] account/custody/consent;
- [x] user journey;
- [x] API/dashboard;
- [x] responsibility/compliance;
- [x] security/certification;
- [x] brand/Meli;
- [x] pricing/sales;
- [x] implementation/support;
- [x] metrics/roadmap.

### B2B

- [x] problem/category;
- [x] Connect/Intent/Route/Guard/Ledger/Trace;
- [x] RouteScore;
- [x] speed/reliability;
- [x] security/compliance;
- [x] ICP/PagoFácil;
- [x] business model;
- [x] pilot/shadow mode;
- [x] pitch/claims.

### Transversal

- [x] product/technology;
- [x] brand/experience;
- [x] growth/distribution;
- [x] operations/risk/trust;
- [x] metrics/experiments;
- [x] company/finance/capital;
- [x] integrated roadmap;
- [x] source-of-truth hierarchy.

### Lo que nunca puede “completarse” en papel

- validación con usuarios;
- auditoría técnica;
- licencia/autorización;
- contratos y coverage;
- baseline de métricas;
- economics reales;
- product-market fit;
- trust earned over time.

Los planes están completos como sistema de trabajo; la evidencia debe llenarlos y corregirlos continuamente.

---

## 16. Decisión final

GatoPago no es una estrategia B2B con una interfaz consumer de adorno, ni una app consumer con una API oportunista. Es una sola compañía construida desde la misma intención financiera y expresada en tres superficies.

> **Personal crea el vínculo. Embedded multiplica el alcance. Platform construye los caminos.**

El orden de ejecución permanece:

1. verdad y seguridad;
2. ciclo útil consumer;
3. distribución con un partner real;
4. operación/reconciliación;
5. monetización repetible;
6. automatización y expansión bajo gates.
