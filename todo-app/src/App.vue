<template>
  <div class="container">
    <h1>오늘의 할일</h1>

    <TodoBasicForm @add-todo="onAdd" />
    
    <div v-if="!todos.length">등록된 일정이 없습니다.</div>
    
    <TodoList :todos="todos" />
  </div>
</template>

<script>
import { ref } from "vue";
import TodoBasicForm from "./components/TodoBasicForm.vue";
import TodoList from "./components/TodoList.vue";

export default {
  components:{TodoBasicForm, TodoList },
  setup() {
    const todos = ref([]);

    const todoStyle={
      color: "gray",
      textDecoration: "line-through",
    }
    const deleteTodo =(data)=>{
      todos.value.splice(data,1)
    }

    const onAdd=(todo)=>{
      console.log(todo);
      todos.value.push(todo);
    }
    return {
      todos,
      todoStyle,
      deleteTodo,
      onAdd,
    };
  },
};
</script>

<style>
.red {
  color: red;
}
.green {
  color: green;
}
.todo{
    color: gray;
    text-decoration: line-through;
  }
</style>
