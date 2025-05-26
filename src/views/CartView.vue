<template>
  <div>
    <h1>Item admin view Page</h1>
    <p>Welcome to the Item admin page!</p>
    


  </div>
</template>

<script>
import { cartStore } from '@/stores/cartStore';


export default {
  data() {
    return {
      cartStore: cartStore(),
      items: [],

      }
    },

    methods: {
      getCartItems(){
      },

    },
    mounted(){


    }
  };
</script>

<style scoped>

</style>