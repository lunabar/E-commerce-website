import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout.js'

// pinia存放的是共享的state和action

export const useCategoryStore = defineStore('category', () => {
  // 导航列表的数据管理
  // state导航列表数据
  const categoryList = ref([])

  // action获取导航数据的方法
  const getCategory = async() => {
    const res = await getCategoryAPI()
    categoryList.value = res.data.result
  }

  return {categoryList, getCategory}
})
