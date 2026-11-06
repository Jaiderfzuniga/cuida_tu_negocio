import { Link } from 'react-router-dom';
import { Pagina, Cargando } from '../components/Pagina';
import { Robot } from '../components/Robot';
import { useSesion } from '../hooks/useSesion';
import { useDiagnosticos } from '../hooks/useDiagnostico';
import { COLOR } from '../lib/colores';
import { FUNCIONES } from '../types';

export default function Historial() {
  const { negocio } = useSesion();
  const { lista, cargando } = useDiagnosticos();
  if (cargando || !lista) return <Cargando />;
  const antes = lista[0];
  const ahora = lista[lista.length - 1];
  const hay2 = lista.length > 1;
  const cambio = hay2 ? ahora.niveles.general - antes.niveles.general : 0;
  const falta = ahora ? 100 - ahora.niveles.general : 0;

  return (
    <Pagina fantasma="AVANCE" panel={lista.length ? (
      <div className="pc:mt-[14vh]">
        <div className="text-[21px] font-semibold text-[var(--panel-suave)]">{hay2 ? (cambio >= 0 ? 'Has subido' : 'Has bajado') : 'Tu nivel hoy'}</div>
        <div className="font-display text-[clamp(90px,10.4vw,150px)] font-black leading-none tracking-[-0.05em]" style={{ color: 'var(--acento)' }}>
          {hay2 ? `${cambio >= 0 ? '+' : ''}${cambio}` : `${ahora.niveles.general}%`}
        </div>
        <div className="mt-3 text-[24px] font-extrabold leading-[1.25]">{falta > 0 ? `Te faltan ${falta} puntos para llegar al 100 %.` : '¡Llegaste al 100 %! Sigue revisando tus herramientas.'}</div>
        <div className="mt-6"><Link to={`/ruta/${ahora.id}`} className="btn btn-panel">Seguir mi ruta</Link></div>
        <div className="mt-[6vh] flex justify-end"><Robot alto={150} className="solo-pc" /></div>
      </div>
    ) : undefined}>
      <h1 className="titulo titulo-inicio mt-4 pc:mt-9">Mi avance</h1>
      <p className="subtitulo">{negocio?.nombre}</p>
      {!lista.length ? (
        <div className="mt-8">
          <p className="m-0 text-[18px]">Aún no tienes diagnósticos.</p>
          <Link to="/cuestionario" className="btn btn-primario mt-5">Hacer mi primer diagnóstico</Link>
        </div>
      ) : (
        <>
          <div className="mt-7 flex flex-col gap-7">
            {lista.map((d) => (
              <Link key={d.id} to={`/resultado/${d.id}`} className="block text-texto no-underline">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="text-[22px] font-extrabold">{d.momento === 'pre' ? 'Diagnóstico inicial' : 'Nuevo diagnóstico'}
                    <span className="text-[17px] font-medium text-suave"> · {new Date(d.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}</span></span>
                  <span className="font-display text-[46px] font-black leading-none tracking-tight">{d.niveles.general} %</span>
                </div>
                <div className="mt-2 h-[22px] overflow-hidden rounded-full border-[3px] border-[var(--borde)]">
                  <div className="h-full" style={{ width: `${d.niveles.general}%`, background: 'var(--tinta)' }} />
                </div>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[16px] font-bold">
                  {FUNCIONES.map((f) => <span key={f} style={{ color: COLOR[f].texto }}>{f} {d.niveles[f]}</span>)}
                </div>
              </Link>
            ))}
          </div>
          <Link to="/cuestionario" className="btn btn-primario mt-8">Repetir diagnóstico</Link>
        </>
      )}
    </Pagina>
  );
}
