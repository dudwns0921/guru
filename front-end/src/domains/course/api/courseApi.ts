import axios from 'axios'
import type { Course } from '@/types/server'
import { getServerUrl } from '@/utils/server'

// 모든 코스 가져오기
export const fetchCourses = async (): Promise<Course[]> => {
  const response = await axios.get<Course[]>(getServerUrl() + 'courses')
  if (response.status !== 200) {
    throw new Error('Failed to fetch courses')
  }
  return response.data
}
