<template>
  <div class="container">
    <h1>오늘의 할일</h1>

    <div>
      <div v-show="toggle" @:click="onToggle">show◾</div>
      <div v-show="!toggle" @:click="onToggle">show🔸</div>
      <button class="btn btn-primary" @:click="onToggle" type="submit">토글</button>
    </div>

    <div>
      <!-- <div v-if="toggle" @:click="onifToggle">false</div> -->
      <!-- <div v-else @:click="onifToggle">true</div> -->
      <div v-if="toggle" @:click="toggle">false</div>
      <div v-else @:click="toggle">true</div>
      <button class="btn btn-warning" @:click="onToggle" type="submit">토글</button>
    </div>
    <TodoBasicForm />

    <div v-if="!todos.length">등록된 일정이 없습니다.</div>
    <!-- <div class="card">
      <div class="card-body p-2">{{ todos[0].subject }}</div>
    </div>
    <div class="card">
      <div class="card-body p-2">{{ todos[1].subject }}</div>
    </div> -->
    
    <div class="card">
      <div class="card-body p-2">
        <div class= "d-flex" v-for="i in todos" :key="i.id">
          <div class="form-check flex-grow-1">
            <!-- <label class="form-check-label" v-bind:class={todo:i.complated}> -->
            <label class="form-check-label mb-1" :style="i.complated? todoStyle : {}">
              <input v-model="i.complated" type="checkbox" class="form-check-input">
              {{ i.subject }}
            </label>
          </div>
          <div><button class="btn btn-danger btn-sm mb-1" @click="deleteTodo(i)">삭제</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import TodoBasicForm from "./components/TodoBasicForm.vue";

export default {
  components:{TodoBasicForm},
  setup() {
    const todo = ref("");
    const todos = ref([]);
    const toggle = ref(false);
    const errMsg = ref(false);

    const onToggle =()=>{
      toggle.value=!toggle.value
    }

    const onSubmit = () => {
      if(todo.value === ""){
        errMsg.value=true;
      }else{
      todos.value.push({
        id: Date.now(),
        subject: todo.value,
        complated:false,
      });
      errMsg.value=false;
      todo.value="";
      }
      // console.log(todos.value);
    };
    const todoStyle={
      color: "gray",
      textDecoration: "line-through",
    }
    // const updateTodo =(e)=>{
    //   todo.value=e.target.value;
    // }
    const deleteTodo =(data)=>{
      todos.value.splice(data,1)
    }

    return {
      todo,
      onSubmit,
      todos,
      toggle,
      onToggle,
      errMsg,
      todoStyle,
      deleteTodo,
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
