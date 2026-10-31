export type Funcion = 'Identificar' | 'Proteger' | 'Recuperar';
export const FUNCIONES: Funcion[] = ['Identificar', 'Proteger', 'Recuperar'];

export type Dispositivo = 'celular' | 'pc' | 'ambos';
export type Celular = 'android' | 'iphone';
export type Plataforma = 'whatsapp' | 'nequi' | 'daviplata' | 'facebook' | 'instagram' | 'correo' | 'banca';

export interface Herramienta {
  id: string;
  funcion: Funcion;
  nombre: string;
  dispositivo: Dispositivo;
  url: string;
  marca: string;
  costo: string;
  espanol: boolean;
  accesibilidad: number;
  uso: string;
  subcategoria: string;
  rol: string;
}

export interface Opcion { id: string; texto: string; puntos: number; omitir?: boolean }

export interface Pregunta {
  id: string;
  funcion: Funcion;
  texto: string;
  ayuda: string;
  opciones: Opcion[];
  /** Herramientas que se recomiendan cuando la respuesta no tiene el puntaje máximo. */
  herramientas: string[];
  /** Frase corta para explicar la recomendación: «Porque …». */
  motivo: string;
  /** Solo se muestra si el negocio tiene computador o usa al menos una de las plataformas. */
  requiere?: { plataformas?: Plataforma[]; pc?: boolean };
}

export interface Negocio {
  id?: string;
  nombre: string;
  tipo: string;
  trabajadores: string;
  celular: Celular;
  tienePc: boolean;
  plataformas: Plataforma[];
}

export type Respuestas = Record<string, string>; // preguntaId -> opcionId

export interface Niveles { Identificar: number; Proteger: number; Recuperar: number; general: number }

export interface Diagnostico {
  id: string;
  negocioId: string;
  momento: 'pre' | 'post';
  fecha: string;
  respuestas: Respuestas;
  niveles: Niveles;
}

export interface Perfil { id: string; email: string; rol: 'propietario' | 'investigador' }
