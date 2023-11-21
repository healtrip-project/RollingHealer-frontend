<script setup>
import {
  getGuildDetails,
  getGuildPosts,
} from "@/api/v1/guild";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoginInfoStore } from "@/stores/loginInfo";
const route = useRoute();
const router = useRouter();

const LoginInfoStore = useLoginInfoStore();
const userInfo = computed(() => LoginInfoStore.userInfo);
console.dir(userInfo);

const guildDetails = ref({});

const getGuild = () => {
  getGuildDetails(
    route.params.alias,
    ({ data }) => {
      console.dir(data);
      guildDetails.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};
getGuild();

const guildPostlist = ref([]);

const getGuildPostlist = () => {
  getGuildPosts(
    route.params.alias,
    ({ data }) => {
      guildPostlist.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};
getGuildPostlist();

const goGuildPostWrite = () => {
  router.push({ name: "GuildPostWrite" });
};





</script>

<template>
  <div class="main-container">
    <div class="left-side">
      <v-card variant="text">
        <template v-slot:title>
          <div>
            <v-img
              src="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D"
              height="200px"
              width="200px"
              class="guild-picture"
            >
            </v-img>
          </div>
          <v-card-item>{{ guildDetails.guildName }}</v-card-item>
        </template>

        <template v-slot:subtitle>
          <v-card-subtitle>
            {{ guildDetails.goal }}
          </v-card-subtitle>
          <v-card-subtitle>
            소속 길드원 : {{ guildDetails.userCount }}명
          </v-card-subtitle>
          <v-card-item
            v-if="userInfo.userId == guildDetails.guildManager"
            @click.stop=""
          >
            ( 정보수정 )
          </v-card-item>
        </template>

        <template v-slot:text>
          <v-card-item class="guild-description">
            {{ guildDetails.description }}
          </v-card-item>
        </template>
      </v-card>
      <v-list lines="two" class="guild-user-list">
        <v-list-subheader class="guild-user-list-header"
          >길드원 목록</v-list-subheader
        >
        <v-list-item
          v-for="n in 3"
          :key="n"
          :title="'Item ' + n"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
          prepend-avatar="https://randomuser.me/api/portraits/women/8.jpg"
        ></v-list-item>
      </v-list>
    </div>
    <div class="main-content">
      <div class="guild-action-list">
        <div class="guild-column">칼럼</div>
        <div class="guild-healingplan">힐링플랜</div>
      </div>
      <div class="guild-post-list">
        <div>길드 자유게시판</div>
        <v-btn
          prepend-icon="$vuetify"
          variant="tonal"
          @click="goGuildPostWrite"
        >
          게시글 작성
        </v-btn>
        <div
          v-for="guildpost in guildPostlist"
          :key="guildpost.postId"
          class="guildpostitem"
        >
          <div class="guild-post-content">
            <RouterLink
              :to="{
                name: 'GuildPostDetail',
                params: {
                  alias: guildDetails.guildAlias,
                  id: guildDetails.guildId,
                  postId: guildpost.postId,
                },
              }"
            >
              <h2 class="post-title">{{ guildpost.title }}</h2>
              <p class="post-createdBy">{{ guildpost.createdBy }}</p>
              <p class="post-createdAt">{{ guildpost.createdAt }}</p>
            </RouterLink>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  background-color: var(
    --color-background-lightred
  ); /* Adjust color as necessary */
}

.guild-user-list {
  background-color: var(
    --color-background-lightred
  ); /* Adjust color as necessary */
  color: var(--rhp-c-text-1);
}
.guild-user-list-header {
  color: var(--rhp-c-text-1);
}
.guild-picture {
  border-radius: 50%; /* Make the image round */
}
.main-content {
  display: flex;
  flex-direction: column;
  flex: 3; /* flex 비율 설정 */
  text-align: center;
  background-color: var(--color-background-lightsky);
  height: 100vh;
}
.guild-description {
  max-height: 10rem;
}

.guild-action-list {
  flex: 1;
}

.guild-post-list {
  flex: 1;
  background-color: #719427;
}

.guild-healingplan {
  background-color: blue;
}
.guild-column {
  background-color: blueviolet;
}
</style>
