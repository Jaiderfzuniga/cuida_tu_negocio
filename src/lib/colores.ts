import type { Funcion } from '../types';

export const COLOR: Record<Funcion, { fuerte: string; texto: string }> = {
  Identificar: { fuerte: 'var(--verde)', texto: 'var(--verde-texto)' },
  Proteger: { fuerte: 'var(--azul)', texto: 'var(--azul-texto)' },
  Recuperar: { fuerte: 'var(--naranja)', texto: 'var(--naranja-texto)' },
};

const TIENDAS = ['play.google.com', 'apps.apple.com', 'chromewebstore.google.com'];

/** Dominio del enlace y si pertenece a la marca de la herramienta o a una tienda oficial. */
export function sitioOficial(url: string, marca: string) {
  const host = new URL(url).hostname.replace(/^www\./, '');
  const oficial = host === marca || host.endsWith('.' + marca) || TIENDAS.includes(host);
  return { host, oficial, tienda: TIENDAS.includes(host) };
}
