# Redes sociales · octubre de 2026

**Estado: propuesta.** 172 piezas generadas con `npm run brandkit:social` (fuente: `herramientas/brandkit/social.mjs`). Abrir [index.html](./index.html) para revisarlas.

- `png/`: listas para publicar. `svg/`: editables; el texto está trazado (no depende de fuentes instaladas).
- Formatos: posts 1080 × 1350 (4:5) y 1080 × 1080 (1:1), carruseles 4:5, historias 1080 × 1920, posts horizontales 1200 × 675, banners de X, LinkedIn, YouTube, Facebook y enlace compartido, portadas de destacadas, fondos, stickers y plantillas.
- Paleta y tipografía del kit; firma con el símbolo (sobre contenedor Milk en fondos oscuros y Cat Fire).
- El gato usa las ilustraciones de `brandkit/03-personaje`, que siguen pendientes de aprobación artística.
- Texto según la guía de voz: sin promesas no verificadas; las piezas de producto indican «Alpha en testnet · fondos de prueba».
- En historias de encuesta, añadir el sticker nativo de la red sobre la zona indicada.
- Historias: el contenido queda entre 250 px arriba y 250 px abajo, fuera de la barra de perfil y de la de respuesta.
- Banner de YouTube: todo el texto está dentro de la zona segura central de 1546 × 423; el resto del lienzo es fondo.
- Banners con gato: el gato nunca se recorta ni tapa el titular; se reduce si hace falta.
- Piezas marcadas «Publicar cuando la autocustodia…» (series Pilares): prometen que los fondos son del usuario y que puede salir cuando quiera. Publicarlas solo cuando eso esté demostrado en la app.
- Las salidas a moneda local (bolivianos, PIX) y la tarjeta aparecen siempre como «en desarrollo» o «pronto».
- DeFi: nunca prometer rendimiento; las piezas recuerdan que varía y no está garantizado.
- Carruseles: publicar las diapositivas en orden. El raíl continúa de una a otra y el bloque rojo avanza, así que se lee como un solo camino al deslizar.
- Portadas de destacadas: Instagram muestra solo el círculo central; el icono está centrado dentro de él.
- Fondos para historias: dejan libre el centro para escribir con el texto nativo de la red y añadir stickers.
- Stickers: PNG con fondo transparente. Los del gato usan los píxeles originales ampliados por un factor entero, con un borde Milk y un filo Ink; no redibujan la ilustración.
- Fondos de pantalla: sin texto; en el móvil dejan libres el reloj y los botones inferiores.
- Imagen para compartir (OG): `og-gatopago.png` es la versión principal; se instala como `og:image` en la web, que vive en el repositorio de la app.
- Plantillas con captura: sustituir el marcador por una captura real de la app y conservar la nota de alpha.

## Textos sugeridos

