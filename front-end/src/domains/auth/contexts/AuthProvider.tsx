import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { getAccessToken, hasValidAccessToken, clearTokens, decodeToken } from '@/utils/tokens'
import type { User } from '@/domains/user/types/user'
import { AuthContext } from './AuthContext'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  // 앱 시작 시 토큰으로부터 사용자 정보 복구
  useEffect(() => {
    const initializeAuth = () => {
      try {
        if (hasValidAccessToken()) {
          const token = getAccessToken()
          if (token) {
            // JwtPayload 타입 확장
            interface ExtendedJwtPayload {
              sub: string | number
              email: string
              name: string
              createdAt: string
            }

            const decoded = decodeToken(token) as ExtendedJwtPayload | null
            if (decoded) {
              setUser({
                id: typeof decoded.sub === 'string' ? parseInt(decoded.sub, 10) : decoded.sub,
                email: decoded.email,
                name: decoded.name,
                createdAt: decoded.createdAt,
              })
            }
          }
        }
      } catch (error) {
        console.error('토큰 복구 실패:', error)
        clearTokens()
      }
    }

    initializeAuth()
  }, [])

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = async () => {
    clearTokens()
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
