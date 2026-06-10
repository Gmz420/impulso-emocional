import { Link } from 'react-router-dom'

export function BienvenidaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-lavanda p-6 text-center">
      <h1 className="text-4xl font-bold text-primary">Impulso Emocional</h1>
      <p className="max-w-xs text-gray-500">
        Tu espacio para registrar cómo te sientes, escribir tu diario y encontrar apoyo.
      </p>
      <div className="flex w-full max-w-sm flex-col gap-3">
        <Link
          to="/login"
          className="rounded-pill bg-primary px-4 py-3 text-center font-semibold text-white"
        >
          Iniciar sesión
        </Link>
        <Link
          to="/registro"
          className="rounded-pill border border-primary px-4 py-3 text-center font-semibold text-primary"
        >
          Crear cuenta
        </Link>
      </div>
    </main>
  )
}
