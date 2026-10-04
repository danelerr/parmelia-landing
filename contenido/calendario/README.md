# Calendario editorial

| Archivo | Contenido |
|---|---|
| [calendario-2026-10-11.md](./calendario-2026-10-11.md) | Octubre y noviembre de 2026: 8 semanas temáticas, una pieza por día laborable, carruseles los martes, historias y posts horizontales |
| [calendario-2026-10-11.csv](./calendario-2026-10-11.csv) | Lo mismo en CSV, para importar en herramientas de programación |

Se genera con `npm run contenido:calendario` a partir del manifiesto de `contenido/redes/2026-10/` (ejecutar antes `npm run brandkit:social` si cambian las piezas). El plan semanal está en `herramientas/brandkit/calendario.mjs`.

Cada pieza indica si depende de la aprobación del personaje o de que la autocustodia esté demostrada; en ese caso se da una alternativa.
