import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagina } from '../components/Pagina';
import { Chica } from '../components/Robot';
import { useSesion } from '../hooks/useSesion';
import { guardarNegocio } from '../services/store';
import type { Negocio as N, Plataforma } from '../types';

/** Mismas opciones de la encuesta de diagnóstico inicial (OE1). */
const PLATAFORMAS: [Plataforma, string][] = [
  ['whatsapp', 'WhatsApp'], ['nequi', 'Nequi'], ['daviplata', 'DaviPlata'], ['bancolombia', 'Bancolombia'],
  ['facebook', 'Facebook'], ['instagram', 'Instagram'], ['tiktok', 'TikTok'], ['correo', 'Correo electrónico'],
];
const TIPOS = [
  'Tienda de barrio / granero', 'Tienda de maquillaje y belleza', 'Papelería y variedades', 'Ropa y calzado', 'Café internet',
  'Panadería / cafetería', 'Comidas rápidas', 'Droguería', 'Peluquería', 'Repuestos y accesorios',
];
const EMPLEADOS = ['1 (solo el propietario)', '2 – 3', '4 – 5'];
/** Valores guardados con las opciones anteriores del formulario. */
const EMPLEADOS_ANTES: Record<string, string> = { 'Solo yo': '1 (solo el propietario)', '2 a 3': '2 – 3' };

/** Prepara un negocio ya guardado para el formulario actual. */
function inicial(n: N | null): { f: N; otro: boolean } {
  if (!n) return { f: { nombre: '', tipo: TIPOS[0], trabajadores: '2 – 3', celular: 'android', tienePc: false, plataformas: ['whatsapp'] }, otro: false };
  return {
    f: { ...n, trabajadores: EMPLEADOS_ANTES[n.trabajadores] ?? n.trabajadores, plataformas: n.plataformas.filter((p) => p !== 'banca') },
    otro: !TIPOS.includes(n.tipo),
  };
}

export default function Negocio() {
  const { perfil, negocio, setNegocio } = useSesion();
  const nav = useNavigate();
  const [f, setF] = useState<N>(() => inicial(negocio).f);
  // «Otro»: el tipo de negocio lo escribe el propietario y se guarda tal cual (no la palabra «Otro»).
  const [otro, setOtro] = useState(() => inicial(negocio).otro);
  const [error, setError] = useState('');

  async function enviar(e: FormEvent) {
    e.preventDefault();
    if (!perfil) return;
    if (!EMPLEADOS.includes(f.trabajadores)) { setError('Elige cuántas personas trabajan en el negocio.'); return; }
    const tipo = f.tipo.trim();
    if (!tipo) { setError('Escribe qué tipo de negocio es.'); return; }
    try { const g = await guardarNegocio(perfil, { ...f, tipo }); setNegocio(g); nav('/cuestionario'); }
    catch (err) { setError((err as Error).message); }
  }

  return (
    <Pagina fantasma="NEGOCIO" extras={<Chica className="chica-inicio solo-pc" />} titulo="Tu negocio" tituloNaranja sub="Así te recomendamos solo lo que te sirve.">
      <form onSubmit={enviar} className="mt-4 flex flex-col gap-4 pc:max-w-[min(48vw,600px)]">
        <label className="etiqueta">Nombre del negocio
          <input className="campo" required value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} placeholder="Ej.: Tienda Don Pedro" />
        </label>
        <label className="etiqueta">Tipo de negocio
          <select className="campo" value={otro ? 'Otro' : f.tipo}
            onChange={(e) => {
              const v = e.target.value;
              setOtro(v === 'Otro');
              setF({ ...f, tipo: v === 'Otro' ? '' : v });
            }}>
            {[...TIPOS, 'Otro'].map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        {otro && (
          <label className="etiqueta aparecer">¿Qué tipo de negocio es?
            <input className="campo" required autoFocus value={f.tipo} onChange={(e) => setF({ ...f, tipo: e.target.value })} placeholder="Ej.: Ferretería, veterinaria, miscelánea…" />
          </label>
        )}
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 text-[16px] font-extrabold">Número de empleados</legend>
          <div className="flex flex-wrap gap-2">
            {EMPLEADOS.map((t) => (
              <button type="button" key={t} aria-pressed={f.trabajadores === t} className="chip" onClick={() => setF({ ...f, trabajadores: t })}>{t}</button>
            ))}
          </div>
        </fieldset>
        <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
          <legend className="mb-2 text-[16px] font-extrabold">¿Qué usas en el negocio?</legend>
          <div className="flex flex-wrap gap-2">
            {PLATAFORMAS.map(([id, t]) => {
              const on = f.plataformas.includes(id);
              return <button type="button" key={id} aria-pressed={on} className="chip"
                onClick={() => setF({ ...f, plataformas: on ? f.plataformas.filter((p) => p !== id) : [...f.plataformas, id] })}>{t}</button>;
            })}
          </div>
        </fieldset>
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 text-[16px] font-extrabold">Tu celular es</legend>
          <div className="flex flex-wrap gap-2">
            {([['android', 'Android'], ['iphone', 'iPhone']] as const).map(([id, t]) => (
              <button type="button" key={id} aria-pressed={f.celular === id} className="chip" onClick={() => setF({ ...f, celular: id })}>{t}</button>
            ))}
          </div>
        </fieldset>
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 text-[16px] font-extrabold">¿Usas computador en el negocio?</legend>
          <div className="flex flex-wrap gap-2">
            {[[true, 'Sí'], [false, 'No']].map(([v, t]) => (
              <button type="button" key={String(v)} aria-pressed={f.tienePc === v} className="chip" onClick={() => setF({ ...f, tienePc: v as boolean })}>{t as string}</button>
            ))}
          </div>
        </fieldset>
        {error && <p className="m-0 text-sm font-semibold text-naranja-texto">{error}</p>}
        <div><button className="btn btn-primario">Guardar y empezar</button></div>
      </form>
    </Pagina>
  );
}
