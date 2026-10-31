import { useState } from 'react';
import type { Herramienta } from '../types';

/** Logo oficial de la herramienta (ícono publicado por el propio sitio de la marca). */
export function Logo({ h, tam = 44 }: { h: Herramienta; tam?: number }) {
  const [error, setError] = useState(false);
  return (
    <div className="flex flex-none items-center justify-center overflow-hidden rounded-xl bg-white"
      style={{ width: tam, height: tam, border: '1px solid var(--borde)' }}>
      {error ? (
        <span className="text-lg font-black text-slate-700">{h.nombre[0]}</span>
      ) : (
        <img src={`https://www.google.com/s2/favicons?domain=${h.marca}&sz=128`} alt={`Logo de ${h.nombre}`}
          width={tam * 0.64} height={tam * 0.64} loading="lazy" onError={() => setError(true)} />
      )}
    </div>
  );
}
