import './assets/main.css'
import "@mdi/font/css/materialdesignicons.css";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createNaverMap } from "vue3-naver-maps";
import { createVuetify } from 'vuetify'
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as styles from 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives,
  styles,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


import App from './App.vue'
import router from './router'

const pinia =createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
const { VITE_API_KEY_NMAP } = import.meta.env
app.use(pinia)
app.use(router)
app.use(vuetify)
if (VITE_API_KEY_NMAP!==undefined&&VITE_API_KEY_NMAP !== null && VITE_API_KEY_NMAP.trim() !== "") {
  app.use(createNaverMap, {
    clientId: VITE_API_KEY_NMAP, // Required
    category: "ncp", // Optional
    subModules: [], // Optional, "panorama" | "geocoder" | "drawing" | "visualization"
  });
}

app.mount('#app')
