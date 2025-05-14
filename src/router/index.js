import { createRouter, createWebHistory } from 'vue-router'

// Import your components (these will be the pages)
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import CartView from '@/views/CartView.vue'
import Register from '@/views/Register.vue'

// Define routes
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/cart', component: CartView },
  { path: '/register', component: Register }
]

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
