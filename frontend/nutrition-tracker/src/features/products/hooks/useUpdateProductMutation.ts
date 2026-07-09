import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProduct } from '../api/products'
import { productsKeys } from './useProductsQuery'

export function useUpdateProductMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...dto }: { id: string } & Parameters<typeof updateProduct>[1]) =>
      updateProduct(id, dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: productsKeys.all })
    },
  })
}
