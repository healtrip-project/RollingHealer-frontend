<script setup>
import { computed,ref } from "vue";

const props=defineProps({
    itemList:{
      type:Array,
      
    }
  }) 
    
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
      <slot name="header"></slot>
    </v-row>
    <v-row>
      <v-sheet
    class="mx-auto  item-group-list-area"
    max-width="800">
    <v-slide-group 
    selected-class="bg-primary"
    show-arrows>

          <v-slide-group-item
           v-slot="{ isSelected, selectedClass, toggle,}"
           v-for="(item,index) in itemList"
        :key="index"
           >
            <v-card
              :class="['d-flex justify-center','ma-4','heart-box', selectedClass]"
              width="100"
              height="100"
              @click="toggle"
              hover

            >
            {{ item }}
              <div
                class="text-h3 flex-grow-1
                mt-10
                 text-end heart-button"
              >
                <v-btn :style="heartStyle" :icon="isSelected ? 'mdi-heart' : 'mdi-heart-outline'"></v-btn>
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
}
.heart-box:hover:deep(.heart-button){
  visibility: visible;
}
</style>