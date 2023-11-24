<!-- eslint-disable no-loss-of-precision -->
<script setup>
import { getPlaceData } from "@/api/v1/place";
import { ref } from "vue";
import { NaverMap,NaverMarker  } from "vue3-naver-maps";
const map = ref();
const mapOptions = {
  latitude: 37.51347, // 지도 중앙 위도
  longitude: 127.041722, // 지도 중앙 경도
  zoom: 13,
  zoomControl: true,
  zoomControlOptions: { position: "TOP_RIGHT" },
};
const props = defineProps({
  markerData: {
    type:Object
  }
})
// const testData = ref([]);

// getPlaceData({
//   sidocode:1,

// },({data})=>{
//   testData.value = data;
//   console.log(testData.value)
// },(error)=>{
//   console.log(error)
// })
const emits=defineEmits(['update:markerData'])
console.log()
const initLayers = [
  "BACKGROUND",
  "BACKGROUND_DETAIL",
  "POI_KOREAN",
  "TRANSIT",
  "ENGLISH",
];
const onHandleClick = (marker) => {
  console.log(marker)
  map.value.setCenter(marker.coord)
  map.value.setZoom(15)

};
const onLoadMap = (mapObject) => {
  map.value = mapObject;
};

</script>

<template>
  <naver-map
    style="width: 100%; height: 400px"
    :mapOptions="mapOptions"
    :initLayers="initLayers"
    @onLoad="onLoadMap($event)"
  >
    <naver-marker
    v-for="(marker, index) in markerData"
    :key="index"
        :latitude="marker['mapy']"
        :longitude="marker['mapx']"
        @click="onHandleClick"
        >

    </naver-marker>
  </naver-map>
</template>