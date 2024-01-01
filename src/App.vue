<script setup>
// import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
// import {getCategoryAPI} from '@/apis/testApi.js'


// onMounted(async() => {
//   const res = await getCategoryAPI()
//   console.log(res.data)
// })




</script>

<template>
  <RouterView/>
  <div class="g">gidle</div>
</template>

<style scoped lang='scss'>
  .g{
    color: $helpColor;
  }
</style>
