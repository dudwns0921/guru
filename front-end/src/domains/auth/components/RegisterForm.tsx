import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { registerUser } from '../api/authApi'
import { registerSchema, type RegisterFormValues } from '../schemas/authSchemas'
import type { User } from '@/types/server'

interface RegisterFormProps {
  onSuccess?: (user: User) => void
  onError?: (error: string) => void
  error?: string
}

export function RegisterForm({ onSuccess, onError, error }: RegisterFormProps) {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  })

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: user => {
      onSuccess?.(user)
    },
    onError: error => {
      onError?.(error instanceof Error ? error.message : '회원가입에 실패했습니다.')
    },
  })

  const onSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input type="text" placeholder="이름을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="비밀번호를 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
    </Form>
  )
}
