import { createContext } from 'react'
import type { AuthSession, AuthUser } from '../types'

export type AuthState = {
  accessToken: string | null
  user: AuthUser | null
}

export type AuthContextValue = AuthState & {
  clearSession: () => void
  isAuthenticated: boolean
  setSession: (session: AuthSession) => void
  updateUser: (user: AuthUser | null) => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
