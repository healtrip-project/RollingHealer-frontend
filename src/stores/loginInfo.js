import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('loginInfo', () => {
  const loginInfo = ref({
    accessToken: "",
    userInfo: null,
  })
  function fetchAccessToken() {
    console.log("엑세스토큰 발급요청")
    loginInfo.value.accessToken = "aaaaaa"
    console.log("테스트, 3초뒤 자동로그아웃")
    setTimeout(()=>logout(),3000)
  }
  function getUserInfomaition() {
    if (loginInfo.value?.userInfo!== null) {
      console.log(loginInfo.value.userInfo)
      return loginInfo.value.userInfo
    }
    if (loginInfo.value.accessToken === "aaaaaa") {
      console.log("정보 로딩")
      const response = { name: "테스트 유저", exp: 9999 };
      loginInfo.value.userInfo = response;
      return { name: "테스트 유저", exp: 9999 };
    }

  }
  function logout() {
    loginInfo.value.userInfo = null;
    loginInfo.value.accessToken = "";
    localStorage.removeItem('loginInfo');
  }
  function login() {
    loginInfo.value = {
      accessToken: "aaaaaa",
      userInfo: {
        name: "테스트 유저",
        exp:9999,
      }
    }
  }

  watch(loginInfo.value, (newVal, oldVal) => {
    if (newVal.accessToken === ""&&newVal.userInfo!==null) {
      console.log("토큰손실")
      fetchAccessToken()
    }
  })

  return { loginInfo,login, logout, fetchAccessToken,getUserInfomaition }
},
  {
    persist: {
      paths: ['loginInfo.userInfo'],
      storage: localStorage,
    },
  })
