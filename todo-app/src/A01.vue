<template>
  <h1 class="app">{{ name }}App</h1>
  <button type="button" class="btn btn-primary" v-on:click="updateName">
    클릭해봐
  </button>
  <ul class="list text-primary">
    <li>{{ greeting("김") }}</li>
    <li>{{ cats }}😺</li>
    <li>{{ cats }}😽😽</li>
    <li>{{ cats }}🙀😿😾</li>
  </ul>
  <button type="button" class="btn btn-warning" v-on:click="updateCat">
    야옹
  </button>
  <!-- html 주석 -->
</template>

<script>
import { ref, reactive } from "vue";
export default {
  // 자바스크립트 주석
  setup() {
    let name = ref("망고");

    let cats = reactive({
      name: "마리",
      age: 100,
      weight: 100,
    });
    const updateCat = ()=>{
      cats.name='나기',
      cats.age=5,
      cats.weight= 5
    };

    const greeting = (name) => {
      return "짱쉬워" + name;
    };
    const updateName = () => {
      name.value = "김경아";
    };
    const consoleLog = () => {
      console.log("클릭");
    };
    return { name, greeting, consoleLog, updateName, cats, updateCat };
  },
};
</script>

<style>
/* css 주석 */
.app {
  color: red;
}
.list {
  color: green;
}
</style>
