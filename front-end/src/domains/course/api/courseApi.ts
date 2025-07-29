import api from '@/lib/api'
import type { Course, CourseDetail } from '@/types/server'

// 모든 코스 가져오기
export const fetchCourses = async (): Promise<Course[]> => {
  const response = await api.get<Course[]>('courses')
  if (response.status !== 200) {
    throw new Error('Failed to fetch courses')
  }
  return response.data
}

// 특정 코스 가져오기
export const fetchCourseById = async (courseId: number): Promise<CourseDetail | null> => {
  const response = await api.get<Course>(`courses/${courseId}`)
  if (response.status !== 200) {
    throw new Error(`Failed to fetch course with ID ${courseId}`)
  }
  return response.data
}
