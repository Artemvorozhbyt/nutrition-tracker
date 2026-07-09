import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '../api/products'
import { productsKeys } from './useProductsQuery'

export function useDeleteProductMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: productsKeys.all })
    },
  })
}
