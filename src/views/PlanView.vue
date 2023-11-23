<script setup>
import TheFooter from "@/components/common/TheFooter.vue";
import TheHeader from "@/components/common/TheHeader.vue";
import MainContainer from "@/components/layout/MainContainer.vue";
import { onDeactivated } from "vue";
import { KeepAlive } from "vue";
import { onActivated } from "vue";
import { RouterView } from "vue-router";

const tabItems = [{
  tabName: "힐링플랜 목록",
  tabLink:{name:"PlanList"}
},
{
  tabName: "힐링플랜 작성",
  tabLink:{name:"PlanList"}
},
{
  tabName: "지도 검색",
  tabLink:{name:"MapMain"}
  },
  {
  tabName: "힐링여행지 공유",
  tabLink:{name:"Plan"}
}
]
</script>

<template>
  <MainContainer>
    <template #header>
      <TheHeader></TheHeader>
      <v-tabs
      align-tabs="center"
        color="white"
        
      >
        
        <v-tab
        v-for="tab in tabItems" :key="tab.tabName"
        :to="tab.tabLink">
          {{tab.tabName}}
        </v-tab>
      </v-tabs>
    </template>
    <template #main>
      <RouterView v-slot="{Component}">
        <KeepAlive :include="'MapPage'">
          <component :is="Component">
          </component>
        </KeepAlive>
        
      </RouterView>
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