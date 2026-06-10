import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../services/auth.service'

export function RegisterForm() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setLoading(true)
    try {
      const data = await signUp(email, password, nombre)
      if (data.session) {
        navigate('/')
      } else {
        setInfo('Cuenta creada. Revisa tu correo para confirmarla antes de iniciar sesión.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3">
      <input
        type="text"
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="rounded-card border border-gray-200 px-4 py-3 outline-none focus:border-primary"
      />
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
        placeholder="Contraseña (mínimo 6 caracteres)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        className="rounded-card border border-gray-200 px-4 py-3 outline-none focus:border-primary"
      />
      {error && <p className="text-sm text-coral">{error}</p>}
      {info && <p className="text-sm text-menta">{info}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-pill bg-primary px-4 py-3 font-semibold text-white disabled:opacity-50"
      >
        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>
    </form>
  )
}
