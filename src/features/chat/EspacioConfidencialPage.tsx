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
          <h1 className="text-2xl font-semibold text-primary">🛡️🔒 Espacio Confidencial</h1>
        </div>

        <div className="rounded-card bg-white p-4 shadow-sm">
          <p className="text-gray-600">
            Este es un espacio privado donde puedes hablar con un orientador sobre cómo te sientes. Nadie más en
            la app puede ver esta conversación.
          </p>
          <p className="mt-3 text-sm text-coral">
            Este espacio te acompaña, pero no reemplaza a un profesional de salud mental.
          </p>
        </div>

        <RecursosAyuda />

        <button
          type="button"
          onClick={() => navigate('/espacio-confidencial/chat')}
          className="rounded-pill bg-primary px-6 py-3 font-semibold text-white shadow-sm"
        >
          Hablar con un orientador
        </button>
      </main>
    </div>
  )
}
