<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { getGuild } from "@/api/v1/guild"

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





getGuildList();

</script>

<template>
    <div class="container">
    <!-- Controls for search and adding new guild -->
    <div class="controls">
      <div class="vue-name">칼럼 리스트</div>
      <input type="text" v-model="searchQuery" placeholder="검색..." class="search-input" />
      <button @click="goToWriteGuild" class="write-guild-btn">글 작성</button>
    </div>
    <!-- Guilds container -->
    <div class="guilds-container">
      <div v-for="(guild, index) in guildlist" :key="guild.id" class="guild-item">
       <!-- Extract the first image from guild content and use it as the background -->
        <div class="guild-image" :style="{ backgroundImage: 'url(' + defaultImageUrls[1] + ')' }">
         <!-- <div class="guild-image" :style="{ backgroundImage: 'url(' + extractFirstImage(guild.content, index) + ')' }"> -->
          <!-- guild text content -->
          <div class="guild-content">
            <!-- guild 제목 -->
            <h2 class="guild-title">{{ guild.guildName }}</h2>    
            <!-- 목표 -->
            <h2 class="guild-title">{{ guild.goal }}</h2>    
            <!-- guild 작성자 -->
            <p class="createBy">{{ guild.createBy }}</p>       
            <!-- 생성일 -->
            <p class="createAt">{{ guild.createAt }}</p>     
          </div>
        </div>
      <!-- </RouterLink> -->

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>