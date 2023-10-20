import api from '../services/api'
import { PaginatedResponse } from '../models/common/paginated-response.class'
import { QueryParams } from '../models/common/query-params.class'

// Define the service for API requests
export class BaseEntitiesService<TResponse, TInput> {
  get endpoint() {
    return ''
  }

  async create(entity: TInput): Promise<TResponse> {
    try {
      const response = await api.post<TResponse>(this.endpoint, entity)
    } catch (error) {
      throw new Error(error as string)
    }

    if (!response.ok) {
      throw new Error('Failed to create entity.')
    }
    return response.json()
  }

  // Read a single entity by ID via API
  async fetchOne(id: string): Promise<TResponse> {
    // Make an HTTP GET request to retrieve a single entity by ID
    // Replace 'apiUrl' with your actual API endpoint
    const response = await api.get(`apiUrl/${this.entityName}/${id}`)
    if (!response.ok) {
      throw new Error('Entity not found.')
    }
    return response.json()
  }

  // Update an entity via API
  async updateEntity(updatedEntity: T): Promise<T> {
    // Make an HTTP PUT request to update the entity by ID
    // Replace 'apiUrl' with your actual API endpoint
    const response = await fetch(
      `apiUrl/${this.entityName}/${updatedEntity.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(updatedEntity),
        headers: { 'Content-Type': 'application/json' },
      }
    )
    if (!response.ok) {
      throw new Error('Failed to update entity.')
    }
    return response.json()
  }

  // Delete an entity by ID via API
  async deleteEntity(id: number): Promise<void> {
    // Make an HTTP DELETE request to delete the entity by ID
    // Replace 'apiUrl' with your actual API endpoint
    const response = await fetch(`apiUrl/${this.entityName}/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete entity.')
    }
  }
}

export default class EntitiesService<
  TResponse,
  TInput = TResponse
> extends BaseEntitiesService<TResponse, TInput> {
  async fetch(
    params?: QueryParams,
    endpoint?: string
  ): Promise<PaginatedResponse<TResponse>> {
    const config: AxiosRequestConfig = generateRequestConfig(params)

    const response = await api.get<PaginatedResponse<TResponse>>(
      endpoint || this.endpoint,
      config
    )

    return response.data
  }
}
