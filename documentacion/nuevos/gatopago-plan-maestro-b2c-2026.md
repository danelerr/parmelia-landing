# GatoPago Personal: plan maestro B2C 2026–2030

> **Estado del documento:** estrategia de producto y negocio. No implica disponibilidad comercial, licencia, cobertura geográfica ni lanzamiento en mainnet.  
> **Fecha de corte:** 19 de agosto de 2026.  
> **Alcance:** adquisición, activación, producto, experiencia, seguridad, monetización, operaciones, retención y expansión de GatoPago Personal.  
> **Documento superior:** [estrategia integral B2C, B2B2C y B2B](./gatopago-estrategia-integral-b2c-b2b2c-b2b-2026.md).  
> **Verdad técnica actual:** [visión y plan de mejora de la aplicación](./gatopago-vision-plan-mejora-2026.md).  
> **Sistema visual y de interacción:** [rebranding maestro](./gatopago-rebranding-maestro-2026.md).

---

## 0. Respuesta ejecutiva

GatoPago Personal no debe intentar ganar como “otra wallet de USDC”. Ese mercado ya combina cuentas en dólares digitales, tarjetas, transferencias y rendimiento. Tampoco puede sostener su diferencia únicamente en passkeys, account abstraction o gas patrocinado: esas capacidades se están convirtiendo en infraestructura esperada.

La oportunidad es construir **la cuenta de dinero digital más comprensible, viva y útil para una persona latinoamericana que cobra globalmente**.

La promesa es:

> **Tus dólares ya saben moverse.**

La explicación concreta es:

> **Cobra, organiza, haz crecer y usa tus dólares digitales desde una sola cuenta que sigue siendo tuya.**

La diferencia debe sentirse en cinco dimensiones simultáneas:

1. **Control comprobable:** la persona conserva control sobre su cuenta y entiende qué autoriza.
2. **Dinero con propósito:** el saldo se organiza por intención —usar, crecer, reservar— y no por jerga técnica.
3. **Movimiento sin laberintos:** links, QR, contactos, retiros, swaps y rutas se presentan como tareas humanas.
4. **Compañía útil:** Meli explica, confirma, celebra y alerta; nunca manipula ni infantiliza el dinero.
5. **Conexión latinoamericana:** GatoPago se diseña para ingresos globales, monedas locales, redes variables y confianza todavía frágil.

El B2C es el centro emocional y el laboratorio de producto de toda la compañía. Embedded lo distribuye y Platform construye los caminos, pero Personal demuestra que esos caminos producen una vida financiera mejor.

---

## 1. Contrato estratégico

### 1.1 Qué estamos construyendo

Una **cuenta onchain programable y autocustodiada**, presentada como una aplicación financiera cotidiana. La infraestructura puede incluir smart accounts, stablecoins, múltiples redes, protocolos y proveedores; el usuario entra por intenciones:

- cobrar;
- agregar dinero;
- enviar;
- pagar;
- retirar;
- guardar;
- hacer crecer;
- gastar con tarjeta cuando exista una oferta aprobada y operativa;
- demostrar qué ocurrió mediante un comprobante legible.

### 1.2 Para quién empieza

Personas y equipos pequeños de LATAM que ya reciben USDC, cobran internacionalmente o usan wallets/exchanges y quieren una experiencia más clara para mantener y usar ese dinero.

### 1.3 Para quién puede crecer

Personas que no quieren “entrar a cripto”, pero sí quieren:

- acceso práctico a dólares digitales;
- cobrar del exterior;
- proteger una parte de sus ingresos;
- pagar o transferir sin depender de un solo banco;
- usar servicios globales;
- obtener rendimiento con riesgos explicados;
- llevar su dinero a otra interfaz si GatoPago desaparece.

### 1.4 Qué no construiremos todavía

- un banco ficticio;
- una superapp con veinte productos inconexos;
- trading especulativo como motor de retención;
- crédito antes de contar con datos, licencias, capital y cobranza responsables;
- rendimiento “garantizado”;
- una tarjeta anunciada como disponible antes de cerrar issuer, jurisdicción, KYC, operación y soporte;
- automatizaciones irreversibles o gobernadas por una IA opaca;
- una home dominada por “Web3”. El término puede existir en educación o detalles técnicos, no como categoría principal del dinero.

### 1.5 Regla de prioridad

Una capacidad B2C entra al roadmap solo si mejora al menos uno de estos resultados sin deteriorar seguridad:

- tiempo hasta primer valor;
- frecuencia de uso financiero real;
- porcentaje de ingresos que permanece o circula en GatoPago;
- control y confianza percibidos;
- coste o velocidad total de una tarea;
- capacidad de recuperación y salida.

---

## 2. Tesis de mercado

### 2.1 El cambio de comportamiento

En mercados con acceso limitado o costoso al dólar, las stablecoins ya cumplen funciones de ahorro y movimiento transfronterizo. Al mismo tiempo, la categoría consumer se está llenando de cuentas digitales con datos bancarios, tarjetas y rendimientos. La existencia de una wallet ya no resuelve el problema completo: el usuario sigue armando manualmente una cadena entre cliente, exchange, wallet, protocolo, tarjeta, banco y comprobante.

GatoPago debe convertir esa cadena fragmentada en un **ciclo continuo de dinero**:

```text
trabajo o venta
      ↓
    cobrar
      ↓
  disponible ─────→ pagar / enviar / retirar
      │
      ├───────────→ reservar
      │
      └───────────→ crecer con riesgo entendido
                           ↓
                    volver a usar
```

### 2.2 El problema verdadero

El usuario no tiene “un problema de blockchain”. Tiene una combinación de:

- incertidumbre sobre cuánto recibirá realmente;
- demasiados pasos y aplicaciones;
- miedo a equivocarse de red o dirección;
- poca claridad sobre comisiones, tasas y tiempos;
- recuperación difícil;
- dinero detenido sin propósito;
- dificultad para explicar o demostrar un pago;
- baja aceptación cotidiana de su saldo digital;
- soporte fragmentado cuando una ruta falla.

### 2.3 Categoría que queremos ocupar

Internamente:

> **Cuenta onchain programable.**

En lenguaje público:

> **Tu cuenta para cobrar y mover dólares digitales.**

En una etapa posterior, cuando la tarjeta y las rutas locales estén realmente disponibles:

> **Recibe dólares digitales. Hazlos crecer. Úsalos donde los necesites.**

---

## 3. Segmentación completa

### 3.1 Cuña primaria

| Segmento                 | Situación                                                  | Dolor dominante                                            | Momento de entrada                   | Primera victoria                             |
| ------------------------ | ---------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------ | -------------------------------------------- |
| Profesional remoto       | Cobra a clientes o empresa extranjera                      | Recibir, conservar y usar el pago sin cinco intermediarios | Primer contrato o cobro mensual      | Recibe USDC y genera un comprobante claro    |
| Creador o contributor    | Recibe grants, bounties, propinas o pagos comunitarios     | Cobros dispersos y poca trazabilidad                       | Nuevo grant, campaña o evento        | Comparte un link/QR y organiza lo recibido   |
| Founder o equipo pequeño | Maneja pagos puntuales entre colaboradores                 | No tiene tesorería simple ni separación clara              | Primer pago recurrente al equipo     | Envía varios pagos con conceptos y recibos   |
| Usuario crypto-adjacent  | Usa Binance o wallet, pero no quiere gestionar complejidad | Redes, gas, direcciones, protocolos                        | Quiere sacar más utilidad de su USDC | Agrega fondos y completa una tarea sin jerga |

