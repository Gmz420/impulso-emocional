import { useQuery } from '@tanstack/react-query'
import { getPerfil } from '../services/perfil.service'

export function usePerfil(userId: string | undefined) {
  return useQuery({
    queryKey: ['perfil', userId],
    queryFn: () => getPerfil(userId!),
    enabled: !!userId,
  })
}
