<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue';
import TaskListHeader from './components/TaskListHeader.vue'
import TaskList from './components/TaskList.vue'
import ToastNotification from './components/ToastNotification.vue';

const toast = ref(false);

function showToast() {
  toast.value = true;
  setTimeout(() => toast.value = false, 2000);
}

/**
 * Function that allows the user
 * to dismiss the toast by clicking
 * the cancel button.
 */
function dismissToast() {
  toast.value = false;
}

</script>

<template lang="pug">
.apppage
  NavBar
  .appinfo
    TaskListHeader
    TaskList(@onShowToast="showToast()")
    ToastNotification(v-if="toast" @onDismiss="dismissToast()")
</template>

<style scoped>
.appinfo {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow-y: auto;
}

.apppage {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tasks {
  max-width: 800px;
}
</style>
