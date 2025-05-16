import { defineStore } from 'pinia';
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
 

export const userSettingsStore = defineStore('userSettings', {
  state: () => ({
    userSettings: null,
  }),
  actions: {
    login(userData) {
      this.user = userData;
      this.isAuthenticated = true;
    },
    async getSettings(id){
        console.log("getSettings email1234567", id)

        const ids =  {id: id}
        const API_URL = "http://127.0.0.1:5000"
        
        try {
            const response = await axios.get(`${API_URL}//UserRoleSettings/${id}`)
            console.log('UserRoleSettings Response:', response)
            this.userSettings = response

        } catch (error) {
            console.error('Error submitting form:', error)
            this.responseMessage = 'Failed to submit the form.'
      } 

    },
    

}

})