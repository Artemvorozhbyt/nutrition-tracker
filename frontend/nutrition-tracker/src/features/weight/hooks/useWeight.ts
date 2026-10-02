import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  createWeight,
  deleteWeight,
  getWeightHistory,
  getWeights,
  updateWeight,
} from '../api/weight'

export const weightKeys = {
  all: ['weight'] as const,
  entries: ['weight', 'entries'] as const,
  history: ['weight', 'history'] as const,
}

export function useWeightsQuery() {
  return useQuery({
    queryKey: weightKeys.entries,
    queryFn: getWeights,
  })
}

export function useWeightHistoryQuery() {
  return useQuery({
    queryKey: weightKeys.history,
    queryFn: getWeightHistory,
  })
}

export function useCreateWeightMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createWeight,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: weightKeys.all,
      })
    },
  })
}

export function useUpdateWeightMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      weight,
    }: {
      id: string
      weight: number
    }) =>
      updateWeight(id, {
        weight,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: weightKeys.all,
      })
    },
  })
}

export function useDeleteWeightMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteWeight,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: weightKeys.all,
      })
    },
  })
}