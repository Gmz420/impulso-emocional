import { supabase } from '../../../lib/supabase'
import type { RegistroEmocional } from '../../../types/registroEmocional'
import type { Frase } from '../../../types/frase'

function hoy(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function getRegistroHoy(userId: string): Promise<RegistroEmocional | null> {
  const { data, error } = await supabase
    .from('registro_emocional')
    .select('*')
    .eq('usuario_id', userId)
    .eq('fecha', hoy())
    .maybeSingle()
  if (error) throw error
  return data
}

export async function guardarRegistro(userId: string, valor: number): Promise<RegistroEmocional> {
  const { data, error } = await supabase
    .from('registro_emocional')
    .upsert({ usuario_id: userId, fecha: hoy(), valor }, { onConflict: 'usuario_id,fecha' })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getFraseDelDia(): Promise<Frase | null> {
  const { data, error } = await supabase.from('frase').select('*').eq('activa', true)
  if (error) throw error
  if (!data || data.length === 0) return null

  const dia = new Date().getDate()
  return data[dia % data.length]
}
