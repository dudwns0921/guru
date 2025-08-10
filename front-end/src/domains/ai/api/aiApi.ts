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

export const postChat = async (userInput: string) => {
  const response = await api.post<{
    success: boolean
    data: { type: 'chat' | 'recommendations'; content: string | number[] }
  }>('ai/chat', { user_input: userInput })
  console.log(response)
  if (response.status !== 201) {
    throw new Error('Failed to post chat')
  }
  return response.data.data
}
