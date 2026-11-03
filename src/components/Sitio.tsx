import { sitioOficial } from '../lib/colores';
import type { Herramienta } from '../types';

export function Sitio({ h }: { h: Herramienta }) {
  const s = sitioOficial(h.url, h.marca);
  return (
    <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold"
      style={{ color: s.oficial ? 'var(--verde-texto)' : 'var(--ambar)' }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {s.oficial ? <path d="M5 12l5 5 9-10" /> : <path d="M12 7v6M12 17v.5" />}
      </svg>
      {s.oficial ? (s.tienda ? `Tienda oficial: ${s.host}` : `Sitio oficial: ${s.host}`) : `Guía en: ${s.host}`}
    </div>
  );
}
