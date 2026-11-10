import type { Diagnostico, Negocio, Niveles, Perfil, Respuestas } from '../types';
import { supabase } from './supabase';

/**
 * Capa de servicios: toda la comunicación con la base de datos pasa por aquí.
 * Con Supabase configurado usa la base de datos; sin él, guarda en el navegador (demo).
 */

// ───────── Modo demostración ─────────
const LS = 'escudo-demo';
type Demo = { usuarios: { email: string; clave: string; id: string; rol: Perfil['rol'] }[]; sesion?: string;
  negocios: (Negocio & { owner: string })[]; diagnosticos: Diagnostico[] };
const leer = (): Demo => {
  try { return JSON.parse(localStorage.getItem(LS) || '') as Demo; } catch { return { usuarios: [], negocios: [], diagnosticos: [] }; }
};
const guardar = (d: Demo) => { try { localStorage.setItem(LS, JSON.stringify(d)); } catch { /* sin almacenamiento */ } };
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()));

// ───────── Sesión ─────────
export async function registrar(email: string, clave: string): Promise<void> {
  if (supabase) {
    // El consentimiento (Ley 1581) queda registrado con fecha en la tabla perfil.
    const { error } = await supabase.auth.signUp({ email, password: clave,
      options: { data: { consentimiento: true }, emailRedirectTo: location.origin + import.meta.env.BASE_URL } });
    if (error) throw new Error(traducir(error.message));
    return;
  }
  const d = leer();
  if (d.usuarios.some((u) => u.email === email)) throw new Error('Ya existe una cuenta con ese correo.');
  const id = uid();
  // En demo, el primer correo que contenga «investigador» recibe el rol de investigador.
  d.usuarios.push({ email, clave, id, rol: email.includes('investigador') ? 'investigador' : 'propietario' });
  d.sesion = id; guardar(d);
}

export async function ingresar(email: string, clave: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase.auth.signInWithPassword({ email, password: clave });
    if (error) throw new Error(traducir(error.message));
    return;
  }
  const d = leer();
  const u = d.usuarios.find((x) => x.email === email && x.clave === clave);
  if (!u) throw new Error('Correo o contraseña incorrectos.');
  d.sesion = u.id; guardar(d);
}

export async function recuperarClave(email: string): Promise<void> {
  if (!supabase) throw new Error('En modo demostración no se envían correos.');
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: location.origin + import.meta.env.BASE_URL + 'nueva-clave' });
  if (error) throw new Error(traducir(error.message));
}

export async function cambiarClave(clave: string): Promise<void> {
  if (!supabase) throw new Error('En modo demostración no se cambian contraseñas.');
  const { error } = await supabase.auth.updateUser({ password: clave });
  if (error) throw new Error(traducir(error.message));
}

export async function salir(): Promise<void> {
  if (supabase) { await supabase.auth.signOut(); return; }
  const d = leer(); delete d.sesion; guardar(d);
}

export async function perfilActual(): Promise<Perfil | null> {
  if (supabase) {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return null;
    const { data: p } = await supabase.from('perfil').select('rol').eq('id', user.id).maybeSingle();
    return { id: user.id, email: user.email ?? '', rol: (p?.rol as Perfil['rol']) ?? 'propietario' };
  }
  const d = leer();
  const u = d.usuarios.find((x) => x.id === d.sesion);
  return u ? { id: u.id, email: u.email, rol: u.rol } : null;
}

// ───────── Negocio ─────────
export async function miNegocio(perfil: Perfil): Promise<Negocio | null> {
  if (supabase) {
    const { data } = await supabase.from('negocio').select('*').eq('owner', perfil.id).maybeSingle();
    return data ? desdeFila(data) : null;
  }
  return leer().negocios.find((n) => n.owner === perfil.id) ?? null;
}

export async function guardarNegocio(perfil: Perfil, n: Negocio): Promise<Negocio> {
  if (supabase) {
    const fila = { owner: perfil.id, nombre: n.nombre, tipo: n.tipo, trabajadores: n.trabajadores,
      celular: n.celular, tiene_pc: n.tienePc, plataformas: n.plataformas };
    const q = n.id ? supabase.from('negocio').update(fila).eq('id', n.id) : supabase.from('negocio').insert(fila);
    const { data, error } = await q.select().single();
    if (error) throw new Error(error.message);
    return desdeFila(data);
  }
  const d = leer();
  const guardado = { ...n, id: n.id ?? uid(), owner: perfil.id };
  d.negocios = [...d.negocios.filter((x) => x.id !== guardado.id), guardado]; guardar(d);
  return guardado;
}

