import api from '@/lib/api'
import type { DeleteUserResponse } from '@/domains/user/types/user'

export const deleteMe = async () => {
  const response = await api.delete<DeleteUserResponse>('users/me')
  if (response.status !== 200) {
    throw new Error('Failed to delete user account')
  }
  return response.data
}
