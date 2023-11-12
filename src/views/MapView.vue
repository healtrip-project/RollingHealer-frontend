<script setup>
import NMAP from "@/components/map/NMAP.vue";
const locMove=(map)=>{
  const latLng = new window.naver.maps.LatLng(37.51347, 127.041722); // window 생략 가능
  map.setCenter(latLng); // Change Map Center
};
</script>

<template>
  
  <main>
    <NMAP />
    <button @click="locMove">버튼</button>
  </main>
</template>