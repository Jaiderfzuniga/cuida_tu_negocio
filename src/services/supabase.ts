import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** null = modo demostración (sin base de datos; se guarda en el navegador). */
export const supabase = url && key ? createClient(url, key) : null;
export const modoDemo = !supabase;
