# GatoPago: modernización de producto y arquitectura

**Fecha de revisión técnica:** 3 de agosto de 2026  
**Última organización documental:** 23 de agosto de 2026  
**Estado:** referencia técnica; el código y la configuración ejecutable prevalecen  
**Alcance:** frontend, backend, contratos, observabilidad, seguridad y operaciones del producto

Este documento separa tres cosas que no deben confundirse: mejoras ya
implementadas, capacidades que el repositorio ya tiene y apuestas futuras que
requieren diseño, auditoría o acuerdos comerciales. No es una promesa de
producción ni una certificación de seguridad.

## Cambios implementados en esta revisión

- Inicio `cache-first`: una cuenta conocida abre con el último read model local
  y revalida `/home` en segundo plano. La UI ya no espera un segundo request
  duplicado al montar Home.
- Perfil compartido: Receive, Binance, QR y Settings consumen el read model de
  cuenta ya cargado en vez de bloquear cada pantalla con `/user/profile`.
- Estados de carga estructurales: skeletons que anticipan el layout final en
  cuenta, ahorro, depósitos y configuración; se reserva el spinner para tareas
  cortas que realmente bloquean una acción.
- Sistema de notificaciones propio y pequeño: se retiró `sileo` del cliente. El
  bundle dejó de incluir su chunk de aproximadamente 144 KB sin comprimir / 47
  KB gzip.
- Home con jerarquía explícita: saldo, dos acciones primarias, tres utilidades y
  actividad reciente. Escanear tiene icono y texto. No se añadió barra inferior.
- Navegación atrás coherente: vuelve a la entrada real cuando existe historial y
  usa una ruta segura cuando la pantalla se abrió directamente.
- QR interoperable: enlaces GatoPago, direcciones EVM, ERC-681 y CAIP-10. Antes
  de enviar se muestra dirección completa, estándar detectado, clasificación de
  la cuenta y red seleccionable. El QR nunca ejecuta calldata arbitrario ni
  acepta silenciosamente monto, gas o una aprobación codificada por terceros.
- Cross-chain: el resumen mostrado se genera después de preparar la operación
  exacta; enseña monto, destinatario, red, acciones, comisiones, recepción
  estimada, tiempo e identificador de firma. La confirmación posterior muestra
  una línea de tiempo fuente → Circle → destino y sigue operaciones Standard
  durante un periodo compatible con su latencia real.
- Binance: Android usa un intent restringido al paquete oficial
  `com.binance.dev`; iOS usa el Universal Link verificado de `app.binance.com`.
  Se eliminó la ruta interna no documentada que causaba “This link does not
  work”. Un retiro prellenado en un solo paso requiere la integración comercial
  Binance Onchain Pay; no debe simularse inventando rutas privadas.
- Componentes reutilizables añadidos: `AccountLaunchScreen`, `NoticeCard`,
  `CrosschainTimeline`, `DetailPageSkeleton`, `SettingsSection` y
  `ToastViewport`.

