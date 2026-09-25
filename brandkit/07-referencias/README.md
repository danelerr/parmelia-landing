# Referencias y snapshots

Edición 2026-09-24. **Contexto de consulta, no una segunda fuente editable.**

## Documentos

- [Narrativa completa](./documentos/gatopago_nueva_narrativa_contexto_completo_2026-08-18.txt): contexto editorial de la etapa GatoPago.
- [Rebranding maestro](./documentos/gatopago-rebranding-maestro-2026.md): plan amplio de identidad y experiencia.
- [Plan de marca y experiencia](./documentos/gatopago-plan-marca-experiencia-2026.md): objetivos, criterios y líneas de trabajo.

Estas copias preservan los textos originales. Algunas propuestas visuales y menciones públicas de Meli están superadas por decisiones posteriores; consultar [las diferencias](../01-manual/sistema-visual.md#diferencias-con-los-planes-anteriores). Un plan no acredita que una funcionalidad esté implementada.

El conjunto de documentación estratégica sigue centralizado en `documentacion/` de la landing; la documentación técnica vive en `docs/` de la app. No se copian aquí planes de negocio, contratos privados o documentación técnica sin relación directa con identidad.

## Implementación

`implementacion/` conserva `rebrand.css`, `global.css`, `CatGlyph.astro`, `MeliSprite.astro` y `brand.ts` como evidencia del estado de origen. Sus imports y rutas pertenecen al proyecto original: **no son un paquete de componentes instalable por separado**.

Los tokens reutilizables y fuentes autocontenidas están en `05-colores/` y `04-tipografia/`. Para componentes reales, trabajar en su repositorio con dependencias, pruebas y contexto completos.
