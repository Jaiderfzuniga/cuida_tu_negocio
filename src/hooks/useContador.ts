import { useEffect, useState } from 'react';

/** Cuenta de 0 hasta `valor` (animación de carga). Respeta «reducir movimiento». */
export function useContador(valor: number, ms = 1400, retraso = 0) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(valor); return; }
    let raf = 0;
    const inicio = performance.now() + retraso;
    const paso = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - inicio) / ms));
      setN(Math.round(valor * (1 - Math.pow(1 - p, 3)))); // desacelera al final
      if (p < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [valor, ms, retraso]);
  return n;
}
