import { defineStore } from 'pinia';
import axios from 'axios'
 

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loginModal: false,
    userName: null
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
      this.userName = null;
    },
    ShowloginModal() {
      console.log('en el store en la funcion ShowloginModal')
      this.loginModal= !this.loginModal
  },

   async loginIn(username, password){
        const loginForm ={ username: username, password: password}
        const API_URL = "http://127.0.0.1:5000"

        try {
            const response = await axios.post(`${API_URL}/login`, loginForm)
            console.log('Response:', response)
            this.responseMessage = 'Form submitted successfully!'
            console.log('response.data.access_token', response.data.access_token)
            localStorage.setItem("jwt", response.data.access_token)
            this.userName = response.data.username
            this.isAuthenticated = true
            this.ShowloginModal()
        } catch (error) {
            console.error('Error submitting form:', error)
            this.responseMessage = 'Failed to submit the form.'
      } 
    },
    async registerIn(username, password){
      const registerForm ={ username: username, password: password}
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
        console.log('----getUserData-----')
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
            this.userName = userData.username
            this.isAuthenticated = true;
            
        } else {
            localStorage.removeItem("jwt")  // Remove invalid token
            console.log( "Not Authenticated ❌")
        }

    }

}

})