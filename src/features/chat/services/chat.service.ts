import { supabase } from '../../../lib/supabase'
import { preguntarOrientador } from '../../../lib/gemini'
import type { Conversacion } from '../../../types/conversacion'
import type { Mensaje } from '../../../types/mensaje'

export async function getOrCrearConversacion(usuarioId: string): Promise<Conversacion> {
  const { data: existente, error: errorBuscar } = await supabase
    .from('conversacion')
    .select('*')
    .eq('usuario_id', usuarioId)
    .eq('estado', 'activa')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (errorBuscar) throw errorBuscar
  if (existente) return existente

  const { data: nueva, error: errorCrear } = await supabase
    .from('conversacion')
    .insert({ usuario_id: usuarioId, estado: 'activa' })
    .select()
    .single()
  if (errorCrear) throw errorCrear
  return nueva
}

export async function getMensajes(conversacionId: string): Promise<Mensaje[]> {
  const { data, error } = await supabase
    .from('mensaje')
    .select('*')
    .eq('conversacion_id', conversacionId)
    .order('created_at')
  if (error) throw error
  return data
}

export async function enviarMensaje(conversacionId: string, contenido: string): Promise<Mensaje[]> {
  const { error: errorUsuario } = await supabase
    .from('mensaje')
    .insert({ conversacion_id: conversacionId, emisor: 'usuario', contenido })
  if (errorUsuario) throw errorUsuario

  const historial = await getMensajes(conversacionId)
  const respuesta = await preguntarOrientador(historial)

  const { error: errorOrientador } = await supabase
    .from('mensaje')
    .insert({ conversacion_id: conversacionId, emisor: 'orientador', contenido: respuesta })
  if (errorOrientador) throw errorOrientador

  return getMensajes(conversacionId)
}
