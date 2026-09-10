# Documentación central de GatoPago

**Estado:** índice canónico de estrategia, producto y marca.  
**Última organización:** 23 de agosto de 2026.

Esta carpeta es la fuente central de documentación editorial de GatoPago. La documentación operativa que debe evolucionar junto al código —arquitectura, API, contratos, seguridad, despliegues y runbooks— permanece en [`parmelia-links`](https://github.com/danelerr/parmelia-links).

## Decisiones vigentes

- La marca pública es **GatoPago**, siempre unida.
- La promesa principal es **“Tus dólares ya saben moverse.”**
- La filosofía es **“Tu dinero sigue siendo tuyo. GatoPago se ocupa del camino.”**
- La categoría interna es **cuenta onchain programable**.
- La versión disponible es una **alpha de testnet**; Card, mainnet y cobertura comercial no deben presentarse como capacidades activas.
- **Meli** es únicamente el nombre interno de producción de la mascota. En textos públicos se usa “el gato”, “la mascota” o la acción que está realizando. No se bautizan funciones, espacios ni automatizaciones con “Meli”.
- No existe una sección de producto llamada “Web3”. La infraestructura onchain aparece solo cuando ayuda a entender control, riesgo o ejecución.

## Orden de precedencia

Cuando dos documentos entren en conflicto, se aplica este orden:

1. Realidad verificada del producto y configuración ejecutable en `parmelia-links`.
2. [Narrativa y contexto completo](./nuevos/gatopago_nueva_narrativa_contexto_completo_2026-08-18.txt).
3. [Índice maestro de estrategia](./nuevos/gatopago-indice-maestro-estrategia-2026.md).
4. [Rebranding maestro](./nuevos/gatopago-rebranding-maestro-2026.md).
5. [Visión y plan de mejora](./nuevos/gatopago-vision-plan-mejora-2026.md).
6. Planes especializados de `nuevos/`.
7. Material de `antiguos/modificados/`, que sirve como evidencia o contexto y nunca como decisión vigente por sí solo.

## Nuevos

`nuevos/` contiene únicamente documentos redactados desde cero para la etapa GatoPago 2026:

- estrategia integral B2C, B2B2C y B2B;
- planes de Personal, Embedded, Platform, producto, tecnología, marca, marketing, crecimiento, operaciones, riesgo, métricas, empresa y capital;
- narrativa canónica y sistema de mensajes;
- manual visual y de interacción;
- visión de producto y planes de ejecución.

El punto de entrada es el [índice maestro](./nuevos/gatopago-indice-maestro-estrategia-2026.md). No es necesario leer todos los planes para tomar una decisión puntual.

## Antiguos

`antiguos/` se divide por procedencia:

- `originales/` conserva fuentes y assets sin reescritura editorial;
- `modificados/` conserva documentos heredados que fueron anotados, corregidos o adaptados a GatoPago.

### Antiguos originales

| Archivo | Uso válido | Precaución |
|---|---|---|
| Bases y convocatoria de preaceleración | Consultar requisitos históricos | Verificar vigencia antes de reutilizar |
| Capturas de producto de mayo y junio de 2026 | Evidencia visual de la etapa anterior | No representan la interfaz actual |
| Fotografía de Daniel | Asset de contexto | Confirmar autorización y necesidad antes de publicar |
| Contrato laboral fuente | Consulta privada | **No publicar ni versionar** |

### Antiguos modificados

| Archivo | Uso válido | No usar para |
|---|---|---|
| [Arquitectura de información UX](./antiguos/modificados/ux-arquitectura-informacion-2026.md) | Reglas de hubs, confirmación y resultados | Paleta, tipografía o tratamiento visual actual |
| [Benchmark Peanut](./antiguos/modificados/benchmark-peanut-2026.md) | Hipótesis competitivas y aprendizajes de producto | Afirmaciones actuales sobre el competidor sin volver a verificarlas |
| [Contexto AvaSettle](./antiguos/modificados/contexto-avasettle-2026.txt) | Origen de ideas B2B, conciliación y settlement | Dirección vigente o promesa comercial de GatoPago |
| [Transcripción Elton](./antiguos/modificados/transcripcion-elton-2026.md) | Fuente primaria de una conversación | Copy, posicionamiento o decisión aprobada |
| [Ideas de hackathons](./antiguos/modificados/ideas-hackathons-cripto.md) | Banco experimental de prototipos | Roadmap comprometido |
| [Modernización de producto](./antiguos/modificados/gatopago-modernizacion-producto-arquitectura-2026.md) | Diagnóstico técnico del 3 de agosto | Confirmación actual sin revisar el código |
| [Narrativa Notion ES](./antiguos/modificados/gatopago-notion-ES.md) y [EN](./antiguos/modificados/gatopago-notion-EN.md) | Versiones adaptadas de documentos Parmelia | Fuente narrativa canónica |
| [Postulación Innova](./antiguos/modificados/innova-preaceleracion-2026.md) | Reutilizar respuestas verificadas | Asumir que la convocatoria sigue abierta |

Los PDF de `antiguos/originales/` permanecen locales porque el repositorio ignora ese formato. `contrato-laboral-fuente.pdf` contiene una fuente privada y **no debe publicarse**; las bases y convocatorias solo deben versionarse si se confirma que pueden distribuirse.

## Regla de mantenimiento

- Todo documento nuevo debe indicar fecha, estado y alcance.
- Si reemplaza otro documento, debe declararlo y actualizar este índice.
- Los exports HTML, PDF o PPTX no se guardan como documentos independientes sin indicar cuál es la fuente editable.
- Los nombres técnicos heredados —dominios `parmelia.me`, contratos `Parmelia*`, colas o aliases de API— no son narrativa pública y se mantienen mientras sigan siendo identificadores reales.
- Ningún documento autoriza despliegues, cambios de red o publicación por sí mismo.
