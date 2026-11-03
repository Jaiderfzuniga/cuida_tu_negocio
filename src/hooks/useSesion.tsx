import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Negocio, Perfil } from '../types';
import { miNegocio, perfilActual } from '../services/store';
import { supabase } from '../services/supabase';

interface Ctx { perfil: Perfil | null; negocio: Negocio | null; cargando: boolean; refrescar: () => Promise<void>; setNegocio: (n: Negocio) => void }
const SesionCtx = createContext<Ctx>(null as unknown as Ctx);

export function SesionProvider({ children }: { children: ReactNode }) {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [negocio, setNegocio] = useState<Negocio | null>(null);
  const [cargando, setCargando] = useState(true);

  const refrescar = useCallback(async () => {
    try {
      const p = await perfilActual();
      setPerfil(p);
      setNegocio(p ? await miNegocio(p) : null);
    } finally {
      setCargando(false); // nunca dejar la pantalla en «Cargando…» si algo falla
    }
  }, []);

  useEffect(() => {
    refrescar();
    // Supabase se bloquea si dentro de este aviso se hacen otras consultas a la base de datos;
    // por eso la recarga de la sesión se hace un instante después (setTimeout).
    const sub = supabase?.auth.onAuthStateChange((evento) => {
      if (evento === 'INITIAL_SESSION') return; // la primera carga ya la hace refrescar()
      setTimeout(() => { refrescar(); }, 0);
    });
    return () => sub?.data.subscription.unsubscribe();
  }, [refrescar]);

  return <SesionCtx.Provider value={{ perfil, negocio, cargando, refrescar, setNegocio }}>{children}</SesionCtx.Provider>;
}

export const useSesion = () => useContext(SesionCtx);
