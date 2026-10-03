# GatoPago: estrategia integral B2C, B2B2C y B2B

**Fecha:** 19 de agosto de 2026  
**Estado:** tesis estratégica para validación  
**Índice de todo el sistema:** [GatoPago 2026–2030: índice maestro](./gatopago-indice-maestro-estrategia-2026.md)  
**Planes operativos:** [B2C completo](./gatopago-plan-maestro-b2c-2026.md) · [B2B2C / Embedded](./gatopago-playbook-b2b2c-embedded-2026.md) · [B2B / pagos transfronterizos](./gatopago-estrategia-b2b-pagos-transfronterizos-2026.md)  
**Promesa maestra:** **Tus dólares ya saben moverse.**

> GatoPago no es un backend empresarial con una app bonita encima. Es una experiencia de dinero digital para personas que puede distribuirse mediante otros productos y sostenerse sobre infraestructura programable.

> **Alcance de este documento:** esta es la columna vertebral ejecutiva. El detalle exhaustivo de producto, journeys, lifecycle, monetización, seguridad, métricas, experimentos y roadmap B2C vive en el [plan maestro B2C](./gatopago-plan-maestro-b2c-2026.md); no debe inferirse que las 16 secciones de este resumen lo sustituyen.

## 1. La corrección fundamental

La estrategia B2B de corredores internacionales es valiosa, pero representa solo una de las tres superficies de GatoPago.

La tesis completa es:

> **GatoPago convierte dólares digitales en una experiencia cotidiana para personas, una capacidad embebible para plataformas y una infraestructura programable para empresas.**

Por tanto:

- **B2C construye la relación, la marca y el hábito.**
- **B2B2C distribuye esa experiencia mediante terceros.**
- **B2B monetiza control, integración y operación.**

La interfaz, Meli, las animaciones, los comprobantes y el lenguaje humano no son decoración. Son el producto consumer y el activo que hace que una API deje de ser una commodity.

## 2. Una sola compañía, tres puertas de entrada

```text
                         GATOPAGO CORE
┌─────────────────────────────────────────────────────────────┐
│ Cuenta · identidad · pagos · rutas · políticas · ledger    │
│ passkeys · payment intents · webhooks · conciliación        │
└─────────────────────────────────────────────────────────────┘
              ↓                    ↓                    ↓
     GatoPago Personal      GatoPago Embedded     GatoPago Platform
            B2C                  B2B2C                  B2B
              ↓                    ↓                    ↓
       Persona final        Usuario del partner    Fintech/empresa
```

No son tres startups separadas. Son tres formas de entrar al mismo sistema.

| Superficie | Cliente | Usuario final | Qué compra | Centro de la experiencia |
|---|---|---|---|---|
| **Personal** | Persona | La misma persona | Una cuenta útil y controlable | La app GatoPago |
| **Embedded** | Plataforma o fintech | Cliente del partner | Una experiencia financiera lista para integrar | Componentes GatoPago dentro del partner |
| **Platform** | Fintech o empresa | Equipo operativo y sus clientes | Infraestructura, rutas y control | API y dashboard |

## 3. Propósito de marca

> **Hacer que el dinero digital pueda llegar, moverse, crecer y usarse sin exigir que las personas o empresas entiendan toda la infraestructura que hay debajo.**

GatoPago existe para traducir complejidad financiera en acciones comprensibles, sin ocultar costos, riesgos ni control.

### Valores

1. **Control:** el dinero y las reglas pertenecen al usuario o a la empresa.
2. **Claridad:** se explica qué pasará, cuánto cuesta y cuándo termina.
3. **Movimiento útil:** la tecnología sirve para completar una intención real.
4. **Cercanía:** el producto habla como una persona, no como un protocolo.
5. **Progreso seguro:** automatización y nuevas capacidades aparecen por etapas.

## 4. La estrategia B2C: GatoPago Personal

### 4.1 Qué es

> **Una cuenta programable para recibir, usar y hacer crecer dólares digitales sin entregar el control.**

Personal es el centro emocional de GatoPago. Aquí viven plenamente la identidad visual, Meli, el movimiento, los estados humanos del dinero y la experiencia que ya se diseñó.

La interfaz bonita existe para que alguien que no quiere aprender sobre redes, gas, bridges o protocolos pueda entender:

