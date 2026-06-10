-- Fase 5: Espacio Confidencial — conversaciones y mensajes del chat con el orientador
-- Ejecutar en Supabase: Dashboard > SQL Editor > New query > Run

create table public.conversacion (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.perfiles(id) on delete cascade,
  estado text not null default 'activa' check (estado in ('activa', 'cerrada', 'escalada')),
  created_at timestamptz not null default now()
);

alter table public.conversacion enable row level security;

create policy "ver mis conversaciones"
  on public.conversacion for select
  using (auth.uid() = usuario_id);

create policy "crear mis conversaciones"
  on public.conversacion for insert
  with check (auth.uid() = usuario_id);

create policy "actualizar mis conversaciones"
  on public.conversacion for update
  using (auth.uid() = usuario_id);

create table public.mensaje (
  id uuid primary key default gen_random_uuid(),
  conversacion_id uuid not null references public.conversacion(id) on delete cascade,
  emisor text not null check (emisor in ('usuario', 'orientador')),
  contenido text not null,
  riesgo_detectado boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.mensaje enable row level security;

create policy "ver mensajes de mis conversaciones"
  on public.mensaje for select
  using (exists (
    select 1 from public.conversacion c
    where c.id = conversacion_id and c.usuario_id = auth.uid()
  ));

create policy "crear mensajes en mis conversaciones"
  on public.mensaje for insert
  with check (exists (
    select 1 from public.conversacion c
    where c.id = conversacion_id and c.usuario_id = auth.uid()
  ));
