import { defineStore } from 'pinia';
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
 

export const cartStore = defineStore('cartStore', {
  state: () => ({
    itemsIds: [],
  }),
  actions: {
  
      async addToCart(id) {
       console.log('addToCart en el cart Store', id)
      },

}

})