import { useEffect, useState } from 'react';
import { Pagina, Cargando } from '../components/Pagina';
import { todosLosNegocios } from '../services/store';
import { PREGUNTAS } from '../data/preguntas';
import type { Diagnostico, Negocio } from '../types';

type Fila = { negocio: Negocio; diagnosticos: Diagnostico[] };
const prom = (xs: number[]) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : null);

export default function Panel() {
  const [filas, setFilas] = useState<Fila[] | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { todosLosNegocios().then(setFilas).catch((e) => setError(e.message)); }, []);
  if (error) return <Pagina ancho="ancho" titulo="Panel del investigador"><p className="text-naranja-texto">{error}</p></Pagina>;
  if (!filas) return <Cargando />;

  const pre = (f: Fila) => f.diagnosticos.find((d) => d.momento === 'pre');
  const post = (f: Fila) => [...f.diagnosticos].reverse().find((d) => d.momento === 'post');
  const conPost = filas.filter(post);

  function exportar() {
    const cab = ['negocio', 'tipo', 'trabajadores', 'momento', 'fecha', 'identificar', 'proteger', 'recuperar', 'general', ...PREGUNTAS.map((p) => p.id)];
    const lineas = filas!.flatMap((f) => f.diagnosticos.map((d) => [f.negocio.nombre, f.negocio.tipo, f.negocio.trabajadores, d.momento, d.fecha.slice(0, 10),
      d.niveles.Identificar, d.niveles.Proteger, d.niveles.Recuperar, d.niveles.general, ...PREGUNTAS.map((p) => d.respuestas[p.id] ?? '')]));
    const csv = [cab, ...lineas].map((l) => l.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
    a.download = `escudo-digital-diagnosticos-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
  }

  const kpi = (t: string, v: string, color?: string) => (
    <div className="tarjeta p-4"><div className="text-xs font-semibold text-tenue">{t}</div><div className="text-[28px] font-black" style={{ color }}>{v}</div></div>
  );
  const celda = (a?: number, b?: number, color = 'var(--verde-texto)') =>
    a === undefined ? <span className="text-tenue">—</span> : <>{a}{b !== undefined && <> → <b style={{ color }}>{b}</b></>}</>;

  return (
    <Pagina ancho="ancho" volver="/" titulo="Negocios participantes" sub="Sector Suroriental · San Juan de Pasto">
      <div className="mt-5 flex justify-end"><button onClick={exportar} className="btn btn-primario min-h-11 text-sm">Descargar datos (CSV para Excel)</button></div>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {kpi('Negocios', String(filas.length))}
        {kpi('Con diagnóstico inicial', `${filas.filter(pre).length} / ${filas.length}`)}
        {kpi('Con diagnóstico final', `${conPost.length} / ${filas.length}`, 'var(--ambar)')}
        {kpi('Promedio general (pre → post)', `${prom(filas.map(pre).filter(Boolean).map((d) => d!.niveles.general)) ?? '—'}% → ${prom(conPost.map((f) => post(f)!.niveles.general)) ?? '—'}%`, 'var(--verde)')}
      </div>
      <div className="tarjeta mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="text-left text-xs uppercase tracking-wide text-tenue">
            {['Negocio', 'Identificar', 'Proteger', 'Recuperar', 'General', 'Estado'].map((h) => <th key={h} className="border-b border-borde px-4 py-3">{h}</th>)}
          </tr></thead>
          <tbody>
            {filas.map((f) => {
              const a = pre(f), b = post(f);
              return (
                <tr key={f.negocio.id}>
                  <td className="border-b border-borde px-4 py-3 font-bold">{f.negocio.nombre}<div className="text-xs font-normal text-tenue">{f.negocio.tipo}</div></td>
                  <td className="border-b border-borde px-4 py-3">{celda(a?.niveles.Identificar, b?.niveles.Identificar)}</td>
                  <td className="border-b border-borde px-4 py-3">{celda(a?.niveles.Proteger, b?.niveles.Proteger, 'var(--azul-texto)')}</td>
                  <td className="border-b border-borde px-4 py-3">{celda(a?.niveles.Recuperar, b?.niveles.Recuperar, 'var(--naranja-texto)')}</td>
                  <td className="border-b border-borde px-4 py-3 font-extrabold">{celda(a?.niveles.general, b?.niveles.general)}</td>
                  <td className="border-b border-borde px-4 py-3">
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-extrabold ${b ? 'bg-verde text-[#04140b]' : a ? 'bg-ambar text-[#2a1a00]' : 'border border-borde text-tenue'}`}>
                      {b ? 'Completo' : a ? 'Falta final' : 'Sin diagnóstico'}</span>
                  </td>
                </tr>
              );
            })}
            {!filas.length && <tr><td colSpan={6} className="px-4 py-8 text-center text-tenue">Todavía no hay negocios registrados.</td></tr>}
          </tbody>
        </table>
      </div>
    </Pagina>
  );
}
