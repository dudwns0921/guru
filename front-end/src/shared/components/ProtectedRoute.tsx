import { useAuth } from '@/domains/auth/hooks/useAuth'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    alert('로그인이 필요한 서비스입니다.')
    return <Navigate to="/auth/login" replace />
  }
  return <>{children}</>
}

export default ProtectedRoute
