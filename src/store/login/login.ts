import { defineStore } from 'pinia'
import { accountLogin, getUserInfoById, getUserMenusByRoleId } from '@/service/login'
import { ElMessage } from 'element-plus'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '@/store/main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      try {
        const res = await accountLogin(account)
        const id = res.data.id
        const name = res.data.name
        this.token = res.data.token
        localCache.setCache(LOGIN_TOKEN, this.token)

        // 获取用户信息
        const userInfoResult = await getUserInfoById(id)
        this.userInfo = userInfoResult.data
        // 获取对应菜单
        const userMenusResult = await getUserMenusByRoleId(id)
        this.userMenus = userMenusResult.data

        // 保存token
        localCache.setCache('userInfo', userInfoResult.data)
        localCache.setCache('userMenus', userMenusResult.data)

        // 请求公共数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
        //动态添加路由
        const routes = mapMenusToRoutes(userMenusResult.data)
        routes.forEach((route) => router.addRoute('main', route))

        ElMessage.success('登陆成功')

        // 跳转
        await router.push('/main')
      } catch (e: any) {
        ElMessage.error(`登录失败${e.response.data}`)
      }
    },

    async loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')

      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    },
  },
})

export default useLoginStore
