import api from '@/lib/api'
import type { Course, CourseDetail } from '@/domains/course/types/course'
import type { EnrollmentCheckResponse } from '@/domains/enrollment/types/enrollment'

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

// 코스 등록하기
export const enrollInCourse = async (courseId: number): Promise<void> => {
  const response = await api.post(`enrollment`, { courseId })
  if (response.status !== 201) {
    throw new Error(`Failed to enroll in course with ID ${courseId}`)
  }
}

export const checkEnrollment = async (courseId: number) => {
  const response = await api.get<EnrollmentCheckResponse>(`enrollment/check`, {
    params: { courseId },
  })
  if (response.status !== 200) {
    throw new Error(`Failed to check enrollment for course with ID ${courseId}`)
  }
  return response.data
}
