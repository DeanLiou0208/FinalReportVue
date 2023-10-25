<template>
  <div class="row g-3 align-items-center">
    <div class="col-4"></div>
    <div class="col-auto">
      <label for="inputPassword1" class="col-form-label">店名</label>
    </div>
    <div class="col-auto">
      <input
        type="text"
        id="inputPassword1"
        class="form-control"
        aria-describedby="passwordHelpInline"
        disabled
        :value="shopName"
      />
    </div>
    <div></div>
    <div class="col-4"></div>
    <div class="col-auto">
      <label for="inputPhone" class="col-form-label">電話</label>
    </div>
    <div class="col-auto">
      <input
        type="text"
        id="inputPhone"
        class="form-control"
        @blur="checkPhone()"
        v-model="inputPhone"
      />
    </div>
    <div class="col-auto">
      <span id="phoneHelpInline" class="form-text"> 請輸入手機或市話 </span>
    </div>
    <div></div>
    <div class="col-4"></div>
    <div class="col-auto">
      <label for="inputPassword3" class="col-form-label">統編 </label>
    </div>
    <div class="col-auto">
      <input
        type="number"
        id="inputPassword3"
        class="form-control"
        aria-describedby="taxHelpInline"
        @blur="checkTax()"
        v-model="inputTax"
      />
    </div>
    <div class="col-auto">
      <span id="taxHelpInline" class="form-text"> </span>
    </div>
    <div></div>
    <div class="col-4"></div>
    <div class="col-auto">
      <label for="inputPassword4" class="col-form-label">地址</label>
    </div>
    <div class="col-auto">
      <input
        type="text"
        id="inputPassword4"
        class="form-control"
        aria-describedby="addressHelpInline"
        v-model="inputAdderss"
      />
    </div>
    <div class="col-auto">
      <span id="addressHelpInline" class="form-text"> </span>
    </div>
    <div></div>
    <div class="col-4"></div>
    <div class="col-auto">
      <label for="inputPassword5" class="col-form-label">信箱</label>
    </div>
    <div class="col-auto">
      <input
        type="text"
        id="inputPassword5"
        class="form-control"
        aria-describedby="emailHelpInline"
        @blur="checkEmail()"
        v-model="inputEmail"
      />
    </div>
    <div class="col-auto">
      <span id="emailHelpInline" class="form-text"> </span>
    </div>
    <div></div>

    <div class="col-4"></div>
    <div class="col-auto">
      <label for="inputPassword6" class="col-form-label">頭像</label>
    </div>
    <div class="col-auto">
      <input type="file" name="file" id="picFile" @change="fileChange()" />
      <div id="skin" style="display: none"></div>
    </div>
    <div></div>
    <div class="col-6"></div>
    <div class="col-auto">
      <button id="submit" @click="submit()">註冊</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, inject } from "vue";

import Swal from "sweetalert2";
const $cookies = inject("$cookies");
const shopName = ref($cookies.get("registershopname"));
const id = ref($cookies.get("registerid"));
const telphone = /^09\d{8}$/;
const phone = /^0[2-8]\d{6,8}$/;
const inputPhone = ref("");
const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const inputEmail = ref("");
const taxID = /^[0-9]{8}$/;
const inputTax = ref("");
const inputAdderss = ref("");
const fileInput = ref();
const URL = import.meta.env.VITE_API_JAVAURL;
const updateURL = `${URL}pet_web/companys/information`;
function checkPhone() {
  if (!telphone.test(inputPhone.value) && !phone.test(inputPhone.value)) {
    phoneHelpInline.innerHTML = "電話格式不正確";
    return;
  } else {
    phoneHelpInline.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  }
}

function checkEmail() {
  if (!email.test(inputEmail.value)) {
    emailHelpInline.innerHTML = "信箱格式不正確";
    return;
  } else {
    emailHelpInline.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  }
}

function checkTax() {
  if (!taxID.test(inputTax.value)) {
    taxHelpInline.innerHTML = "格式不正確";
    return;
  } else {
    taxHelpInline.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  }
}

function fileChange() {
  let skin = document.getElementById("skin");
  let file = document.getElementById("picFile").files[0];
  fileInput.value = document.getElementById("picFile");
  let readFile = new FileReader();
  readFile.readAsDataURL(file);
  readFile.addEventListener("load", function () {
    let img = new Image();
    if ((readFile = null)) {
      img.src = localStorage.getItem("img");
    }
    img.src = readFile.result;
    img.style.width = "100%"; // 设置图片的最大宽度
    img.style.height = "100%"; // 设置图片的最大高度
    skin.innerHTML = ""; // 清空 skin 元素
    skin.appendChild(img); // 将图片添加到 skin 元素
    skin.style.display = "block";
  });
  console.log(fileInput.value);
  console.log(id.value);
}

function submit() {
  const data = {
    id: id.value,
    phone: inputPhone.value,
    texIdNumber: inputTax.value,
    address: inputAdderss.value,
    email: inputEmail.value,
  };
  const body = JSON.stringify(data);

  const formData = new FormData();
  formData.append("body", body);
  if (fileInput.value) {
    formData.append("file", fileInput.value.files[0]);
  } else {
    formData.append("file", null); // 或者 formData.append("file", "");
  }

  for (const pair of formData.entries()) {
    console.log(pair);
  }
  axios
    .put(updateURL, formData)
    .then((response) => {
      Swal.fire({
        title: response.data.message2,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          $cookies.remove("registershopname", response.data.registershopname);
          $cookies.remove("registerid", response.data.registerid);
          window.location.href = "login";
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>

<style scoped>
input {
  width: 400px;
}
#skin {
  border: 3px solid gray;
  height: 100px;
  max-width: 100px;
  text-align: center;

  margin: 2px;
}
#phoneHelpInline,
#taxHelpInline,
#addressHelpInline,
#emailHelpInline {
  color: red;
  font-size: 15px;
  margin: 0px;
  padding: 0%;
}
</style>
