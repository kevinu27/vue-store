<template>
    <div class="modal-overlay" >
      <div class="modal-content" >
        <h3 @click="closeModal" class="closingX">X</h3>
        <p>dsdff</p>
        <div class="actions">
          <button >Cancelar</button>
          <button  >sffsf</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { useAuthStore } from '@/stores/authStore';

  export default {
    data() {
    return {
      authStore: useAuthStore() // Inicializamos el store en data()
    };
  },

    methods: {
        closeModal() {
            console.log('closing modal')
            this.authStore.ShowloginModal()
      }
    }
  };
  </script>
  
  <style>
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
  </style>
  