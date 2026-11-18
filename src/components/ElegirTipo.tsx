import { useEffect, useId, useRef, useState } from 'react';

/** Tipos de negocio con su ícono (mismas opciones de la encuesta de diagnóstico inicial, OE1). */
export const TIPOS: [string, string][] = [
  ['🏪', 'Tienda de barrio / granero'], ['💄', 'Tienda de maquillaje y belleza'], ['✏️', 'Papelería y variedades'],
  ['👟', 'Ropa y calzado'], ['💻', 'Café internet'], ['🥖', 'Panadería / cafetería'], ['🍔', 'Comidas rápidas'],
  ['💊', 'Droguería'], ['✂️', 'Peluquería'], ['🔧', 'Repuestos y accesorios'],
];
const OTRO = 'Otro';

type Props = { valor: string; otro: boolean; alElegir: (tipo: string) => void };

/** Desplegable propio del «Tipo de negocio»: se abre como un panel con los tipos en dos columnas (HU-40). */
export function ElegirTipo({ valor, otro, alElegir }: Props) {
  const [abierto, setAbierto] = useState(false);
  const caja = useRef<HTMLDivElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const id = useId();

  // Se cierra al tocar fuera o con Escape.
  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: PointerEvent) => { if (!caja.current?.contains(e.target as Node)) setAbierto(false); };
    const tecla = (e: KeyboardEvent) => { if (e.key === 'Escape') { setAbierto(false); boton.current?.focus(); } };
    document.addEventListener('pointerdown', fuera);
    document.addEventListener('keydown', tecla);
    // Al abrir, el foco va al tipo elegido para poder seguir con el teclado.
    caja.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus({ preventScroll: true });
    // En el celular el panel es alto: se desplaza lo justo para que se vea completo.
    caja.current?.querySelector('.tipo-panel')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    return () => { document.removeEventListener('pointerdown', fuera); document.removeEventListener('keydown', tecla); };
  }, [abierto]);

  function elegir(t: string) { alElegir(t); setAbierto(false); boton.current?.focus(); }

  const actual = otro ? ['✍️', 'Otro (escribir)'] : TIPOS.find(([, t]) => t === valor) ?? ['🏪', valor];

  return (
    <div className="etiqueta">
      <span id={`${id}-l`}>Tipo de negocio</span>
      <div ref={caja} className="relative">
        <button type="button" ref={boton} className="campo tipo-campo" aria-labelledby={`${id}-l ${id}-b`} id={`${id}-b`}
          aria-expanded={abierto} aria-controls={`${id}-p`} onClick={() => setAbierto(!abierto)}>
          <span className="tipo-icono" aria-hidden="true">{actual[0]}</span>
          <span className="truncate">{actual[1]}</span>
          <span className="tipo-flecha" aria-hidden="true">{abierto ? '▴' : '▾'}</span>
        </button>
        {abierto && (
          <div id={`${id}-p`} role="group" aria-labelledby={`${id}-l`} className="tipo-panel aparecer">
            {TIPOS.map(([e, t]) => (
              <button type="button" key={t} className="tipo-op" aria-pressed={!otro && valor === t} onClick={() => elegir(t)}>
                <span className="tipo-icono" aria-hidden="true">{e}</span>{t}
              </button>
            ))}
            <button type="button" className="tipo-op tipo-otro" aria-pressed={otro} onClick={() => elegir(OTRO)}>
              <span className="tipo-icono" aria-hidden="true">✍️</span>Otro (escribir)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
