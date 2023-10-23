<template>
    <div class="container">
        <h2>會員註冊</h2>
    </div>
    <div class="main-content">
        <div class="content">
            <div class="row">
                <div class="col-7">
                    <div class="mb-3">
                        <label for="account" class="form-label">帳號 : </label>
                        <input type="text" class="form-control" id="account" v-model="member.account" readonly />
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">姓氏 :　</label>
                        <input type="text" class="form-control" id="lastName" v-model="member.lastName" />
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">名字 :　</label>
                        <input type="text" class="form-control" id="firstName" v-model="member.firstName" />
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">使用者名稱 :　</label>
                        <input type="text" class="form-control" id="userName" v-model="member.userName" />
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">性別 :　</label>
                        <input type="radio" name="gender" value="true" id="gender" v-model="member.gender" /><span>男</span>
                        <input type="radio" name="gender" value="false" id="gender" v-model="member.gender" /><span>女</span>
                        <input type="radio" name="gender" value="null" id="gender"
                            v-model="member.gender" /><span>不公開</span>
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">生日 :　</label>
                        <input type="date" class="form-control" id="birth" v-model="member.birth" />
                    </div>
                    <label for="name" class="form-label">電話 :　</label>
                    <div class="d-flex align-items-center mb-3">
                        <input ref="input1" v-model="member.phone1" class="autotab form-control" maxlength="4"
                            @input="handleInput(1)" placeholder="09xx" />
                        <span>-</span>
                        <input ref="input2" v-model="member.phone2" class="autotab form-control" maxlength="3"
                            @input="handleInput(2)" placeholder="xxx" />
                        <span>-</span>
                        <input ref="input3" v-model="member.phone3" class="autotab form-control" maxlength="3"
                            @input="handleInput(3)" placeholder="xxx" />
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">地址 :　</label>
                        <input type="text" class="form-control" id="address" v-model="member.address" />
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">email :　</label>
                        <input type="text" class="form-control" id="email" v-model="member.email" />
                    </div>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">上傳頭貼</label>
                        <input class="form-control" type="file" id="formFile"/>
                        <img :src="member.img" alt="">
                    </div>

                    <button class="btn btn-primary" type="button" @click="updateMember">
                        註冊
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import router from "../router";
import Swal from "sweetalert2";

const member = ref([]);
const account = reactive({
    account: "",
});
const avatarInput = ref(null);
const file = new FormData();
const URL = import.meta.env.VITE_API_JAVAURL;

onMounted(() => {
    avatarInput.value = document.getElementById('formFile');
});

async function selectInformation() {
    account.account = $cookies.get("account");
    member.value = account;
    //如果結果查無資料則發出警告
    // if (response.data.success) {
    //     alert(response.data.message)
    //     router.push('/memberInformation');
    // }
}
selectInformation();

const updateMember = async () => {
    const API_URL = `${URL}pages/member/information`;
    member.value.img = null;
    const json = JSON.stringify(member.value);
    file.append('file', avatarInput.value.files[0]);
    file.append('body', json);
    console.log(json);
    const response = await axios.put(API_URL, file, {
        headers: {
            'Content-Type': 'multipart/form-data', // 必须设置正确的Content-Type
        },
    });
    console.log(response.data.message)
    if(response.data.success){
        Swal.fire({
            icon: "success",
            title: "註冊成功，跳轉至登入頁面",
        });
        router.push("/memberLogin");
    }else{
        Swal.fire({
            icon: "error",
            title: "註冊失敗，請重新輸入",
        });
    }
};

///////////////////////////////////////
// const part1 = ref("");
// const part2 = ref("");
// const part3 = ref();

const handleInput = (part) => {
    const currentInput = document.querySelectorAll(".autotab")[part - 1];

    if (currentInput.value.length === currentInput.maxLength) {
        focusNextInput(part);
    }
};

const focusNextInput = (part) => {
    if (part < 3) {
        const nextInput = document.querySelectorAll(".autotab")[part];
        if (nextInput) {
            nextInput.focus();
        }
    }
};
</script>

<style scoped>
/* .routerborder{
        border: black 1px solid;
        height: 200px;
        width: 150px;
    }
    .content2 {
        flex-grow: 1;
        margin: 0 100px ;
    }
    .main-content{
        display: flex;
        justify-content: space-between;
        padding: 10px;
    } */

.sidebar_left {
    background-color: #ffecc9;
    width: 150px;
    height: 400px;
    text-align: center;
    line-height: 10px;
    float: left;
}

.sidebar_right {
    background-color: #ffecc9;
    width: 150px;
    height: 400px;
    text-align: center;
    line-height: 10px;
    float: right;
}

.content {
    margin-left: 150px;
    margin-right: 150px;
    padding: 30px 100px;
    height: 800px;
    /* background-color: #f2fff2; */
    text-align: left;
    line-height: 10px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto; /* 让容器占满整个视窗高度 */
}
</style>
