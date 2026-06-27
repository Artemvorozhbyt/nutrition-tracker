import axios from 'axios'
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { env } from '../app/config/env'
import { getApiAuthConfig } from './authConfig'
import { toApiClientError } from './errors'

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  hasRetriedAfterRefresh?: boolean
}

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = getApiAuthConfig().getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(toApiClientError(error))
    }

    const axiosError = error as AxiosError
    const originalRequest = axiosError.config as RetriableRequestConfig | undefined
    const authConfig = getApiAuthConfig()
    const canAttemptRefresh =
      axiosError.response?.status === 401 &&
      Boolean(originalRequest) &&
      !originalRequest?.hasRetriedAfterRefresh &&
      Boolean(authConfig.refreshAccessToken)

    if (canAttemptRefresh && originalRequest && authConfig.refreshAccessToken) {
      originalRequest.hasRetriedAfterRefresh = true
      const nextAccessToken = await authConfig.refreshAccessToken()

      if (nextAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`
        return apiClient(originalRequest)
      }
    }

    if (axiosError.response?.status === 401) {
      authConfig.onUnauthorized?.()
    }

    return Promise.reject(toApiClientError(axiosError))
  },
)

export async function unwrapApiResponse<TData>(
  request: Promise<AxiosResponse<TData>>,
) {
  const response = await request
  return response.data
}
