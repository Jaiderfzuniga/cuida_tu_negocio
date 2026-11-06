import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagina } from '../components/Pagina';
import { Chica } from '../components/Robot';
import { useSesion } from '../hooks/useSesion';
import { guardarNegocio } from '../services/store';
import type { Negocio as N, Plataforma } from '../types';

const PLATAFORMAS: [Plataforma, string][] = [
  ['whatsapp', 'WhatsApp'], ['nequi', 'Nequi'], ['daviplata', 'Daviplata'], ['facebook', 'Facebook'],
  ['instagram', 'Instagram'], ['correo', 'Correo electrónico'], ['banca', 'Banca en línea'],
];
const TIPOS = ['Tienda', 'Papelería', 'Droguería', 'Panadería', 'Ropa y calzado', 'Restaurante o comidas', 'Ferretería', 'Peluquería', 'Otro'];

export default function Negocio() {
  const { perfil, negocio, setNegocio } = useSesion();
  const nav = useNavigate();
  const [f, setF] = useState<N>(negocio ?? { nombre: '', tipo: 'Tienda', trabajadores: '2 a 3', celular: 'android', tienePc: false, plataformas: ['whatsapp'] });
  const [error, setError] = useState('');

  async function enviar(e: FormEvent) {
    e.preventDefault();
    if (!perfil) return;
    try { const g = await guardarNegocio(perfil, f); setNegocio(g); nav('/cuestionario'); }
    catch (err) { setError((err as Error).message); }
  }

  return (
    <Pagina fantasma="NEGOCIO" extras={<Chica className="chica-inicio solo-pc" />} titulo="Tu negocio" tituloNaranja sub="Así te recomendamos solo lo que te sirve.">
      <form onSubmit={enviar} className="mt-4 flex flex-col gap-4 pc:max-w-[min(48vw,600px)]">
        <label className="etiqueta">Nombre del negocio
          <input className="campo" required value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} placeholder="Ej.: Tienda Don Pedro" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="etiqueta">Tipo
            <select className="campo" value={f.tipo} onChange={(e) => setF({ ...f, tipo: e.target.value })}>{TIPOS.map((t) => <option key={t}>{t}</option>)}</select>
          </label>
          <label className="etiqueta">Personas que trabajan
            <select className="campo" value={f.trabajadores} onChange={(e) => setF({ ...f, trabajadores: e.target.value })}>{['Solo yo', '2 a 3', '4 a 10'].map((t) => <option key={t}>{t}</option>)}</select>
          </label>
        </div>
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
