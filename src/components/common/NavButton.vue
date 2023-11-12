<script setup>

</script>

<template>
  <button class="clean-button">
    <slot></slot>
  </button>
</template>

<style scoped>
  .clean-button{
    border: 0;
    background-color: transparent;
    color: inherit;
    font-size: inherit;
  }
</style>