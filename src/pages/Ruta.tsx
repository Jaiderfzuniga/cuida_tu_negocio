import { Link, Navigate, useParams } from 'react-router-dom';
import { Pagina, Cargando } from '../components/Pagina';
import { Robot } from '../components/Robot';
import { TarjetaHerramienta } from '../components/TarjetaHerramienta';
import { useSesion } from '../hooks/useSesion';
import { useDiagnosticos } from '../hooks/useDiagnostico';
import { refuerzo, rutaAl100 } from '../lib/motor';
import { COLOR } from '../lib/colores';
import { FUNCIONES } from '../types';
import { guiaDe } from '../data/guias';

export default function Ruta() {
  const { id } = useParams();
  const { negocio } = useSesion();
  const { actual, cargando } = useDiagnosticos(id);
  if (cargando) return <Cargando />;
  if (!actual || !negocio) return <Navigate to="/cuestionario" replace />;
  const n = actual.niveles;
  const pasos = rutaAl100(actual.respuestas, negocio, n);
  const extra = refuerzo(negocio, pasos.flatMap((p) => [p.herramienta.id, ...p.alternativas.map((a) => a.id)]), pasos.length ? 1 : 2);
  const suma = Object.fromEntries(FUNCIONES.map((f) => [f, pasos.filter((p) => p.funcion === f).reduce((s, p) => s + p.puntos, 0)]));
  const cuantas = pasos.length === 1 ? 'esta herramienta' : `estas ${pasos.length} herramientas`;
  const dato = 'font-display text-[clamp(40px,4.2vw,62px)] font-black leading-none tracking-tight';
  const rotulo = 'text-[18px] font-semibold text-[var(--panel-suave)]';

  return (
    <Pagina fantasma="RUTA" panelTipo="angosto" panelEnMovil={false} panel={
      <div className="mt-[6vh] flex flex-col items-end gap-7 text-right">
        <div><div className={rotulo}>Hoy</div><div className={dato}>{n.general} %</div></div>
        {pasos.length > 0 ? (
          <>
            <div><div className={rotulo}>Te faltan</div><div className={dato}>{100 - n.general}</div></div>
            <div><div className={rotulo}>Con {cuantas}</div><div className={dato} style={{ color: 'var(--acento)' }}>100 %</div></div>
          </>
        ) : <div className="text-[18px] font-bold">Tu negocio tiene muy buena protección.</div>}
        <Robot alto={150} className="mt-2" />
      </div>
    }>
      <h1 className="titulo titulo-inicio mt-4 text-[clamp(40px,5.2vw,84px)] pc:mt-5">{pasos.length ? 'Tu ruta al 100\u00a0%' : 'Tus herramientas'}</h1>
      <p className="subtitulo">{pasos.length ? 'En este orden: lo más urgente primero.' : 'Te recomendamos estas para mantener tu protección.'}</p>
      <p className="m-0 mt-2 text-[16px] text-suave">{negocio.nombre} · <Link to={`/resultado/${actual.id}`} className="font-bold text-texto underline underline-offset-4">Volver a mi resultado</Link></p>
      <p className="solo-movil m-0 mt-3 text-[18px] font-extrabold">Hoy tienes {n.general} %{pasos.length > 0 && <>. Te faltan {100 - n.general} puntos.</>}</p>

      {pasos.length > 0 && (
        <div className="mt-4 flex h-5 overflow-hidden rounded-full border-[3px] border-[var(--borde)]" role="img"
          aria-label={`Ahora ${n.general}; ${FUNCIONES.map((f) => `${f} +${suma[f]}`).join(', ')}`}>
          <div style={{ width: `${n.general}%`, background: 'var(--tinta)' }} />
          {FUNCIONES.filter((f) => suma[f]).map((f) => <div key={f} style={{ width: `${suma[f]}%`, background: COLOR[f].fuerte }} />)}
        </div>
      )}

      <div className="mt-5 flex flex-col gap-6">
        {pasos.map((p, k) => (
          <div key={p.herramienta.id}>
          <TarjetaHerramienta h={p.herramienta}
            cabeza={<span className="w-9 flex-none font-display text-[38px] font-black leading-[52px] tracking-tight">{k + 1}</span>}
            nota={<div className="mt-1 text-[16px] font-medium leading-snug text-suave">Porque {p.motivos.join(' y ')}.{p.alternativas.length > 0 && <> También sirve: {p.alternativas.map((a) => a.nombre).join(', ')}.</>}</div>}
            extra={<>
              <span className="flex-none font-display text-[30px] font-black" style={{ color: COLOR[p.funcion].texto }} aria-label={`Suma ${p.puntos} puntos en ${p.funcion}`}>+{p.puntos}</span>
              <a href={p.herramienta.url} target="_blank" rel="noopener noreferrer" className="btn btn-primario btn-chico solo-pc" aria-label={`Abrir ${p.herramienta.nombre}`}>Abrir</a>
            </>} />
          <a href={p.herramienta.url} target="_blank" rel="noopener noreferrer" className="btn btn-primario btn-chico solo-movil mt-3 w-full" aria-label={`Abrir ${p.herramienta.nombre}`}>Abrir</a>
          {(() => { const g = guiaDe(p.herramienta.id, negocio.celular); return g && (
            <Link to={`/guias#${g.id}`} className="mt-2 inline-block text-[16px] font-bold underline underline-offset-4 pc:ml-[68px]" style={{ color: COLOR[g.funcion].texto }}>Ver guía paso a paso: {g.titulo}</Link>
          ); })()}
          </div>
        ))}
      </div>

      {extra.length > 0 && (
        <>
          <h2 className="m-0 mt-8 font-display text-[24px] font-black uppercase tracking-tight">{pasos.length ? 'Para reforzar lo que ya haces' : 'Te recomendamos conocerlas'}</h2>
          <p className="m-0 mt-1 text-[16px] text-suave">{pasos.length ? 'No suman puntos, pero mejoran tu protección.' : 'Son gratuitas, sirven en tus equipos y te ayudan a seguir protegido.'}</p>
          <div className="mt-4 flex flex-col gap-5">
            {extra.map((h, k) => <TarjetaHerramienta key={h.id} h={h} abierta={!pasos.length && k === 0} />)}
          </div>
        </>
      )}

      <p className="m-0 mt-6 text-[15px] leading-snug text-suave">Revisa siempre el logo y el sitio oficial antes de descargar. Tu porcentaje cambia cuando repites el diagnóstico.</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link to="/cuestionario" className="btn btn-primario">{pasos.length ? 'Ya las apliqué · Repetir' : 'Repetir diagnóstico'}</Link>
        <Link to="/catalogo" className="btn btn-secundario">Ver todo el catálogo</Link>
      </div>
    </Pagina>
  );
}
