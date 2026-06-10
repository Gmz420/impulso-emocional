-- Fase 2: check-in emocional (Home) + frase del día
-- Ejecutar en Supabase: Dashboard > SQL Editor > New query > Run

-- Un registro por usuario y día (1 = muy mal ... 5 = muy bien)
create table public.registro_emocional (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.perfiles(id) on delete cascade,
  fecha date not null,
  valor int not null check (valor between 1 and 5),
  created_at timestamptz not null default now(),
  unique (usuario_id, fecha)
);

alter table public.registro_emocional enable row level security;

create policy "ver mis registros"
  on public.registro_emocional for select
  using (auth.uid() = usuario_id);

create policy "crear mis registros"
  on public.registro_emocional for insert
  with check (auth.uid() = usuario_id);

create policy "actualizar mis registros"
  on public.registro_emocional for update
  using (auth.uid() = usuario_id);

-- Catálogo de frases motivacionales (lectura pública para usuarios logueados)
create table public.frase (
  id uuid primary key default gen_random_uuid(),
  texto text not null,
  autor text,
  activa boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.frase enable row level security;

create policy "leer frases activas"
  on public.frase for select
  using (activa = true);

-- Datos de ejemplo (frase del día)
insert into public.frase (texto, autor) values
  ('Cada día es una nueva oportunidad para cuidar de ti.', null),
  ('No tienes que controlarlo todo, solo dar el siguiente paso.', null),
  ('Tus sentimientos son válidos, tómate tu tiempo.', null),
  ('Pequeños progresos siguen siendo progresos.', null),
  ('Está bien no estar bien todos los días.', null);
