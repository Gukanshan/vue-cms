<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '80px': '210px'">
        <main-menu :is-fold="isFold"/>
      </el-aside>
      <el-container>
        <el-header height="48px">
          <main-header @foldChange="handleFoldChange"/>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/Index.vue'
import MainHeader from '@/components/main-header/Index.vue'
import {ref} from "vue";

const isFold = ref(false)
const handleFoldChange = (flag) => {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    color: #333;
    text-align: center;
    background-color: #f0f2f5;
  }
}
</style>
