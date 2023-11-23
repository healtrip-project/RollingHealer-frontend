<script setup>
import { ref } from 'vue';
import NMAP from './NMAP.vue';
import MapSearchBar from './item/MapSearchBar.vue';
import { getPlaceData } from '@/api/v1/place';
import { onDeactivated } from 'vue';
import { onActivated } from 'vue';
import MapPlaceScrollList from './item/MapPlaceScrollList.vue';
const saveQuery = ref({})
const searchData = ref([]);
const viewActive = ref(false);
const handleSearch = (query) => {
  saveQuery.value = { ...query }
  saveQuery.value['page'] = 1;
  getPlaceData(query,
  ({data}) => {
    searchData.value = data
  }, (error) => {
    console.log(error)
  })
}

const loadPlaceData = () => {
  saveQuery.value['page'] += 1
  getPlaceData(saveQuery.value,({data}) => {
    searchData.value.push(...data);
    console.log("success load data")
  }, (error) => {
    console.log(error)
  })
}

// onActivated(() => {
//     console.log("테스트 인")
// })
// onDeactivated(() => {
//     console.log("테스트 아웃")
//   })
const handlePlaceClick = () => {
  viewActive.value = true;
}
</script>

<!-- <v-list-item v-for="item in searchData" :key="item.contentId">
    <v-list-item-title>{{ item.title }}</v-list-item-title>
  </v-list-item> -->

<template>
  
  <div class="container">
    <MapSearchBar @search="handleSearch"></MapSearchBar>
    <v-row no-gutters>
      <v-col cols="3">
        <MapPlaceScrollList class="list" :item-list="searchData"  @on-load="loadPlaceData">
          </MapPlaceScrollList>
        </v-col>
        <v-col cols="8 ps-2">
          <v-card
    class="mx-auto"
    max-width="400"
    v-show="viewActive"
  >
    <v-img
      class="align-end text-white"
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    >
      <v-card-title></v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">

    </v-card-subtitle>

    <v-card-text>
      <div></div>

      <div></div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange">
        Share
      </v-btn>

      <v-btn color="orange">
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
          <NMAP v-show="!viewActive" class="map" v-model:marker-data="searchData"></NMAP>
        </v-col>
      </v-row>
    </div>
</template>

<style scoped>
.container{
 display: grid;
 grid-template-rows: auto 1fr auto;
 grid-template-columns: 1fr;
 grid-template-areas:
  "header"
  "map"
  "list";
  height: 80vh;
}
.search-bar {
 grid-area: 'header';
}

.map {
 grid-area: 'map';
}

.list {
 grid-area: "list";
 height: 40vh;
}
.list::-webkit-scrollbar{
  display: none;
}

</style>