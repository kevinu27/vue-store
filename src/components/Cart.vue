<script>
import { useAuthStore } from '@/stores/authStore'
import { usestoreStore } from '@/stores/storeStore';
import { cartStore } from '@/stores/cartStore';


// return { authStore };

export default {
  components: {},
  data() {
    return {
      authStore: useAuthStore(),
      storeStore: usestoreStore(),
      cartStore: cartStore()
    }
  },


  methods: {
     navigateTo(path) {
      console.log('navigateto') // aqui poner la url lavista del compra
      this.$router.push(path)
    }
  },
  mounted() {

  }
};
</script>
<template>

    <div class="icon-wrapper"  @click="navigateTo('/cart')">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span class="item-count">{{ cartStore.itemsIds ? cartStore.itemsIds.length : 0 }}</span>
    </div>
    <div>
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

.cart-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.icon-wrapper {
  position: relative;
}

.item-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e53e3e;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.cart-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 8px;
  width: 300px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 1rem;
}

.cart-items {
  max-height: 300px;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.remove-btn {
  color: #e53e3e;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
}

.cart-total {
  margin-top: 1rem;
  text-align: right;
}

.checkout-btn {
  margin-top: 1rem;
  width: 100%;
  background-color: #3182ce;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.checkout-btn:hover {
  background-color: #2c5282;
}

.empty-cart {
  text-align: center;
  padding: 1rem;
  color: #718096;
}
</style>