### 3.2 Segmentos secundarios

| Segmento                   | Hipótesis de valor                                   | Condición antes de priorizarlo                                      |
| -------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------- |
| Receptor de remesas        | Recibir, conservar y retirar con transparencia       | Partner de entrada/salida y soporte local confiable                 |
| Viajero o comprador global | Mantener saldo digital y gastarlo internacionalmente | Tarjeta o aceptación merchant comprobada                            |
| Microcomerciante digital   | Cobrar por link/QR y reconciliar ventas              | Flujo fiscal/comercial y soporte a disputas definidos               |
| Familia transnacional      | Bolsillos compartidos y reglas de apoyo              | Recuperación, permisos y protección contra abuso maduros            |
| Ahorrador no cripto        | Dólares digitales y crecimiento explicado            | Educación, idoneidad, disclosures y retiros suficientemente simples |

### 3.3 No priorizar durante la cuña

- traders frecuentes;
- especuladores que miden valor por cantidad de tokens;
- instituciones con necesidades avanzadas de tesorería;
- crédito de consumo;
- usuarios que necesitan efectivo como único punto de entrada sin un partner operativo;
- todos los países al mismo tiempo.

### 3.4 Criterio de selección de país

Un país se habilita por cohortes, no por entusiasmo. Puntaje sobre 100:

| Variable                                                | Peso |
| ------------------------------------------------------- | ---: |
| Dolor real de cobro/ahorro en moneda fuerte             |   20 |
| Claridad regulatoria y posibilidad de operar con socios |   20 |
| Entrada y salida local confiable                        |   15 |
| Densidad de comunidad inicial                           |   15 |
| Cobertura de Card o medios de gasto                     |   10 |
| Coste de soporte y fraude                               |   10 |
| Economía por usuario                                    |   10 |

No se abre comercialmente un país con menos de 70/100 o con un veto legal, de seguridad o de liquidez.

---

## 4. Personas de diseño

Las personas sirven para decidir, no para decorar presentaciones. Deben validarse con entrevistas y datos.

### 4.1 Vale — profesional remota

- Cobra entre una y cuatro veces al mes.
- Necesita saber cuánto llegará, cuándo y cómo usarlo.
- Puede manejar Binance, pero no quiere vivir dentro de un exchange.
- Valora comprobantes, contactos, seguridad y disponibilidad.
- Su evento de activación es **recibir y completar una segunda acción útil**: guardar, enviar, retirar o crecer.

### 4.2 Nico — contributor de comunidad

- Recibe pagos pequeños y medianos de varias fuentes.
- Comparte wallets y QR, a veces con errores de red.
- Quiere una identidad cobrable y actividad con conceptos humanos.
- Su evento de activación es **recibir por un link o username y compartir el recibo**.

### 4.3 Sofi — líder de equipo pequeño

- Cobra globalmente y paga a tres o diez colaboradores.
- Usa una hoja de cálculo para referencias y estados.
- No necesita un ERP; necesita certeza y repetición.
- Su evento de activación es **repetir un pago guardado sin volver a copiar datos**.

### 4.4 Ana — ahorradora curiosa

- Quiere exposición al dólar y entiende poco de protocolos.
- Teme perder acceso o aceptar un riesgo que no comprende.
- No debe ser empujada a DeFi por una recompensa visual.
- Su evento de activación es **crear respaldo, agregar un monto pequeño y comprender cómo retirarlo**.

### 4.5 Matriz de decisiones

| Decisión                 |  Vale |  Nico |  Sofi |     Ana |
| ------------------------ | ----: | ----: | ----: | ------: |
| Cobrar globalmente       |  Alta |  Alta |  Alta |    Baja |
| Links, QR y username     | Media |  Alta | Media |    Baja |
| Pagos recurrentes        | Media |  Baja |  Alta |    Baja |
| Crecimiento              | Media |  Baja | Media |    Alta |
| Card                     |  Alta | Media |  Alta |   Media |
| Recuperación guiada      |  Alta | Media |  Alta | Crítica |
| Detalle técnico opcional | Media |  Alta | Media |    Bajo |

---

## 5. Jobs to be done

### 5.1 Funcionales

- Cuando termino un trabajo, quiero cobrar sin explicar redes ni exponer una dirección larga.
- Cuando recibo dinero, quiero saber cuánto está disponible y qué puedo hacer con él.
- Cuando pago, quiero verificar destinatario, coste, tiempo y resultado antes de confirmar.
- Cuando guardo una parte, quiero separarla sin abrir otra cuenta.
- Cuando busco rendimiento, quiero entender de dónde viene, qué puede fallar y cómo salir.
- Cuando algo queda pendiente, quiero un estado honesto y una acción concreta.
- Cuando cambio de teléfono, quiero recuperar acceso sin entregar control permanente a GatoPago.
- Cuando una empresa me paga, quiero un comprobante que ambas partes entiendan.

### 5.2 Emocionales

- Sentir que el dinero está bajo control.
- Evitar la vergüenza de pedir ayuda por una red equivocada.
- Sentir progreso sin ser inducido a arriesgar más.
- Poder recomendar la app sin tener que dar una clase de cripto.
- Confiar en que una interfaz bonita también es seria con el dinero.

### 5.3 Sociales

- Cobrar con una identidad profesional.
- Demostrar que un pago ocurrió.
- Compartir una experiencia reconocible y agradable.
- Participar en una economía global desde LATAM sin parecer un usuario de segunda clase.

---

## 6. Posicionamiento y ventaja defendible

### 6.1 La diferencia no es una lista de funciones

Takenos, DolarApp y Littio demuestran que cuenta digital, transferencias, tarjeta y crecimiento ya forman un paquete competitivo. Circle y Coinbase demuestran que smart accounts, passkeys, batching y gas sponsorship pueden consumirse como infraestructura. Gnosis Pay demuestra que una tarjeta ligada a una cuenta autocustodiada es posible.

La ventaja de GatoPago debe ser el sistema completo:

| Capa         | Diferencia buscada                                                                   |
| ------------ | ------------------------------------------------------------------------------------ |
| Experiencia  | El dinero se entiende por intención, no por token o red                              |
| Identidad    | Links, usernames y QR convierten una cuenta técnica en una persona cobrable          |
| Control      | Permisos, recuperación, salida y actividad son visibles y verificables               |
| Inteligencia | Recomendaciones y reglas transparentes, simuladas y revocables                       |
| Cultura      | Meli convierte estados financieros en una relación memorable sin trivializar riesgos |
| Distribución | Comunidades, equipos y partners llevan usuarios con un primer flujo ya resuelto      |
| Datos        | Aprendizaje sobre rutas, fallos, confianza y ciclos de dinero en LATAM               |

### 6.2 Moat acumulativo

No hay un único moat inicial. Hay una secuencia:

1. **Love moat:** una experiencia que la gente recuerda y recomienda.
2. **Workflow moat:** contactos, comprobantes, reglas y ciclos recurrentes que ahorran trabajo.
3. **Distribution moat:** comunidades, payroll, marketplaces y fintechs que originan usuarios.
4. **Routing moat:** datos propios sobre rutas, tiempos, costes, fallos y preferencias.
5. **Trust moat:** historial de seguridad, recuperación, soporte y comunicación clara.

