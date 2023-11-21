<script setup>
import { ref } from "vue";
import { uploadImage } from "@/api/v1/file"
import { watch } from "vue";


const uploadFiles= ref([]);
const isActive = ref(false);
const isUploading = ref(false);
const showError = ref(false);
const errorMessage = ref('');
const uploadProgressPercent = ref(0);
defineProps(['showUpload'])
const emits=defineEmits(['successUpload','progress','update:showUpload'])


const fileInfos=ref([]);
 const handleDragOver = (e) => {

};
const handleDragEnter=(e)=>{
isActive.value=true;
}
const handleDragLeave=(e)=>{
isActive.value=false;
}
const handleDrop = (e) => {
  isActive.value=false;
  const files=e.dataTransfer.files
  setFileInfo(files)
};

const handleFilesChange = (e) => {
  const files = e.target.files;
  setFileInfo(files)
  e.target.value = '';
}

const setFileInfo = (files) => {
  for (const file of files) {
    const { name, type } = file;
    const isImage = type.includes('image');
    const size = (file.size / (1024 * 1024)).toFixed(2) + 'mb';

    if (!isImage) {
      setUploadedInfo({ name, size, type });
      return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    setUploadedInfo({ name, size, type, imageUrl: String(reader.result) });
  };
  reader.readAsDataURL(file);
  uploadFiles.value.push(file);
  }
    
  };
const handleUpload=()=>{

  isUploading.value=true
  uploadImage(uploadFiles.value,
    ({ data }) => {
      emits('successUpload', data)
      resetForm();
      isUploading.value = false;
    },
    (error)=>{
      showError.value = true;
      errorMessage.value = "이미지 업로드에 실패했습니다. 다시 시도해주세요.";
      console.error(error);
      isUploading.value = false;
    },
    (progress) => {
      uploadProgressPercent.value = progress;
    }
  )
}
const setUploadedInfo=(info)=>{
  fileInfos.value.push(info);
}
const cancelUpload=()=> {
  resetForm()
}
const resetForm = () => {
uploadFiles.value=([]);
isActive.value=(false);
emits("update:showUpload",false)
isUploading.value=(false);
showError.value=(false);
  errorMessage.value = ('');
  fileInfos.value = ([]);
}

</script>

<template>
  <v-dialog
      :model-value="showUpload"
      @update:modelValue="newValue=>emits('update:showUpload',newValue)"
      persistent
      width="auto"
    >
  <div class="drop-area" >
    <label
    
    :class="{'active':isActive}" 
    @dragover.prevent="handleDragOver" 
    @dragenter.prevent="handleDragEnter" 
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop">
    <v-snackbar
    v-model="showError"
    timeout="1000"
    color="red"
    >
    {{errorMessage}}
    <template v-slot:actions>
      <v-btn
      color="blue"
      variant="text"
      @click="snackbar = false"
      >
      x
    </v-btn>
  </template>
</v-snackbar>
    <div class="drop-placeholder text-center " v-if="isUploading">
      <v-progress-circular 
      :model-value="uploadProgressPercent"
      color="blue-grey"
      size="128">
    </v-progress-circular>
    </div>
    <div class="drop-placeholder text-center" :class="{'active':isActive}"  v-else-if="uploadFiles.length==0">
      <p><v-icon icon="mdi-image-multiple-outline"></v-icon> <span>드래그 & 클릭으로 </span></p>
      <p><span>업로드할 이미지를 올려주세요.</span></p>
    </div>
    <div class="drop-placeholder" v-else>
      <div v-for="(file,index) in fileInfos" :key="index">
        <img class="preview-image"  :src="file.imageUrl" :alt="`${file.name} size:${file.size} type:${file.type}`" />
        <p @click.prevent="()=>{fileInfos.splice(index,1); uploadFiles.splice(index,1)}">삭제하기</p>
      </div>
    </div>
    <input id="input-file" type="file" name="input-file" @change="handleFilesChange" style="display: none" encType="multipart/form-data" accept="image/*" multiple/>
    </label>
    <button type="button" @click.prevent="handleUpload">업로드</button>
    <button type="button" class="ms-2" @click.prevent="cancelUpload">취소</button>
 </div>
  </v-dialog>
</template>

<style scoped>
.drop-area {
 width: 20rem;
 height: 20rem;
 border: 2px dashed var(--vt-c-text-dark-2);
}

.active {
  background-color: #6a6a77;
  border-color: #111;
}

.drop-placeholder{
  font-size: 0.8rem;
  font-weight: bold;
  width: 100%;
  height:100%;
  color: yellowgreen;
  overflow: auto;
}
.preview-image{
  width: 15rem;
  color:black;
}
</style>