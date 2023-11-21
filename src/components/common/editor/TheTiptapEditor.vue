<script setup>
import { useEditor, EditorContent,BubbleMenu,FloatingMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { ref,onBeforeUnmount,watch } from "vue"
import {Image } from '@tiptap/extension-image'
import EditorPlanNode from './node/EditorPlanNode';
import ImageForm from "../image/ImageForm.vue";
import { onMounted } from 'vue';
const props=defineProps({
  isEdit:{
    type:Boolean,
    required:true,
  },
  modelValue: {
    type: String,
    default:''
  }
  
})
const emits = defineEmits(['exportFileInfos','update:modelValue']);
const showUploadModal = ref(false);
const { VITE_API_BASE_URL } = import.meta.env;
const isShowDetailImage = ref(false);
const detailImage = ref(null);
const editor = useEditor({
  content: props.modelValue,
  editable: props.isEdit,
  onSelectionUpdate: () => {


    if (editor.value.isActive('image')) {
      detailImage.value= editor.value.getAttributes('image').src
      isShowDetailImage.value = true;
    }

  },
  editorProps: {
    attributes: {
      class: 'editor-container',
    },
  },
  extensions: [
    StarterKit,
    EditorPlanNode,
    Image.configure({
      HTMLAttributes: {
        class: 'view-image',
      },
      allowBase64: true
    })
  ],
})
const editorMenuList=['bold','italic','underline'];
const editorMenuListStatus=ref([false,false,false]);

const addPlanNode = () => {
  const exampleData = {
    title: "야경",
    addr1: "대충주소",
    addr2: "대충주소2",
    latitude:""
  }
  editor.value.chain().focus().insertPlanNode().run()
}
const updateBubbleMenu = () => {

  for (let i=0; i<editorMenuList.length; i++) {
    editorMenuListStatus.value[i]=editor.value.isActive(editorMenuList[i]);
  }
  // console.dir("업데이트 완료")
  // console.log(editorMenuListStatus.value)
  
}
// const UnderLineTextNode=Node.extend({
  //   name:'under-line-text',


// })


  // const toggleMultipleEditorMenu =ref([]);
  onBeforeUnmount(()=>{
    editor.value.destroy();
  })
  const handleToggleBold = () => {
    editor.value.chain().focus().toggleBold().run()
  }
  
  const handleToggleitalic=()=> {
    editor.value.chain().focus().toggleItalic().run();
  }
  
  const addImage=()=> {
    showUploadModal.value = true;
  }
  
  const handleImageUpload = (images) => {
    
    emits('exportFileInfos',images)
    for (const image of images) {
      editor.value.chain().focus().setImage({
        src: VITE_API_BASE_URL+image.fileImage,
        title: image.fileOriginName,
        alt: image.fileOriginName,
      }).createParagraphNear().selectNodeForward().run()
    }
  }

const clickImage = () => {
  console.log("테스트",editor.value)
  console.log(editor.isActive("img"))
  if (editor.value.isActive('img', { class: 'view-image' })) { console.log("나옴")}
}
</script>

<template>
  <v-container class="editor-box" >
    <bubble-menu
    :editor="editor"
    :tippy-options="{ duration: 250, 
    interactiveDebounce: 75,
    delay:100,
    onShow:updateBubbleMenu,
    }"
    v-if="editor&&isEdit"
    >
    <v-btn-group
    background-color="primary"
    variant="outlined"
    rounded="xl"
    multiple
    :elevation="2"
    divided
      class="h-auto"
      
      >
      <v-btn :active="editorMenuListStatus[0]" @click="handleToggleBold">
        <v-icon icon="mdi-format-bold"></v-icon>
      </v-btn>
      
      <v-btn :active="editorMenuListStatus[1]" @click="handleToggleitalic">
        <v-icon>mdi-format-italic</v-icon>
      </v-btn>
    </v-btn-group>
  </bubble-menu>
  <floating-menu
  :editor="editor"
  :tippy-options="{ duration: 250, 
    interactiveDebounce: 75,
    delay:100,
    }"
  v-if="editor&&isEdit"
  >
  <v-btn-group
    background-color="primary"
    variant="outlined"
    rounded="xl"
    multiple
    :elevation="2"
    divided
      class="h-auto"
      
      >
    <v-btn @click="addPlanNode">
      <v-icon icon="mdi-earth-box"></v-icon>
    </v-btn>
    <v-btn @click="addImage">
      <v-icon icon="mdi-earth-box"></v-icon>
    </v-btn>
  </v-btn-group>
  </floating-menu>
  <editor-content :onSelectionUpdate="clickImage" class="tiptap-container" :editor="editor" />
  <image-form v-if="isEdit"  v-model:showUpload="showUploadModal" @success-upload="handleImageUpload"></image-form>
  <v-dialog
  v-model="isShowDetailImage"


  >
  <v-img
    class="mx-auto"
    width="auto"
    scrollable
    height="100%"
    @click="()=>isShowDetailImage=false"
    :src="detailImage"
  >
    <template v-slot:placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
  </v-img>
  </v-dialog>
</v-container>
</template>
<style >

</style>
<style scoped>

.editor-box{
  min-height: 100px;
  height: 100%;
}
.tiptap-container:deep(.editor-container){
  height: 100%;
}

header{
  background-color: white;
}
.tiptap-container{
  height:100%;
  overflow-y:auto;
}

  .tiptap-editor h1 {
  color: #fff;
  margin-top: 24px;
  margin-bottom: 16px;  
}

.tiptap-editor h2 {
  color: #ddd;
  margin-top: 20px;
  margin-bottom: 14px;
}
.tiptap-container:deep(.view-image){
  width: 105%;
  object-fit:cover;
}
</style>