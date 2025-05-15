<template>
    <div>
      <h1>Register Page</h1>
      <p>Welcome to the Register page!</p>
      <div class="register">
            <div class="inputs">
                <input v-model="email">
                <input v-model="password">
                <input v-model="bussineType" placeholder="bussineType"> <!-- si es store o si es cliente -->

                <div > <p @click="goToRegister" :style="{ cursor: 'pointer' }">Not registered yet?</p></div>
            </div>
          <button class="login-click" @click="register" >Register</button>
        </div>
    </div>
  </template>

<script>
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios'

  export default {
    data() {
    return {
      authStore: useAuthStore(), // Inicializamos el store en data()
      email: "",
      password: "",
      bussineType: ''
    };
  },

    methods: {
      register() {
            console.log('registering...')
            this.authStore.registerIn(this.email, this.password)
      },
      
    }
  };
  </script>
<style scoped>
    .register {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .inputs{
    display: flex;
    flex-direction: column;
    input {
        margin-bottom: 1rem;
    }
  }
</style>