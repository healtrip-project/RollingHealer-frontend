<script setup>
import { getGuildDetails, getGuildPosts, joinGuild, getGuildMemberList } from "@/api/v1/guild";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoginInfoStore } from "@/stores/loginInfo";
const route = useRoute();
const router = useRouter();

const LoginInfoStore = useLoginInfoStore();

const userInfo = computed(() => LoginInfoStore.userInfo);
const guildDetails = ref({});
console.dir(userInfo.value);
console.dir(guildDetails);

const getGuild = () => {
  getGuildDetails(
    route.params.alias,
    ({ data }) => {
      // console.dir(data);
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

// 길드 가입
const guildJoin = () => {
  if (!userInfo.value.guildId) {
    alert("길드 가입 완료");
    joinGuild(
      route.params.id,
      userInfo.value.userId,
      ({ data }) => {
        // console.log(data);
        getGuild();
        LoginInfoStore()
      },
      (error) => {
        console.log(error);
      }
    );
  } else {
    if (!confirm("당신은 이미 가입한 길드가 있습니다. 길드를 변경하시겠습니까?")) {
      // 취소(아니오) 버튼 클릭 시 이벤트
      alert("취소(아니오)를 누르셨습니다.");
    } else {
      // 확인(예) 버튼 클릭 시 이벤트
      alert("길드가 변경되었습니다.");
      joinGuild(
        route.params.id,
        userInfo.value.userId,
        ({ data }) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
};


const guildMemberlist = ref([]);
const getGuildMembers = () => {

  getGuildMemberList(
    route.params.id,
    ({ data }) => {
      console.log(data);
      guildMemberlist.value = data;
    },
    (error) => {
      console.log(error);
    }
  )
}
getGuildMembers()

</script>

<template>
  <div class="main-container">
    <div class="left-side">
      <v-card variant="text">
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
          <v-btn density="compact" variant="outlined"> 정보수정 </v-btn>
        </v-card-item>
        <v-card-item v-if="userInfo.guildId != guildDetails.guildId">
          <v-btn density="compact" variant="outlined" @click="guildJoin"> 길드가입 </v-btn>
        </v-card-item>
        <v-card-item class="guild-description">
          {{ guildDetails.description }}
        </v-card-item>

        <v-list lines="two" class="guild-user-list">
          <v-list-subheader class="guild-user-list-header"
            >길드원 목록</v-list-subheader
          >
          <v-list-item
            v-for="member in guildMemberlist"
            :key="member.userId"
            :title="member.userId"
            :subtitle="member.userNickname"
            prepend-avatar="https://randomuser.me/api/portraits/women/8.jpg"
          >
        </v-list-item>
        </v-list>
      </v-card>
    </div>

    <div class="main-content">
      <div class="guild-action-list">
        <div class="guild-column">칼럼</div>
        <div class="guild-healingplan">힐링플랜</div>
      </div>
      <div class="guild-post-list">
        <div>길드 자유게시판</div>

        <!-- <div v-if> -->
        <v-btn variant="tonal" @click="goGuildPostWrite"> 게시글 작성 </v-btn>
        <!-- </div> -->

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
  /* text-align: center; */
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

.guild-post-content {
  margin: 10px;
  background-color: #0e0e0e;
  border-radius: 30%;
  /* justify-content: center; */
  text-align: center;
}
</style>
