<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  type: {
    type: String,
    default:"default",
  }
})
const ulStyle = {
  default: {
    display: "flex",
    
  },
  
 }
</script>

<template>
  <div class="list-container">
    <span class="list-title" v-text="title"></span>
    <div class="slide-list">
      <ul :style="ulStyle[type]">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .list-container{
    display: block;
    margin-top: 12px;
    padding-top: 1rem;
    margin-bottom: 2rem;
  }
  .slide-list{
    min-height: 2rem;
    background-color: var(--rhp-c-text-1);
    
  }
  .list-title{
    display: inline-block;
    padding-left: 1rem;
    margin-bottom: 0.5rem;
  }
</style>