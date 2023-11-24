<script setup>
import { ref, watch  } from 'vue';
import { useLoginInfoStore } from "@/stores/loginInfo";
import { makeGuild, checkAliasAvailability } from "@/api/v1/guild"
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { contentImageParser } from "@/utils/image";

const router = useRouter();
const userStore = useLoginInfoStore();
console.dir(userStore.userInfo);

const guildAlias = ref("")
// const guildAlias = ref("" + Math.random().toString(5) )
const guildName = ref('')
const description = ref('')
const goal= ref('')
const createdBy = ref('')
const guildManager = ref('')
const profileImg = ref("");

const { VITE_API_BASE_URL } = import.meta.env;
const isAvailableAlias = ref(false);

onMounted(() => {
    if (userStore.userInfo.userId) {
        createdBy.value = userStore.userInfo.userId;
      guildManager.value = userStore.userInfo.userId;
      profileImg.value = contentImageParser(userStore.userInfo);
    } 
});

// 입력값이 영어와 숫자만 포함되었는지 확인
const validateInput = (value) => /^[A-Za-z0-9]*$/.test(value);

// guildAlias 감시 + 중복체크 
watch(guildAlias , () => {
  checkAliasAvailability(
    guildAlias.value,
    ({ data }) => {
        isAvailableAlias.value = data;
    },
    (error) => {
        console.log(error);
    }
  )
})

// 글 작성 제출 핸들러
function submitGuild() {
    if (!validateInput(guildAlias.value) ) {
      alert("영어와 숫자만 입력 가능합니다.");
      return;
    }
    if (!guildName.value || !guildAlias.value || !goal.value || !description.value) {
    alert("길드이름 또는 설명, 목표, Alias가 비어있습니다.");
    return;
  }
    makeGuild(
        {
            guildAlias: guildAlias.value,
            guildName: guildName.value,
            description: description.value,
            goal: goal.value,
            createdBy: createdBy.value,
            guildManager: guildManager.value
        },
        ({ status }) => { 
            if (status === 201) {
                alert("길드 생성이 완료되었습니다.");
                moveGuildList();
            }
        },
        (error) => {
            console.log(error);
        }
        )
    }
    
const moveGuildList = () => {
    router.push({name: "GuildList"})
}



</script>

<template>
    <div>
        <div class="guild-write-container">
            <div class="guild-title-container">
                <div class="vue-name">길드 생성하기</div>
                <div>길드 이름</div>
                <input type="text" class="title-input" placeholder="여기에 길드 네임을 입력하세요" v-model="guildName" />
                <div>이미지 입력</div>

              </div>

            <div class="guild-detail-container">
                
            <div class="user-info-bar">
                <div class="user-createBy-gulid">길드 창시자 :  </div>
                <!-- 유저 프로필 이미지 -->
                <img :src="profileImg" alt="User Profile" class="profile-image">
                <!-- 유저 정보 표시 -->
                <div class="user-details">
                    <div class="user-id" hidden>{{ userStore.userInfo.userId }}</div>
                    <!-- guildId 기준으로 가져오기 필요 : Guild 이름-->
                    <div class="user-nickname">{{ userStore.userInfo.userNickname }}</div>
                    <div class="user-guild">{{ userStore.userInfo.guildId }}</div>
                </div>
            </div>

            <div class="editor-container">
              <v-card class="mx-auto px-6 py-8">
                <!-- Text input for content -->
                <div>길드 Alias</div>
                <v-text-field
                  label="Alias을 입력하세요"
                  variant="underlined"
                  hide-details="auto"
                  v-model="guildAlias"
                  color="primary"
                  :error-messages="!isAvailableAlias ? '불가능' : ''"
                  
                ></v-text-field>
                
  
                <div>길드 설명</div>
                <input type="text" class="content-input" placeholder="여기에 길드 설명을 입력하세요" v-model="description" />
                <div>길드 목표</div>
                <input type="text" class="content-input" placeholder="여기에 길드 목표를 입력하세요" v-model="goal" />

              </v-card>
                
            </div>
            <!-- Submit button -->
            <button class="submit-button" @click="submitGuild">글 작성하기</button>
            </div>
        
        </div>
    </div>
</template>

<style scoped>


.user-info-bar {
  /* 유저 정보 바 스타일 */
  background-color: #0E0E0E; /* 어두운 그레이 배경색 */
  padding: 1rem;
  display: flex;
  align-items: center;
  color: white; /* 흰색 텍스트 */
  margin-bottom: 1rem;
  border-radius: 25px; /* 둥근 모서리 */
}

.profile-image {
  /* 프로필 이미지 스타일 */
  width: 80px; /* 더 큰 이미지 크기 */
  height: 80px; /* 더 큰 이미지 크기 */
  border-radius: 50%; /* 원형 이미지 */
  border: 2px solid #FFFFFF; /* 하얀색 경계선 */
  margin-right: 1rem;
}

.user-details {
  /* 유저 정보 표시 스타일 */
}

.user-name {
  /* 유저 닉네임 스타일 */
  font-weight: bold;
  font-size: 1.25rem; /* 더 큰 글씨 크기 */
}

.user-guild {
  /* 유저 길드 스타일 */
  font-size: 1rem;
}
.guild-write-container {
  /* 스타일은 목업에 맞게 조정하세요. */
}

.editor-container {
  /* 에디터 컨테이너 스타일 */

}


.guild-title-container {
    max-width: 600px;
    height: 500px;
    margin: auto;
    background-color: #0E0E0E;
    color: white;
    padding: 20px;
    border-radius: 10px;
}

.guild-writer-container {
    max-width: 600px;
    margin: auto;
    background-color: #0E0E0E;
    color: white;
    padding: 20px;
    border-radius: 10px;
}
.guild-detail-container {
    max-width: 600px;
    margin: auto;
    background-color: #383838;
    color: white;
    padding: 20px;
    border-radius: 10px;
}


.title-input {
  /* Content input 스타일 */
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
  background-color: white; /* 흰색 배경 설정 */
}

.content-input {
  /* Content input 스타일 */
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
  background-color: white; /* 흰색 배경 설정 */
}

.submit-button {
  /* 제출 버튼 스타일 */
  padding: 0.5rem 1rem;
}

.vue-name {
  font-size: 20px;
  font-weight: bold;
  padding: 0.5rem 1rem;
}
</style>