import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { loginUser } from '../api/authApi'
import type { User, LoginUserDto } from '@/domains/user/types/user'
import { setTokens } from '@/utils/tokens'

interface LoginFormProps {
  onSuccess?: (user: User) => void
  onError?: (error: string) => void
  error?: string
}

export function LoginForm({ onSuccess, onError, error }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginUserDto>({
    email: '',
    password: '',
  })

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: response => {
      console.log('Login response:', response)
      if (response.user && response.accessToken) {
        // JWT 토큰 저장
        setTokens(response.accessToken, response.refreshToken)
        onSuccess?.(response.user)
      } else {
        onError?.(response.message || '로그인에 실패했습니다.')
      }
    },
    onError: (error: any) => {
      console.log('Login error:', error)

      let errorMessage = '로그인에 실패했습니다.'

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error?.message) {
        errorMessage = error.message
      }

      onError?.(errorMessage)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginMutation.mutate(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="example@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* 에러 메시지 */}
      {error && <div className="text-error text-sm">{error}</div>}

      <Button
        type="submit"
        className="w-full bg-brand-600 hover:bg-brand-700 text-white"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  )
}
