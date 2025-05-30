<template>
    <div>
      <h1>My Order</h1>
      <p>Welcome to your orders!</p>
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
    mounted() {
      console.log(`the component UserAccount is now mounted.`)
      this.cartStore.getItemsInYourOrders()

  
  }
  };
  </script>