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
        
        <div class="d-flex" v-if="loginState">

          <ul class="navbar-nav">
            <li class="nav-item">
              <div>{{ identity }}</div>
            </li>
            <li class="nav-item">
              <div @click="toinfo">
                  <div class="gray-circle"><img src="" alt="" ></div>
              </div>
            </li>
            <li class="nav-item">
              <div @click="logout">
                <router-link class="nav-link nav-link-small" to="/">登出</router-link>
              </div>
            </li>
          </ul>
        </div>

        <div class="d-flex" v-else>
        <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link nav-link-small" to="/login">登入/註冊</router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link class="nav-link nav-link-small" to="/register">註冊</router-link>
            </li> -->
        </ul>
        </div>
      </div>
    
  </nav>
</template>
    
<script setup>
    import { ref, inject, onMounted } from "vue";

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