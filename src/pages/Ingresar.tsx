import { useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagina } from '../components/Pagina';
import { Chica } from '../components/Robot';
import { useSesion } from '../hooks/useSesion';
import { ingresar, perfilActual, recuperarClave, registrar } from '../services/store';

export default function Ingresar() {
  const [params] = useSearchParams();
  const [registro, setRegistro] = useState(params.get('modo') === 'registro');
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [acepto, setAcepto] = useState(false);
  const [msg, setMsg] = useState<{ t: string; error?: boolean } | null>(null);
  const [enviando, setEnviando] = useState(false);
  const { refrescar } = useSesion();
  const nav = useNavigate();

  async function enviar(e: FormEvent) {
    e.preventDefault();
    setMsg(null); setEnviando(true);
    try {
      if (registro) await registrar(email.trim(), clave); else await ingresar(email.trim(), clave);
      if (!(await perfilActual())) { setMsg({ t: 'Te enviamos un correo para confirmar tu cuenta. Ábrelo y luego ingresa.' }); return; }
      await refrescar();
      nav(registro ? '/negocio' : '/');
    } catch (err) {
      setMsg({ t: (err as Error).message, error: true });
    } finally { setEnviando(false); }
  }

  async function olvide() {
    if (!email) { setMsg({ t: 'Escribe tu correo arriba y vuelve a tocar «Olvidé mi contraseña».', error: true }); return; }
    try { await recuperarClave(email.trim()); setMsg({ t: 'Te enviamos un enlace para crear una nueva contraseña.' }); }
    catch (err) { setMsg({ t: (err as Error).message, error: true }); }
  }

  return (
    <Pagina fantasma="CUENTA" extras={<Chica className="chica-inicio solo-pc" />} titulo={registro ? 'Crea tu cuenta' : 'Ingresa'} tituloNaranja sub="Para guardar tu diagnóstico y ver tu avance.">
      <div className="pc:max-w-[min(48vw,600px)]">
      <div className="mt-4 flex flex-wrap gap-2">
        {[['Crear cuenta', true], ['Ingresar', false]].map(([t, r]) => (
          <button key={String(t)} className="chip uppercase" aria-pressed={registro === r} onClick={() => { setRegistro(r as boolean); setMsg(null); }}>{t as string}</button>
        ))}
      </div>
      <form onSubmit={enviar} className="mt-4 flex flex-col gap-3">
        <label className="etiqueta">Correo electrónico
          <input className="campo" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tunegocio@correo.com" />
        </label>
        <label className="etiqueta">Contraseña para Escudo Digital
          <input className="campo" type="password" required minLength={6} autoComplete={registro ? 'new-password' : 'current-password'} value={clave} onChange={(e) => setClave(e.target.value)} placeholder="Mínimo 6 caracteres" />
        </label>
        <p className="m-0 text-[16px] font-bold leading-snug">Crea una contraseña nueva solo para esta plataforma. Nunca te pediremos las claves de tu correo, Nequi o banco.</p>
        {registro && (
          <label className="flex items-start gap-3 text-[15px] leading-snug text-suave">
            <input type="checkbox" checked={acepto} onChange={(e) => setAcepto(e.target.checked)} className="mt-0.5 h-5 w-5 flex-none accent-[var(--tinta)]" />
            <span>Autorizo el uso de mis respuestas de forma anónima para fines investigativos en la Universidad CESMAG.</span>
          </label>
        )}
        {msg && <p role="status" className={`m-0 text-[16px] font-semibold ${msg.error ? 'text-naranja-texto' : 'text-verde-texto'}`}>{msg.t}</p>}
        <div className="mt-1 flex flex-wrap items-center gap-4">
          <button className="btn btn-primario" disabled={enviando || (registro && !acepto)}>
            {enviando ? 'Un momento…' : registro ? 'Crear mi cuenta' : 'Ingresar'}
          </button>
          {!registro && <button type="button" onClick={olvide} className="cursor-pointer border-0 bg-transparent text-[16px] font-bold text-texto underline underline-offset-4">Olvidé mi contraseña</button>}
        </div>
      </form>
      </div>
    </Pagina>
  );
}
