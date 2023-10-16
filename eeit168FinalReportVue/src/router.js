import { createWebHistory, createRouter } from "vue-router";

import Home from "./views/HomeView.vue";
import Login from "./views/LoginView.vue";
import Shop from "./views/ShopView.vue";
import Forum from "./views/ForumView.vue";
import Hospital from "./views/HospitalView.vue";
import Register from "./views/RegisterView.vue";
import PetPhotoViewVue from "./views/PetPhotoView.vue";
import MemberLogin from "./views/MemberLoginView.vue";
import MemberForgetPassword from "./views/MemberForgetPasswordView.vue";
import MemberRegisterAccount from "./views/MemberRegisterAccountView.vue";
import MemberRegisterInfo from "./views/MemberRegisterInfoView.vue";
import ComLogin from "./views/ComLoginView.vue";
import MemberInformation from "./views/MemberInformationView.vue";
import PersonalPetView from "./views/PersonalPetView.vue";
import Type from "./views/Type.vue";
import Product from "./views/Product.vue";
import ShopProduct from "./views/ProductPage.vue";
import ComShop from "./views/ComShop.vue";
import ShoppingCart from "./views/ShoppingCart.vue";
import ForumPost from "./views/ForumPost.vue";
import Test from "./views/test.vue";
import PetView from "./views/PetView.vue";
import PayMent from "./views/payment.vue"
import ComUpdate from "./views/ComUpdate.vue";
import ComInformation from "./views/ComInformation.vue";
import ComUpdateInfo from "./views/ComUpdateInfo.vue";
import ComRegister from "./views/ComRegister.vue";
import ComOrder from "./views/ComOrder.vue";
const routes = [
  {
    path: "/",
    component: Home,
  },
  // 讓home頁面擁有兩個路徑,這樣首頁也會有
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/shop",
    component: Shop,
  },
  {
    path: "/forum",
    component: Forum,
  },
  {
    path: "/hospital",
    component: Hospital,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/petphoto",
    component: PetPhotoViewVue,
  },
  {
    path: "/memberLogin",
    component: MemberLogin,
  },
  {
    path: "/memberForgetPassword",
    component: MemberForgetPassword,
  },
  {
    path: "/memberRegisteraccount",
    component: MemberRegisterAccount,
  },
  {
    path: "/memberRegisterinfo",
    component: MemberRegisterInfo,
  },
  {
    path: "/companyLogin",
    component: ComLogin,
  },
  {
    path: "/memberInformation",
    component: MemberInformation,
  },
  {
    path: "/personalPetView",
    component: PersonalPetView,
  },

  {
    path: "/type",
    component: Type,
    props: true,
  },
  { path: "/product/", name: "product", component: Product, props: true },
  {
    path: "/shopproduct",
    component: ShopProduct,
  },
  {
    path: "/membershoppingcart",
    component: ShoppingCart,
  },
  {
    path: "/forumpost",
    component: ForumPost,
  },
  {
    path: "/comshop",
    component: ComShop,
    props: true,
  },
  {
    path: "/test",
    component: Test,
  },
  {
    path: "/petview",
    component: PetView,
  },
  {
    path: "/comr",
    component: ComRegister,
    props: true,
  },
 {
    path : "/payment",
    component :PayMent
 },

  {
    path: "/comu",
    component: ComUpdate,
    props: true,
  },
  {
    path: "/cominformation",
    component: ComInformation,
    props: true,
  },
  {
    path: "/comuinfo",
    component: ComUpdateInfo,
    props: true,
  },
  {
    path: "/comorder",
    component: ComOrder,
    props: true,
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
