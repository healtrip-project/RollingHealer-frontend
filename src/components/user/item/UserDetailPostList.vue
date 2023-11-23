<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router"; 
const props = defineProps({
  itemList: {
    type: Array,
  },
});

const page = ref(1);

</script>

<template>
<div class="container">

  <div class="content-container">
    <v-data-iterator
    class="post-list"
    :items="props.itemList"
    :page="page"
    :items-per-page="6"
    >
    <template v-slot:default="{ items }">
      <template v-for="(item, i) in items" :key="i">
        <RouterLink :to="{ name: 'PostDetail', params:{id:item.raw.postId}}">
          <v-card 
          class="mx-auto"
          max-width="90%"
          v-bind="item.raw" 
          variant="elevated" 
          elevation="10"
          density="compact" 
          link
          color="#383838"
          >
        </v-card>
      </RouterLink>
      
    </template>
      </template>
    </v-data-iterator>
    <v-pagination class="list-pagination" :length="5" v-model="page">
    </v-pagination>
  </div>
</div>
</template>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  height:100%;

}
.container{
  display: block;
  height:100%;
}

.post-list {
  flex: 2 1 0;
  padding: 10px;
  
}

.list-pagination {
  flex: 1 0 1;
  justify-self: flex-end;
}

.mx-auto{
  margin: 6px;
} 
</style>
