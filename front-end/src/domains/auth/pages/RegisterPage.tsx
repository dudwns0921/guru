import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { RegisterForm } from '../components/RegisterForm'
import { Card, CardContent } from '@/shared/components/ui/card'
import type { User } from '@/domains/user/types/user'

export function RegisterPage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')

  const handleRegisterSuccess = (userData: User) => {
    setError('')
    console.log('Registration successful:', userData)
    alert(`회원가입이 완료되었습니다, ${userData.name}님! 로그인해주세요.`)
    // 회원가입 성공 후 로그인 페이지로 이동
    navigate('/auth/login')
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        {/* 제목 영역 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-main">회원가입</h1>
          <p className="text-sub">새 계정을 만들어 시작하세요</p>
        </div>

        {/* 회원가입 카드 */}
        <Card className="shadow-card border border-border">
          <CardContent className="p-6">
            <RegisterForm onSuccess={handleRegisterSuccess} onError={handleError} error={error} />

            {/* 로그인 링크 */}
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-sub">
                이미 계정이 있으신가요?{' '}
                <Link to="/auth/login" className="text-brand-600 hover:text-brand-700 font-medium">
                  로그인하기
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
