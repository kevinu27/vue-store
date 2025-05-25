<template>
      <div ref="scrollContainer" class="scroll-container" @scroll.passive="handleScroll">
      <h1>Home Page</h1>
      <p>Welcome to the Home page!</p>
      <p>Slider</p>
      <p>Items</p>
      <div v-if="items">
        <div v-for="item in items" :key="item.id" class="item">
          <div class="itemCard">

            {{ item }}
          </div>
    </div>
        
      </div>

    </div>
  </template>

<script>
import { usestoreStore } from '@/stores/storeStore';
import axios from 'axios'


  export default {
  data() {
  return {
    storeStore: usestoreStore(),
    store: null,
    addIsVisible: false,
    itemName: null,
    itemDescription: null, 
    itemPrice: null,
    itemspaginados: null,
    items:[],
    page: 1,
    totalpages:2,
    loading: false,
  };
},

  methods: {
    async getItemsLazyLoading(){

      if (this.loading || this.page > this.totalpages) return
      this.loading = true

      const API_URL = "http://127.0.0.1:5000"
      const token = localStorage.getItem("jwt")
      console.log('this.page', this.page)

          try {
            const response = await axios.get(`${API_URL}/items_paginated?page=${this.page}&per_page=4`)
            
            this.items.push(...response.data.items)
            this.totalpages = response.data.pages
            this.page = this.page +1
            console.log('this.totalpages------------', this.totalpages)
            console.log('this.items----------', this.items)
            console.log('data----', response.data)
            
          } catch (error) {
            console.error('Error al obtener items:', error)
          } finally {
            this.loading = false; // 👈 Se reinicia siempre
          }
        

    },
    handleScroll(){
      // console.log('lazyloading....')
      const el = this.$refs.scrollContainer
      if (!el) return

      const nearBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 50
      if (nearBottom && !this.loading) {
        this.getItemsLazyLoading()
      }
    },

    
  },
   mounted(){
    // GET /items_paginated?page=2&per_page=5
    this.getItemsLazyLoading()
  }
};
</script>

<style scoped>
.scroll-container {
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #ccc;
}
.item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  border: 2px solid green;

}
.loading {
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  border: 2px solid green;
}

.itemCard{
  margin-bottom: 30px;
  border: 2px solid red;

}
</style>