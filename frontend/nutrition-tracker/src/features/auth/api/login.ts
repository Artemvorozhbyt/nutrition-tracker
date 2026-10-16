import { apiClient, unwrapApiResponse } from '../../../api/client'

export type LoginRequestDto = {
  email: string
  password: string
}

export type LoginResponseDto = {
  accessToken: string
}

export function login(request: LoginRequestDto) {
  return unwrapApiResponse(
    apiClient.post<LoginResponseDto>('/auth/login', request),
  )
}

export function loginWithGoogle() {
  window.location.href = `${apiClient.defaults.baseURL}/auth/google`
}

export type GoogleExchangeResponseDto = {
  accessToken: string
  profileCompleted: boolean
}

export function exchangeGoogleCode(code: string) {
  return unwrapApiResponse(
    apiClient.post<GoogleExchangeResponseDto>(
      '/auth/google-exchange',
      code,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ),
  )
}