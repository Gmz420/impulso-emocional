import { useQuery } from '@tanstack/react-query'
import { getEntrada } from '../services/diario.service'

export function useEntrada(userId: string | undefined, fecha: string) {
  return useQuery({
    queryKey: ['entradaDiario', userId, fecha],
    queryFn: () => getEntrada(userId!, fecha),
    enabled: !!userId,
  })
}
