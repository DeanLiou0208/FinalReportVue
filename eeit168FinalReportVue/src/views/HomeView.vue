<template>
  <homeimg></homeimg>
  <div class="container">
    <div ><img src="../assets/img/站長推薦Banner.png" alt="" style="width: 1272px"></div>
  <div  style="background-color: rgb(112, 173, 71); height: 600px; width: 1272px;">
    <!-- <div class="container">
        <div class="card mb-3" style="max-width: 635px;" v-for="{id, img , title , likeCount, unLikeCount, petArticleText} in petPosts" :key="id">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="`${img}`" class="img-fluid rounded-start" alt="...">
            </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{title}}</h5>
                  <p class="card-text">{{ likeCount }}</p><p class="card-text">{{ unLikeCount }}</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
          </div>
        </div>
        </div> -->
        <div class="container" style="width: 1272px;">
  <div class="row">
    <div class="container col-12 col-md-6"  v-for="{ id, img, title, likeCount, unLikeCount, petArticleText } in petPosts" :key="id" >
      <div class="card mb-3" style="max-width: 635px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="`${img}`" class="img-fluid rounded-start" alt="" style="object-fit: cover; width: 100%; height: 260px;">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{title}}</h5>
              <br>
              <div class="container" style="display: flex;">
                <p class="card-text"><i class="bi bi-heart-fill" style="color: red;"></i>{{ likeCount }}</p>&nbsp&nbsp
                <p class="card-text"><i class="bi bi-heartbreak-fill"></i>{{ unLikeCount }}</p>
              </div>
              <p class="card-text">內文預覽:</p>
              <p class="card-text"><small class="text-muted">{{ petArticleText }}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  </div>
  <div class="container">
    <div ><img src="../assets/img/館長推薦.png" alt="" style="width: 1272px"></div>
  <div style="background-color: rgb(206, 19, 30); height: 500px;">
    
    <el-carousel :interval="4000" type="card" height="500px" >
      
      <el-carousel-item  v-for="{id , productId, name, price, img} in indexProducts" :key="id">
        <div class="card" style="width: 18rem;">
          <img :src="`${img}`" class="card-img-top" alt="" style="height: 300px; width: 100%;">
          <div class="card-body">
              <div class="container" style="display: flex;">
                <p>ItemNo:</p><p class="card-number">{{ productId }}</p>
              </div>
            <h5 class="card-title">{{ name }}</h5>
            <p class="card-text">
              <p style="color: red;"> 售價: {{price}}</p>
            </p>
            <RouterLink to="/shopproduct">
            <a href="#" class="btn btn-primary" data-bs-toggle="modal2" data-bs-target="#toProduct" to="/shopproduct">去賣場</a>
            </RouterLink>
          </div>
        </div>
      </el-carousel-item>  


    </el-carousel>
  </div>
</div>
</template>

<script setup >
  import homeimg from '../components/Homeimg.vue'
  import {ref, reactive, onUpdated } from 'vue'
  import axios from 'axios'

  const indexProducts = ref([]);
  const petPosts =ref([]);

  const petPost = reactive({
    sort: "likeCount",
    order: "desc",
    rows : 4
  })


  const datas = reactive({
  
  name : "",
  price : "",
  description : "",
  maxPrice : null,
  minPrice : null,
  type : null,
  avgRateScore : null,
  companyShopName : null,
  start : 0,
  rows : 5,
  order: "desc",
  sort: "price"

});

  const URL = import.meta.env.VITE_API_JAVAURL;
  const URLINDEXURL = `${URL}shop/product/sreach`
  const indexProduct = async() =>{
    const response = await axios.post(URLINDEXURL, datas)
    console.log(response.data)
    indexProducts.value = response.data.list
  }

  const URLPETPOST = `${URL}pages/ajax/PetArticleOrderView/find`
  const petPostfind = async() =>{
    const response = await axios.post(URLPETPOST, petPost)
    petPosts.value = response.data.list
    console.log(response.data)
  }

  onUpdated(()=>{
    const elements = document.querySelectorAll('a[data-bs-toggle="modal2"][data-bs-target="#toProduct"]');
    elements.forEach(button =>{
      button.addEventListener('click',function(){
      const cardContainer = this.closest('.card');
      const productId = cardContainer.querySelector('.card-number').innerText;
      sessionStorage.setItem("productId", productId);
      console.log(productId)
  });  
  });
  });

  petPostfind();
  indexProduct();

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
  width: 300px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: white;
  width: 300px;
  
}



</style>

