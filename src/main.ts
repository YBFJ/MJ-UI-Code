import { createApp } from 'vue'
import App from './App.vue'
import "./lib/gulu.scss"
import {router} from './router'
import './index.scss'

const app = createApp(App)
app.use(router)
app.mount('#app')
