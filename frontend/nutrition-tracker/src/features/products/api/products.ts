import { apiClient, unwrapApiResponse } from '../../../api/client'
import type { PaginatedResult } from '../../../types/api'
import type { CreateProductDto, Product, UpdateProductDto } from '../types'

export { ProductCategory, PRODUCT_CATEGORIES, PRODUCT_CATEGORY_LABELS } from '../types'
export type { Product, CreateProductDto, UpdateProductDto } from '../types'

export type GetProductsParams = {
  search?: string
  page?: number
  pageSize?: number
}

export type CreateProductRequest = CreateProductDto
export type UpdateProductRequest = UpdateProductDto

export function getProducts(params: GetProductsParams = {}) {
  return unwrapApiResponse(
    apiClient.get<PaginatedResult<Product> | Product[]>('/products', {
      params: {
        search: params.search || undefined,
        page: params.page ?? 1,
        pageSize: params.pageSize ?? 10,
      },
    }),
  )
}

export function createProduct(request: CreateProductRequest) {
  return unwrapApiResponse(apiClient.post<Product>('/products', request))
}

export function updateProduct(id: string, request: UpdateProductRequest) {
  return unwrapApiResponse(apiClient.put<Product>(`/products/${id}`, request))
}

export function deleteProduct(id: string) {
  return unwrapApiResponse(apiClient.delete(`/products/${id}`))
}
