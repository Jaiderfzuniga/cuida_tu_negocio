import type { Herramienta } from '../types';
import datos from './catalogo.json';

/** Catálogo final del objetivo 2: 33 herramientas (10 Identificar, 17 Proteger, 6 Recuperar). */
export const CATALOGO = datos as Herramienta[];
export const porId = (id: string) => CATALOGO.find((h) => h.id === id);
