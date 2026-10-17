
import { apiClient, unwrapApiResponse } from '../../../api/client'

export type DailyGoalsDto = {
  calories: number
  protein: number
  fat: number
  carbs: number
}

export function getDailyGoals() {
  return unwrapApiResponse(
    apiClient.get<DailyGoalsDto>('/daily-goals'),
  )
}

export function updateDailyGoals(goals: DailyGoalsDto) {
  return unwrapApiResponse(
    apiClient.put<void>('/daily-goals', goals),
  )
}