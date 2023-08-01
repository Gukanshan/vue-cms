<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登陆</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>

        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLogin"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'
import { Cellphone, UserFilled } from '@element-plus/icons-vue'
import {localCache} from "@/utils/cache";

const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newVal) => {
  localCache.setCache('isRemPwd', newVal)
})
const activeName = ref('account')
const accountRef = ref()

function handleLogin() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)

  } else {
    console.log('手机登录模式')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
