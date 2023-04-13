<template>
  <div>
    <h1 :class="red">{{ name }}</h1>
  </div>
  <!-- <input type="text" :value="name" @input="updateName"> -->
  <input type="text" v-model="name">
  <button class="btn btn-primary" @:click="onSubmit">버튼</button>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let red=ref("red");
    let name = ref("김망고");

    const onSubmit = () => {
      console.log(name.value);
    };
    const updateName=(e)=>{
      console.log(e.target.value);
    }
    return { name, onSubmit, red, updateName };
  },
};
</script>

<style>
  .red{
    background-color: red;
  }
  .green{
    background-color: green;
  }
</style>
