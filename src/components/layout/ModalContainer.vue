<script setup>
  import { ref } from "vue";
  const showModal =ref(true);

  const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
  <div>
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span @click="showModal = false" class="close">&times;</span>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(38, 38, 38, 0.5); /* #262626 with 0.5 opacity */
}

.modal-content {
  background-color: #fefefe;
  color: black;
  padding: 20px;
  border: 1px solid #888;
  width: 500px;
  height:400px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

</style>