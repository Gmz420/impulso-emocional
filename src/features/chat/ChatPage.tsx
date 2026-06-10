import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/useAuthStore'
import { useConversacion } from './hooks/useConversacion'
import { useMensajes } from './hooks/useMensajes'
import { useEnviarMensaje } from './hooks/useEnviarMensaje'

export function ChatPage() {
  const navigate = useNavigate()
  const session = useAuthStore((s) => s.session)
  const userId = session?.user.id

  const { data: conversacion } = useConversacion(userId)
  const { data: mensajes } = useMensajes(conversacion?.id)
  const { mutate: enviar, isPending, error } = useEnviarMensaje(conversacion?.id)

  const [texto, setTexto] = useState('')
  const finRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, isPending])

  function handleEnviar(e: FormEvent) {
    e.preventDefault()
    const contenido = texto.trim()
    if (!contenido) return
    setTexto('')
    enviar(contenido)
  }

  return (
    <div className="min-h-screen bg-lavanda">
      <main className="mx-auto flex h-screen max-w-md flex-col bg-lavanda">
        <div className="flex items-center gap-3 border-b border-gray-200 bg-white p-4">
          <button type="button" onClick={() => navigate(-1)} className="text-2xl text-primary">
            ←
          </button>
          <h1 className="font-semibold text-primary">Orientador 🛡️</h1>
        </div>

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
          {mensajes?.length ? (
            mensajes.map((mensaje) => (
              <div
                key={mensaje.id}
                className={`max-w-[80%] rounded-card px-4 py-2 ${
                  mensaje.emisor === 'usuario'
                    ? 'self-end bg-primary text-white'
                    : 'self-start bg-white text-gray-700 shadow-sm'
                }`}
              >
                {mensaje.contenido}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">Escribe algo para empezar a hablar con el orientador.</p>
          )}

          {isPending && (
            <div className="self-start rounded-card bg-white px-4 py-2 text-sm text-gray-400 shadow-sm">
              El orientador está escribiendo...
            </div>
          )}

          {error && <p className="text-center text-sm text-coral">{error.message}</p>}

          <div ref={finRef} />
        </div>

        <form onSubmit={handleEnviar} className="flex gap-2 border-t border-gray-200 bg-white p-3">
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escribe un mensaje..."
            disabled={isPending}
            className="flex-1 rounded-pill border border-gray-200 px-4 py-2 outline-none focus:border-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isPending || !texto.trim()}
            className="rounded-pill bg-primary px-5 py-2 font-semibold text-white disabled:opacity-50"
          >
            Enviar
          </button>
        </form>
      </main>
    </div>
  )
}
