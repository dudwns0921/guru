import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { registerUser } from '../api/authApi'
import type { User, CreateUserDto } from '@/domains/user/types/user'

interface RegisterFormProps {
  onSuccess?: (user: User) => void
  onError?: (error: string) => void
  error?: string
}

export function RegisterForm({ onSuccess, onError, error }: RegisterFormProps) {
  const [formData, setFormData] = useState<CreateUserDto>({
    email: '',
    name: '',
    password: '',
  })

  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: user => {
      onSuccess?.(user)
    },
    onError: (error: any) => {
      console.log('Register error:', error)

      let errorMessage = '회원가입에 실패했습니다.'

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
    registerMutation.mutate(formData)
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
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="이름을 입력하세요"
          value={formData.name}
          onChange={handleChange}
          required
          minLength={2}
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
          minLength={6}
        />
      </div>

      {/* 에러 메시지 */}
      {error && <div className="text-error text-sm">{error}</div>}

      <Button
        type="submit"
        className="w-full bg-brand-600 hover:bg-brand-700 text-white"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? '가입 중...' : '회원가입'}
      </Button>
    </form>
  )
}
