import { useQuery } from '@tanstack/react-query'
import { getRecursosPorCategoria } from '../services/herramientas.service'

export function useRecursos(categoriaId: string | null) {
  return useQuery({
    queryKey: ['recursos', categoriaId],
    queryFn: () => getRecursosPorCategoria(categoriaId!),
    enabled: !!categoriaId,
  })
}
