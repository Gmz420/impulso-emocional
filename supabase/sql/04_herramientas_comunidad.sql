-- Fase 4: catálogos de Herramientas + contenido de ejemplo de Comunidad
-- Ejecutar en Supabase: Dashboard > SQL Editor > New query > Run

-- Herramientas: categorías de recursos (lectura pública)
create table public.categoria_recurso (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  icono text,
  color text,
  orden int not null default 0
);

alter table public.categoria_recurso enable row level security;

create policy "leer categorias"
  on public.categoria_recurso for select
  using (true);

-- Herramientas: recursos (ejercicios/artículos) por categoría
create table public.recurso (
  id uuid primary key default gen_random_uuid(),
  categoria_id uuid not null references public.categoria_recurso(id) on delete cascade,
  titulo text not null,
  descripcion text,
  tipo text,
  duracion_min int,
  contenido text,
  icono text,
  orden int not null default 0
);

alter table public.recurso enable row level security;

create policy "leer recursos"
  on public.recurso for select
  using (true);

-- Comunidad: grupos de apoyo
create table public.grupo_apoyo (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text
);

alter table public.grupo_apoyo enable row level security;

create policy "leer grupos"
  on public.grupo_apoyo for select
  using (true);

-- Comunidad: eventos
create table public.evento (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text,
  fecha timestamptz not null
);

alter table public.evento enable row level security;

create policy "leer eventos"
  on public.evento for select
  using (true);

-- Comunidad: posts de ejemplo (solo lectura en esta fase, ver nota arriba)
create table public.post (
  id uuid primary key default gen_random_uuid(),
  autor_pseudonimo text not null,
  contenido text not null,
  seccion text not null check (seccion in ('foro', 'grupo', 'evento')),
  grupo_id uuid references public.grupo_apoyo(id) on delete set null,
  likes_count int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.post enable row level security;

create policy "leer posts"
  on public.post for select
  using (true);

-- Datos de ejemplo: 5 categorías de Herramientas
insert into public.categoria_recurso (nombre, descripcion, icono, color, orden) values
  ($t$Respiración$t$, $t$Ejercicios para calmar la mente$t$, $t$🌬️$t$, $t$celeste$t$, 1),
  ($t$Meditaciones guiadas$t$, $t$Audios para relajarte y enfocarte$t$, $t$🧘$t$, $t$menta$t$, 2),
  ($t$Manejo del estrés$t$, $t$Técnicas para los días difíciles$t$, $t$🌿$t$, $t$amarillo$t$, 3),
  ($t$Organización y enfoque$t$, $t$Tips para estudiar mejor$t$, $t$📋$t$, $t$coral$t$, 4),
  ($t$Sueño y descanso$t$, $t$Hábitos para dormir mejor$t$, $t$🌙$t$, $t$primary$t$, 5);

-- Datos de ejemplo: recursos por categoría
insert into public.recurso (categoria_id, titulo, descripcion, tipo, duracion_min, icono, orden)
select id, $t$Respiración 4-7-8$t$, $t$Inhala 4s, sostén 7s, exhala 8s. Repite 4 veces.$t$, $t$respiracion$t$, 5, $t$🌬️$t$, 1
from public.categoria_recurso where nombre = $t$Respiración$t$
union all
select id, $t$Respiración consciente$t$, $t$Concéntrate solo en tu respiración durante 3 minutos.$t$, $t$respiracion$t$, 3, $t$🌬️$t$, 2
from public.categoria_recurso where nombre = $t$Respiración$t$
union all
select id, $t$Meditación para dormir$t$, $t$Audio guiado para relajar el cuerpo antes de dormir.$t$, $t$meditacion$t$, 10, $t$🧘$t$, 1
from public.categoria_recurso where nombre = $t$Meditaciones guiadas$t$
union all
select id, $t$Escaneo corporal$t$, $t$Recorre tu cuerpo mentalmente liberando tensión.$t$, $t$meditacion$t$, 8, $t$🧘$t$, 2
from public.categoria_recurso where nombre = $t$Meditaciones guiadas$t$
union all
select id, $t$5 señales de estrés$t$, $t$Aprende a reconocer cuándo necesitas una pausa.$t$, $t$articulo$t$, 4, $t$🌿$t$, 1
from public.categoria_recurso where nombre = $t$Manejo del estrés$t$
union all
select id, $t$Técnica Pomodoro$t$, $t$25 minutos de foco + 5 de descanso.$t$, $t$articulo$t$, 5, $t$📋$t$, 1
from public.categoria_recurso where nombre = $t$Organización y enfoque$t$
union all
select id, $t$Lista de tareas simple$t$, $t$Organiza tu día en 3 prioridades.$t$, $t$articulo$t$, 3, $t$📋$t$, 2
from public.categoria_recurso where nombre = $t$Organización y enfoque$t$
union all
select id, $t$Higiene del sueño$t$, $t$Hábitos para dormir mejor cada noche.$t$, $t$articulo$t$, 5, $t$🌙$t$, 1
from public.categoria_recurso where nombre = $t$Sueño y descanso$t$;

-- Datos de ejemplo: grupos de apoyo
insert into public.grupo_apoyo (nombre, descripcion) values
  ($t$Estudiantes con ansiedad$t$, $t$Espacio para compartir y apoyarse entre estudiantes$t$),
  ($t$Pausa activa$t$, $t$Comparte tus rutinas de descanso y autocuidado$t$);

-- Datos de ejemplo: eventos próximos
insert into public.evento (titulo, descripcion, fecha) values
  ($t$Taller de respiración consciente$t$, $t$Sesión grupal online para aprender técnicas de respiración.$t$, now() + interval $t$3 days$t$),
  ($t$Charla: manejo del estrés en exámenes$t$, $t$Conversatorio con tips prácticos para la época de pruebas.$t$, now() + interval $t$7 days$t$);

-- Datos de ejemplo: posts del foro y de grupos
insert into public.post (autor_pseudonimo, contenido, seccion, grupo_id, likes_count) values
  ($t$MentePositiva$t$, $t$Hoy tuve un día difícil pero logré salir a caminar 20 minutos. Pequeñas victorias 💜$t$, $t$foro$t$, null, 4),
  ($t$CalmaInterior$t$, $t$¿Alguien más siente que la semana de pruebas se siente eterna? Ánimo a todos 🌱$t$, $t$foro$t$, null, 7),
  ($t$PasoAPaso$t$, $t$Recordatorio: está bien pedir ayuda cuando la necesitas.$t$, $t$foro$t$, null, 12),
  ($t$EstudianteResiliente$t$, $t$Esta semana probé la técnica Pomodoro y me ayudó mucho a concentrarme.$t$, $t$grupo$t$,
    (select id from public.grupo_apoyo where nombre = $t$Pausa activa$t$), 5),
  ($t$NuevoComienzo$t$, $t$Me uní a este grupo porque también me cuesta manejar la ansiedad antes de las evaluaciones.$t$, $t$grupo$t$,
    (select id from public.grupo_apoyo where nombre = $t$Estudiantes con ansiedad$t$), 3);

-- Perfil: badge motivacional por defecto (columna ya existía desde Fase 1, sin usar)
alter table public.perfiles alter column badge_motivacional set default $t$Eres increíble 💜$t$;
update public.perfiles set badge_motivacional = $t$Eres increíble 💜$t$ where badge_motivacional is null;
