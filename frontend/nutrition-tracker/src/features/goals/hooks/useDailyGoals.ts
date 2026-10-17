
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getDailyGoals,
  updateDailyGoals,
  type DailyGoalsDto,
} from '../api/dailyGoals'

const dailyGoalsQueryKey = ['daily-goals']

export function useDailyGoalsQuery() {
  return useQuery({
    queryKey: dailyGoalsQueryKey,
    queryFn: getDailyGoals,
  })
}

export function useUpdateDailyGoalsMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (goals: DailyGoalsDto) => updateDailyGoals(goals),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: dailyGoalsQueryKey,
      })
      await queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      })
    },
  })
}
