import { Store, StoreDefinition, acceptHMRUpdate, defineStore } from 'pinia'
import EntityActions from '../entities/entity-actions'
import CounterService from '../services/counter.service'
import Counter from '../models/Counter.class'
import EntityState from '../models/common/entity-state.class'

const delay = (t: number) => new Promise((r) => setTimeout(r, t))

const counterService = new CounterService();

export const useCounter = defineStore({
  id: 'counter',

  state: () => ({
    entity: {
      ...new EntityState<Counter>, 
    },

    n: 2,
    incrementedTimes: 0,
    decrementedTimes: 0,
    numbers: [] as number[],
  }),

  getters: {
    double: (state) => state.n * 2,
  },

  actions: {
    ...new EntityActions<Counter>(counterService, 'counter'),
    increment(amount = 1) {
      this.incrementedTimes++
      this.n += amount
    },

    changeMe() {
      console.log('change me to test HMR')
    },

    async fail() {
      const n = this.n
      await delay(1000)
      this.numbers.push(n)
      await delay(1000)
      if (this.n !== n) {
        throw new Error('Someone changed n!')
      }

      return n
    },

  },
})

useCounter()

// this one is for Vite and other bundlers
// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useCounter, import.meta.hot))
// }

// this is for webpack 5.x
// if (import.meta.webpackHot) {
//   import.meta.webpackHot.accept(acceptHMRUpdate(useCounter, import.meta))
// }
