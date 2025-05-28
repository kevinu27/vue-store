<template>
  <div>
    <h1>Item Cart Page</h1>
    <p>Welcome to the Item Cart page!</p>


    <div v-for="item in storeStore.intemsInCart" :key="item.id">
          <div class="item-card">
            name: {{ item.name }}
            description: {{ item.description }}
            price: {{ item.price }}
          </div>
          <button @click="()=> removeItemFromCart(item.id)">Eliminar del carro</button>
        </div>

  </div>

  <div > cantidad total:{{ totalAmount }}</div>
  <!-- <div> cantidad total:{{ storeStore.intemsInCart.map(item => item.price).reduce((acumulador, precioActual) => acumulador + precioActual, 0) }}</div> -->

  <div>
    <button @click="()=>navigateTo('payment')">proceder al pago</button>
  </div>
</template>

<script>
import { cartStore } from '@/stores/cartStore';
import { usestoreStore } from '@/stores/storeStore';

export default {
  data() {
    return {
      cartStore: cartStore(),
      storeStore: usestoreStore(),
      items: [],
      }
    },

    methods: {
      removeItemFromCart(itemId){
        console.log('cart item removed', itemId)
        this.cartStore.removeItemInYourCart(itemId)
        console.log('this.cartStore.removeItemInYourCart(itemId)', this.cartStore.removeItemInYourCart(itemId))

      },
      navigateTo(path) {
        console.log('navigateto')
        this.$router.push(path)
      }

    },
    computed: {
      totalAmount() {
        return this.storeStore.intemsInCart.reduce((acc, item) => acc + item.price, 0);
      }
    },
    mounted(){
      this.totalAmount = this.storeStore.intemsInCart.map(item => item.price).reduce((acumulador, precioActual) => acumulador + precioActual, 0)

    }
  };
</script>

<style scoped>
.item-card{
  border: 2px solid red;
}
</style>