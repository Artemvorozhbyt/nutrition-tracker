import { safeLocalStorage } from '../../utils/storage'
import type { AuthTokens, AuthUser } from './types'

const accessTokenKey = 'nutrition-tracker.auth.access-token'
const refreshTokenKey = 'nutrition-tracker.auth.refresh-token'
const userKey = 'nutrition-tracker.auth.user'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isAuthUser(value: unknown): value is AuthUser {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.email === 'string' &&
    (typeof value.displayName === 'string' ||
      value.displayName === null ||
      value.displayName === undefined)
  )
}

function readUser() {
  const storedValue = safeLocalStorage.getItem(userKey)

  if (!storedValue) {
    return null
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue)
    return isAuthUser(parsedValue) ? parsedValue : null
  } catch {
    return null
  }
}

export const authTokenStorage = {
  clear() {
    safeLocalStorage.removeItem(accessTokenKey)
    safeLocalStorage.removeItem(refreshTokenKey)
    safeLocalStorage.removeItem(userKey)
  },
  getAccessToken() {
    return safeLocalStorage.getItem(accessTokenKey)
  },
  getRefreshToken() {
    return safeLocalStorage.getItem(refreshTokenKey)
  },
  getUser() {
    return readUser()
  },
  setTokens(tokens: AuthTokens) {
    safeLocalStorage.setItem(accessTokenKey, tokens.accessToken)

    if (tokens.refreshToken) {
      safeLocalStorage.setItem(refreshTokenKey, tokens.refreshToken)
    } else {
      safeLocalStorage.removeItem(refreshTokenKey)
    }
  },
  setUser(user: AuthUser | null) {
    if (user) {
      safeLocalStorage.setItem(userKey, JSON.stringify(user))
    } else {
      safeLocalStorage.removeItem(userKey)
    }
  },
}
