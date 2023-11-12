import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createNaverMap } from "vue3-naver-maps";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


import App from './App.vue'
import router from './router'

const app = createApp(App)
const { VITE_API_KEY_NMAP } = import.meta.env
const pinia =createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
if (VITE_API_KEY_NMAP !== null && VITE_API_KEY_NMAP.trim() !==""){
  app.use(createNaverMap, {
    clientId: VITE_API_KEY_NMAP, // Required
    category: "ncp", // Optional
    subModules: [], // Optional, "panorama" | "geocoder" | "drawing" | "visualization"
  });
}

app.mount('#app')
