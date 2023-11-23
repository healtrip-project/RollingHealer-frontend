<script setup>
import { computed } from 'vue';

const props = defineProps({
  itemList: {
    type:Object,
  },
  }
)
const emits = defineEmits(['onLoad','placeClick'])
const load = () => {
  emits('onLoad');
  console.log(props)
}
const placeClick = (e) => {
  console.log(e)
  console.log(e.target.listKey)
  emits('placeClick');
}

</script>

<template>
    <v-infinite-scroll :height="350" :items="itemList"  @Load="load" >
      <template v-for="(item,index) in itemList" :key="index">
        <div :class="['pa-2','list-item-box', index % 2 === 0 ? 'bg-grey-lighten-3' : '']">
          <v-card
        :class="[ 'item-card']" 
        color="white"
        width="180"
        height="100"
        :density="'compact'"
        
        @click="placeClick"
        hover
        >
        <v-card-title color="red">{{item.title}}</v-card-title>
        <v-card-item>{{item.addr1}}</v-card-item>
        <v-card-item>{{ item.addr2 }}</v-card-item>
            </v-card>
        </div>
      </template>
      <template v-slot:empty>
      <v-alert type="warning">검색 결과가 없습니다.</v-alert>
    </template>
    </v-infinite-scroll>
  </template>

<!-- :subtitle="`${item.addr1}  ${item.addr2}`" -->
<style scoped>
  .list-item-box{
    
  }
  .item-card{
    font-size: 0.8rem;
  }
</style>