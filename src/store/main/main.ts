import { defineStore } from 'pinia'
import { getEntireDepartment, getEntireRoles } from '@/service/main/main'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}
const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
  }),
  actions: {
    async fetchEntireDataAction() {
      const roles = await getEntireRoles()
      const departments = await getEntireDepartment()

      this.entireRoles = roles.data.list
      this.entireDepartments = departments.data.list
    },
  },
})

export default useMainStore
