<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';

//금단의 막코딩
const props = defineProps({
  formData: {
    type: Object,
    required:true
  }
})
const emits = defineEmits(['handleClick'])
const data = ref({})
props.formData.forEach((v,i) => {
  data.value[props.formData[i].name]=v.value
});
const handleClick = () => {
  emits('handleClick',data.value)
}
console.log(data.value)
console.log(props.formData)
</script>

<template>
  <v-sheet width="300" class="mx-auto" v-if="data">
    <v-form fast-fail @submit.prevent>
      <v-text-field
      v-for=" (feild,index) in formData"
      :key="index"
        v-model="data[formData[index].name]"
        :label="formData[index].name"
        color="black"
        :base-color="'var(--rhp-c-background-1)'"
      ></v-text-field>
      <v-btn  type="button" block class="mt-2" @click.prevent="handleClick"><slot></slot></v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped>

</style>