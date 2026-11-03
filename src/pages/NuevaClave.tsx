import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagina } from '../components/Pagina';
import { useSesion } from '../hooks/useSesion';
import { cambiarClave } from '../services/store';

/** Pantalla a la que llega el enlace de «Olvidé mi contraseña». */
export default function NuevaClave() {
  const { perfil, cargando, refrescar } = useSesion();
  const [clave, setClave] = useState('');
  const [msg, setMsg] = useState<{ t: string; error?: boolean } | null>(null);
  const nav = useNavigate();

  async function enviar(e: FormEvent) {
    e.preventDefault();
    try { await cambiarClave(clave); await refrescar(); setMsg({ t: 'Listo, tu contraseña cambió.' }); setTimeout(() => nav('/'), 1200); }
    catch (err) { setMsg({ t: (err as Error).message, error: true }); }
  }

  return (
    <Pagina volver="/" titulo="Nueva contraseña" sub="Escribe la contraseña nueva para Escudo Digital">
      <div className="md:mx-auto md:w-full md:max-w-md">
        {!cargando && !perfil ? (
          <p className="mt-6 text-sm text-suave">El enlace ya no es válido. Vuelve a pedirlo desde «Olvidé mi contraseña».</p>
        ) : (
          <form onSubmit={enviar} className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm font-semibold">Contraseña nueva
              <input className="campo" type="password" required minLength={6} autoComplete="new-password" value={clave} onChange={(e) => setClave(e.target.value)} placeholder="Mínimo 6 caracteres" />
            </label>
            {msg && <p role="status" className={`m-0 text-sm font-semibold ${msg.error ? 'text-naranja-texto' : 'text-verde-texto'}`}>{msg.t}</p>}
            <button className="btn btn-primario">Guardar contraseña</button>
          </form>
        )}
      </div>
    </Pagina>
  );
}
