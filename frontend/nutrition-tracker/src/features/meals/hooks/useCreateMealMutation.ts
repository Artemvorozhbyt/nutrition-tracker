import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createMeal } from '../api/meals'
import { mealsKeys } from './useMealsQuery'

export function useCreateMealMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMeal,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: mealsKeys.all,
      })
    },
  })
}