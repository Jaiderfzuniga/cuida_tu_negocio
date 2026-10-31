import { Link, Navigate, useParams } from 'react-router-dom';
import { Pagina, Cargando } from '../components/Pagina';
import { Escudo3D } from '../components/Escudo3D';
import { TarjetaHerramienta } from '../components/TarjetaHerramienta';
import { useSesion } from '../hooks/useSesion';
import { useDiagnosticos } from '../hooks/useDiagnostico';
import { refuerzo, rutaAl100 } from '../lib/motor';
import { COLOR } from '../lib/colores';
import { FUNCIONES } from '../types';

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

  return (
    <Pagina volver={`/resultado/${actual.id}`} titulo={pasos.length ? 'Tu ruta al 100%' : 'Tus herramientas'} sub={negocio.nombre}>
      <div className="tarjeta mt-4 flex items-center gap-4 p-3.5" style={{ borderColor: 'var(--verde)' }}>
        <Escudo3D id="r" ancho={84} texto={`${n.general}%`} llenado={{ Identificar: n.Identificar / 100, Proteger: n.Proteger / 100, Recuperar: n.Recuperar / 100 }} />
        <div className="flex-1">
          <div className="text-[13px] text-suave">Hoy tienes</div>
          <div className="text-[30px] font-black leading-tight">{n.general}% <span className="text-base text-tenue">de 100%</span></div>
          <p className="m-0 mt-1 text-[13px] leading-snug text-suave">
            {pasos.length ? <>Te faltan <strong className="text-verde-texto">{100 - n.general} puntos</strong>. {pasos.length === 1 ? 'Esta herramienta los cubre' : `Estas ${pasos.length} herramientas los cubren`}.</> : <>¡Excelente! <strong className="text-verde-texto">Tu negocio tiene muy buena protección.</strong> Igual te recomendamos estas herramientas para mantenerla.</>}
          </p>
        </div>
      </div>

      {pasos.length > 0 && (
        <div className="mt-4">
          <div className="flex h-4 overflow-hidden rounded-full bg-pista" role="img"
            aria-label={`Ahora ${n.general}; ${FUNCIONES.map((f) => `${f} +${suma[f]}`).join(', ')}`}>
            <div style={{ width: `${n.general}%`, background: 'var(--tenue)' }} />
            {FUNCIONES.filter((f) => suma[f]).map((f) => <div key={f} style={{ width: `${suma[f]}%`, background: COLOR[f].fuerte, borderLeft: '2px solid var(--fondo)' }} />)}
          </div>
          <div className="mt-1.5 flex flex-wrap justify-between gap-x-3 text-[11px] font-bold text-tenue">
            <span>Ahora {n.general}</span>
            {FUNCIONES.filter((f) => suma[f]).map((f) => <span key={f} style={{ color: COLOR[f].texto }}>{f} +{suma[f]}</span>)}
            <span className="text-texto">= 100</span>
          </div>
        </div>
      )}

      {pasos.length > 0 && <h2 className="mb-0 mt-5 text-[15px] font-extrabold">En este orden (lo más urgente primero)</h2>}
      <div className="mt-3 flex flex-col gap-2.5 md:grid md:grid-cols-2 md:items-start md:gap-4">
        {pasos.map((p, k) => (
          <div key={p.herramienta.id}>
            <TarjetaHerramienta h={p.herramienta} destacada={k === 0} abierta={k === 0}
              cabeza={<span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 text-xs font-black" style={{ borderColor: COLOR[p.funcion].fuerte, color: COLOR[p.funcion].texto }}>{k + 1}</span>}
              extra={<div className="flex-none text-right"><div className="text-[17px] font-black" style={{ color: COLOR[p.funcion].texto }}>+{p.puntos}</div><div className="text-[10px] font-bold uppercase text-tenue">{p.funcion}</div></div>} />
            <p className="m-0 mt-1 px-2 text-xs text-tenue">Porque {p.motivos.join(' y ')}.
              {p.alternativas.length > 0 && <> También sirve: {p.alternativas.map((a) => a.nombre).join(', ')}.</>}</p>
          </div>
        ))}
      </div>

      {extra.length > 0 && (
        <>
          <h2 className="mb-0 mt-6 text-[15px] font-extrabold">{pasos.length ? 'Para reforzar lo que ya haces' : 'Te recomendamos conocerlas'}</h2>
          <p className="m-0 mt-1 text-xs text-tenue">{pasos.length ? 'No suman puntos, pero mejoran tu protección.' : 'Son gratuitas, sirven en tus equipos y te ayudan a seguir protegido.'}</p>
          <div className="mt-3 flex flex-col gap-2.5 md:grid md:grid-cols-2 md:items-start lg:grid-cols-3 md:gap-4">
            {extra.map((h, k) => (
              <TarjetaHerramienta key={h.id} h={h} destacada={!pasos.length && k === 0} abierta={!pasos.length && k === 0}
                extra={<span className="flex-none rounded-lg px-2 py-1 text-[10px] font-extrabold uppercase" style={{ border: `1px solid ${COLOR[h.funcion].fuerte}`, color: COLOR[h.funcion].texto }}>{h.funcion}</span>} />
            ))}
          </div>
        </>
      )}

      <p className="m-0 mt-4 text-[11px] leading-snug text-tenue">Revisa siempre el logo y el sitio oficial antes de descargar. Tu porcentaje cambia cuando repites el diagnóstico.</p>
      <div className="mt-auto flex flex-col gap-3 pt-5 md:flex-row md:[&>*]:flex-1">
        <Link to="/cuestionario" className="btn btn-primario">{pasos.length ? 'Ya apliqué las herramientas · Repetir diagnóstico' : 'Repetir diagnóstico'}</Link>
        <Link to="/catalogo" className="btn btn-secundario">Ver todo el catálogo (33)</Link>
      </div>
    </Pagina>
  );
}
