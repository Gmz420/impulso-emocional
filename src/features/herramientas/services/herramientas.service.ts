import { supabase } from '../../../lib/supabase'
import type { CategoriaRecurso } from '../../../types/categoriaRecurso'
import type { Recurso } from '../../../types/recurso'

export async function getCategorias(): Promise<CategoriaRecurso[]> {
  const { data, error } = await supabase.from('categoria_recurso').select('*').order('orden')
  if (error) throw error
  return data
}

export async function getRecursosPorCategoria(categoriaId: string): Promise<Recurso[]> {
  const { data, error } = await supabase
    .from('recurso')
    .select('*')
    .eq('categoria_id', categoriaId)
    .order('orden')
  if (error) throw error
  return data
}

export async function getRecomendados(limite: number): Promise<Recurso[]> {
  const { data, error } = await supabase.from('recurso').select('*').order('orden').limit(limite)
  if (error) throw error
  return data
}
