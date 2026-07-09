import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../api/products'
import type { CreateProductRequest, GetProductsParams, UpdateProductRequest } from '../api/products'

export const productsKeys = {
  all: ['products'] as const,
  list: (params: GetProductsParams) => ['products', 'list', params] as const,
}

export function useProductsQuery(params: GetProductsParams = {}) {
  return useQuery({
    queryKey: productsKeys.list(params),
    queryFn: () => getProducts(params),
    placeholderData: (prev) => prev,
  })
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (request: CreateProductRequest) => createProduct(request),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: productsKeys.all })
    },
  })
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: UpdateProductRequest }) =>
      updateProduct(id, request),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: productsKeys.all })
    },
  })
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: productsKeys.all })
    },
  })
}
