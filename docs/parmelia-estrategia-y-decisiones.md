# Parmelia / AvaSettle — Memo de estrategia y decisiones

**Fecha:** Junio 2026 · Autor: análisis con Claude (rol: analista de producto/negocio + inversor)
**Para:** Daniel Cueto

> Documento para recordar la conversación estratégica: el diagnóstico, las decisiones y el plan. No es asesoría legal ni financiera formal.

---

## TL;DR — la decisión

1. **Parmelia como app de pagos para consumidores no es viable solo y sin capital.** 8 rechazos del mismo pitch = el mercado diciéndote que el wedge está mal. No es tu capacidad ni tu código; es el encuadre.
2. **Tu apuesta más fuerte es AvaSettle** (infra B2B de settlement de stablecoins, Avalanche). Más validación, mejor founder-market fit, juego ganable.
3. **El patrón a corregir no es de ideas: es de follow-through.** Empiezas, sacas señal, y abandonas para empezar otra cosa.
4. **Tu trabajo en el Banco Ganadero es tu foso para AvaSettle** — y a la vez una zona legal sensible. Cuídala.

---

## Situación

- Parmelia: MVP sólido (AA/ERC-4337 + passkeys + gasless + recovery), pero **estancado desde marzo por falta de motivación**.
- **8+ rechazos**: incubadoras, aceleradoras, escuelas de startups, mentorías, capital semilla.
- Llamada con **Elton (Monad Foundation)**: dura pero correcta. Monad solo ofreció gas de testnet (no grant).
- **AvaSettle**: con **mil veces menos esfuerzo** → **Top 5 + premio $300** en la Hackathon LatAm Institucional de Avalanche, como equipo individual.
- Trabajas full-time como **desarrollador en el Banco Ganadero**.

---

## Diagnóstico honesto: por qué te rechazan

Es el **mismo rechazo 8 veces**, y coincide con Elton:

- **"On-chain / no custodial" no es diferenciador para el consumidor.** Le da igual. Solo quiere mover plata de A a B barato y confiable.
- **Pagos = confianza + regulación (KYC/AML) + distribución + volumen.** Ninguna la tienes hoy; las cuatro tardan años y capital.
- Incumbentes ya ganando: **Belo** (MasterCard, cientos de millones), **Lemon** (domina Argentina), **Meru** ($13M+, rieles locales). En el ángulo cripto-nativo, **Peanut** ya hace casi tu mismo producto, más avanzado y financiado.
- Tu modelo (swaps) **necesita volumen masivo** que sin distribución no llega.
- Un VC apuesta a 10–100x: "otra wallet de pagos no-custodial en LATAM" no tiene esa historia frente a los incumbentes.

**No es opinión contra ti: elegiste el mercado más competitivo, regulado y dependiente de distribución, para atacarlo solo y sin capital.**

---

## Tus activos reales (NO tirar)

1. **Infra técnica construida**: detección de pagos on-chain, conciliación, AA/gasless, payouts. → Es el **core de AvaSettle**.
2. **Skill Web3 full-stack demostrable** (shippeaste un MVP no-custodial real, solo).
3. **Red y contexto local**: organizas el Ethereum Bolivia Buildathon, hub lead UNIFRANZ (dev3pack), y trabajas dentro de un banco (TradFi + Web3 + QR local + problema del dólar paralelo).
4. **Canal de distribución probado**: 1 TikTok al lanzar el MVP → **56 usuarios, 3.333 vistas** (luego no le diste seguimiento).

---

## La señal: AvaSettle > Parmelia

| | Parmelia (consumer) | AvaSettle (B2B/infra) |
|---|---|---|
| "On-chain importa" | No, al consumidor | **Sí**, a una institución (conciliación/auditoría/settlement) |
| Competencia | Belo/Lemon/Meru/Peanut por millones de usuarios | 1–3 **design partners**, nicho LATAM-institucional más abierto |
| Confianza/regulación | Tú la cargas | Tu **cliente** ya la tiene; tú das la plomería |
| Ventaja injusta | Ninguna clara | **Trabajas dentro de un banco** = la expertise que pedía Elton |
| Validación | 8 rechazos | **Top 5 solo + premio** |
| Esfuerzo→resultado | Mucho → poco | Poco → mucho |

**El core técnico de Parmelia ES el módulo pay-in/payout de AvaSettle.** Los meses de Parmelia no se tiran: se **re-apuntan**.

> Honestidad: AvaSettle es el **mejor lead, no una victoria asegurada**. Top 5 = jueces, no clientes. La próxima prueba real es **1 institución que se comprometa a un piloto (design partner / carta de intención)**. B2B a bancos es lento; pero necesitas el primero, no millones.

