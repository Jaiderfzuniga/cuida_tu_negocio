import type { Funcion, Negocio, Niveles, Pregunta, Respuestas } from '../types';
import { FUNCIONES } from '../types';
import { PREGUNTAS } from '../data/preguntas';

/** Preguntas que aplican al negocio según sus plataformas y equipos (RF-17). */
export function preguntasPara(negocio: Negocio): Pregunta[] {
  return PREGUNTAS.filter((p) => {
    if (p.requiere?.pc && !negocio.tienePc) return false;
    if (p.requiere?.plataformas && !p.requiere.plataformas.some((x) => negocio.plataformas.includes(x))) return false;
    return true;
  });
}

export const maxPuntos = (p: Pregunta) => Math.max(...p.opciones.filter((o) => !o.omitir).map((o) => o.puntos));
export const puntosDe = (p: Pregunta, r: Respuestas) => p.opciones.find((o) => o.id === r[p.id])?.puntos ?? 0;

/** Máximo de puntos posibles por función para este negocio. */
export function maximos(negocio: Negocio): Record<Funcion, number> {
  const m = { Identificar: 0, Proteger: 0, Recuperar: 0 } as Record<Funcion, number>;
  preguntasPara(negocio).forEach((p) => (m[p.funcion] += maxPuntos(p)));
  return m;
}

/** Nivel por función (0–100) y nivel general = promedio de las tres funciones (RF-03). */
export function calcularNiveles(respuestas: Respuestas, negocio: Negocio): Niveles {
  const max = maximos(negocio);
  const obt = { Identificar: 0, Proteger: 0, Recuperar: 0 } as Record<Funcion, number>;
  preguntasPara(negocio).forEach((p) => (obt[p.funcion] += puntosDe(p, respuestas)));
  const nivel = (f: Funcion) => (max[f] ? Math.round((obt[f] / max[f]) * 100) : 100);
  const n = { Identificar: nivel('Identificar'), Proteger: nivel('Proteger'), Recuperar: nivel('Recuperar') };
  return { ...n, general: Math.round(FUNCIONES.reduce((s, f) => s + n[f], 0) / 3) };
}

export const funcionMasDebil = (n: Niveles): Funcion =>
  FUNCIONES.reduce((a, b) => (n[b] < n[a] ? b : a));
