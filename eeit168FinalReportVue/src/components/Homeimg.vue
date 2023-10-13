<template>

<!-- <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" >
  
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../assets/img/1.jpg" class="d-block w-auto" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../assets/img/2.jpg" class="d-block w-auto" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../assets/img/3.jpg" class="d-block w-auto" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../assets/img/4.jpg" class="d-block w-auto" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div> -->
<el-carousel :interval="4000" type="card" height="400px" >
    <el-carousel-item >
      <div><img src="../assets/img/1.jpg" alt=""></div>
    </el-carousel-item>

    <el-carousel-item >
      <a href="https://pet-fair.top-link.com.tw/ticket/17172">
        <div>
          <img src="../assets/img/2.jpg" alt="">
        </div>
      </a>
    </el-carousel-item>

    <el-carousel-item >
      <div><img src="../assets/img/3.jpg" alt=""></div>
    </el-carousel-item>

    <el-carousel-item >
      <a href="https://pet-fair.top-link.com.tw/ticket/17187">
        <div>
          <img src="../assets/img/4.jpg" alt="">
        </div>
      </a>
    </el-carousel-item>

    <el-carousel-item >
      <div><img src="../assets/img/8.jpg" alt=""></div>
    </el-carousel-item>

    <el-carousel-item >
      <a href="https://pet-fair.top-link.com.tw/ticket/17193">
        <div>
          <img src="../assets/img/6.jpg" alt="">
        </div>
      </a>
    </el-carousel-item>

    <el-carousel-item >
      <div><img src="../assets/img/7.jpg" alt=""></div>
    </el-carousel-item>

  </el-carousel>


</template>
    
<script setup >    
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'



</script>
    
<style scoped>
  .putImage{
    height: 400px;
  }
  .el-carousel__item h3 {
  color: black;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: white;
  width: 870px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: white;
  
}
</style>