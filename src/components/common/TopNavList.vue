<script setup>

</script>

<template>
  <div class=top-nav-list-box>
    <ul class="top-nav-list">
      <slot></slot>
    </ul>
  </div>
</template>

<style scoped>
.top-nav-list-box{
  width: 100%;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}
  .top-nav-list{
    display: flex;
    list-style-type: none;
    justify-content: space-between;
  }
</style>