import type { User } from '@/domains/user/types/user'
import { createContext } from 'react'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
