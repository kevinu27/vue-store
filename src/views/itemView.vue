<template>
    <div>
      <h1>Item admin view Page</h1>
      <p>Welcome to the Item admin page!</p>
     
      <div v-if="storeStore.item">

      {{ storeStore.item.item.name }}
      {{ storeStore.item.item.description }}
      {{ storeStore.item.item.price }}

     </div>

     <button @click="addToCart"> add to cart</button>

    </div>
  </template>

<script>
import { usestoreStore } from '@/stores/storeStore';
import { cartStore } from '@/stores/cartStore';


  export default {
  data() {
  return {
    storeStore: usestoreStore(),
    cartStore: cartStore(),

  };
},

  methods: {
    addToCart(){
      console.log('add item to cart')
      this.cartStore.addToCart(this.storeStore.item.item.id)
    },
    
  },
  mounted(){
    console.log('mounted - sthis.$route.params.id', this.$route.params.id)
    this.storeStore.getItem(this.$route.params.id)
    // this.storeStore.getAllTheStoreItem(this.$route.params.id)

  }
};
</script>

<style scoped>
.itemcards {
  border: 1px solid red;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  /* flex-direction: column; */
  width: 100%;
}
.itemcard {
  border: 1px solid gray;
  border-radius: 2px;
  display: flex;
  width: fit-content;
}
</style>