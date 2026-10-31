import type { Funcion, Herramienta, Negocio, Niveles, Respuestas } from '../types';
import { CATALOGO, porId } from '../data/catalogo';
import { maximos, maxPuntos, preguntasPara, puntosDe } from './puntaje';

const SOLO_ANDROID = ['I-07', 'R-06', 'P-20', 'P-21', 'P-30', 'P-32'];
const SOLO_IPHONE = ['I-08', 'R-07'];
/** Herramientas que solo tienen sentido si el negocio usa esa plataforma. */
const SEGUN_PLATAFORMA: Record<string, Negocio['plataformas'][number]> = { 'P-16': 'correo', 'P-17': 'facebook', 'P-18': 'nequi', 'P-09': 'whatsapp', 'R-05': 'whatsapp', 'I-09': 'whatsapp' };

/** ¿La herramienta sirve en los equipos del negocio? */
export function compatible(h: Herramienta, n: Negocio): boolean {
  if (h.dispositivo === 'pc' && !n.tienePc) return false;
  if (n.celular === 'iphone' && SOLO_ANDROID.includes(h.id)) return false;
  if (n.celular === 'android' && SOLO_IPHONE.includes(h.id)) return false;
  if (SEGUN_PLATAFORMA[h.id] && !n.plataformas.includes(SEGUN_PLATAFORMA[h.id])) return false;
  return true;
}

export interface Paso {
  herramienta: Herramienta;
  alternativas: Herramienta[];
  motivos: string[];
  funcion: Funcion;
  /** Puntos del nivel general que se ganan al aplicar la herramienta. */
  puntos: number;
}

/**
 * Motor de reglas (RF-05, RF-07): cada respuesta sin el puntaje máximo activa la primera
 * herramienta compatible de su pregunta. Los puntos que faltan se reparten entre las
 * herramientas, de modo que la suma lleva el nivel general al 100 %.
 */
export function rutaAl100(respuestas: Respuestas, negocio: Negocio, niveles: Niveles): Paso[] {
  const max = maximos(negocio);
  const pasos = new Map<string, Paso & { exacto: number }>();

  for (const p of preguntasPara(negocio)) {
    const falta = maxPuntos(p) - puntosDe(p, respuestas);
    if (falta <= 0) continue;
    const opciones = p.herramientas.map(porId).filter((h): h is Herramienta => !!h && compatible(h, negocio));
    if (!opciones.length) continue;
    const ganancia = ((falta / max[p.funcion]) * 100) / 3;
    const ya = pasos.get(opciones[0].id);
    if (ya) {
      ya.exacto += ganancia;
      if (!ya.motivos.includes(p.motivo)) ya.motivos.push(p.motivo);
    } else {
      pasos.set(opciones[0].id, {
        herramienta: opciones[0], alternativas: opciones.slice(1), motivos: [p.motivo],
        funcion: p.funcion, puntos: 0, exacto: ganancia,
      });
    }
  }

  // Prioridad: primero la función con el nivel más bajo; dentro de ella, la que más suma.
  const lista = [...pasos.values()].sort(
    (a, b) => niveles[a.funcion] - niveles[b.funcion] || b.exacto - a.exacto,
  );

  // Redondeo que conserva el total exacto (100 − nivel general).
  const objetivo = 100 - niveles.general;
  lista.forEach((p) => (p.puntos = Math.floor(p.exacto)));
  let resto = objetivo - lista.reduce((s, p) => s + p.puntos, 0);
  [...lista].sort((a, b) => (b.exacto % 1) - (a.exacto % 1)).forEach((p) => {
    if (resto > 0) { p.puntos++; resto--; }
  });
  return lista.map(({ exacto: _e, ...p }) => p).filter((p) => p.puntos > 0);
}

/**
 * Herramientas de refuerzo: aunque el negocio tenga 100 % (o ya cubra una función), siempre
 * se le sugieren herramientas útiles del catálogo para conocer o mantener su protección.
 * Toma hasta `porFuncion` herramientas «Primera opción» compatibles por función, sin repetir la ruta.
 */
export function refuerzo(negocio: Negocio, excluir: string[] = [], porFuncion = 2): Herramienta[] {
  const funciones: Funcion[] = ['Identificar', 'Proteger', 'Recuperar'];
  return funciones.flatMap((f) =>
    CATALOGO.filter((h) => h.funcion === f && !excluir.includes(h.id) && compatible(h, negocio) && h.rol.startsWith('Primera opción'))
      .sort((a, b) => b.accesibilidad - a.accesibilidad || (Number(b.espanol) - Number(a.espanol)))
      .slice(0, porFuncion),
  );
}
