<template>
    <div>
      <h1>UserAccount Page</h1>
      <!-- <p>Welcome to the UserAccount page!22222</p> -->
    </div>
    {{ settingsStore.userSettings?.isSeller }}
    <!-- <div v-if="!userSettingsStore.userSettings.isSeller"> -->
      <div>
      want to be a seller? 
      <button @click="setAsSeller">
        start now
      </button>
    </div>
    <div>
      <p>create an store </p>      
      <button>
        +
      </button>
    </div>
  </template>

<script>
import { userSettingsStore } from '@/stores/userSettingsStore';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios'

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
        console.log('set as seller')
      }
    },
    mounted() {
    console.log(`the component UserAccount is now mounted.`)
    console.log(`the component UserAccount is now mounted -----settingsStore.`, this.settingsStore)

  }
  };
  </script>