import { useState } from 'react'
import { usePosts } from './hooks/usePosts'
import { useGruposApoyo } from './hooks/useGruposApoyo'
import { useEventos } from './hooks/useEventos'

const TABS = [
  { id: 'foro', etiqueta: 'Foro' },
  { id: 'grupos', etiqueta: 'Grupos' },
  { id: 'eventos', etiqueta: 'Eventos' },
] as const

type TabId = (typeof TABS)[number]['id']

function PostCard({ autor, contenido, likes }: { autor: string; contenido: string; likes: number }) {
  return (
    <div className="rounded-card bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-primary">{autor}</p>
      <p className="mt-1 text-sm text-gray-600">{contenido}</p>
      <p className="mt-2 text-xs text-coral">❤️ {likes}</p>
    </div>
  )
}

function formatearFecha(fechaIso: string) {
  return new Date(fechaIso).toLocaleString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function ComunidadPage() {
  const [tab, setTab] = useState<TabId>('foro')

  const { data: postsForo } = usePosts('foro')
  const { data: postsGrupo } = usePosts('grupo')
  const { data: grupos } = useGruposApoyo()
  const { data: eventos } = useEventos()

  return (
    <main className="flex flex-col gap-4 p-6 pt-12">
      <div>
        <h1 className="text-2xl font-semibold text-primary">Comunidad</h1>
        <p className="text-gray-500">No estás solo/a en esto</p>
      </div>

      <div className="flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-pill px-4 py-2 text-sm font-medium transition ${
              tab === t.id ? 'bg-primary text-white' : 'bg-white text-gray-500'
            }`}
          >
            {t.etiqueta}
          </button>
        ))}
      </div>

      {tab === 'foro' && (
        <div className="flex flex-col gap-3">
          {postsForo?.length ? (
            postsForo.map((post) => (
              <PostCard
                key={post.id}
                autor={post.autor_pseudonimo}
                contenido={post.contenido}
                likes={post.likes_count}
              />
            ))
          ) : (
            <p className="text-gray-400">Aún no hay publicaciones.</p>
          )}
        </div>
      )}

      {tab === 'grupos' && (
        <div className="flex flex-col gap-3">
          {grupos?.map((grupo) => (
            <div key={grupo.id} className="rounded-card bg-white p-4 shadow-sm">
              <h2 className="font-semibold text-primary">{grupo.nombre}</h2>
              {grupo.descripcion && <p className="text-sm text-gray-500">{grupo.descripcion}</p>}
            </div>
          ))}

          {postsGrupo?.length ? (
            postsGrupo.map((post) => (
              <PostCard
                key={post.id}
                autor={post.autor_pseudonimo}
                contenido={post.contenido}
                likes={post.likes_count}
              />
            ))
          ) : (
            <p className="text-gray-400">Aún no hay publicaciones en grupos.</p>
          )}
        </div>
      )}

      {tab === 'eventos' && (
        <div className="flex flex-col gap-3">
          {eventos?.length ? (
            eventos.map((evento) => (
              <div key={evento.id} className="rounded-card bg-white p-4 shadow-sm">
                <h2 className="font-semibold text-primary">{evento.titulo}</h2>
                {evento.descripcion && <p className="text-sm text-gray-500">{evento.descripcion}</p>}
                <p className="mt-2 text-xs text-menta capitalize">{formatearFecha(evento.fecha)}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No hay eventos próximos.</p>
          )}
        </div>
      )}
    </main>
  )
}
