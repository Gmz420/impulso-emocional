import { useQuery } from '@tanstack/react-query'
import { getGruposApoyo } from '../services/comunidad.service'

export function useGruposApoyo() {
  return useQuery({
    queryKey: ['gruposApoyo'],
    queryFn: getGruposApoyo,
  })
}
