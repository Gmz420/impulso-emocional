import { supabase } from '../../../lib/supabase'
import type { EntradaDiario } from '../../../types/entradaDiario'
import type { Emocion } from '../../../types/emocion'

export async function getEmociones(): Promise<Emocion[]> {
  const { data, error } = await supabase
    .from('emocion')
    .select('*')
    .eq('es_predefinida', true)
    .order('nombre')
  if (error) throw error
  return data
}

export interface EntradaConEmociones {
  entrada: EntradaDiario | null
  emocionIds: string[]
}

export async function getEntrada(userId: string, fecha: string): Promise<EntradaConEmociones> {
  const { data: entrada, error } = await supabase
    .from('entrada_diario')
    .select('*')
    .eq('usuario_id', userId)
    .eq('fecha', fecha)
    .maybeSingle()
  if (error) throw error
  if (!entrada) return { entrada: null, emocionIds: [] }

  const { data: relaciones, error: errorRelaciones } = await supabase
    .from('entrada_diario_emocion')
    .select('emocion_id')
    .eq('entrada_id', entrada.id)
  if (errorRelaciones) throw errorRelaciones

  return { entrada, emocionIds: relaciones.map((r) => r.emocion_id) }
}

export async function guardarEntrada(
  userId: string,
  fecha: string,
  textoDia: string,
  textoGratitud: string,
  emocionIds: string[],
): Promise<EntradaDiario> {
  const { data: entrada, error } = await supabase
    .from('entrada_diario')
    .upsert(
      {
        usuario_id: userId,
        fecha,
        texto_dia: textoDia,
        texto_gratitud: textoGratitud,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'usuario_id,fecha' },
    )
    .select()
    .single()
  if (error) throw error

  const { error: errorBorrar } = await supabase
    .from('entrada_diario_emocion')
    .delete()
    .eq('entrada_id', entrada.id)
  if (errorBorrar) throw errorBorrar

  if (emocionIds.length > 0) {
    const filas = emocionIds.map((emocion_id) => ({ entrada_id: entrada.id, emocion_id }))
    const { error: errorInsertar } = await supabase.from('entrada_diario_emocion').insert(filas)
    if (errorInsertar) throw errorInsertar
  }

  return entrada
}
