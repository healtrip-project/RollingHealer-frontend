<script setup>

import { ref ,computed,watch} from "vue";
import { useLoginInfoStore, } from "@/stores/loginInfo";
import { tokenRegeneration } from "@/api/v1/user";
import NavButton from "@/components/common/NavButton.vue"
  const isShowLoginDialog=ref(false)
  const userId = ref("");
const password = ref("");
const loginStore = useLoginInfoStore();
const userInfo = computed(() => loginStore.userInfo);
const isLogin = computed(() => loginStore.isLogin);
  const login = () => {
    loginStore.userLogin({
      userId: userId.value,
      password: password.value
    })

    watch(isLogin, (newValue) => {
      if (newValue) {
        loginStore.getUserInfo()
        isShowLoginDialog.value = false
      }
    })
    
};
const logout = () => {
      loginStore.userLogout()
    }
</script>

<template>
  <v-container class="nav-login-box ms-10">
    <div class="nav-list-item" v-if="!isLogin">
      <NavButton>로그인</NavButton>
      <v-dialog 
      activator="parent"
      v-model="isShowLoginDialog"
      >
      <v-sheet width="300" class="mx-auto">
        <v-form fast-fail @submit.prevent="login">
          <v-text-field
          v-model="userId"
          label="id"
          placeholder="아이디"
          ></v-text-field>
          
          <v-text-field
          v-model="password"
          label="password"
          type="password"
          placeholder="비밀번호"
          ></v-text-field>
          
          <v-btn type="submit" block class="mt-2" >로그인!</v-btn>
        </v-form>
      </v-sheet>
    </v-dialog>
    </div>
    <div class="nav-list-item" v-else>
    <span>마이페이지</span>
    <span class="ms-5" @click="logout">로그아웃</span>
    </div>
</v-container>
</template>

<style scoped>
  .nav-login-box{
    padding: 0;
    width: auto;
  }
  .nav-list-item{
    padding: 0.5rem;
    font-size:1rem;
    word-break: keep-all;
  }
</style>