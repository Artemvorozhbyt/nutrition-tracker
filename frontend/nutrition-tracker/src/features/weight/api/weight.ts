import { apiClient, unwrapApiResponse } from '../../../api/client'
import type {
  CreateWeightRequest,
  UpdateWeightRequest,
  WeightEntry,
  WeightHistory,
} from '../types'

export function getWeights() {
  return unwrapApiResponse(
    apiClient.get<WeightEntry[]>('/weights'),
  )
}

export function getWeightHistory() {
  return unwrapApiResponse(
    apiClient.get<WeightHistory>('/weights/history'),
  )
}

export function createWeight(request: CreateWeightRequest) {
  return unwrapApiResponse(
    apiClient.post('/weights', request),
  )
}

export function updateWeight(
  id: string,
  request: UpdateWeightRequest,
) {
  return unwrapApiResponse(
    apiClient.put(`/weights/${id}`, request),
  )
}

export function deleteWeight(id: string) {
  return unwrapApiResponse(
    apiClient.delete(`/weights/${id}`),
  )
}