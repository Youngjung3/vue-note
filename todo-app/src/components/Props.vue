<template>
  <h1>Props</h1>
  {{ textProps }}
</template>

<script>

export default {
  props:{
    textProps:{
      type:String,
      required:true,
    }
  }

}
</script>

<style>

</style>