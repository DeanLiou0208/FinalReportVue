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
    <select id="inputState" class="form-select" @change="changePayMent" v-model="selectPay">
      <option value="請選擇付款方式" selected disabled hidden>請選擇付款方式</option>
      <option value="貨到付款">貨到付款</option>
      <option value="線上刷卡">線上刷卡</option>
    </select>
    <br>
    
  </div>
</form> 
<hr>
<div class="col-md-4" v-if="selectPay === '請選擇付款方式'">
  <!-- <a href="#" type="button" class="btn btn-danger"><i class="bi bi-credit-card"></i>>信用卡付款</a> -->
</div>

<div class="col-md-4" v-if="selectPay === '貨到付款'" @click="clickPayByCash">
  <a href="#" type="button" class="btn btn-success"><i class="bi bi-box-seam"></i>>確定送出</a>
</div>

<div class="col-md-4" v-if="selectPay === '線上刷卡'" @click="clickPayByCreaditCard">
  <a href="#" type="button" class="btn btn-danger"><i class="bi bi-credit-card"></i>>信用卡付款</a>
</div>



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



  const selectPay = ref("請選擇付款方式");

  const changePayMent = async()=>{
    console.log(selectPay.value)
  }

  const URL = import.meta.env.VITE_API_JAVAURL;
  const URLMEMBER = `${URL}paymentmember`
  const loadMember = async()=>{
      const response = await axios.post(URLMEMBER, payMent);
      console.log(response.data)
      member.value = response.data
      console.log(member.value)
  }
  //直接完成訂單的方法(寫入orderlist&orderdetils)
  const URLPAYBYCASH = `${URL}shoppingcart/payment`
  const orderfinish = async()=>{
  
  const response = await axios.post(URLPAYBYCASH, payMent)
  console.log(response.data)
  $cookies.remove("payment");
  if(response.data.message ==="訂單建立成功"){
    const result = await Swal.fire({
            title: '已送出訂單!',
            icon: 'success',
            confirmButtonColor : '#3085d6',
            confirmButtonText : '確認!',
        });
        if(result.isConfirmed){
          document.location.href="/membershoppingcart"
        }
            
  }
}
  //確認送出訂單
  const clickPayByCash = async() =>{
    const result = await Swal.fire({
            title: '確定要送出訂單嗎?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor : '#3085d6',
            confirmButtonText : '確認送出!',
            cancelButtonColor : '#d33',
            cancelButtonText : '取消'
        });
        if(result.isConfirmed){
            await orderfinish();
        }
  }
  const URLCREADUTCARD = `${URL}paybycredit`
  const clickPayByCreaditCard = async()=>{
    await axios.post(URLPAYBYCASH,payMent)
    const response = await axios.post(URLCREADUTCARD,payMent)
    console.log(response.data)
    const fromContainer = document.createElement('div');
    fromContainer.innerHTML=response.data;
    document.body.appendChild(fromContainer);
    const paymentForm = fromContainer.querySelector('#allPayAPIForm');
    paymentForm.submit();
  }


loadMember();
// onBeforeMonut(()=>{
//     loadMember();
// })

    


</script>
    
<style scoped>
    
</style>