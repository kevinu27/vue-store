<script>
import Modal from './Modal.vue'
import { useAuthStore } from '@/stores/authStore';


// return { authStore };

export default {
  components: { Modal },
  data() {
    return {
      authStore: useAuthStore() // Inicializamos el store en data()
    };
  },


  methods: {

    ShowLoginRegister() {
      console.log('ShowLoginRegister')
      // this.showModal = !this.showModal
      this.authStore.ShowloginModal()
    }
  }
};
</script>
<template>
  <div class="nav-bar">

    <div> LOGO</div>
    <div> barra de busquedad</div>
    <div> ubicación</div>
    <div @click="ShowLoginRegister()"> tu cuenta/logea popover</div>
    <div> pedidos</div>
    <div> cart</div>
    <Modal  v-if="authStore.loginModal" >
    </Modal>

  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

.nav-bar {
  display: flex;
  justify-content: space-around;
}
</style>
