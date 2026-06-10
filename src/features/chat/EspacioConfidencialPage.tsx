import { useNavigate } from 'react-router-dom'
import { RecursosAyuda } from './components/RecursosAyuda'

export function EspacioConfidencialPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-lavanda">
      <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 p-6 pt-12">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => navigate(-1)} className="text-2xl text-primary">
            ←
          </button>
          <h1 className="text-2xl font-semibold text-primary">🔒 Tu espacio privado y seguro</h1>
        </div>

        <div className="rounded-card bg-white p-4 shadow-sm">
          <p className="text-gray-600">
            Aquí puedes hablar con un orientador sobre cómo te sientes, a tu ritmo y sin que nadie más en la app
            vea esta conversación. No hay respuestas correctas o incorrectas, solo un espacio para ti.
          </p>
          <p className="mt-3 text-sm text-coral">
            Este espacio te acompaña, pero no reemplaza a un profesional de salud mental.
          </p>
        </div>

        <RecursosAyuda />

        <button
          type="button"
          onClick={() => navigate('/espacio-confidencial/chat')}
          className="rounded-pill bg-primary px-6 py-4 text-lg font-semibold text-white shadow-sm"
        >
          💬 Hablar con un orientador
        </button>
      </main>
    </div>
  )
}
