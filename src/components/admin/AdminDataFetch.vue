<script setup>
import { ref } from 'vue';
import TheTempForm from '../common/temp/TheTempForm.vue';
import {getFetchPlaceData} from '@/api/v1/place'

const fetchQuery = ref([
  { name: 'numOfRows', value: 500 },
  { name: 'sidocode', value: 1, },
  { name: 'page', value: 1, },
  { name: 'content_type_id', value: 0, }
])

const handleSearch = (query) => {
  getFetchPlaceData(query, ({data}) => {
    console.log(data)
  }, (error) => {
    console.log(error)
  })

}

</script>
  
<template>
  <div>
    <TheTempForm :form-data="fetchQuery" @handle-click="handleSearch"> </TheTempForm>
  </div>
</template>

<style scoped>

</style>