import { defineStore } from 'pinia'
import {
  accountLogin,
  getUserInfoById,
  getUserMenusByRoleId,
} from '@/service/login'
import { ElMessage } from 'element-plus'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? [],
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

        ElMessage.success('登陆成功')

        // 跳转
        await router.push('/main')
      } catch (e: any) {
        ElMessage.error(`登录失败${e.response.data}`)
      }
    },
  },
})

export default useLoginStore
