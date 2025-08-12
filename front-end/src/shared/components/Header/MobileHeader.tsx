import type { User as UserType } from '@/domains/user/types/user'
import { LogIn, LogOut, Menu, Moon, Sun, User, UserPlus, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface MobileHeaderProps {
  onLogout: () => void
  onToggleDark: () => void
  isDarkMode: boolean
  user: UserType | null
  isAuthenticated: boolean
}

// 공통 메뉴 아이템 컴포넌트
function MenuItem({
  as = 'button',
  to,
  onClick,
  icon,
  children,
}: {
  as?: 'button' | 'link'
  to?: string
  onClick?: () => void
  icon: React.ReactNode
  children: React.ReactNode
}) {
  const className =
    'flex items-center gap-2 px-2 py-2 rounded text-main hover:text-brand-600 hover:bg-muted w-full'
  if (as === 'link' && to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {icon}
        <span>{children}</span>
      </Link>
    )
  }
  return (
    <button className={className} onClick={onClick}>
      {icon}
      <span>{children}</span>
    </button>
  )
}

function MobileHeader({
  onLogout,
  onToggleDark,
  isDarkMode,
  user,
  isAuthenticated,
}: MobileHeaderProps) {
  const [open, setOpen] = useState(false)
  return (
    <header className="shadow-sm border-b border-border relative z-20">
      <div className="flex justify-between items-center h-16 px-4">
        <Link to="/" className="text-2xl font-bold text-main">
          Guru.
        </Link>
        <button
          className="p-2 rounded-md text-main transition-colors hover:bg-muted"
          aria-label="메뉴 열기"
          onClick={() => setOpen(v => !v)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      {/* 사이드 메뉴 & 딤 처리 */}
      <div>
        {/* Dimmed background */}
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 z-30`}
          style={{
            opacity: open ? 0.15 : 0,
            pointerEvents: open ? 'auto' : 'none',
            transition: 'opacity 0.3s',
          }}
          onClick={() => setOpen(false)}
        />
        {/* Slide-in menu */}
        <nav
          className={`fixed top-0 right-0 h-full w-[70vw] max-w-xs bg-background shadow-lg z-40 border-l border-border transform transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col gap-5`}
        >
          {/* X 버튼 */}
          <button
            className="absolute top-4 right-4 rounded-md text-main transition-colors"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center h-16 text-lg font-bold text-main px-4">
            {isAuthenticated ? `${user?.name}님, 안녕하세요!` : '안녕하세요! 로그인해주세요'}
          </div>
          <ul className="flex flex-col gap-0 px-4">
            {isAuthenticated ? (
              <>
                <li>
                  <MenuItem
                    as="link"
                    to="/my"
                    onClick={() => setOpen(false)}
                    icon={<User className="w-4 h-4" />}
                  >
                    내 정보
                  </MenuItem>
                </li>
                <li>
                  <MenuItem
                    onClick={() => {
                      setOpen(false)
                      onLogout()
                    }}
                    icon={<LogOut className="w-4 h-4" />}
                  >
                    로그아웃
                  </MenuItem>
                </li>
              </>
            ) : (
              <>
                <li>
                  <MenuItem
                    as="link"
                    to="/auth/login"
                    onClick={() => setOpen(false)}
                    icon={<LogIn className="w-4 h-4" />}
                  >
                    로그인
                  </MenuItem>
                </li>
                <li>
                  <MenuItem
                    as="link"
                    to="/auth/register"
                    onClick={() => setOpen(false)}
                    icon={<UserPlus className="w-4 h-4" />}
                  >
                    회원가입
                  </MenuItem>
                </li>
              </>
            )}
            <li>
              <MenuItem
                onClick={onToggleDark}
                icon={isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              >
                {isDarkMode ? '라이트 모드' : '다크 모드'}
              </MenuItem>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default MobileHeader
