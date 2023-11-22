<script setup>

import { ref } from "vue";
const emits=defineEmits(['update:modelValue'])
defineProps({
  modelValue:{
    tyep:String,
  }
})
const handleSearchInput=(e)=>{
  emits('update:modelValue',e.target.value);
}
</script>

<template>
    <div class="controls">
      <div class="vue-name"><slot name="default"></slot></div>
      <input type="text" 
      :value="modelValue"
      @input="handleSearchInput" placeholder="검색..." class="search-input" />
      <slot name="right-side" ></slot>
    </div>
</template>

<style scoped>
  .controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.vue-name {
  font-size: 20px;
  font-weight: bold;
  padding: 0.5rem 1rem;
}

.search-input {
  flex-grow: 1;
  margin-right: 1rem;
}
.right-side{
  padding: 0.5rem 1rem;
}

</style>