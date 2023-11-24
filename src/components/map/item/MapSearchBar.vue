<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';

const searchQuery = ref({
  sidocode: 1,
  contnet_type_id: 0,
  title:'',
})
const 지역목록=[
 { value: 1, name: '서울' },
 { value: 2, name: '인천' },
 { value: 3, name: '대전' },
 { value: 4, name: '대구' },
 { value: 5, name: '광주' },
 { value: 6, name: '부산' },
 { value: 7, name: '울산' },
 { value: 8, name: '세종특별자치시' },
 { value: 31, name: '경기도' },
 { value: 32, name: '강원특별자치도' },
 { value: 33, name: '충청북도' },
 { value: 34, name: '충청남도' },
 { value: 35, name: '경상북도' },
 { value: 36, name: '경상남도' },
 { value: 37, name: '전라북도' },
 { value: 38, name: '전라남도' },
 { value: 39, name: '제주도' }
];

const 관광지유형 = [
 { value: 0, name: '종류' },
 { value: 12, name: '관광지' },
 { value: 14, name: '문화시설' },
 { value: 15, name: '축제공연행사' },
 { value: 25, name: '여행코스' },
 { value: 28, name: '레포츠' },
 { value: 32, name: '숙박' },
 { value: 38, name: '쇼핑' },
 { value: 39, name: '음식점' }
];
const test = ref(false)
onMounted(() => {
  test.value = true;
})
const emits = defineEmits(['search'])
const handleSearch = () => {
  emits('search',searchQuery.value)
}
</script>
<template>
  <v-row v-if="test" class="search-bar" no-gutters>
    <v-col cols="3">
      <v-select
        :items="지역목록"
        label="지역"
        item-title="name"
        item-value="value"
        v-model="searchQuery.sidocode"
      ></v-select>
    </v-col>
    <v-col cols="3">
      <v-select
        :items="관광지유형"
        label="관광지유형"
        item-title="name"
        item-value="value"
        v-model="searchQuery.contnet_type_id"
      ></v-select>
    </v-col>
    <v-col cols="4">
      <v-text-field
      label="검색어"
      v-model="searchQuery.title"
      variant="solo"
      >
      
      </v-text-field>
    </v-col>
    <v-col cols="2 h-100 ps-2 mb-5" >
        <v-btn :style="{width:'90%'}" color="var(--rhp-c-background-2)" @click="handleSearch">검색</v-btn>
      </v-col>
  </v-row>
 </template>
 
 
 <style scoped>
 .search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: transparent;
 }
 </style>