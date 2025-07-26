import { Outlet } from 'react-router-dom'
import Header from './Header'

function Layout() {
  return (
    <div className="h-screen bg-background grid grid-rows-[max-content_1fr]">
      <Header />
      <main className="overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
