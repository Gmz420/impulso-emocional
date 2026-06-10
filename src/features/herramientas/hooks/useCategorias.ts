import { useQuery } from '@tanstack/react-query'
import { getCategorias } from '../services/herramientas.service'

export function useCategorias() {
  return useQuery({
    queryKey: ['categoriasRecurso'],
    queryFn: getCategorias,
  })
}
