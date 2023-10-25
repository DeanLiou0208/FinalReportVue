<template>
<div style="text-align: center;"><h2>訂單管理</h2></div>
<br>
<div style="display: flex">
    <!-- 左侧的 Tabs -->
    <div style="flex: 1">
      <Tabs></Tabs>
    </div>
  <div class="accordion accordion-flush" id="accordionFlushExample" style="flex: 4; margin-right: 30px;">
    <div
      class="accordion-item"
      v-for="(item, index) in responseData"
      :key="index"
    >
      <h2 class="accordion-header" :id="'flush-headingOne' + index">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapse' + index"
          aria-expanded="false"
          :aria-controls="'collapse' + index"
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 2px gray solid;
          "
        >
          <span style="flex: 1">訂單編號: {{ item.orderListId }}</span>
          <span style="flex: 1"
            >狀態修改時間: {{ limitText(item.stateChangeTime, 16) }}</span
          >
          <span style="flex: 1; text-align: right"
            >訂單ID: {{ item.orderDetailsId }}&nbsp;&nbsp;&nbsp;&nbsp;</span
          >
        </button>
      </h2>
      <div
        :id="'collapse' + index"
        class="accordion-collapse collapse"
        :aria-labelledby="'heading' + index"
        data-bs-parent="#accordionExample"
      >
        <div
          class="dropdown"
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: -20px;
            margin-top: 13px;
            margin-left: 20px;
            margin-right: 10px;
          "
        >
          <strong
            style="
              font-size: 20px;
              flex: 1;
              margin-top: 30px;
              margin-bottom: 20px;
            "
            >商品編號:{{ item.productId }} &nbsp;&nbsp; 商品名稱:{{ item.name }}
          </strong>

          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="
              width: 150px;
              height: 40px;
              flex: 0;
              margin-top: 30px;
              margin-bottom: 20px;
            "
          >
            訂單狀態
          </button>

          <div class="accordion-body">
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  @click="update(item.orderDetailsId, '訂單確認中')"
                  >確認訂單</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  @click="update(item.orderDetailsId, '訂單已完成')"
                  >已完成</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  @click="update(item.orderDetailsId, '訂單取消')"
                  >同意取消</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  @click="update(item.orderDetailsId, '退貨,訂單不成立')"
                  >同意退貨</a
                >
              </li>
            </ul>
          </div>
        </div>
        <br />
        <div style="display: flex; justify-content: space-between">
          <span style="margin-left: 20px">{{ "數量: " + item.quantity }}</span>
          <span>{{ "單價 :" + item.price }}</span>
          <span>{{ "訂購日 " + limitText(item.createAt, 10) }}</span>
          <span style="margin-right: 30px">{{
            "訂單狀態: " + item.state
          }}</span>
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          "
        >
          <span style="margin-left: 20px">{{
            "訂購人: " + item.lastName + " 先生/小姐"
          }}</span>
          <span>{{ "電話: " + item.phone }}</span>
          <span style="margin-right: 30px">{{ "地址: " + item.address }}</span>
        </div>
      </div>
    </div>

    <!-- <div>
    <div v-for="(item, index) in responseData" :key="index">
      <p>Account: {{ item.account }}</p>
      <p>First Name: {{ item.firstName }}</p>
      <p>Last Name: {{ item.lastName }}</p>
      <p>Member ID: {{ item.memberId }}</p>
      <p>Name: {{ item.name }}</p>
      <p>Order Details ID: {{ item.orderDetailsId }}</p>
      <p>Order List ID: {{ item.orderListId }}</p>
      <p>Phone: {{ item.phone }}</p>
      <p>Price: {{ item.price }}</p>
      <p>Product ID: {{ item.productId }}</p>
      <p>Quantity: {{ item.quantity }}</p>
 
      <p>State: {{ item.state }}</p>
      <p>State Change Time: {{ item.stateChangeTime }}</p>
    </div>
  </div> -->
  </div>    </div>
</template>

<script setup>
import { onMounted, inject, ref, reactive } from "vue";
import axios from "axios";
import Tabs from "../components/tabs.vue";
const responseData = ref([]);
const $cookies = inject("$cookies");
const id = ref($cookies.get("id"));
const URL = import.meta.env.VITE_API_JAVAURL;
const URLAPI = `${URL}pet_web/companys/orders`;
const URLUpdate = `${URL}pet_web/companys/ordersupdate`;

const body = reactive({
  companyId: id,
});
const limitText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength); // 如果超过最大字符数，添加省略号
  } else {
    return text;
  }
};

const select = async () => {
  // console.log(123);
  const response = await axios.post(URLAPI, body);
  responseData.value = response.data;
  // console.log(response.data);
};

const update = async (id, state) => {
  const data = {
    id: id,
    state: state,
  };
  const response = await axios.post(URLUpdate, data);

  // console.log(response.data);
  select();
};

onMounted(() => {
  select();
});
</script>

<style scoped>
#img {
  max-width: 300px;
  max-height: 250px;
}

span {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
