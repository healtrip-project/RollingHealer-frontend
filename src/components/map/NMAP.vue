<script setup>
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
const initLayers = [
  "BACKGROUND",
  "BACKGROUND_DETAIL",
  "POI_KOREAN",
  "TRANSIT",
  "ENGLISH",
];
const marker = ref();
const onLoadMarker = (markerObject) => {
  marker.value = markerObject;
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
        latitude="37.51347"
        longitude="127.041722"
        @onLoad="onLoadMarker($event)">
    </naver-marker>
  </naver-map>
</template>