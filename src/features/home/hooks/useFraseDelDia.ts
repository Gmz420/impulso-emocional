import { useQuery } from '@tanstack/react-query'
import { getFraseDelDia } from '../services/home.service'

export function useFraseDelDia() {
  return useQuery({
    queryKey: ['fraseDelDia'],
    queryFn: getFraseDelDia,
  })
}
