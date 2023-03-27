<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="logo">
      <h2 v-show="!isFold" class="title">后台管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        class="el-menu-vertical-set"
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon><component :is="item.icon.split('el-icon-')[1]"></component></el-icon>
              <span>{{item.name}}</span>
            </template>

            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleItemClick(subItem)">{{subItem.name}}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from "@/store/login/login";
import {useRouter} from "vue-router";

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

function handleItemClick(item) {
  const url = item.url
  router.push(url)
}
</script>

<style lang="less" scoped>

.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    width: 100%;
    font-size: 16px;
    font-weight: 700;
    color: white;

    white-space: nowrap;

  }
}

.el-menu {
  border-right: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}

</style>
