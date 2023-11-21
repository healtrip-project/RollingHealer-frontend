<script setup>
import { ref } from "vue";
import { uploadImage } from "@/api/v1/file"
 const uploadFiles= ref([]);
 const isActive = ref(false);
 const showDialog=ref(false);
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

  const file=e.dataTransfer.files[0]
  console.dir(file);
  setFileInfo(file)
};

const handleFilesChange=(e)=>{
  const file=e.target.files[0]
  console.dir(file)
  uploadFiles.value.push(file);
  console.log(uploadFiles.value)
}

const setFileInfo = (file) => {
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
  };
const handleUpload=()=>{
  console.dir(uploadFiles.value)
  uploadImage(uploadFiles.value,
  ({data})=>{
    console.log(data)
  },
  (error)=>{

  })
  showDialog.value=false;
}
const setUploadedInfo=(info)=>{
  fileInfos.value.push(info);
}
const testBtn=()=>{
  showDialog.value=true;
}
</script>

<template>
  <button @click="testBtn">테스트</button>
  <v-dialog
      v-model="showDialog"
      persistent
      width="auto"
    >
  <div>
    <label for="input-file"
    class="drop-area" 
    :class="{'active':isActive}" 
    @dragover.prevent="handleDragOver" 
    @dragenter.prevent="handleDragEnter" 
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop">
    <div class="drop-placeholder" v-if="uploadFiles.length==0">
      <v-icon icon="mdi-image-multiple-outline"></v-icon><p >업로드할 이미지를 올려주세요.</p>
    </div>
    <div v-else>
      {{ fileInfos }}
    </div>
    </label>
    <input id="input-file" type="file" name="input-file" @change="handleFilesChange" style="display: none" encType="multipart/form-data" accept="image/*" multiple/>
    <button type="button" @click.prevent="handleUpload">업로드</button>
 </div>
  </v-dialog>
</template>

<style scoped>
.drop-area {
 width: 300px;
 height: 300px;
 border: 2px dashed var(--vt-c-text-dark-2);
}

.active {
  background-color: #efeef3;
  border-color: #111;
}

.drop-placeholder{
  font-size: 1rem;
  font-weight: bold;
  color: yellowgreen;
}
</style>