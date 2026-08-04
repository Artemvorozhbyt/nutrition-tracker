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

export const Gender = {
  Male: 1,
  Female: 2,
} as const

export type Gender = (typeof Gender)[keyof typeof Gender]

export const GoalType = {
  LoseWeight: 1,
  MaintainWeight: 2,
  GainWeight: 3,
} as const

export type GoalType = (typeof GoalType)[keyof typeof GoalType]

export type RegisterRequest = {
  firstName: string
  email: string
  password: string
  gender: Gender
  age: number
  height: number
  weight: number
  goal: GoalType
}

export type LoginResponse = {
  accessToken: string
}