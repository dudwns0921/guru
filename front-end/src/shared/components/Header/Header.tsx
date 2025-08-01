import { useDarkMode } from '@/shared/hooks/useDarkMode'
import DesktopHeader from './DesktopHeader'
import { useNavigate } from 'react-router-dom'
import { useIsMobile } from '@/shared/hooks/useMobile'
import { useAuth } from '@/domains/auth/hooks/useAuth'
import MobileHeader from './MobileHeader'

function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const handleLogout = () => {
    logout()
    navigate('/auth/login')
  }

  if (isMobile) {
    return (
      <MobileHeader
        onLogout={handleLogout}
        onToggleDark={toggleDarkMode}
        isDarkMode={isDarkMode}
        user={user}
        isAuthenticated={isAuthenticated}
      />
    )
  }
  return (
    <DesktopHeader
      onLogout={handleLogout}
      onToggleDark={toggleDarkMode}
      isDarkMode={isDarkMode}
      user={user}
      isAuthenticated={isAuthenticated}
    />
  )
}

export default Header
