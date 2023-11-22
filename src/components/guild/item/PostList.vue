<script setup>
import { ref } from "vue";
const props = defineProps({
  items: {
    type: Array,
  },
});


const page = ref(1);


</script>

<template>
  <div class="container">
    <v-data-iterator
      class="post-list"
      :items="items"
      :page="page"
      :items-per-page="7"
    >
      <template v-slot:default="{ items }">
        <template v-for="(item, i) in items" :key="i">
            
                <v-card 
                    class="mx-auto"
                    max-width="90%"
                    v-bind="item.raw" 
                    variant="elevated" 
                    density="compact" 
                    link
                >
                </v-card>
            
        </template>
      </template>
    </v-data-iterator>
    <v-pagination class="list-pagination" :length="5" v-model="page">
    </v-pagination>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.post-list {
  flex: 2 1 0;
}

.list-pagination {
  flex: 1 0 1;
}
</style>
