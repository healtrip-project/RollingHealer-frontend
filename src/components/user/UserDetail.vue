<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoginInfoStore } from "@/stores/loginInfo";
import {findById, userUploadthumbnail} from "@/api/v1/user"
import { contentImageParser } from "@/utils/image";
import {getPost} from "@/api/v1/post"
import ImageForm from "../common/image/ImageForm.vue";
import UserDetailPostList from "./item/UserDetailPostList.vue";
import TheListContentListTop from "../common/list/TheListContentListTop.vue";
import { onMounted } from "vue";

// 여러 개의 기본 이미지 URL들을 배열로 정의
const defaultImageUrl =
  "https://cdn.pixabay.com/photo/2022/11/14/10/37/chinese-lanterns-7591296_640.jpg";
const showUploadModal=ref(false)
const route = useRoute();
const router = useRouter();
const LoginInfoStore = useLoginInfoStore();
const userInfo = computed(() => LoginInfoStore.userInfo);

const userGuild = ref('');

const getUserDetail = () => {
  findById(
  route.params.userid,
  ({data}) => {
    userInfo.value = data
    console.log(data)
  },
  (error) => {
    console.log(error)
  }  

  )
}
getUserDetail();
const handleUserImage=()=>{
  showUploadModal.value=true;
}
const handleThumbnailUpload=(image)=>{
  userUploadthumbnail(
    image[0].fileImage
    ,({data})=>{
    userInfo.value.userThumbnailFileUrl=image[0].fileImage;
    LoginInfoStore.setUserThumbnailFileUrl(image[0].fileImage);
    
  },(error)=>{
    console.log(error)
  })
}
const postlist = ref([]);

const getPostList = () => {
  getPost(
    ({ data }) => {
      console.dir(data)
      postlist.value = data;
    }, (error) => {
        console.log(error);
    }
    );
}
onMounted(()=>{
  getPostList();
})
</script>

<template>
  <div class="main-container">

    <div class="left-side">
      <v-card 
        class="detail-card" 
        max-width="400"
        color="#0e0e0e"
        >
        <v-img
          class="align-front text-white"
          :src="contentImageParser(userInfo)||'https://cdn.vuetifyjs.com/images/cards/docks.jpg'"
          width="200px"
          cover
          @click="handleUserImage"
        >
        <ImageForm  v-model:showUpload="showUploadModal" single-upload @success-upload="handleThumbnailUpload"></ImageForm>
          <v-card-title>{{ userInfo.userId }}</v-card-title>
        </v-img>
        <v-card-title> {{ userInfo.userNickname }}</v-card-title>
        <v-card-subtitle class="pt-4" v-if="userInfo.guild_id ? userGuild = userInfo.guild_id : userGuild = '소속없음'"> #{{ userGuild }} </v-card-subtitle>
        <v-card-subtitle class="pt-4"> #{{ userInfo.userNickname }} </v-card-subtitle>

        <v-card-text>
          <div>{{ userInfo.description }}</div>

        </v-card-text>

        <v-card-actions>
          <v-btn 
          variant="outlined"
          color="orange"
          > 
          수정 
        </v-btn>

        </v-card-actions>
      
        
      </v-card>

      <!-- <v-card 
      class="user"
       subtitle="맴버원 목록"
       color="#0e0e0e"
      >
        
      <v-virtual-scroll
      class="user-list"
          max-height="400px"
          :items="userlist"
        >
          <template v-slot:default="{ item }">
          
            <v-card 
              class="mx-auto"
              max-width="90%"
              :title="item.userId"
              :subtitle="item.userNickname"
              color="indigo-darken-3"
              prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
              link
              >
            </v-card>
          </template>
        </v-virtual-scroll>
      </v-card> -->
    </div>
    

    <div class="main-content">
      <!-- 맴버 칼럼 & 플랜 -->
      <div class="post-list">
        <TheListContentListTop>
          {{ userInfo.userNickname }}의 칼럼
          <template #right-side>

            <!--<v-btn variant="tonal" @click="goGuildPostWrite"> 더보기 </v-btn>-->
          </template>
        </TheListContentListTop>
        <UserDetailPostList :itemList="postlist"></UserDetailPostList>
        
      </div>

    
      
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.vue-name {
  font-size: 20px;
  font-weight: bold;
  padding: 0.5rem 1rem;
}
.main-container {
  display: flex;
  height: 100vh;
}

.left-side {
  display: flex;
  max-width: 200px;
  flex: 1; /* flex 비율 설정 */
  flex-direction: column;
  flex: 1, 1, 0; /* Adjust width as necessary */
  background-color: #0e0e0e; /* Adjust color as necessary */
}

.user-list {
  background-color: var(--color-background-lightred);
  color: var(--rhp-c-text-1);
}
.user-list-header {
  color: var(--rhp-c-text-1);
}
.picture {
  border-radius: 50%; /* Make the image round */
}
.main-content {
  display: flex;
  flex-direction: column;
  flex: 3; /* flex 비율 설정 */
  /* text-align: center; */
  background-color: #383838;
  height: 100vh;
}
.description {
  max-height: 10rem;
}



.post-list {
  min-height: 50%;
  
}

.post-content {
  margin: 10px;
  background-color: #0e0e0e;
  border-radius: 30%;
  /* justify-content: center; */
  text-align: center;
}

.detail-card, .user {
  margin: 5px;
}

.user-list::-webkit-scrollbar{
  display: none;
}
</style>
