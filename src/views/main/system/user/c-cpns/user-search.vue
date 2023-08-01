<template>
  <div class="user-search">
    <el-form :ref="formRef" :model="searchForm" label-width="80px" :size="'large'">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="searchForm.realname" placeholder="请输入真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="searchForm.cellphone" placeholder="请输入电话号码" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="searchForm.enable" placeholder="请选择状态" style="width: 100%">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="btn">
      <el-button size="large" icon="Refresh" @click="handleReset">重置</el-button>
      <el-button size="large" type="primary" icon="Search" @click="handleQuery">查询</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'

const emits = defineEmits(['queryClick', 'resetClick'])

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: '',
})

const formRef = ref<InstanceType<typeof ElForm>>()
function handleReset() {
  formRef.value?.resetFields()
  emits('resetClick')
}

function handleQuery() {
  emits('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.user-search {
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btn {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
