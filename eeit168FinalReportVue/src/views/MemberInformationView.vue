<template>
    <div class="main-content">
        <div class="sidebar routerborder">
            <ul>
                <li><router-link to="/memberInformation">
                        <h5>個人資料</h5>
                    </router-link></li>
                <li><router-link to="/personalPetView">
                        <h6>我的寵物</h6>
                    </router-link></li>
                <li><router-link to="">
                        <h6>我的文章</h6>
                    </router-link></li>
                <li><router-link to="">
                        <h6>我的收藏</h6>
                    </router-link></li>
                <li><router-link to="">
                        <h6>我的訂單</h6>
                    </router-link></li>
                <li><router-link to="">
                        <h6>我的任務</h6>
                    </router-link></li>
            </ul>
        </div>
        <div class="container">
            <h2>我的資訊</h2>
            <button class="btn btn-primary" type="button" @click="toUpdate">
                修改資料
            </button>
            <div class="flexbox">
                <fieldset class="">
                    <div class="row">
                        <div class="col-16">
                            <div class="mb-3">
                                帳號 : {{ member.account }}
                            </div>
                            <div class="mb-3">
                                姓氏 :　{{ member.lastName }}
                            </div>
                            <div class="mb-3">
                                名字 :　{{ member.firstName }}
                            </div>
                            <div class="mb-3">
                                使用者名稱 :　{{ member.userName }}
                            </div>
                            <div class="mb-3">
                                性別 :　{{ resultGender }}
                            </div>
                            <div class="mb-3">
                                生日 :　{{ member.birth }}
                            </div>
                            <div class="mb-3">
                                電話 :　{{ member.phone1 }}-{{ member.phone2 }}-{{ member.phone3 }}
                            </div>
                            <div class="mb-3">
                                地址 :　{{ member.address }}
                            </div>
                            <div class="mb-3">
                                email :　{{ member.email }}
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <img :src="`${member.img}`" alt="" class="photosize">
                </fieldset>
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
const resultGender = ref("");
const avatarInput = ref(null);
const file = new FormData();
const URL = import.meta.env.VITE_API_JAVAURL;

async function selectInformation() {
    const API_URL = `${URL}pages/member/information`;
    account.account = $cookies.get("account");
    const response = await axios.post(API_URL, account);
    member.value = response.data;
    if (member.value.gender === true) {
        resultGender.value = "男";
    } else if (member.value.gender === false) {
        resultGender.value = "女";
    } else {
        resultGender.value = "不透漏";
    }
    member.value.gender
    console.log(response.data);
    // console.log(member.value.img);
    //如果結果查無資料則發出警告
    // if (response.data.success) {
    //     alert(response.data.message)
    //     router.push('/memberInformation');
    // }
}
selectInformation();


const toUpdate = async () => {
    window.location.href = '/memberinfoupdate';
}
</script>
    
<style scoped>
.main-content {
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    height: auto;
    /* 让容器占满整个视窗高度 */
}

.routerborder {
    padding: 50px 0;
    border: black 1px solid;
    border-radius: 10px;
    height: 300px;
    width: 150px;
}

.flexbox {
    display: flex;
        flex-direction: row;
    justify-content: space-around;
}
.photosize{
    margin: 80px 20px;
    height: 200px;
    width: 200px;
}
</style>