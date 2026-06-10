import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/useAuthStore'
import { useConversacion } from './hooks/useConversacion'
import { useMensajes } from './hooks/useMensajes'
import { useEnviarMensaje } from './hooks/useEnviarMensaje'

const MENSAJE_BIENVENIDA =
  'Hola, soy tu orientador 💜 Este es un espacio privado solo para ti. ' +
  'Cuéntame, ¿cómo te sientes hoy?'

function formatHora(fecha: Date): string {
  return fecha.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })
}

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
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xl">
            🧑‍⚕️
          </span>
          <div className="flex flex-col">
            <h1 className="font-semibold text-primary">Tu orientador</h1>
            <span className="text-xs text-gray-400">Aquí para escucharte</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
          {!mensajes?.length && (
            <div className="flex max-w-[80%] items-end gap-2 self-start">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base">
                🧑‍⚕️
              </span>
              <div className="flex flex-col gap-1 rounded-card bg-white px-4 py-2 text-gray-700 shadow-sm">
                <p>{MENSAJE_BIENVENIDA}</p>
                <span className="text-[10px] text-gray-400">{formatHora(new Date())}</span>
              </div>
            </div>
          )}

          {mensajes?.map((mensaje) => {
            const esUsuario = mensaje.emisor === 'usuario'
            return (
              <div
                key={mensaje.id}
                className={`flex max-w-[80%] items-end gap-2 ${
                  esUsuario ? 'flex-row-reverse self-end' : 'self-start'
                }`}
              >
                {!esUsuario && (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base">
                    🧑‍⚕️
                  </span>
                )}
                <div
                  className={`flex flex-col gap-1 rounded-card px-4 py-2 ${
                    esUsuario ? 'bg-primary text-white' : 'bg-white text-gray-700 shadow-sm'
                  }`}
                >
                  <p>{mensaje.contenido}</p>
                  <span className={`text-[10px] ${esUsuario ? 'text-white/70' : 'text-gray-400'}`}>
                    {formatHora(new Date(mensaje.created_at))}
                  </span>
                </div>
              </div>
            )
          })}

          {isPending && (
            <div className="flex items-end gap-2 self-start">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base">
                🧑‍⚕️
              </span>
              <div className="flex items-center gap-1 rounded-card bg-white px-4 py-3 shadow-sm">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-300" />
              </div>
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
            placeholder="Cuéntame qué tienes en mente..."
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
