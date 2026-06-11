# Parmelia — Manual de Marca y Sistema de Diseño

**Versión 2.0 · Junio 2026**

Este documento es la **fuente única de verdad** del diseño de Parmelia. Define la marca, el sistema de diseño y **cómo aplicarlo a la interfaz de la app** (no solo a la landing). Está escrito para que cualquiera —diseñador, desarrollador o agente de IA— pueda construir o rediseñar pantallas que se sientan inequívocamente Parmelia, sin tener que adivinar.

> **Regla de oro:** lo único irremplazable de la marca son sus **tres colores pastel** y su **logo (el stack)**. Todo lo demás (tipografía, fondos, degradados, animaciones) es un sistema vivo que puede evolucionar mientras respete estos principios.

**Índice**
- Parte I — Marca (esencia, logo, color, tipografía, voz)
- Parte II — Sistema de diseño (tokens, espaciado, elevación, radios, motion, componentes)
- Parte III — Aplicar a la app (migración, shell, componentes de app, pantalla por pantalla, reglas UX)
- Parte IV — Implementación (tokens listos para pegar, checklist para IA/devs, do/don't)
- Apéndice

---

# PARTE I — MARCA

## 1. Esencia

### Qué es Parmelia
Una app para **mover dinero digital sin fricción**: cobrar, pagar, enviar, guardar y cambiar dólares digitales con **links, QR y usernames** — sin que nadie tenga que entender cripto.

Por debajo es infraestructura no custodial (Abstracción de Cuentas / ERC-4337, passkeys, gas patrocinado, sobre Monad). **Esa parte es invisible para el usuario.**

### Posicionamiento
> **Mueve dinero digital como mandar un mensaje.**

Apoyo: **Cobra con links. Paga con QR. Envía a usernames.**

### Para quién
Bolivia y LATAM: freelancers y creadores, comunidades y eventos, comercios digitales, gente que ya paga con QR a diario, y usuarios cripto que quieren simpleza.

### Tesis
El mayor problema de cripto no es la infraestructura, es la **experiencia**. Parmelia esconde la complejidad (gas, redes, direcciones, frases semilla) y deja a la vista solo **acciones humanas**.

### Personalidad
Simple · Cercana · Directa · Humana · Optimista · Confiable.
Se siente como una **app de pagos amable y seria** — no un exchange, ni un banco, ni un protocolo DeFi. Premium pero accesible.

### El reto de confianza (clave para la app)
El producto vive de **links de pago**. Un link puede parecer phishing. Por eso la UI debe verse **inconfundiblemente Parmelia, predecible y segura**: marca visible, quién recibe y cuánto siempre claros, y micro-estados honestos durante la latencia de la red.

---

## 2. Logo — el stack

Tres rombos apilados en perspectiva isométrica, cada uno en un pastel de marca:

- Capa superior — **Sky** `#A7D4DE`
- Capa media — **Pink** `#DEA6BC`
- Capa base — **Cream** `#DED9A6`

Representa capas de valor que se mueven y encajan. Es el único elemento gráfico obligatorio.

**Specs:** SVG maestro (`Logo_parmelia.svg`, `viewBox 0 0 171 198`) · proporción ≈ **0.863 : 1** · tamaño mínimo **24px** de alto · área de protección = **la altura de una capa**.

**En la app:** úsalo en el top bar (pequeño, ~28px), en splash/onboarding (grande con glow), en comprobantes y en la PayPage (sello de confianza). Wordmark "Parmelia" en **Bricolage Grotesque 600**, tracking `-0.02em`.

**No:** recolorear fuera de paleta · rotar/inclinar/deformar · sombras duras o relleno de un solo color · fondos de bajo contraste.

---

## 3. Color

La marca es **dos cosas**: los **pasteles** (la firma, constantes) y los **neutros** (la superficie). El sistema es **agnóstico a la superficie**: puede vivir sobre un neutro oscuro o sobre un neutro claro — la identidad no cambia. Lo que cambia es la **profundidad del acento**, que se ajusta para mantener el contraste. Los pasteles son siempre **acento, nunca bloque**.

> No hay "modo claro" ni "modo oscuro": hay **una sola marca** que sabe pararse sobre cualquier superficie.

### Acentos de marca (constantes)
| Nombre | HEX | Significado / uso |
|---|---|---|
| Sky | `#A7D4DE` | Claridad, confianza · QR, recibido, links activos |
| Pink | `#DEA6BC` | Social/humano · links, comunidad, cobros |
| Cream | `#DED9A6` | Valor/saldo · activos, montos |

### El acento se adapta a la superficie
El pastel es la identidad; su **versión** depende de sobre qué neutro se apoya. Para texto/trazos de acento y gradientes:

| Acento | Sobre superficie **oscura** (luminoso) | Sobre superficie **clara** (profundo) |
|---|---|---|
| Sky | `#9CE3F4` | `#2E8AA0` |
| Pink | `#F4A9CF` | `#C0608A` |
| Gold/Cream | `#EFE08C` | `#9A7E1F` |

> Los pasteles puros (`#A7D4DE`…) funcionan como **relleno/tinte** sobre cualquier superficie; como **texto** necesitan la versión luminosa (sobre oscuro) o profunda (sobre claro) para cumplir contraste.

### Neutros — rampa de superficie (de oscuro a claro)
Una sola rampa. Elige el extremo según el contexto; ambos son válidos y de marca.

| Rol | Extremo **oscuro** | Extremo **claro** |
|---|---|---|
| Fondo (canvas) | `#0A0A0B` | `#FAF8F3` (off-white, no blanco puro) |
| Fondo alterno | `#101117` | `#F3F1EA` |
| Superficie (tarjeta) | `#141417` | `#FFFFFF` |
| Superficie elevada | `#1A1A1E` | `#F2F0E8` |
| Borde sutil | `rgba(255,255,255,.08)` | `rgba(20,19,15,.10)` |
| Borde fuerte | `rgba(255,255,255,.16)` | `rgba(20,19,15,.16)` |

### Texto (adapta al neutro)
| Rol | Sobre **oscuro** | Sobre **claro** |
|---|---|---|
| Texto principal | `#F5F5F3` | `#15140F` |
| Texto atenuado | `rgba(245,245,243,.64)` | `#6B695F` |
| Texto tenue | `rgba(245,245,243,.44)` | `#9A988F` |

### Gradiente de marca
Una palabra/elemento clave por pantalla. Misma dirección, profundidad según superficie:
- Sobre oscuro: `linear-gradient(100deg,#9CE3F4,#F4A9CF 52%,#EFE08C)`
- Sobre claro: `linear-gradient(100deg,#2E8AA0,#C0608A 52%,#9A7E1F)`

### Colores de estado (semánticos)
Sin verde/rojo de banca; usamos la paleta (en su versión luminosa o profunda según superficie):
- **Recibido / éxito:** Sky · **Enviado:** texto neutro · **Atención/error:** Pink (suave, nunca alarmista) · **Valor/rendimiento:** Gold.

### Reglas de color
1. **Agnóstico a la superficie.** Elige neutro (oscuro o claro) según el contexto; el acento ajusta su profundidad. No lo llames "modo".
2. **Pasteles = acento, no fondo.** Nunca pantallas con pastel sólido saturado; sí como tinte sutil o detalle.
3. **Una pantalla/sección, un acento dominante.**
4. **Contraste** texto/fondo siempre ≥ AA. Datos críticos (montos) en el texto principal del neutro elegido.

---

## 4. Tipografía

### Display — Bricolage Grotesque (`500/600/700`)
Titulares, **montos**, números grandes. Peso **600**, `line-height` 1.0–1.05, `letter-spacing` **-0.02 a -0.03em**.

### Cuerpo / UI — Inter (`400/500/600/700`)
Párrafos, botones, labels, inputs, microcopy. Cuerpo peso **400**, `line-height` 1.5–1.6. **Nunca** cuerpo en negrita constante.

### Escala
| Estilo | Tamaño | Peso | Familia |
|---|---|---|---|
| Display / monto grande | 40–72px | 600 | Bricolage |
| Título de pantalla | 24–32px | 600 | Bricolage |
| Título de tarjeta / fila | 17–20px | 600 | Bricolage |
| Cuerpo | 15–17px | 400 | Inter |
| Label / botón | 14–15px | 500–600 | Inter |
| Microcopy / metadato | 12–13px | 500 | Inter |
| Números tabulares (saldos, listas) | — | — | usar `font-variant-numeric: tabular-nums` |

**Principio:** frases cortas, mucho aire, jerarquía clara.

---

## 5. Voz y tono

Habla como una persona que explica algo fácil. **Acciones, no tecnología.** Cálida, tranquila, sin hype.

**Sí:** dinero digital · dólares digitales · cobra · paga · envía · link · QR · username · sin comisiones · tu dinero es tuyo · tu huella es tu llave · listo · fácil.

**No (en la cara del usuario):** ERC-4337 · Account Abstraction · Paymaster · Smart Account · Gas · Gasless · "100% on-chain" como eslogan · stablecoin (→ dólar digital) · frase semilla (→ frases raras) · bridge · yield farming · jerga DeFi · emojis.

### Traducción técnico → humano (úsala en toda la app)
| En vez de… | Di… |
|---|---|
| Gas / gasless | Sin comisiones de red |
| Smart Account / wallet | Tu cuenta |
| Firmar con passkey / WebAuthn | Confirma con tu huella · Tu huella es tu llave |
| Transaction hash | Comprobante |
| On-chain / liquidando | Asegurando en la red |
| Paymaster patrocinando | (ocultar) o "Preparando tu pago" |
| Stablecoin / USDC | Dólar digital (USDC) |

### Frases de marca
Mueve dinero digital como mandar un mensaje · Cobra con un link · Pagar con QR, como ya lo haces · Tu dinero sigue siendo tuyo · Tu huella es tu llave · Sin descargar apps · sin frases raras · sin complicaciones · Rendimientos variables. Siempre bajo tu decisión.

---

# PARTE II — SISTEMA DE DISEÑO

## 6. Tokens base

### Radios
| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | `12px` | Chips, filas pequeñas, inputs compactos |
| `radius-md` | `16px` | Tarjetas, paneles, inputs, sheets |
| `radius-lg` | `22px` | Contenedores grandes, tarjeta de saldo, comprobantes |
| `radius-pill` | `999px` | Botones, etiquetas, avatares |

### Espaciado (escala 4pt)
`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 72`
- Padding interno de tarjeta: **20–24px**.
- Separación entre tarjetas/filas: **12–16px**.
- Márgenes de pantalla (mobile): **20px** (18px en pantallas muy chicas).
- Respiración entre bloques: **32–56px**.

### Elevación (sombras sobre oscuro)
| Nivel | Valor | Uso |
|---|---|---|
| `e1` | `0 8px 24px rgba(0,0,0,.35)` | Filas, chips elevados |
| `e2` | `0 18px 50px rgba(0,0,0,.35)` | Tarjetas, paneles |
| `e3` | `0 30px 90px rgba(0,0,0,.5)` | Sheets, modales, tarjeta de saldo |
| glow | `0 0 28px rgba(156,227,244,.22)` | Foco/éxito (acento) |

### Motion
- Curva estándar: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Duraciones: micro **150–200ms**, entradas **400–700ms**, ambient/loops **2.5–6s**.
- Entradas: `opacity` + leve `translateY(18–28px)`. **Sin** rotaciones ni rebotes "cute".
- **Siempre** respetar `prefers-reduced-motion` (mostrar estado final, desactivar loops).

---

## 7. Librería de componentes (genéricos)

Specs reutilizables en landing y app.

### Botones
- **Primario:** pastilla clara `bg:#F5F5F3` / `text:#0A0A0B`. Alto **52px** (app: **56px**, full-width). Peso 600, tracking -0.01em, `radius-pill`. Hover/press: `translateY(-2px)` + `e2`.
- **Gradiente (CTA destacado):** relleno `surface`, borde de gradiente de marca (sutil). Para una sola acción protagonista por pantalla.
- **Secundario / ghost:** transparente, `border` 1px, `text`. Hover: `surface-2`.
- **Destructivo/atención:** mismo patrón ghost con acento Glow Pink (sin rojo banca).
- Estado **loading**: spinner + microcopy de estado (ver §11).

### Inputs / campos
- Fondo `surface`, borde `border`, `radius-md`, alto 52px, texto `text`, placeholder `text-faint`.
- **Focus:** borde `border-strong` + halo `0 0 0 3px rgba(156,227,244,.18)`.
- Label arriba en `text-muted` 13–14px. Error en Glow Pink + mensaje corto humano.

### Tarjetas y superficies
`surface` + `border` + `radius-md/lg` + `e2`. Hover/activo: `surface-2` + `border-strong`.

### Chips / pills
`radius-pill`, `border` 1px, fondo `rgba(255,255,255,.04)`, texto `text-muted`. Punto de acento opcional.

### Listas / filas
Fila = `surface` o transparente con divisor `border`. Izquierda: icono/avatar/logo. Centro: título (Bricolage 600) + subtítulo (`text-faint`). Derecha: valor (tabular). Tap → `surface-2`.

---

# PARTE III — APLICAR A LA APP

Esta parte traduce el sistema a la interfaz real de Parmelia. Pantallas existentes: **Login, Onboarding, Home, CreateLink, ScanQR, PayPage, PaymentStatus, Settings.**

## 8. Migración desde la app actual

La app hoy usa una variante temprana de la paleta. Aplicar este mapeo 1:1:

| Hoy (app `index.css`) | Cámbialo a |
|---|---|
| `font-family: 'Shippori Antique'` (todo) | **Display:** Bricolage Grotesque · **Cuerpo/UI:** Inter |
| `body background: #000` | `#0A0A0B` (`bg`) |
| `--color-surface: #1a1a1a` | `#141417` (`surface`) |
| `--color-surface-2: #2a2a2a` | `#1A1A1E` (`surface-2`) |
| `--color-muted: #888` | `text-muted` `rgba(245,245,243,.64)` (y `text-faint` .44 para metadatos) |
| `--color-parmelia-blue/pink/gold` | **Mantener** (son la firma); añadir variantes `glow-*` para brillos |
| `a { color: parmelia-blue }` | Links/acciones en Sky; énfasis con Glow Sky |
| Esquinas variadas | Escala `radius-sm/md/lg/pill` |
| Sombras planas | Escala `e1/e2/e3` |

Texto: hacer una **pasada de voz** en toda la app aplicando la tabla de traducción técnico→humano (§5).

## 9. Estructura (App shell)

- **Mobile-first.** Contenido en columna centrada, `max-width: 460px`, márgenes 20px, respetando *safe areas* (`env(safe-area-inset-*)`).
- **Fondo:** `bg` con glows radiales muy sutiles de los pasteles (6–10%), fijos. Nada de ruido.
- **Top bar:** logo (stack ~28px) + identidad (username / `@usuario`) a la izquierda; acción secundaria (menú/ajustes) a la derecha. Minimal, sin sombra dura.
- **Acciones principales:** barra/fila de acciones grandes (Cobrar · Pagar · Enviar · Escanear) tipo "quick actions", siempre accesibles desde Home.
- Una pantalla = un objetivo claro. Bloques horizontales legibles.

## 10. Componentes de app

### Tarjeta de saldo (Home)
- Contenedor `surface`/gradiente sutil, `radius-lg`, `e3`.
- **Monto grande** en Bricolage 600, 40–56px, `tabular-nums`; moneda/etiqueta en `text-muted`.
- Toggle de activo (USDC · MON · WBTC) como segmented control discreto.
- Acción "copiar dirección / ver cuenta" en `text-faint`, con feedback "Copiado".

### Quick actions
4 acciones como botones grandes con icono + label corta: **Cobrar, Pagar, Enviar, Escanear**. Tarjetas `surface` `radius-md`, icono en acento de la acción (Cobrar=Pink, Escanear/Pagar=Sky, Saldo/Earn=Cream).

### Fila de activo (token)
Logo oficial del token (USDC/MON/WBTC, a color, como "moneda" con sombra suave, sin recuadro) + nombre (Bricolage 600) + saldo a la derecha (tabular). Ver §3 estados para colores.

### Input de monto (Pagar/Cobrar/Enviar)
- **Número gigante** centrado en Bricolage 600 (48–72px) con sufijo de moneda en `text-muted`.
- Teclado numérico propio (botones `surface`, `radius-md`, alto cómodo ≥ 56px) o input nativo grande.
- Debajo: a quién (avatar + `@usuario`) y, si aplica, "Sin comisiones de red".

### Fila de transacción (historial)
- Izquierda: icono direccional (recibido = Sky, enviado = neutro) en círculo `surface-2`.
- Centro: contraparte (`@usuario` o referencia) + fecha (`text-faint`).
- Derecha: monto con signo, tabular. **Recibido** en Glow Sky; **enviado** en `text`.
- Tap → abre **comprobante**.

### Comprobante (receipt) — exportable
La app ya exporta comprobantes como imagen. Diseñarlo como **pieza de marca**: fondo `bg`, logo arriba, barra de acento, monto grande (gradiente de marca opcional), de/para, fecha, referencia, y enlace al comprobante en cadena en `text-faint`. Debe verse premium al compartirse (es marketing orgánico).

### Vista de QR
- Placa **blanca** del QR (siempre, para escaneabilidad) sobre tarjeta `surface` con marco de marca y línea de escaneo (Glow Pink→Sky).
- Debajo: `@usuario`, monto si aplica, y botón "Compartir".

### Sheets / modales
Suben desde abajo (bottom sheet), fondo `bg-2`, `radius-lg` arriba, `e3`, *grabber* sutil, overlay `rgba(0,0,0,.6)`.

### Toasts / feedback
Pastilla `surface` + `border-strong`, icono de acento, texto corto. Éxito = Sky, atención = Pink.

### Estados vacíos
Ilustración mínima (motivo del sistema, p. ej. el stack), una frase humana ("Aún no tienes movimientos. Crea tu primer link.") + botón.

## 11. Latencia de red → micro-estados (crítico)

La blockchain tarda 1–3s. **Nunca** mostrar un spinner mudo. Encadenar micro-estados honestos y con marca, traducidos a humano:

1. **"Confirma con tu huella"** (passkey).
2. **"Preparando tu pago…"**
3. **"Asegurando en la red…"**
4. **"¡Listo!"** + animación de check que se dibuja (motivo del sistema) + monto.

Cada estado con su micro-animación (≤ esos motivos), respetando reduced-motion. Esto convierte la espera en confianza.

## 12. Pantalla por pantalla

- **Login:** fondo oscuro + logo grande con glow + 1 frase ("Mueve dinero digital como mandar un mensaje") + botón social grande. Sin formularios largos. Microcopy: "Sin contraseñas. Tu huella es tu llave."
- **Onboarding:** crear `@username` (input grande, validación amable) + explicar en 1 línea que su cuenta ya es suya. Pedir passkey con copy humano. 2–3 pasos máximo, con progreso.
- **Home:** top bar · **tarjeta de saldo** · **quick actions** (Cobrar/Pagar/Enviar/Escanear) · lista de **activos** · **historial** reciente. Pull-to-refresh sutil. Es el centro de control.
- **CreateLink (Cobrar):** input de monto gigante · moneda · referencia opcional · botón "Crear link". Resultado: el link + QR + "Compartir" con la fila de canales (WhatsApp/Telegram/IG/X). Refuerza que es seguro y de Parmelia.
- **ScanQR:** cámara a pantalla completa con marco de escaneo de marca (línea Glow); al detectar, abre confirmación con **quién recibe y cuánto** muy claros.
- **PayPage (pagar un link):** **máxima señal de confianza anti-phishing** — logo Parmelia, "Pago seguro con Parmelia", avatar + `@usuario` del que cobra, monto grande, y botón "Pagar con tu huella". Predecible y branded.
- **PaymentStatus:** los micro-estados de §11 → éxito con check animado, monto, y CTA "Ver comprobante" / "Listo".
- **Settings:** lista de filas (cuenta, seguridad/passkey, red, ayuda, salir). Lenguaje humano; seguridad explicada simple ("Tu huella es tu llave", "Tu dinero es tuyo").

## 13. Accesibilidad
- Contraste ≥ AA (texto principal sobre `bg`/`surface` cumple; cuidar `text-faint` solo en metadatos).
- Targets táctiles ≥ 44px.
- Foco visible (halo Glow Sky).
- `prefers-reduced-motion` respetado en todas las animaciones.
- Montos y datos críticos nunca dependen solo del color (añadir signo/etiqueta).

---

# PARTE IV — IMPLEMENTACIÓN

## 14. Tokens listos para pegar

Pegar en el `@theme` de Tailwind v4 (`index.css`) de la app, reemplazando los actuales:

El sistema es agnóstico a la superficie: los **pasteles** y los **radios/fuentes** son constantes; los **neutros** y la **profundidad del acento** se eligen según la superficie. Define ambas rampas y mapea los roles (`--bg`, `--text`, `--accent-*`) a la activa.

```css
@theme {
  /* === Constantes (firma) === */
  --color-sky:  #A7D4DE;
  --color-pink: #DEA6BC;
  --color-cream:#DED9A6;

  /* Acento luminoso (úsalo sobre superficie OSCURA) */
  --glow-sky:  #9CE3F4;
  --glow-pink: #F4A9CF;
  --glow-gold: #EFE08C;

  /* Acento profundo (úsalo sobre superficie CLARA) */
  --deep-sky:  #2E8AA0;
  --deep-pink: #C0608A;
  --deep-gold: #9A7E1F;

  /* === Neutros — extremo OSCURO === */
  --dark-bg:        #0A0A0B;
  --dark-bg-2:      #101117;
  --dark-surface:   #141417;
  --dark-surface-2: #1A1A1E;
  --dark-border:        rgba(255,255,255,0.08);
  --dark-border-strong: rgba(255,255,255,0.16);
  --dark-text:       #F5F5F3;
  --dark-text-muted: rgba(245,245,243,0.64);
  --dark-text-faint: rgba(245,245,243,0.44);

  /* === Neutros — extremo CLARO === */
  --light-bg:        #FAF8F3;
  --light-bg-2:      #F3F1EA;
  --light-surface:   #FFFFFF;
  --light-surface-2: #F2F0E8;
  --light-border:        rgba(20,19,15,0.10);
  --light-border-strong: rgba(20,19,15,0.16);
  --light-text:       #15140F;
  --light-text-muted: #6B695F;
  --light-text-faint: #9A988F;

  /* === Tipografía y radios (constantes) === */
  --font-display: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif;
  --font-sans:    'Inter', system-ui, -apple-system, sans-serif;
  --radius-sm: 12px;  --radius-md: 16px;
  --radius-lg: 22px;  --radius-pill: 999px;
}

/* Mapea los roles a la superficie activa. Por defecto: oscuro. */
:root, .surface-dark {
  --bg: var(--dark-bg); --bg-2: var(--dark-bg-2);
  --surface: var(--dark-surface); --surface-2: var(--dark-surface-2);
  --border: var(--dark-border); --border-strong: var(--dark-border-strong);
  --text: var(--dark-text); --text-muted: var(--dark-text-muted); --text-faint: var(--dark-text-faint);
  --accent-sky: var(--glow-sky); --accent-pink: var(--glow-pink); --accent-gold: var(--glow-gold);
}
/* Aplica .surface-light a cualquier contenedor para invertir a claro. */
.surface-light {
  --bg: var(--light-bg); --bg-2: var(--light-bg-2);
  --surface: var(--light-surface); --surface-2: var(--light-surface-2);
  --border: var(--light-border); --border-strong: var(--light-border-strong);
  --text: var(--light-text); --text-muted: var(--light-text-muted); --text-faint: var(--light-text-faint);
  --accent-sky: var(--deep-sky); --accent-pink: var(--deep-pink); --accent-gold: var(--deep-gold);
}
```

> En el código usa siempre los **roles** (`--bg`, `--surface`, `--text`, `--accent-*`), nunca el valor crudo. Así una sección/pantalla cambia de oscuro a claro con solo poner `.surface-light`, sin tocar componentes.

Fuentes (en `<head>`):
```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Gradiente de marca:
```css
background: linear-gradient(100deg, var(--glow-sky), var(--glow-pink) 52%, var(--glow-gold));
```

## 15. Checklist para implementadores (IA o humano)

Aplica en este orden para rediseñar la app sin romperla:

1. **Fuentes:** carga Bricolage + Inter; `--font-display` para titulares/montos, `--font-sans` para todo lo demás. Quita Shippori.
2. **Tokens:** reemplaza el `@theme` por el bloque de §14. Sustituye `#1a1a1a/#2a2a2a/#888/#000` por `surface/surface-2/text-muted/bg`.
3. **Pesos:** baja titulares a 600 y cuerpo a 400 (nada de bold constante). Tracking negativo en displays.
4. **Radios y sombras:** aplica las escalas `radius-*` y `e1/e2/e3`.
5. **Componentes:** reconstruye botones, inputs, tarjetas, filas, sheets según Parte II/III.
6. **Pantallas:** aplica la guía de §12 una por una (empieza por Home y PayPage por impacto).
7. **Voz:** pasa todo el copy por la tabla técnico→humano (§5). Sin jerga, sin emojis.
8. **Estados de red:** implementa los micro-estados de §11 con sus animaciones.
9. **Confianza:** refuerza PayPage/comprobantes como piezas de marca (anti-phishing).
10. **Accesibilidad + reduced-motion:** verifica contraste, focos y movimiento reducido.

## 16. Do / Don't (resumen)

**Do**
- Vender/mostrar acciones humanas, no tecnología.
- Pasteles como acento sobre oscuro; un acento dominante por pantalla.
- Montos en Bricolage, tabulares, alto contraste.
- Una animación con propósito por estado; micro-estados honestos en la latencia.
- PayPage y comprobantes inconfundiblemente Parmelia (confianza).

**Don't**
- Fondos pastel sólidos saturados.
- Cuerpo en negrita constante / tipografía con demasiada personalidad para texto.
- Jerga cripto (gas, paymaster, hash, ERC-4337) en la UI.
- Verde/rojo de banca para estados (usa la paleta).
- Spinners mudos, animaciones "cute" o que distraen.

---

## Apéndice — Activos y referencias

- **Logo:** `Logo_parmelia.svg` (stack de 3 capas).
- **Logos de token:** USDC (Circle), MON (Monad), WBTC (Bitcoin) — usar oficiales a color.
- **Canales:** WhatsApp · Telegram · Instagram · X (monocromos en UI).
- **Contexto de producto:** carpeta `parmelia-style/` (PRD, contexto, modelos de contenido).
- **Implementación de referencia:** la landing de este repo es la expresión canónica del sistema (mismos tokens en `src/styles/global.css`).

*Parmelia — Mueve dinero digital como mandar un mensaje.*