### 6.3 Prueba de posicionamiento

Si un usuario solo puede describir GatoPago como “una wallet roja con un gato”, el posicionamiento falló. La respuesta deseada es:

> “Es donde cobro mis dólares digitales y los organizo para usarlos, guardarlos o hacerlos crecer.”

---

## 7. Arquitectura del producto B2C

### 7.1 Modelo mental

La home deja de usar **Web3** como un sector. La estructura recomendada es:

1. **Disponible:** dinero listo para enviar, pagar, retirar o gastar.
2. **Creciendo:** dinero colocado en una estrategia explícita con tasa y riesgo variables.
3. **Bolsillos:** reservas por objetivo o regla, inicialmente contables y después programables.
4. **Otros activos:** sección secundaria y colapsable para ETH, WBTC y posiciones avanzadas.

### 7.2 Home por prioridades

```text
Hola, Daniel                                seguridad ✓

Tu dinero digital
$1.150,40 USDC

Disponible                                  $350,40
[ Agregar ] [ Enviar ] [ Recibir ] [ Retirar ]

Creciendo                                   $800,00
Tasa variable · riesgo y protocolo visibles

Tus bolsillos
Impuestos · Viaje · Emergencia

GatoPago te sugiere
“Recibiste $400. ¿Separar el 10% en Emergencia?”
[ Revisar ] [ Ahora no ]

Actividad reciente

Otros activos                               colapsado
```

La sugerencia nunca ejecuta por defecto. “Revisar” abre una simulación con monto, destino, permisos, costes, riesgos y revocación.

### 7.3 Navegación

Máximo cinco destinos persistentes:

- Inicio;
- Pagar;
- Crecer;
- Actividad;
- Cuenta.

“Agregar”, “Enviar”, “Recibir”, “Retirar”, “Cambiar” y “Escanear” son acciones contextuales, no seis tabs. Solo puede existir un botón de escaneo primario por pantalla.

### 7.4 Objetos de producto

| Objeto           | Qué representa                                                 |
| ---------------- | -------------------------------------------------------------- |
| Cuenta           | Smart account y su control                                     |
| Persona cobrable | Username, QR y links asociados                                 |
| Contacto         | Destinatario verificado y reutilizable                         |
| Movimiento       | Intención financiera con estado y evidencia                    |
| Comprobante      | Resumen compartible, legible y verificable                     |
| Bolsillo         | Dinero separado por propósito                                  |
| Estrategia       | Posición de crecimiento con riesgo y salida                    |
| Regla            | Condición limitada, simulada y revocable                       |
| Ruta             | Camino técnico y financiero usado para completar una intención |

---

## 8. Viaje completo del usuario

### 8.1 Descubrimiento

**Pregunta del usuario:** “¿Esto resuelve mi cobro o solo es otra app cripto?”

La landing debe mostrar:

- el problema antes que la infraestructura;
- una demostración del ciclo cobrar → organizar → usar;
- estado real de Alpha/testnet;
- control y recuperación;
- costes y riesgos accesibles;
- Card como acceso anticipado, no como capacidad activa;
- una acción principal: probar o solicitar acceso según la etapa.

### 8.2 Creación de cuenta

Objetivo de diseño: llegar a una cuenta protegida sin seed phrase inicial, pero sin ocultar qué se creó.

Secuencia:

1. Explicar en una frase: “Crearemos una cuenta inteligente protegida por tu dispositivo”.
2. Crear passkey.
3. Nombrar dispositivo.
4. Explicar qué controla GatoPago y qué no.
5. Mostrar estado de red y testnet.
6. Ofrecer respaldo/guardian antes de depositar valor relevante.
7. Completar una visita guiada de menos de 60 segundos.

Gate de activación: no considerar activado a quien solo creó cuenta.

### 8.3 Seguridad inicial

Checklist progresivo:

- passkey principal creada;
- segundo método o dispositivo recomendado;
- guardian configurado;
- periodo de recuperación explicado;
- dirección/salida independiente disponible;
- alertas de inicio de sesión y movimientos activadas;
- prueba de recuperación en sandbox ofrecida.

El sistema puede permitir explorar antes de completar todo, pero eleva requisitos según monto y riesgo.

### 8.4 Agregar o recibir dinero

El usuario elige origen, no red:

- otra wallet;
- exchange;
- otra red;
- pago de otra persona;
- transferencia bancaria o moneda local cuando exista partner habilitado.

Cada ruta debe mostrar:

- activo y red esperados;
- monto mínimo si aplica;
- coste estimado;
- tiempo esperado como rango;
- qué ocurre si el origen usa otra red;
- estado de seguimiento;
- soporte contextual.

Una dirección nunca aparece sola: se acompaña de red, copy, QR, prueba visual de verificación y advertencia específica.

### 8.5 Primer valor

El “aha moment” B2C no es ver un balance. Es completar el ciclo mínimo:

```text
recibir o agregar
        +
una segunda acción con sentido
        =
activación real
```

Segundas acciones válidas:

- enviar;
- pagar por QR/link;
- separar en bolsillo;
- mover a Creciendo después de comprender riesgo;
- retirar;
- compartir un comprobante.

### 8.6 Enviar o pagar

Flujo común:

1. Seleccionar contacto, username, link o QR.
2. Resolver destinatario y mostrar identidad verificable.
3. Introducir monto y concepto.
4. Mostrar “recibe”, coste total, ruta y tiempo.
5. Alertar inconsistencias o primer destinatario.
6. Confirmar con passkey.
7. Presentar progreso por estados reales.
8. Entregar comprobante descargable y compartible.

Estados de usuario:

- Preparando;
- Esperando tu confirmación;
- En camino;
- Entregado;
- Requiere atención;
- Revertido o reembolsado, si la ruta lo permite.

No usar “éxito” cuando la transacción fue solamente enviada a una red.

### 8.7 Swap

Se presenta como **Cambiar**, no como exchange profesional.

Debe mostrar antes de firma:

- entregas;
- recibes como mínimo;
- tasa efectiva;
- impacto/precio si aplica;
- comisiones de protocolo, ruta y GatoPago separadas;
- red y proveedor en “Ver detalles”;
- vigencia de la cotización.

No incorporar gráficos de trading en la experiencia principal.

### 8.8 Creciendo

Antes de depositar:

- explicar que la tasa es variable;
- identificar protocolo y contrato;
- explicar riesgo de smart contract, stablecoin, liquidez y red;
- simular ganancia sin presentarla como promesa;
- mostrar tiempo/coste de salida;
- recomendar monto de prueba;
- impedir que animaciones o Meli presionen la decisión.

Después:

- capital;
- ganancia estimada y realizada diferenciadas;
- tasa actual y fecha de actualización;
- riesgo y proveedor;
- retiro visible;
- historial de cambios materiales.

### 8.9 Retiro o salida

La salida es parte del producto, no un fracaso de retención.

Rutas posibles:

- wallet;
- exchange;
- otra red;
- banco/moneda local mediante partner habilitado;
- tarjeta cuando exista.

El sistema debe comparar resultado neto, tiempo y disponibilidad. Si una ruta no es operable, no aparece como promesa.

### 8.10 Recuperación

La recuperación debe ensayarse antes de necesitarse. Flujo:

1. Identificar el evento: dispositivo perdido, passkey inaccesible o sospecha de compromiso.
2. Explicar plazos y consecuencias.
3. Iniciar con guardian/método permitido.
4. Notificar a métodos existentes.
5. Mostrar cuenta regresiva y cancelación segura.
6. Reconstituir acceso.
7. Revocar el método perdido.
8. Ejecutar revisión de seguridad.

La promesa “autocustodia” solo es defendible si existe una vía documentada para administrar o retirar fondos sin depender indefinidamente de la interfaz de GatoPago.

---

## 9. Ciclo de vida y CRM

### 9.1 Estados de ciclo

| Estado     | Definición                              | Próxima mejor acción                     |
| ---------- | --------------------------------------- | ---------------------------------------- |
| Visitante  | Conoce la promesa                       | Ver demo o caso relevante                |
| Registrado | Creó acceso, sin cuenta funcional       | Completar passkey                        |
| Protegido  | Cuenta creada con seguridad mínima      | Recibir monto de prueba                  |
| Fondeado   | Tiene primer saldo                      | Completar segunda acción                 |
| Activado   | Completó ciclo mínimo                   | Repetir el caso principal                |
| Habitual   | Completa 2+ movimientos útiles/mes      | Crear contacto, bolsillo o regla         |
| Profundo   | Usa 2+ capacidades y mantiene confianza | Card/beneficios apropiados               |
| En riesgo  | Sin actividad o con fallo no resuelto   | Resolver fricción, no enviar promociones |
| Recuperado | Volvió tras inactividad/fallo           | Revalidar seguridad y necesidad          |

### 9.2 Primeros 90 días

| Momento | Objetivo                       | Mensaje o intervención                              |
| ------- | ------------------------------ | --------------------------------------------------- |
| Día 0   | Comprensión y cuenta protegida | “Tu cuenta está lista; probemos cómo recibir.”      |
| Día 1   | Primer saldo o simulación      | Guía según origen elegido                           |
| Día 3   | Desbloquear primer valor       | Recordatorio solo si hay una tarea incompleta       |
| Día 7   | Segunda acción                 | Bolsillo, comprobante o contacto según conducta     |
| Día 14  | Confianza                      | Revisión breve de seguridad y salida                |
| Día 30  | Hábito                         | Resumen mensual: recibido, usado, reservado, costes |
| Día 60  | Profundidad                    | Regla sugerida o acceso Card si corresponde         |
| Día 90  | Lealtad                        | Informe de valor entregado, no “racha” vacía        |

### 9.3 Principios de notificación

- transaccional antes que promocional;
- acción y consecuencia explícitas;
- silencio si no hay valor;
- no celebrar rendimiento variable como si fuera seguro;
- no usar culpa, urgencia falsa ni pérdida de racha;
- permitir granularidad por tipo y canal;
- cada alerta crítica también vive en un centro de seguridad dentro de la app.

### 9.4 Eventos de reactivación legítimos

- cobro esperado no recibido;
- cotización/ruta que ahora sí está disponible;
- seguridad incompleta;
- retiro pendiente;
- resumen mensual;
- invitación de un contacto o pagador conocido;
- disponibilidad real de una capacidad solicitada.

---

## 10. La mascota como sistema de producto

La mascota —llamada Meli únicamente dentro del equipo y los archivos de producción— no es un sticker. Es una capa de orientación con reglas precisas.

### 10.1 Roles

- **Guía:** explica el siguiente paso.
- **Testigo:** confirma que un estado cambió.
- **Guardiana:** alerta ante riesgo o inconsistencia.
- **Compañera:** celebra progreso real.
- **Exploradora:** introduce una capacidad opcional.

### 10.2 Expresiones y usos

| Estado de Meli        | Uso                                        |
| --------------------- | ------------------------------------------ |
| Neutral/atenta        | Home y decisiones financieras              |
| Caminando con paquete | Pago preparándose o en camino              |
| Con QR                | Cobrar/recibir                             |
| Durmiendo             | Sin actividad o mantenimiento no crítico   |
| Asomándose            | Empty state o primera exploración          |
| Estrellas en ojos     | Logro excepcional, nunca por asumir riesgo |
| Guardiana/linterna    | Seguridad, recuperación o verificación     |
| Con sobre/corazón     | Comprobante, regalo o pago personal        |

### 10.3 Ética de animación

- En dinero pendiente, la animación comunica proceso, no éxito.
- En errores, Meli no sonríe.
- En seguridad, el movimiento es mínimo y calmado.
- En “Crecer”, no hay confeti por depositar.
- `prefers-reduced-motion` elimina desplazamiento y conserva el significado.
- Ningún loop continuo debe consumir CPU o dar sensación de lag.

El catálogo visual, motion tokens, componentes, bordes y sprites se define en el [rebranding maestro](./gatopago-rebranding-maestro-2026.md).

---

## 11. Confianza, seguridad y cumplimiento B2C

### 11.1 Modelo de confianza

La confianza se demuestra en cuatro capas:

1. **Antes:** identidad del producto, riesgos, estado de red, costes y límites.
2. **Durante:** simulación, destinatario, monto neto y autorización exacta.
3. **Después:** estados verificables, comprobante, actividad y soporte.
4. **Cuando falla:** diagnóstico, dueño del caso, plazo y recuperación.

### 11.2 Seguridad visible

Centro de seguridad:

- dispositivos/passkeys;
- guardianes y recuperación;
- sesiones activas;
- permisos y reglas;
- límites diarios;
- contactos confiables;
- alertas;
- contratos/proveedores conectados;
- exportación y salida independiente;
- historial de cambios críticos.

### 11.3 Controles progresivos

| Riesgo                | Control posible                                           |
| --------------------- | --------------------------------------------------------- |
| Destinatario nuevo    | Vista reforzada + espera opcional + límite                |
| Monto inusual         | Reautenticación + simulación + alerta                     |
| Dispositivo nuevo     | Periodo de enfriamiento para acciones sensibles           |
| Regla automática      | Cap, activo/ruta permitidos, expiración y revocación      |
| Recuperación          | Demora, notificación multicanal y posibilidad de cancelar |
| Link malicioso        | Dominio firmado, preview seguro y reputación              |
| Dirección contaminada | No sugerir solo por similitud; usar contactos verificados |

### 11.4 KYC y límites por capacidad

No imponer una única pantalla de KYC a toda la visión. Diseñar una matriz por servicio y país:

| Capacidad                          | Identificación posible                      | Por qué                  |
| ---------------------------------- | ------------------------------------------- | ------------------------ |
| Explorar testnet                   | Mínima                                      | No hay dinero real       |
| Cuenta autocustodiada básica       | Según arquitectura y jurisdicción           | Acceso/control de cuenta |
| Fiat on/off-ramp                   | KYC del proveedor y obligaciones aplicables | Servicio regulado        |
| Card                               | KYC/AML del issuer/program manager          | Red de pago regulada     |
| Límites altos o patrones de riesgo | Diligencia reforzada                        | Fraude/AML               |
| Producto para empresa              | KYB + beneficiario final                    | Riesgo comercial         |

Bolivia ya cuenta con regulación para Empresas de Tecnología Financiera y un entorno controlado de pruebas, además de obligaciones específicas alrededor de proveedores de servicios de activos virtuales. Eso crea una vía posible, no una autorización automática. Antes de ofrecer servicios al público se requiere análisis legal por actividad, entidad, flujo de fondos, custodia, publicidad y jurisdicción.

