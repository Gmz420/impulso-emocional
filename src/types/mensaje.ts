export interface Mensaje {
  id: string
  conversacion_id: string
  emisor: 'usuario' | 'orientador'
  contenido: string
  riesgo_detectado: boolean
  created_at: string
}
