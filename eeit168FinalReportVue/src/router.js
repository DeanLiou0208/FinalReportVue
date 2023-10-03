import { createWebHistory,createRouter } from "vue-router";

import Home from'./views/HomeView.vue'
import Login from'./views/LoginView.vue'
const routes=[
{path:"/home" ,component:Home,},
{path:"/login",component:Login,}
]

const router=createRouter({history:createWebHistory(),routes,})

export default router;