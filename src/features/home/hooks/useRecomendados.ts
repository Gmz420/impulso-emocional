import { useQuery } from '@tanstack/react-query'
import { getRecomendados } from '../../herramientas/services/herramientas.service'

export function useRecomendados(limite = 2) {
  return useQuery({
    queryKey: ['recomendados', limite],
    queryFn: () => getRecomendados(limite),
  })
}
