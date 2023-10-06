<template>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="mb-3">
          <label for="id" class="form-label">帳號 : </label>
          <input type="text" class="form-control" id="id" v-model="member.account" />
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">密碼 :　</label>
          <input type="password" class="form-control" id="name" v-model="member.password" />
        </div>
  
        <button class="btn btn-primary" type="button" @click="addHandler">登入</button>
        <div>
            <button class="btn btn-primary" type="button" @click="register">註冊</button>
            <button class="btn btn-primary" type="button" @click="forget">忘記密碼</button>
        </div>
      </div>
      <div class="col-3"></div>
    </div>
  </template>
      
  <script setup>
  import { reactive } from 'vue';
  import axios from 'axios';

  import { useRouter } from 'vue-router';
  const router = useRouter()

  const member = reactive({
    "account" : "",
    "password" : "",
  })

  const addHandler = async () => {
      const API_URL = `http://localhost:8080/pages/member/login`  //之後改路徑
      const response = await axios.post(API_URL, member.value)
      if (response.data.success) {
          alert(response.data.message)
          router.push('/memberInformation');
      }
  }
  const register = async () => {
    router.push('/memberRegister');
  }

  const forget = async () => {
    router.push('/memberForgetPassword');
  }

  
  </script>
      
  <style>
  </style>