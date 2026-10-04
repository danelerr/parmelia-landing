/**
 * Editorial calendar for the social pieces in contenido/redes/2026-10: one Markdown table per week and a CSV for scheduling tools.
 * Captions come from the pieces manifest; pieces that depend on the character's artistic approval or on proven self-custody are flagged.
 * Output: contenido/calendario/calendario-2026-10-11.{md,csv}. Usage: npm run contenido:calendario (after brandkit:social).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const man = JSON.parse(fs.readFileSync(`${root}/contenido/redes/2026-10/manifest.json`, 'utf8'));
const byId = Object.fromEntries(man.pieces.map(r => [r.id, r]));
const CAT = id => /^(gato-|carrusel-|sticker-gato|og-|fondo-pantalla)/.test(id) || ['historia-02', 'historia-08', 'en-04', 'entre-paises-05', 'horizontal-02', 'horizontal-03', 'fondo-historia-03', 'fondo-historia-05'].includes(id) || /^banner-(x-01|linkedin-01|youtube|facebook|linkedin-post)/.test(id);
const NET = { feed: 'Instagram · LinkedIn', carrusel: 'Instagram · LinkedIn', historia: 'Instagram · Facebook (historias)', x: 'X · LinkedIn' };
// [fecha, tipo, id, tema, alternativa si la pieza está bloqueada]
const weeks = [
  ['El problema', [
    ['2026-10-05', 'feed', 'manifiesto-08'], ['2026-10-05', 'historia', 'historia-09'],
    ['2026-10-06', 'carrusel', 'carrusel-palabras'],
    ['2026-10-07', 'feed', 'manifiesto-09'], ['2026-10-07', 'historia', 'historia-06'],
    ['2026-10-08', 'feed', 'comparar-02'], ['2026-10-08', 'x', 'horizontal-05'],
    ['2026-10-09', 'feed', 'manifiesto-01'], ['2026-10-09', 'historia', 'historia-01']]],
  ['Qué es GatoPago', [
    ['2026-10-12', 'feed', 'manifiesto-10'],
    ['2026-10-13', 'carrusel', 'carrusel-cobrar'],
    ['2026-10-14', 'feed', 'pilares-03'], ['2026-10-14', 'historia', 'historia-05'],
    ['2026-10-15', 'feed', 'entre-paises-01'], ['2026-10-15', 'x', 'horizontal-03'],
    ['2026-10-16', 'feed', 'estado-01'], ['2026-10-16', 'historia', 'historia-07']]],
  ['Cobrar desde otro país', [
    ['2026-10-19', 'feed', 'entre-paises-02'],
    ['2026-10-20', 'carrusel', 'carrusel-revisar'],
    ['2026-10-21', 'feed', 'glosario-01'], ['2026-10-21', 'historia', 'historia-04'],
    ['2026-10-22', 'feed', 'entre-paises-05'], ['2026-10-22', 'x', 'horizontal-01'],
    ['2026-10-23', 'feed', 'consejo-01'], ['2026-10-23', 'historia', 'historia-03']]],
  ['Seguridad', [
    ['2026-10-26', 'feed', 'consejo-02'],
    ['2026-10-27', 'carrusel', 'carrusel-estafas'],
    ['2026-10-28', 'feed', 'glosario-06'],
    ['2026-10-29', 'feed', 'comparar-01'], ['2026-10-29', 'x', 'horizontal-02'],
    ['2026-10-30', 'feed', 'consejo-08'], ['2026-10-30', 'historia', 'fondo-historia-01', 'Fondo libre + sticker «Revisa antes»: escribir «¿Revisaste el destino?»']]],
  ['DeFi sin jerga', [
    ['2026-11-02', 'feed', 'defi-01'],
    ['2026-11-03', 'carrusel', 'carrusel-defi'],
    ['2026-11-04', 'feed', 'glosario-02'],
    ['2026-11-05', 'feed', 'defi-02'], ['2026-11-05', 'x', 'horizontal-04'],
    ['2026-11-06', 'feed', 'pilares-04'], ['2026-11-06', 'historia', 'fondo-historia-02', 'Fondo libre: pregunta abierta «¿Qué te frena de usar DeFi?» con sticker de preguntas']]],
  ['Tuya y abierta', [
    ['2026-11-09', 'feed', 'pilares-01', null, 'manifiesto-02'],
    ['2026-11-10', 'feed', 'pilares-07', null, 'comparar-03'],
    ['2026-11-11', 'feed', 'glosario-05'],
    ['2026-11-12', 'feed', 'pilares-02', null, 'principio-01'],
    ['2026-11-13', 'feed', 'pilares-05']]],
  ['El gato y los principios', [
    ['2026-11-16', 'feed', 'gato-01'], ['2026-11-16', 'historia', 'historia-02'],
    ['2026-11-17', 'feed', 'acciones-01'],
    ['2026-11-18', 'feed', 'gato-07'],
    ['2026-11-19', 'feed', 'principio-03'],
    ['2026-11-20', 'feed', 'gato-04']]],
  ['Cierre de mes', [
    ['2026-11-23', 'feed', 'pilares-06', null, 'manifiesto-05'],
    ['2026-11-24', 'feed', 'acciones-03'],
    ['2026-11-25', 'feed', 'glosario-08'],
    ['2026-11-26', 'feed', 'entre-paises-04'],
    ['2026-11-27', 'feed', 'gato-11'], ['2026-11-27', 'historia', 'historia-08']]],
];
const DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const fecha = d => { const t = new Date(d + 'T12:00:00'); return `${DAYS[t.getDay()]} ${t.getDate()}/${t.getMonth() + 1}`; };
const needs = id => [CAT(id) && 'personaje', byId[id]?.revisar && 'autocustodia'].filter(Boolean);
const png = id => id.startsWith('carrusel-') ? `${id}-01` : id;
const missing = [];
let md = `# Calendario editorial · octubre y noviembre de 2026

**Estado:** propuesta. Generado a partir de [\`contenido/redes/2026-10\`](../redes/2026-10/index.html); los textos son los sugeridos en su manifiesto.
**Ritmo:** un post de lunes a viernes, un carrusel los martes, historias tres veces por semana y un post horizontal los jueves para X y LinkedIn.
**Archivo para herramientas de programación:** [calendario-2026-10-11.csv](./calendario-2026-10-11.csv).

## Antes de publicar

- **Personaje:** las piezas marcadas así usan ilustraciones del gato, que siguen pendientes de aprobación artística.
- **Autocustodia:** las piezas marcadas así prometen que los fondos son del usuario y que puede salir cuando quiera. Se publican solo cuando eso esté demostrado; mientras tanto, usar la alternativa indicada.
- **Alpha:** las piezas de producto ya llevan «Alpha en testnet · fondos de prueba».
- Carruseles: subir las diapositivas en orden (\`-01\`, \`-02\`…). En LinkedIn, como documento PDF.
- No se publica los fines de semana: el sábado se revisa la semana siguiente.

`;
const csv = [['fecha', 'dia', 'semana', 'tipo', 'red', 'pieza', 'archivo', 'texto', 'requiere', 'alternativa'].join(',')];
const q = s => `"${String(s ?? '').replace(/"/g, '""')}"`;
weeks.forEach(([tema, items], w) => {
  md += `## Semana ${w + 1}: ${tema}\n\n| Día | Tipo | Red | Pieza | Texto sugerido | Requiere |\n|---|---|---|---|---|---|\n`;
  for (const [d, tipo, id, note, alt] of items) {
    const r = byId[png(id)] || byId[id]; if (!r) { missing.push(id); continue; }
    const req = needs(id), base = byId[id] ? byId[id].copy : r.copy;
    const copy = tipo === 'historia' && !note ? 'Sin pie de texto: la historia se entiende sola.' : (note || base).replace(/\s*\[Publicar cuando[^\]]*\]/, '');
    const reqTxt = [...req, alt && `si no: \`${alt}\``].filter(Boolean).join(' · ') || '—';
    md += `| ${fecha(d)} | ${tipo} | ${NET[tipo]} | [\`${id}\`](../redes/2026-10/png/${png(id)}.png) | ${copy.replace(/\|/g, '/')} | ${reqTxt} |\n`;
    csv.push([d, fecha(d), w + 1, tipo, NET[tipo], id, `contenido/redes/2026-10/png/${png(id)}.png`, copy, req.join(' '), alt].map(q).join(','));
  }
  md += '\n';
});
md += `## Piezas que quedan libres

Todo lo que no está en el calendario sigue disponible para responder a la actualidad o reforzar una semana: el resto de consejos, glosario, el gato, la serie en inglés, los stickers y los fondos para historias. Ver la [galería](../redes/2026-10/index.html).
`;
if (missing.length) throw new Error('Missing pieces: ' + missing.join(', '));
fs.writeFileSync(`${root}/contenido/calendario/calendario-2026-10-11.md`, md);
fs.writeFileSync(`${root}/contenido/calendario/calendario-2026-10-11.csv`, csv.join('\n') + '\n');
console.log('rows', csv.length - 1);
