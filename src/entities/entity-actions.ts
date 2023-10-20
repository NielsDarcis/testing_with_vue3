import EntityState from '@/models/common/entity-state.class'
import EntitiesService from '../entities/entity-services'
import {
  Store,
  StoreDefinition,
  acceptHMRUpdate,
  defineStore,
  StoreGeneric,
  StateTree,
  _GettersTree,
  _ActionsTree,
} from 'pinia'

export default class EntityActions<T> {
  private service: EntitiesService<T>
  private id: string
  private state: EntityState<T>

  constructor(service: EntitiesService<T>, id: string) {
    this.id = id
    this.service = service
    this.state = new Map<string, StoreGeneric>().get(this.id)?.$state.entity
  }

  async create(entity: T): Promise<T> {
    const newEntity = await this.service.create(entity)
    this.state.paginated.docs.push(newEntity)
    return newEntity
  }

  async getAllEntities(): Promise<T[]> {
    const allEntities = await service.getAllEntities()
    this.entities = allEntities
    return allEntities
  }

  async getById(id: number): Promise<T> {
    const entity = await service.fetchOne(id)
    return entity
  }

  async update(updatedEntity: T): Promise<T> {
    const updated = await service.updateEntity(updatedEntity)
    const index = this.entities.findIndex((e) => e.id === updated.id)
    if (index !== -1) {
      this.entities[index] = updated
    }
    return updated
  }

  async deleteEntity(id: number): Promise<void> {
    await service.deleteEntity(id)
    this.entities = this.entities.filter((e) => e.id !== id)
  }
}
