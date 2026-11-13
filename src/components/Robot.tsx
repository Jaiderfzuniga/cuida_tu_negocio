import { useEffect, useState } from 'react';
import chica from '../assets/chica.webp';
import robot from '../assets/robot.webp';

/**
 * Mascota de la plataforma, como acompañante pequeño de cada pantalla.
 * Con `consejos`, al pasar el mouse o tocarlo saluda y muestra un consejo en un globo; al tocarlo otra vez pasa al siguiente.
 */
export function Robot({ alto = 150, className = '', consejos, globo = 'izquierda' }: { alto?: number; className?: string; consejos?: string[]; globo?: 'izquierda' | 'abajo' }) {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(false);
  const [salto, setSalto] = useState(0);
  if (!consejos?.length) return <img src={robot} alt="" width={Math.round(alto * 0.75)} height={alto} className={`flotar ${className}`} />;
  const mostrar = () => { if (!visible) { setVisible(true); setSalto((n) => n + 1); } };
  const siguiente = () => { if (visible) setI((n) => (n + 1) % consejos.length); setVisible(true); setSalto((n) => n + 1); };
  return (
    <div className={`relative ${className}`}>
      {visible && (
        <div key={i} role="status" className={`globo globo-${globo} absolute z-10 w-[min(260px,62vw)] text-left`}>
          <button onClick={() => setVisible(false)} aria-label="Cerrar consejo" className="globo-cerrar">×</button>
          <p className="m-0 pr-5 text-[15px] font-semibold leading-snug">{consejos[i]}</p>
          {consejos.length > 1 && <p className="m-0 mt-1 text-[12px] font-bold opacity-70">Toca el robot para otro consejo · {i + 1} de {consejos.length}</p>}
        </div>
      )}
      <button onMouseEnter={mostrar} onClick={siguiente} aria-label="Ver un consejo del robot" className="flotar block cursor-pointer border-0 bg-transparent p-0">
        <img key={salto} src={robot} alt="" width={Math.round(alto * 0.75)} height={alto} className={salto ? 'saludar block' : 'block'} />
      </button>
    </div>
  );
}

const HOLOGRAMAS: { x: number; y: number; t: number; candado?: boolean; r?: number }[] = [
  { x: 820, y: 620, t: 118, candado: true },
  { x: 900, y: 480, t: 96, candado: true },
  { x: 800, y: 415, t: 64 },
  { x: 952, y: 662, t: 40 },
  { x: 748, y: 735, t: 42 },
  { x: 815, y: 820, t: 78 },
  { x: 735, y: 552, t: 30 },
];

/** Ilustración principal de la pantalla de inicio, con candados y marcas de verificación flotando sobre el celular. */
export function Chica({ className, mensaje }: { className: string; mensaje?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!mensaje) return;
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, [mensaje]);
  return (
    <div className={className} onMouseEnter={() => mensaje && setVisible(true)} onClick={() => mensaje && setVisible(true)}>
      {mensaje && visible && (
        <div role="status" className="globo globo-chica absolute z-10 text-left">
          <button onClick={(e) => { e.stopPropagation(); setVisible(false); }} aria-label="Cerrar mensaje" className="globo-cerrar">×</button>
          <p className="m-0 pr-5 text-[16px] font-semibold leading-snug">{mensaje}</p>
        </div>
      )}
      <img src={chica} width={983} height={1442} className="block h-full w-full"
        alt="Mujer con ruana colorida revisando en su celular candados y marcas de verificación" />
      <svg className="hologramas flotar" viewBox="0 0 983 1442" aria-hidden="true">
        {HOLOGRAMAS.map((h) => (
          <g key={`${h.x}-${h.y}`} transform={`translate(${h.x} ${h.y}) rotate(10)`}>
            <rect x={-h.t / 2} y={-h.t / 2} width={h.t} height={h.t} rx={h.t * 0.12} className="holo-marco" />
            {h.candado
              ? (
                <g transform={`scale(${h.t / 72}) translate(0 2)`}>
                  <rect x="-16" y="-3" width="32" height="25" rx="4" className="holo-icono" />
                  <path d="M-9 -3 v-8 a9 9 0 0 1 18 0 v8" className="holo-arco" />
                </g>
              )
              : <path d={`M${-h.t * 0.24} 0 L${-h.t * 0.06} ${h.t * 0.18} L${h.t * 0.26} ${-h.t * 0.18}`} className="holo-marca" />}
          </g>
        ))}
      </svg>
    </div>
  );
}
