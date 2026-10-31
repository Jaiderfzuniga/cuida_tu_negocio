import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagina } from '../components/Pagina';
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

  const chip = (activo: boolean) => `min-h-11 rounded-full px-4 text-sm font-bold border ${activo ? 'bg-verde text-[#04140b] border-verde' : 'border-borde bg-superficie text-texto'}`;

  async function enviar(e: FormEvent) {
    e.preventDefault();
    if (!perfil) return;
    try { const g = await guardarNegocio(perfil, f); setNegocio(g); nav('/cuestionario'); }
    catch (err) { setError((err as Error).message); }
  }

  return (
    <Pagina volver="/" titulo="Tu negocio" sub="Así te recomendamos solo lo que te sirve">
      <form onSubmit={enviar} className="mt-6 flex flex-1 flex-col gap-5 md:mx-auto md:w-full md:max-w-xl">
        <label className="flex flex-col gap-2 text-sm font-semibold">Nombre del negocio
          <input className="campo" required value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} placeholder="Ej.: Tienda Don Pedro" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-2 text-sm font-semibold">Tipo
            <select className="campo" value={f.tipo} onChange={(e) => setF({ ...f, tipo: e.target.value })}>{TIPOS.map((t) => <option key={t}>{t}</option>)}</select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold">Personas que trabajan
            <select className="campo" value={f.trabajadores} onChange={(e) => setF({ ...f, trabajadores: e.target.value })}>{['Solo yo', '2 a 3', '4 a 10'].map((t) => <option key={t}>{t}</option>)}</select>
          </label>
        </div>
        <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
          <legend className="mb-2 text-sm font-semibold">¿Qué usas en el negocio?</legend>
          <div className="flex flex-wrap gap-2">
            {PLATAFORMAS.map(([id, t]) => {
              const on = f.plataformas.includes(id);
              return <button type="button" key={id} aria-pressed={on} className={chip(on)}
                onClick={() => setF({ ...f, plataformas: on ? f.plataformas.filter((p) => p !== id) : [...f.plataformas, id] })}>{t}</button>;
            })}
          </div>
        </fieldset>
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 text-sm font-semibold">Tu celular es</legend>
          <div className="grid grid-cols-2 gap-2">
            {([['android', 'Android'], ['iphone', 'iPhone']] as const).map(([id, t]) => (
              <button type="button" key={id} aria-pressed={f.celular === id} className={chip(f.celular === id)} onClick={() => setF({ ...f, celular: id })}>{t}</button>
            ))}
          </div>
        </fieldset>
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 text-sm font-semibold">¿Usas computador en el negocio?</legend>
          <div className="grid grid-cols-2 gap-2">
            {[[true, 'Sí'], [false, 'No']].map(([v, t]) => (
              <button type="button" key={String(v)} aria-pressed={f.tienePc === v} className={chip(f.tienePc === v)} onClick={() => setF({ ...f, tienePc: v as boolean })}>{t as string}</button>
            ))}
          </div>
        </fieldset>
        {error && <p className="m-0 text-sm font-semibold text-naranja-texto">{error}</p>}
        <button className="btn btn-primario mt-auto">Guardar y empezar el diagnóstico</button>
      </form>
    </Pagina>
  );
}
