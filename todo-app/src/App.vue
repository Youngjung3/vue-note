<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid justify-content-start">
      <!-- <router-link to="/" class="navbar-brand">Home</router-link> -->
      <router-link :to="{name:'Home'}" class="navbar-brand">Home</router-link>
      <div class="navbar-nav">
        <!-- <router-link class="nav-link active" to="/Todos">일정목록</router-link> -->
        <router-link class="nav-link active" :to="{name:'Todos'}">일정목록</router-link>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>