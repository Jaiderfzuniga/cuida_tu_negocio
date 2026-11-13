import { useState } from 'react';
import { Pagina } from '../components/Pagina';
import { Robot } from '../components/Robot';
import { TarjetaHerramienta } from '../components/TarjetaHerramienta';
import { CATALOGO } from '../data/catalogo';
import { FUNCIONES, type Dispositivo, type Funcion } from '../types';

const EQUIPOS: [Dispositivo, string][] = [['celular', 'Solo celular'], ['pc', 'Solo PC'], ['ambos', 'PC y celular']];

const sinTildes = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function Catalogo() {
  const [f, setF] = useState<Funcion | null>(null);
  const [q, setQ] = useState('');
  const [eq, setEq] = useState<Dispositivo | null>(null);
  const lista = CATALOGO.filter((h) => (!f || h.funcion === f) && (!eq || h.dispositivo === eq) && sinTildes(h.nombre + ' ' + h.uso).includes(sinTildes(q)));

  return (
    <Pagina fantasma="HERRAMIENTAS">
      <div className="flex flex-col gap-4 pc:flex-row pc:items-end pc:justify-between">
        <div>
          <h1 className="titulo titulo-inicio mt-4">Herramientas</h1>
          <p className="subtitulo mt-2">{CATALOGO.length} herramientas oficiales y accesibles para proteger tu negocio.</p>
        </div>
        <input className="campo pc:max-w-[440px]" type="search" placeholder="Buscar herramienta" aria-label="Buscar herramienta" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button className="chip" onClick={() => setF(null)} aria-pressed={!f}>Todas</button>
        {FUNCIONES.map((x) => (
          <button key={x} className="chip" onClick={() => setF(x)} aria-pressed={f === x}>
            {x} · {CATALOGO.filter((h) => h.funcion === x).length}
          </button>
        ))}
        <i className="nav-barra mx-2 solo-pc" aria-hidden="true" />
        <span className="solo-movil mt-2 w-full text-[16px] font-bold">¿En qué equipo la vas a usar?</span>
        {([[null, 'Todos los equipos'], ...EQUIPOS] as [Dispositivo | null, string][]).map(([v, t]) => (
          <button key={t} className="chip" onClick={() => setEq(v)} aria-pressed={eq === v}>
            {t} · {CATALOGO.filter((h) => (!v || h.dispositivo === v) && (!f || h.funcion === f)).length}
          </button>
        ))}
      </div>
      <div className="mt-7 grid items-start gap-x-8 gap-y-7 md:grid-cols-2 pc:grid-cols-3">
        {lista.map((h) => <TarjetaHerramienta key={h.id} h={h} />)}
      </div>
      {!lista.length && <p className="mt-8 text-[17px] font-semibold">No hay herramientas con ese nombre.</p>}
      <div className="mt-6 flex justify-end"><Robot alto={140} consejos={["¿No sabes por dónde empezar? Filtra por tu equipo: solo celular, solo PC o los dos.", "Toca una herramienta para ver para qué sirve y cómo usarla."]} /></div>
    </Pagina>
  );
}
