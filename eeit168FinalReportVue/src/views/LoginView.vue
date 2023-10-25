<template>
    <div class="cantainer">
    <div class="card " style="width: 18rem;">
        <img src="../assets/img/company.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">廠商登入</h5>
            <p class="card-text"></p>
            <div class="flexbutton">
                <router-link class="btn btn-primary" to="/companyLogin">登入</router-link>
                <router-link class="btn btn-warning" to="/comr">註冊</router-link>
            </div>
        </div>
    </div>

    <div class="card" style="width: 18rem;">
        <img src="../assets/img/consumer.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">會員登入</h5>
            <p class="card-text"></p>
            <div class="flexbutton">
                <router-link class="btn btn-primary" to="/memberLogin">登入</router-link>
                <router-link class="btn btn-warning" to="/memberregisteraccount">註冊</router-link>
            </div>
        </div>
    </div>
    </div>
    
</template>
    
<script setup >
    
</script>
    
<style scoped>
    .cantainer{
        width: 800px;
        height: 400px;
        display: flex; /*使用Flex布局*/
        justify-content: space-between; /*在父容器中均匀分布子元素 */
        margin: 3% 20%;
    }
    .flexbutton{
        display: flex;
        justify-content: space-between;
    }
</style>