### 11.5 Privacidad

- recopilar solo lo necesario;
- separar telemetría de producto de identidad sensible;
- retención definida por categoría de dato;
- no incluir dirección, saldo o concepto en push notifications por defecto;
- exportación y eliminación donde legalmente proceda;
- no entrenar modelos con datos financieros identificables sin consentimiento explícito y base legal;
- permitir alias públicos sin exponer historial completo.

---

## 12. Crecer sin engañar

### 12.1 Oferta inicial

Una sola estrategia guiada: suministro de USDC en Aave, ya integrado técnicamente. No añadir un supermercado DeFi hasta dominar:

- explicación;
- depósitos y retiros;
- cálculo de rendimiento;
- soporte;
- incidentes;
- cambios de tasa;
- riesgo de protocolo y stablecoin.

### 12.2 Reserva de seguridad

GatoPago puede sugerir mantener un porcentaje disponible antes de mover fondos a Creciendo. Es una recomendación editable, no asesoría personalizada ni bloqueo.

### 12.3 GatoScore de claridad, no de riesgo oculto

Cada estrategia futura recibe una ficha interna y pública:

- fuente del rendimiento;
- activos y protocolos;
- liquidez de salida;
- madurez;
- auditorías públicas;
- dependencias/oráculos;
- concentración;
- escenarios adversos;
- jurisdicción y disponibilidad;
- historial de incidentes.

No reducir todo a un número verde. Un score agregado siempre debe abrir sus componentes.

### 12.4 Prohibiciones

- “Ahorra X% garantizado”.
- APY desactualizado sin timestamp.
- confundir recompensas promocionales con tasa orgánica.
- usar depósitos de usuarios para subsidiar retiros sin disclosure.
- activar collateral/borrowing por defecto.
- sugerir apalancamiento dentro de Personal.

---

## 13. GatoPago Card

### 13.1 Papel estratégico

Card transforma saldo digital en frecuencia cotidiana. Es potencialmente el puente desde la cuña crypto-adjacent hacia un mercado más amplio, pero no es un atajo: requiere issuer, programa, KYC, fraude, disputas, reservas, soporte y cobertura.

### 13.2 Experiencia deseada

- virtual primero donde sea permitido;
- saldo y disponibilidad claros;
- congelar/descongelar;
- límites por compra/día;
- merchant y conversión legibles;
- notificación inmediata;
- disputa y soporte desde la transacción;
- controles independientes para online, internacional y contactless;
- Apple Pay/Google Pay solo cuando el programa lo soporte;
- Card Vault o permisos de gasto separados del ahorro de largo plazo.

### 13.3 Gate de lanzamiento

Card no pasa de waitlist a producto activo hasta cumplir:

- cobertura contractual y países definidos;
- arquitectura de custodia/settlement documentada;
- KYC/AML y privacidad revisados;
- economía neta por tarjeta razonable;
- fraude, chargebacks y soporte operables;
- conciliación diaria;
- límites y reservas;
- continuidad ante caída de GatoPago o proveedor;
- términos, tarifas y FX visibles;
- beta cerrada con criterios de salida.

### 13.4 Métricas de Card

- activación de tarjeta;
- first spend en 7 días;
- usuarios con 3+ compras/mes;
- volumen y margen neto;
- tasa de autorización;
- fraude y chargebacks;
- tiempo de resolución;
- porcentaje de saldo que permanece autocustodiado hasta el gasto;
- retención incremental frente a cohortes sin Card.

---

## 14. Bolsillos y reglas programables

### 14.1 Bolsillos V1

Separación visual/contable con propósitos:

- disponible;
- impuestos;
- emergencia;
- viaje;
- equipo;
- meta personalizada.

Antes de ser onchain, un bolsillo puede ser una vista segura sobre el mismo saldo. Debe decirlo claramente.

### 14.2 Reglas V2

Ejemplos:

- “Cada vez que recibo, separar 10% en Impuestos”.
- “Mantener al menos $200 Disponible”.
- “Mover a Creciendo solo el excedente de $500”.
- “Pausar automatizaciones si la tasa o el riesgo cambia”.
- “Pagar a este contacto hasta $100/mes”.

Contrato de una regla:

- condición;
- acción;
- activos/rutas permitidos;
- máximo por operación y periodo;
- fecha de expiración;
- simulación;
- log;
- pausa y revocación inmediata;
- fallback seguro.

### 14.3 Automatizaciones guiadas

Nombre visionario para una capa futura de recomendaciones y reglas. No es un agente con libertad sobre fondos. Evoluciona así:

1. Observa y explica.
2. Sugiere con simulación.
3. Prepara una acción para firma.
4. Ejecuta reglas deterministas preautorizadas y limitadas.
5. Optimiza entre rutas aprobadas dentro de límites.

Una IA puede interpretar intención, explicar y detectar anomalías; la autoridad financiera queda en políticas verificables.

---

## 15. Monetización B2C

### 15.1 Principio

No vender “gratis” ocultando spread o contraparte. La interfaz muestra el coste total y GatoPago registra margen por capacidad.

### 15.2 Fuentes posibles

| Fuente                                  | Momento           | Condición                               |
| --------------------------------------- | ----------------- | --------------------------------------- |
| Fee transparente de ruta/swap           | Temprano          | Ahorro de tiempo o mejor resultado neto |
| Revenue share de on/off-ramp            | Con partners      | Disclosure y comparabilidad             |
| Interchange/revenue de Card             | Tras lanzamiento  | Economía del programa y regulación      |
| Plan Plus                               | Después de hábito | Valor recurrente demostrable            |
| Fee por pagos internacionales complejos | Cuando existan    | Resultado neto competitivo              |
| Servicios de equipo                     | Paso a Business   | Roles, límites y conciliación reales    |

### 15.3 GatoPago Plus hipotético

No lanzar suscripción antes de observar voluntad de pago. Paquete candidato:

- reglas avanzadas;
- límites superiores según elegibilidad;
- reportes/exportaciones;
- soporte prioritario;
- bolsillos compartidos;
- beneficios Card;
- rutas preferentes, sin prometer siempre la más barata.

No cobrar por seguridad básica, retiro de fondos, acceso a historial o recuperación esencial.

### 15.4 Unidad económica

Por cohorte y país:

```text
ingreso neto por usuario
− gas patrocinado
− fees de proveedores
− fraude y pérdidas
− soporte
− incentivos
− infraestructura variable
= contribución neta
```

Métricas:

- CAC pagado y blended;
- coste de activación;
- margen por movimiento;
- ingreso por usuario activo;
- coste de soporte por usuario;
- payback;
- retención por contribución, no solo por login;
- LTV por escenario conservador, no como verdad temprana.

### 15.5 Gate de subsidios

Gas, cashback o referidos se subsidian únicamente si:

- tienen presupuesto y expiración;
- producen activación o hábito medible;
- no esconden el coste futuro;
- el fraude esperado está modelado;
- existe un grupo de control.

---

## 16. Estrategia de crecimiento B2C

### 16.1 Motor principal: distribución con contexto

El mejor usuario no llega por un anuncio de “wallet”. Llega cuando ya tiene una razón:

- una comunidad le paga;
- un cliente abre un link;
- un equipo distribuye un pago;
- un amigo le envía;
- un evento entrega un premio;
- un partner ofrece saldo GatoPago.

