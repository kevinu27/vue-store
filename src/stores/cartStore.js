import { defineStore } from 'pinia';
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { usestoreStore } from './storeStore';
 

export const cartStore = defineStore('cartStore', {
  state: () => ({
    authStore: useAuthStore(),
    itemsIds: [],
    itemsIdsinOrders:[],
  }),
  actions: {
  
      async addToCart(id) {
       console.log('addToCart en el cart Store', id)
       
       const API_URL = "http://127.0.0.1:5000"
       const token = localStorage.getItem("jwt")
     
       try {
         const userId = this.authStore.getUserId() 
     
         const response = await axios.post(
           `${API_URL}/addtocart`,
           { itemId: id, userId: userId  },
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
         this.responseMessage = 'No se pudo añadir el item in cart.'
       }
      },
      async getItemsInYourCart(id){
        console.log('getItemsInYourCart ID ', id)

        const API_URL = "http://127.0.0.1:5000"
        const token = localStorage.getItem("jwt")
      
        try {
          const authStore = useAuthStore() // ← aquí el cambio
          const userId = authStore.getUserId() // asegúrate de que esto exista

          const response = await axios.get(`${API_URL}/cart/${userId}/item_ids`)
          console.log('Respuesta del backend:', response.data)
          this.itemsIds = response.data.id_item
          console.log('response.date enel cartStore', response.data.id_item )
          /////////////////////////
          const storeStore= usestoreStore()
          storeStore.getItemsByIds(this.itemsIds)

          return response.data
      
        } catch (error) {
          console.error('Error al traer los items:', error)
          this.responseMessage = 'No se pudo traer los items del cart.'
        }

      },
      async removeItemInYourCart(id){
        // console.log('removeItemInYourCart ID ', id)

        const API_URL = "http://127.0.0.1:5000"
        const token = localStorage.getItem("jwt")
      
        try {
          const authStore = useAuthStore() // ← aquí el cambio
          const userId = authStore.getUserId() // asegúrate de que esto exista
          

          const response = await axios.delete(`${API_URL}/item/cart/${id}`,  {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
          console.log('Respuesta del backend:', response.data)
          this.itemsIds = response.data.id_item
          console.log('response.date enel cartStore', response.data.id_item )
          /////////////////////////
          const storeStore= usestoreStore()
          storeStore.getItemsByIds(this.itemsIds)

          return response.data
      
        } catch (error) {
          console.error('Error al traer los items:', error)
          this.responseMessage = 'No se pudo traer los items del cart.'
        }

      },
      async placeOrder(){

          const API_URL = "http://127.0.0.1:5000"
          const token = localStorage.getItem("jwt")

          try {
            const response = await axios.post(
              `${API_URL}/placeorder`,
              { item_ids: this.itemsIds },
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );
        
            console.log('Order response:', response.data);
            alert('Orden realizada con éxito');
          } catch (error) {
            console.error('Error al realizar la orden:', error.response?.data || error.message);
            alert('Error al realizar la orden');
          }
      
      },      
        async getItemsInYourOrders(){
        console.log('getItemsInYourOrders333333333')
        const API_URL = "http://127.0.0.1:5000"
        const token = localStorage.getItem("jwt")
        const authStore = useAuthStore() // ← aquí el cambio
        const userId = await authStore.getUserId() // asegúrate de que esto exista
        console.log('userId 44444444444444444444444', userId)

        try {
          if(userId){
          const response = await axios.get(`${API_URL}/myorders/${userId}/item_ids`)
          console.log('Respuesta del backend:', response.data)
          this.itemsIdsinOrders = response.data.id_item
          console.log('response.date enel cartStore------777777', response.data.id_item )
          /////////////////////////
        
          const storeStore= usestoreStore()
          storeStore.getItemsByIdsInOrders(response.data.id_item)

          return response.data
        }
      
        } catch (error) {
          console.error('Error al traer los items:', error)
          this.responseMessage = 'No se pudo traer los items del cart.'
        }

      },

}

})