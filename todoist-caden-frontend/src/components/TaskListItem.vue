<script setup>
import { defineProps, ref, computed } from 'vue'
import { markTaskComplete } from '../TodoistService.js'

const props = defineProps({
    task: Object
})

const emit = defineEmits(['onDelete', 'onShowToast']);
const deleteVisible = ref('hidden');
const mouseOn = ref(false);

const pointer = computed(() => {
    return props.task.completed ? 'auto' : 'pointer';
})

/**
 * Function to hide or show the
 * delete button depending on
 * whether the user is hovered
 * over the list item or not.
 * 
 * @param {Event} e 
 */
function onHover(e) {
    if (e.type === 'mouseenter') {
        deleteVisible.value = 'visible';
    } else {
        deleteVisible.value = 'hidden';
    }
}

/**
 * Function to update the completed
 * icon when the user hovers over it.
 * 
 * @param {Event} e 
 * @param {Object} task 
 */
function changeIcon(e, task) {
    if (e.type === 'mouseenter') {
        if (!task.completed) {
            mouseOn.value = true;
        }
    } else {
        if (!task.completed) {
            mouseOn.value = false;
        }
    }
}

/**
 * Makes request to API to set
 * given tasks 'completed' value
 * to true and emits to show toast.
 * 
 * @param {Object} task 
 */
function taskUpdate(task) {
    emit('onShowToast')
    markTaskComplete(task._id);
    task.completed = true;
}

/**
 * Emits to let parent component
 * know to call delete. Needs to be
 * done here since parent function
 * holds the array of Tasks and
 * can delete the task from there.
 * 
 * @param {String} id 
 */
function taskDelete(id) {
    emit('onDelete', id)
}

</script>

<template lang="pug">
li(:key="task._id" @mouseenter="onHover($event)" @mouseleave="onHover($event)")
    .taskBody
        button(type="button" @mouseenter="changeIcon($event, task)" @mouseleave="changeIcon($event, task)" @click="taskUpdate(task)" :style="{cursor: pointer}" :disabled="task.completed")
            img(v-if="!task.completed && !mouseOn" src="@/assets/defaultcheckboxicon.svg")
            img(v-else-if="task.completed || mouseOn" src="@/assets/activecheckboxicon.svg")
        .taskInfo {{ task.name }}
        button(type="button" @click="taskDelete(task._id)" :style="{'visibility' : deleteVisible}")
            img(src="@/assets/deleteicon.svg")
</template>

<style scoped lang="less">
li {
    border-bottom: 1px solid #f0f0f0;
}

.taskBody {
    display: flex;
    align-items: stretch;
    position: relative;
    padding: 0;
}

.taskInfo {
    word-wrap: break-word;
    word-break: break-word;
    font-size: 14px;
    line-height: 21px;
    flex: 1;
    padding: 8px 0;
    padding-left: 8px;
    margin-right: 30px;
}
</style>