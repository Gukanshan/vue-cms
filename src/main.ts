import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import store from './store'
import registerIcons from '@/global/register-icons'

// import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/el-message.css'

const app = createApp(App)

app.use(registerIcons)
app.use(store)
app.use(router)
app.mount('#app')
