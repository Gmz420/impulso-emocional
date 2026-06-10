import { supabase } from '../../../lib/supabase'
import type { Perfil } from '../../../types/perfil'

export async function getPerfil(userId: string): Promise<Perfil> {
  const { data, error } = await supabase
    .from('perfiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) throw error
  return data
}
