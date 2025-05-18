<script>



export default {
  name: 'StoreCard',
  props: {
    store: {
      type: Object,
      required: true
    }
  }
}


</script>
<template>
<div class="store-card">
{{ store.name }}
</div>

</template>

<style scoped>
.store-card{

}
</style>
