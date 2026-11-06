import { useId } from 'react';
import { useContador } from '../hooks/useContador';
import type { Funcion } from '../types';

const TONOS: Record<Funcion, { base: string; lado: string; luz: string }> = {
  Identificar: { base: '#14B866', lado: '#07663A', luz: '#7DFFB2' },
  Proteger: { base: '#2F7BFF', lado: '#123F9E', luz: '#9CCAFF' },
  Recuperar: { base: '#FF5A1F', lado: '#96300A', luz: '#FFB79A' },
};
const S = 168;
const R = S * 0.37;
const LARGO = 2 * Math.PI * R;
const TRAZO = S * 0.15;
const ALTO = S * 0.13;
const CX = S / 2;
const CY = S * 0.44;

/** Anillo de porcentaje en 3D que se carga desde 0 hasta el valor del diagnóstico. */
export function Anillo3D({ funcion, valor, retraso = 0 }: { funcion: Funcion; valor: number; retraso?: number }) {
  const n = useContador(valor, 1400, retraso);
  const id = useId().replace(/:/g, '');
  const t = TONOS[funcion];
  const aro = (color: string, ancho: number, dy: number, parcial: boolean, clave: string, opacidad = 1) => (
    <g key={clave} transform={`translate(${CX} ${CY + dy}) scale(1 .74) rotate(-90)`}>
      {(!parcial || n > 0) && <circle r={R} fill="none" stroke={color} strokeWidth={ancho} opacity={opacidad}
        {...(parcial ? { strokeLinecap: 'round' as const, strokeDasharray: `${(LARGO * n) / 100} ${LARGO}` } : {})} />}
    </g>
  );
  const capas = (desde: number, hacia: number) => { const a: number[] = []; for (let i = desde; i > hacia; i -= 1.5) a.push(i); return a; };
  const arriba = -ALTO * 0.75;

  return (
    <div className="flex items-center gap-5">
      <svg width={S} height={S * 0.98} viewBox={`0 ${-S * 0.1} ${S} ${S * 0.98}`} role="img" aria-label={`${funcion} ${valor} por ciento`}
        style={{ flex: 'none', overflow: 'visible', filter: 'drop-shadow(0 12px 9px rgb(0 0 0 / 0.34))' }}>
        <defs>
          <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="-60" y1="-60" x2="60" y2="60"><stop offset="0" stopColor={t.luz} /><stop offset=".55" stopColor={t.base} /><stop offset="1" stopColor={t.lado} /></linearGradient>
        </defs>
        {capas(ALTO, 0).map((i) => aro('var(--anillo-lado)', TRAZO, i, false, `p${i}`))}
        {aro('var(--anillo-pista)', TRAZO, 0, false, 'pista')}
        {capas(0, arriba).map((i) => aro(t.lado, TRAZO, i, true, `l${i}`))}
        {aro(`url(#${id})`, TRAZO, arriba, true, 'cara')}
        {aro(t.luz, TRAZO * 0.22, arriba - TRAZO * 0.16, true, 'brillo', 0.8)}
        <text x={CX} y={CY + S * 0.015} textAnchor="middle" fontFamily="Montserrat" fontWeight="900" fontSize={S * 0.15} letterSpacing="-.5" fill="var(--panel-texto)">{n}%</text>
      </svg>
      <div className="font-display text-[26px] font-black tracking-tight pc:text-[29px]">{funcion}</div>
    </div>
  );
}
