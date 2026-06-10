import { useQuery } from '@tanstack/react-query'
import { getEventos } from '../services/comunidad.service'

export function useEventos() {
  return useQuery({
    queryKey: ['eventos'],
    queryFn: getEventos,
  })
}
