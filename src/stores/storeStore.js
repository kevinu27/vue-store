import { defineStore } from 'pinia';
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { cartStore } from './cartStore';
 

export const usestoreStore = defineStore('usestoreStore', {
  state: () => ({
    ownerId: null,
    storeId: null,
    stores: [],
    store: null,
    items: [],
    item: null,
    intemsInCart:[],
    intemsInOrder:[],
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
      async getItem(itemid){
        const API_URL = "http://127.0.0.1:5000"
        const token = localStorage.getItem("jwt")

        try {
          const response = await axios.get(`${API_URL}/item/${itemid}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          this.item = response.data
          console.log('this.items = response.data', response.data)
          return response.data
      
        } catch (error) {
          console.error('Error al crear la tienda:', error)
          this.responseMessage = 'No se pudo crear la tienda.'
        }
      },
      async updateItem(updatedItem){
        console.log('update Item..............', updatedItem)

        const API_URL = "http://127.0.0.1:5000"
        const token = localStorage.getItem("jwt")


        try {
          const response = await axios.put(
            `${API_URL}/item/${updatedItem.id}`,
           updatedItem,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          console.log('Item actualizado:', response.data);
          return response.data
        } catch (error) {
          console.error('Error al actualizar el item:', error.response?.data || error.message);
        }

      },
     async updateStore(updatedStore){

        console.log('update Store..............', updatedStore)

        const API_URL = "http://127.0.0.1:5000"
        const token = localStorage.getItem("jwt")


        try {
          const response = await axios.put(
            `${API_URL}/store/${updatedStore.id}`,
            updatedStore,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          console.log('Store actualizado:', response.data);
          return response.data
        } catch (error) {
          console.error('Error al actualizar el item:', error.response?.data || error.message);
        }

      },
      async getItemsByIds(itemIds){
        const API_URL = "http://127.0.0.1:5000"
        const token = localStorage.getItem("jwt")

        try {
          const response = await axios.post(
            `${API_URL}//items_by_ids`,
            {
              item_ids: itemIds
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          console.log('items:', response.data)
          this.intemsInCart =response.data
          
          return response.data

        } catch (error) {
          console.error('Error al actualizar el item:', error.response?.data || error.message);
        }
      },
      async getItemsByIdsInOrders(itemIds){
        const API_URL = "http://127.0.0.1:5000"
        const token = localStorage.getItem("jwt")
        console.log('------------------!!!!!!!!!!!!!!!!---------------', itemIds)

        try {
          const response = await axios.post(
            `${API_URL}//items_by_ids`,
            {
              item_ids: itemIds
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          console.log('items:', response.data)
          
          
          this.intemsInOrder =response.data
          console.log('this.intemsInOrder:------********888888888', this.intemsInOrder)
          return response.data

        } catch (error) {
          console.error('Error al actualizar el item:', error.response?.data || error.message);
        }
      },

     async removeItem(id){
        console.log('storeStore remove item id', id)
        const API_URL = "http://127.0.0.1:5000"
        const token = localStorage.getItem("jwt")
      
        try {
          const authStore = useAuthStore() // ← aquí el cambio
          const userId = authStore.getUserId() // asegúrate de que esto exista
          
          const response = await axios.delete(`${API_URL}/item/${id}`,  {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
          console.log('Respuesta del backend:', response.data)
          console.log('response.date enel cartStore', response.data.id_item )

          // const cartStoreFunction = cartStore()
          // cartStoreFunction.removeItemInYourCart(response.data.id_item)
          return response.data
      
        } catch (error) {
          console.error('Error al traer los items:', error)
          this.responseMessage = 'No se pudo traer los items del cart.'
        }
      }
    }




})