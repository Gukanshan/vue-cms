<template>
  <div class="user">
    <div class="search">
      <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
      <user-content ref="contentRef" @new-click="handleNewBtnClick" @edit-click="handleEditClick" />

      <user-modal ref="modalRef" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'

const contentRef = ref()
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}

function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

const modalRef = ref()
function handleNewBtnClick() {
  modalRef.value?.setModalVisible()
}

function handleEditClick(user) {
  modalRef.value.setModalVisible(false, user)
}
</script>

<style lang="less" scoped>
.user {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
}
</style>
