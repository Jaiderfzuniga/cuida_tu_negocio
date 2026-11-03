import { describe, expect, it } from 'vitest';
import { calcularNiveles, preguntasPara } from '../src/lib/puntaje';
import { refuerzo, rutaAl100 } from '../src/lib/motor';
import type { Negocio, Respuestas } from '../src/types';

const negocio: Negocio = {
  nombre: 'Prueba', tipo: 'Tienda', trabajadores: '2-3', celular: 'android', tienePc: false,
  plataformas: ['whatsapp', 'nequi'],
};

describe('cálculo del nivel', () => {
  it('filtra las preguntas que no aplican', () => {
    const ids = preguntasPara(negocio).map((p) => p.id);
    expect(ids).not.toContain('RC3'); // sin computador
    expect(ids).not.toContain('PR3'); // sin correo ni redes sociales
    expect(ids.length).toBeLessThanOrEqual(13);
    expect(ids).toContain('PR4'); // usa Nequi
  });

  it('todo en máximo da 100 % y ruta vacía', () => {
    const r: Respuestas = Object.fromEntries(preguntasPara(negocio).map((p) => [p.id, 'a']));
    const n = calcularNiveles(r, negocio);
    expect(n.general).toBe(100);
    expect(rutaAl100(r, negocio, n)).toHaveLength(0);
    // Aun con 100 % se recomiendan herramientas de las tres funciones
    const extra = refuerzo(negocio, [], 2);
    expect(new Set(extra.map((h) => h.funcion)).size).toBe(3);
    expect(extra.every((h) => h.dispositivo !== 'pc')).toBe(true); // sin computador
  });

  it('la ruta suma exactamente lo que falta para el 100 %', () => {
    const r: Respuestas = Object.fromEntries(preguntasPara(negocio).map((p, i) => [p.id, i % 2 ? 'a' : 'c']));
    const n = calcularNiveles(r, negocio);
    const ruta = rutaAl100(r, negocio, n);
    expect(ruta.reduce((s, p) => s + p.puntos, 0)).toBe(100 - n.general);
    // Android: nunca recomienda herramientas solo de iPhone
    expect(ruta.some((p) => p.herramienta.id === 'R-07' || p.herramienta.id === 'I-08')).toBe(false);
  });
});
