
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ElementPlus)
app.use(router)
app.use(VueCookies)
app.mount('#app')
