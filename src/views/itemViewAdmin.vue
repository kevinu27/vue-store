<template>
    <div>
      <h1>Item admin view Page</h1>
      <p>Welcome to the Item admin page!</p>
     
      <div v-if="storeStore.item">
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="storeStore.item.item.name ">
        <label for="nombre">Descripcion:</label>
        <input type="text" v-model="storeStore.item.item.description ">
        <label for="nombre">price:</label>
        <input type="number" v-model="storeStore.item.item.price ">
      <!-- {{ storeStore.item.item.name }}
      {{ storeStore.item.item.description }}
      {{ storeStore.item.item.price }} -->

     </div>

     <button @click="updateItem"> actualizar</button>

    </div>
  </template>

<script>
import { usestoreStore } from '@/stores/storeStore';


  export default {
  data() {
  return {
    storeStore: usestoreStore(),
    itemName: null,
    itemDescription: null, 
    itemPrice: null,
    item: null,
    updatedItem: null

  };
},

  methods: {
    addItem(){
      console.log('add item')
      this.addIsVisible = !this.addIsVisible
    },
    updateItem(){
      console.log('updateItem', this.storeStore.item.item.name)
      console.log('updateItem', this.storeStore.item.item.description)
      console.log('updateItem', this.storeStore.item.item.price)
      const updatedItem = {
        id:  this.$route.params.id,
        name: this.storeStore.item.item.name,
        description: this.storeStore.item.item.description,
        price: this.storeStore.item.item.price
      }
      console.log('updateItem()()()()', updatedItem)
      this.storeStore.updateItem(updatedItem)
    }
    
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