### 16.2 Loops

#### Loop de cobro

Usuario crea link → pagador conoce GatoPago → pago genera comprobante → receptor vuelve a cobrar.

#### Loop de contacto

Usuario paga a persona → la persona reclama/recibe → ambos guardan contacto → próxima operación es más simple.

#### Loop de comunidad

Comunidad distribuye rewards → miembros activan → comparten casos reales → nueva comunidad solicita integración.

#### Loop de confianza

Usuario completa recuperación/seguridad → obtiene control verificable → recomienda con menos miedo → llega usuario de mayor calidad.

#### Loop Card futuro

Cobro entra → saldo se usa en compras → utilidad aumenta → usuario decide recibir más ingresos en GatoPago.

### 16.3 Referidos responsables

Recompensar valor completado, no cuentas creadas:

- referido protegido;
- primer saldo legítimo;
- segunda acción útil;
- periodo antifraude;
- recompensa fija y limitada;
- sin esquema multinivel;
- términos claros.

### 16.4 Contenido

Cinco líneas editoriales:

1. Cómo cobrar globalmente sin perderse en el camino.
2. Qué significa controlar una cuenta y cómo recuperarla.
3. Dólares digitales sin hype.
4. Historias de trabajo y creación latinoamericana.
5. Bitácora transparente de construcción, fallos y aprendizajes.

El [plan de marketing 2026](./gatopago-plan-marketing-2026.md) contiene campaña, canales, voz y calendario inicial. El plan de crecimiento transversal amplía country launches, CRM y partner loops.

---

## 17. Servicio y operaciones B2C

### 17.1 Soporte por severidad

| Nivel | Ejemplo                                      | Primera respuesta objetivo | Dueño                   |
| ----- | -------------------------------------------- | -------------------------: | ----------------------- |
| S0    | Riesgo sistémico o fondos en peligro         |                     15 min | Incident commander      |
| S1    | Cuenta comprometida, retiro/card fraudulenta |                     30 min | Seguridad + operaciones |
| S2    | Movimiento retrasado o fallido               |                        2 h | Operaciones de pagos    |
| S3    | KYC, límite, devolución o disputa            |                8 h hábiles | Operaciones/partner     |
| S4    | Duda de uso                                  |                       24 h | Soporte                 |

Son objetivos internos, no SLA público hasta contar con cobertura real.

### 17.2 Ficha única del caso

- usuario y método de verificación;
- intención/movimiento;
- ruta y proveedores;
- estados con timestamps;
- evidencia técnica;
- dinero expuesto;
- próximo paso y dueño;
- mensajes enviados;
- resolución y aprendizaje.

### 17.3 Comunicación de incidentes

- reconocer primero lo conocido y lo desconocido;
- no culpar a “la blockchain”;
- indicar qué fondos/funciones están afectados;
- ofrecer acción segura;
- actualizar en intervalos definidos;
- publicar postmortem para incidentes materiales;
- convertir la explicación técnica en impacto humano.

### 17.4 Knowledge base mínima

- qué es una smart account;
- qué protege una passkey;
- cómo recuperar acceso;
- cómo identificar la red correcta;
- cómo fondear desde cada origen soportado;
- estados de un pago;
- cómo retirar;
- riesgos de Creciendo;
- fees y spreads;
- qué hacer ante sospecha de fraude;
- cómo administrar la cuenta fuera de GatoPago.

---

## 18. Localización, accesibilidad y calidad

### 18.1 Localización real

No basta traducir texto. Por país se define:

- moneda de referencia;
- formato de fecha y número;
- vocabulario financiero;
- documentos admitidos;
- rutas y horarios;
- límites;
- soporte;
- disclosures;
- costumbres de QR/contactos;
- tratamiento fiscal informativo, sin sustituir asesoría.

### 18.2 Accesibilidad

- navegación completa por teclado;
- foco visible accesible: no eliminar globalmente el indicador; diseñarlo para que encaje con la marca;
- contraste WCAG AA como mínimo;
- targets táctiles de 44×44 px;
- estados que no dependan solo de color;
- QR acompañado de dato copiable;
- animación reducida;
- lectores de pantalla para monto, activo y estado;
- lenguaje simple, con detalles técnicos expandibles;
- zoom y tamaños de texto sin romper flujos críticos.

### 18.3 Presupuesto de rendimiento

- interacción primaria responde visualmente en menos de 100 ms;
- animaciones de interfaz apuntan a 60 fps en dispositivos objetivo;
- evitar filtros/blur animados costosos;
- sprites dimensionados y precargados solo cuando corresponda;
- skeletons con geometría final para reducir saltos;
- loops pausados fuera de viewport y con pestaña oculta;
- medir INP, LCP, memoria y consumo en Android de gama media.

---

## 19. Métricas B2C

### 19.1 North star

> **Usuarios protegidos que completan al menos dos movimientos financieros útiles en un periodo de 30 días.**

“Movimiento útil” excluye faucets, autoclicks, vistas, transacciones fallidas y spam de incentivos.

### 19.2 Árbol de métricas

```text
usuarios con ciclo útil mensual
├── adquisición calificada
├── cuenta protegida
├── primer valor
├── repetición
├── profundidad de uso
├── confiabilidad
└── economía sostenible
```

### 19.3 Definiciones iniciales

| Métrica            | Definición                                               |
| ------------------ | -------------------------------------------------------- |
| Cuenta protegida   | Passkey + requisito mínimo de recuperación de la etapa   |
| Fondeado           | Primer saldo legítimo confirmado                         |
| Activado           | Fondeo/recepción + segunda acción útil en 14 días        |
| WAU financiero     | Usuario con una intención monetaria completada en 7 días |
| Retención M1       | Activado que completa movimiento útil entre días 31–60   |
| Success rate       | Intenciones completadas / intenciones válidas iniciadas  |
| Time to value      | Desde registro hasta activación                          |
| Trust recovery     | Usuarios con fallo que vuelven a completar una acción    |
| Take rate efectivo | Ingreso neto / volumen procesado aplicable               |

### 19.4 Umbrales para la beta cerrada

Son hipótesis de decisión, no benchmarks universales:

- ≥70% completa creación de cuenta;
- ≥60% de cuentas fondeadas completa segunda acción en 14 días;
- ≥90% de usuarios entiende que está en testnet en una prueba de comprensión;
- ≥98% de intenciones soportadas termina sin intervención manual en entorno estable;
- 100% de movimientos muestra estado y comprobante trazable;
- 100% de acciones de riesgo tiene simulación y autorización explícita;
- cero pérdidas de fondos atribuibles a defectos conocidos sin mitigación;
- soporte S1/S2 dentro del objetivo durante el piloto.

Antes de mainnet se definen SLO técnicos y financieros más estrictos basados en carga real.

---

## 20. Programa de experimentos

Todo experimento tiene hipótesis, cohorte, métrica primaria, guardrails, duración y decisión.

