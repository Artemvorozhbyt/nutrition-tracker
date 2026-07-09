import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteMeal } from '../api/meals'
import { mealsKeys } from './useMealsQuery'

export function useDeleteMealMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteMeal,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: mealsKeys.all,
      })
    },
  })
}