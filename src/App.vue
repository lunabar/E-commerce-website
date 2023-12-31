<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import {getCategoryAPI} from '@/apis/testApi'

onMounted(async() => {
  const res = await getCategoryAPI()
  console.log(res.data)
})




</script>

<template>
  <el-button type="primary">Primary</el-button>
</template>

<style scoped>

</style>
