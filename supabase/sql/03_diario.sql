-- Fase 3: diario emocional (entradas + catálogo de emociones + relación N:M)
-- Ejecutar en Supabase: Dashboard > SQL Editor > New query > Run

-- Una entrada por usuario y día (selector de día = "último sobrescribe")
create table public.entrada_diario (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.perfiles(id) on delete cascade,
  fecha date not null,
  texto_dia text,
  texto_gratitud text,
  updated_at timestamptz not null default now(),
  unique (usuario_id, fecha)
);

alter table public.entrada_diario enable row level security;

create policy "ver mis entradas"
  on public.entrada_diario for select
  using (auth.uid() = usuario_id);

create policy "crear mis entradas"
  on public.entrada_diario for insert
  with check (auth.uid() = usuario_id);

create policy "actualizar mis entradas"
  on public.entrada_diario for update
  using (auth.uid() = usuario_id);

-- Catálogo de emociones (predefinidas = lectura pública)
create table public.emocion (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  es_predefinida boolean not null default true,
  usuario_id uuid references public.perfiles(id) on delete cascade
);

alter table public.emocion enable row level security;

create policy "ver emociones predefinidas"
  on public.emocion for select
  using (es_predefinida = true or usuario_id = auth.uid());

insert into public.emocion (nombre, es_predefinida) values
  ('Tristeza', true),
  ('Ansiedad', true),
  ('Estrés', true),
  ('Alegría', true),
  ('Miedo', true),
  ('Orgullo', true),
  ('Calma', true),
  ('Frustración', true);

-- Relación N:M: qué emociones tuvo cada entrada del diario
create table public.entrada_diario_emocion (
  entrada_id uuid not null references public.entrada_diario(id) on delete cascade,
  emocion_id uuid not null references public.emocion(id) on delete cascade,
  primary key (entrada_id, emocion_id)
);

alter table public.entrada_diario_emocion enable row level security;

-- No hay usuario_id directo: se valida a través de la entrada dueña
create policy "ver emociones de mis entradas"
  on public.entrada_diario_emocion for select
  using (
    exists (
      select 1 from public.entrada_diario
      where entrada_diario.id = entrada_diario_emocion.entrada_id
      and entrada_diario.usuario_id = auth.uid()
    )
  );

create policy "asociar emociones a mis entradas"
  on public.entrada_diario_emocion for insert
  with check (
    exists (
      select 1 from public.entrada_diario
      where entrada_diario.id = entrada_diario_emocion.entrada_id
      and entrada_diario.usuario_id = auth.uid()
    )
  );

create policy "quitar emociones de mis entradas"
  on public.entrada_diario_emocion for delete
  using (
    exists (
      select 1 from public.entrada_diario
      where entrada_diario.id = entrada_diario_emocion.entrada_id
      and entrada_diario.usuario_id = auth.uid()
    )
  );
