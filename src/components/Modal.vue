<template>
    <div class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop >
        <h3 @click="closeModal" class="closingX">X</h3>
        <p>dsdff</p>
        <div class="actions">
            <div class="inputs">
                <input v-model="email">
                <input v-model="password">
                <div > <p @click="goToRegister" :style="{ cursor: 'pointer' }">Not registered yet?</p></div>
            </div>
          <button class="login-click" @click="loginStore" >loginStore</button>
        </div>
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
      responseMessage: ''
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
        
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
  .actions {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .closingX{
    width: fit-content;
    cursor: pointer;
  }

  .inputs{
    display: flex;
    flex-direction: column;
    input {
        margin-bottom: 1rem;
    }
  }
  .login-click{
    margin-left: 1rem;
    height: fit-content;
  }

  </style>
  