import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagina, Cargando } from '../components/Pagina';
import { Escudo3D } from '../components/Escudo3D';
import { Robot } from '../components/Robot';
import { useSesion } from '../hooks/useSesion';
import { calcularNiveles, preguntasPara } from '../lib/puntaje';
import { guardarDiagnostico } from '../services/store';
import { refuerzo, rutaAl100 } from '../lib/motor';
import { FUNCIONES, type Funcion, type Respuestas } from '../types';

export default function Cuestionario() {
  const { negocio } = useSesion();
  const nav = useNavigate();
  const preguntas = useMemo(() => (negocio ? preguntasPara(negocio) : []), [negocio]);
  const [i, setI] = useState(0);
  const [r, setR] = useState<Respuestas>({});
  const [guardando, setGuardando] = useState(false);
  const p = preguntas[Math.min(i, Math.max(0, preguntas.length - 1))];

  // El escudo se llena según las preguntas respondidas de cada función.
  const conteo = Object.fromEntries(FUNCIONES.map((f) => {
    const de = preguntas.filter((q) => q.funcion === f);
    return [f, { hechas: de.filter((q) => r[q.id]).length, total: de.length }];
  })) as Record<Funcion, { hechas: number; total: number }>;
  const llenado = Object.fromEntries(FUNCIONES.map((f) => [f, conteo[f].total ? conteo[f].hechas / conteo[f].total : 1])) as Record<Funcion, number>;

  async function siguiente() {
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

  if (!negocio || !p) return <Cargando />;

  return (
    <Pagina fantasma={p.funcion.toUpperCase()} panelEnMovil={false} extras={
      <div className="puntos solo-pc" aria-hidden="true">
        {preguntas.map((q, k) => <i key={q.id} className={`punto ${k <= i ? 'punto-on' : ''}`} />)}
      </div>
    } panel={
      <div className="mt-[2vh] flex flex-col items-center text-center">
        <Escudo3D llenado={llenado} ancho={270} id="qd" />
        <div className="mt-5 font-display text-[25px] font-black leading-tight tracking-tight">Tu escudo se está llenando</div>
        <div className="mt-3 text-[19px] font-semibold leading-[1.7] text-[var(--panel-suave)]">
          {FUNCIONES.map((f) => <div key={f}>{f} {conteo[f].hechas} de {conteo[f].total}</div>)}
        </div>
        <Robot alto={130} className="mt-3 mr-16 self-end" />
      </div>
    }>
      <div className="mt-4 flex items-center justify-between gap-3 pc:mt-8">
        <div className="min-w-0">
          <h1 className="titulo text-[clamp(38px,5.4vw,84px)]">{p.funcion}</h1>
          <p className="m-0 mt-1 text-[18px] font-bold">Pregunta {i + 1} de {preguntas.length}</p>
        </div>
        <div className="solo-movil flex-none"><Escudo3D llenado={llenado} ancho={84} id="q" /></div>
      </div>
      <div className="puntos solo-movil mt-3" aria-hidden="true">
        {preguntas.map((q, k) => <i key={q.id} className={`punto ${k <= i ? 'punto-on' : ''}`} />)}
      </div>

      <h2 key={p.id} className="aparecer m-0 mt-4 max-w-[700px] text-[clamp(26px,2.3vw,34px)] font-extrabold leading-[1.14]">{p.texto}</h2>
      <div className="mt-4 flex max-w-[620px] flex-col gap-2.5" role="radiogroup" aria-label={p.texto}>
        {p.opciones.map((o) => (
          <button key={o.id} role="radio" aria-checked={r[p.id] === o.id} onClick={() => setR({ ...r, [p.id]: o.id })} className="opcion">{o.texto}</button>
        ))}
      </div>
      <p className="m-0 mt-4 max-w-[620px] text-[17px] leading-[1.4] text-suave"><strong className="text-texto">¿Qué significa esto?</strong> {p.ayuda}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button className="btn btn-secundario" onClick={() => (i ? setI(i - 1) : nav('/negocio'))}>Anterior</button>
        <button className="btn btn-primario" disabled={!r[p.id] || guardando} onClick={siguiente}>
          {guardando ? 'Guardando…' : i === preguntas.length - 1 ? 'Ver mi resultado' : 'Siguiente'}
        </button>
      </div>
    </Pagina>
  );
}
