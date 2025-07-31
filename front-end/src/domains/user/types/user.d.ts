export interface User {
  id: number
  email: string
  name: string
  createdAt: string
}

export interface CreateUserDto {
  email: string
  name: string
  password: string
}

export interface LoginUserDto {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
  message?: string
}

export interface DeleteUserResponse {
  success: boolean
}
