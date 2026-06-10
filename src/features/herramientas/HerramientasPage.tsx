import { useState } from 'react'
import { useCategorias } from './hooks/useCategorias'
import { useRecursos } from './hooks/useRecursos'

const COLOR_CLASSES: Record<string, string> = {
  celeste: 'bg-celeste/20 text-celeste',
  menta: 'bg-menta/20 text-menta',
  amarillo: 'bg-amarillo/20 text-amarillo',
  coral: 'bg-coral/20 text-coral',
  primary: 'bg-primary/20 text-primary',
}

export function HerramientasPage() {
  const { data: categorias, isLoading } = useCategorias()
  const [categoriaAbierta, setCategoriaAbierta] = useState<string | null>(null)
  const { data: recursos } = useRecursos(categoriaAbierta)

  return (
    <main className="flex flex-col gap-4 p-6 pt-12">
      <div>
        <h1 className="text-2xl font-semibold text-primary">Herramientas</h1>
        <p className="text-gray-500">Recursos para ayudarte en tu día a día</p>
      </div>

      {isLoading && <p className="text-gray-400">Cargando categorías...</p>}

      <div className="flex flex-col gap-3">
        {categorias?.map((categoria) => {
          const abierta = categoriaAbierta === categoria.id
          const colorClase = COLOR_CLASSES[categoria.color ?? ''] ?? 'bg-lavanda text-primary'

          return (
            <div key={categoria.id} className="rounded-card bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setCategoriaAbierta(abierta ? null : categoria.id)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-full text-xl ${colorClase}`}>
                  {categoria.icono ?? '✨'}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-primary">{categoria.nombre}</span>
                  {categoria.descripcion && (
                    <span className="block text-sm text-gray-500">{categoria.descripcion}</span>
                  )}
                </span>
                <span className="text-gray-400">{abierta ? '▲' : '▼'}</span>
              </button>

              {abierta && (
                <div className="flex flex-col gap-2 border-t border-lavanda p-4 pt-3">
                  {recursos?.length ? (
                    recursos.map((recurso) => (
                      <div key={recurso.id} className="rounded-card bg-lavanda p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{recurso.icono ?? '📄'}</span>
                          <span className="font-medium text-primary">{recurso.titulo}</span>
                          {recurso.duracion_min && (
                            <span className="ml-auto text-xs text-gray-500">{recurso.duracion_min} min</span>
                          )}
                        </div>
                        {recurso.descripcion && (
                          <p className="mt-1 text-sm text-gray-600">{recurso.descripcion}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">Cargando recursos...</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </main>
  )
}
