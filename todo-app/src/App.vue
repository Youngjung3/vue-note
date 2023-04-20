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
    <nav>
  <ul class="pagination justify-content-center">
    <li v-if="currentPage !==1" class="page-item"><a class="page-link" @click="getTodos(currentPage - 1)">Previous</a></li>
    <li v-for="page in numberOfPages" class="page-item" :key="page" :class="currentPage===page ? 'active' : ''" >
      <a class="page-link" @click="getTodos(page)">{{ page }}</a></li>
    <li v-if="currentPage !== numberOfPages" class="page-item"><a class="page-link" @click="getTodos(currentPage + 1)">Next</a></li>
  </ul>
</nav>
    {{ numberOfPages }}
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
    const totalTodos=ref(0);
    const limit=5;
    const currentPage=ref(1);
    const numberOfPages=computed(()=>{
      return Math.ceil(totalTodos.value/limit);
    })
    const filteredTodos=computed(()=>{
      if(searchText.value){
        return todos.value.filter((todo)=>{
          console.log("22222",todos.value,todo);
          return todo.subject.includes(searchText.value)
        })
      }
      return todos.value;
    })
    const todos = ref([]);

    const getTodos=(page=currentPage.value)=>{
      currentPage.value=page;
      console.log(currentPage.value);
      axios.get(`http://localhost:8080/todos?_page=${currentPage.value}&_limit=${limit}`).then((res)=>{
        // console.log("성공",res.headers["x-total-count"]);
        totalTodos.value=res.headers["x-total-count"];
        todos.value=res.data;
      }).catch((err)=>{
        console.log(err);
        error.value="일시적으로 오류가 발생했습니다. 잠시후 이용해주세요2"
      })
    }
    getTodos();
    const onSubmit = (todo) => {
      error.value='';
      axios.post("http://localhost:8080/todos",{
        subject:todo.subject,
        completed:todo.completed,
      })
      .then((res)=>{
        todos.value.push(res.data.todos);
        // return [console.log(res) ,todos.value.push(res.data)]
        getTodos();
      })
      .catch((err)=>{
        console.log(err);
        error.value='일시적으로 오류가 발생했습니다. 잠시후 이용해주세요'
      })
      // todos.value.push(todo);
    };
    const deleteTodo = (index) => {
      error.value="";
      const id=index;
      axios.delete("http://localhost:8080/todos/" + id)
      .then(()=>{
        getTodos();
      }).catch((err)=>{console.log(err);});
    };
    const toggleTodo = (index) => {
      console.log(todos.value);
      // const id =todos.value[index].id;
      const id = index;
      axios.post("http://localhost:8080/todos/" + id)
        .then((res)=>{
          // todos.value[index].completed=!todos.value[index].completed
          console.log(res);
        }).catch((err)=>{console.log(err);});
    };

    return {
      currentPage,
      error,
      onSubmit,
      todos,
      toggle,
      deleteTodo,
      toggleTodo,
      searchText,
      filteredTodos,
      numberOfPages,
      getTodos,
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