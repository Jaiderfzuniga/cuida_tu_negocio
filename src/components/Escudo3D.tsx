import type { Funcion } from '../types';

const AFUERA = 'M105 8 L194 40 V128 C194 175 158 210 105 230 C52 210 16 175 16 128 V40 Z';
const ADENTRO = 'M105 22 L181 49 V128 C181 168 150 198 105 216 C60 198 29 168 29 128 V49 Z';
// Franjas del escudo: arriba Identificar, centro Proteger, abajo Recuperar.
const FRANJAS: { f: Funcion; y: number; h: number; c1: string; c2: string }[] = [
  { f: 'Identificar', y: 0, h: 84, c1: '#7DFFB2', c2: '#0B9A4E' },
  { f: 'Proteger', y: 88, h: 68, c1: '#8CC4FF', c2: '#1450C4' },
  { f: 'Recuperar', y: 160, h: 70, c1: '#FFB08F', c2: '#D63C0C' },
];
const GROSOR = Array.from({ length: 16 }, (_, i) => 16 - i);

/** Escudo 3D que se llena por franjas (0 a 1) con el color de cada función (RF-04). */
export function Escudo3D({ llenado, ancho = 120, texto, id = 'e' }: {
  llenado: Record<Funcion, number>; ancho?: number; texto?: string; id?: string;
}) {
  const etiqueta = FRANJAS.map((x) => `${x.f} ${Math.round(llenado[x.f] * 100)} %`).join(', ');
  return (
    <svg width={ancho} height={ancho * 1.14} viewBox="0 0 230 262" role="img" aria-label={`Escudo: ${etiqueta}`}
      style={{ display: 'block', flex: 'none', margin: 'auto', transform: 'perspective(900px) rotateY(-20deg) rotateX(5deg)', filter: 'drop-shadow(14px 24px 18px rgb(0 0 0 / 0.42))' }}>
      <defs>
        <clipPath id={`${id}c`}><path d={ADENTRO} /></clipPath>
        <linearGradient id={`${id}m`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset=".35" stopColor="#B6C0CF" /><stop offset=".7" stopColor="#5D687A" /><stop offset="1" stopColor="#A8B3C4" /></linearGradient>
        <linearGradient id={`${id}v`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3A4453" /><stop offset="1" stopColor="#151A22" /></linearGradient>
        <linearGradient id={`${id}l`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#FFF" stopOpacity=".3" /><stop offset=".5" stopColor="#FFF" stopOpacity=".04" /><stop offset=".5" stopColor="#000" stopOpacity=".16" /><stop offset="1" stopColor="#000" stopOpacity=".3" /></linearGradient>
        {FRANJAS.map((x) => (
          <linearGradient key={x.f} id={`${id}${x.f}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={x.c1} /><stop offset="1" stopColor={x.c2} />
          </linearGradient>
        ))}
      </defs>
      {GROSOR.map((i) => <path key={i} d={AFUERA} transform={`translate(${i * 0.95} ${i * 0.7})`} fill={i > 10 ? '#0D1118' : '#2A3342'} />)}
      <path d={AFUERA} fill={`url(#${id}m)`} stroke="#0D1118" strokeWidth="1.5" />
      <path d={ADENTRO} transform="translate(1.5 2)" fill="#0D1118" />
      <g clipPath={`url(#${id}c)`}>
        <rect width="230" height="262" fill={`url(#${id}v)`} />
        {FRANJAS.map((x) => (
          <rect key={x.f} y={x.y} width={210 * Math.min(1, Math.max(0, llenado[x.f]))} height={x.h}
            fill={`url(#${id}${x.f})`} style={{ transition: 'width 0.6s ease' }} />
        ))}
        <path d="M0 86 H230 M0 158 H230" stroke="#0D1118" strokeWidth="4" />
        <rect width="230" height="262" fill={`url(#${id}l)`} />
        <path d="M30 52 L100 27" stroke="#FFF" strokeOpacity=".8" strokeWidth="6" strokeLinecap="round" />
      </g>
      {texto && <text x="105" y="135" textAnchor="middle" fontFamily="Montserrat" fontWeight="900" fontSize="46" fill="#FFFFFF" stroke="#04140B" strokeWidth="6" paintOrder="stroke">{texto}</text>}
    </svg>
  );
}
