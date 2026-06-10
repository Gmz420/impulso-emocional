const LINEAS_AYUDA = [
  { nombre: 'Salud Responde (MINSAL)', contacto: '600 360 7777' },
  { nombre: 'Línea Prevención del Suicidio', contacto: '*4141' },
  { nombre: 'Fono Infancia', contacto: '800 200 818' },
  { nombre: 'Emergencias (SAMU)', contacto: '131' },
]

export function RecursosAyuda() {
  return (
    <div className="rounded-card bg-white p-4 shadow-sm">
      <h2 className="font-semibold text-primary">Líneas de ayuda</h2>
      <ul className="mt-2 flex flex-col gap-2 text-sm text-gray-600">
        {LINEAS_AYUDA.map((linea) => (
          <li key={linea.nombre} className="flex items-center justify-between">
            <span>{linea.nombre}</span>
            <span className="font-semibold text-primary">{linea.contacto}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
