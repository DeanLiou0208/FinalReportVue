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
            <router-link class="nav-link active" to="/home">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/shop">寵物商城</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/forum">寵物論壇</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/petphoto">萌寵照片</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-item-space"  to="/hospital">寵物醫院</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-small" to="/login">登入</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-small" to="/register">註冊</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
    
<script setup >
    
</script>
    
<style>
    .nav-item-space {
  margin-right: 200px; /* 調整間距的數值根據你的需求 */
}
.nav-link-small{
  font-size: 0.8rem; /* 調整圖標大小的數值根據你的需求 */
}

</style>