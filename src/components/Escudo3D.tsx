import type { Funcion } from '../types';

const RUTA = 'M105 8 L194 40 V128 C194 175 158 210 105 230 C52 210 16 175 16 128 V40 Z';
// Franjas del escudo: arriba Identificar, centro Proteger, abajo Recuperar.
const FRANJAS: { f: Funcion; y: number; h: number; c1: string; c2: string }[] = [
  { f: 'Identificar', y: 0, h: 82, c1: '#9DFFC4', c2: '#12B85A' },
  { f: 'Proteger', y: 84, h: 72, c1: '#A6D8FF', c2: '#1C6FD8' },
  { f: 'Recuperar', y: 158, h: 92, c1: '#FFB59A', c2: '#E2531F' },
];

/** Escudo 3D que se llena por franjas (0 a 1) con el color de cada función (RF-04). */
export function Escudo3D({ llenado, ancho = 120, texto, id = 'e' }: {
  llenado: Record<Funcion, number>; ancho?: number; texto?: string; id?: string;
}) {
  const etiqueta = FRANJAS.map((x) => `${x.f} ${Math.round(llenado[x.f] * 100)} %`).join(', ');
  return (
    <svg width={ancho} height={ancho * 1.14} viewBox="0 0 220 250" role="img" aria-label={`Escudo: ${etiqueta}`}
      style={{ filter: 'drop-shadow(0 0 14px rgb(43 234 122 / var(--brillo)))', flex: 'none' }}>
      <defs>
        <clipPath id={`${id}c`}><path d={RUTA} /></clipPath>
        {FRANJAS.map((x) => (
          <linearGradient key={x.f} id={`${id}${x.f}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={x.c1} /><stop offset="1" stopColor={x.c2} />
          </linearGradient>
        ))}
      </defs>
      <path d={RUTA} transform="translate(9 11)" fill="#020A10" opacity="0.85" />
      <path d={RUTA} transform="translate(4.5 5.5)" fill="#0B2232" />
      <g clipPath={`url(#${id}c)`}>
        <rect width="220" height="250" fill="#13293A" />
        {FRANJAS.map((x) => (
          <rect key={x.f} y={x.y} width={220 * Math.min(1, Math.max(0, llenado[x.f]))} height={x.h}
            fill={`url(#${id}${x.f})`} style={{ transition: 'width 0.6s ease' }} />
        ))}
        <path d="M0 83 H220 M0 157 H220" stroke="#050E16" strokeWidth="4" />
        <path d="M105 8 L16 40 V128 C16 175 52 210 105 230 Z" fill="#FFFFFF" opacity="0.13" />
        <path d="M30 46 L100 22" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="6" strokeLinecap="round" />
      </g>
      <path d={RUTA} fill="none" stroke="#E8FFF2" strokeWidth="5" />
      <path d={RUTA} transform="translate(105 119) scale(0.88) translate(-105 -119)" fill="none" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="2" />
      {texto && <text x="105" y="135" textAnchor="middle" fontFamily="Inter" fontWeight="900" fontSize="46" fill="#FFFFFF" stroke="#04140B" strokeWidth="6" paintOrder="stroke">{texto}</text>}
    </svg>
  );
}
