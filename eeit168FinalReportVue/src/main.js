
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(VueCookies)
app.mount('#app')
