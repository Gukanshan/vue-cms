<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="26px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <header-crumb />
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderInfo from '@/components/main-header/c-cpns/HeaderInfo.vue'
import HeaderCrumb from '@/components/main-header/c-cpns/HeaderCrumb.vue'
import { ref } from 'vue'

const emits = defineEmits(['foldChange'])

const isFold = ref(false)
const handleMenuIconClick = () => {
  isFold.value = !isFold.value

  emits('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
