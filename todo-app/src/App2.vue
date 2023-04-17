<template>
  <div class="container">
    <h4>count:{{ count }}</h4>
    <h4>double count:{{ doubleCountComputed }}</h4>
    <h4>double count:{{ doubleCountFn() }}</h4>
    <h4>double count:{{ doubleCountComputed }}</h4>
    <h4>double count:{{ doubleCountFn() }}</h4>
    <h4>double count:{{ doubleCountComputed }}</h4>
    <h4>double count:{{ doubleCountFn() }}</h4>
    <button @click="count++">add</button>
    <h1>오늘의 할일</h1>

    <TodoBasicForm @add-todo="onAdd" />
    
    <div v-if="!todos.length">등록된 일정이 없습니다.</div>
    
    <TodoList :todos="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo"/>
  </div>
  <!-- <Props :textProps="내용내용" /> -->
</template>

<script>
import { ref, computed } from "vue";
import TodoBasicForm from "./components/TodoBasicForm.vue";
import TodoList from "./components/TodoList.vue";
// import Props from "./components/Props.vue";

export default {
  components:{TodoBasicForm, TodoList },
  setup() {
    const count=ref(1);
    const doubleCountComputed=computed(()=>{
      console.log("computed");
      return count.value*2;
    });
    const doubleCountFn=()=>{
      console.log("함수");
      return count.value *2;
    }

    const todos = ref([]);

    // const todoStyle={
    //   color: "gray",
    //   textDecoration: "line-through",
    // }
    const deleteTodo =(data)=>{
      todos.value.splice(data,1)
    }
    const toggleTodo=(index)=>{
      // console.log("####",todos.value[index]);
      todos.value[index].completed=!todos.value[index].completed;
      // console.log("@@@@",todos.value[index].completed);
    }
    const onAdd=(todo)=>{
      // console.log(todo);
      todos.value.push(todo);
    }
    return {
      todos,
      // todoStyle,
      deleteTodo,
      onAdd,
      toggleTodo,
      count,
      doubleCountComputed,
      doubleCountFn,
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
