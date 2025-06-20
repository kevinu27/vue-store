import { defineStore } from 'pinia';
import axios from 'axios'
import { userSettingsStore } from '@/stores/userSettingsStore'
import { cartStore } from './cartStore';
 

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loginModal: false,
    email: null,
    id: null
  }),
  actions: {
    login(userData) {
      this.user = userData;
      this.isAuthenticated = true;
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("jwt")
      this.email = null;
      this.id = null;
    },
    ShowloginModal() {
      console.log('en el store en la funcion ShowloginModal')
      this.loginModal= !this.loginModal
  },
    getUserId(){
      return this.id
  },

   async loginIn(email, password){
        const loginForm ={ email: email, password: password}
        const API_URL = "http://127.0.0.1:5000"
        console.log('loginForm', loginForm)

        try {
            const response = await axios.post(`${API_URL}/login`, loginForm)
            console.log('Response:', response)
            this.responseMessage = 'Form submitted successfully!'
            console.log('response.data.access_token', response.data.access_token)
            localStorage.setItem("jwt", response.data.access_token)
            this.id = response.data.user_id
            this.email = response.data.email
            console.log('----response.data.id - this.id ****',this.id )
            const userSettings = userSettingsStore()
            userSettings.getSettings(this.id)
            this.isAuthenticated = true
            this.ShowloginModal()

        } catch (error) {
            console.error('Error submitting form:', error)
            this.responseMessage = 'Failed to submit the form.'
      } 
    },
    async registerIn(email, password, userType){
      const registerForm ={ email: email, password: password, userType: userType}
      const API_URL = "http://127.0.0.1:5000"

      try {
          const response = await axios.post(`${API_URL}/register`, registerForm)
          console.log('Response:---', response)
          this.responseMessage = 'Form submitted successfully!'

      } catch (error) {
          console.error('Error submitting form:', error)
          this.responseMessage = 'Failed to submit the form.'
    } 
  },
    async getUserData(){
      console.log('////////////////////***********************************************//////////////////////')
        const token = localStorage.getItem("jwt")
    
        if (!token) {
            console.log( "Not Authenticated ❌")
            return;
        }


        const API_URL = "http://127.0.0.1:5000"
        const response = await fetch(`${API_URL}/userData`, {  
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    
        if (response.ok) {
            const userData = await response.json();
            this.email = userData.email
            console.log('userData.id---------------------------------------------------------------', userData.id)
            this.id = userData.id
            const cart = cartStore()
            cart.getItemsInYourCart(userData.id)
            const userSettings = userSettingsStore()
            // userSettings.getSettings(this.id)
            userSettings.getSettings(userData.id)
            this.isAuthenticated = true;
            
        } else {
            // localStorage.removeItem("jwt")  // Remove invalid token
            console.log( "Not Authenticated ❌")
        }

    }

}

})