# Parmelia

**Mueve dinero digital como mandar un mensaje.**

Cobra con links, paga con QR y envía a usernames. Fácil para ti, fácil para quien recibe.

> One-liner: *Parmelia hace que mover dólares digitales se sienta como mandar un mensaje — sin que nadie tenga que entender cripto.*

---

## Qué es

Una app para **mover dinero digital sin fricción**: cobrar, pagar, enviar, guardar y cambiar dólares digitales con **links, QR y usernames**. La complejidad cripto (redes, comisiones de red, direcciones, frases raras) queda escondida; a la vista solo hay acciones humanas.

## El problema

Mover dinero digital sigue siendo difícil, caro y lleno de fricción para la mayoría de las personas y comercios. Para hacer un pago hay que entender redes, comisiones de red, direcciones imposibles y wallets — y el miedo a equivocarse frena la adopción real.

En Bolivia el dolor es concreto: las tarjetas de banco están bloqueadas o limitadas para compras por internet y pagos al exterior, y existe el problema del dólar paralelo. La gente ya usa dólares digitales y pagos con QR a diario; lo que falta es una experiencia simple y de confianza.

## Cómo lo resuelve

Con **abstracción total**: el usuario vive un flujo tipo app normal (entra con su huella o su cara, sin contraseñas ni frases que memorizar, sin pagar comisiones de red), mientras la parte técnica se liquida de forma invisible por debajo. Si sabes mandar un mensaje, sabes usar Parmelia.

## Qué puede hacer hoy un usuario

1. Depositar dólares digitales y cripto (USDC, MON, WBTC) en su cuenta de Parmelia.
2. Enviar dinero a otros usuarios (dentro o fuera de Parmelia), sin comisiones entre usuarios.
3. Crear links de cobro.
4. Generar códigos QR.
5. Pagar desde un link.
6. Pagar a un username (sin direcciones imposibles).
7. Escanear QR para pagos en persona.
8. Ver su historial y descargar comprobantes.

## Próximamente

- Cambiar entre activos (USDC, MON, WBTC) dentro de la app.
- **Earn**: hacer que el saldo trabaje, con consentimiento explícito (rendimientos variables, siempre bajo decisión del usuario).
- Traer dinero desde otras redes y dejarlo listo para usar.
- Retirar a otras redes.
- **Tarjeta de dólares** para compras por internet (vía partner tipo Gnosis Pay).

## Por qué importa

El verdadero problema de cripto no es la infraestructura, es la **experiencia**. Hace unos años esto era técnicamente imposible; hoy las piezas existen (cuentas inteligentes, passkeys, dólares digitales maduros, redes rápidas y baratas). Parmelia es la **capa de usabilidad** que faltaba.

## Qué lo hace diferente

Las wallets tradicionales o de neobancos suelen encerrar al usuario en un ecosistema cerrado. En Parmelia **tu dinero es tuyo de verdad**: solo tú lo mueves (nadie más, ni nosotros), entras con tu huella, y puedes enviar, cambiar o sacar tu dinero cuando quieras, sin pedir permiso. Cada movimiento queda registrado y es verificable.

## Para quién

Bolivia y LATAM: freelancers y creadores que cobran por internet, comunidades y eventos, comercios digitales, y gente que ya usa dólares digitales y QR pero quiere una experiencia simple.

## Modelo de negocio

Parmelia no monetiza el acto básico de enviar dinero entre usuarios (debe sentirse gratis). El ingreso viene de **acciones de valor agregado**: comisión en los cambios entre activos, fee de conveniencia en movimientos entre redes, y participación en el rendimiento de Earn (con consentimiento). A futuro: SDK para que otras apps integren pagos con links/QR/usernames, y liquidación fiat por QR local.

## Estado actual

MVP funcionando en red de pruebas (login, onboarding con passkey, links de cobro, QR, pago a username, historial/comprobantes). Foco actual: validar el flujo con usuarios reales y aterrizar el wedge local.

**Señal temprana:** un solo TikTok al lanzar el MVP alcanzó **56 usuarios y 3.333 vistas**, y **Gnosis Pay** dio visto bueno para una integración de tarjeta piloto.

## Bajo el capó (interno / para builders)

No custodial sobre **Abstracción de Cuentas (ERC-4337)**: cuentas inteligentes desplegadas por factory, firma con **passkeys WebAuthn (P256)**, **gas patrocinado** vía paymaster propio, y recuperación social con guardian + timelock. Backend edge (Cloudflare Workers + D1). Hoy en Monad testnet, pero el código es **portable** (cambiar de red = una entrada de config + desplegar contratos). *Nota de comunicación: estos términos van solo en docs para builders, nunca en la cara pública del usuario.*

## Demo

`https://parmelia.me`
