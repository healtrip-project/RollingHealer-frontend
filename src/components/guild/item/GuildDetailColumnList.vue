<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router"; 
const props = defineProps({
  items: {
    type: Array,
  },
});

const route = useRoute();
const router = useRouter();
const page = ref(1);

console.dir(props.items)

const search = ref('')

const goPostDetail = (postId) => {
  router.push({name : "PostDetail", params: {id: postId}})
}

//  코드 에러가 발생하고 있으나 왜 발생하는지 이유를 모른다
    
</script>

<template>
  <v-card
  color="#383838"
  class="column"
  >
    <v-data-iterator
      :items="items"
      :items-per-page="3"
      :search="search"
    >
      <template v-slot:header>
        <v-toolbar class="px-2" color="#383838" elevation="0">
          <v-text-field
          label="칼럼을 검색하세요!"
            v-model="search"
            clearable
            density="comfortable"
            hide-details
            placeholder="찾고있는 칼럼의 제목을 입력하세요."
            prepend-inner-icon="mdi-magnify"
            style="max-width: 700px;"
            variant="underlined"
          ></v-text-field>
          
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid>
          <v-row dense>
            <v-col
              v-for="item in items"
              :key="item.title"
              cols="auto"
              md="4"
            >
              <v-card class="pb-3" elevation="5" flat color="#000000">
                <v-img :src="item.raw.img ? item.raw.img : 'https://cdn.pixabay.com/photo/2022/11/14/10/37/chinese-lanterns-7591296_640.jpg'"></v-img>

                <v-list-item class="mb-2" :subtitle="item.raw.createBy ">
                  <template v-slot:title>
                    <strong class="text-h6 mb-2">{{ item.raw.title }}</strong>
                  </template>
                </v-list-item>

                <div class="d-flex justify-space-between px-4" >
                  <div class="d-flex align-center text-caption text-medium-emphasis me-1">
                    <v-icon icon="mdi-clock" start color="white" ></v-icon>
                    <div class="text-truncate" >{{ item.raw.createAt }}</div>
                  </div>

                  <v-btn
                    variant="tonal"
                    size="small"
                    class="text-none"
                    @click="goPostDetail(item.raw.postId)"
                  >Read
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn
            :disabled="page === 1"
            icon="mdi-arrow-left"
            density="comfortable"
            variant="tonal"
            rounded
            @click="prevPage"
          ></v-btn>

          <div class="mx-2 text-caption">
            Page {{ page }} of {{ pageCount }}
          </div>

          <v-btn
            :disabled="page >= pageCount"
            icon="mdi-arrow-right"
            density="comfortable"
            variant="tonal"
            rounded
            @click="nextPage"
          ></v-btn>
        </div>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<style scoped>
.text-truncate {
  color: white;
}
</style>
