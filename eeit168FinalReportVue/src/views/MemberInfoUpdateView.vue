<template>
    <div class="main-content">
        <div class="sidebar routerborder">
            <ul>
                <li>
                    <router-link to="/memberInformation">
                        <h5>個人資料</h5>
                    </router-link>
                </li>
                <li>
                    <router-link to="/personalPetView">
                        <h6>我的寵物</h6>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <h6>我的文章</h6>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <h6>我的收藏</h6>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <h6>我的訂單</h6>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <h6>我的任務</h6>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="container">
            <h2>修改資料</h2>
            <div class="row">
                <div class="col-7">
                    <div class="mb-3">
                        <label for="account" class="form-label">帳號 : </label>
                        <input type="text" class="form-control" id="account" v-model="member.account" readonly />
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="form-label">姓氏 :　</label>
                        <input type="text" class="form-control" id="lastName" v-model="member.lastName" />
                    </div>
                    <div class="mb-3">
                        <label for="firstName" class="form-label">名字 :　</label>
                        <input type="text" class="form-control" id="firstName" v-model="member.firstName" />
                    </div>
                    <div class="mb-3">
                        <label for="userName" class="form-label">使用者名稱 :　</label>
                        <input type="text" class="form-control" id="userName" v-model="member.userName" />
                    </div>
                    <div class="mb-3">
                        <label for="gender" class="form-label">性別 :　</label>
                        <input type="radio" name="gender" value="true" id="gender" v-model="member.gender" /><span>男</span>
                        <input type="radio" name="gender" value="false" id="gender" v-model="member.gender" /><span>女</span>
                        <input type="radio" name="gender" value="" id="gender"
                            v-model="member.gender" /><span>不公開</span>
                    </div>
                    <div class="mb-3">
                        <label for="birth" class="form-label">生日 :　</label>
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
                        <label for="" class="form-label">頭貼 :　</label>
                        <br>
                        <img :src="member.img" alt="">
                    </div>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">更換頭貼 :　</label>
                        <input class="form-control" type="file" id="formFile"/>
                        <!-- <img :src="member.img" alt="">7 -->
                    </div>

                    <button class="btn btn-primary" type="button" @click="updateMember">
                        更新
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from "vue";
import axios from "axios";

const $cookies = inject("$cookies");
const member = ref([]);
const account = reactive({
    account: "",
});
const avatarInput = ref(null);
const file = new FormData();
const URL = import.meta.env.VITE_API_JAVAURL;

async function selectInformation() {
    const API_URL = `${URL}pages/member/information`;
    account.account = $cookies.get("account");
    const response = await axios.post(API_URL, account);
    member.value = response.data;
    console.log(response.data);
    console.log(member.value.gender);
    //如果結果查無資料則發出警告
    // if (response.data.success) {
    //     alert(response.data.message)
    //     router.push('/memberInformation');
    // }
}
selectInformation();

onMounted(() => {
    avatarInput.value = document.getElementById('formFile');
});

const updateMember = async () => {
    const API_URL = `${URL}pages/member/information`;
    member.value.img = null;
    if(member.value.gender===""){
        member.value.gender = null;
    }
    const json = JSON.stringify(member.value);
    file.append('file', avatarInput.value.files[0]);
    file.append('body', json);
    console.log(json);
    const response = await axios.put(API_URL, file, {
        headers: {
            'Content-Type': 'multipart/form-data', // 必须设置正确的Content-Type
        },
    });
    if(response.data.success){
        console.log(response.data.message);
        alert(response.data.message);
    }else{
        console.log(response.data.message);
        alert(response.data.message);
        
    }
    if(member.value.gender===null){
        member.value.gender = "";
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
    img{
        border: 1px black solid;
        width: 200px;
        height: 200px;
    }

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

    .main-content {
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    .routerborder {
        padding: 50px 0;
        border: black 1px solid;
        border-radius: 10px;
        height: 300px;
        width: 150px;
    }
    .content {
        flex-grow: 1;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
        height: auto;
        /* 让容器占满整个视窗高度 */
    }
</style>
