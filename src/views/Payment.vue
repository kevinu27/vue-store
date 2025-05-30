<template>
    <div>
      <h1>Payment Page</h1>
      <p>Welcome to the Payment page!</p>
      <button @click="pay"> pay</button>
    </div>
  </template>

<script>
import { useAuthStore } from '@/stores/authStore'
import { usestoreStore } from '@/stores/storeStore';
import { cartStore } from '@/stores/cartStore';


// return { authStore };

export default {
  components: {},
  data() {
    return {
      authStore: useAuthStore(),
      storeStore: usestoreStore(),
      cartStore: cartStore()
    }
  },


  methods: {
     pay() {
      console.log('pay')
      this.cartStore.placeOrder()
    }
  },
  mounted() {

  }
};
</script>