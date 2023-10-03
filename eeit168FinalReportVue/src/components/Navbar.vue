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
          <router-link class="nav-link" to="/hospital">寵物醫院</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">登入</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register">註冊</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav> 
</template>
    
<script setup >
    
</script>
    
<style>
    
</style>