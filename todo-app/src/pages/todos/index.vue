<template>
  <!-- <router-view /> -->
  <div>
    <h1>오늘의 할일</h1>
    <input
      v-model="searchText"
      type="text"
      class="form-control"
      placeholder="검색어를 입력하세요"
      @keyup.enter="searchTodos"
    />
    <TodoBasicForm @add-todo="onSubmit" />
    <div style="color: red">{{ error }}</div>
    <div v-if="!todos.length">등록된 일정이 없습니다</div>
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <nav>
      <ul class="pagination justify-content-center">
        <li v-if="currentPage !== 1" class="page-item">
          <a class="page-link" @click="getTodos(currentPage - 1)">Previous</a>
        </li>
        <li
          v-for="page in numberOfPages"
          class="page-item"
          :key="page"
          :class="currentPage === page ? 'active' : ''"
        >
          <a class="page-link" @click="getTodos(page)">{{ page }}</a>
        </li>
        <li v-if="currentPage !== numberOfPages" class="page-item">
          <a class="page-link" @click="getTodos(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
    {{ numberOfPages }}
  </div>
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType"/>
  <!-- <Toast /> -->
</template>

<script>
import { ref, computed, watch, onUnmounted } from "vue";
import axios from "axios";
import TodoBasicForm from "@/components/TodoBasicForm.vue";
import TodoList from "@/components/TodoList.vue";
import {useToast} from "@/composables/toast";
import Toast from '@/components/Toast';

export default {
  components: {
    TodoBasicForm,
    TodoList,
    Toast,
  },
  setup() {
    let error = ref("");
    const toggle = ref(false);
    const searchText = ref("");
    const totalTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);

    const {showToast,toastMessage,toastAlertType,timeout,triggerToast}=useToast();

    const numberOfPages = computed(() => {
      return Math.ceil(totalTodos.value / limit);
    });

    // watch(()=>{searchText.value}, (current,prev)=>{console.log(current,prev)})

    const todos = ref([]);

    let time = null;
    watch(searchText, () => {
      time = setTimeout(() => {
        getTodos(1);
      }, 2000);
    });
    const searchTodos = () => {
      clearTimeout(time);
      getTodos(1);
    };

    const getTodos = (page = currentPage.value) => {
      currentPage.value = page;
      // console.log(currentPage.value);
      axios
        .get(
          `http://localhost:8080/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        )
        .then((res) => {
          // console.log("성공",res.headers["x-total-count"]);
          totalTodos.value = res.headers["x-total-count"];
          todos.value = res.data;
          triggerToast("목록가져왔습니다","info")
        })
        .catch((err) => {
          console.log(err);
          error.value = "일시적으로 오류가 발생했습니다. 잠시후 이용해주세요2";
          triggerToast("목록안가져왔습니다","danger")
        });
    };
    getTodos();
    const onSubmit = (todo) => {
      error.value = "";
      axios
        .post("http://localhost:8080/todos", {
          subject: todo.subject,
          completed: todo.completed,
        })
        .then((res) => {
          todos.value.push(res.data.todos);
          // return [console.log(res) ,todos.value.push(res.data)]
          getTodos();
        })
        .catch((err) => {
          console.log(err);
          error.value = "일시적으로 오류가 발생했습니다. 잠시후 이용해주세요";
        });
      // todos.value.push(todo);
    };
    const deleteTodo = (index) => {
      error.value = "";
      const id = index;
      axios
        .delete("http://localhost:8080/todos/" + id)
        .then(() => {
          getTodos();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const toggleTodo = (index, checked) => {
      // console.log(checked);
      // const id =todos.value[index].id;
      const id = index;
      axios
        .patch("http://localhost:8080/todos/" + id, { completed: checked })
        .then(() => {
          getTodos();
          // todos.value[id].completed=checked;
          // console.log("22222",todos.value[id]);
          // console.log("11111",todos.value[id].completed);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      searchTodos,
      currentPage,
      error,
      onSubmit,
      todos,
      toggle,
      deleteTodo,
      toggleTodo,
      searchText,
      // filteredTodos,
      numberOfPages,
      getTodos,
      showToast,
      toastMessage,
      toastAlertType,
      triggerToast,
      timeout
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
