import { useAuthStore } from '../../stores/useAuthStore'
import { usePerfil } from '../perfil/hooks/usePerfil'
import { useRegistroHoy } from './hooks/useRegistroHoy'
import { useGuardarRegistro } from './hooks/useGuardarRegistro'
import { useFraseDelDia } from './hooks/useFraseDelDia'
import { useRecomendados } from './hooks/useRecomendados'

const OPCIONES_ANIMO = [
  { valor: 1, emoji: '😢', etiqueta: 'Muy mal' },
  { valor: 2, emoji: '😟', etiqueta: 'Mal' },
  { valor: 3, emoji: '😐', etiqueta: 'Regular' },
  { valor: 4, emoji: '🙂', etiqueta: 'Bien' },
  { valor: 5, emoji: '😄', etiqueta: 'Muy bien' },
]

export function HomePage() {
  const session = useAuthStore((s) => s.session)
  const userId = session?.user.id

  const { data: perfil } = usePerfil(userId)
  const { data: registroHoy } = useRegistroHoy(userId)
  const { mutate: guardar, isPending } = useGuardarRegistro(userId)
  const { data: frase } = useFraseDelDia()
  const { data: recomendados } = useRecomendados(2)

  return (
    <main className="flex flex-col gap-6 p-6 pt-12">
      <div>
        <h1 className="text-2xl font-semibold text-primary">Hola, {perfil?.nombre ?? '...'} 👋</h1>
        <p className="text-gray-500">¿Cómo te sientes hoy?</p>
      </div>

      <div className="rounded-card bg-white p-4 shadow-sm">
        <div className="flex justify-between">
          {OPCIONES_ANIMO.map((opcion) => (
            <button
              key={opcion.valor}
              type="button"
              onClick={() => guardar(opcion.valor)}
              disabled={isPending}
              className={`flex flex-col items-center gap-1 rounded-card px-2 py-1 transition disabled:opacity-50 ${
                registroHoy?.valor === opcion.valor ? 'bg-lavanda ring-2 ring-primary' : ''
              }`}
            >
              <span className="text-3xl">{opcion.emoji}</span>
              <span className="text-xs text-gray-500">{opcion.etiqueta}</span>
            </button>
          ))}
        </div>
        {registroHoy && (
          <p className="mt-3 text-center text-sm text-menta">
            Hoy registraste: {OPCIONES_ANIMO.find((o) => o.valor === registroHoy.valor)?.etiqueta}
          </p>
        )}
      </div>

      {frase && (
        <div className="rounded-card bg-primary p-4 text-white shadow-sm">
          <p className="text-lg font-medium">"{frase.texto}"</p>
          {frase.autor && <p className="mt-2 text-sm opacity-80">— {frase.autor}</p>}
        </div>
      )}

      <div className="rounded-card bg-white p-4 shadow-sm">
        <h2 className="font-semibold text-primary">Recomendado para ti</h2>
        <div className="mt-2 flex flex-col gap-2">
          {recomendados?.map((recurso) => (
            <div key={recurso.id} className="rounded-card bg-lavanda p-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{recurso.icono ?? '📄'}</span>
                <span className="font-medium text-primary">{recurso.titulo}</span>
                {recurso.duracion_min && (
                  <span className="ml-auto text-xs text-gray-500">{recurso.duracion_min} min</span>
                )}
              </div>
              {recurso.descripcion && <p className="mt-1 text-sm text-gray-600">{recurso.descripcion}</p>}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
