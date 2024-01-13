import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { lazyPlugin } from '@/directives/index.js'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 引入初始化样式文件
import  '@/styles/common.scss'

import { componentPlugin } from './components/index.js'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')




