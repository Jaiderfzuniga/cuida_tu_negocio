import { useState, type ReactNode } from 'react';
import type { Herramienta } from '../types';
import { COLOR } from '../lib/colores';
import { Logo } from './Logo';
import { Sitio } from './Sitio';

const DISP = { celular: 'Solo celular', pc: 'Solo PC', ambos: 'PC y celular' };

function Equipo({ d }: { d: Herramienta['dispositivo'] }) {
  const cel = <path d="M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2" />;
  const pc = <path d="M3 5h18v11H3zM8 20h8M12 16v4" />;
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d === 'celular' ? cel : d === 'pc' ? pc : <g transform="scale(0.8)">{pc}<g transform="translate(14 4) scale(0.6)">{cel}</g></g>}
    </svg>
  );
}

export function TarjetaHerramienta({ h, cabeza, extra, abierta = false, destacada = false }: {
  h: Herramienta; cabeza?: ReactNode; extra?: ReactNode; abierta?: boolean; destacada?: boolean;
}) {
  const [ver, setVer] = useState(abierta);
  const c = COLOR[h.funcion];
  return (
    <article className="tarjeta p-3.5" style={destacada ? { borderColor: c.fuerte, boxShadow: `0 0 22px color-mix(in srgb, ${c.fuerte} calc(var(--brillo) * 55%), transparent)` } : undefined}>
      <button onClick={() => setVer(!ver)} aria-expanded={ver} className="flex w-full items-center gap-3 bg-transparent p-0 text-left text-texto">
        {cabeza}
        <Logo h={h} />
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-extrabold leading-tight">{h.nombre}</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-suave">
            <Equipo d={h.dispositivo} /> {DISP[h.dispositivo]}
          </div>
          <Sitio h={h} />
        </div>
        {extra}
      </button>
      {ver && (
        <div className="aparecer mt-3 flex flex-col gap-3 border-t border-borde pt-3">
          <p className="m-0 text-sm leading-relaxed text-suave">{h.uso}</p>
          <div className="flex flex-wrap gap-1.5 text-[11px] font-extrabold">
            <span className="rounded-lg px-2 py-1" style={{ border: `1px solid ${c.fuerte}`, color: c.texto }}>{h.funcion.toUpperCase()}</span>
            <span className="rounded-lg bg-verde px-2 py-1 text-[#04140b]">{h.costo.toUpperCase()}</span>
            {!h.espanol && <span className="rounded-lg border border-ambar px-2 py-1 text-ambar">EN INGLÉS</span>}
          </div>
          <a href={h.url} target="_blank" rel="noopener noreferrer" className="btn btn-primario min-h-12 text-[15px]">Abrir {h.nombre.split(' (')[0]} ↗</a>
        </div>
      )}
    </article>
  );
}
