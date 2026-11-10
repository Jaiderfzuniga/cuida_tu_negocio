import { describe, expect, it } from 'vitest';
import { GUIAS, guiaDe } from '../src/data/guias';
import { CATALOGO } from '../src/data/catalogo';

describe('guías (HU-19, RF-10, RF-12)', () => {
  it('solo usan Identificar, Proteger o Recuperar y herramientas del catálogo', () => {
    const ids = new Set(CATALOGO.map((h) => h.id));
    for (const g of GUIAS) {
      expect(['Identificar', 'Proteger', 'Recuperar']).toContain(g.funcion);
      for (const h of g.herramientas) expect(ids.has(h)).toBe(true);
      expect(g.fuente.url.startsWith('https://')).toBe(true);
    }
  });
  it('cada herramienta de respaldo del celular tiene guía para Android y para iPhone', () => {
    expect(guiaDe('R-05', 'android')?.id).toBe('copia-whatsapp-android');
    expect(guiaDe('R-05', 'iphone')?.id).toBe('copia-whatsapp-iphone');
    expect(guiaDe('R-06', 'android')?.id).toBe('copia-android');
    expect(guiaDe('R-07', 'iphone')?.id).toBe('copia-iphone');
  });
  it('las guías de Recuperar dicen cada cuánto hacer la copia (RF-09)', () => {
    for (const g of GUIAS.filter((x) => x.funcion === 'Recuperar')) expect(g.frecuencia).toBeTruthy();
  });
});
