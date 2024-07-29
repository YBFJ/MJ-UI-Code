import { createApp } from 'vue'
import App from './App.vue'
import "./lib/gulu.scss"
import {router} from './router'
import './index.scss'
import 'github-markdown-css'
import Markdown from './components/Markdown.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
app.component("Markdown", Markdown)
