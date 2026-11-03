import { useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Marca } from './Marca';
import { useTema } from '../hooks/useTema';
import { useSesion } from '../hooks/useSesion';
import { salir } from '../services/store';
import { modoDemo } from '../services/supabase';

export function Pagina({ children, ancho = 'movil', volver, titulo, sub }: {
  children: ReactNode; ancho?: 'movil' | 'ancho'; volver?: string; titulo?: string; sub?: string;
}) {
  const { tema, alternar } = useTema();
  const { perfil, refrescar } = useSesion();
  const [menu, setMenu] = useState(false);
  const nav = useNavigate();

  const icono = 'flex h-11 w-11 items-center justify-center rounded-[14px] border border-borde bg-superficie text-texto';
  return (
    <div className={`mx-auto flex min-h-dvh flex-col px-5 pb-6 pt-5 ${ancho === 'movil' ? 'max-w-[440px] md:max-w-5xl' : 'max-w-6xl'}`}>
      <header className="flex items-center gap-3">
        {volver ? (
          <Link to={volver} aria-label="Volver" className={icono}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </Link>
        ) : (
          <Link to="/" className="no-underline text-texto"><Marca /></Link>
        )}
        {titulo && <div className="min-w-0"><h1 className="m-0 text-[22px] font-black">{titulo}</h1>{sub && <div className="text-xs text-tenue">{sub}</div>}</div>}
        <div className="ml-auto flex gap-2">
          <button onClick={alternar} className={icono} aria-label={tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}>
            {tema === 'oscuro' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>
            )}
          </button>
          {perfil && (
            <div className="relative">
              <button onClick={() => setMenu(!menu)} className={icono} aria-label="Abrir menú" aria-expanded={menu}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              </button>
              {menu && (
                <nav className="tarjeta aparecer absolute right-0 z-20 mt-2 flex w-56 flex-col p-2" onClick={() => setMenu(false)}>
                  {[['/cuestionario', 'Hacer diagnóstico'], ['/historial', 'Mi avance'], ['/catalogo', 'Catálogo'], ['/negocio', 'Datos del negocio']].map(([to, t]) => (
                    <Link key={to} to={to} className="rounded-xl px-3 py-3 text-[15px] font-semibold text-texto no-underline hover:bg-pista">{t}</Link>
                  ))}
                  {perfil.rol === 'investigador' && <Link to="/panel" className="rounded-xl px-3 py-3 text-[15px] font-semibold text-verde-texto no-underline hover:bg-pista">Panel del investigador</Link>}
                  <button onClick={async () => { await salir(); await refrescar(); nav('/'); }} className="rounded-xl px-3 py-3 text-left text-[15px] font-semibold text-naranja-texto hover:bg-pista">Cerrar sesión</button>
                </nav>
              )}
            </div>
          )}
        </div>
      </header>
      <main className="aparecer flex flex-1 flex-col">{children}</main>
      {modoDemo && <p className="mt-4 text-center text-[11px] text-tenue">Modo demostración: los datos se guardan solo en este navegador.</p>}
    </div>
  );
}

export function Cargando() {
  return <div className="flex min-h-dvh items-center justify-center text-tenue">Cargando…</div>;
}
