export class PaginatedResponse<T> {
  docs: T[] = []
  limit: number
  page: number
  pages: number
  total: number
}
