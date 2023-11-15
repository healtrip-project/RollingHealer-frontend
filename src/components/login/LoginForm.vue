<script setup>

  import { ref } from "vue";
  const userId = ref("");
  const password = ref("");

  const login = () => {

  console.log("Logging in with", username.value, password.value);

};
</script>

<template>
    <div>
      <!-- Your login form and content go here -->
      <label for="userid">Username:</label>
      <input type="text" id="userId" v-model="userId" />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />

      <button @click="login">로그인</button>
    </div>
</template>

<style scoped>

</style>