import { useMutation, useQueryClient } from '@tanstack/react-query'
import { guardarEntrada } from '../services/diario.service'

interface DatosEntrada {
  textoDia: string
  textoGratitud: string
  emocionIds: string[]
}

export function useGuardarEntrada(userId: string | undefined, fecha: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ textoDia, textoGratitud, emocionIds }: DatosEntrada) =>
      guardarEntrada(userId!, fecha, textoDia, textoGratitud, emocionIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entradaDiario', userId, fecha] })
    },
  })
}
