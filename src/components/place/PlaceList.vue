<script setup>
  import TheListContentListTop from "../common/list/TheListContentListTop.vue";
import PlaceItemGroupList from "./item/placeItemGroupList.vue";
import {getPlaceData} from "@/api/v1/place"
import { ref } from "vue";
//관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID

const placeListData=ref({});

getPlaceData({
  content_type_id:'14',
  sidocode:1,
},({data})=>{
  placeListData.value['문화시설']=data;
},
(error)=>{
  console.log(error);
})

getPlaceData({
  content_type_id:'12',
  sidocode:1,
},({data})=>{
  placeListData.value['관광지']=data;
},
(error)=>{
  console.log(error);
})
getPlaceData({
  content_type_id:'28',
  sidocode:1,
},({data})=>{
  placeListData.value['레포츠']=data;
},
(error)=>{
  console.log(error);
})
getPlaceData({
  content_type_id:'39',
  sidocode:1,
},({data})=>{
  placeListData.value['음식점']=data;
  console.dir(placeListData.value)
},
(error)=>{
  console.log(error);
})


</script>

<template>
  <div>
    <TheListContentListTop>
      장소 리스트
      <template #right-side>
        테스트
      </template>
    </TheListContentListTop>
    <PlaceItemGroupList v-for="(places,key, index) in placeListData" :key="index" :item-list="places">
      <template #header><span class="place-list-title">{{ key }}</span></template>
    </PlaceItemGroupList>
  </div>
</template>

<style scoped>
.place-list-title{
  font-weight: bold;
  font-size: 1.5rem;
}
</style>@/api/v1/place