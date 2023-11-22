<script setup>
  import TheListContentListTop from "../common/list/TheListContentListTop.vue";
import PlaceItemGroupList from "./item/placeItemGroupList.vue";
</script>

<template>
  <div>
    <TheListContentListTop>
      장소 리스트
      <template #right-side>
        테스트
      </template>
    </TheListContentListTop>
    <PlaceItemGroupList :item-list="['1']">
      <template #header><span class="place-list-title">문화시설</span></template>
    </PlaceItemGroupList>
  </div>
</template>

<style scoped>
.place-list-title{
  font-weight: bold;
  font-size: 1.5rem;
}
</style>