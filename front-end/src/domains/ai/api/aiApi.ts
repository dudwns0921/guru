import type { Course } from '@/domains/course/types/course'
import api from '@/lib/api'

export const getPersonalizedCourses = async (): Promise<Course[]> => {
  const response = await api.get<{
    success: boolean
    data: Course[]
  }>('ai/personalized')
  if (response.status !== 200) {
    throw new Error('Failed to fetch courses')
  }
  return response.data.data
}
