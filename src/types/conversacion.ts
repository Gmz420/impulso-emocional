export interface Conversacion {
  id: string
  usuario_id: string
  estado: 'activa' | 'cerrada' | 'escalada'
  created_at: string
}
