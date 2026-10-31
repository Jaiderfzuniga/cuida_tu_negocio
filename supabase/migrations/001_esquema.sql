-- Escudo Digital · esquema de la base de datos (9 tablas) y reglas de acceso (RLS)
-- Ejecutar en Supabase → SQL Editor, y después supabase/seed.sql

-- 1. Perfil: rol de cada cuenta (propietario o investigador)
create table if not exists perfil (
  id uuid primary key references auth.users on delete cascade,
  rol text not null default 'propietario' check (rol in ('propietario', 'investigador')),
  creado timestamptz not null default now()
);

-- Crea el perfil automáticamente al registrarse
create or replace function crear_perfil() returns trigger language plpgsql security definer set search_path = public as $$
begin insert into perfil (id) values (new.id); return new; end $$;
drop trigger if exists al_registrarse on auth.users;
create trigger al_registrarse after insert on auth.users for each row execute function crear_perfil();

create or replace function es_investigador() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from perfil where id = auth.uid() and rol = 'investigador') $$;

-- 2. Negocio
create table if not exists negocio (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null unique references auth.users on delete cascade,
  nombre text not null,
  tipo text not null,
  trabajadores text not null,
  celular text not null check (celular in ('android', 'iphone')),
  tiene_pc boolean not null default false,
  plataformas text[] not null default '{}',
  creado timestamptz not null default now()
);

-- 3–6. Catálogo, cuestionario y reglas (los mantiene el investigador)
create table if not exists herramienta (
  id text primary key, funcion text not null check (funcion in ('Identificar', 'Proteger', 'Recuperar')),
  nombre text not null, dispositivo text not null, url text not null, marca text not null,
  costo text not null, espanol boolean not null, accesibilidad int not null, uso text not null,
  subcategoria text not null, rol text not null
);
create table if not exists pregunta (
  id text primary key, funcion text not null, orden int not null, texto text not null, ayuda text not null,
  motivo text not null, requiere jsonb
);
create table if not exists opcion (
  pregunta_id text references pregunta on delete cascade, id text, texto text not null, puntos int not null,
  primary key (pregunta_id, id)
);
create table if not exists regla (
  pregunta_id text references pregunta on delete cascade, herramienta_id text references herramienta,
  prioridad int not null, primary key (pregunta_id, herramienta_id)
);

-- 7. Diagnóstico (pre-test = primer diagnóstico; post-test = los siguientes)
create table if not exists diagnostico (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid not null references negocio on delete cascade,
  momento text not null check (momento in ('pre', 'post')),
  fecha timestamptz not null default now(),
  nivel_identificar int not null, nivel_proteger int not null, nivel_recuperar int not null, nivel_general int not null
);

-- 8. Respuesta
create table if not exists respuesta (
  diagnostico_id uuid references diagnostico on delete cascade,
  pregunta_id text not null, opcion_id text not null,
  primary key (diagnostico_id, pregunta_id)
);

-- 9. Recomendación generada (para el análisis del investigador)
create table if not exists recomendacion (
  diagnostico_id uuid references diagnostico on delete cascade,
  herramienta_id text references herramienta, puntos int not null, orden int not null,
  primary key (diagnostico_id, herramienta_id)
);

-- ───────── Reglas de acceso ─────────
alter table perfil enable row level security;
alter table negocio enable row level security;
alter table diagnostico enable row level security;
alter table respuesta enable row level security;
alter table recomendacion enable row level security;
alter table herramienta enable row level security;
alter table pregunta enable row level security;
alter table opcion enable row level security;
alter table regla enable row level security;

create policy "ver mi perfil" on perfil for select using (id = auth.uid() or es_investigador());

create policy "mi negocio" on negocio for all using (owner = auth.uid() or es_investigador())
  with check (owner = auth.uid());

create policy "mis diagnosticos" on diagnostico for all
  using (es_investigador() or negocio_id in (select id from negocio where owner = auth.uid()))
  with check (negocio_id in (select id from negocio where owner = auth.uid()));

create policy "mis respuestas" on respuesta for all
  using (es_investigador() or diagnostico_id in (select d.id from diagnostico d join negocio n on n.id = d.negocio_id where n.owner = auth.uid()))
  with check (diagnostico_id in (select d.id from diagnostico d join negocio n on n.id = d.negocio_id where n.owner = auth.uid()));

create policy "mis recomendaciones" on recomendacion for all
  using (es_investigador() or diagnostico_id in (select d.id from diagnostico d join negocio n on n.id = d.negocio_id where n.owner = auth.uid()))
  with check (diagnostico_id in (select d.id from diagnostico d join negocio n on n.id = d.negocio_id where n.owner = auth.uid()));

-- Catálogo y cuestionario: lectura pública, edición solo del investigador
create policy "leer catalogo" on herramienta for select using (true);
create policy "editar catalogo" on herramienta for all using (es_investigador()) with check (es_investigador());
create policy "leer preguntas" on pregunta for select using (true);
create policy "editar preguntas" on pregunta for all using (es_investigador()) with check (es_investigador());
create policy "leer opciones" on opcion for select using (true);
create policy "editar opciones" on opcion for all using (es_investigador()) with check (es_investigador());
create policy "leer reglas" on regla for select using (true);
create policy "editar reglas" on regla for all using (es_investigador()) with check (es_investigador());

-- Para darte el rol de investigador (después de crear tu cuenta):
-- update perfil set rol = 'investigador' where id = (select id from auth.users where email = 'TU_CORREO');
