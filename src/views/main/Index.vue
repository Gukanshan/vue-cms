<template>
  <div class="main">
    <h2>
      main
    </h2>
    <button @click="changeCounter">修改counter</button>
  </div>
</template>

<script setup lang="ts">

function changeCounter() {
}
</script>

<style lang="less" scoped>
.main {
  color: black;
}
</style>
