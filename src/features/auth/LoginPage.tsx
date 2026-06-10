import { Link } from 'react-router-dom'
import { LoginForm } from './components/LoginForm'

export function LoginPage() {
  return (
    <div className="min-h-screen bg-lavanda">
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-6 p-6 text-center">
        <h1 className="text-2xl font-semibold text-primary">Iniciar sesión</h1>
        <LoginForm />
        <p className="text-sm text-gray-500">
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="font-semibold text-primary">
            Crear cuenta
          </Link>
        </p>
      </main>
    </div>
  )
}
