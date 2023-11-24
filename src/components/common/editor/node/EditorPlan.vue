<script setup>
import { NodeViewWrapper,NodeViewContent } from '@tiptap/vue-3'
const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
  updateAttributes: {
    type: Function,
  },
  selected: {
    type: Boolean,
  },
})
</script>

<template>
  <node-view-wrapper class="plan-container ">
    
    <node-view-content class="content"  />
  </node-view-wrapper>
</template>

<style scoped>
  .plan-container{
    display: block;
    width: 100%;
    height: 100px;
    background-color: var(--rhp-c-background-1-opacity-5);
    
  }
</style>