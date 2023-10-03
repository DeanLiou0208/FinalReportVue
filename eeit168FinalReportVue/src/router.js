import { createWebHistory,createRouter } from "vue-router";

import Home from './views/HomeView.vue'
import Login from './views/LoginView.vue'
import Shop from './views/ShopView.vue'
import Forum from './views/ForumView.vue'
import Hospital from './views/HospitalView.vue'
import Register from './views/RegisterView.vue'


const routes=
[
{
    path : "/home",
    component:Home,
},
{
    path : "/login",
    component : Login,
},
{
    path : "/shop", 
    component:Shop,
},
{
    path : "/forum", 
    component : Forum,
},
{
    path : "/hospital",
    component : Hospital,
},
{
    path : "/register",
    component : Register
}

]

const router=createRouter({history:createWebHistory(),routes,})

export default router;