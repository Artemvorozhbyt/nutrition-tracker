import { apiClient, unwrapApiResponse } from '../../../api/client'
import type { CreateMealDto, Meal } from '../types'

export async function getMeals(): Promise<Meal[]> {
  return unwrapApiResponse(
    apiClient.get<Meal[]>('/meals')
  )
}

export async function createMeal(
  dto: CreateMealDto,
): Promise<Meal> {
  return unwrapApiResponse(
    apiClient.post<Meal>('/meals', dto)
  )
}

export async function deleteMeal(
  id: string,
): Promise<void> {
  await unwrapApiResponse(
    apiClient.delete(`/meals/${id}`)
  )
}