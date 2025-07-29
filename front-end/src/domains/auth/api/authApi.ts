import api from '@/lib/api'
import type { User, CreateUserDto, LoginUserDto, LoginResponse } from '@/types/server'

// 회원가입
export const registerUser = async (userData: CreateUserDto): Promise<User> => {
  const response = await api.post<User>('auth/register', userData)
  if (response.status !== 201) {
    throw new Error('Failed to register user')
  }
  return response.data
}

// 로그인
export const loginUser = async (loginData: LoginUserDto): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('auth/login', loginData)
  if (response.status !== 200) {
    throw new Error('Failed to login')
  }
  return response.data
}

// 리프레시 토큰으로 새 액세스 토큰 발급
export const refreshAccessToken = async (
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await api.post('auth/refresh', { refreshToken })
  return response.data
}
