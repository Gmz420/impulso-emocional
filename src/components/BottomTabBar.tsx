import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Inicio', icon: '🏠' },
  { to: '/herramientas', label: 'Herramientas', icon: '🧰' },
  { to: '/diario', label: 'Diario', icon: '📔' },
  { to: '/comunidad', label: 'Comunidad', icon: '👥' },
  { to: '/perfil', label: 'Perfil', icon: '🙂' },
]

export function BottomTabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around border-t border-gray-200 bg-white py-2">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${isActive ? 'font-semibold text-primary' : 'text-gray-400'}`
          }
        >
          <span className="text-xl">{tab.icon}</span>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
