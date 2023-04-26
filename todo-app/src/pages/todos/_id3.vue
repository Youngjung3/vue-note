<template>
  <h1>일정내용</h1>
  <div v-if="loading">Loading ...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group mb-2">
          <label>일정명: </label
          ><input type="text" class="form-control" v-model="todo.subject" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group mb-2">
          <label>수행상태: </label>
          <button
            class="btn"
            @click="toggleTodoStatus"
            :class="todo.completed ? 'btn-success' : 'btn-danger'"
            type="button"
          >
            {{ todo.completed ? "완료" : "미완료" }}
          </button>
        </div>
      </div>
    </div>
    <button class="btn btn-primary" :disabled="!todoUpdate">저장</button>
    <button class="btn btn-outline-dark ms-2" @click="moveToTodoListPage">
      취소
    </button>
  </form>
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType"/>
  <div id="mango">🌭🥓🍖🍗🥩🍙🍤🍜</div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref, computed, onUnmounted} from "vue";
import _ from "lodash";
import Toast from "@/components/Toast.vue";



export default {
  components: {
    Toast,
  },
  setup() {
    const originalTodo = ref(null);
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    // console.log(route.params.id);
    const loading = ref(true);
    const todoId = route.params.id;
    const url = "http://localhost:8080/todos/";
    // const showToast=ref(true);
    const showToast = ref(false);
    const toastMessage =ref('');
    const toastAlertType = ref('');
    const timeout=ref(null);

    onUnmounted(()=>{
      clearTimeout(timeout.value);
    })

    const triggerToast = (msg,type='info') => {
      toastMessage.value = msg;
      toastAlertType.value=type;
      showToast.value = true;
      timeout.value = setTimeout(()=>{
        toastMessage.value = '';
        toastAlertType.value='';
        showToast.value = false;
      },5000)
    };

    const todoUpdate = computed(() => {
      // isEqual 같은 true 다르면 false
      return !_.isEqual(todo.value, originalTodo.value);
    });

    const onSave = () => {
      axios
        .put(`${url}${todoId}`, {
          subject: todo.value.subject,
          completed: todo.value.completed,
        })
        .then((res) => {
          // todo.value=res.data;
          originalTodo.value = { ...res.data };
          triggerToast("등록이 완료되었습니다","info");
          //   router.push({
          //   name:"Todos"
          // })
          // loading.value=false;

          // console.log("onSave", res);
        })
        .catch((err) => {
          console.error(err);
          triggerToast("오류 발생, 잠시후 이용","danger");
        });
    };
    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };
    const getTodo = () => {
      axios
        .get(`${url}${todoId}`)
        .then((res) => {
          todo.value = { ...res.data };
          originalTodo.value = { ...res.data };
          loading.value = false;
          // console.log(todo.value.completed);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getTodo();
    const moveToTodoListPage = () => {
      router.push({
        name: "Todos",
      });
    };
    return {
      toastMessage,
      triggerToast,
      todo,
      loading,
      moveToTodoListPage,
      onSave,
      toggleTodoStatus,
      todoUpdate,
      showToast,
      toastAlertType,
    };
  },
};
</script>

<style></style>
