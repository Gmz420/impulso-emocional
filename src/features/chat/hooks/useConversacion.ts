import { useQuery } from '@tanstack/react-query'
import { getOrCrearConversacion } from '../services/chat.service'

export function useConversacion(usuarioId?: string) {
  return useQuery({
    queryKey: ['conversacion', usuarioId],
    queryFn: () => getOrCrearConversacion(usuarioId!),
    enabled: !!usuarioId,
  })
}
