import { PaginatedResponse } from './paginated-response.class'

export default class EntityState<T> {
  all: T[]
  paginated: PaginatedResponse<T>
  selected: T
}
