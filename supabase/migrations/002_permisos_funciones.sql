-- Recomendación del asesor de seguridad de Supabase:
-- crear_perfil solo la usa el disparador al registrarse; nadie debe llamarla desde la API.
revoke execute on function public.crear_perfil() from public, anon, authenticated;
-- es_investigador la necesitan las reglas de acceso de los usuarios con sesión, no los anónimos.
revoke execute on function public.es_investigador() from public, anon;
grant execute on function public.es_investigador() to authenticated;
