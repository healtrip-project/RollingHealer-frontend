<script setup>
import { ref } from 'vue';
import { getPostDetails } from "@/api/v1/post";
import { onMounted } from "vue"; 
import { useRoute } from "vue-router";

const route = useRoute();

// 게시글의 상세 정보를 저장할 반응형 변수
const postDetails = ref({});

const getPost = () => {
    getPostDetails(
        route.params.id,
        ({ data }) => {
            console.dir(data)
            postDetails.value = data;
        },
        (error) => {
            console.log(error);
        }
    );
}

getPost();
</script>

<template>

    <div class="post-title-container">
        <div class="post-title">제목 : {{ postDetails.title }}</div>
    </div>

    <div class="post-detail-container">
        <div class="post-writer-container">
            <div class="post-createAt">작성자 : {{ postDetails.createBy }}</div>
            <!-- <div class="post-createAt-guild">길드 : {{ postDetails.guildId }}</div> -->
        </div>
        <div class="post-content">내용 : {{  postDetails.content }}</div>
        <div class="post-createBy">작성일 : {{ postDetails.createAt }}</div>

    </div>
</template>

<style scoped>
.post-title-container {
    max-width: 600px;
    height: 600px;
    margin: auto;
    background-color: #0E0E0E;
    color: white;
    padding: 20px;
    border-radius: 10px;
}

.post-writer-container {
    max-width: 600px;
    margin: auto;
    background-color: #0E0E0E;
    color: white;
    padding: 20px;
    border-radius: 10px;
}
.post-detail-container {
    max-width: 600px;
    margin: auto;
    background-color: #383838;
    color: white;
    padding: 20px;
    border-radius: 10px;
}

.header .title-section h1 {
    font-size: 1.5em;
    margin-bottom: 20px;
}

.user-info-bar {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}

.user-details .user-nickname {
    font-weight: bold;
}

.image-container {
    margin-bottom: 20px;
}

.image-container .post-image {
    width: 100%;
    border-radius: 10px;
}

.post-text {
    font-size: 0.9em;
    line-height: 1.6;
}
</style>
