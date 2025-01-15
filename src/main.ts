import './style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import bcrypt from 'bcryptjs'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
