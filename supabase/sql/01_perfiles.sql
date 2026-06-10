-- Fase 1: tabla de perfiles (1 fila por usuario, ligada a auth.users)
-- Ejecutar en Supabase: Dashboard > SQL Editor > New query > Run

create table public.perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text,
  pseudonimo text unique,
  avatar_url text,
  badge_motivacional text,
  racha_actual int not null default 0,
  racha_max int not null default 0,
  ultima_actividad date,
  created_at timestamptz not null default now()
);

-- Activar RLS: por defecto, nadie puede leer/escribir nada
alter table public.perfiles enable row level security;

-- Cada usuario puede ver su propio perfil
create policy "ver propio perfil"
  on public.perfiles for select
  using (auth.uid() = id);

-- Cada usuario puede actualizar su propio perfil
create policy "actualizar propio perfil"
  on public.perfiles for update
  using (auth.uid() = id);

-- Cada usuario puede crear su propio perfil (lo usa el trigger de abajo)
create policy "crear propio perfil"
  on public.perfiles for insert
  with check (auth.uid() = id);

-- Función: crea automáticamente el perfil al registrarse
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.perfiles (id, nombre, pseudonimo)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nombre', 'Usuario'),
    'usuario_' || substr(new.id::text, 1, 8)
  );
  return new;
end;
$$;

-- Trigger: se ejecuta cada vez que se crea un usuario nuevo en auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
