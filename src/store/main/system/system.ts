import { defineStore } from 'pinia'
import { addUser, deleteUserById, editUserById, postUsersListData } from '@/service/main/system/system'
import type { IUser, ISystemState } from '@/store/main/system/types'
import { ElMessage } from 'element-plus'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      const res = await deleteUserById(id)
      if (res.code === 0) {
        ElMessage.success(res.data)
        this.postUsersListAction({ offset: 0, size: 10 })
      } else {
        ElMessage.warning(res.data)
      }
    },
    async addUsersAction(userInfo: any) {
      const res = await addUser(userInfo)
      if (res.code === 0) {
        ElMessage.success(res.data)
        this.postUsersListAction({ offset: 0, size: 10 })
      } else {
        ElMessage.warning(res.data)
      }
    },
    async editUsersAction(id: number, userInfo: any) {
      const res = await editUserById(id, userInfo)
      if (res.code === 0) {
        ElMessage.success(res.data)
        this.postUsersListAction({ offset: 0, size: 10 })
      } else {
        ElMessage.warning(res.data)
      }
    },
  },
})

export default useSystemStore
