<script setup>
import { ref } from 'vue';
import { getGuildPostDetails, guildPostDelete, } from "@/api/v1/guild";
import { useRoute , useRouter} from "vue-router";
import TheTiptapEditor from "../common/editor/TheTiptapEditor.vue";

const route = useRoute();
const router = useRouter();
const editMode=ref(false);
// 게시글의 상세 정보를 저장할 반응형 변수
const guildPostDetails = ref({});

const getGuildPostDetail = () => {
    getGuildPostDetails(
        route.params.alias,
        route.params.postId,
        ({ data }) => {
            console.dir(data)
            guildPostDetails.value = data;
        },
        (error) => {
            console.log(error);
        }
    );
}

getGuildPostDetail();



const PostDelete = (guildpost) => {
  guildPostDelete(
    route.params.alias,
    guildpost.postId,
    guildpost,
    ({ data }) => {
      console.dir(data);
      alert("삭제 완료")
      console.log("delete success");
      router.push({name: "GuildDetail"})
    },
    (error) => {
      console.log(error);
    }
  );
};

const changeEditMode=()=>{
    editMode.value=!editMode.value
    if(!editMode.value){
        getGuildPostDetail();
    }
}

</script>

<template>

    <div class="guildPost-title-container">
        <div class="guildPost-title">제목 : {{ guildPostDetails.title }}</div>
        <div class="guildPost-content">
            <the-tiptap-editor :is-edit="editMode"  :model-value="guildPostDetails.content"></the-tiptap-editor>
        </div>   
    </div>

    <div class="guildPost-detail-container">
        <div class="guildPost-writer-container">
            <div class="guildPost-createAt">작성자 : {{ guildPostDetails.createdBy }}</div>
            <!-- <div class="guildPost-createAt-guild">길드 : {{ guildPostDetails.guildId }}</div> -->
        </div>
        <div class="guildPost-createBy">작성일 : {{ guildPostDetails.createdAt }}</div>
        <div v-if="guildPostDetails.createdBy">
              <v-btn
                variant="elevated"
                rounded="lg"
                color="blue"
                @click="changeEditMode"
                >수정</v-btn
              >
              <v-btn
                variant="elevated"
                rounded="lg"
                color="red"
                @click="PostDelete(guildPostDetails)"
                >삭제</v-btn
              >
            </div>
    </div>
</template>

<style scoped>
.guildPost-title-container {
    max-width: 600px;
    margin: auto;
    background-color: #0E0E0E;
    color: white;
    padding: 20px;
    border-radius: 10px;
}

.guildPost-writer-container {
    max-width: 600px;
    margin: auto;
    background-color: #0E0E0E;
    color: white;
    padding: 20px;
    border-radius: 10px;
}
.guildPost-detail-container {
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

.image-container .guildPost-image {
    width: 100%;
    border-radius: 10px;
}

.guildPost-text {
    font-size: 0.9em;
    line-height: 1.6;
}
</style>
