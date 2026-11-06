import { useState } from 'react';
import type { Herramienta } from '../types';

/** Logo oficial de la herramienta (ícono publicado por el propio sitio de la marca). */
export function Logo({ h, tam = 52 }: { h: Herramienta; tam?: number }) {
  const [error, setError] = useState(false);
  return (
    <div className="flex flex-none items-center justify-center overflow-hidden rounded-full bg-white"
      style={{ width: tam, height: tam, border: '3px solid var(--borde)' }}>
      {error ? (
        <span className="font-display text-[22px] font-black text-[#0a0a0d]">{h.nombre[0]}</span>
      ) : (
        <img src={`https://www.google.com/s2/favicons?domain=${h.marca}&sz=128`} alt={`Logo de ${h.nombre}`}
          width={Math.round(tam * 0.6)} height={Math.round(tam * 0.6)} loading="lazy" onError={() => setError(true)} />
      )}
    </div>
  );
}
