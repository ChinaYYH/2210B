// 引入vant样式
import 'vant/lib/index.css'
// 引入公共样式
import './styles/main.scss'

import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import pinia from './stores'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(pinia)

// 引入权限文件
import './permission'

app.mount('#app')
