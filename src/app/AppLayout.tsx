import { Outlet } from 'react-router-dom'
import { BottomTabBar } from '../components/BottomTabBar'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-lavanda pb-16">
      <Outlet />
      <BottomTabBar />
    </div>
  )
}
