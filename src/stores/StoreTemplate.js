import { defineStore } from 'pinia'

export const useTemplateStore = defineStore('storeTemplate', {


    // The state is the actual data in your store to be accessed or updated
    state: () => ({ 
        count: 0, 
        name: 'default'
    }),


    // Getters are used to access the state of your store
    getters: {
        getTotal() {
          return this.count;
        },
    },
  

    // Actions are used to update the state of your store.
    actions: {
        increment() {
            this.count++
        },
    },


})  
  