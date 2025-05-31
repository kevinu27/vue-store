<template>
    <div>
      <h1>My Order</h1>
      <p>Welcome to your orders!777777777</p>
      <div v-for="item in storeStore.intemsInOrder" :key="item.id">
          <div class="item-card">
            name: {{ item.name }}
            description: {{ item.description }}
            price: {{ item.price }}
          </div>
        </div>

      
    </div>
  </template>

<script>
import { userSettingsStore } from '@/stores/userSettingsStore';
import { useAuthStore } from '@/stores/authStore';
import { usestoreStore } from '@/stores/storeStore';
import { cartStore } from '@/stores/cartStore';
import StoreCard from '@/components/StoreCard.vue'
import Carrousell from '@/components/Carrousell.vue'

  export default {
    data() { 
    return {
      authStore: useAuthStore(), 
      settingsStore: userSettingsStore(), 
      storeStore: usestoreStore(),
      cartStore: cartStore(),
    }
  },

    methods: {
        closeModal() {
            console.log('closing modal')
            this.authStore.ShowloginModal()
      },
      

    },
    async mounted() {
      console.log(`the component MYorder----- is now mounted.`)
      try {
        await this.authStore.getUserData()

      }catch (error) {
          console.error('rror cargando el authstore:', error)
          this.responseMessage = 'error cargando el authstore'
        }

      this.cartStore.getItemsInYourOrders()

  
  }
  };
  </script>