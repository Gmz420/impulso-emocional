import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'

export function RequireAuth() {
  const session = useAuthStore((s) => s.session)
  const loading = useAuthStore((s) => s.loading)

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-lavanda text-gray-400">
        Cargando...
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/bienvenida" replace />
  }

  return <Outlet />
}
