<template>
    <div>
      <h1>UserAccount Page</h1>

    </div>

    <div class="account-inputs">
      <!-- <input type="checkbox" v-model="settingsStore.userSettings.isSeller"> -->
      <input type="text" :placeholder="settingsStore.userSettings?.address ">
      {{ settingsStore.userSettings?.isSeller }}
      {{ settingsStore.userSettings?.address }}
    </div>


    <div v-if="!settingsStore.userSettings.isSeller">
      want to be a seller? 
      <button @click="setAsSeller">
        start now
      </button>
    </div>
    <div v-if="settingsStore.userSettings.isSeller">
      <p>create an store </p>      
      <button  @click="openCreateStoreMenu">
        +
      </button>
      <div v-if="createStoreVisibility">
        <input type="text" placeholder="Store name" v-model="storename">
        <button @click="createStore">create</button>
      </div>
      <div>
        <h3>your stores</h3>
        <div class="store-cards" v-if="this.storeStore.stores.length > 0">
          <!-- <div v-for="store in this.storeStore.stores" class="store-card carousel-item"  :key="store.id">
            <StoreCard :store="store" />
          </div> -->
          <Carrousell></Carrousell>
        </div>

      </div>
    </div>
  </template>

<script>
import { userSettingsStore } from '@/stores/userSettingsStore';
import { useAuthStore } from '@/stores/authStore';
import { usestoreStore } from '@/stores/storeStore';
import StoreCard from '@/components/StoreCard.vue'
import Carrousell from '@/components/Carrousell.vue'

  export default {
    data() {
    return {
      authStore: useAuthStore(), // Inicializamos el store en data()
      settingsStore: userSettingsStore(), // Inicializamos el store en data()
      storeStore: usestoreStore(), // Inicializamos el store en data()
      email: "",
      isSeller: false,
      createStoreVisibility: false,
      storename: null,
      stores:[],
    };
  },
  components: {
    StoreCard,
    Carrousell
  },

    methods: {
        closeModal() {
            console.log('closing modal')
            this.authStore.ShowloginModal()
      },
      async  loginStore(){
        this.authStore.loginIn(this.email, this.password)
      },
      goToRegister(){
        console.log('goToRegister')
        this.$router.push('/register')
        this.authStore.ShowloginModal()
        
      },
      setAsSeller(){
        console.log('set as seller - this.authStore.id', this.authStore)
        this.settingsStore.setSeller(this.authStore.id)
      },
      openCreateStoreMenu(){
        this.createStoreVisibility = true
      },
      createStore(){
        console.log('creating store', this.storename)
        this.storeStore.createStore(this.storename)

      },
    },
    mounted() {
    console.log(`the component UserAccount is now mounted.`)
    this.storeStore.getYourStores()

  
  }
  };
  </script>

  <style scoped>
  .account-inputs{
    display: flex;
    flex-direction: column;
  }
  .account-inputs input{
    width: 20%;
  }
  .store-cards{
    display: flex;
    justify-content: space-around;
    width: 100%;
    border: 2px solid green;
    flex-wrap: wrap;
    /* height: 800px; */
  }

</style>