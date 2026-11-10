import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pagina } from '../components/Pagina';
import { Robot } from '../components/Robot';
import { Logo } from '../components/Logo';
import { CATALOGO } from '../data/catalogo';
import { GUIAS, type Equipo, type Guia } from '../data/guias';
import { useSesion } from '../hooks/useSesion';
import { useDiagnosticos } from '../hooks/useDiagnostico';
import { rutaAl100 } from '../lib/motor';
import { funcionMasDebil } from '../lib/puntaje';
import { COLOR } from '../lib/colores';
import type { Funcion, Negocio } from '../types';

const EQUIPO: Record<Equipo, string> = { android: 'Celular Android', iphone: 'iPhone', pc: 'Computador', todos: 'Celular y computador' };
/** Primero Recuperar: fue la función más débil del diagnóstico (H3, H4). */
const ORDEN: Funcion[] = ['Recuperar', 'Proteger', 'Identificar'];

/** ¿La guía sirve para los equipos y plataformas que registró el negocio? */
function leSirve(g: Guia, n: Negocio | null) {
  if (!n) return true;
  if (g.equipo === 'pc' && !n.tienePc) return false;
  if ((g.equipo === 'android' || g.equipo === 'iphone') && g.equipo !== n.celular) return false;
  if (g.plataformas && !g.plataformas.some((p) => n.plataformas.includes(p))) return false;
  return true;
}

/** Nombre corto para los botones de acceso rápido. */
const corto = (g: Guia) => g.titulo
  .replace('Copia de WhatsApp en ', 'Copia de WhatsApp · ')
  .replace(' con Google One', '').replace(' con iCloud', '').replace(' con OneDrive', '')
  .replace('Verificación en dos pasos de ', 'Dos pasos: ').replace('Verificación en 2 pasos de ', 'Dos pasos: ')
  .replace('Autenticación en dos pasos de ', 'Dos pasos: ')
  .replace('Cómo reconocer un mensaje o enlace falso', 'Reconocer fraudes');