```text
El dinero llega
      ↓
queda Disponible
      ↓
puedo usarlo o mover una parte a Creciendo
      ↓
puedo pagar, enviar, retirar o, en el futuro, gastar con Card
```

### 4.2 Cuña inicial

Personas y equipos pequeños de LATAM que ya reciben o utilizan USDC:

- freelancers;
- creators;
- developers;
- contributors;
- founders;
- agencias digitales;
- equipos remotos;
- personas que reciben grants, bounties o premios;
- pequeños negocios cripto.

Estas personas ya entienden por qué quieren dólares digitales. GatoPago resuelve lo que ocurre después de recibirlos.

### 4.3 Ambición

La ambición B2C es llegar a personas que quieren:

- recibir dinero internacional;
- conservar valor en dólares digitales;
- pagar y enviar;
- separar dinero disponible de dinero que puede crecer;
- utilizar una tarjeta cuando exista;
- acceder progresivamente a finanzas onchain;
- evitar convertirse en expertas en Web3.

La cuña inicial no define el techo del producto.

### 4.4 Trabajos que completa

- “Quiero cobrar sin explicar una dirección y una red.”
- “Quiero saber cuánto tengo realmente disponible.”
- “Quiero pagar sin comprar gas.”
- “Quiero separar lo que usaré de lo que puede crecer.”
- “Quiero ver costos y riesgos antes de confirmar.”
- “Quiero entrar desde el teléfono sin guardar una seed phrase.”
- “Quiero conservar una salida si GatoPago desaparece.”

### 4.5 Producto consumer

La experiencia se organiza alrededor de intenciones:

| Estado o acción | Significado humano |
|---|---|
| **Disponible** | Dinero listo para pagar, enviar o retirar |
| **Creciendo** | Parte elegida para una estrategia explicada, inicialmente Aave USDC |
| **Recibir** | Link, QR, username, wallet, exchange o ruta cross-chain |
| **Mover** | Pagar, enviar, cambiar o retirar |
| **Actividad** | Historia, comprobantes y contexto |
| **Seguridad** | Passkeys, recuperación, dispositivos y control |
| **Card** | Conexión futura con el gasto cotidiano, todavía sujeta a validación |

### 4.6 Retención B2C

El loop no es “abrir la wallet para mirar el precio”. Es:

```text
Recibir → decidir → usar o crecer → volver a recibir
```

North star:

> **Cuentas financiadas que completan recibir → decidir → usar o crecer y vuelven a hacerlo dentro de 30 días.**

### 4.7 Distribución B2C

- comunidades de freelancers y contributors;
- pagos de grants y hackathons;
- links y QR que convierten cada cobro en distribución;
- comprobantes compartibles;
- referidos basados en una utilidad real;
- casos contados por Daniel;
- partners que pagan a comunidades o equipos;
- Card como acelerador futuro, no como promesa presente.

### 4.8 Monetización B2C potencial

Debe ser transparente y aparecer solo cuando exista el servicio correspondiente:

- fee de swap o ruta;
- ingreso o revenue share de Card;
- fee por on-ramp u off-ramp mediante partners;
- plan premium para límites, automatizaciones o soporte;
- fee explícito en servicios adicionales;
- acuerdos de distribución que no reduzcan el control del usuario.

No se debe ocultar margen en una tasa presentada como gratuita.

## 5. La estrategia B2B2C: GatoPago Embedded

### 5.1 Qué es

> **La experiencia GatoPago integrada dentro de fintechs, marketplaces, comunidades y plataformas.**

B2B2C significa que una empresa contrata o integra GatoPago, pero la utilidad llega a sus usuarios finales.

Aquí la interfaz bonita se convierte en una ventaja comercial: GatoPago no entrega únicamente endpoints. Puede entregar componentes, flujos alojados y una experiencia probada.

### 5.2 Propuesta de valor

> **Integra una cuenta de dólares digitales que tus usuarios sí quieran usar.**

Alternativa más directa:

> **La experiencia GatoPago, dentro de tu producto.**

El partner evita construir desde cero:

- onboarding de cuenta;
- passkeys;
- smart accounts;
- recepción por link o QR;
- checkout;
- historial y comprobantes;
- swaps o rutas;
- estados de pago;
- notificaciones;
- recuperación;
- diseño mobile y PWA;
- explicaciones de riesgos;
- integración futura con Card o rails locales.

