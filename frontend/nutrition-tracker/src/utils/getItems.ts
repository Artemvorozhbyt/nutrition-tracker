import type { PaginatedResult } from '../types/api'

export function getItems<T>(
  data: T[] | PaginatedResult<T> | undefined,
): T[] {
  if (!data) {
    return []
  }

  return Array.isArray(data)
    ? data
    : data.items
}