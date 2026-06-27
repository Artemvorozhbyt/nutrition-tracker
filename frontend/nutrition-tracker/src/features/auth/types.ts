export type AuthUser = {
  displayName?: string | null
  email: string
  id: string
}

export type AuthTokens = {
  accessToken: string
  refreshToken?: string | null
}

export type AuthSession = {
  tokens: AuthTokens
  user: AuthUser | null
}