### 5.3 Partners iniciales posibles

- fintechs que quieren añadir cuentas en dólares digitales;
- plataformas de payroll o contractor payments;
- marketplaces que pagan a vendedores;
- comunidades que distribuyen grants;
- neobancos que quieren una experiencia onchain sin construirla;
- apps de remesas;
- plataformas de comercio que quieren stablecoin checkout;
- PSP como PagoFácil que desean ofrecer nuevos métodos a comercios o pagadores.

### 5.4 Casos concretos

#### Payroll o equipos remotos

La empresa paga mediante API. Cada colaborador recibe en una cuenta GatoPago y puede mantener, enviar, cambiar o hacer crecer una parte.

#### Marketplace

El marketplace liquida ventas a sus vendedores. GatoPago proporciona subcuentas, comprobantes y, cuando exista, retiro local.

#### Grants y comunidades

Una organización distribuye fondos y los receptores reciben una experiencia clara para administrarlos, no solo una transacción a una dirección.

#### Fintech o PSP

El partner ofrece stablecoin checkout, cuentas o pagos internacionales con componentes alojados por GatoPago y conserva su relación con el cliente.

### 5.5 Formas de integración

La escalera recomendada es:

1. **Hosted:** links, checkout y onboarding alojados por GatoPago.
2. **Co-branded:** experiencia del partner con “Powered by GatoPago”.
3. **Components:** componentes web o SDK integrables.
4. **Headless:** API completa para partners con capacidad de construir su propia UI.

No conviene empezar creando un SDK complejo para cada plataforma. El checkout alojado y los componentes web permiten validar antes.

### 5.6 Identidad dentro de Embedded

La identidad puede tener tres niveles:

| Nivel | Uso de marca | Uso recomendado |
|---|---|---|
| **GatoPago completo** | Logo, Meli, paleta y voz | Comunidades y partners que quieren la experiencia completa |
| **Co-branded** | Marca del partner + “Powered by GatoPago” | Fintechs y marketplaces |
| **Infrastructure mode** | Identidad mínima y señales de seguridad GatoPago | Partners enterprise con UI propia |

Meli no tiene que aparecer igual en todos los partners. La confianza, seguridad y atribución sí deben permanecer.

### 5.7 Modelo comercial B2B2C

- fee de integración;
- suscripción mensual por partner;
- precio por cuenta activa;
- fee por pago, payout o conversión;
- revenue share de productos opcionales;
- precio por componentes o white-label;
- SLA y soporte premium.

North star:

> **Usuarios de partners que reciben fondos, completan una acción útil y vuelven a utilizar la experiencia.**

## 6. La estrategia B2B: GatoPago Platform

### 6.1 Qué es

> **La capa de control y orquestación que permite a fintechs latinoamericanas abrir corredores internacionales sin reconstruir su plataforma.**

El cliente aquí no compra principalmente la interfaz consumer. Compra:

- conectores;
- payment intents;
- rutas;
- políticas;
- aprobaciones;
- ledger;
- conciliación;
- observabilidad;
- API y webhooks;
- menor tiempo para integrar países y proveedores.

La profundización de este pilar está documentada en [GatoPago: estrategia B2B y plataforma de pagos transfronterizos](./gatopago-estrategia-b2b-pagos-transfronterizos-2026.md).

### 6.2 Papel dentro de la compañía

B2B aporta:

- contratos de mayor valor;
- volumen;
- relaciones con proveedores;
- nuevos corredores;
- aprendizaje de operación;
- datos de costo, tiempo y confiabilidad;
- una posible fuente principal de ingresos.

Pero no debe convertir toda la marca en software frío de back office.

## 7. El flywheel de GatoPago

Las tres estrategias se fortalecen entre sí:

```text
Una experiencia Personal querida y comprensible
                      ↓
prueba que la abstracción funciona para personas reales
                      ↓
los partners integran esa experiencia mediante Embedded
                      ↓
crecen usuarios, volumen y casos de uso
                      ↓
Platform añade mejores proveedores, rutas y controles
                      ↓
bajan costos, mejora la velocidad y aumenta la cobertura
                      ↓
Personal y Embedded se vuelven más útiles
```

