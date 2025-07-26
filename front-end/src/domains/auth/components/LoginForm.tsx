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
import { loginUser } from '../api/authApi'
import { loginSchema, type LoginFormValues } from '../schemas/authSchemas'
import type { User } from '@/types/server'

interface LoginFormProps {
  onSuccess?: (user: User) => void
  onError?: (error: string) => void
  error?: string
}

export function LoginForm({ onSuccess, onError, error }: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: response => {
      if (response.user) {
        onSuccess?.(response.user)
      } else {
        onError?.(response.message || '로그인에 실패했습니다.')
      }
    },
    onError: error => {
      onError?.(error instanceof Error ? error.message : '로그인에 실패했습니다.')
    },
  })

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values)
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
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </Form>
  )
}
