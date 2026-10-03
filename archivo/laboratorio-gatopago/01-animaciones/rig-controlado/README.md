# Rig vectorial controlado

Cinco alternativas a los candidatos raster. No sustituyen los sprites ni el logo. La cabeza reutiliza el símbolo SVG estable; la expresión dormida es exclusiva del personaje. El cuerpo y los objetos son vectores nuevos del laboratorio.

Cada acción tiene SVG editables por capas, PNG transparentes, WebP lossless, hoja y manifest. La anatomía no depende de cinco u ocho dibujos generados independientemente: la geometría estable se reutiliza. Solo se mueve la parte indicada.

Las acciones de inserción e intercambio son ilustraciones; no demuestran ni ejecutan una operación. El estilo del cuerpo requiere revisión artística.

Regenerar con `node recursos/laboratorio-gatopago/tools/rig-character.mjs` y crear la galería con `node recursos/laboratorio-gatopago/tools/comparison-gallery.mjs rig`. El source del movimiento es el generador, no un PNG aplanado.
