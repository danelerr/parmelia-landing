# Parmelia

**Move digital money like sending a message.**

Get paid with links, pay with QR, and send to usernames. Easy for you, easy for whoever's on the other side.

> One-liner: *Parmelia makes moving digital dollars feel like sending a message — without anyone needing to understand crypto.*

---

## What it is

An app to **move digital money without friction**: receive, pay, send, hold, and swap digital dollars using **links, QR codes, and usernames**. The crypto complexity (networks, network fees, addresses, seed phrases) stays hidden — all that's left on the surface are human actions.

## The problem

Moving digital money is still hard, expensive, and full of friction for most people and merchants. To make a payment you have to understand networks, network fees, impossible addresses, and wallets — and the fear of making a mistake holds back real adoption.

In Bolivia the pain is concrete: bank cards are blocked or limited for online and international purchases, and there's the parallel-dollar problem. People already use digital dollars and QR payments every day; what's missing is a simple, trustworthy experience.

## How it solves it

With **full abstraction**: the user gets a normal-app experience (sign in with their fingerprint or face — no passwords or phrases to memorize, no network fees to pay) while the technical part settles invisibly underneath. If you can send a message, you can use Parmelia.

## What a user can do today

1. Deposit digital dollars and crypto (USDC, MON, WBTC) into their Parmelia account.
2. Send money to other users (inside or outside Parmelia), with no fees between users.
3. Create payment links.
4. Generate QR codes.
5. Pay from a link.
6. Pay a username (no impossible addresses).
7. Scan QR codes for in-person payments.
8. View history and download receipts.

## Coming next

- Swap between assets (USDC, MON, WBTC) inside the app.
- **Earn**: put your balance to work, with explicit consent (variable yield, always the user's choice).
- Bring money from other networks and have it ready to use.
- Withdraw to other networks.
- **A dollar card** for online purchases (via a partner like Gnosis Pay).

## Why it matters

Crypto's real problem isn't the infrastructure — it's the **experience**. A few years ago this was technically impossible; today the pieces exist (smart accounts, passkeys, mature digital dollars, fast and cheap networks). Parmelia is the **usability layer** that was missing.

## What makes it different

Traditional and neobank-style wallets tend to trap users inside a closed ecosystem. With Parmelia, **your money is truly yours**: only you move it (no one else, not even us), you sign in with your fingerprint, and you can send, swap, or withdraw whenever you want — no permission needed. Every movement is recorded and verifiable.

## Who it's for

Bolivia and LATAM: freelancers and creators who get paid online, communities and events, digital merchants, and people who already use digital dollars and QR but want a simple experience.

## Business model

Parmelia doesn't monetize the basic act of sending money between users (that should feel free). Revenue comes from **value-added actions**: a fee on swaps between assets, a convenience fee on cross-network movements, and a share of Earn yield (with consent). Down the road: an SDK so other apps can embed link/QR/username payments, and local fiat settlement via QR.

## Current status

Working MVP on testnet (login, passkey onboarding, payment links, QR, pay-by-username, history/receipts). Current focus: validate the flow with real users and nail the local wedge.

**Early signal:** a single TikTok at MVP launch reached **56 users and 3,333 views**, and **Gnosis Pay** gave a green light for a pilot card integration.

## Under the hood (internal / for builders)

Non-custodial on **Account Abstraction (ERC-4337)**: smart accounts deployed by factory, signing with **WebAuthn passkeys (P256)**, **sponsored gas** via an in-house paymaster, and social recovery with guardian + timelock. Edge backend (Cloudflare Workers + D1). Currently on Monad testnet, but the code is **portable** (switching networks = one config entry + deploying contracts). *Comms note: keep these terms in builder docs only — never in the user-facing surface.*

## Demo

`https://parmelia.me`
