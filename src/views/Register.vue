<template>
    <div>
      <h1>Register Page</h1>
      <p>Welcome to the Register page!</p>
      <div class="register">
            <div class="inputs">
                <input v-model="email">
                <input v-model="password">
                <!-- <input v-model="bussineType" placeholder="bussineType"> si es store o si es cliente -->
                <label for="miSelect">tipo de usuario:</label>
                <select id="miSelect" v-model="userType">
                  <option value="vendedor">vendedor</option>
                  <option value="comprador">comprador</option>
                </select>
                <p>Opción elegida: {{ userType }}</p>
                <div > <p @click="goToRegister" :style="{ cursor: 'pointer' }">Not registered yet?</p></div>
            </div>
          <button class="login-click" @click="register" >Register</button>
        </div>
    </div>
  </template>

<script>
import { useAuthStore } from '@/stores/authStore';
import { userSettingsStore } from '@/stores/userSettingsStore';
import axios from 'axios'

  export default {
    data() {
    return {
      authStore: useAuthStore(), // Inicializamos el store en data()
      email: "",
      password: "",
      userType: ""
    };
  },

    methods: {
      register() {
            console.log('registering...')

            this.authStore.registerIn(this.email, this.password, this.userType)
            this.$router.push("/")
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