function Pasos({ g }: { g: Guia }) {
  const c = COLOR[g.funcion];
  return (
    <div className="flex flex-col gap-5">
      {g.secciones.map((s) => (
        <div key={s.titulo}>
          <h3 className="m-0 text-[18px] font-extrabold">{s.titulo}</h3>
          <ol className="m-0 mt-3 flex list-none flex-col gap-3 p-0">
            {s.pasos.map((p, i) => (
              <li key={i} className="flex items-baseline gap-4">
                <span className="w-7 flex-none font-display text-[28px] font-black leading-none" style={{ color: c.texto }}>{i + 1}</span>
                <span className="text-[17px] leading-snug">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
      {g.frecuencia && (
        <p className="ayuda m-0 text-[16px] leading-snug" style={{ ['--ayuda-color' as string]: c.texto }}>
          <strong className="ayuda-titulo">{g.funcion === 'Recuperar' ? '¿Cada cuánto?' : 'Ten en cuenta'}</strong>{g.frecuencia}
        </p>
      )}
      <p className="m-0 text-[14px] text-suave">
        Si tu pantalla se ve distinta, sigue la guía oficial:{' '}
        <a href={g.fuente.url} target="_blank" rel="noopener noreferrer" className="font-bold text-texto underline underline-offset-4">{g.fuente.nombre}</a>
      </p>
    </div>
  );
}

export default function Guias() {
  const { negocio } = useSesion();
  const { hash } = useLocation();
  const [todas, setTodas] = useState(false);
  const objetivo = hash.slice(1);
  const { actual } = useDiagnosticos();

  // Prioridad (RF-07): con diagnóstico, primero las guías de las herramientas de su ruta al 100 %, en el mismo
  // orden, y después las demás de la función más débil a la más fuerte. Sin diagnóstico, Recuperar primero,
  // que fue la función más débil en el diagnóstico de los microcomercios (H3, H4).
  const pasos = actual && negocio ? rutaAl100(actual.respuestas, negocio, actual.niveles) : [];
  const enRuta = (g: Guia) => pasos.findIndex((p) => [p.herramienta.id, ...p.alternativas.map((a) => a.id)].some((id) => g.herramientas.includes(id)));
  /** Puntos que suma la herramienta principal de su ruta que explica esta guía (0 si no está en la ruta). */
  const puntosRuta = (g: Guia) => pasos.find((p) => g.herramientas.includes(p.herramienta.id))?.puntos ?? 0;
  const peso = (g: Guia) => {
    const i = enRuta(g);
    if (i >= 0) return i;
    return 100 + (actual ? actual.niveles[g.funcion] : ORDEN.indexOf(g.funcion));
  };
  const lista = GUIAS
    .filter((g) => todas || g.id === objetivo || leSirve(g, negocio))
    .sort((a, b) => peso(a) - peso(b));
  const [abierta, setAbierta] = useState<string | null>(objetivo || lista[0]?.id || null);

  /** Abre una guía y baja hasta ella (acceso rápido y enlaces desde la ruta). */
  const ir = (id: string) => {
    setAbierta(id);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };
  useEffect(() => { if (objetivo) ir(objetivo); }, [objetivo]);
  // Al cargar el diagnóstico, abre la guía más urgente.
  useEffect(() => { if (!objetivo && lista[0]) setAbierta(lista[0].id); }, [actual?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const dato = 'font-display text-[clamp(40px,4.2vw,62px)] font-black leading-none tracking-tight';
  const rotulo = 'text-[18px] font-semibold text-[var(--panel-suave)]';

  return (
    <Pagina fantasma="GUÍAS" panelTipo="angosto" panelEnMovil={false} panel={
      <div className="mt-[6vh] flex flex-col items-end gap-7 text-right">
        <div><div className={rotulo}>Para {negocio?.nombre ?? 'tu negocio'}</div><div className={dato}>{lista.length}</div><div className="text-[18px] font-bold">guías</div></div>
        {actual && actual.niveles.general < 100 && (
          <div><div className={rotulo}>Tu punto más débil</div><div className="font-display text-[30px] font-black" style={{ color: COLOR[funcionMasDebil(actual.niveles)].texto }}>{funcionMasDebil(actual.niveles)}</div></div>
        )}
        {ORDEN.map((f) => (
          <div key={f}><div className={rotulo}>{f}</div><div className="font-display text-[34px] font-black" style={{ color: COLOR[f].texto }}>{lista.filter((g) => g.funcion === f).length}</div></div>
        ))}
        <Robot alto={150} />
      </div>
    }>
      <h1 className="titulo titulo-inicio mt-4 text-[clamp(40px,5.2vw,84px)]">Tus guías</h1>
      <p className="subtitulo">{actual ? 'Ordenadas según tu último diagnóstico: lo más urgente primero.' : 'Paso a paso, empezando por lo más urgente: tus copias de seguridad.'}</p>
      {negocio && !actual && (
        <p className="m-0 mt-2 text-[16px] text-suave">Haz el diagnóstico y te las ordenamos según tu negocio. <Link to="/cuestionario" className="font-bold text-texto underline underline-offset-4">Hacer diagnóstico</Link></p>
      )}
      {negocio && (
        <p className="m-0 mt-2 text-[16px] text-suave">
          {todas ? 'Estás viendo todas las guías.' : `Te mostramos las que sirven para ${negocio.nombre}.`}{' '}
          <button className="font-bold text-texto underline underline-offset-4" onClick={() => setTodas(!todas)}>{todas ? 'Ver solo las mías' : 'Ver todas'}</button>
        </p>
      )}

      <nav className="mt-5" aria-label="Ir a una guía">
        <div className="mb-2 text-[15px] font-extrabold">Ir directo a:</div>
        <div className="flex flex-wrap gap-2">
          {lista.map((g) => (
            <button key={g.id} className="chip" aria-pressed={abierta === g.id} onClick={() => ir(g.id)}
              style={{ borderLeft: `6px solid ${COLOR[g.funcion].fuerte}` }}>
              {corto(g)}
            </button>
          ))}
        </div>
      </nav>

      <div className="mt-7 flex flex-col gap-6">
        {lista.map((g, k) => {
          const h = CATALOGO.find((x) => x.id === g.herramientas[0]);
          const ver = abierta === g.id;
          return (
            <article key={g.id} id={g.id} className="scroll-mt-24">
              <button onClick={() => setAbierta(ver ? null : g.id)} aria-expanded={ver}
                className="flex w-full cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-left text-texto pc:gap-4">
                <span className="w-9 flex-none font-display text-[38px] font-black leading-[52px] tracking-tight">{k + 1}</span>
                {h && <Logo h={h} />}
                <div className="min-w-0 flex-1">
                  <div className="text-[19px] font-extrabold leading-tight pc:text-[20px]">{g.titulo}</div>
                  <div className="mt-1 text-[14px] font-extrabold" style={{ color: COLOR[g.funcion].texto }}>
                    {g.funcion} · {EQUIPO[g.equipo]}{puntosRuta(g) > 0 && <> · En tu ruta: +{puntosRuta(g)} puntos</>}
                  </div>
                  <div className="mt-1 text-[15px] font-medium leading-snug text-suave">{g.para}</div>
                </div>
                <span className="btn btn-primario btn-chico solo-pc">{ver ? 'Cerrar' : 'Ver pasos'}</span>
              </button>
              {ver && <div className="aparecer mt-4 pc:ml-[120px]"><Pasos g={g} /></div>}
            </article>
          );
        })}
      </div>
      {!lista.length && <p className="mt-8 text-[17px] font-semibold">No hay guías para tu negocio todavía.</p>}
    </Pagina>
  );
}
