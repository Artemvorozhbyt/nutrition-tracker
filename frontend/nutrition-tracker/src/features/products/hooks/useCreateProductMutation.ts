import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '../api/products'
import { productsKeys } from './useProductsQuery'

export function useCreateProductMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: productsKeys.all })
    },
  })
}
