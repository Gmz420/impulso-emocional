import { Link } from 'react-router-dom'
import { RegisterForm } from './components/RegisterForm'

export function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-lavanda p-6 text-center">
      <h1 className="text-2xl font-semibold text-primary">Crear cuenta</h1>
      <RegisterForm />
      <p className="text-sm text-gray-500">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="font-semibold text-primary">
          Inicia sesión
        </Link>
      </p>
    </main>
  )
}
