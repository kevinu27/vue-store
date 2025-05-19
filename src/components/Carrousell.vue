<template>
  <div class="carousel-container">
    <button class="arrow left" @click="scrollLeft">&#8592;</button>

    <div class="carousel-view">
      <div class="carousel-track" :style="{ transform: `translateX(${position}px)` }">
        <div v-for="store in this.storeStore.stores" class="store-card carousel-item"  :key="store.id">
          <div  @click="() => enterStore(store.id)">
            {{ store.name }}

          </div>
        </div>
      </div>
    </div>

    <button class="arrow right" @click="scrollRight">&#8594;</button>
  </div>
</template>

<script>
import { userSettingsStore } from '@/stores/userSettingsStore';
import { useAuthStore } from '@/stores/authStore';
import { usestoreStore } from '@/stores/storeStore';
import StoreCard from '@/components/StoreCard.vue'

  export default {
  name: 'Carousel',
  data() {
    return {
      items: Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`),
      position: 0,
      itemWidth: 220, // ancho del item + márgenes
      visibleItems: 3,
      storeStore: usestoreStore(), // Inicializamos el store en data()

    };
  },
  methods: {
    scrollLeft() {
      this.position = Math.min(this.position + this.itemWidth * this.visibleItems, 0)
    },
    scrollRight() {
      const maxScroll = -(this.itemWidth * (this.items.length - this.visibleItems))
      this.position = Math.max(this.position - this.itemWidth * this.visibleItems, maxScroll)
    },
    enterStore(id){
      console.log('click en elstore card store.id', id)
      this.$router.push(`/store/${id}`)

    }
  }
};
</script>

<style scoped>


.carousel-container {
  position: relative;
  width: 100%;
  margin: auto;
  overflow: hidden;
  /* background: #111; */
  padding: 20px 0;
  border: 2px solid red;
}

.carousel-view {
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.4s ease;
}

.carousel-item {
  min-width: 200px;
  height: 120px;
  margin: 0 10px;
  background: #333;
  border-radius: 8px;
  color: white;
  text-align: center;
  line-height: 120px;
  font-size: 20px;
  flex-shrink: 0;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
}

.arrow.left {
  left: 0;
}

.arrow.right {
  right: 0;
}

</style>