// ───────── Diagnósticos ─────────
/** Guarda el diagnóstico, sus respuestas y las recomendaciones que generó (para el análisis del OE4). */
export async function guardarDiagnostico(negocioId: string, respuestas: Respuestas, niveles: Niveles,
  recomendaciones: { herramientaId: string; puntos: number }[] = []): Promise<Diagnostico> {
  const previos = await diagnosticosDe(negocioId);
  const momento: Diagnostico['momento'] = previos.length ? 'post' : 'pre';
  if (supabase) {
    const { data, error } = await supabase.from('diagnostico').insert({
      negocio_id: negocioId, momento, nivel_identificar: niveles.Identificar, nivel_proteger: niveles.Proteger,
      nivel_recuperar: niveles.Recuperar, nivel_general: niveles.general,
    }).select().single();
    if (error) throw new Error(error.message);
    const filas = Object.entries(respuestas).map(([pregunta_id, opcion_id]) => ({ diagnostico_id: data.id, pregunta_id, opcion_id }));
    const r = await supabase.from('respuesta').insert(filas);
    if (r.error) throw new Error(r.error.message);
    if (recomendaciones.length) {
      const rec = await supabase.from('recomendacion').insert(recomendaciones.map((x, i) => ({
        diagnostico_id: data.id, herramienta_id: x.herramientaId, puntos: x.puntos, orden: i + 1 })));
      if (rec.error) throw new Error(rec.error.message);
    }
    return { ...diagDesdeFila(data), respuestas };
  }
  const d = leer();
  const diag: Diagnostico = { id: uid(), negocioId, momento, fecha: new Date().toISOString(), respuestas, niveles };
  d.diagnosticos.push(diag); guardar(d);
  return diag;
}

export async function diagnosticosDe(negocioId: string): Promise<Diagnostico[]> {
  if (supabase) {
    const { data } = await supabase.from('diagnostico').select('*, respuesta(pregunta_id, opcion_id)')
      .eq('negocio_id', negocioId).order('fecha');
    return (data ?? []).map(diagDesdeFila);
  }
  return leer().diagnosticos.filter((x) => x.negocioId === negocioId).sort((a, b) => a.fecha.localeCompare(b.fecha));
}

/** Panel del investigador: todos los negocios con sus diagnósticos (RLS lo restringe en la base). */
export async function todosLosNegocios(): Promise<{ negocio: Negocio; diagnosticos: Diagnostico[] }[]> {
  if (supabase) {
    const { data, error } = await supabase.from('negocio').select('*, diagnostico(*, respuesta(pregunta_id, opcion_id))').order('nombre');
    if (error) throw new Error(error.message);
    return (data ?? []).map((f) => ({ negocio: desdeFila(f),
      diagnosticos: (f.diagnostico ?? []).map(diagDesdeFila).sort((a: Diagnostico, b: Diagnostico) => a.fecha.localeCompare(b.fecha)) }));
  }
  const d = leer();
  return d.negocios.map((n) => ({ negocio: n, diagnosticos: d.diagnosticos.filter((x) => x.negocioId === n.id) }));
}

// ───────── Conversión de filas ─────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function desdeFila(f: any): Negocio {
  return { id: f.id, nombre: f.nombre, tipo: f.tipo, trabajadores: f.trabajadores, celular: f.celular,
    tienePc: f.tiene_pc, plataformas: f.plataformas ?? [] };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function diagDesdeFila(f: any): Diagnostico {
  return { id: f.id, negocioId: f.negocio_id, momento: f.momento, fecha: f.fecha,
    respuestas: Object.fromEntries((f.respuesta ?? []).map((r: { pregunta_id: string; opcion_id: string }) => [r.pregunta_id, r.opcion_id])),
    niveles: { Identificar: f.nivel_identificar, Proteger: f.nivel_proteger, Recuperar: f.nivel_recuperar, general: f.nivel_general } };
}

function traducir(m: string): string {
  if (/Invalid login/i.test(m)) return 'Correo o contraseña incorrectos.';
  if (/already registered/i.test(m)) return 'Ya existe una cuenta con ese correo.';
  if (/at least 6/i.test(m)) return 'La contraseña debe tener al menos 6 caracteres.';
  if (/Email not confirmed/i.test(m)) return 'Confirma tu correo: te enviamos un enlace.';
  return m;
}
