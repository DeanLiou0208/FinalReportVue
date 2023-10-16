<template>
  <div class="container">
    <h2>註冊</h2>
    
    <div class="form-group">
      <label for="username">帳號:</label>
      <div class="input-container">
        <input
          type="text"
          id="username"
          @blur="checkAccount()"
          v-model="username"
          maxlength="15"
        />
      </div>
    </div>
    <div id="responseAccount">&nbsp;</div>
    <div class="form-group">
      <label for="password">密碼:</label>
      <div class="input-container">
        <input
          type="password"
          id="password"
          @blur="checkPassword()"
          v-model="password"
          maxlength="15"
        />
      </div>
      <div id="responsePassword">&nbsp;</div>
    </div>
    <div class="form-group">
      <label for="confirm-password">再次輸入密碼:</label>
      <div class="input-container">
        <input
          type="password"
          id="confirm-password"
          @input="secondCheckPassword()"
          v-model="secPassword"
          maxlength="15"
        />
      </div>
      <div id="responseSecPassword">&nbsp;</div>
    </div>

    <div class="form-group">
      <label for="shopname">店名:</label>
      <div class="input-container">
        <input
          type="text"
          id="shopnameInput"
          @input="checkShopName()"
          class="custom-input"
          v-model="shopName"
        />
      </div>
      <div id="responseShopname">&nbsp;</div>
    </div>

    <div class="form-group">
      <button
        id="submit"
        @click="submit"
        :disabled="isSubmitDisabled"
        @mouseover="checkValue()"
        @mouseout="checkValue()"
        @mousemove="checkValue()"
      >
        下一步
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, inject} from "vue";

const $cookies = inject("$cookies");
const username = ref("");
const password = ref("");
const secPassword = ref("");
const shopName = ref("");
const userNamePass = ref(false);
const passwordPass = ref(false);
const shopNamePass = ref(false);
const isSubmitDisabled = ref(true);
//正規表示式  要匹配至少一個英文
const pattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
const URL = import.meta.env.VITE_API_JAVAURL;
const URLAPI = `${URL}pet_web/companys/check-account`;
const URLShopName = `${URL}pet_web/companys/check-shopname`;
const URLRegister = `${URL}pet_web/companys`;

// //註冊測試

function checkAccount() {
  if (username.value === "") {
    responseAccount.innerHTML = "請輸入帳號";
  } else {
    // 檢查帳號和密碼的長度
    if (username.value.length < 3 || username.value.length > 15) {
      responseAccount.innerHTML = "帳號必須介於3到15個字符之間";
      return; // 中止提交
    } else if (!pattern.test(username.value)) {
      responseAccount.innerHTML = "用户名必須包含英文字母和數字。";
      return;
    } else {
      responseAccount.innerHTML = "&nbsp;";
      axios
        .post(URLAPI, {
          account: username.value,
        })
        .then(function (response) {
          // 处理后端响应
          //   console.log(response.data);
          if (response.data.success) {
            userNamePass.value = true;
          }else{
            userNamePass.value = false;
          }
          // 可以在这里执行其他操作，例如重定向到另一个页面
          responseAccount.innerHTML = response.data.message;
        })
        .catch(function (error) {
          // 處理錯誤
          console.error(error);
        });
    }
  }
}

function checkPassword() {
  if (password.value === "") {
    responsePassword.innerHTML = "請輸入密碼";
  } else {
    if (password.value.length < 8 || password.value.length > 15) {
      responsePassword.innerHTML = "密碼必須介於8到15個字符之間";
      return; // 中止提交
    } else {
      responsePassword.innerHTML = "&nbsp;";
    }
  }
}

function secondCheckPassword() {
  if (secPassword.value === "") {
    responseSecPassword.innerHTML = "請再輸入密碼";
  } else {
    if (
      8 <= secPassword.value.length <= 15 &&
      secPassword.value !== password.value
    ) {
      responseSecPassword.innerHTML = "兩次密碼不相同";
      return; // 中止提交
    } else {
      responseSecPassword.innerHTML = "&nbsp;";
      passwordPass.value = true;
    }
  }
}

function checkShopName() {
  if (shopName.value === "") {
    responseShopname.innerHTML = "請輸入店名";
  } else {
    // 檢查帳號和密碼的長度
    if (shopName.value.length < 3 || shopName.value.length > 10) {
      responseShopname.innerHTML = "店名必須介於3到10個字符之間";
      return; // 中止提交
    } else {
      responseShopname.innerHTML =  "&nbsp;";

      axios
        .post(URLShopName, {
          body: shopName.value,
        })
        .then(function (response) {
          // 处理后端响应
          //   console.log(response.data);
          // 可以在这里执行其他操作，例如重定向到另一个页面
          responseShopname.innerHTML = response.data.message;
          console.log(response.data.success)
          if (response.data.success) {
            shopNamePass.value = true;
          }else{
            shopNamePass.value = false;
          }
        })
        .catch(function (error) {
          // 處理錯誤
          console.error(error);
        });
    }
  }
}

function checkValue() {
  if (userNamePass.value && shopNamePass.value && passwordPass.value) {
    isSubmitDisabled.value = false;
  }else{
    isSubmitDisabled.value = true;
  }
}

const submit = async () => {
  const data = reactive({
    account: username.value,
    password: password.value,
    shopName: shopName.value,
  });

  //     console.log(username.value)
  // console.log(data)
  // console.log(data.account)
  const response = await axios.post(URLRegister, data);
  if (response.data.success) {
    console.log(response.data.message);
    $cookies.set("registershopname",response.data.registershopname)
    $cookies.set("registerid",response.data.registerid)
    window.location.href = '/comu';
    
  }else{isSubmitDisabled.value = true;}
  
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto; /* 让容器占满整个视窗高度 */
}

.form-group {
  margin: 10px 0;
  text-align: center;
}

label {
  display: block;
}

.input-container {
  display: flex;
  justify-content: center;
}

input {
  padding: 5px;
  width: 350px; /* 设置输入框的宽度 */
  height: auto; /* 设置输入框的高度 */
}

#responseAccount,
#responsePassword,
#responseSecPassword,
#responseShopname {
  color: red;
  font-size: 5px;
  margin: 0px;
  padding: 0%;
}
</style>
