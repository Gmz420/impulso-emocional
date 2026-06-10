import { useQuery } from '@tanstack/react-query'
import { getRegistroHoy } from '../services/home.service'

export function useRegistroHoy(userId: string | undefined) {
  return useQuery({
    queryKey: ['registroHoy', userId],
    queryFn: () => getRegistroHoy(userId!),
    enabled: !!userId,
  })
}
