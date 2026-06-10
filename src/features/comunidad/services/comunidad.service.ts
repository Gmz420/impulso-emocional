import { supabase } from '../../../lib/supabase'
import type { Post } from '../../../types/post'
import type { GrupoApoyo } from '../../../types/grupoApoyo'
import type { Evento } from '../../../types/evento'

export async function getPosts(seccion?: 'foro' | 'grupo' | 'evento'): Promise<Post[]> {
  let query = supabase.from('post').select('*').order('created_at', { ascending: false })
  if (seccion) query = query.eq('seccion', seccion)
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getGruposApoyo(): Promise<GrupoApoyo[]> {
  const { data, error } = await supabase.from('grupo_apoyo').select('*').order('nombre')
  if (error) throw error
  return data
}

export async function getEventos(): Promise<Evento[]> {
  const { data, error } = await supabase.from('evento').select('*').order('fecha')
  if (error) throw error
  return data
}
