<template>
    <div class="cantainer">
    <div class="card " style="width: 18rem;">
        <img src="../assets/img/company.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">廠商登入</h5>
            <p class="card-text"></p>
            <router-link class="btn btn-primary" to="/companyLogin">登入</router-link>
        </div>
    </div>

    <div class="card" style="width: 18rem;">
        <img src="../assets/img/consumer.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">會員登入</h5>
            <p class="card-text"></p>
            <router-link class="btn btn-warning" to="/memberLogin">登入</router-link>
        </div>
    </div>
    </div>
    
</template>
    
<script setup >
    
</script>
    
<style>
    .cantainer{
        width: 800px;
        height: 600px;
        display: flex; /*使用Flex布局*/
        justify-content: space-between; /*在父容器中均匀分布子元素 */
        margin: 25%;
    }
</style>
