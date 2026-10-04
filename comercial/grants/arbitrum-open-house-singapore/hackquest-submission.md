# HackQuest · Arbitrum Open House Singapore · GatoPago

> **Errores conocidos en lo que se envió (4 de octubre de 2026; la entrega quedó bloqueada):**
> - El progreso habla de *Arbitrum Open House London*; la entrega era para **Singapore**.
> - Los contratos listados son los V2 de London. Lo vigente es Account V3 (26 de septiembre de 2026), en `danelerr/parmelia-links`, rama `feature/v3`, `contracts/deployments/421614/account-v3/`.
> - Afirma gas patrocinado por un paymaster; el despliegue V3 no incluye paymaster.
> - El enlace del proyecto quedó como gatopago.com en lugar del repositorio.
> - Los vídeos y la categoría SocialFi venían de la entrega de London.
>
> Se conserva como registro de lo enviado, no como texto de referencia.

Texto de la entrega del proyecto en HackQuest, actualizado el 4 de octubre de 2026. Sustituye a la versión firmada como Parmelia. Los datos técnicos (funciones, arquitectura y contratos) se conservan; el texto se reescribió para ser más corto y no repetir ideas entre campos.

Formulario: https://www.hackquest.io/es/projects/setup/18b5af35-1814-469b-8c5e-2748fc5b8759
Imágenes (1280 × 720): `contenido/redes/2026-10/png/hackquest-01.png` a `hackquest-04.png`.

## Nombre

GatoPago

## Introducción (máx. 200 caracteres)

Self-custodial payments on Arbitrum. Get paid with a link or a QR code, send to a username, and skip the seed phrases and gas. Your money stays yours.

## Descripción

GatoPago. Money without borders. Always yours.

**The problem.** Sending money across borders still takes days and costs too much. Stablecoins fix the speed and the cost, but using them today means choosing between an exchange that holds your money and a wallet that expects you to manage seed phrases, gas and networks. Most people give up, or leave their dollars with a custodian.

We start in Bolivia, where people turned to digital dollars during three years of restricted access to bank dollars: transactions with virtual assets grew more than 630% in a year, to USD 294M in the first half of 2025 (Central Bank of Bolivia).

**What it is.** A self-custodial account that works like a payments app. You sign up with a passkey (your fingerprint or face), get paid with a link or a QR code, and send to a username, a QR code or any address. GatoPago never holds the funds: every payment needs your passkey. The backend can submit the transaction and pay the gas, but it can't move money on its own.

**Working today, on Arbitrum Sepolia**

- Sign-up with a passkey, no seed phrase
- Payment links and QR codes
- Payments to a username, a QR code or an address
- Activity with a receipt for every payment, deposit and swap
- In-app swaps with Uniswap routing
- Contacts, push notifications and an installable PWA

**How it works.** ERC-4337 smart accounts authorized by WebAuthn passkeys and deployed at deterministic addresses. A paymaster sponsors gas with signatures that expire after a few minutes. Accounts support several passkeys, batched calls, upgrades and guardian recovery with a 48-hour delay.

**Why Arbitrum.** Low, predictable fees, gas charged for what you use, EIP-712, a canonical and verified ERC-4337 EntryPoint, and liquidity for swaps. Everything is ready to move from Sepolia to Arbitrum One.

**Next** (not part of this submission): cash-out to Bolivian bolivianos with a regulated partner, then PIX; yield on idle balances; a card; and a payments API for merchants and apps.

**Contracts (Arbitrum Sepolia, 421614)**

- EntryPoint v0.9: 0x433709009B8330FDa32311DF1C2AFA402eD8D009
- ERC7913WebAuthnVerifier: 0xb7fA10dEe75042D6973676A7d7882e4621B806d6
- AccountWebAuthnV2 (implementation): 0xa450bc49a0dA738FA348445980b542d78A22527e
- AccountFactoryV2: 0x75c7761dcED5F8eCc708E750bDe5CA7d4557EDEB
- ParmeliaPaymaster: 0x31f357a64cF5899da21337f0D9e28ef8D6385753
- Explorer: https://sepolia.arbiscan.io/address/0x75c7761dcED5F8eCc708E750bDe5CA7d4557EDEB

gatopago.com · @gatopago

## Progreso del hackathon

GatoPago existed before the buildathon as a generic prototype, under the name Parmelia and on another chain. During Arbitrum Open House London I moved it to Arbitrum and rebuilt it for real users.

**Contracts.** Deployed and verified the V2 stack on Arbitrum Sepolia: WebAuthn verifier, account factory and paymaster. Deterministic CREATE2 addresses; several passkeys per account, batched execution, upgrades and guardian recovery with a 48-hour timelock; paymaster signatures that expire so they can't be replayed; compiler tuning to keep the account under the 24 KB limit.

**App.** A mobile-first flow for sending, charging, QR codes, swaps, statements, contacts and receipts. History read from a ledger, with a cron job that picks up deposits made outside the app. Swaps routed through Uniswap. An installable PWA with push notifications.

**Backend.** A Cloudflare Worker with D1, RPC failover, Turnstile, passkey and email-link login, analytics, and tests for the parts that handle money: swap encoding, fees, slippage, validation and the paymaster.

After the buildathon the project was renamed GatoPago. Everything listed above works and can be demoed; the roadmap items are plans.

## Estado de financiación

Bootstrapped. Open to Arbitrum ecosystem grants and milestone-based support.

## Detalles de despliegue (solo para jueces)

Arbitrum One · Testnet. Contratos de la lista anterior y el enlace al explorador.

## Enlaces del formulario

- Enlace MVP: https://gatopago.com
- Enlace del proyecto: https://gatopago.com
- X: @gatopago
