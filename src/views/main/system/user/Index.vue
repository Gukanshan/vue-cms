<template>
  <div class="user">
    <div class="search">
      <user-search />
      <user-content />
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
</script>

<style lang="less" scoped>
.user {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
}
</style>
