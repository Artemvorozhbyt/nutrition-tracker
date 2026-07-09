import { useQuery } from '@tanstack/react-query'
import { getMeals } from '../api/meals'

export const mealsKeys = {
  all: ['meals'] as const,
}

export function useMealsQuery() {
  return useQuery({
    queryKey: mealsKeys.all,
    queryFn: getMeals,
  })
}