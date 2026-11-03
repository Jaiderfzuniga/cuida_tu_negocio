import { useEffect, useState } from 'react';
import type { Diagnostico } from '../types';
import { diagnosticosDe } from '../services/store';
import { useSesion } from './useSesion';

/** Diagnósticos del negocio actual y el seleccionado por id (o el último). */
export function useDiagnosticos(id?: string) {
  const { negocio } = useSesion();
  const [lista, setLista] = useState<Diagnostico[] | null>(null);
  useEffect(() => { if (negocio?.id) diagnosticosDe(negocio.id).then(setLista); }, [negocio?.id]);
  const actual = lista ? (id ? lista.find((d) => d.id === id) : lista[lista.length - 1]) ?? null : null;
  return { lista, actual, cargando: lista === null };
}
