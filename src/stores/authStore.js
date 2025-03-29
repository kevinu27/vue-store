import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loginModal: false
  }),
  actions: {
    login(userData) {
      this.user = userData;
      this.isAuthenticated = true;
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
    ShowloginModal() {
    //   this.user = null
    console.log('en el store en la funcion ShowloginModal')
      this.loginModal= !this.loginModal
  }}
})