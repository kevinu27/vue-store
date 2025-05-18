import { defineStore } from 'pinia';
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
 

export const usestoreStore = defineStore('usestoreStore', {
  state: () => ({
    ownerId: null,
    storeId: null,
    stores: []
  }),
  actions: {
    login(userData) {
      this.user = userData;
      this.isAuthenticated = true;
    },
      async createStore(storename) {
        console.log('createStore ---createStore----createStore')
        console.log('createStore ---createStore----createStore', storename)

        const API_URL = "http://127.0.0.1:5000"
        const token = localStorage.getItem("jwt")
      
        try {
          const authStore = useAuthStore() // ← aquí el cambio
          const userId = authStore.getUserId() // asegúrate de que esto exista
      
          console.log('userId del authStore:', userId)
          console.log('userId del storename:', storename)
      
          const response = await axios.post(
            `${API_URL}/store`,
            { storename: storename, userId: userId  },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            }
          )
      
          return response.data
      
        } catch (error) {
          console.error('Error al crear la tienda:', error)
          this.responseMessage = 'No se pudo crear la tienda.'
        }
      },
      async getYourStores() {
        console.log('getYourStores ---getYourStores----getYourStores')

        const API_URL = "http://127.0.0.1:5000"
        const token = localStorage.getItem("jwt")
      
        try {
          const authStore = useAuthStore() // ← aquí el cambio
          const userId = authStore.getUserId() // asegúrate de que esto exista
      
          console.log('userId del authStore:', userId)
      
          const response = await axios.get(`${API_URL}/stores/${userId}`)
          console.log('Respuesta del backend:', response.data)
          this.stores = response.data
          return response.data
      
        } catch (error) {
          console.error('Error al crear la tienda:', error)
          this.responseMessage = 'No se pudo crear la tienda.'
        }
      },

}

})