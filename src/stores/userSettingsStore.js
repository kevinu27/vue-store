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
    async getSettings(id) {
        if (!id) {
          console.warn("ID inválido para getSettings");
          return;
        }
      
        try {
          const response = await axios.get(`http://127.0.0.1:5000/UserRoleSettings/${id}`);
          console.log('UserRoleSettings Response:', response);
          this.userSettings = response.data; // Ojo: .data, no el response completo
      
        } catch (error) {
          console.error('Error al obtener configuraciones:', error);
          this.responseMessage = 'No se pudo obtener la configuración del usuario.';
        }
      },
    

}

})