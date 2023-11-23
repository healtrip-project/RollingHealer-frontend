<script setup>
import { ref, computed, watch } from "vue";
import { useLoginInfoStore } from "@/stores/loginInfo";
import { tokenRegeneration } from "@/api/v1/user";
import NavButton from "@/components/common/NavButton.vue";

const isShowLoginDialog = ref(false);
const userId = ref("");
const password = ref("");
const loginStore = useLoginInfoStore();
const userInfo = computed(() => loginStore.userInfo);
const isLogin = computed(() => loginStore.isLogin);
const login = () => {
  loginStore.userLogin({
    userId: userId.value,
    password: password.value,
  });

  watch(isLogin, (newValue) => {
    if (newValue) {
      loginStore.getUserInfo();
      isShowLoginDialog.value = false;
    }
  });
};
const logout = () => {
  loginStore.userLogout();
};

const rules = {
  required: (value) => !!value || "필수 입력",
};

const reveal = ref(false);
</script>

<template>
  <v-container class="nav-login-box ms-10">
    <div class="nav-list-item" v-if="!isLogin">
      <NavButton>로그인</NavButton>
      <v-dialog activator="parent" v-model="isShowLoginDialog">
        <div>
          <v-img
            class="mx-auto my-6"
            max-width="228"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
          ></v-img>

          <!-- 로그인 입력 카드 -->
          <v-card class="mx-auto px-6 py-8" max-width="390">
            <v-form  @submit.prevent="login">
              <v-text-field
                v-model="userId"
                :rules="[rules.required]"
                class="mb-2"
                clearable
                label="id"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :type="'password'"
                :rules="[rules.required]"
                clearable
                label="Password"
              ></v-text-field>

              <br />

              <v-card class="mb-12" color="surface-variant" variant="tonal">
                <v-card-text class="text-medium-emphasis text-caption">
                  Warning: 회원가입부터해라 After 3 consecutive failed login
                  attempts, you account will be temporarily locked for three
                  hours. If you must login now, you can also click "Forgot login
                  password?" below to reset the login password.
                </v-card-text>
              </v-card>

              <v-btn
                
                block
                color="success"
                size="large"
                type="submit"
                variant="elevated"
              >
                WelCome Healer!!
              </v-btn>
            </v-form>
            <v-card-text class="text-center">
            </v-card-text>
            <v-card-actions>
              <v-btn
                variant="text"
                color="teal-accent-4"
                @click="reveal = true"
              >
                회원가입
              </v-btn>
            </v-card-actions>




            <!-- 회원가입 입력 카드 -->
            <v-expand-transition>
              <v-card
                v-if="reveal"
                class="v-card--reveal"
                style="height: 100%"
                max-width="344"
                title="User Registration"
              >
                <v-container>
                  <v-text-field
                    v-model="first"
                    color="primary"
                    label="First name"
                    variant="underlined"
                  ></v-text-field>

                  <v-text-field
                    v-model="last"
                    color="primary"
                    label="Last name"
                    variant="underlined"
                  ></v-text-field>

                  <v-text-field
                    v-model="email"
                    color="primary"
                    label="Email"
                    variant="underlined"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    color="primary"
                    label="Password"
                    placeholder="Enter your password"
                    variant="underlined"
                  ></v-text-field>

                  <v-checkbox
                    v-model="terms"
                    color="secondary"
                    label="I agree to site terms and conditions"
                  ></v-checkbox>
                </v-container>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="success">
                    Complete Registration

                    <v-icon icon="mdi-chevron-right" end></v-icon>
                  </v-btn>
                </v-card-actions>
                <v-card-actions class="pt-0">
                  <v-btn
                    variant="text"
                    color="teal-accent-4"
                    @click="reveal = false"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-expand-transition>
          </v-card>
        </div>
      </v-dialog>
    </div>
    <div class="nav-list-item" v-else>
      <span>마이페이지</span>
      <span class="ms-5" @click="logout">로그아웃</span>
    </div>
  </v-container>
</template>

<style scoped>
.nav-login-box {
  padding: 0;
  width: auto;
}
.nav-list-item {
  padding: 0.5rem;
  font-size: 1rem;
  word-break: keep-all;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

/* 


@keyframes light-descend {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 0;
  }
}

@keyframes lux-light-effect {
  0% {
    filter: brightness(1) contrast(1);
    transform: scale(1);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
  50% {
    filter: brightness(2) contrast(1.5);
    transform: scale(1.2);
    box-shadow: 0 0 30px rgba(255, 255, 255, 1);
  }
  100% {
    filter: brightness(1) contrast(1);
    transform: scale(1);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
}

@keyframes sun-shine-effect {
  0% {
    filter: brightness(1) contrast(1);
    transform: scale(1);
  }
  50% {
    filter: brightness(2) contrast(1.5);
    transform: scale(1.1);
  }
  100% {
    filter: brightness(1) contrast(1);
    transform: scale(1);
  }
}
::v-deep.v-img::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(255, 255, 255, 0.5), transparent);
  animation: light-descend 3s ease-in-out infinite;
}

::v-deep.v-img:hover::before {
  animation: light-descend 3s ease-in-out infinite;
}

::v-deep.v-img:hover {
  animation: sun-shine-effect 2s ease-in-out infinite, lux-light-effect 2s ease-in-out infinite;
}


@keyframes sunlight-descend {
  0% {
    transform: translate(-50%, -50%) rotate(45deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(50%, 50%) rotate(45deg);
    opacity: 0;
  }
} 

*/




</style>
