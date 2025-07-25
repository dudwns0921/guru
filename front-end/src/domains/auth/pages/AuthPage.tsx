import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { RegisterForm } from '../components/RegisterForm'
import { Button } from '@/shared/components/ui/button'
import type { User } from '@/types/server'

export function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string>('')

  // URL 파라미터에서 모드 결정, 기본값은 login
  const mode = searchParams.get('mode') === 'register' ? 'register' : 'login'

  const handleSuccess = (userData: User) => {
    setUser(userData)
    setError('')
    console.log('Authentication successful:', userData)
    // 로그인 성공 후 홈페이지로 리디렉션
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
    setUser(null)
  }

  const toggleMode = () => {
    const newMode = mode === 'login' ? 'register' : 'login'
    setSearchParams({ mode: newMode })
    setError('')
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
              환영합니다, {user.name}님!
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {mode === 'register' ? '회원가입이' : '로그인이'} 완료되었습니다.
            </p>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              잠시 후 홈페이지로 이동합니다...
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <Button onClick={() => navigate('/')} className="w-full">
              홈페이지로 이동
            </Button>
            <Button
              onClick={() => {
                setUser(null)
                setSearchParams({ mode: 'login' })
              }}
              variant="outline"
              className="w-full"
            >
              다른 계정으로 로그인
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {error && (
          <div className="bg-destructive/15 border border-destructive/50 text-destructive px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {mode === 'login' ? (
          <LoginForm onSuccess={handleSuccess} onError={handleError} />
        ) : (
          <RegisterForm onSuccess={handleSuccess} onError={handleError} />
        )}

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {mode === 'login' ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
          </p>
          <Button variant="link" onClick={toggleMode} className="mt-2">
            {mode === 'login' ? '회원가입' : '로그인'}
          </Button>
        </div>
      </div>
    </div>
  )
}
