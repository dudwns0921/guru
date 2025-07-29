import { Link, useNavigate } from 'react-router-dom'
import { Sun, Moon, LogOut, User } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'
import { useAuth } from '@/domains/auth/hooks/useAuth'

function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/auth/login')
  }

  return (
    <header className="shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-main">
              Guru.
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-main transition-colors hover:bg-muted"
              aria-label="다크 모드 토글"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              // 로그인된 상태
              <>
                <span className="text-sm font-medium text-main">안녕하세요, {user?.name}님!</span>

                <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-main hover:text-brand-600 transition-colors">
                  <User className="w-4 h-4" />
                  <span>내 정보</span>
                </button>

                <button
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-main hover:text-brand-600 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  <span>로그아웃</span>
                </button>
              </>
            ) : (
              // 로그인되지 않은 상태
              <>
                <Link
                  to="/auth/login"
                  className="hover:text-brand-600 px-3 py-2 text-sm font-medium text-main"
                >
                  로그인
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
