import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MainView.vue'
import MainPageVue from '@/components/main/MainPage.vue'
import PostList from '@/components/post/PostList.vue'
import GuildList from '@/components/guild/GuildList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: HomeView,
      redirect: { name:'main'},
      children: [
        {
          path: '/',
          name: 'main',
          component: MainPageVue,
        }
      ],
  
    },
    {
      path: '/map',
      name: 'map',
      component: ()=>import("../views/MapView.vue")
    },
    {
      path: '/post',
      name: 'Post',
      component: () => import("../views/PostView.vue"),
      redirect: { name : "PostList"},
      children: [
        {
          path: '/post/list',
          name: 'PostList',
          component: PostList,
        },
      ]
    },
    {
      path: '/guild',
      name: 'Guild',
      component: () => import("../views/GuildView.vue"),
      redirect : {name : "GuildList"},
      children: [
        {
          path: '/guild/list',
          name: 'GuildList',
          component: GuildList,
        },
      ]
    },
    
  ]
})


export default router
