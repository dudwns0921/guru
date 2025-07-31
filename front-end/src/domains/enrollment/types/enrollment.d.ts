import type { Course } from '@/domains/course/types/course'
import type { User } from '@/domains/user/types/user'

export interface EnrollmentCheckResponse {
  enrolled: boolean
}

export interface Enrollment {
  id: number
  createdAt: string
  user: User
  course: Course
}
