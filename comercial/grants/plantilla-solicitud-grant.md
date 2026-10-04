# Plantilla de solicitud de grant

**Uso:** copiar este archivo a `comercial/grants/<convocatoria>/solicitud.md` y completar los `[corchetes]`. El texto base sale de la [narrativa de octubre de 2026](../../estrategia/vigente/gatopago-narrativa-2026-10.md); adaptarlo a las preguntas exactas de cada convocatoria.
**Idioma:** casi todas las convocatorias piden inglés. Cada sección tiene una versión en inglés lista para adaptar.

## Reglas

- Solo se comprometen entregables que el equipo puede construir y demostrar dentro del plazo.
- **La tarjeta no se incluye como entregable.** Es un proyecto paralelo que depende de proveedores (narrativa del 18 de agosto de 2026).
- Lo que no está en producción se dice como plan. Hoy: alpha en testnet con fondos de prueba.
- Nunca prometer rendimientos.
- Para fondos de ecosistema sí se puede hablar de tecnología: aquí va el detalle que no va en el deck principal.

---

## 1. Resumen del proyecto

**ES:** GatoPago es una cuenta autocustodia y programable para cobrar, guardar y mover dinero entre países de forma sencilla, sin encerrar a nadie en un ecosistema. Empezamos en Bolivia, donde el dólar digital ya se abrió paso, y llevamos a personas que nunca usarían cripto a USDC y DeFi, sin frases semilla ni gas a la vista.

**EN:** GatoPago is a self-custodial, programmable account to get paid, save and move money across borders, simply and without locking anyone into an ecosystem. We start in Bolivia, where digital dollars have already taken hold, and bring people who would never use crypto to USDC and DeFi, with no seed phrases and no visible gas.

**Título sugerido:** `[GatoPago on <red>: Programmable USDC Accounts for Latin America]`

## 2. El problema

**ES:** Tu dinero no debería detenerse en la frontera. Hoy un mensaje cruza en segundos; el dinero tarda días y pierde una parte por el camino. Cripto ya puede moverlo, pero obliga a elegir: apps custodiales fáciles que guardan tu dinero, o wallets autocustodia que son tuyas pero difíciles.

**EN:** Your money shouldn't stop at the border. A message crosses in seconds; money takes days and loses part of itself on the way. Crypto can already move it, but forces a choice: easy custodial apps that hold your money, or self-custodial wallets that are yours but hard to use.

**Datos de apoyo** (con fuentes en [bolivia-datos-2026-10.md](../../estrategia/investigacion/bolivia-datos-2026-10.md)):
- Transacciones con activos virtuales en Bolivia: USD 294 M en el primer semestre de 2025, más de un 630 % más que el año anterior (BCB).
- Remesas recibidas en 2025: USD 1.259 M (BCB).

## 3. La solución y por qué esta red

**ES:** Una cuenta inteligente controlada por el usuario, con acceso por passkeys, recuperación con guardianes, gas patrocinado, enlaces y QR de cobro, comprobantes, y acceso guiado a DeFi.

**EN:** A user-controlled smart account with passkey access, guardian recovery, sponsored gas, payment links and QR codes, receipts, and guided DeFi access.

**Por qué esta red:** `[por qué la red de la convocatoria: USDC nativo, liquidez, herramientas de account abstraction, comunidad en LATAM, socios como bundlers o paymasters]`

**Qué gana el ecosistema:**
- usuarios nuevos que llegan a la red sin saber que están en ella;
- volumen de USDC y uso de protocolos DeFi de la red;
- `[código abierto o componentes reutilizables, si aplica]`;
- un caso de uso real en América Latina.

## 4. Estado actual

Implementado en la alpha (Arbitrum Sepolia, fondos de prueba):
- cuenta inteligente ERC-4337 con varias passkeys;
- operaciones en lote y gas patrocinado;
- recuperación con guardianes y periodo de espera;
- pagos, enlaces, QR, nombres de usuario, contactos, comprobantes y actividad;
- swap y USDC en Aave V3;
- recepción desde wallets y exchanges, y CCTP;
- payment intents, eventos y webhooks firmados;
- entorno de pruebas para desarrolladores.

`[completar: métricas de la alpha, enlace a la demo y repositorio público si existe]`

## 5. Hitos y entregables

Cada hito debe poder verificarse desde fuera (demo, contrato desplegado, métrica pública).

| Hito | Entregable verificable | Plazo | Importe |
|---|---|---|---|
| 1. Integración en testnet | `[despliegue en la testnet de la red, flujo de cobro y envío con gas patrocinado]` | `[semanas]` | `[USD]` |
| 2. Lanzamiento en mainnet | `[contratos auditados o revisados en mainnet, USDC nativo]` | `[semanas]` | `[USD]` |
| 3. DeFi guiado | `[integración con un protocolo de la red, con avisos de riesgo]` | `[semanas]` | `[USD]` |
| 4. Piloto en América Latina | `[N usuarios activos en Bolivia, N operaciones]` | `[semanas]` | `[USD]` |

## 6. Presupuesto

| Partida | Importe | Detalle |
|---|---|---|
| Desarrollo | `[USD]` | `[horas o personas]` |
| Seguridad y auditoría | `[USD]` | `[revisión externa]` |
| Infraestructura (bundler, paymaster, RPC) | `[USD]` | `[proveedores]` |
| Piloto y soporte | `[USD]` | `[gas patrocinado, soporte en español]` |
| **Total** | `[USD]` | |

## 7. Equipo

`[Nombre · rol · experiencia relevante en una línea · enlace]` por persona.

## 8. Métricas de éxito

- `[cuentas creadas en la red]`
- `[volumen de USDC movido]`
- `[usuarios que usan DeFi a través de GatoPago]`
- `[retención a 30 días]`

## 9. Riesgos y cómo los gestionamos

| Riesgo | Mitigación |
|---|---|
| Seguridad de los contratos | Auditoría antes de mainnet; límites iniciales |
| Regulación de las salidas a moneda local | Solo con partners regulados; fuera del alcance del grant |
| Riesgo de los protocolos DeFi | Integraciones limitadas, avisos claros y sin promesas de rendimiento |

## 10. Enlaces

- Web: gatopago.com
- Demo: `[enlace]`
- Deck: `[exportar el deck vigente a PDF]`
- One-pager: [gatopago-one-pager-2026-10.pdf](../partners/gatopago-one-pager-2026-10.pdf)

---

## Convocatorias en curso

| Convocatoria | Estado | Carpeta |
|---|---|---|
| Avalanche / Team1 Community Grant: «GatoPago on Avalanche: Programmable USDC Accounts» | En preparación según la narrativa de agosto de 2026 `[confirmar estado]` | `[crear avalanche-team1/]` |
