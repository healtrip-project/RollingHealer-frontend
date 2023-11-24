<script setup>
import { contentImageParser } from "@/utils/image";
import { ref } from "vue";

  const onboarding=ref(false)
  const itemList =ref([{title:"오늘 날씨가 좋네요 ㅎㅎ", createBy:"ssafy",},{title:"어제,,, 등산해봤습니다",createBy:"kimsang"}])
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
        class="d-flex  align-center justify-center banner-card"
        :image="contentImageParser(item)"
      >
        <h1
          class="text-h4 banner-title ps-3 pa-3"
        >
          {{ item.title}}
        </h1>
        <v-card-item class="text-h5 banner-createBy">{{ item?.createBy }}</v-card-item>
      </v-card>
    </v-window-item>
  </v-window>
</template>

<style scoped>
.main-window-banner{
  color:black;
  min-width:650px;
}
.banner-card{
  position: relative;
}
.banner-title{
  position: absolute;
  left:1rem;
  top:1rem;
  color: var(--rhp-c-text-1);
}
.banner-createBy{
  position:absolute;
  right:1rem;
  bottom:1rem;
  color: var(--rhp-c-text-1);
}
</style>