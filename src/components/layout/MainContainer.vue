<script setup>
import TheTiptapEditor from "../common/editor/TheTiptapEditor.vue";
import ModalContainer from "./ModalContainer.vue";

</script>

<template>
    <div class="container">
        <slot name="header"></slot>
        <div class="main-content">
            <slot name="main"></slot>
            <ModalContainer class="editor-test-box">
                <TheTiptapEditor isEdit></TheTiptapEditor>
            </ModalContainer>
        </div>
        <slot name="footer"></slot>
    </div>
</template>

<style scoped>
.editor-test-box{
    width: 400px;
    height:300px;
}
.container{
    width: 100%;
    min-height:100vh;
    background-color: var(--rhp-c-main-background);
}
.main-content{
  width: 80%;
  margin: 0 auto;
}
</style>