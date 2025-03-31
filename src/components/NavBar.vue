<script>
import Modal from './Modal.vue'
import { useAuthStore } from '@/stores/authStore'
import PopoverUser from "./PopoverUser.vue"

// return { authStore };

export default {
  components: { Modal, PopoverUser },
  data() {
    return {
      authStore: useAuthStore() // Inicializamos el store en data()
    }
  },


  methods: {

    // ShowLoginRegister() {
    //   console.log('ShowLoginRegister')
    //   this.authStore.ShowloginModal()
    // },
     navigateTo(path) {
      console.log('navigateto')
      this.$router.push(path)
}
  },
  mounted() {
    console.log('------------------------onMounted')
    const token = localStorage.getItem("jwt")
            if (token) {
                console.log("authenticad")
              this.authStore.getUserData()
            } else {
              console.log("No authenticad")

            }

  }
};
</script>
<template>
  <div class="nav-bar">

    <div @click="navigateTo('/')"> LOGO</div>
    <div> barra de busquedad</div>
    <div> ubicación</div>
    <!-- <div @click="ShowLoginRegister()"> tu cuenta/logea popover</div> -->
    <div> pedidos</div>
    <!-- <div v-if="authStore.userName"> {{ authStore.userName }}</div> -->
    <div> cart</div>
    <Modal  v-if="authStore.loginModal" >
    </Modal>
    <PopoverUser></PopoverUser>
    <router-link to="/about">About</router-link>
    <div v-if="authStore.isAuthenticated" @click="authStore.logout"> Logout</div>

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

/* @media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */

.nav-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
