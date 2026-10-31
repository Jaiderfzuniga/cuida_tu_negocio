import { useContador } from '../hooks/useContador';

/** Anillo de porcentaje que se carga desde 0 hasta el valor del diagnóstico. */
export function Anillo({ valor, color, etiqueta, retraso = 0 }: { valor: number; color: string; etiqueta: string; retraso?: number }) {
  const n = useContador(valor, 1400, retraso);
  const c = 2 * Math.PI * 36;
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[13px] font-bold">{etiqueta}</span>
      <svg width="92" height="92" viewBox="0 0 92 92" role="img" aria-label={`${etiqueta} ${valor} por ciento`}
        style={{ filter: `drop-shadow(0 0 8px color-mix(in srgb, ${color} calc(var(--brillo) * 140%), transparent))` }}>
        <circle cx="46" cy="46" r="36" fill="var(--superficie)" stroke="var(--pista)" strokeWidth="8" />
        {n > 0 && (
          <circle cx="46" cy="46" r="36" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c * (1 - n / 100)} transform="rotate(-90 46 46)" />
        )}
        <text x="46" y="52" textAnchor="middle" fontFamily="Inter" fontWeight="800" fontSize="18" fill="var(--texto)">{n}%</text>
      </svg>
    </div>
  );
}
