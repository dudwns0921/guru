import axios from 'axios'
import type { User, CreateUserDto, LoginUserDto, LoginResponse } from '@/types/server'
import { getServerUrl } from '@/utils/server'

// 회원가입
export const registerUser = async (userData: CreateUserDto): Promise<User> => {
  const response = await axios.post<User>(getServerUrl() + 'users', userData)
  if (response.status !== 201) {
    throw new Error('Failed to register user')
  }
  return response.data
}

// 로그인
export const loginUser = async (loginData: LoginUserDto): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(getServerUrl() + 'users/login', loginData)
  if (response.status !== 200) {
    throw new Error('Failed to login')
  }
  return response.data
}
