<template>
  <div class="container">
    <h1>오늘의 할일</h1>
    <input v-model="searchText" type="text" class="form-control" placeholder="검색어를 입력하세요">
    <TodoBasicForm @add-todo="onSubmit" />
    <div style="color:red">{{ error }}</div>
    <div v-if="!todos.length">등록된 일정이 없습니다</div>
    <TodoList
      :todos="filteredTodos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
import TodoBasicForm from "./components/TodoBasicForm.vue";
import TodoList from "./components/TodoList.vue";
export default {
  components: {
    TodoBasicForm,
    TodoList,
  },
  setup() {
    let error=ref("");
    const toggle = ref(false);
    const searchText=ref("");
    const filteredTodos=computed(()=>{
      if(searchText.value){
        return todos.value.filter((todo)=>{
          return todo.subject.includes(searchText.value)
        })
      }
      return todos.value;
    })
    const todos = ref([]);
    const getTodos=()=>{
      axios.get("http://localhost:3000/todos").then((res)=>{
        console.log("todos.value:",res);
        todos.value=res.data;
      }).catch((err)=>{
        console.log(err);
        error.value="일시적으로 오류가 발생했습니다. 잠시후 이용해주세요2"
      })
    }
    getTodos();
    const onSubmit = (todo) => {
      error.value='';
      axios.post("http://localhost:3000/todos",{
        subject:todo.subject,
        completed:todo.completed,
      })
      .then((res)=>{
        return [console.log(res) ,todos.value.push(res.data)]
      })
      .catch((err)=>{
        console.log(err);
        error.value='일시적으로 오류가 발생했습니다. 잠시후 이용해주세요'
      })
    };
    const deleteTodo = (index) => {
      error.value="";
      const id=todos.value[index].id;
      axios.delete("http://localhost:3000/todos/" + id)
      .then(()=>{todos.value.splice(index, 1);})
      .catch((err)=>{console.log(err);});
    };
    const toggleTodo = (index) => {
      const id =todos.value[index].id;
      axios.patch("http://localhost:3000/todos/"+id,{completed:!todos.value[index].completed}).then((res)=>{todos.value[index].completed=!todos.value[index].completed}).catch((err)=>{console.log(err);});
    };

    return {
      error,
      onSubmit,
      todos,
      toggle,
      deleteTodo,
      toggleTodo,
      searchText,
      filteredTodos,
    };
  },
};
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>