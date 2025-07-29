export type ServerResponseMap = {
  courses: Course[]
  'auth/login': LoginResponse
  'auth/register': User
  'courses/:id': CourseDetail
  'enrollment/check/:courseId': enrollmentCheckResponse
}

export interface Course {
  id: number
  title: string
  description?: string
  instructor: string
  price: number
  thumbnailUrl: string
  tags: string[]
  createdAt: string
}

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

export interface CourseDetail {
  id: number
  title: string
  description?: string
  instructor: string
  price: number
  thumbnailUrl: string
  tags: string[]
  createdAt: string
}

export interface EnrollmentCheckResponse {
  enrolled: boolean
}
