//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createNaverMap } from "vue3-naver-maps";


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createNaverMap, {
  clientId: "ejn964x06w", // Required
  category: "ncp", // Optional
  subModules: [], // Optional, "panorama" | "geocoder" | "drawing" | "visualization"
});
app.mount('#app')
