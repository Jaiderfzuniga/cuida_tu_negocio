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
    const p = await perfilActual();
    setPerfil(p);
    setNegocio(p ? await miNegocio(p) : null);
    setCargando(false);
  }, []);

  useEffect(() => {
    refrescar();
    const sub = supabase?.auth.onAuthStateChange(() => { refrescar(); });
    return () => sub?.data.subscription.unsubscribe();
  }, [refrescar]);

  return <SesionCtx.Provider value={{ perfil, negocio, cargando, refrescar, setNegocio }}>{children}</SesionCtx.Provider>;
}

export const useSesion = () => useContext(SesionCtx);
