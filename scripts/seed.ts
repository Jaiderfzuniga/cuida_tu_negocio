// Genera supabase/seed.sql a partir de src/data (catálogo, preguntas y reglas).
// Uso: npx vite-node scripts/seed.ts > supabase/seed.sql
import { CATALOGO } from '../src/data/catalogo';
import { PREGUNTAS } from '../src/data/preguntas';

const q = (v: unknown) => (v === null || v === undefined ? 'null' : typeof v === 'number' || typeof v === 'boolean' ? String(v) : `'${String(v).replace(/'/g, "''")}'`);
const out: string[] = ['-- Datos iniciales generados por scripts/seed.ts', 'begin;'];
for (const h of CATALOGO)
  out.push(`insert into herramienta values (${[h.id, h.funcion, h.nombre, h.dispositivo, h.url, h.marca, h.costo, h.espanol, h.accesibilidad, h.uso, h.subcategoria, h.rol].map(q).join(', ')}) on conflict (id) do nothing;`);
PREGUNTAS.forEach((p, i) => {
  out.push(`insert into pregunta values (${[p.id, p.funcion, i + 1, p.texto, p.ayuda, p.motivo].map(q).join(', ')}, ${p.requiere ? q(JSON.stringify(p.requiere)) + '::jsonb' : 'null'}) on conflict (id) do nothing;`);
  p.opciones.forEach((o) => out.push(`insert into opcion values (${[p.id, o.id, o.texto, o.puntos].map(q).join(', ')}) on conflict do nothing;`));
  p.herramientas.forEach((h, k) => out.push(`insert into regla values (${[p.id, h, k + 1].map(q).join(', ')}) on conflict do nothing;`));
});
out.push('commit;');
console.log(out.join('\n'));
