import { useEffect, useState } from 'react'
import { useAuthStore } from '../../stores/useAuthStore'
import { useEmociones } from './hooks/useEmociones'
import { useEntrada } from './hooks/useEntrada'
import { useGuardarEntrada } from './hooks/useGuardarEntrada'

const NOMBRES_DIA = ['D', 'L', 'M', 'M', 'J', 'V', 'S']

function fechaISO(fecha: Date): string {
  return fecha.toISOString().slice(0, 10)
}

function ultimos7Dias(): Date[] {
  const dias: Date[] = []
  for (let i = 6; i >= 0; i--) {
    const dia = new Date()
    dia.setDate(dia.getDate() - i)
    dias.push(dia)
  }
  return dias
}

export function DiarioPage() {
  const session = useAuthStore((s) => s.session)
  const userId = session?.user.id

  const dias = ultimos7Dias()
  const [fecha, setFecha] = useState(fechaISO(new Date()))

  const { data: emociones } = useEmociones()
  const { data, isLoading } = useEntrada(userId, fecha)
  const { mutate: guardar, isPending } = useGuardarEntrada(userId, fecha)

  const [textoDia, setTextoDia] = useState('')
  const [textoGratitud, setTextoGratitud] = useState('')
  const [emocionesSel, setEmocionesSel] = useState<string[]>([])
  const [guardado, setGuardado] = useState(false)

  useEffect(() => {
    setTextoDia(data?.entrada?.texto_dia ?? '')
    setTextoGratitud(data?.entrada?.texto_gratitud ?? '')
    setEmocionesSel(data?.emocionIds ?? [])
    setGuardado(false)
  }, [data])

  function toggleEmocion(id: string) {
    setEmocionesSel((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]))
    setGuardado(false)
  }

  function handleGuardar() {
    guardar(
      { textoDia, textoGratitud, emocionIds: emocionesSel },
      { onSuccess: () => setGuardado(true) },
    )
  }

  return (
    <main className="flex flex-col gap-5 p-6 pt-12 pb-24">
      <h1 className="text-2xl font-semibold text-primary">Diario</h1>

      <div className="flex justify-between">
        {dias.map((dia) => {
          const iso = fechaISO(dia)
          const seleccionado = iso === fecha
          return (
            <button
              key={iso}
              type="button"
              onClick={() => setFecha(iso)}
              className={`flex flex-col items-center gap-1 rounded-card px-2 py-2 ${
                seleccionado ? 'bg-primary text-white' : 'bg-white text-gray-500'
              }`}
            >
              <span className="text-xs">{NOMBRES_DIA[dia.getDay()]}</span>
              <span className="font-semibold">{dia.getDate()}</span>
            </button>
          )
        })}
      </div>

      {isLoading ? (
        <p className="text-center text-gray-400">Cargando...</p>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-primary">¿Cómo fue tu día?</label>
            <textarea
              value={textoDia}
              onChange={(e) => {
                setTextoDia(e.target.value)
                setGuardado(false)
              }}
              maxLength={500}
              rows={4}
              placeholder="Cuéntanos cómo te fue..."
              className="rounded-card border border-gray-200 p-3 outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-primary">¿Qué emociones sentiste?</label>
            <div className="flex flex-wrap gap-2">
              {emociones?.map((emocion) => {
                const activo = emocionesSel.includes(emocion.id)
                return (
                  <button
                    key={emocion.id}
                    type="button"
                    onClick={() => toggleEmocion(emocion.id)}
                    className={`rounded-pill border px-3 py-1 text-sm ${
                      activo ? 'border-primary bg-primary text-white' : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    {emocion.nombre}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-primary">¿Qué agradeces hoy?</label>
            <textarea
              value={textoGratitud}
              onChange={(e) => {
                setTextoGratitud(e.target.value)
                setGuardado(false)
              }}
              rows={2}
              placeholder="Algo bueno de hoy..."
              className="rounded-card border border-gray-200 p-3 outline-none focus:border-primary"
            />
          </div>

          <button
            type="button"
            onClick={handleGuardar}
            disabled={isPending}
            className="rounded-pill bg-primary px-4 py-3 font-semibold text-white disabled:opacity-50"
          >
            {isPending ? 'Guardando...' : 'Guardar'}
          </button>

          {guardado && <p className="text-center text-sm text-menta">Entrada guardada ✓</p>}
        </>
      )}
    </main>
  )
}
