<template>
  <div class="user-content">
    <div class="header">
      <h2>用户列表</h2>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />
        <el-table-column align="center" prop="name" label="用户名" width="150px" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="120px" />
        <el-table-column align="center" prop="cellphone" label="手机号码" width="150px" />
        <el-table-column align="center" prop="enable" label="状态" width="100px">
          <template #default="scope">
            <el-button size="small" :type="scope.row.enable ? 'success' : 'danger'" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="操作" width="180px">
          <template #default="scope">
            <el-button size="small" icon="Edit" type="primary" text @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" icon="Delete" type="danger" text @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

const emits = defineEmits(['newClick', 'editClick'])

const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()

// table data
const { usersList, usersTotalCount } = storeToRefs(systemStore)

function handleSizeChange() {
  fetchUserListData()
}

function handleCurrentChange() {
  fetchUserListData()
}

function fetchUserListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * 10
  const pageInfo = { size, offset }

  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUsersListAction(queryInfo)
}

function handleDelete(id) {
  systemStore.deleteUserByIdAction(id)
}

function handleEdit(user) {
  const { id, name, realname, cellphone, enable, roleId, departmentId } = user
  const formData = {
    id,
    name,
    realname,
    cellphone,
    enable,
    roleId,
    departmentId,
  }
  emits('editClick', formData)
}

function handleNewUserClick() {
  emits('newClick')
}

defineExpose({
  fetchUserListData,
})
</script>

<style lang="less" scoped>
.user-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
