import api from '@/lib/api'
import type { Enrollment } from '../types/enrollment'

export const getMyEnrollments = async () => {
  const response = await api.get<Enrollment[]>('enrollment/my')
  if (response.status !== 200) {
    throw new Error('Failed to fetch my enrollments')
  }
  return response.data
}

export const cancelEnrollment = async (enrollmentId: number) => {
  const response = await api.delete(`enrollment/${enrollmentId}`)
  if (response.status !== 200) {
    throw new Error(`Failed to cancel enrollment with ID ${enrollmentId}`)
  }
  return response.data
}
