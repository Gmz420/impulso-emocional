import { useQuery } from '@tanstack/react-query'
import { getEmociones } from '../services/diario.service'

export function useEmociones() {
  return useQuery({
    queryKey: ['emociones'],
    queryFn: getEmociones,
  })
}
