<template>
    <div>
      <h1>Store view Page</h1>
      <p>Welcome to the Store page!</p>
      <div v-if="storeStore.store && storeStore.store.store">
        {{ storeStore.store.store.id }}
      </div>
    </div>
  </template>

<script>
import { usestoreStore } from '@/stores/storeStore';


  export default {
  data() {
  return {
    storeStore: usestoreStore(),
    store: null
  };
},
  methods: {
    register() {

    },
    
  },
  mounted(){
    console.log('mounted - sthis.$route.params.id')
    this.storeStore.getStore(this.$route.params.id)
  }
};
</script>
