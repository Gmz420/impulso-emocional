import { useAuthStore } from '../../stores/useAuthStore'
import { signOut } from '../auth/services/auth.service'
import { usePerfil } from './hooks/usePerfil'

export function PerfilPage() {
  const session = useAuthStore((s) => s.session)
  const { data: perfil, isLoading } = usePerfil(session?.user.id)

  return (
    <main className="flex flex-col items-center gap-4 p-6 pt-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl text-white">
        {perfil?.nombre?.[0]?.toUpperCase() ?? '🙂'}
      </div>
      <h1 className="text-2xl font-semibold text-primary">{perfil?.nombre ?? 'Tu perfil'}</h1>
      <p className="text-gray-500">@{perfil?.pseudonimo ?? '...'}</p>

      {isLoading && <p className="text-gray-400">Cargando perfil...</p>}

      {perfil?.badge_motivacional && (
        <div className="rounded-pill bg-lavanda px-4 py-2 text-sm font-medium text-primary">
          {perfil.badge_motivacional}
        </div>
      )}

      <div className="flex gap-4">
        <div className="rounded-card bg-white px-6 py-4 shadow-sm">
          <p className="text-2xl font-bold text-primary">{perfil?.racha_actual ?? 0}</p>
          <p className="text-xs text-gray-500">Racha actual</p>
        </div>
        <div className="rounded-card bg-white px-6 py-4 shadow-sm">
          <p className="text-2xl font-bold text-primary">{perfil?.racha_max ?? 0}</p>
          <p className="text-xs text-gray-500">Mejor racha</p>
        </div>
      </div>

      <button
        onClick={() => signOut()}
        className="mt-4 rounded-pill border border-coral px-6 py-2 font-semibold text-coral"
      >
        Cerrar sesión
      </button>
    </main>
  )
}
