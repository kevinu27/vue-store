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
      <button>
        +
      </button>
    </div>
  </template>

<script>
import { userSettingsStore } from '@/stores/userSettingsStore';
import { useAuthStore } from '@/stores/authStore';

  export default {
    data() {
    return {
      authStore: useAuthStore(), // Inicializamos el store en data()
      settingsStore: userSettingsStore(), // Inicializamos el store en data()
      email: "",
      isSeller: false,
    };
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
      }
    },
    mounted() {
    console.log(`the component UserAccount is now mounted.`)
    console.log(`the component UserAccount is now mounted -----settingsStore.`, this.settingsStore)

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
</style>