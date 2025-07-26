import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { Card, CardContent } from '@/shared/components/ui/card'
import type { User } from '@/types/server'

export function LoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')

  const handleLoginSuccess = (userData: User) => {
    setError('')
    console.log('Login successful:', userData)
    alert(`로그인되었습니다, ${userData.name}님!`)
    // 로그인 성공 후 바로 홈페이지로 리디렉션
    navigate('/')
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        {/* 제목 영역 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-main">로그인</h1>
          <p className="text-sub">계정에 로그인하여 더 많은 기능을 이용하세요</p>
        </div>

        {/* 로그인 카드 */}
        <Card className="shadow-card border border-border">
          <CardContent className="p-6">
            <LoginForm onSuccess={handleLoginSuccess} onError={handleError} error={error} />

            {/* 회원가입 링크 */}
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-sub">
                계정이 없으신가요?{' '}
                <Link
                  to="/auth/register"
                  className="text-brand-600 hover:text-brand-700 font-medium"
                >
                  회원가입하기
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