| Pieza | Serie | Formato | Texto |
|---|---|---|---|
| `manifiesto-01` | Manifiesto | 1080×1350 | Dinero sin fronteras. Siempre tuyo. Cobra, guarda y mueve tu dinero entre países. |
| `manifiesto-08` | Manifiesto | 1080×1350 | Tu dinero no debería detenerse en la frontera. Hoy un mensaje cruza en segundos; el dinero tarda días y pierde una parte por el camino. |
| `manifiesto-09` | Manifiesto | 1080×1080 | Un mensaje cruza una frontera en segundos. El dinero, en días. Eso es lo que venimos a cambiar. |
| `manifiesto-10` | Manifiesto | 1080×1350 | Sin fronteras, sin encierro, siempre tuyo: una cuenta para cobrar, guardar y mover dinero entre países. |
| `manifiesto-02` | Manifiesto | 1080×1350 | Tu dinero sigue siendo tuyo. Nosotros nos ocupamos del camino. |
| `manifiesto-03` | Manifiesto | 1080×1080 | Una tarea, una frase. Enviar, cobrar y cambiar dicho claro. |
| `manifiesto-04` | Manifiesto | 1080×1350 | Antes de confirmar, todo a la vista: destino, importe y costes. |
| `manifiesto-05` | Manifiesto | 1080×1080 | Tu dinero, tu decisión. Nada se mueve sin tu autorización. |
| `manifiesto-06` | Manifiesto | 1080×1350 | Mover dinero debería ser fácil de entender: elegir, revisar, autorizar y seguir el resultado. |
| `manifiesto-07` | Manifiesto | 1080×1350 | Menos ruido, más claridad: cada paso dice qué pasa y qué sigue. |
| `pasos-01` | Cómo funciona | 1080×1350 | Así se mueve tu dinero en GatoPago: eliges, revisas, autorizas y sigues el estado. (Alpha en testnet, con fondos de prueba.) |
| `pasos-02` | Cómo funciona | 1080×1350 | Cobrar en cuatro pasos: enlace o QR, compartir, revisar y comprobante. (Alpha en testnet.) |
| `pasos-03` | Cómo funciona | 1080×1080 | Antes de enviar, tres preguntas: a quién, cuánto y en qué activo, y qué cuesta la red. |
| `consejo-01` | Seguridad | 1080×1350 | Consejo 01: revisa el destino antes de enviar. Un carácter distinto lleva el dinero a otra cuenta. |
| `consejo-02` | Seguridad | 1080×1350 | Consejo 02: tus accesos son solo tuyos. No compartas tus códigos de acceso con nadie. |
| `consejo-03` | Seguridad | 1080×1350 | Consejo 03: USD no es USDC. Mira qué activo y qué red usas antes de mover dinero. |
| `consejo-04` | Seguridad | 1080×1080 | Consejo 04: antes de pagar con QR, confirma el nombre y el importe. |
| `consejo-05` | Seguridad | 1080×1350 | Consejo 05: si no sabes si un envío salió, revisa la actividad antes de repetirlo. |
| `consejo-06` | Seguridad | 1080×1080 | Consejo 06: si algo no cuadra, detente. Ninguna urgencia justifica saltarse la revisión. |
| `consejo-07` | Seguridad | 1080×1350 | Consejo 07: tu teléfono es tu llave. Bloqueo de pantalla activo y sistema al día. |
| `consejo-08` | Seguridad | 1080×1350 | Consejo 08: ojo con los enlaces. Escribe gatopago.com y desconfía de las prisas. |
| `glosario-01` | Glosario | 1080×1350 | Glosario 01 · Stablecoin: moneda digital pensada para mantener un valor estable, normalmente atado al dólar. |
| `glosario-02` | Glosario | 1080×1350 | Glosario 02 · USDC: stablecoin emitida por Circle que busca valer un dólar estadounidense. |
| `glosario-03` | Glosario | 1080×1350 | Glosario 03 · Red: donde se registra una transferencia. Un mismo activo puede vivir en varias. |
| `glosario-04` | Glosario | 1080×1080 | Glosario 04 · Comisión: lo que cuesta procesar una operación. Siempre visible antes de autorizar. |
| `glosario-05` | Glosario | 1080×1350 | Glosario 05 · Autocustodia: tú controlas tus fondos; ninguna empresa los guarda por ti. |
| `glosario-06` | Glosario | 1080×1350 | Glosario 06 · Dirección: el identificador de una cuenta en una red. Revísala antes de enviar. |
| `glosario-07` | Glosario | 1080×1080 | Glosario 07 · Comprobante: quién, cuánto, cuándo y en qué estado quedó una operación. |
| `glosario-08` | Glosario | 1080×1350 | Glosario 08 · Testnet: red de pruebas. Lo que se mueve ahí no tiene valor real. |
| `gato-01` | El gato | 1080×1350 | Hola, te esperábamos. El gato acompaña; tú decides. |
| `gato-02` | El gato | 1080×1080 | ¿Primera vez por aquí? Empieza por lo básico: qué es una stablecoin. |
| `gato-03` | El gato | 1080×1350 | Tu envío va en camino. Síguelo en Actividad hasta que se confirme. |
| `gato-04` | El gato | 1080×1350 | Domingo de siesta. Tu dinero sigue siendo tuyo, también cuando descansas. |
| `gato-05` | El gato | 1080×1080 | Listo: confirmado y con comprobante. |
| `gato-06` | El gato | 1080×1350 | Preparando tu pago: primero revisamos, después se mueve. |
| `gato-07` | El gato | 1080×1350 | Atento a los detalles: importe, destino, red y costes. |
| `gato-08` | El gato | 1080×1080 | Algo nuevo se asoma. Pronto te contamos más. |
| `gato-09` | El gato | 1080×1350 | Lunes. El gato también. |
| `gato-10` | El gato | 1080×1350 | Cobrar sin complicarte: un enlace o un QR para que te paguen. (Alpha en testnet.) |
| `gato-11` | El gato | 1080×1080 | ¡Primer pago! Celebramos cuando está confirmado. No antes. |
| `gato-12` | El gato | 1080×1350 | Mejor revisar dos veces: un minuto de revisión vale más que un envío equivocado. |
| `gato-13` | El gato | 1080×1350 | Hola desde el otro lado. (Ilustración del gato; no anuncia una tarjeta.) |
| `gato-14` | El gato | 1080×1080 | Sin prisa, sin pausa: cada paso a su tiempo. |
| `acciones-01` | Acciones | 1080×1350 | Cuatro verbos, un solo lugar: enviar, cobrar, cambiar y ver tu actividad. |
| `acciones-02` | Acciones | 1080×1080 | Lo que haces cada día, con nombres claros. |
| `acciones-03` | Acciones | 1080×1350 | Protección en capas: tu acceso, revisión antes de autorizar y control de tu cuenta. |
| `comparar-01` | Comparativas | 1080×1350 | Enviado no es confirmado: celebramos cuando la red lo registra. |
| `comparar-02` | Comparativas | 1080×1350 | USD y USDC no son lo mismo: uno es el dólar; el otro, una stablecoin que busca valer un dólar. |
| `comparar-03` | Comparativas | 1080×1080 | Testnet y mainnet: la primera es para probar; la segunda mueve dinero real. Hoy GatoPago es una alpha en testnet. |
| `principio-01` | Principios | 1080×1350 | Celebramos cuando está confirmado. No antes. |
| `principio-02` | Principios | 1080×1350 | Primero la acción; después, la explicación necesaria. |
| `principio-03` | Principios | 1080×1080 | Costes a la vista, antes de autorizar. |
| `principio-04` | Principios | 1080×1350 | Una idea por frase. Así escribimos en GatoPago. |
| `estado-01` | Transparencia | 1080×1350 | Estamos en alpha: probamos en testnet con fondos de prueba. Te contaremos las novedades. |
| `publicos-01` | Transparencia | 1080×1350 | Una promesa, tres caminos: personas, negocios e integradores. |
| `historia-01` | Historias | 1080×1920 | Historia · promesa. |
| `historia-09` | Historias | 1080×1920 | Historia · el problema. |
| `historia-02` | Historias | 1080×1920 | Historia · bienvenida. |
| `historia-03` | Historias | 1080×1920 | Historia · consejo de seguridad. |
| `historia-04` | Historias | 1080×1920 | Historia · glosario. |
| `historia-05` | Historias | 1080×1920 | Historia · cómo funciona. |
| `historia-06` | Historias | 1080×1920 | Historia · encuesta (añadir el sticker de encuesta de la red social). |
| `historia-07` | Historias | 1080×1920 | Historia · principio. |
| `historia-08` | Historias | 1080×1920 | Historia · celebración. |
| `pilares-01` | Pilares | 1080×1350 | Una cuenta, cuatro promesas: tuya, simple, programable y abierta. [Publicar cuando la autocustodia y la salida a otra wallet estén demostradas.] |
| `pilares-02` | Pilares | 1080×1350 | Tus fondos son realmente tuyos: GatoPago no guarda tu dinero; tú tienes el control. [Publicar cuando la autocustodia y la salida a otra wallet estén demostradas.] |
| `pilares-03` | Pilares | 1080×1350 | Cripto sin la parte difícil: sin redes, gas ni direcciones a la vista. |
| `pilares-04` | Pilares | 1080×1350 | Tu cuenta trabaja por ti. Hoy, rendimiento con DeFi; pronto, reglas que tú defines. El rendimiento varía y no está garantizado. (Alpha en testnet.) |
| `pilares-05` | Pilares | 1080×1350 | Entra y sal cuando quieras: tu dinero puede ir a otra wallet o exchange. Sin encierro. |
| `pilares-06` | Pilares | 1080×1080 | Fácil como una app. Tuya como una wallet. Las dos cosas, en una cuenta. [Publicar cuando la autocustodia y la salida a otra wallet estén demostradas.] |
| `pilares-07` | Pilares | 1080×1350 | O es fácil, o es tuyo. Hasta ahora: GatoPago es fácil y tus fondos son tuyos. [Publicar cuando la autocustodia y la salida a otra wallet estén demostradas.] |
| `entre-paises-01` | Entre países | 1080×1350 | Cobra desde cualquier país: un enlace o un QR, y el pago llega en dólares digitales. (Alpha en testnet.) |
| `entre-paises-02` | Entre países | 1080×1350 | Así cobras desde otro país: tu cliente paga con tu enlace, recibes dólares digitales y decides qué hacer. Pronto, retiro en bolivianos. (Alpha en testnet.) |
| `entre-paises-03` | Entre países | 1080×1080 | Cobrar de fuera: menos intermediarios y costes a la vista, en dólares digitales. |
| `entre-paises-04` | Entre países | 1080×1350 | De dólares digitales a bolivianos: estamos trabajando en la salida a tu banco en Bolivia. Aún no está disponible. |
| `entre-paises-05` | Entre países | 1080×1350 | Tu cliente está lejos; tu cobro, no tanto. (Alpha en testnet.) |
| `entre-paises-06` | Entre países | 1080×1920 | Historia · cobrar desde otro país. |
| `defi-01` | DeFi sin jerga | 1080×1350 | Finanzas abiertas, sin jerga: ahorra y genera rendimiento desde tu cuenta. El rendimiento varía y no está garantizado. (Alpha en testnet.) |
| `defi-02` | DeFi sin jerga | 1080×1350 | El rendimiento varía y no está garantizado. Te lo decimos antes, no después. |
| `en-01` | English | 1080×1350 | Money without borders. Always yours. |
| `en-02` | English | 1080×1080 | Your money, your call. Nothing moves without your approval. |
| `en-03` | English | 1080×1350 | Tip 01: check the address before you send. |
| `en-04` | English | 1080×1350 | Hi, we were expecting you. |
| `banner-x-01` | Banners | 1500×500 | Dinero sin fronteras. Siempre tuyo. |
| `banner-x-02` | Banners | 1500×500 | Tu dinero. Tu camino. |
| `banner-linkedin-01` | Banners | 1584×396 | Mover dinero, fácil de entender. |
| `banner-youtube-01` | Banners | 2560×1440 | Dinero sin fronteras. Siempre tuyo. |
| `banner-facebook-01` | Banners | 1640×624 | Tu dinero sigue siendo tuyo. |
| `banner-compartir-01` | Banners | 1200×630 | Dinero sin fronteras. Siempre tuyo. |
| `banner-linkedin-post-01` | Banners | 1200×627 | Antes de confirmar, todo a la vista. |
| `horizontal-01` | Horizontales | 1200×675 | Enviado no es confirmado. |
| `horizontal-02` | Horizontales | 1200×675 | Revisa el destino antes de enviar. |
| `horizontal-03` | Horizontales | 1200×675 | Tu dinero. Tu decisión. |
| `horizontal-05` | Horizontales | 1200×675 | Tu dinero no debería detenerse en la frontera. |
| `hackquest-01` | HackQuest | 1280×720 | Money without borders. Always yours. |
| `hackquest-02` | HackQuest | 1280×720 | A message crosses a border in seconds. Money takes days. |
| `hackquest-03` | HackQuest | 1280×720 | Get paid with a link. Send to a username. |
| `hackquest-04` | HackQuest | 1280×720 | ERC-4337 accounts signed with passkeys. |
| `horizontal-04` | Horizontales | 1200×675 | Estamos en alpha. |
| `carrusel-cobrar-01` | Carrusel · Cobrar con un enlace | 1080×1350 | Cobrar con un enlace, paso a paso. (Alpha en testnet, con fondos de prueba.) |
| `carrusel-cobrar-02` | Carrusel · Cobrar con un enlace | 1080×1350 | Diapositiva 2 de 6. |
| `carrusel-cobrar-03` | Carrusel · Cobrar con un enlace | 1080×1350 | Diapositiva 3 de 6. |
| `carrusel-cobrar-04` | Carrusel · Cobrar con un enlace | 1080×1350 | Diapositiva 4 de 6. |
| `carrusel-cobrar-05` | Carrusel · Cobrar con un enlace | 1080×1350 | Diapositiva 5 de 6. |
| `carrusel-cobrar-06` | Carrusel · Cobrar con un enlace | 1080×1350 | Diapositiva 6 de 6. |
| `carrusel-revisar-01` | Carrusel · Antes de enviar | 1080×1350 | Antes de enviar, revisa tres cosas: el destino, el activo y la red, y el coste. |
| `carrusel-revisar-02` | Carrusel · Antes de enviar | 1080×1350 | Diapositiva 2 de 5. |
| `carrusel-revisar-03` | Carrusel · Antes de enviar | 1080×1350 | Diapositiva 3 de 5. |
| `carrusel-revisar-04` | Carrusel · Antes de enviar | 1080×1350 | Diapositiva 4 de 5. |
| `carrusel-revisar-05` | Carrusel · Antes de enviar | 1080×1350 | Diapositiva 5 de 5. |
| `carrusel-palabras-01` | Carrusel · Cinco palabras | 1080×1350 | Cinco palabras para empezar: stablecoin, USDC, autocustodia, DeFi y comprobante. |
| `carrusel-palabras-02` | Carrusel · Cinco palabras | 1080×1350 | Diapositiva 2 de 7. |
| `carrusel-palabras-03` | Carrusel · Cinco palabras | 1080×1350 | Diapositiva 3 de 7. |
| `carrusel-palabras-04` | Carrusel · Cinco palabras | 1080×1350 | Diapositiva 4 de 7. |
| `carrusel-palabras-05` | Carrusel · Cinco palabras | 1080×1350 | Diapositiva 5 de 7. |
| `carrusel-palabras-06` | Carrusel · Cinco palabras | 1080×1350 | Diapositiva 6 de 7. |
| `carrusel-palabras-07` | Carrusel · Cinco palabras | 1080×1350 | Diapositiva 7 de 7. |
| `carrusel-estafas-01` | Carrusel · Señales de alerta | 1080×1350 | Cuatro señales de alerta: prisa, que te pidan códigos, enlaces raros y ganancias seguras. |
| `carrusel-estafas-02` | Carrusel · Señales de alerta | 1080×1350 | Diapositiva 2 de 6. |
| `carrusel-estafas-03` | Carrusel · Señales de alerta | 1080×1350 | Diapositiva 3 de 6. |
| `carrusel-estafas-04` | Carrusel · Señales de alerta | 1080×1350 | Diapositiva 4 de 6. |
| `carrusel-estafas-05` | Carrusel · Señales de alerta | 1080×1350 | Diapositiva 5 de 6. |
| `carrusel-estafas-06` | Carrusel · Señales de alerta | 1080×1350 | Diapositiva 6 de 6. |
| `carrusel-defi-01` | Carrusel · DeFi sin jerga | 1080×1350 | DeFi explicado sin jerga: qué es, qué puedes hacer, qué riesgos tiene y dónde entra GatoPago. (Alpha en testnet.) |
| `carrusel-defi-02` | Carrusel · DeFi sin jerga | 1080×1350 | Diapositiva 2 de 6. |
| `carrusel-defi-03` | Carrusel · DeFi sin jerga | 1080×1350 | Diapositiva 3 de 6. |
| `carrusel-defi-04` | Carrusel · DeFi sin jerga | 1080×1350 | Diapositiva 4 de 6. |
| `carrusel-defi-05` | Carrusel · DeFi sin jerga | 1080×1350 | Diapositiva 5 de 6. |
| `carrusel-defi-06` | Carrusel · DeFi sin jerga | 1080×1350 | Diapositiva 6 de 6. |
| `destacada-roja-empieza` | Portadas de destacadas | 1080×1920 | Portada de destacada «Empieza». Instagram muestra solo el círculo central. |
| `destacada-roja-cobrar` | Portadas de destacadas | 1080×1920 | Portada de destacada «Cobrar». Instagram muestra solo el círculo central. |
| `destacada-roja-enviar` | Portadas de destacadas | 1080×1920 | Portada de destacada «Enviar». Instagram muestra solo el círculo central. |
| `destacada-roja-seguridad` | Portadas de destacadas | 1080×1920 | Portada de destacada «Seguridad». Instagram muestra solo el círculo central. |
| `destacada-roja-glosario` | Portadas de destacadas | 1080×1920 | Portada de destacada «Glosario». Instagram muestra solo el círculo central. |
| `destacada-roja-novedades` | Portadas de destacadas | 1080×1920 | Portada de destacada «Novedades». Instagram muestra solo el círculo central. |
| `destacada-roja-ayuda` | Portadas de destacadas | 1080×1920 | Portada de destacada «Ayuda». Instagram muestra solo el círculo central. |
| `destacada-roja-gato` | Portadas de destacadas | 1080×1920 | Portada de destacada «El gato». Instagram muestra solo el círculo central. |
| `destacada-oscura-empieza` | Portadas de destacadas | 1080×1920 | Portada de destacada «Empieza». Instagram muestra solo el círculo central. |
| `destacada-oscura-cobrar` | Portadas de destacadas | 1080×1920 | Portada de destacada «Cobrar». Instagram muestra solo el círculo central. |
| `destacada-oscura-enviar` | Portadas de destacadas | 1080×1920 | Portada de destacada «Enviar». Instagram muestra solo el círculo central. |
| `destacada-oscura-seguridad` | Portadas de destacadas | 1080×1920 | Portada de destacada «Seguridad». Instagram muestra solo el círculo central. |
| `destacada-oscura-glosario` | Portadas de destacadas | 1080×1920 | Portada de destacada «Glosario». Instagram muestra solo el círculo central. |
| `destacada-oscura-novedades` | Portadas de destacadas | 1080×1920 | Portada de destacada «Novedades». Instagram muestra solo el círculo central. |
| `destacada-oscura-ayuda` | Portadas de destacadas | 1080×1920 | Portada de destacada «Ayuda». Instagram muestra solo el círculo central. |
| `destacada-oscura-gato` | Portadas de destacadas | 1080×1920 | Portada de destacada «El gato». Instagram muestra solo el círculo central. |
| `fondo-historia-01` | Fondos para historias | 1080×1920 | Fondo libre para escribir con el texto nativo de la red. |
| `fondo-historia-02` | Fondos para historias | 1080×1920 | Fondo libre para escribir con el texto nativo de la red. |
| `fondo-historia-03` | Fondos para historias | 1080×1920 | Fondo libre para escribir con el texto nativo de la red. |
| `fondo-historia-04` | Fondos para historias | 1080×1920 | Fondo libre para escribir con el texto nativo de la red. |
| `fondo-historia-05` | Fondos para historias | 1080×1920 | Fondo libre para escribir con el texto nativo de la red. |
| `fondo-historia-06` | Fondos para historias | 1080×1920 | Fondo libre para escribir con el texto nativo de la red. |
| `sticker-confirmado` | Stickers | 481×142 | Sticker «Confirmado», fondo transparente. |
| `sticker-en-camino` | Stickers | 441×142 | Sticker «En camino», fondo transparente. |
| `sticker-pendiente` | Stickers | 446×142 | Sticker «Pendiente», fondo transparente. |
| `sticker-revisa` | Stickers | 520×142 | Sticker «Revisa antes», fondo transparente. |
| `sticker-nuevo` | Stickers | 336×142 | Sticker «Nuevo», fondo transparente. |
| `sticker-alpha` | Stickers | 632×142 | Sticker «Alpha en testnet», fondo transparente. |
| `sticker-gato-sentado` | Stickers | 648×898 | Sticker troquelado del gato, fondo transparente. Solo PNG. |
| `sticker-gato-contento` | Stickers | 702×668 | Sticker troquelado del gato, fondo transparente. Solo PNG. |
| `sticker-gato-emocionado` | Stickers | 706×706 | Sticker troquelado del gato, fondo transparente. Solo PNG. |
| `sticker-gato-atento` | Stickers | 702×668 | Sticker troquelado del gato, fondo transparente. Solo PNG. |
| `sticker-gato-curioso` | Stickers | 772×738 | Sticker troquelado del gato, fondo transparente. Solo PNG. |
| `sticker-gato-durmiendo` | Stickers | 894×726 | Sticker troquelado del gato, fondo transparente. Solo PNG. |
| `sticker-gato-cauto` | Stickers | 794×602 | Sticker troquelado del gato, fondo transparente. Solo PNG. |
| `sticker-gato-somnoliento` | Stickers | 728×668 | Sticker troquelado del gato, fondo transparente. Solo PNG. |
| `fondo-pantalla-movil-01` | Fondos de pantalla | 1179×2556 | Fondo de pantalla para móvil; deja libres el reloj y los botones. |
| `fondo-pantalla-movil-02` | Fondos de pantalla | 1179×2556 | Fondo de pantalla para móvil; deja libres el reloj y los botones. |
| `fondo-pantalla-escritorio-01` | Fondos de pantalla | 2560×1440 | Fondo de pantalla para escritorio. |
| `og-gatopago` | Imagen para compartir (OG) | 1200×630 | Imagen Open Graph (oscura) para gatopago.com: se muestra al compartir el enlace en redes y mensajería. Se instala en el repositorio de la app. |
| `og-gatopago-claro` | Imagen para compartir (OG) | 1200×630 | Imagen Open Graph (clara) para gatopago.com: se muestra al compartir el enlace en redes y mensajería. Se instala en el repositorio de la app. |
| `plantilla-captura-4x5` | Plantillas con captura | 1080×1350 | Plantilla: sustituir la captura por una real de la app y el titular por la novedad. Mantener la nota de alpha. |
| `plantilla-captura-9x16` | Plantillas con captura | 1080×1920 | Plantilla: sustituir la captura por una real de la app y el titular por la novedad. Mantener la nota de alpha. |
