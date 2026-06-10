export interface Perfil {
  id: string
  nombre: string | null
  pseudonimo: string
  avatar_url: string | null
  badge_motivacional: string | null
  racha_actual: number
  racha_max: number
  ultima_actividad: string | null
  created_at: string
}
