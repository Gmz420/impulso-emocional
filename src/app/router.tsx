import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import { RequireAuth } from '../components/RequireAuth'
import { BienvenidaPage } from '../features/auth/BienvenidaPage'
import { LoginPage } from '../features/auth/LoginPage'
import { RegisterPage } from '../features/auth/RegisterPage'
import { HomePage } from '../features/home/HomePage'
import { HerramientasPage } from '../features/herramientas/HerramientasPage'
import { DiarioPage } from '../features/diario/DiarioPage'
import { ComunidadPage } from '../features/comunidad/ComunidadPage'
import { PerfilPage } from '../features/perfil/PerfilPage'

export const router = createBrowserRouter([
  { path: '/bienvenida', element: <BienvenidaPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/registro', element: <RegisterPage /> },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/herramientas', element: <HerramientasPage /> },
          { path: '/diario', element: <DiarioPage /> },
          { path: '/comunidad', element: <ComunidadPage /> },
          { path: '/perfil', element: <PerfilPage /> },
        ],
      },
    ],
  },
])
