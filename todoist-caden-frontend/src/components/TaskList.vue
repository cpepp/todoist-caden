<script>
import TaskListItem from './TaskListItem.vue'
import { getTasks, deleteTask, postTask } from '../TodoistService.js'

export default {
  data() {
    return {
      tasks: [],
      name: '',
      showAddTask: true,
      showTaskInput: false,
      isEmpty: true,
      placeholderText: '예. 매일 독서 p3 @목표#공부'
    }
  },
  created() {
    getTasks().then((reqTasks) => {
      this.tasks = reqTasks
    })
  },
  computed: {
    addDisable() {
      return this.name.length == 0
    }
  },
  methods: {
    taskDelete(_id) {
      deleteTask(_id)
      this.tasks = this.tasks.filter((key) => {
        return key._id.localeCompare(_id) != 0
      })
    },
    addTask() {
      var task = {
        name: this.name
      }
      postTask(task).then((res) => {
        this.tasks.push(res)
      })

      this.showAddTask = true
      this.showTaskInput = false
      this.name = ''
    },
    displayAddTask() {
      this.showAddTask = false
      this.showTaskInput = true
      this.isEmpty = false
    },
    cancelAddTask() {
      this.showAddTask = true
      this.showTaskInput = false
      this.isEmpty = true
      this.name = ''
    },
    showToast() {
      emit('onShowToast')
    }
  }
}
</script>

<template lang="pug">
.taskListContent
  .taskList
    ul
      TaskListItem(v-for="task in tasks" :task="task" @onDelete="taskDelete(task._id)" @onShowToast="showToast()")
    .addTask
      button(v-if="showAddTask" class="addTaskDisplay" @click="displayAddTask") 
        img(src="@/assets/redaddicon.svg")
        text(class="addText") 작업 추가
      .taskInputWrapper(v-if="showTaskInput")
        input(class="taskInput" v-model="name" type="text" :placeholder="placeholderText" maxlength="500")
        .addtaskbuttons
          button(class="addButtonEnabled" @click="addTask" :disabled="addDisable" ) 작업 추가
          button(class="cancelButton" @click="cancelAddTask") 취소
  .emptyText(v-if="!tasks.length && isEmpty")
    h1(class='emptyTitle') 할 일이 없습니다
    p(class='emptyMessage') 남은 하루도 즐겁게 보내세요.
</template>

<style scoped lang="less">
.taskListContent {
  padding-left: 55px;
  padding-right: 55px;
}

.taskList {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

ul {
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}

.addTask {
  max-height: 76px;
  height: 100%;
}

.taskInputWrapper {
  padding-top: 8px;
  color: grey;
  font-size: 14px;
  align-items: center;

  &:hover {
    color: var(--todoist-orange);
  }
}

.addText {
  padding-left: 11px;
}

.taskInput {
  border: 1px solid #dddddd;
  width: 100%;
  border-radius: 6px;
  height: 45px;
  outline: none;
  padding: 5px;
}



.addButtonEnabled {
  background-color: var(--todoist-orange);
  color: white;
  min-width: 80px;
}

:disabled {
  background-color: #eabbb5 !important;
  cursor: not-allowed;
}

.cancelButton {
  min-width: 50px;
  border: 1px solid lightgrey;

  &:hover {
    background-color: lightgrey;
  }
}

button {
  height: 30px;
  margin: 5px;
  border-radius: 3px;
  font-size: 14px;
}

.emptyText {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 300px;
}

.emptyTitle {
  line-height: 21px;
  font-size: 17px;
  padding-bottom: 15px;
}

.emptyMessage {
  color: #777777;
  font-size: 13px;
  line-height: 18px;
}
</style>
