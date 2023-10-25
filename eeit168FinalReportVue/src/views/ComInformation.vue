<template>
  <div style="display: flex">
    <!-- 左侧的 Tabs -->
    <div style="flex: 1">
      <Tabs></Tabs>
    </div>
 
<div style="flex: 2"> <img
        v-if="img" 
        :src="img"
        alt="無法顯示圖片"
      />

      <img
        v-else  
        src="../assets/img/notfoundimg.png"
        alt="無法顯示圖片"
      /></div>
    <!-- 中间的信息 -->
    <div style="flex: 3">
      <div class="mb-3 row">
        <label for="account" class="col-sm-2 col-form-label">帳號</label>
        <div class="col-sm-10">
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            id="account"
            :value="account"
          />
        </div>
      </div>

      <div class="mb-3 row">
        <label for="name" class="col-sm-2 col-form-label"
          >名稱</label
        >
        <div class="col-sm-10">
          <input type="text" class="form-control-plaintext" id="name"  :value="name" readonly/>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="tax" class="col-sm-2 col-form-label"
          >統編</label
        >
        <div class="col-sm-10">
          <input type="text" class="form-control-plaintext" id="tax" :value="tax" readonly/>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="address" class="col-sm-2 col-form-label"
          >地址</label
        >
        <div class="col-sm-10">
          <input type="text" class="form-control-plaintext" id="address" :value="address" readonly/>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="phone" class="col-sm-2 col-form-label"
          >電話</label
        >
        <div class="col-sm-10">
          <input type="text" class="form-control-plaintext" id="phone" :value="phone" readonly/>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="email" class="col-sm-2 col-form-label"
          >信箱</label
        >
        <div class="col-sm-10">
          <input type="text" class="form-control-plaintext" id="email" :value="email" readonly/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, inject, ref } from "vue";
import axios from "axios";
import Tabs from "../components/tabs.vue";

const $cookies = inject("$cookies");
const id = ref($cookies.get("id"));
const account=ref("");
const name=ref("");
const tax=ref("");
const phone=ref("");
const address=ref("");
const email=ref("");
const img=ref("");
const URL = import.meta.env.VITE_API_JAVAURL;
const URLAPI = `${URL}pet_web/companys/information/${id.value}`;

const select = async () => {
  const response = await axios.get(URLAPI);
account.value=response.data.account
img.value=response.data.img
 name.value=response.data.shopName
 tax.value=response.data.taxIdNumber
 phone.value=response.data.phone
 address.value=response.data.address
 email.value=response.data.email
  // console.log(response.data);
   
};
onMounted(() => {
  // console.log($cookies.get("id"));
  select();

});
</script>

<style scoped>
input {
  max-width: 300px;
}
label{
    text-align: right;
}
img{
    max-width: 300px;
    max-height: 300px;
}
</style>
