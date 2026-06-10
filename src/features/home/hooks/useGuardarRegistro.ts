import { useMutation, useQueryClient } from '@tanstack/react-query'
import { guardarRegistro } from '../services/home.service'

export function useGuardarRegistro(userId: string | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (valor: number) => guardarRegistro(userId!, valor),
    onSuccess: (data) => {
      queryClient.setQueryData(['registroHoy', userId], data)
    },
  })
}
