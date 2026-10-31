import { Link } from 'react-router-dom';
import { Pagina, Cargando } from '../components/Pagina';
import { Escudo3D } from '../components/Escudo3D';
import { useSesion } from '../hooks/useSesion';
import { useDiagnosticos } from '../hooks/useDiagnostico';
import { COLOR } from '../lib/colores';
import { FUNCIONES, type Niveles } from '../types';

const llen = (n: Niveles) => ({ Identificar: n.Identificar / 100, Proteger: n.Proteger / 100, Recuperar: n.Recuperar / 100 });

export default function Historial() {
  const { negocio } = useSesion();
  const { lista, cargando } = useDiagnosticos();
  if (cargando || !lista) return <Cargando />;
  const antes = lista[0];
  const ahora = lista[lista.length - 1];
  const hay2 = lista.length > 1;

  return (
    <Pagina volver="/" titulo="Tu avance" sub={negocio?.nombre}>
      {!lista.length ? (
        <div className="mt-10 text-center text-suave">Aún no tienes diagnósticos.
          <Link to="/cuestionario" className="btn btn-primario mt-6">Hacer mi primer diagnóstico</Link></div>
      ) : (
        <>
          <div className="md:mt-2 md:grid md:grid-cols-2 md:gap-10">
          <div>
          <div className="tarjeta mt-5 flex items-center justify-around p-4" style={{ borderColor: 'var(--verde)' }}>
            <div className="flex flex-col items-center gap-1">
              <Escudo3D id="ha" ancho={88} llenado={llen(antes.niveles)} />
              <span className="text-xs font-semibold text-tenue">{hay2 ? 'Antes' : 'Hoy'}</span>
              <span className="text-[28px] font-black text-suave">{antes.niveles.general}%</span>
            </div>
            {hay2 && <>
              <svg width="44" height="24" viewBox="0 0 48 24" aria-hidden="true"><path d="M2 12h40M34 4l8 8-8 8" fill="none" stroke="var(--verde)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <div className="flex flex-col items-center gap-1">
                <Escudo3D id="hb" ancho={88} llenado={llen(ahora.niveles)} />
                <span className="text-xs font-semibold text-tenue">Ahora</span>
                <span className="text-[28px] font-black text-verde">{ahora.niveles.general}%</span>
              </div>
            </>}
          </div>
          {hay2 && (
            <p className="m-0 mt-2 text-center text-sm font-bold text-verde-texto">
              {ahora.niveles.general >= antes.niveles.general ? `Subiste ${ahora.niveles.general - antes.niveles.general} puntos` : `Bajaste ${antes.niveles.general - ahora.niveles.general} puntos`}
            </p>
          )}

          <h2 className="mb-0 mt-6 text-[15px] font-extrabold">Por función</h2>
          <div className="mt-3 flex flex-col gap-4">
            {FUNCIONES.map((f) => (
              <div key={f}>
                <div className="flex justify-between text-[13px] font-bold"><span>{f}</span>
                  <span>{hay2 && <>{antes.niveles[f]}% → </>}<span style={{ color: COLOR[f].texto }}>{ahora.niveles[f]}%</span></span></div>
                <div className="relative mt-1.5 h-2.5 rounded-full bg-pista">
                  <div className="absolute h-2.5 rounded-full" style={{ width: `${ahora.niveles[f]}%`, background: COLOR[f].fuerte }} />
                  {hay2 && <div className="absolute -top-[3px] h-4 w-0.5 bg-texto" style={{ left: `${antes.niveles[f]}%` }} />}
                </div>
              </div>
            ))}
            {hay2 && <div className="text-xs text-tenue">La línea marca tu resultado anterior.</div>}
          </div>

          </div>
          <div className="flex flex-col">
          <h2 className="mb-0 mt-6 text-[15px] font-extrabold md:mt-5">Diagnósticos</h2>
          <div className="mt-2.5 flex flex-col gap-2">
            {[...lista].reverse().map((d) => (
              <Link key={d.id} to={`/resultado/${d.id}`} className="tarjeta flex items-center justify-between px-4 py-3 text-texto no-underline">
                <span className="text-sm font-bold">{d.momento === 'pre' ? 'Diagnóstico inicial' : 'Diagnóstico de seguimiento'}</span>
                <span className="text-[13px] text-suave">{new Date(d.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })} · {d.niveles.general}%</span>
              </Link>
            ))}
          </div>
          <Link to="/cuestionario" className="btn btn-primario mt-auto md:mt-6">Repetir diagnóstico</Link>
          </div>
          </div>
        </>
      )}
    </Pagina>
  );
}
