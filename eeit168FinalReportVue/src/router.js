import { createWebHistory,createRouter } from "vue-router";

import Home from './views/HomeView.vue'
import Login from './views/LoginView.vue'
import Shop from './views/ShopView.vue'
import Forum from './views/ForumView.vue'
import Hospital from './views/HospitalView.vue'
import Register from './views/RegisterView.vue'
import PetPhoto from './views/PetPhotoView.vue'
import PetPhotoViewVue from "./views/PetPhotoView.vue";


const routes=
[
{
    path :"/",
    component : Home
},
// 讓home頁面擁有兩個路徑,這樣首頁也會有
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
},
{
    path : "/petphoto",
    component : PetPhotoViewVue
}

]

const router=createRouter({history:createWebHistory(),routes,})

export default router;