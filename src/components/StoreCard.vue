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
  border: 1px solid gray;
  border-radius: 5px;
  margin: 1rem;
  padding: 1rem;
  text-align: center;
  min-width: 150px;

}
</style>
