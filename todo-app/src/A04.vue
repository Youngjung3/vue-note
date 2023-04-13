<template>
  <div class="container">
    <h1>오늘의 할일</h1>
    <form action="#" class="d-flex" @:submit.prevent="onSubmit">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="일정을 추가하세요"
          v-model="todo"
        />
        <button class="btn btn-primary" @:click="onSubmit" type="submit">추가하기</button>
      </div>
    </form>
    <div class="card">
      <div class="card-body p-2">{{ todos[0].subject }}</div>
    </div>
    <div class="card">
      <div class="card-body p-2">{{ todos[1].subject }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const todo = ref("");
    let todos = ref([
      {
        id: 1,
        subject: "리액트 복습",
      },
      {
        id: 2,
        subject: "뷰 복습",
      },
    ]);

    const onSubmit = () => {
      console.log(todos.value);
      todos.value.push({
        id: Date.now(),
        subject: todo.value,
      });
    };
    // const updateTodo =(e)=>{
    //   todo.value=e.target.value;
    // }

    return {
      todo,
      onSubmit,
      todos,
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
</style>
