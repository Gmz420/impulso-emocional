import type { Mensaje } from '../types/mensaje'

const MODELO = 'gemini-2.5-flash'

const SYSTEM_PROMPT =
  'Eres un orientador escolar empático y cálido de la app Impulso Emocional. ' +
  'Acompañas a estudiantes con su bienestar emocional. Hablas cercano, sin tecnicismos, ' +
  'validando lo que sienten. No diagnosticas ni das tratamiento clínico. ' +
  'Si detectas señales serias (autolesión, querer hacerse daño, crisis), respondes con calma, ' +
  'animas a la persona a hablar con un adulto de confianza o un profesional, ' +
  'y le recuerdas que existen líneas de ayuda. Nunca minimizas lo que cuenta.'

export async function preguntarOrientador(historial: Mensaje[]): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    console.error('Gemini: falta VITE_GEMINI_API_KEY (no está configurada en este entorno).')
    throw new Error('No se pudo contactar al orientador. Intenta de nuevo en un momento.')
  }

  const contents = historial.map((mensaje) => ({
    role: mensaje.emisor === 'usuario' ? 'user' : 'model',
    parts: [{ text: mensaje.contenido }],
  }))

  const respuesta = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
      }),
    },
  )

  if (!respuesta.ok) {
    const cuerpoError = await respuesta.json().catch(() => null)
    console.error('Gemini respondió con error:', respuesta.status, cuerpoError ?? respuesta.statusText)
    throw new Error('No se pudo contactar al orientador. Intenta de nuevo en un momento.')
  }

  const data = await respuesta.json()
  const texto = data.candidates?.[0]?.content?.parts?.[0]?.text

  return texto ?? 'Lo siento, no supe qué responder. ¿Puedes contarme un poco más?'
}