| Experimento               | Hipótesis                                           | Métrica primaria            | Guardrail / criterio de descarte       |
| ------------------------- | --------------------------------------------------- | --------------------------- | -------------------------------------- |
| Home por estados          | “Disponible/Creciendo/Bolsillos” mejora comprensión | Tarea correcta sin ayuda    | No aumentar errores de envío           |
| Onboarding por intención  | Preguntar “¿qué quieres hacer?” reduce abandono     | Cuenta protegida            | No recolectar datos innecesarios       |
| Primer cobro guiado       | Ruta según origen mejora primer valor               | Activación 14d              | Tickets por red no aumentan            |
| Prueba de recuperación    | Ensayo eleva confianza                              | Recuperación comprendida    | No exponer secretos ni bloquear cuenta |
| Comprobante humano        | Recibos compartibles impulsan retorno               | Share → visita/pago         | No filtrar datos sensibles             |
| Bolsillo Impuestos        | Separación por propósito aumenta retención          | Uso recurrente del bolsillo | No presentarlo como cálculo fiscal     |
| Meli contextual           | La guía visual reduce dudas                         | Completion rate             | No distraer ni bajar comprensión       |
| Referido por ciclo        | Pagar por activación atrae mejor calidad            | Activados por referido      | Fraude y CAC bajo cap                  |
| Card waitlist cualificada | La intención real justifica negociación             | Demanda elegible por país   | No prometer fecha/cobertura            |
| Crecer con simulación     | Riesgo claro no destruye conversión                 | Depósito informado          | Comprensión mínima obligatoria         |
| Regla de separación       | Automatización limitada crea hábito                 | Regla activa 60d            | Pausa/revocación siempre disponible    |
| Precio transparente       | Desglose aumenta confianza                          | Conversión + satisfacción   | No esconder margen en FX               |

Cada resultado produce una de cuatro decisiones: escalar, iterar, mantener limitado o retirar.

---

## 21. Roadmap B2C por puertas, no por fechas ficticias

### Horizonte 0 — ahora a 30 días: verdad y coherencia

- declarar Alpha en Arbitrum Sepolia en todos los puntos críticos;
- retirar “Web3” de la home y usar “Otros activos” como sección secundaria;
- unificar acciones y eliminar duplicados como dos botones Escanear;
- corregir QR y comprobantes descargables;
- pulir skeletons, animaciones y estados de pago;
- completar PWA: iconos, manifest, nombre, colores, screenshots y fallbacks;
- instrumentar embudo básico y errores;
- entrevistar 12–20 usuarios de la cuña;
- publicar fees/riesgos de forma coherente.

**Puerta:** la app comunica exactamente qué es y completa flujos actuales sin contradicciones.

### Horizonte 1 — 31 a 90 días: ciclo útil

- onboarding por intención;
- seguridad y recuperación guiadas;
- home Disponible/Creciendo/Otros activos;
- contactos y comprobantes refinados;
- flujo de agregar desde orígenes soportados;
- Aave como única estrategia guiada;
- soporte y panel de estados;
- cohortes cerradas y entrevistas continuas;
- waitlist Card cualificada.

**Puerta:** usuarios de prueba completan y repiten el ciclo cobrar → segunda acción.

### Horizonte 2 — 3 a 6 meses: piloto de valor real

- auditoría y readiness de mainnet;
- límites conservadores;
- operación de incidentes y reconciliación;
- primer corredor/partner de entrada o salida si es legal y viable;
- bolsillos V1;
- links/checkout como adquisición orgánica;
- beta por invitación en un país/segmento;
- economía por cohorte.

**Puerta:** seguridad, regulación, soporte y unit economics permiten dinero real limitado.

### Horizonte 3 — 6 a 12 meses: hábito y distribución

- pagos recurrentes preparados, nunca irrevocables;
- reglas simples de separación;
- segundo corredor solo si el primero es confiable;
- Card beta si supera su gate;
- programas de comunidad/payroll con Embedded;
- resúmenes mensuales de valor;
- GatoPago Plus solo si hay voluntad de pago demostrada.

**Puerta:** retención y contribución neta mejoran sin incentivos artificiales.

### Horizonte 4 — 12 a 24 meses: cuenta programable

- automatizaciones guiadas limitadas;
- bolsillos compartidos y permisos familiares;
- selección de ruta bajo políticas del usuario;
- Card multi-país mediante programas apropiados;
- merchant payments y devoluciones donde sea viable;
- portable financial identity/receipts con privacidad;
- experiencias embebidas que conservan control del usuario.

**Puerta:** automatizaciones son auditables, reversibles y operables a escala.

### Horizonte 5 — 2028 a 2030: red de dinero personal

Visión, no compromiso:

- una persona puede recibir ingresos desde cualquier partner conectado;
- define reglas sobre uso, reserva, crecimiento y ayuda familiar;
- GatoPago elige rutas permitidas según coste, tiempo y confianza;
- su identidad financiera y comprobantes viajan con ella;
- puede cambiar de interfaz o proveedor sin perder su cuenta;
- empresas pagan a personas sin obligarlas a entender la infraestructura;
- Meli explica por qué el dinero se movió y qué control conserva el usuario.

---

## 22. Apuestas visionarias

### 22.1 Mapa del dinero

Una vista narrativa del recorrido del dinero: de dónde llegó, qué parte está disponible, qué parte crece, qué pagos cubrió y cuánto costó moverlo. No es un explorador de bloques; es un mapa de decisiones financieras.

### 22.2 Pasaporte de cobro

Una identidad portable que contiene métodos compatibles, comprobantes verificables y preferencias de recepción sin publicar el historial completo. Un cliente pregunta “¿cómo te pago?” y recibe una ruta válida para ambos.

### 22.3 Bolsillos vivos

Metas que reaccionan a ingresos bajo reglas del usuario: impuestos, alquiler, emergencia, familia. Meli no decide cuánto ahorrar; muestra el efecto antes de autorizar.

### 22.4 Círculos de confianza

Familias o equipos pequeños con permisos distintos: ver, proponer, aprobar, gastar dentro de un límite o ayudar en recuperación. Sin convertir Personal en un ERP.

### 22.5 Pago con contexto

Un pago lleva concepto, referencia, relación, evidencia y estado; puede conectarse a una factura, grant, entrega o conversación. El valor no es solo mover USDC, sino conservar el significado.

### 22.6 Modo calma

Una experiencia opcional que oculta variaciones, precios y estímulos no necesarios. Muestra únicamente dinero utilizable, obligaciones, metas y acciones seguras. Es una postura de producto contra la ansiedad financiera.

### 22.7 Simulador de futuro

Antes de activar una regla, Card o estrategia, el usuario ve escenarios: “si recibes lo mismo que los últimos tres meses, esta regla separaría aproximadamente…”. Nunca se presenta como predicción garantizada.

### 22.8 Prueba de independencia

Un ritual guiado anual donde el usuario verifica que puede recuperar, exportar y retirar sin depender de un único dispositivo o interfaz. La soberanía se convierte en una experiencia, no en una palabra de marketing.

---

## 23. Riesgos, antimetas y criterios de abandono

| Riesgo                      | Señal temprana                                 | Respuesta                                     |
| --------------------------- | ---------------------------------------------- | --------------------------------------------- |
| Producto bonito sin hábito  | Creación alta, repetición baja                 | Volver al caso de cobro y segunda acción      |
| Complejidad oculta          | Tickets por red/ruta y fondos mal enviados     | Simplificar origen, prevención y soporte      |
| Card devora el roadmap      | Waitlist alta pero economía/issuer débiles     | Mantener discovery y no comprometer launch    |
| DeFi erosiona confianza     | Usuario no entiende tasa/riesgo                | Reducir exposición y reforzar suitability     |
| Incentivos atraen fraude    | Activación solo mientras hay recompensa        | Retirar subsidio y medir cohortes orgánicas   |
| Meli infantiliza            | Usuarios evitan usarla para montos serios      | Ajustar presencia, tono y motion por contexto |
| Dependencia de un proveedor | Incidente bloquea rutas críticas               | Adaptadores, fallback y salida documentada    |
| Promesas regulatorias       | Marketing antecede autorización                | Claims gate legal y geográfico                |
| Demasiados países           | Soporte, liquidez y disclosures inconsistentes | Volver a cohortes país por país               |
| Autocustodia nominal        | Usuario no puede salir sin GatoPago            | Prioridad P0: escape hatch y documentación    |

