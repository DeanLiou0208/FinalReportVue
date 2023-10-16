<template>
        <h3>結帳商品</h3>
    <div class="accordion" id="accordionExample">
    <div class="accordion-item"  v-for="{id, name, shopName, count,price} in productList" :key="id">
        <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            {{ name }}
        </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
            <span>數量: {{count}}</span>&nbsp$ <span>單價: {{ price }}</span>&nbsp$ <span>小計: {{count*price}}</span>&nbsp$ <span>供應商: {{shopName}}</span>
        </div>
        </div>
    </div>
    <hr>
    &nbsp&nbsp<span>總計筆數: {{productList.length}} </span>&nbsp&nbsp<span>總計金額: {{totalPrice}} </span>
    </div>
    <hr>
        <h3>會員資料</h3>
<form class="row g-3">
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">姓</label>
    <input type="text" class="form-control" id="inputEmail4" :value="`${member.lastName}`">
  </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">名</label>
    <input type="text" class="form-control" id="inputEmail4" :value="`${member.firstName}`">
  </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">電話</label>
    <input type="text" class="form-control" id="inputEmail4" :value="`${member.phone}`">
  </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">信箱</label>
    <input type="text" class="form-control" id="inputEmail4" :value="`${member.email}`">
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">配送地址</label>
    <input type="text" class="form-control" id="inputAddress" :value="`${member.address}`">
  </div>

  <div class="col-md-4">
    <label for="inputState" class="form-label">付款方式</label>
    <select id="inputState" class="form-select">
      <option selected>請選擇</option>
      <option value="貨到付款">貨到付款</option>
      <option value="線上刷卡">線上刷卡</option>
    </select>
    <br>
    <a href="#" type="button" class="btn btn-danger"><i class="bi bi-credit-card"></i>>信用卡付款</a>
  </div>
</form>    



</template>
    
<script setup >
    import {ref, reactive , inject, watch} from "vue"
    import { ElMessage  } from 'element-plus'
    import Swal from "sweetalert2";
    import axios from "axios";

const $cookies = inject("$cookies");
console.log($cookies.get("payment"));
const productList = $cookies.get("payment").productList
const totalPrice = $cookies.get("payment").totalPrice;
// console.log(payMent)
// console.log(totalPrice)
// console.log(productList)
const member = ref([]);


const payMent = reactive({
    fkMemberId : $cookies.get("payment").fkMemberId,
    totalPrice : $cookies.get("payment").totalPrice,
    bonus : $cookies.get("payment").bonus,
    productList : $cookies.get("payment").productList
})








const URL = import.meta.env.VITE_API_JAVAURL;
const URLMEMBER = `${URL}paymentmember`
const loadMember = async()=>{
    const response = await axios.post(URLMEMBER, payMent);
    console.log(response.data)
    member.value = response.data
    console.log(member.value)
    console.log(member.value.lastName)
}
loadMember();
// onBeforeMonut(()=>{
//     loadMember();
// })

    


</script>
    
<style scoped>
    
</style>