import { apiClient, unwrapApiResponse } from '../../../api/client'
import type { LoginResponse, RegisterRequest } from '../types'

export function register(request: RegisterRequest) {
  return unwrapApiResponse(
    apiClient.post<LoginResponse>('/auth/register', request),
  )
}