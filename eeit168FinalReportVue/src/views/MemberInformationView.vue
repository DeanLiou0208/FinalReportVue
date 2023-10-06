<template>
    <div class="row">
    <div class="col-6">

        <div class="mb-3">
            <label for="account" class="form-label">帳號 : </label>
            <input type="text" class="form-control" id="account" v-model="member.account" readonly/>
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
            <input type="text" class="form-control" id="gender" v-model="member.gender" />
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">生日 :　</label>
            <input type="text" class="form-control" id="birth" v-model="member.birth" />
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">電話 :　</label>
            <input type="text" class="form-control" id="phone" v-model="member.phone" />
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">地址 :　</label>
            <input type="text" class="form-control" id="address" v-model="member.address" />
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">email :　</label>
            <input type="text" class="form-control" id="email" v-model="member.email"/>
        </div>
        
        <button class="btn btn-primary" type="button" @click="updateMember">更新</button>
    </div>
</div>
</template>
    
<script setup>
    import { ref, reactive } from "vue";
    import axios from "axios";

    const member = ref([]);
    // const account = reactive({
    //     account :"",
    // });
    const API_URL = `http://localhost:8080/pages/member/information`;  //之後改路徑

    async function selectInformation(){
        const account = window.sessionStorage.getItem('loginsuccess')
        const response = await axios.post(API_URL, account);
        member.value = response.data;
        console.log(response.data)
      //如果結果查無資料則發出警告
        if (response.data.success) {
            alert(response.data.message)
            router.push('/memberInformation');
        }
    }
    selectInformation()

    const updateMember = async () => {
        const response = await axios.put(API_URL, member.value);
    }

</script>
    
<style scoped>
    
</style>