<script setup>
import LayoutNav from "./components/LayoutNav.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutFixed from "./components/LayoutFixed.vue";
import {useCategoryStore} from '@/stores/category.js'
import {onMounted} from 'vue'

// 触发获取导航列表的action, 就能得到category的信息了，所以在组件的父件触发一次action，向axios发送一次请求
// 不然后面两个组件每次都为了得到相同的数据，发送一次请求，造成性能损耗
const categoryStore =  useCategoryStore()
onMounted(() => {
    categoryStore.getCategory()
    console.log(categoryStore)
})

</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>