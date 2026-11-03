import { useEffect, useState } from 'react';

type Tema = 'oscuro' | 'claro';
const leer = (): Tema => {
  try { return (localStorage.getItem('tema') as Tema) || 'oscuro'; } catch { return 'oscuro'; }
};

export function useTema() {
  const [tema, setTema] = useState<Tema>(leer);
  useEffect(() => {
    document.documentElement.classList.toggle('claro', tema === 'claro');
    try { localStorage.setItem('tema', tema); } catch { /* sin almacenamiento */ }
  }, [tema]);
  return { tema, alternar: () => setTema((t) => (t === 'oscuro' ? 'claro' : 'oscuro')) };
}
