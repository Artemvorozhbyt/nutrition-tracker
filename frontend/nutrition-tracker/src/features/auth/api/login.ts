import { apiClient, unwrapApiResponse } from '../../../api/client'

export type LoginRequestDto = {
  email: string
  password: string
}

export type LoginResponseDto = {
  accessToken: string
}

export function login(request: LoginRequestDto) {
  return unwrapApiResponse(apiClient.post<LoginResponseDto>('/auth/login', request))
}
