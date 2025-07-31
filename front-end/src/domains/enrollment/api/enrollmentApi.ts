import api from '@/lib/api'
import type { Enrollment } from '../types/enrollment'

export const getMyEnrollments = async () => {
  const response = await api.get<Enrollment[]>('enrollment/my')
  if (response.status !== 200) {
    throw new Error('Failed to fetch my enrollments')
  }
  return response.data
}
