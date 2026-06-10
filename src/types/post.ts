export interface Post {
  id: string
  autor_pseudonimo: string
  contenido: string
  seccion: 'foro' | 'grupo' | 'evento'
  grupo_id: string | null
  likes_count: number
  created_at: string
}
