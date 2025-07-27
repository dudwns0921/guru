import api from '@/lib/api'
import type { Course } from '@/types/server'

// 모든 코스 가져오기
export const fetchCourses = async (): Promise<Course[]> => {
  const response = await api.get<Course[]>('courses')
  if (response.status !== 200) {
    throw new Error('Failed to fetch courses')
  }
  return response.data
}
