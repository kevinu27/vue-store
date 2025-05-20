<template>
    <div>
      <h1>Store view Page</h1>
      <p>Welcome to the Store page!</p>
      <div v-if="storeStore.store && storeStore.store.store">
        {{ storeStore.store.store.id }}
        {{ storeStore.store.store.name }}
      </div>
      <h3>Add item to the store</h3>
      <button @click="addItem">+</button>
      
      <div v-if="addIsVisible">
        <input type="text" placeholder="item name" v-model="itemName">
        <input type="text" placeholder="item descripcion" v-model="itemDescription">
        <input type="number"  placeholder="item price" v-model="itemPrice">
        <button @click="createItem">add item</button>
      </div>

      <h3>
        store Items
      </h3>
      <div v-if="storeStore.items.length > 0">
        <div v-for="item in this.storeStore.items" class="store-card carousel-item"  :key="item.id">

          <div class="itemcards">
            <div class="itemcard">
            item: {{ item.name }}
            description:{{ item.description }}
            price: {{ item.price }}
          </div>
        </div>
      </div>


      </div>
    </div>
  </template>

<script>
import { usestoreStore } from '@/stores/storeStore';


  export default {
  data() {
  return {
    storeStore: usestoreStore(),
    store: null,
    addIsVisible: false,
    itemName: null,
    itemDescription: null, 
    itemPrice: null
  };
},

  methods: {
    addItem(){
      console.log('add item')
      this.addIsVisible = !this.addIsVisible
    },
    createItem(){
      console.log('create item')
      const itemInfo = {
        storeid: this.$route.params.id,
        itemName: this.itemName,
        itemDescription: this.itemDescription, 
        itemPrice: this.itemPrice
      }
      console.log('item bjetct',itemInfo)
      this.storeStore.createItem(itemInfo)
    },
    
  },
  mounted(){
    console.log('mounted - sthis.$route.params.id')
    this.storeStore.getStore(this.$route.params.id)
    this.storeStore.getAllTheStoreItem(this.$route.params.id)

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