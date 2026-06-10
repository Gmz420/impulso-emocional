import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../services/auth.service'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3">
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="rounded-card border border-gray-200 px-4 py-3 outline-none focus:border-primary"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        className="rounded-card border border-gray-200 px-4 py-3 outline-none focus:border-primary"
      />
      {error && <p className="text-sm text-coral">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-pill bg-primary px-4 py-3 font-semibold text-white disabled:opacity-50"
      >
        {loading ? 'Ingresando...' : 'Iniciar sesión'}
      </button>
    </form>
  )
}
