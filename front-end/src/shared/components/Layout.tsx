import { Outlet } from 'react-router-dom'
import Header from './Header/Header'

function Layout() {
  return (
    <div className="h-[100dvh] bg-background grid grid-rows-[auto_1fr]">
      <Header />
      <main className="overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
