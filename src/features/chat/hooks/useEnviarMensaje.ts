import { useMutation, useQueryClient } from '@tanstack/react-query'
import { enviarMensaje } from '../services/chat.service'

export function useEnviarMensaje(conversacionId?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (contenido: string) => enviarMensaje(conversacionId!, contenido),
    onSuccess: (mensajes) => {
      queryClient.setQueryData(['mensajes', conversacionId], mensajes)
    },
  })
}
