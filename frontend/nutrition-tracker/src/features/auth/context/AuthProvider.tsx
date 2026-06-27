import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { configureApiAuth } from '../../../api/authConfig'
import { queryClient } from '../../../api/queryClient'
import { authTokenStorage } from '../tokenStorage'
import type { AuthSession, AuthUser } from '../types'
import { AuthContext } from './AuthContext'
import type { AuthContextValue, AuthState } from './AuthContext'

function getInitialAuthState(): AuthState {
  return {
    accessToken: authTokenStorage.getAccessToken(),
    user: authTokenStorage.getUser(),
  }
}

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>(getInitialAuthState)

  const clearSession = useCallback(() => {
    authTokenStorage.clear()
    queryClient.clear()
    setAuthState({
      accessToken: null,
      user: null,
    })
  }, [])

  const setSession = useCallback((session: AuthSession) => {
    authTokenStorage.setTokens(session.tokens)
    authTokenStorage.setUser(session.user)
    setAuthState({
      accessToken: session.tokens.accessToken,
      user: session.user,
    })
  }, [])

  const updateUser = useCallback((user: AuthUser | null) => {
    authTokenStorage.setUser(user)
    setAuthState((currentState) => ({
      ...currentState,
      user,
    }))
  }, [])

  useEffect(
    () =>
      configureApiAuth({
        getAccessToken: authTokenStorage.getAccessToken,
        onUnauthorized: clearSession,
        refreshAccessToken: null,
      }),
    [clearSession],
  )

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      ...authState,
      clearSession,
      isAuthenticated: Boolean(authState.accessToken),
      setSession,
      updateUser,
    }),
    [authState, clearSession, setSession, updateUser],
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
