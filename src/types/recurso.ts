export interface Recurso {
  id: string
  categoria_id: string
  titulo: string
  descripcion: string | null
  tipo: string | null
  duracion_min: number | null
  contenido: string | null
  icono: string | null
  orden: number
}
