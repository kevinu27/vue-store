<script>
import { useAuthStore } from '@/stores/authStore'


// return { authStore };

export default {
  components: {},
  data() {
    return {
      authStore: useAuthStore(), // Inicializamos el store en data()
      ProductCategories: ['All', 'Electronic','Computers', 'Home', 'Books']
    }
  },


  methods: {

  },
  mounted() {

  }
};
</script>
<template>
  <div class="header">
    <div class="search-container">
      <select class="category-select" >
        <option  v-for="(Category, index) in ProductCategories">{{ Category }}</option>
      </select>
      <input type="text" class="search-input" placeholder="Search products...">
      <button class="search-button">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </button>
    </div>
  </div>
  
  



</template>

<style scoped>
  * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }
/*     
    body {
      background-color: #f5f5f5;
      padding: 20px;
    } */
    
    .header {
      /* background-color: #131921; */
      padding: 10px 20px;
      border-radius: 4px;
      width:50%;
    }
    
    .search-container {
      display: flex;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .category-select {
      background-color: #f3f3f3;
      border: 1px solid #cdcdcd;
      border-right: none;
      border-radius: 4px 0 0 4px;
      padding: 0 10px;
      color: #555;
      cursor: pointer;
    }
    
    .search-input {
      flex-grow: 1;
      padding: 10px 15px;
      /* border: none; */
      font-size: 16px;
      height: 40px;
    }
    
    .search-button {
      width: 45px;
      height: 40px;
      background-color: #febd69;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .search-button:hover {
      background-color: #f3a847;
    }
    
    .search-icon {
      width: 20px;
      height: 20px;
      fill: #333;
    }
</style>
