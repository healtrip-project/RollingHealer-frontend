<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
  itemLink: {
    tyep: [String, Object],
      default: null,
    }
  })
</script>

<template>
  <li class="nav-list-item" v-if="itemLink !==null">
    <RouterLink v-if="itemLink !==null" :to="itemLink">
      <slot></slot>
    </RouterLink>
  </li>
  <li class="nav-list-item" v-else>
    <slot></slot>
  </li>
</template>

<style scoped>
.nav-list-item{
    padding: 0.5rem;
    font-size:1rem;
    word-break: keep-all;
  }
</style>