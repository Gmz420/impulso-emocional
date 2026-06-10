import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../services/comunidad.service'

export function usePosts(seccion?: 'foro' | 'grupo' | 'evento') {
  return useQuery({
    queryKey: ['posts', seccion ?? 'todos'],
    queryFn: () => getPosts(seccion),
  })
}
