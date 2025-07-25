import axios from 'axios'
import { getServerUrl } from '../util/app'
import type { Course } from '../types/server'

// 모든 코스 가져오기
export const fetchCourses = async (): Promise<Course[]> => {
  const response = await axios.get<Course[]>(getServerUrl() + 'courses')
  if (response.status !== 200) {
    throw new Error('Failed to fetch courses')
  }
  return response.data
}