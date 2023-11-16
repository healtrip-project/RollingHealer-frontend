import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MainView.vue'
import MainPageVue from '@/components/main/MainPage.vue'

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
  ]
})


export default router
