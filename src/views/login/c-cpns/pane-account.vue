<template>
  <div class="pane-account">
    <el-form
      ref="formRef"
      label-width="56"
      :model="account"
      :rules="rules"
      status-icon
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import useLoginStore from "@/store/login/login";
import type { FormRules, ElForm } from 'element-plus'
import type { IAccount } from '@/types'
import {localCache} from "@/utils/cache";
import router from "@/router";

const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? '',
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '账号必填', trigger: 'blur' },
    {
      pattern: /^[a-z\d]{6,20}$/,
      message: '必须为6-20位数字或字母组成',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '密码必填', trigger: 'blur' },
    {
      pattern: /^[a-z\d]{3,}$/,
      message: '必须为3位以上数字或字母组成',
      trigger: 'blur',
    },
  ],
})
const formRef = ref<InstanceType<typeof ElForm>>()

const loginStore = useLoginStore()
//登录
function loginAction(isRemPwd: boolean) {
  //校验
  formRef.value?.validate((isValid) => {
    if (isValid) {

      loginStore.loginAccountAction(account).then(() => {
        if (isRemPwd) {
          localCache.setCache('name', account.name)
          localCache.setCache('password', account.password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })

    } else {

      console.log('验证失败')
      ElMessage.error('表单验证失败,请检查')

    }

  })
}

defineExpose({
  loginAction,
})
</script>

<style lang="less" scoped></style>
