import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTema } from '../hooks/useTema';
import { useSesion } from '../hooks/useSesion';
import { salir } from '../services/store';
import { modoDemo } from '../services/supabase';

function Tema() {
  const { tema, alternar } = useTema();
  return (
    <button onClick={alternar} className="icono-redondo" aria-label={tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}>
      {tema === 'oscuro' ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>
      )}
    </button>
  );
}

function Navegacion() {
  const { perfil, negocio, refrescar } = useSesion();
  const [abierto, setAbierto] = useState(false);
  const nav = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => setAbierto(false), [pathname]);

  const enlaces: [string, string][] = [['/', 'Inicio'], ['/como-funciona', 'Cómo funciona'], ['/catalogo', 'Catálogo']];
  if (perfil && negocio) enlaces.push(['/historial', 'Mi avance']);
  const clase = ({ isActive }: { isActive: boolean }) => `nav-enlace ${isActive ? 'nav-activo' : ''}`;
  const cuenta = (
    <>
      {perfil && <Link to={negocio ? '/cuestionario' : '/negocio'}>Hacer diagnóstico</Link>}
      {perfil && <Link to="/negocio">Datos del negocio</Link>}
      {perfil?.rol === 'investigador' && <Link to="/panel">Panel del investigador</Link>}
      {perfil && <button onClick={async () => { await salir(); await refrescar(); nav('/'); }}>Cerrar sesión</button>}
    </>
  );

  return (
    <header className="nav">
      <Link to="/" className="nav-marca">Escudo Digital</Link>
      <nav className="nav-enlaces" aria-label="Principal">
        {enlaces.map(([to, t]) => <NavLink key={to} to={to} end={to === '/'} className={clase}>{t}</NavLink>)}
        <i className="nav-barra" aria-hidden="true" />
        <div className="nav-derecha">
          {perfil ? (
            <>
              <button className="nav-enlace" onClick={() => setAbierto(!abierto)} aria-expanded={abierto}><span>{negocio?.nombre ?? 'Mi cuenta'}</span></button>
              {abierto && <div className="menu aparecer" onClick={() => setAbierto(false)}>{cuenta}</div>}
            </>
          ) : <NavLink to="/ingresar" className={clase}>Ingresar</NavLink>}
          <Tema />
        </div>
      </nav>
      <div className="nav-movil">
        <Tema />
        <button className="icono-redondo" onClick={() => setAbierto(!abierto)} aria-label="Abrir menú" aria-expanded={abierto}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
        {abierto && (
          <nav className="menu aparecer" aria-label="Principal" onClick={() => setAbierto(false)}>
            {enlaces.map(([to, t]) => <Link key={to} to={to}>{t}</Link>)}
            {!perfil && <Link to="/ingresar">Ingresar</Link>}
            {cuenta}
          </nav>
        )}
      </div>
    </header>
  );
}

/** Estructura común de las pantallas: navegación, palabra de fondo y panel diagonal opcional. */
export function Pagina({ children, fantasma, panel, panelTipo = 'ancho', panelEnMovil = true, titulo, tituloNaranja, sub, extras }: {
  children: ReactNode;
  /** Elementos ubicados respecto a toda la pantalla: ilustración, sello, puntos. */
  extras?: ReactNode;
  fantasma?: string;
  panel?: ReactNode;
  panelTipo?: 'ancho' | 'angosto';
  panelEnMovil?: boolean;
  /** Se conservan por compatibilidad con las pantallas internas. */
  ancho?: 'movil' | 'ancho';
  volver?: string;
  titulo?: string;
  /** En modo oscuro, el título va en naranja. */
  tituloNaranja?: boolean;
  sub?: string;
}) {
  return (
    <div className={`pagina ${panel ? `con-panel-${panelTipo}` : ''}`}>
      {panel && <div className={`panel-fondo panel-${panelTipo}`} aria-hidden="true" />}
      {fantasma && <div className="fantasma" aria-hidden="true">{fantasma}</div>}
      {extras}
      <Navegacion />
      <div className="pagina-cuerpo">
        <main className="pagina-main aparecer">
          {titulo && <h1 className={`titulo mt-4 pc:mt-7${tituloNaranja ? ' titulo-inicio' : ''}`}>{titulo}</h1>}
          {sub && <p className="subtitulo">{sub}</p>}
          {children}
        </main>
        {panel && <aside className={`panel-contenido ${panelEnMovil ? '' : 'solo-pc'}`}>{panel}</aside>}
      </div>
      {modoDemo && <p className="relative z-[3] mt-4 text-center text-xs text-tenue pc:mr-[50vw]">Modo demostración: los datos se guardan solo en este navegador.</p>}
    </div>
  );
}

export function Cargando() {
  return <div className="flex min-h-dvh items-center justify-center text-tenue">Cargando…</div>;
}