Abandonar o posponer una capacidad si, tras dos ciclos de mejora:

- no resuelve un trabajo frecuente;
- no alcanza comprensión mínima;
- aumenta pérdidas o soporte de forma desproporcionada;
- depende de subsidios indefinidos;
- no puede operarse legalmente;
- obliga a comprometer control del usuario sin valor superior demostrado.

---

## 24. Equipo y rituales de ejecución

### 24.1 Pods mínimos

- **Personal Core:** cuenta, pagos, actividad, seguridad.
- **Money Movement:** rutas, on/off-ramp, swaps, reconciliación.
- **Growth & Care:** onboarding, lifecycle, contenido, soporte.
- **Risk & Trust:** fraude, seguridad, compliance, incidentes.

En etapa temprana una persona puede cubrir varios roles; las responsabilidades no desaparecen.

### 24.2 Rituales

- revisión semanal de movimientos fallidos;
- cinco conversaciones de usuario por semana durante discovery;
- demo quincenal con flujo completo, no componentes aislados;
- revisión mensual de cohortes y unit economics;
- threat modeling por capacidad sensible;
- claims review antes de publicar;
- postmortem sin culpa tras incidentes materiales;
- reunión trimestral de poda: qué dejar de construir.

### 24.3 Definition of done financiera

Una capacidad que mueve dinero no está terminada hasta tener:

- happy path y fallos;
- idempotencia;
- estados y reconciliación;
- autorización;
- límites;
- observabilidad;
- soporte/runbook;
- accesibilidad;
- copy legal y de riesgo;
- analytics;
- exportación/comprobante;
- criterio de rollback o pausa.

---

## 25. Matriz de afirmaciones públicas

| Afirmación                                         | Estado al corte                               | Uso permitido                              |
| -------------------------------------------------- | --------------------------------------------- | ------------------------------------------ |
| GatoPago es una Alpha                              | Confirmado                                    | Sí                                         |
| La red activa es Arbitrum Sepolia                  | Confirmado en la auditoría técnica disponible | Sí, indicando testnet                      |
| Usa smart account, passkeys y recuperación         | Implementado según documentación técnica      | Sí, con explicación exacta                 |
| Permite pagos, links, QR, usernames y comprobantes | Implementado según documentación técnica      | Sí, validando cada entorno                 |
| Integra depósito/retiro de USDC en Aave            | Implementado según documentación técnica      | Sí, con tasa/riesgo variables              |
| Permite recibir mediante CCTP                      | Implementado según documentación técnica      | Sí, limitado a rutas soportadas            |
| Tiene API/payment intents y dashboard              | Base implementada                             | Sí, como Alpha/sandbox                     |
| Opera en mainnet con dinero real                   | No demostrado                                 | No                                         |
| Ofrece Card                                        | No disponible                                 | Solo “acceso anticipado” o “en desarrollo” |
| Convierte moneda local                             | Depende de futuros partners                   | No como capacidad actual                   |
| Elige siempre la mejor ruta                        | No existe garantía                            | No                                         |
| Tiene rendimiento garantizado                      | Falso                                         | Nunca                                      |
| Está regulado/autorizado como fintech              | No demostrado                                 | No                                         |

---

## 26. Fuentes y señales de mercado

Estas fuentes informan el plan; no sustituyen revisión legal, comercial ni técnica:

- [Global Findex 2025 — World Bank](https://www.worldbank.org/en/publication/globalfindex/report): acceso, uso, pagos, ahorro y seguridad digital en 141 economías.
- [Remittance Prices Worldwide — World Bank](https://remittanceprices.worldbank.org/data-download): estructura y datos de costes de remesas.
- [Stablecoins and the future of onchain finance — Visa](https://corporate.visa.com/en/solutions/crypto/stablecoins/stablecoins-and-the-future-of-onchain-finance.html): usos de stablecoins como reserva, pagos transfronterizos y tarjetas.
- [Stablecoin-linked cards and money movement — Visa](https://www.visa.com/en-us/thought-leadership/innovation/stablecoin-linked-cards-monetize-money-movement): expansión de programas y modelo multi-rail.
- [Gnosis Pay documentation](https://docs.gnosispay.com/): tarjeta stablecoin, self-custody, APIs e integraciones.
- [Understanding self-custody with Gnosis Pay](https://help.gnosispay.com/hc/en-us/articles/39400375822484-Understanding-Self-Custody-with-Gnosis-Pay): módulos, control, salida y KYC.
- [Circle user-controlled wallets](https://developers.circle.com/wallets/user-controlled): autenticación familiar, control del usuario y casos embebidos.
- [Circle account types](https://developers.circle.com/wallets/account-types): smart accounts, batching, gas sponsorship y modelos de custodia.
- [Coinbase smart accounts](https://docs.cdp.coinbase.com/wallets/using-wallets/smart-accounts): ERC-4337, batching y gas sponsorship como infraestructura disponible.
- [Aave — Supply tokens](https://aave.com/help/supplying/supply-tokens): fuente de tasa, dinámica del protocolo y operación de suministro.
- [Takenos](https://takenos.com/), [DolarApp](https://www.dolarapp.com/pt-BR-MX00%3A00/blog/product-releases/what-is-dolarapp) y [Littio](https://littio.co/en/): referencia competitiva de cuentas digitales, transferencias, Card y crecimiento.
- [ASFI — Reglamento para Empresas de Tecnología Financiera](https://www.asfi.gob.bo/node/1176): constitución, funcionamiento y Entorno Controlado de Pruebas en Bolivia.
- [BCB — Informe de vigilancia del sistema de pagos 2025](https://www.bcb.gob.bo/webdocs/publicacionesbcb/2026/05/24/IVSP%202025vf.pdf): incorporación de ETF, instrumentos integrados con activos virtuales, seguridad e interoperabilidad.
- [UIF — normativa externa y PSAV](https://www.uif.gob.bo/index.php/normativa-externa/): obligaciones y registro relacionados con proveedores de servicios de activos virtuales.

---

## 27. Decisión final

El B2C de GatoPago no es la versión pequeña del negocio institucional. Es el lugar donde la infraestructura se convierte en tranquilidad, hábito y afecto de marca.

La secuencia correcta es:

1. hacer impecable el ciclo que ya existe;
2. demostrar control y recuperación;
3. conseguir repetición en una cuña concreta;
4. conectar rutas locales o Card solo con gates cumplidos;
5. añadir bolsillos y reglas limitadas;
6. permitir que Embedded distribuya el ciclo sin diluirlo;
7. evolucionar hacia una cuenta que ayuda al dinero a moverse, sin apropiarse de él.

> **La visión no es que Meli maneje tu dinero. La visión es que puedas enseñarle cómo quieres vivir con él, comprobar cada regla y conservar siempre la última palabra.**