Este flywheel combina tres activos:

1. **Marca y UX:** hacen que las personas quieran usar el producto.
2. **Distribución mediante partners:** lleva GatoPago a usuarios que no llegarían directamente.
3. **Infraestructura y datos:** mejoran rutas, operación y economía.

La suma es más defendible que una wallet aislada o una API genérica.

## 8. Por qué la interfaz es estratégica

La interfaz que se construyó cumple seis funciones:

1. **Producto B2C:** es donde la persona administra su dinero.
2. **Demostración:** prueba ante partners que GatoPago ya sabe traducir infraestructura compleja.
3. **Referencia de integración:** define cómo deben sentirse los componentes Embedded.
4. **Distribución:** links, QR y comprobantes llevan la marca a otras personas.
5. **Confianza:** Meli, la voz y la claridad reducen la sensación de utilizar infraestructura desconocida.
6. **Laboratorio:** permite validar comportamientos antes de convertirlos en APIs o automatizaciones.

Una API puede copiarse. Una experiencia querida, una red de partners, datos de rutas y una operación confiable son mucho más difíciles de copiar juntos.

## 9. Papel de Meli por superficie

### Personal

Meli tiene máxima presencia:

- onboarding;
- cargas;
- recepción;
- pagos;
- comprobantes;
- educación;
- estados vacíos;
- celebraciones;
- pequeños momentos de juego sin premiar riesgo financiero.

### Embedded

Meli es configurable:

- completa en integraciones GatoPago-first;
- co-branded para partners;
- reducida a momentos de ayuda o éxito;
- nunca reemplaza información obligatoria del partner.

### Platform

Meli es más contenida:

- onboarding de developers;
- sandbox;
- estado saludable de una ruta;
- empty states;
- confirmaciones no críticas.

No debe aparecer como único lenguaje en incidentes, riesgos, aprobaciones o conciliación.

## 10. Casa de mensajes por audiencia

| Audiencia | Mensaje principal | Prueba que necesita |
|---|---|---|
| Persona | **Tus dólares ya saben moverse.** | Recibir, pagar, cambiar, Creciendo y control |
| Usuario nuevo | **Una cuenta para usar dólares digitales sin aprender Web3.** | Onboarding y primera operación simples |
| Partner B2B2C | **La experiencia GatoPago, dentro de tu producto.** | Checkout, componentes, API y activación |
| Developer | **Una API y una experiencia completa.** | Sandbox, docs, webhooks e idempotencia |
| Fintech B2B | **Abre nuevas rutas sin reconstruir tu plataforma.** | Conectores, ledger, routing y conciliación |
| Seguridad | **Tu dinero sigue siendo tuyo. Tus reglas también.** | Passkeys, políticas, recovery y auditoría |

## 11. Un pitch que contiene las tres capas

> GatoPago hace que los dólares digitales sean realmente utilizables. Para las personas es una cuenta donde pueden recibir, pagar, cambiar y poner una parte a crecer sin aprender toda la complejidad de Web3. Para fintechs y plataformas, esa misma experiencia puede integrarse mediante checkout, componentes y API. Y para empresas que mueven dinero entre países, GatoPago coordina proveedores, rutas, políticas y conciliación sin obligarlas a reconstruir su sistema para cada mercado. Personal construye la relación; Embedded distribuye la experiencia; Platform mueve la infraestructura.

## 12. Estrategia de ejecución

No se deben construir tres roadmaps independientes. Cada inversión debe fortalecer el core compartido y al menos dos superficies cuando sea posible.

### Prioridad 1: Personal

- terminar una experiencia coherente;
- validar el ciclo recibir → decidir → usar o crecer;
- llevar una cohorte a mainnet solo después de seguridad y operación;
- aprender de usuarios reales;
- mantener Card como discovery hasta confirmar proveedor y economía.

### Prioridad 2: Embedded

- convertir payment intents, checkout y webhooks en una integración real;
- utilizar hosted flows antes de SDK complejos;
- conseguir uno o dos partners con usuarios reales;
- medir activación y repetición del usuario final;
- reutilizar la interfaz y componentes existentes.

### Prioridad 3: Platform

