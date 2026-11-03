import { useState } from 'react';
import { Pagina } from '../components/Pagina';
import { TarjetaHerramienta } from '../components/TarjetaHerramienta';
import { CATALOGO } from '../data/catalogo';
import { COLOR } from '../lib/colores';
import { FUNCIONES, type Dispositivo, type Funcion } from '../types';

const EQUIPOS: [Dispositivo, string][] = [['celular', 'Solo celular'], ['pc', 'Solo PC'], ['ambos', 'PC y celular']];

const sinTildes = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function Catalogo() {
  const [f, setF] = useState<Funcion | null>(null);
  const [q, setQ] = useState('');
  const [eq, setEq] = useState<Dispositivo | null>(null);
  const lista = CATALOGO.filter((h) => (!f || h.funcion === f) && (!eq || h.dispositivo === eq) && sinTildes(h.nombre + ' ' + h.uso).includes(sinTildes(q)));

  return (
    <Pagina volver="/" titulo="Catálogo" sub={`${CATALOGO.length} herramientas gratuitas o de bajo costo`}>
      <input className="campo mt-5 md:max-w-xl" type="search" placeholder="Buscar herramienta" aria-label="Buscar herramienta" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={() => setF(null)} aria-pressed={!f} className={`min-h-10 rounded-full px-3.5 text-[13px] font-extrabold ${!f ? 'bg-verde text-[#04140b]' : 'border border-borde text-texto'}`}>Todas</button>
        {FUNCIONES.map((x) => (
          <button key={x} onClick={() => setF(x)} aria-pressed={f === x} className="min-h-10 rounded-full px-3.5 text-[13px] font-bold"
            style={f === x ? { background: COLOR[x].fuerte, color: '#04140b' } : { border: `1px solid ${COLOR[x].fuerte}`, color: COLOR[x].texto }}>
            {x} · {CATALOGO.filter((h) => h.funcion === x).length}
          </button>
        ))}
      </div>
      <div className="mt-4 text-[13px] font-bold text-suave">¿En qué equipo la vas a usar?</div>
      <div className="mt-2 grid grid-cols-4 gap-1 rounded-2xl md:max-w-xl border border-borde bg-superficie p-1">
        {([[null, 'Todos'], ...EQUIPOS] as [Dispositivo | null, string][]).map(([v, t]) => (
          <button key={t} onClick={() => setEq(v)} aria-pressed={eq === v}
            className={`min-h-11 rounded-xl px-1 text-[12px] font-bold leading-tight ${eq === v ? 'bg-verde text-[#04140b]' : 'text-suave'}`}>
            {t}<span className="block text-[10px] font-semibold opacity-80">{CATALOGO.filter((h) => (!v || h.dispositivo === v) && (!f || h.funcion === f)).length}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-2.5 md:grid md:grid-cols-2 md:items-start lg:grid-cols-3 md:gap-4">
        {lista.map((h) => <TarjetaHerramienta key={h.id} h={h} />)}
        {!lista.length && <p className="text-center text-sm text-tenue">No hay herramientas con ese nombre.</p>}
      </div>
    </Pagina>
  );
}
