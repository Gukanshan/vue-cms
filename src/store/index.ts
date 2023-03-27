import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from '@/store/login/login'

const pinia = createPinia()

function registerStore(app: App) {
  app.use(pinia)

  // 加载本地数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}
export default registerStore
