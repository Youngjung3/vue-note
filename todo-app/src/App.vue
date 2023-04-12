<template>
  <div>
    <h1 :class="red">{{ name }}</h1>
  </div>
  <input type="text" :value="name">
  <button class="btn btn-primary" @:click="updateName">버튼</button>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let red=ref("red");
    console.log(red);
    let name = ref("김망고");

    const updateName = () => {
      name.value = "고망김r";
      red.value="green";
    };
    return { name, updateName, red };
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