- investigar un corredor real con un design partner;
- construir conectores solo cuando exista demanda concreta;
- validar el modelo normalizado en shadow mode y sandbox;
- no construir una tesorería empresarial completa por anticipado;
- ampliar routing y conciliación desde incidentes reales.

La distribución de esfuerzo vigente puede mantenerse como referencia:

- **60% Personal y experiencia consumer.**
- **25% Card, rails y capacidades que también habilitan Embedded.**
- **15% API y partners privados.**

Un partner B2B o B2B2C real puede justificar cambiar esta distribución. Una conversación interesante por sí sola no.

## 13. Cómo evaluar oportunidades

Una función nueva es estratégicamente fuerte cuando responde “sí” a varias preguntas:

1. ¿Mejora la experiencia Personal?
2. ¿Puede distribuirse mediante Embedded?
3. ¿Fortalece el core o la operación de Platform?
4. ¿Resuelve una intención humana?
5. ¿Tiene un usuario o partner dispuesto a probarla?
6. ¿Puede medirse?
7. ¿Conserva control y transparencia?

Ejemplos:

| Capacidad | Personal | Embedded | Platform |
|---|---:|---:|---:|
| Payment intent | Cobro claro | Checkout para partners | Objeto común de integración |
| Passkeys | Firma simple | Cuenta embebida segura | Aprobaciones empresariales futuras |
| Ledger | Actividad comprensible | Historial para usuarios del partner | Conciliación |
| Comprobante | Confianza y compartir | Experiencia final completa | Evidencia operacional |
| Routing | Menor costo y fricción | Mejor experiencia del partner | Orquestación de corredores |
| Card futura | Uso cotidiano | Producto embebible | Rail adicional |

## 14. Métricas por superficie

### B2C

- cuentas financiadas;
- primera operación útil;
- repetición a 7 y 30 días;
- cobros y pagos completados;
- uso de Disponible y Creciendo;
- soporte por cada 100 operaciones.

### B2B2C

- tiempo de integración del partner;
- usuarios invitados y activados;
- porcentaje que recibe fondos;
- primera acción útil;
- repetición;
- volumen por partner;
- partners activos mensualmente.

### B2B

- tiempo para activar un corredor;
- tiempo a primera operación;
- costo total y ETA;
- éxito p50 y p95;
- webhooks entregados;
- conciliación automática;
- horas manuales eliminadas;
- nuevos proveedores sin cambios en flujos existentes.

### North star conjunta

> **Personas que reciben valor mediante GatoPago —directamente o a través de un partner— y vuelven a utilizarlo dentro de 30 días.**

## 15. Qué decir en la reunión con PagoFácil

No es necesario presentar las tres capas con el mismo detalle. La conversación puede enfocarse en B2B y B2B2C, pero dentro de una visión mayor:

> GatoPago tiene una experiencia consumer propia porque no queremos construir infraestructura desconectada del usuario final. Esa experiencia puede vivir directamente en GatoPago Personal o integrarse dentro de una fintech. Debajo, estamos explorando una capa que permita añadir monedas, proveedores y corredores sin reconstruir los flujos. Queremos entender si una de las integraciones pendientes de PagoFácil puede convertirse en el primer caso real.

Dos posibles colaboraciones:

1. **B2B:** GatoPago normaliza y orquesta un corredor de PagoFácil.
2. **B2B2C:** PagoFácil ofrece a comercios o usuarios una experiencia de stablecoin checkout, recepción o cuenta impulsada por GatoPago.

La segunda aprovecha directamente la interfaz, Meli, los pagos y los comprobantes ya construidos.

## 16. Decisión final

GatoPago no debe volverse una empresa B2B invisible ni quedarse como una app consumer aislada.

La estrategia recomendada es:

> **Consumer-first en marca y experiencia. Embedded-first en distribución. Infrastructure-led en capacidad y monetización.**

En español más directo:

> **Las personas quieren usar GatoPago. Las plataformas pueden integrarlo. Las empresas pueden construir sobre él.**

La interfaz linda tiene un propósito económico:

- convierte tecnología en confianza;
- convierte usuarios en distribución;
- convierte componentes en producto B2B2C;
- convierte la infraestructura en una experiencia que puede llegar a millones de personas.

La síntesis completa es:

> **GatoPago Personal crea el vínculo. GatoPago Embedded multiplica el alcance. GatoPago Platform construye los caminos.**
