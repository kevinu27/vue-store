<script setup>
import TheWelcome from './components/TheWelcome.vue'
import NavBar from './components/NavBar.vue';
</script>

<template>
  <header>

    <div class="header">
      <NavBar></NavBar>
    </div>

  </header>

  <main class="main">
    <p>----------------------</p>
    <!-- <TheWelcome /> -->
     kajlkdsjsalkj
     <router-view></router-view>
  </main>
</template>

<style scoped>

.header {
  /* border: 2px solid red; */
}
.main{
  background-color: red;
}

</style>
