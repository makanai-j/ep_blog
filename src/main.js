import { createApp } from 'vue'
import './style.css'
import './reset.css'
import App from './App.vue'
import GlobalPlugin from './components/plugins/GlobalPlugin.js'
import LoadScript from './components/plugins/LoadScript'
import router from './router'
import GetURL from './components/plugins/GetURL'

createApp(App).use(GlobalPlugin).use(LoadScript).use(router).use(GetURL).mount('#app')
