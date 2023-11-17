<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import {getPost} from "@/api/v1/post"

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

const router = useRouter();

// 여러 개의 기본 이미지 URL들을 배열로 정의
const defaultImageUrls = [
  'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D',
  'https://cdn.pixabay.com/photo/2022/11/14/10/37/chinese-lanterns-7591296_640.jpg',
  'https://cdn.pixabay.com/photo/2020/06/30/15/03/table-5356682_640.jpg',
  'https://cdn.pixabay.com/photo/2019/06/25/13/59/city-4298285_640.jpg'
  // 추가 이미지 URL들...
];


// Tiptap에서 생성된 컨텐츠의 첫 번째 이미지 URL을 추출하는 함수
function extractFirstImage(content, index) {
  // DOMParser를 사용하여 HTML 문자열을 파싱
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  // 첫 번째 이미지 요소를 찾음
  const firstImage = doc.querySelector('img');
  // 이미지 요소가 있으면 그의 src 속성을 반환하고, 없으면 빈 문자열 반환
  return firstImage ? firstImage.src : defaultImageUrls[index % defaultImageUrls.length];
}

// 검색어를 저장할 ref 생성
const searchQuery = ref('');

// 글 작성 페이지로 이동하는 함수
const goToWritePost = () => {
  router.push({name: "PostWrite"})  // 글 작성 페이지로 이동하는 로직...
};

// 칼럼 리스트 가져오기
getPostList();



</script>


<template>
    <div class="container">
    <!-- Controls for search and adding new post -->
    <div class="controls">
      <div class="vue-name">칼럼 리스트</div>
      <input type="text" v-model="searchQuery" placeholder="검색..." class="search-input" />
      <button @click="goToWritePost" class="write-post-btn">글 작성</button>
    </div>
    <!-- Posts container -->
    <div class="posts-container">
      <div v-for="(post, index) in postlist" :key="post.id" class="post-item">
       <!-- Extract the first image from post content and use it as the background -->
       <RouterLink :to="{ name: 'PostDetail', params: { id: post.postId } }"> 
         <div class="post-image" :style="{ backgroundImage: 'url(' + extractFirstImage(post.content, index) + ')' }">
          <!-- Post text content -->
          <div class="post-content">
            <!-- post 제목 -->
            <h2 class="post-title">{{ post.title }}</h2>    
            <!-- post 작성자 -->
            <p class="createBy">{{ post.createBy }}</p>    
            <!-- 작성자 소속 길드 -->
            <p class="guild">{{ post.guild }}</p>           
            <!-- 생성일 -->
            <p class="createAt">{{ post.createAt }}</p>     
          </div>
        </div>
      </RouterLink>

      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.vue-name {
  font-size: 20px;
  font-weight: bold;
  padding: 0.5rem 1rem;
}

.search-input {
  flex-grow: 1;
  margin-right: 1rem;
}

.write-post-btn {
  padding: 0.5rem 1rem;
}

.posts-container {
  /* Removed grid-column styling */
}

.post-item {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s ease;
  margin-bottom: 1rem; /* Add space between items */
}

.post-item:hover {
  transform: translateY(-5px);
}

.post-image {
  position: relative;
  height: 200px;
  background-size: cover;
  background-position: center;
  /* opacity: 0.8; */
}

.post-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  color: white;
}

.post-title {
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.author,
.organization,
.date {
  font-weight: bold;
  display: block;
}

.date {
  margin-top: 0.5rem;
}
</style>