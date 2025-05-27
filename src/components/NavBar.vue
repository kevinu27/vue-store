<script>
import Modal from './Modal.vue'
import { useAuthStore } from '@/stores/authStore'
import { userSettingsStore } from '@/stores/userSettingsStore'
import { cartStore } from '@/stores/cartStore'
import PopoverUser from "./PopoverUser.vue"
import Cart from './Cart.vue';
import SearchBar from './SearchBar.vue';

// return { authStore };

export default {
  components: { Modal, PopoverUser, Cart, SearchBar },
  data() {
    return {
      authStore: useAuthStore(), // Inicializamos el store en data()
      userSettingsStore: userSettingsStore(),
      cartStore: cartStore()
    }
  },


  methods: {
     navigateTo(path) {
      console.log('navigateto')
      this.$router.push(path)
}
  },
 async mounted() {
    console.log('this.authStore.id NAVBAR',this.authStore.id)
    const token = localStorage.getItem("jwt")
    if (token) {
      console.log("authenticado")
      this.authStore.getUserData()
      this.userSettingsStore.getSettings(this.authStore.id)
    } else {
      console.log("No authenticad")
    }
}
};
</script>
<template>
  <div class="nav-bar">

    <div @click="navigateTo('/')"> LOGO</div>
    <SearchBar></SearchBar>
    <div> ubicación</div>
    <!-- <div @click="ShowLoginRegister()"> tu cuenta/logea popover</div> -->
    <!-- <div v-if="authStore.userName"> {{ authStore.userName }}</div> -->
    <Modal  v-if="authStore.loginModal" >
    </Modal>
    <PopoverUser></PopoverUser>
    <router-link to="/about">About</router-link>
    <Cart></Cart>


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
