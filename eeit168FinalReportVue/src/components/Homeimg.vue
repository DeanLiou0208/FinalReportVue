<template>
<el-carousel :interval="4000" type="card" height="315px" >
    <el-carousel-item >
      <div><img src="../assets/img/homepage/1.jpg" alt=""></div>
    </el-carousel-item>

    <el-carousel-item >
      <a href="https://pet-fair.top-link.com.tw/ticket/17172">
        <div>
          <img src="../assets/img/homepage/2.jpg" alt="">
        </div>
      </a>
    </el-carousel-item>

    <el-carousel-item >
      <div><img src="../assets/img/homepage/3.jpg" alt=""></div>
    </el-carousel-item>

    <el-carousel-item >
      <a href="https://pet-fair.top-link.com.tw/ticket/17187">
        <div>
          <img src="../assets/img/homepage/4.jpg" alt="">
        </div>
      </a>
    </el-carousel-item>

    <el-carousel-item >
      <div><img src="../assets/img/homepage/8.jpg" alt=""></div>
    </el-carousel-item>

    <el-carousel-item >
      <a href="https://pet-fair.top-link.com.tw/ticket/17193">
        <div>
          <img src="../assets/img/homepage/6.jpg" alt="">
        </div>
      </a>
    </el-carousel-item>

    <el-carousel-item >
      <div><img src="../assets/img/homepage/7.jpg" alt=""></div>
    </el-carousel-item>

  </el-carousel>


</template>
    
<script setup >    
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'



</script>
    
<style scoped>

  .el-carousel__item h3 {
  color: black;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: white;
  width: 600px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: white;
  width: 600px;
  
}
</style>