---

## El patrón a corregir: follow-through

- Parmelia: TikTok 56 usuarios → **abandonado**.
- AvaSettle: Top 5 + premio → **abandonado**.
- Gnosis Pay: visto bueno → **estancado**.

**Tu problema #1 no son ideas ni talento: es rematar.** Sacas la chispa y arrancas algo nuevo (o aplicas a otro programa) en vez de terminar lo que ya picó. Eso explica la falta de motivación. La cura: **elegir UNA y terminarla antes de empezar/aplicar a nada más.**

---

## Contrato Banco Ganadero (no es asesoría legal)

**A tu favor:**
- **Propiedad intelectual (9ª):** el banco es dueño de lo hecho **"a favor del BANCO"**, no de todo lo que crees. Proyecto personal en tu tiempo/recursos → arguablemente no cubierto.
- **Exclusividad (10ª):** prohíbe otra ocupación **"en horas de trabajo"**. Noches/fines de semana → arguablemente permitido.

**Zona roja (justo la de AvaSettle):**
- **Confidencialidad + secreto bancario (8.5, 12ª, Art. 472 LSF) + Código de Ética (14ª):** no usar información, sistemas ni **clientes** del banco; no usar tu posición para beneficio personal.

**Qué hacer:**
1. Construir **solo en tu tiempo y equipo** (nunca horas/red/dispositivos del banco).
2. **Cero info confidencial del Ganadero** en AvaSettle.
3. **No usar al Banco Ganadero ni a sus clientes como primer design partner.** Apuntar a **otras** instituciones (salvo waiver escrito del banco).
4. Abogado revisa 9ª/10ª; **pedir al banco un waiver/autorización escrita** del proyecto personal no competidor.

---

## Mapa: oportunidad → proyecto

| Oportunidad | Proyecto | Por qué | Prioridad |
|---|---|---|---|
| **Avalanche Retro9000** | **AvaSettle** | Construido + Top 5 en Avalanche; el retro premia lo hecho con reconocimiento | 🔴 Alta |
| **Avalanche Founder School** | **AvaSettle** | Pitch B2B institucional + fundador en un banco = mucho más fuerte que el consumer rechazado 2× | 🔴 Alta |
| **dev3pack bridge** | **AvaSettle** (canal) | Para conseguir **design partners**, no como grant | 🟠 Media |
| **Buildathon Arbitrum** | **Parmelia** | Caza de premio de cero esfuerzo (ya existe, portable). Sin peso emocional. Si cuesta energía → saltar | 🟢 Baja |
| **Arbitrum Fuel (gas)** | **Parmelia** (si acaso) | Gas subsidiado sirve a consumer alto-volumen; AvaSettle es Avalanche/B2B. Sin usuarios = poco sentido | 🟢 Baja/opcional |
| **Monad** | — | **Abandonar**. Solo gas de testnet | ⛔️ |
| **Gnosis Pay (tarjeta)** | **Parmelia** (consumer) | Lead consumer real, pero cancha llena + necesita empresa. Experimento secundario *permissionless*; empresa solo si validas demanda | 🟡 Secundaria |
| **Arbitrum Mentorship** | — | Ya rechazado | ⛔️ |

**Regla:** todo lo 🔴 es **AvaSettle**. Lo de Parmelia son "tiros gratis de bajo esfuerzo" que no deben robar foco.

---

## Plan / disciplina (próximas semanas)

1. **Abogado:** revisar 9ª/10ª + pedir waiver escrito al banco.
2. **Una apuesta: AvaSettle.** Aplicar a **Retro9000 + Founder School** (ya están listos, solo redactar).
3. **Remata:** conseguir **1 design partner** (institución que NO sea el Ganadero) vía dev3pack/tu red. Meta única.
4. Tiros gratis (buildathon/gas con Parmelia): solo si es copiar-pegar; si dudas, saltar.
5. **No aplicar a nada nuevo** hasta tener el design partner o un "no" claro. Cerrar el ciclo antes de abrir otro.

---

## La barra de validación real

No decidas por ánimo (ya te falló). Decide con datos:

- **AvaSettle:** ¿una institución firma una carta de intención / piloto? → dobla. Si nadie, ni con tu ventaja → repurpose (infra/empleo/grant técnico), sin culpa.
- **Mantén el empleo como runway.** Vas a AvaSettle por las noches/fines hasta tener un design partner que justifique ir full-time.

> El cambio de mentalidad: dejaste de buscar usuarios/clientes y empezaste a coleccionar aplicaciones a programas. Deja de tocar puertas de porteros; camina por la que ya se abrió (AvaSettle) y **remátala**.
