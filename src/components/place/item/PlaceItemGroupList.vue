<script setup>
import { computed,ref } from "vue";
import { useRouter } from "vue-router";

const props=defineProps({
    itemList:{
      type:Array,
      
    }
  }) 
  const router=useRouter()
    
  // const slideStyle=ref({
  //   backgroundColor:'var(--rhp-c-background-1)',
    
  // });
  const heartStyle=ref({
    color:'var(--rhp-c-background-3)',

  })
  console.log(props.itemList)
  const handleClick=(e,item)=>{
    console.log(item)
    if(item?.postId){
      router.push({ name: 'PostDetail', params: { id: item.postId } })
    }
  }
</script>

<template>
  <v-container>
    <v-row>
      <slot name="header" class="title-text"></slot>
    </v-row>
    <v-row>
      <v-sheet
    class="item-group-list-area "
    max-width="800">
    <v-slide-group 
    selected-class="bg-primary"
    show-arrows
    center-active
    >

          <v-slide-group-item
           v-slot="{ isSelected, selectedClass, toggle,}"
           v-for="(item,index) in itemList"
        :key="index"
        @click="()=>handleClick(item)"
           >
            <v-card
              :class="['d-flex justify-center','text-center','ma-4','heart-box','rounded-lg','grey-darken-4', selectedClass]"
              :style="{backgroundColor:'black'}"
              width="130"
              height="130"
              @click="toggle"
              hover 
              :image="item.firstimage || item.firstimage2 "
            >
            <div class="mt-10"><p class="title-text">{{ item?.title }}</p></div>
              <div
                class="text-h3
                 text-end heart-button
                 "
              >
                <v-btn :style="heartStyle" :icon="isSelected ? 'mdi-heart' : 'mdi-heart-outline'"></v-btn>
              
              </div>
              <slot name="createBy"></slot>
            </v-card>
        </v-slide-group-item>
  </v-slide-group> 
  </v-sheet>
    </v-row>
  </v-container>
  
</template>

<style scoped>
.item-group-list-area{
  background-color: var(--rhp-c-background-1);
  color:var(--rhp-c-background-3)
}
.heart-box:deep(.heart-button){
  visibility: hidden;
  position: absolute;
  bottom: 0;
  right: 0;
}
.heart-box:hover:deep(.heart-button){
  visibility: visible;
}
.title-text{
  font-weight: bold;
  font-size: 0.9rem;
  word-break: keep-all;
  color:whitesmoke;
  justify-content: center;
}

</style>