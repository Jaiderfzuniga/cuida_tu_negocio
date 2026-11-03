import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagina } from '../components/Pagina';
import { Escudo3D } from '../components/Escudo3D';
import { useSesion } from '../hooks/useSesion';
import { calcularNiveles, preguntasPara } from '../lib/puntaje';
import { COLOR } from '../lib/colores';
import { guardarDiagnostico } from '../services/store';
import { refuerzo, rutaAl100 } from '../lib/motor';
import { FUNCIONES, type Funcion, type Respuestas } from '../types';

export default function Cuestionario() {
  const { negocio } = useSesion();
  const nav = useNavigate();
  const preguntas = useMemo(() => preguntasPara(negocio!), [negocio]);
  const [i, setI] = useState(0);
  const [r, setR] = useState<Respuestas>({});
  const [ayuda, setAyuda] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const p = preguntas[i];

  // El escudo se llena según las preguntas respondidas de cada función.
  const conteo = Object.fromEntries(FUNCIONES.map((f) => {
    const de = preguntas.filter((q) => q.funcion === f);
    return [f, { hechas: de.filter((q) => r[q.id]).length, total: de.length }];
  })) as Record<Funcion, { hechas: number; total: number }>;
  const llenado = Object.fromEntries(FUNCIONES.map((f) => [f, conteo[f].total ? conteo[f].hechas / conteo[f].total : 1])) as Record<Funcion, number>;

  async function siguiente() {
    setAyuda(false);
    if (i < preguntas.length - 1) { setI(i + 1); return; }
    setGuardando(true);
    try {
      const niveles = calcularNiveles(r, negocio!);
      const ruta = rutaAl100(r, negocio!, niveles);
      const extra = refuerzo(negocio!, ruta.map((p) => p.herramienta.id), ruta.length ? 1 : 2);
      const recs = [...ruta.map((p) => ({ herramientaId: p.herramienta.id, puntos: p.puntos })), ...extra.map((h) => ({ herramientaId: h.id, puntos: 0 }))];
      const d = await guardarDiagnostico(negocio!.id!, r, niveles, recs);
      nav(`/resultado/${d.id}`);
    } catch (e) { alert((e as Error).message); setGuardando(false); }
  }

  return (
    <Pagina>
      <div className="flex flex-1 flex-col md:mt-6 md:grid md:grid-cols-[280px_1fr] md:items-start md:gap-10">
      <div className="tarjeta mt-4 flex items-center gap-4 p-3 md:sticky md:top-6 md:mt-0 md:flex-col md:p-6">
        <div className="md:hidden"><Escudo3D llenado={llenado} ancho={104} id="q" /></div>
        <div className="hidden md:block"><Escudo3D llenado={llenado} ancho={180} id="qd" /></div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 md:w-full">
          <div className="text-[15px] font-extrabold">Tu escudo se está llenando</div>
          {FUNCIONES.map((f) => (
            <div key={f} className="flex items-center gap-2 text-[13px] font-bold">
              <span className="h-3 w-3 rounded" style={{ background: conteo[f].hechas ? COLOR[f].fuerte : 'transparent', border: `2px solid ${COLOR[f].fuerte}` }} />
              {f}<span className="ml-auto" style={{ color: COLOR[f].texto }}>{conteo[f].hechas} / {conteo[f].total}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="flex flex-1 flex-col md:min-h-[560px]">
      <div className="mt-5 flex items-center justify-between md:mt-0">
        <span className="rounded-full border px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide" style={{ borderColor: COLOR[p.funcion].fuerte, color: COLOR[p.funcion].texto }}>{p.funcion}</span>
        <span className="text-[13px] text-tenue">Pregunta {i + 1} de {preguntas.length}</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-pista"><div className="h-1.5 rounded-full bg-verde transition-all" style={{ width: `${((i + 1) / preguntas.length) * 100}%` }} /></div>

      <h2 key={p.id} className="aparecer mb-4 mt-4 text-[22px] font-black leading-tight">{p.texto}</h2>
      <div className="flex flex-col gap-2.5" role="radiogroup" aria-label={p.texto}>
        {p.opciones.map((o) => {
          const sel = r[p.id] === o.id;
          return (
            <button key={o.id} role="radio" aria-checked={sel} onClick={() => setR({ ...r, [p.id]: o.id })}
              className={`flex min-h-[54px] items-center gap-3 rounded-2xl px-4 text-left text-[15px] ${sel ? 'btn-primario font-extrabold' : 'tarjeta font-semibold text-texto'}`}>
              <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full border-2" style={{ borderColor: sel ? '#04140b' : 'var(--tenue)' }}>
                {sel && <span className="h-2.5 w-2.5 rounded-full bg-[#04140b]" />}
              </span>{o.texto}
            </button>
          );
        })}
      </div>
      <button onClick={() => setAyuda(!ayuda)} aria-expanded={ayuda} className="mt-4 self-start bg-transparent text-sm font-bold text-verde-texto">
        {ayuda ? 'Ocultar explicación' : '¿Qué significa esto?'}
      </button>
      {ayuda && <p className="tarjeta aparecer mt-2 p-4 text-sm leading-relaxed text-suave">{p.ayuda}</p>}

      <div className="mt-auto flex gap-3 pt-6 md:max-w-md md:self-end md:w-full">
        <button className="btn btn-secundario flex-1" onClick={() => (i ? setI(i - 1) : nav('/negocio'))}>Anterior</button>
        <button className="btn btn-primario flex-[2]" disabled={!r[p.id] || guardando} onClick={siguiente}>
          {guardando ? 'Guardando…' : i === preguntas.length - 1 ? 'Ver mi resultado' : 'Siguiente'}
        </button>
      </div>
      </section>
      </div>
    </Pagina>
  );
}
