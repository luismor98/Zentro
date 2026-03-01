import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

// Estilos globales — variables CSS, fuentes, base
import './styles/variables.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
