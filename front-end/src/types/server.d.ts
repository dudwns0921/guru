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

export interface Review {
  id: number
  rating: number
  comment: string | null
  createdAt: string
  updatedAt: string
  user: {
    id: number
    name: string
    email: string
    createdAt: string
  }
  course: {
    id: number
    title: string
  }
}

export interface CreateReviewDto {
  courseId: number
  rating: number
  comment?: string
}

export interface UpdateReviewDto {
  rating: number
  comment?: string
}

export type GetReviewsByCourseResponse = Review[]

export interface CheckMyReviewResponse {
  hasReview: boolean
  review: Review | null
}

export type UpdateReviewResponse = Review

export type DeleteReviewResponse = { success: boolean }

export interface Enrollment {
  id: number
  enrolledAt: Date
  user: User
  course: Course
}

export interface DeleteUserResponse {
  success: boolean
}
