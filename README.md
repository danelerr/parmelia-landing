# GatoPago — marca y recursos

Este repositorio conserva la identidad de GatoPago: brandkit, originales, fuentes,
sprites, recursos gráficos y documentación. Ya no contiene una landing ni una app.
No tiene servidor de desarrollo, rutas públicas, analítica ni configuración de despliegue.

La landing y la app se trabajan en el repositorio unificado `gatopago/gatopago`.
Este cambio no modifica ni publica ese frontend.

## Dónde está cada cosa

| Carpeta | Contenido |
|---|---|
| [brandkit/](./brandkit/README.md) | Manual, logos, iconos, tipografía, colores, personaje y originales |
| [brandkit/index.html](./brandkit/index.html) | Catálogo visual local, sin conexión |
| [documentacion/](./documentacion/README.md) | Narrativa, estrategia y lineamientos; separados por procedencia |
| [recursos/](./recursos/README.md) | Ilustraciones web conservadas, iconos de redes/tokens, portada y presentaciones |
| `scripts/` | Generación, verificación y empaquetado del kit |
| `output/` | Entregas ZIP y archivos de trabajo locales; no se versionan |

Las carpetas de configuración de agentes contienen herramientas de trabajo,
no código de producto. El nombre del directorio local conserva su nombre anterior
para no romper accesos del equipo; el paquete se llama `gatopago-brandkit`.

## Mantener el kit

Con Node >=22.12:

```sh
npm ci
npm run brandkit:build
npm run brandkit:verify -- --sources
npm run brandkit:test
npm run brandkit:zip
npm run brandkit:external
npm run brandkit:frontend
```

La candidata actual es **1.0.0-rc.1**, no una aprobación artística final. Se generan
un ZIP interno, otro externo con la base vigente y un tarball npm local y privado.
Las entregas quedan en `output/`; se excluye el material retirado de `brandkit/descartado/`.
Las variantes nuevas, componentes y plantillas quedan solo en la entrega interna.
Las fuentes editables están versionadas: mapas del símbolo, tokens JSON, originales,
fuentes con licencia, plantillas y documentación. No se requieren Astro, Tailwind,
fuentes de `node_modules`, archivos de la antigua landing ni otro checkout.

No borrar `brandkit/` antes de regenerarlo: también almacena originales. El build
valida una copia temporal antes de sustituir el resultado y no redibuja el personaje.
Para rehacer los recortes, ejecutar `npm run brandkit:personaje` antes del build.

Consulta [entrega y mantenimiento](./brandkit/01-manual/entrega-y-mantenimiento.md)
para conocer procedencia, licencias y límites de la entrega.
