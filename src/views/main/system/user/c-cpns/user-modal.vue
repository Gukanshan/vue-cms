<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" :title="isNewRef ? '新建用户' : '编辑用户'" width="30%" center @close="handleClose">
      <div class="form">
        <el-form :model="formData" label-width="100px" :rules="rules" ref="formRef">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入电话号码" :maxlength="11" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
              <el-option v-for="item in entireRoles" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择角色" prop="departmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
              <el-option v-for="item in entireDepartments" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'

const rules = {
  name: { required: true, message: '请录入', trigger: 'blur' },
  realname: { required: true, message: '请录入', trigger: 'blur' },
  password: { required: true, message: '请录入', trigger: 'blur' },
  cellphone: { required: true, message: '请录入', trigger: 'blur' },
  roleId: { required: true, message: '请录入', trigger: 'change' },
  departmentId: { required: true, message: '请录入', trigger: 'change' },
}

const dialogVisible = ref(false)
const isNewRef = ref(false)
const editData = ref()
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: '',
})

const mainStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)
function setModalVisible(isNew = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    for (const key in itemData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    for (const key in formData) {
      if (key !== 'id') {
        formData[key] = ''
      } else {
        delete formData?.id
        delete formData?.enable
      }
    }
  }
}

const systemStore = useSystemStore()
const formRef = ref()
function handleConfirmClick() {
  formRef.value.validate((res) => {
    if (res) {
      if (isNewRef.value) {
        systemStore.addUsersAction(formData)
      } else {
        systemStore.editUsersAction(editData.value.id, formData)
      }
      formRef.value.resetFields()
      dialogVisible.value = false
    }
  })
}

function handleClose() {
  formRef.value.resetFields()
}

defineExpose({
  setModalVisible,
})
</script>

<style scoped lang="less">
.form {
  width: 60%;
  margin: 0 auto;
}
</style>
