<template>
    <div class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop >
        <h3 @click="closeModal" class="closingX">X</h3>
        <p>dsdff</p>
        <div class="actions">
            <div class="inputs">
                <input v-model="email">
                <input v-model="password">
                <div > <p @click="goToRegister">Not registered yet?</p></div>
            </div>
          <button class="login-click" @click="loginClick">Login</button>
          <button class="login-click" @click="loginClickAxios">loginClickAxios</button>
          <button class="login-click" @click="loginStore">loginStore</button>
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
      async  loginClick(){
        console.log(this.email)
        console.log(this.password)
        const username= this.email 
        const password=this.password 
        const loginForm ={ username: this.email, password: this.password }
        const API_URL = "http://127.0.0.1:5000"

        const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const data = await response.json()
            console.log('data-----', data)
            if (data.access_token) {
                localStorage.setItem("jwt", data.access_token)
                alert("Login successful!")
            } else {
                alert("Login failed!")
            }
      },

      async  loginClickAxios(){
        const loginForm ={ username: this.email, password: this.password }
        const API_URL = "http://127.0.0.1:5000"

        try {
            const response = await axios.post(`${API_URL}/login`, loginForm)
            console.log('Response:', response.data)
            localStorage.setItem("jwt", response.access_token)

            this.responseMessage = 'Form submitted successfully!'
        } catch (error) {
            console.error('Error submitting form:', error)
            this.responseMessage = 'Failed to submit the form.'
      }
      },
      async  loginStore(){
        // const loginForm ={ username: this.email, password: this.password }
        // const API_URL = "http://127.0.0.1:5000"

        this.authStore.loginIn(this.email, this.password)
      },
      goToRegister(){
        console.log('goToRegister')
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
  