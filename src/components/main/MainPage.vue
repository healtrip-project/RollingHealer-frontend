<script setup>
import { getPlaceData } from "@/api/v1/place";
import SlideListContainer from '../layout/SlideListContainer.vue';
import MainCenterBanner from '@/components/main/item/MainCenterBanner.vue'
import PlaceItemGroupList from '@/components/place/item/PlaceItemGroupList.vue'
import { ref } from "vue";
import { getPost } from "@/api/v1/post";
const hotPlaceList=ref({})
const postList=ref([])
getPlaceData({
  sidocode:1,

},({data})=>{
  hotPlaceList.value=data;
},(error)=>{
  console.log(error)
})

getPost(({data})=>{
postList.value=data
},()=>{

})
</script>

<template>
  <div class="main-container">
    <div class="main-top-area text-no-wrap">떠나고 싶은 어디든 롤링힐러</div>
    <PlaceItemGroupList class="mt-5" :item-list="postList" >
      <template #header><span class="place-list-title text-no-wrap">오늘의 힐링</span></template>
    </PlaceItemGroupList>
    <MainCenterBanner></MainCenterBanner>
    <PlaceItemGroupList  class="mt-5" :item-list="hotPlaceList" >
      <template #header><span class="place-list-title text-no-wrap">지금 뜨는 장소</span></template>
    </PlaceItemGroupList>
     <PlaceItemGroupList  class="mt-5" :item-list="hotPlaceList" >
      <template #header><span class="place-list-title text-no-wrap">베스트힐러</span></template>
    </PlaceItemGroupList>
  </div>
</template>

<style scoped>
  .main-container{
    min-height: auto;
  }
  .main-top-area{
    font-size: 1.5rem;
    font-weight: bold;
  }
  .place-list-title{
  font-weight: bold;
  padding-left: 1.2rem;
  font-size: 1.2rem;
}
</style>