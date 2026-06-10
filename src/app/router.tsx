import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import { HomePage } from '../features/home/HomePage'
import { HerramientasPage } from '../features/herramientas/HerramientasPage'
import { DiarioPage } from '../features/diario/DiarioPage'
import { ComunidadPage } from '../features/comunidad/ComunidadPage'
import { PerfilPage } from '../features/perfil/PerfilPage'

export const router = createBrowserRouter([
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
])
