import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import GlobalPlugin from './components/plugins/GlobalPlugin.js'
import LoadScript from './components/plugins/LoadScript'

createApp(App).use(GlobalPlugin).use(LoadScript).mount('#app')
