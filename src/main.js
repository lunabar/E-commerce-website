import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { lazyPlugin } from '@/directives/index.js'
import App from './App.vue'
import router from './router'

// 引入初始化样式文件
import  '@/styles/common.scss'

import { componentPlugin } from './components/index.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')




