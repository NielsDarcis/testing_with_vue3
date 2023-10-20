import EntitiesService from '../entities/entity-services'
import Counter from '../models/Counter.class'

export default class CounterService extends EntitiesService<Counter> {
  get endpoint() {
    return '/counter'
  }
}
