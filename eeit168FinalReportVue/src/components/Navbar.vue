<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active nav-link-title" to="/home">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-con" to="/shop">寵物商城</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-con" to="/forum">寵物論壇</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-con" to="/petphoto">萌寵照片</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-con ml-3 "  to="/hospital">寵物醫院</router-link>
          </li>
        </ul>
        </div>
        
        <div class=" d-flex" v-if="loginState">
          <div class="centered-content" style="display: flex;">
            <a href="#" type="button" class="btn btn-link">
              <div class="centered-content-login" @click="gotoshopping">
                <!-- <router-link class="nav-link" to="/membershoppingcart" > -->
                  <img src="../assets/img/shopping-cart.png" alt="">
                <!-- </router-link> -->
              </div>
            </a>
              &nbsp&nbsp
              <div class="centered-content">{{ identity }}</div>
              &nbsp
              
              <a href="#" type="button" class="btn btn-link">
              <div class="centered-content" @click="toinfo" >
                  <div class="gray-circle"><img src="" alt="" ></div>
              </div>
              </a>&nbsp
            
              <div class="centered-content" @click="logout" >
                <router-link class="nav-link nav-link-small" to="/">登出</router-link>
              </div>
            </div>
        </div>

        <div class="d-flex" v-else>
            <a href="#" type="button" class="btn btn-link">
              <div class="centered-content-login" @click="gotoshopping">
                <!-- <router-link class="nav-link" to="/membershoppingcart"> -->
                  <img src="../assets/img/shopping-cart.png" alt="">
                <!-- </router-link> -->
              </div>
            </a>
              &nbsp&nbsp
              <router-link class="nav-link nav-link-small" to="/login">登入/註冊</router-link>
        </div>
      </div>
    
  </nav>
</template>
    
<script setup>
    import { ref, inject, onMounted } from "vue";
    import Swal from "sweetalert2";

    const loginState = ref(false);
    const $cookies = inject("$cookies");
    const identity = ref("");
    
    //登入確認身分
    const loginCheck = async () => {
      identity.value = $cookies.get("identity");
      if(identity.value === "會員"){
        loginState.value = true;
      }else if(identity.value === "廠商"){
        loginState.value = true;
      }else{
        loginState.value = false;
      }
    }
    //跳轉到購物車畫面
    const gotoshopping = async () =>{
      if($cookies.get("identity") != null){
        if(identity.value === "會員"){
          if($cookies.get("id") !=null){
            document.location.href = "/membershoppingcart";
          }else{
            Swal.fire({
              icon : "error",
              title : "查無此帳號!"
            })
            
          }
        }else{
          Swal.fire({
            icon : "warning",
            title : "請使用非廠商帳號登入!"
          })
          
        }
      }else{
        Swal.fire({
          icon: "error",
          title: "請先登入!",
        })
        
      }
    }

    //點擊頭像跳轉頁面
    const toinfo = async () => {
      identity.value = $cookies.get("identity");
      if(identity.value === "會員"){
        document.location.href = "/memberInformation";
      }else if(identity.value === "廠商"){
        document.location.href = "/";
      }else{
        document.location.href = "/";
      }
    }

    //登出移除cookie
    const logout = async () => {
      $cookies.remove("id");
      $cookies.remove("account");
      $cookies.remove("identity");
      $cookies.remove("username");
      document.location.href = "/";
    }

    loginCheck();
    
    onMounted (()=>{
      loginCheck();
    })
</script>
    
<style scoped>
/* 
    .nav-item-space {
  margin-right: 200px; /* 調整間距的數值根據你的需求 */
/* } */
.nav-link-small{
  font-size: 0.8rem; /* 調整圖標大小的數值根據你的需求 */
}
.nav-link-con{
  font-size: 1.2rem;
}
.nav-link-title{
  font-size: 1.2rem;
}

  .gray-circle {
    width: 40px;
    height: 40px;
    background-color: gray; /* 设置背景颜色为灰色 */
    border-radius: 50%; /* 设置边框半径为50%，使其呈圆形 */
  }

</style>