Estándares ya aplicados en QR:
[ERC-681](https://eips.ethereum.org/EIPS/eip-681) y
[CAIP-10](https://standards.chainagnostic.org/CAIPs/caip-10).

## Rendimiento y carga de cuenta

La ruta de lectura de Home se mantiene sobre D1/read models y la verificación
automática confirma que no importa ni llama RPC. Esto desacopla la cantidad de
usuarios que abren Home de la cantidad de lecturas onchain.

Presupuesto medido después de los cambios:

- Cliente: 50 chunks, 299,099 bytes gzip en total.
- Chunk de entrada propio: ~32.5 KB gzip.
- React/router: ~74.1 KB gzip; Firebase Auth: ~42.0 KB gzip.
- QR fallback (`jsQR`): ~47.5 KB gzip, pero sigue lazy y solo se descarga cuando
  el navegador no tiene `BarcodeDetector` nativo.
- Build: 181 módulos transformados, frente a 577 antes de retirar la dependencia
  pesada de notificaciones.

La primera sesión en un dispositivo aún debe cargar Firebase y restaurar la
identidad; eso no puede sustituirse por datos locales sin degradar seguridad.
Las aperturas posteriores sí aprovechan IndexedDB y ETag. La siguiente mejora
medible sería autoalojar/subsetear fuentes y medir Core Web Vitals con tráfico
real; no se deben declarar LCP/INP de producción sin telemetría.

## CROPS

CROPS significa Censorship Resistance, Open Source, Privacy y Security. Es un
conjunto de principios del [mandato de Ethereum
Foundation](https://ethereum.org/foundation/mandate), no una certificación que
una aplicación pueda “aprobar” de manera binaria.

| Principio | Estado de GatoPago | Evidencia y brecha principal |
| --- | --- | --- |
| Censorship resistance | Parcial | La cuenta es autocustodiada y los fondos liquidan onchain, pero Firebase, Worker, relayer/paymaster, RPC y proveedores de attestation son puntos de disponibilidad/control. Falta un camino de salida documentado para operar o recuperar fondos sin el frontend/relayer de GatoPago. |
| Open source | No demostrable hoy | El código está disponible en este árbol, pero no existe un archivo `LICENSE` en la raíz. Publicar el repositorio y elegir una licencia libre real es requisito antes de afirmar este principio. |
| Privacy | Parcial-bajo | El botón de ocultar saldo es privacidad visual, no onchain. Direcciones y transferencias EVM son públicas; identidad, relación UID-wallet y push tokens son metadatos sensibles. Hace falta política de minimización/retención, exportación/borrado y un threat model de correlación. |
| Security | Parcial-fuerte técnicamente | Hay passkeys/smart accounts, separación de roles, idempotencia, read models, allowlists y pruebas. Antes de mainnet/B2B hacen falta auditoría externa de contratos, threat model publicado, gestión/rotación de claves, pruebas de recuperación y respuesta a incidentes. |

Conclusión CROPS: GatoPago avanza en autocustodia y seguridad, pero no debe
presentarse todavía como “CROPS-compliant”. Las prioridades son licencia,
escape hatch/recuperación independiente, minimización de metadatos y auditoría.

## Firma legible y estándares modernos

La revisión exacta implementada ahora mejora la UX, pero la passkey todavía
firma el hash de una UserOperation. La interfaz puede explicar fielmente lo que
preparó el servidor, pero no convertir por sí sola ese hash en una garantía
criptográfica de texto legible.

Orden recomendado:

1. Generar y validar un manifiesto interno de intención junto con cada UserOp;
   la UI debe decodificar el calldata y comprobar localmente que monto,
   destinatario, token, red y contratos coinciden antes de habilitar la passkey.
2. Adoptar [EIP-712](https://eips.ethereum.org/EIPS/eip-712) donde existan
   mensajes offchain: dominio, chain ID, contrato verificador, nonce y deadline.
3. Publicar descriptores de clear signing para los contratos de GatoPago cuando
   el borrador [ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) y las wallets
   objetivo sean compatibles. No publicar descriptores sin ligar direcciones y
   versiones exactas.
4. Evaluar [ERC-7739](https://eips.ethereum.org/EIPS/eip-7739) para firmas
   legibles de smart accounts, recordando que sigue Draft y supone cambios de
   contrato/compatibilidad, no solo frontend.
5. Exponer capacidades de batch/status a dapps mediante el estándar final
   [EIP-5792](https://eips.ethereum.org/EIPS/eip-5792) únicamente si GatoPago se
   convierte en un proveedor de wallet; internamente ya agrupa llamadas con
   account abstraction.
6. Investigar [ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) en una rama
   separada de privacidad. Stealth addresses requieren nuevas claves de vista y
   gasto, escaneo de anuncios, recuperación y estrategia regulatoria; no son un
   switch seguro para la cuenta actual.
7. Seguir [ERC-7683](https://eips.ethereum.org/EIPS/eip-7683) como posible capa
   de intents cross-chain futura. CCTP directo sigue siendo más simple y
   verificable para USDC hoy.

## Competencia B2B

GatoPago ya tiene una base B2B poco común para una wallet temprana: API `/v1`,
payment intents idempotentes, links de pago, PaymentRouter no custodial,
webhooks HMAC con outbox/reintentos/reenvío, eventos inmutables, sandbox,
OpenAPI y dashboard con claves, cobros y webhooks.

No está lista para venderse como infraestructura bancaria o enterprise hasta
cerrar estas brechas:

1. Versión y política de compatibilidad de API, SDKs oficiales y sandbox
   aislado con datos de prueba reproducibles.
2. Organizaciones, miembros, RBAC, aprobación dual, límites por usuario/equipo y
   trazabilidad de cambios administrativos.
3. SLA/SLO, status page, métricas de entrega, export/reconciliación contable,
   retención y replay de eventos configurable.
4. Refunds, cancelaciones operativas, facturas, payouts masivos y reportes.
5. Auditoría de contratos e infraestructura, pentest, rotación de secretos,
   disaster recovery y runbooks verificados.
6. Estrategia legal por mercado: KYB/KYC/AML, sanciones, impuestos, tratamiento
   de stablecoins y límites entre software autocustodiado y servicio financiero.

## Nuevos productos con mejor encaje

- Cobros stablecoin API-first para comercios, marketplaces y SaaS.
- QR POS interoperable y links con conciliación automática.
- Payouts a proveedores, creadores y nómina internacional con aprobación dual.
- Tesorería de equipos: roles, presupuestos, listas permitidas y ahorro Aave con
  política explícita de riesgo.
- Suscripciones mediante permisos acotados por monto/periodo, nunca allowances
  ilimitados opacos.
- Cuentas familiares/empresariales con guardianes y políticas de recuperación.
- On-ramp directo a USDC usando Binance Onchain Pay u otro partner regulado,
  manteniendo el destino autocustodiado.
- Smart wallet con tarjeta: producto viable solo con emisor/BIN sponsor,
  autorización en tiempo real, ledger de disponibilidad, conversión/off-ramp,
  chargebacks, fraude y compliance. La tarjeta debe ser una capa sobre la cuenta,
  no convertir a GatoPago en custodio accidentalmente.

## Secuencia recomendada

- Fase 1: estabilizar esta UX, medir Core Web Vitals y tiempos de saldo/settlement
  en producción, terminar auditoría externa y licencia.
- Fase 2: intención decodificada/verificada localmente, RBAC B2B, reconciliación,
  observabilidad y SDKs.
- Fase 3: on-ramp partner y payouts; luego piloto de tarjeta con un emisor.
- Investigación paralela, sin bloquear producto: ERC-7730/7739, privacidad
  ERC-5564 e intents ERC-7683.

Una arquitectura “tecnología de punta” no consiste en sumar todos los estándares:
consiste en una cuenta portable, acciones legibles, fondos recuperables, lectura
rápida desde modelos propios y dependencias externas sustituibles.
