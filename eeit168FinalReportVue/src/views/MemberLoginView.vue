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

      <div>
        <br>
        <div class="box mb-3">
          <input type="text" class="form-control" v-model="inputCode" placeholder="請輸入驗證碼" @blur="validateOnBlur" @input="check()"/>
          &nbsp
          <p @click="createCode" :style="codeStyle">{{ code }}</p>
        </div>
        <div class="box mb-3">
        <a href="#" @click.prevent="createCode" id="recode">更新驗證碼</a>
        <p id="verify_code" :style="verifyCodeStyle">{{ verifyCodeMessage }}</p>
      </div>
      </div>
          <div class="d-grid gap-2">
          <button class="btn btn-primary" type="button" @click="addHandler" v-if="showValidateButton" >登入</button>
          <button class="btn btn-primary" type="button" @click="addHandler" v-else disabled>登入</button>
      </div>

      <div class="box">
        <router-link  to="/memberregisteraccount">註冊</router-link>
        <router-link  to="/memberforgetPassword">忘記密碼</router-link>
      </div>
<div class="col-3"></div>
</div>
</div>
</template>

<script setup>
import { reactive, inject } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const $cookies = inject("$cookies");
const router = useRouter();
const loginbutton = false;
const member = reactive({
  "account": "",
  "password": "",
});
const URL = import.meta.env.VITE_API_JAVAURL;

const addHandler = async () => {
  const API_URL = `${URL}pages/member/login`;
  const response = await axios.post(API_URL, member,);
  if (response.data.success) {
    alert(response.data.message);
    $cookies.set("id",response.data.id);
    $cookies.set("account",response.data.account);
    $cookies.set("identity",response.data.identity);
    $cookies.set("username",response.data.username);
    localStorage.setItem('img', response.data.img);
    // document.cookie = `Account=${response.data.account}`;
    // document.cookie = `identity=${response.data.identity}`;
    // router.push('/');
    window.location.href = '/';
  } else {
    alert(response.data.message);
  }
};

const register = async () => {
  router.push('/memberRegister');
};

const forget = async () => {
  router.push('/memberForgetPassword');
};

</script>

<script>
export default {
  data() {
    return {
      code: "",
      inputCode: "",
      codeStyle: {},
      fontColor: ["blue", "yellow", "red"],
      bgColor: ["yellow", "red", "blue"],
      ls: ["3px", "3px", "3px"],
      verifyCodeMessage: "請輸入驗證碼",
      verifyCodeStyle: { color: "#393939" },
      showValidateButton: false, // 控制按钮显示
    };
  },
  methods: {
    randColor() {
      return Math.floor(Math.random() * this.fontColor.length);
    },
    createCode() {
      const ci = this.randColor();
      this.codeStyle = {
        color: this.fontColor[ci],
        backgroundColor: this.bgColor[ci],
        letterSpacing: this.ls[ci],
        fontFamily: "Arial",
        fontStyle: "italic",
        fontWeight: "bold",
        border: "0",
        padding: "4px",
        width: "100px",
        height: "35px",
        textAlign: "center",
        cursor: "pointer",
      };
      this.code = "";
      const codeLength = 6;
      const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let i = 0; i < codeLength; i++) {
        const index = Math.floor(Math.random() * 10);
        this.code += random[index];
      }
      console.log(this.code);
      // 重新生成验证码时隐藏验证按钮
      this.showValidateButton = false;
    },
    validateCode() {
      const inputCode = this.inputCode.toUpperCase();
      if (inputCode.length <= 0) {
        alert("請輸入驗證碼！");
      } else if (inputCode !== this.code) {
        alert("驗證碼輸入錯誤！@_@");
        this.createCode();
        this.inputCode = "";
      } else {
        alert("^-^");
        this.createCode();
        this.inputCode = "";
      }
    },
    validateOnBlur() {
      const inputCode = this.inputCode.toUpperCase();
      if (inputCode.length <= 0) {
        this.verifyCodeMessage = "請輸入驗證碼";
        this.verifyCodeStyle = { color: "#393939" };
        // 验证码不正确时隐藏验证按钮
        this.showValidateButton = false;
      } else if (inputCode !== this.code) {
        this.verifyCodeMessage = "驗證碼錯誤";
        this.verifyCodeStyle = { color: "#FF435E" };
        // 验证码不正确时隐藏验证按钮
        this.showValidateButton = false;
      } else {
        this.verifyCodeMessage = "驗證碼正確";
        this.verifyCodeStyle = { color: "#008000" };
        // 验证码正确时显示验证按钮
        this.showValidateButton = true;
      }
    },
  },
  mounted() {
    this.createCode();
  },
};
</script>

<style scoped>
/* div {
    margin: 0px auto;
    width: 300px;
    height: 250px;
    border: 5px #FFAC55 solid;
    padding: 10px;
  } */
.box {
  display: flex;
  justify-content: space-between;
  margin: 5px 50px;
}

  

      
</style>
