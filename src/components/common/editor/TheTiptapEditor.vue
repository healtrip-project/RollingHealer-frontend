<script setup>
import { useEditor, EditorContent,BubbleMenu,FloatingMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { ref,onBeforeUnmount,watch } from "vue"
import { Node } from '@tiptap/core'
import EditorPlanNode from './node/EditorPlanNode';
const props=defineProps({
  isEdit:{
    type:Boolean,
    required:true,
  }
})

const editor = useEditor({
  content: `
    <editor-plan></editor-plan>
  `,
  editable:props.isEdit,
   editorProps: {
    attributes: {
      class: 'editor-container',
    },
  },
  extensions: [
    StarterKit,
    EditorPlanNode,
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
const updateBubbleMenu=()=>{
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
    v-if="editor"
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
      <v-btn :active="editorMenuListStatus[0]" @click="editor.chain().focus().toggleBold().run()">
        <v-icon icon="mdi-format-bold"></v-icon>
      </v-btn>
      
      <v-btn :active="editorMenuListStatus[1]" @click="editor.chain().focus().toggleItalic().run()">
        <v-icon>mdi-format-italic</v-icon>
      </v-btn>
      
      <v-btn :active="editorMenuListStatus[2]" @click.stop="">
        <v-icon>mdi-format-underline</v-icon>
      </v-btn>
      
      <v-btn>
        <v-icon>mdi-format-color-fill</v-icon>
      </v-btn>
    </v-btn-group>
  </bubble-menu>
  <floating-menu
  :editor="editor"
  :tippy-options="{ duration: 250, 
    interactiveDebounce: 75,
    delay:100,
    }"
  v-if="editor"
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
    <v-btn :active="editorMenuListStatus[2]" @click="addPlanNode">
        <v-icon>mdi-format-underline</v-icon>
      </v-btn>
  </v-btn-group>
  </floating-menu>
  <editor-content class="tiptap-container" :editor="editor" />
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
.tiptap-container:deep(p){

}
header{
  background-color: white;
}
.tiptap-container{
  height:100%;
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
}s

.tiptap-editor a {
  color: #4a90e2;
  text-decoration: none;
}

.tiptap-editor a:hover {
  text-decoration: underline;
}

.tiptap-editor strong {
  color: #fff;
}

.tiptap-editor em {
  color: #fff;
}
</style>