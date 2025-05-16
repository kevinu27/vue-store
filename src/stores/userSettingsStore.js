import { defineStore } from 'pinia';
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
 

export const userSettingsStore = defineStore('userSettings', {
  state: () => ({
    userSettings: null,
    isSeller: null
  }),
  actions: {
    login(userData) {
      this.user = userData;
      this.isAuthenticated = true;
    },
    async getSettings(id) {
        if (!id) {
          console.warn("ID inválido para getSettings")
          return;
        }
      
        try {
          const response = await axios.get(`http://127.0.0.1:5000/UserRoleSettings/${id}`)
          console.log('UserRoleSettings Response:', response);
          this.userSettings = response.data.roleSettings // Ojo: .data, no el response completo
        console.log(' this.userSettings---!!!----',  this.userSettings)
        } catch (error) {
          console.error('Error al obtener configuraciones:', error);
          this.responseMessage = 'No se pudo obtener la configuración del usuario.';
        }
      },
      async setSeller(id) {
        console.log('setSeller en el userSettingstore')
        console.log('setSeller en el userSettingstore ----- id', {id:id})
        const API_URL = "http://127.0.0.1:5000"

        try {
          const response = await axios.post(`${API_URL}/setseller`, {id:id})
          console.log('UserRoleSettings Response:', response);
          this.userSettings = response.data.roleSettings // Ojo: .data, no el response completo
          console.log('999999this.userSettings ---------this.userSettings ', this.userSettings )
        //   this.isSeller = true
        } catch (error) {
          console.error('Error al obtener configuraciones:', error);
          this.responseMessage = 'No se pudo obtener la configuración del usuario.';
        }
      },

}

})