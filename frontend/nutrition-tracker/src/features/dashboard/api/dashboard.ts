import { apiClient, unwrapApiResponse } from '../../../api/client'

export interface DashboardResponse {
  currentWeight: number
  weightDifference: number
  goalCalories: number
  consumedCalories: number
  remainingCalories: number
  consumedProtein: number
  consumedFat: number
  consumedCarbs: number
  mealsToday: number
}

export function getDashboard() {
  return unwrapApiResponse(
    apiClient.get<DashboardResponse>('/dashboard')
  )
}