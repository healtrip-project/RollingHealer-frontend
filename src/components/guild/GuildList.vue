<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { getGuild } from "@/api/v1/guild"

const router = useRouter();
const guildlist = ref([]);

const getGuildList = () => {
    getGuild(
        ({ data }) => { 
            console.dir(data);
            guildlist.value = data;        
        },
        (error) => {
            console.log(error);
        }) 
}

// 여러 개의 기본 이미지 URL들을 배열로 정의
const defaultImageUrls = [
  'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D',
  'https://cdn.pixabay.com/photo/2022/11/14/10/37/chinese-lanterns-7591296_640.jpg',
  'https://cdn.pixabay.com/photo/2020/06/30/15/03/table-5356682_640.jpg',
  'https://cdn.pixabay.com/photo/2019/06/25/13/59/city-4298285_640.jpg'
  // 추가 이미지 URL들...
];

// 검색어를 저장할 ref 생성
const searchQuery = ref('');


// 글 작성 페이지로 이동하는 함수
const goToWriteGuild = () => {
  router.push({name: "GuildMake"})  // 글 작성 페이지로 이동하는 로직...
};



getGuildList();

</script>

<template>
    <div class="container">
    <!-- Controls for search and adding new guild -->
    <div class="controls">
      <div class="vue-name">길드 리스트</div>
      <input type="text" v-model="searchQuery" placeholder="검색..." class="search-input" hidden/>
      <button @click="goToWriteGuild" class="write-guild-btn">길드 생성</button>
    </div>
    <!-- Guilds container -->
    <div class="guilds-container">
      <div v-for="(guild, index) in guildlist" :key="guild.alias" class="guild-item">
        <RouterLink :to="{ name: 'GuildDetail', params: { alias: guild.guildAlias , id:guild.guildId} }"> 
       <!-- Extract the first image from guild content and use it as the background -->
        <div class="guild-image" :style="{ backgroundImage: 'url(' + defaultImageUrls[index % defaultImageUrls.length] + ')' }">
         <!-- <div class="guild-image" :style="{ backgroundImage: 'url(' + extractFirstImage(guild.content, index) + ')' }"> -->
          <!-- guild text content -->
          <div class="guild-content">
            <!-- guild 제목 -->
            <h2 class="guild-title">{{ guild.guildName }}</h2>    
            <!-- 목표 -->
            <p class="goal">#{{ guild.goal }}</p>    
            <!-- guild 작성자 -->
            <p class="author">{{ guild.createdBy }}</p>       
            <!-- 생성일 -->
            <p class="date">{{ guild.createdAt }}</p>     
          </div>
        </div>
        </RouterLink>

      </div>
    </div>
  </div>
</template>

<style scoped>
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




/*  */
.guilds-container {
  /* Removed grid-column styling */
}

.guild-item {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s ease;
  margin-bottom: 1rem; /* Add space between items */
}

.post-item:hover {
  transform: translateY(-5px);
}

.guild-image {
  position: relative;
  height: 200px;
  background-size: cover;
  background-position: center;
  /* opacity: 0.8; */
}

.guild-content {
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

.guild-title {
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.author,
.organization,
.goal,
.date {
  font-weight: bold;
  display: block;
}


</style>