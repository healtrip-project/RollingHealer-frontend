<script setup>
import { Editor } from "@tiptap/vue-3";
import { computed,ref } from "vue";
import { useRouter } from "vue-router";
import { firstImageParingTest,contentImageParser } from "@/utils/image";
const emits=defineEmits(['clickItem'])
const props=defineProps({
    itemList:{
      type:[Array, Object],
      
    }
  }) 
  const router=useRouter()
    
  // const slideStyle=ref({
  //   backgroundColor:'var(--rhp-c-background-1)',
    
  // });
  const heartStyle=ref({
    color:'var(--rhp-c-background-3)',

  })

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
           v-slot="{ isSelected, toggle,}"
           v-for="(item,index) in itemList"
        :key="index"
        >
        <v-card
        :class="['d-flex justify-center','text-center','ma-4','heart-box','rounded-lg','grey-darken-4']"
        :style="{backgroundColor:'black'}"
        width="130"
        height="130"
        @click="toggle"
        :to="(item?.postId&&{ name: 'PostDetail', params: { id: item.postId } })"
        hover 
        :image="contentImageParser(item)"
        >
            <div class=" d-flex flex-column mt-11 w-100"><p class="title-text">{{ item?.title }}</p><p class="low-text">{{ item?.createBy }}</p></div>
            
              <div
                class="text-h3
                 text-end heart-button
                 "
              >
                <v-btn v-show="!(item?.postId)" :style="heartStyle" :icon="isSelected ? 'mdi-heart' : 'mdi-heart-outline'"></v-btn>
              
              </div>
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
  font-size: 1rem;
  word-break: keep-all;
  color:whitesmoke;
  justify-content: center;
  margin-bottom: 1rem;
  text-shadow: #000000 0.1rem 0.3rem 5px;

}
.low-text{
  font-weight: bold;
  font-size: 0.9rem;
  word-break: keep-all;
  color:whitesmoke;
  justify-content: flex-end;
  align-self: flex-end;

  padding-bottom: 1rem;
  padding-right: 1rem;
}

</style>