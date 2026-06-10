import { useQuery } from '@tanstack/react-query'
import { getMensajes } from '../services/chat.service'

export function useMensajes(conversacionId?: string) {
  return useQuery({
    queryKey: ['mensajes', conversacionId],
    queryFn: () => getMensajes(conversacionId!),
    enabled: !!conversacionId,
  })
}
