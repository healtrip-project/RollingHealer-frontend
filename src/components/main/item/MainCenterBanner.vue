<script setup>
import { ref } from "vue";

  const onboarding=ref(false)
  const itemList =ref([{title:"배너1"},{title:"배너2"}])
</script>

<template>
   <v-window
    v-model="onboarding"
    show-arrows="hover"
    class="main-window-banner mx-auto text-no-wrap "
  >
    <v-window-item
      v-for="(item,index) in itemList"
      :key="`card-${index}`"
      
    >
      <v-card
        elevation="2"
        height="200"
        class="d-flex  align-center justify-center "
      >
        <h1
          class="text-h2"
        >
          {{ item.title}}
        </h1>
      </v-card>
    </v-window-item>
  </v-window>
</template>

<style scoped>
.main-window-banner{
  color:black;
  min-width:650px;
}
</style>