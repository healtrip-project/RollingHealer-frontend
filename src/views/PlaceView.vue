
<script setup>
import TheFooter from "@/components/common/TheFooter.vue";
import TheHeader from "@/components/common/TheHeader.vue";
import MainContainer from "@/components/layout/MainContainer.vue";
import { RouterView } from "vue-router";

</script>

<template>
  <MainContainer>
    <template #header>
      <TheHeader></TheHeader>
    </template>
    <template #main>
      <RouterView></RouterView>
    </template>
    <template #footer>
      <TheFooter></TheFooter>
    </template>
  </MainContainer>
</template>

<style scoped>
.main-container{
  width: 80%;
  margin: 0 auto;
}


</style>