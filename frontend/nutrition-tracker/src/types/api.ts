export type ApiProblemDetails = {
  detail?: string
  errors?: Record<string, string[]>
  status?: number
  title?: string
  traceId?: string
  type?: string
}

export type PaginatedResult<TItem> = {
  items: TItem[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export type SortDirection = 'asc' | 'desc'
