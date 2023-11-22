<script setup>
import { ref } from 'vue';
import { useLoginInfoStore } from "@/stores/loginInfo";
import {writePost} from "@/api/v1/post"
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import TheTiptapEditor from "../common/editor/TheTiptapEditor.vue";

const router = useRouter();

const title = ref(''); // title 저장 ref 변수
const content = ref(''); // content를 저장할 ref 변수
const isUseFile = ref(0);
const createBy = ref("");
const profileImg = ref("");

const userStore = useLoginInfoStore();
console.dir(userStore.userInfo);

onMounted(() => {
    if (userStore.userInfo.userId) {
        createBy.value = userStore.userInfo.userId;
        // profileImg.value = userStore.userInfo.userThumbnailFileUrl;
    } 
});


// 글 작성 제출 핸들러
function submitPost() {
    writePost(
        {
            title: title.value,
            content: content.value,
            isUseFile: isUseFile.value,
            createBy: createBy.value
        },
        ({ status }) => { 
            if (status === 201) {
                alert("등록이 완료되었습니다.");
                movePostList();
            }
        },
        (error) => {
            console.log(error);
        }
        )
        
        console.log(content.value);
    }
    
const movePostList = () => {
    router.push({name: "PostList"})
}
const rules = {
  required: value => !!value || '필수 작성 필요',
};
</script>

<template>
  <div>
    <div class="post-write-container">
      <div class="vue-name">칼럼 작성하기</div>
      <div class="post-detail-container">
        <div class="user-info-bar">
          <!-- 유저 프로필 이미지 -->
          <img :src="profileImg" alt="User Profile" class="profile-image" />
          <!-- 유저 정보 표시 -->
          <div class="user-details">
            <div class="user-id" hidden>{{ userStore.userInfo.userId }}</div>
            <!-- guildId 기준으로 가져오기 필요 : Guild 이름-->
            <div class="user-nickname">
              {{ userStore.userInfo.userNickname }}
            </div>
            <div class="user-guild">{{ userStore.userInfo.guildId }}</div>
          </div>
        </div>

      </div>
      <div class="post-title-container">
        <div>
          <!-- Text input for TITLE -->
          <v-text-field
            label="제목을 입력하세요"
            :rules="[rules.required]"
            variant="underlined"
            hide-details="auto"
            v-model="title"
            >
            <!-- Text input for content -->
          </v-text-field>
          <br/>
          <div class="post-writer-container">
            <the-tiptap-editor class="content-input" :is-edit="true" v-model="content"></the-tiptap-editor>

          </div>
          </div>
        <input type="number" class="useFile" v-model="isUseFile" hidden />
      </div>
      <div class="post-detail-container">
       
        <v-btn prepend-icon="$vuetify" variant="tonal" @click="submitPost">글 작성하기</v-btn>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.user-info-bar {
  /* 유저 정보 바 스타일 */
  background-color: #0e0e0e; /* 어두운 그레이 배경색 */
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
  border: 2px solid #ffffff; /* 하얀색 경계선 */
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
.post-write-container {
  /* 스타일은 목업에 맞게 조정하세요. */
  
}

.editor-container {
  /* 에디터 컨테이너 스타일 */
}

.post-title-container {
  max-width: 1000px;
  margin: auto;
  background-color: #0e0e0e;
  color: white;
  padding: 20px;
  border-radius: 10px;
}

.post-writer-container {
  max-width: 1000px;
  margin: auto;
  background-color: #383838;
  height:1000px;
  color: white;
  padding: 20px;
  border-radius: 10px;
}
.post-detail-container {
  max-width: 1000px;
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