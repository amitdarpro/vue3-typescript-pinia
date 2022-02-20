import { defineStore } from 'pinia'
import type SampleItem from '../types/SampleItem';

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0,
    name: "amit",
    items: [] as Array<SampleItem>,
    hasChanged: false,
  }),
  getters: {
    // getter 1
    doubleCount: (state) => state.counter * 2,
    
    // getter 2 with access to getter 1:
    // in order to access other getter inside a getter we will use a function as follow:
    doubleCountPlusOne(): number {
      return this.doubleCount + 1;
    }
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})
