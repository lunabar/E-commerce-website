// createRouter 创建router实例对象
// createWebHistory： 创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category,
        },
        {
          path: 'category/sub/:id',
          component: SubCategory,
        }
      ]
      
    },
    {
      path: '/login',
      component: Login,
    }
    
  ],
  // 路由行为定制
  scrollBehavior () {
    // 切换路由的时候，自动滚动条回到顶部
    return {
      top: 0,
    }  
  }
})

export default router
