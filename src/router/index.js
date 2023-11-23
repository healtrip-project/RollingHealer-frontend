import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MainView.vue'
import MainPageVue from '@/components/main/MainPage.vue'
import PostList from '@/components/post/PostList.vue'
import GuildList from '@/components/guild/GuildList.vue'
import PostWrite from '@/components/post/PostWrite.vue'
import PostDetail from '@/components/post/PostDetail.vue'
import GuildMake from '@/components/guild/GuildMake.vue'
import GuildDetail from '@/components/guild/GuildDetail.vue'
import GuildPostWrite from '@/components/guild/GuildPostWrite.vue'
import GuildPostDetail from '@/components/guild/GuildPostDetail.vue'
import PlaceList from '@/components/place/PlaceList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: HomeView,
      redirect: { name: "main" },
      children: [
        {
          path: "/",
          name: "main",
          component: MainPageVue,
        },
      ],
    },
    {
      path: "/post",
      name: "Post",
      component: () => import("../views/PostView.vue"),
      redirect: { name: "PostList" },
      children: [
        {
          path: "/post/list",
          name: "PostList",
          component: PostList,
        },
        {
          path: "/post/write",
          name: "PostWrite",
          component: PostWrite,
        },
        {
          path: "/post/detail/:id",
          name: "PostDetail",
          component: PostDetail,
        },
      ],
    },
    {
      path: "/guild",
      name: "Guild",
      component: () => import("../views/GuildView.vue"),
      redirect: { name: "GuildList" },
      children: [
        {
          path: "/guild/list",
          name: "GuildList",
          component: GuildList,
        },
        {
          path: "/guild/make",
          name: "GuildMake",
          component: GuildMake,
        },
        {
          path: "/guild/detail/:alias/:id",
          name: "GuildDetail",
          component: GuildDetail,
        },
        {
          path: "/guild/guildpost/:alias/:id",
          name: "GuildPostWrite",
          component: GuildPostWrite,
        },
        {
          path: "/guild/guildpost/:alias/:id/:postId",
          name: "GuildPostDetail",
          component: GuildPostDetail,
        },
      ],
    },
    {
      path: "/place",
      name: "Place",
      component: () => import("../views/PlaceView.vue"),
      redirect: { name: "PlaceList" },
      children: [
        {
          path: "/place/list",
          name: "PlaceList",
          component: PlaceList,
        },
      ],
    },
    {
      path: "/plan",
      name: "Plan",
      component: () => import("../views/PlanView.vue"),
      redirect: { name: "PlanList" },
      children: [
        {
          path: "/plan/list",
          name: "PlanList",
          component: ()=>import("../components/plan/PlanList.vue"),
        },
        {
          path: "/plan/write",
          name: "PlanWrite",
          component: ()=>import("../components/plan/PlanWrite.vue"),
        },
        {
          path: "/plan/detail/:id",
          name: "PlanDetail",
          component: ()=>import("../components/plan/PlanDetail.vue")
        },
        {
          path: "/plan/map",
          name: "MapMain",
          component: ()=>import("../components/map/NMAP.vue")
        },
      ],
    },
  ],
});


export default router
