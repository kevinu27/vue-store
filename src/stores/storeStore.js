import { defineStore } from 'pinia';
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
 

export const usestoreStore = defineStore('usestoreStore', {
  state: () => ({
    ownerId: null,
    storeId: null,
    stores: [],
    store: null,
    items: [],
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

        const API_URL = "http://127.0.0.1:5000"
        const token = localStorage.getItem("jwt")
      
        try {
          const authStore = useAuthStore() // ← aquí el cambio
          const userId = authStore.getUserId() // asegúrate de que esto exista
      
          const response = await axios.get(`${API_URL}/stores/${userId}`)
          console.log('Respuesta del backend:', response.data)
          this.stores = response.data
          return response.data
      
        } catch (error) {
          console.error('Error al crear la tienda:', error)
          this.responseMessage = 'No se pudo crear la tienda.'
        }
      },

      async getStore(storeid) {

        const API_URL = "http://127.0.0.1:5000"
        const token = localStorage.getItem("jwt")

        try {
          const response = await axios.get(`${API_URL}/store/${storeid}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log('Respuesta del backend:', response.data)
          this.store = response.data
          return response.data
      
        } catch (error) {
          console.error('Error al crear la tienda:', error)
          this.responseMessage = 'No se pudo crear la tienda.'
        }
      },
      async createItem(itemInfo){
        console.log('itemInfo en el store store', itemInfo)
        const API_URL = "http://127.0.0.1:5000"
        const token = localStorage.getItem("jwt")

        const storeid = itemInfo.storeid
        try {
          const response = await axios.post(`${API_URL}/store/${storeid}/item`,
            {                     
              name: itemInfo.itemName, 
              price: itemInfo.itemPrice, 
              description: itemInfo.itemDescription,
              store_id: storeid  },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            }
          )
          console.log('Respuesta del backend:', response.data)
          this.item = response.data
          return response.data
      
        } catch (error) {
          console.error('Error al crear la tienda:', error)
          this.responseMessage = 'No se pudo crear el item.'
        }
      },

      async getAllTheStoreItem(storeid){
        const API_URL = "http://127.0.0.1:5000"
        const token = localStorage.getItem("jwt")

        try {
          const response = await axios.get(`${API_URL}/store/${storeid}/items`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          this.items = response.data
          console.log('this.items = response.data', response.data)
          return response.data
      
        } catch (error) {
          console.error('Error al crear la tienda:', error)
          this.responseMessage = 'No se pudo crear la tienda.'
        }
      },

}

})