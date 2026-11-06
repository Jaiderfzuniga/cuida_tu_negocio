import { useState, type ReactNode } from 'react';
import type { Herramienta } from '../types';
import { COLOR } from '../lib/colores';
import { Logo } from './Logo';
import { Sitio } from './Sitio';

const DISP = { celular: 'Solo celular', pc: 'Solo PC', ambos: 'PC y celular' };

/** Herramienta como fila: logo, nombre y sitio oficial; al tocarla muestra para qué sirve y el enlace. */
export function TarjetaHerramienta({ h, cabeza, extra, nota, abierta = false }: {
  h: Herramienta; cabeza?: ReactNode; extra?: ReactNode; nota?: ReactNode; abierta?: boolean; destacada?: boolean;
}) {
  const [ver, setVer] = useState(abierta);
  const c = COLOR[h.funcion];
  const nombre = h.nombre.split(' (')[0];
  return (
    <article>
      <div className="flex items-center gap-3 pc:gap-4">
        <button onClick={() => setVer(!ver)} aria-expanded={ver} className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 border-0 bg-transparent p-0 text-left text-texto pc:gap-4">
          {cabeza}
          <Logo h={h} />
          <div className="min-w-0 flex-1">
            <div className="text-[19px] font-extrabold leading-[1.15] pc:text-[20px]">{nombre.replace(' – ', ': ')}</div>
            {nota ?? (
              <div className="mt-1 text-[14px] font-extrabold" style={{ color: c.texto }}>{h.funcion} · {h.costo.split(' (')[0]}</div>
            )}
            <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[14px] font-medium text-suave">
              <span>{DISP[h.dispositivo]}</span>
              <Sitio h={h} />
            </div>
          </div>
        </button>
        {extra}
      </div>
      {ver && (
        <div className="aparecer mt-3 flex flex-col items-start gap-3 pc:ml-[68px]">
          <p className="m-0 text-[16px] leading-relaxed text-suave">{h.uso}</p>
          <div className="flex flex-wrap gap-2 text-[13px] font-extrabold">
            <span className="rounded-full px-3 py-1" style={{ border: `2px solid ${c.fuerte}`, color: c.texto }}>{h.funcion}</span>
            <span className="rounded-full border-2 border-borde px-3 py-1">{h.costo}</span>
            {!h.espanol && <span className="rounded-full border-2 border-borde px-3 py-1">En inglés</span>}
          </div>
          <a href={h.url} target="_blank" rel="noopener noreferrer" className="btn btn-primario btn-chico">Abrir {nombre} ↗</a>
        </div>
      )}
    </article>
  );
}
