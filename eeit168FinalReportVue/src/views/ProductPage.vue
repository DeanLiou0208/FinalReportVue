<template>
<div class="container ml-1">


<div class="card mb-3" style="max-width: 1320px;">
  <div class="row g-0">
    <div class="col-md-6">
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner ">
                        <div class="carousel-item active">
                        <img :src="`${photomain.img}`" class="d-block auto" alt="...">
                        </div>
                        <div class="carousel-item" v-for="{img,id} in photoList" :key="id">
                        <img :src="`${img}`" class="d-block auto" alt="...">
                        </div>
                </div>

                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
                </button>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card-body">
                <div class="container ml-3 " style="display: flex;">
                        <h2 class="card-title">{{ product.name }}</h2>
                </div>
        <br>
                <div class="container ml-3 " style="display: flex;"> 
                        <h3 style="color: red;">$</h3>
                        <h3 class="card-price" style="color: red;">{{ product.price }}</h3><h3 style="color: red;">元</h3>
                </div>
        <br>
                <div class="container ml-3 " style="display: flex;">
                        <span style="border:1px red solid; height: 0%; color: red;">15天鑑賞期</span>&nbsp&nbsp
                        <span style="border:1px red solid; height: 0%; color: red;"> 原廠正貨</span>&nbsp&nbsp
                        <span style="border:1px red solid; height: 0%; color: red;">快速到貨</span>&nbsp&nbsp
                </div>
        <br>
                <div class="container ml-3 " style="display: flex;">
                        <span style="font-weight: bold;"><img src="../assets/img/delivery.png">&nbsp 運送廠商 : </span>&nbsp&nbsp
                        <span style="font-weight: bold;"> <p class="card-company">{{ product.companyShopName }}</p> </span>&nbsp&nbsp
                </div>
        <br>
                <div class="container ml-3 " style="display: flex;">
                        <span style="font-weight: bold;"><img src="../assets/img/category.png">&nbsp 商品分類 : </span>&nbsp&nbsp
                        <span style="font-weight: bold; "> <p class="card-company">{{ product.type }}</p> </span>&nbsp&nbsp
                        <span style="font-weight: bold;"><img src="../assets/img/sepecification.png">&nbsp 商品規格 : </span>&nbsp&nbsp
                        <span style="font-weight: bold; "> <p class="card-company">{{ product.size }}</p> </span>&nbsp&nbsp
                </div>        
        <br>
                <div class="container ml-3 " style="display: flex;">
                        <a type="button" @click="decrementCounting"><img src="../assets/img/minus.png" alt="-">&nbsp&nbsp</a>         
                        <div >
                                <input type="text" style="height: 30px; width:50px; text-align: center; border: 2px solid black;"  v-model="counting">
                        </div>
                        <a type="button" @click="incrementCounting">&nbsp&nbsp<img src="../assets/img/plus.png" alt="+"></a>  
                </div>
        <br>           
                <div class="container ml-3 " style="display: flex;">
                        <a href="#" type="button" class="btn btn-success" ><i class="bi bi-bag-check" style="font-weight: bold;"> > 直接購買</i></a>&nbsp&nbsp
                        <a href="#" type="button" class="btn btn-warning" @click="addToShoppingCart"><i class="bi bi-cart-plus-fill" style="font-weight: bold;"> >加入購物車</i></a>
                </div>
                                                
        </div>
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header">
    <h3>商品詳情—</h3>
  </div>
  <div class="card-body">
        <blockquote class="blockquote mb-0">
                <p>{{ product.description }}</p>
        <footer class="blockquote-footer">ItemCode : <cite title="Source Title">{{ product.uid }}</cite></footer>
    </blockquote>
  </div>
</div>
<br>
<div class="card">
  <div class="card-header" >
        <h3>商品評論—</h3>
        <div class="accordion accordion-flush" id="accordionFlushExample" >
                <div class="accordion-item" v-for="(rate , index) in rate" :key="index">
                <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                <div>買家:&nbsp&nbsp{{rate.userName}}</div> 
                        </button>
                </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse " aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample"  >
                                <div class="accordion-body">{{ rate.rateComment }} </div>
                                <div class="accordion-body">評分:&nbsp&nbsp{{ rate.rateScore }}</div>
                        </div>
                </div>
        </div>
  </div>
</div>



</div>
</template>
    
<script setup >
        import {ref, reactive,onMounted} from 'vue';
        import axios from 'axios';

        //從session中取得productId 
        const productId = sessionStorage.getItem("productId")
        
        console.log(productId)

        const product = ref([]);
        const rate = ref([]);
        const photomain = ref([]);
        const photoList = ref([]);
        const counting = ref(0);
        
        // const data({
        //         return{}
        //         counting
        // })
        
        const addShopCart = reactive({
                fkMemberId : 0,
                fkProductId : 0,
                const : 0,
        }) 
       

        const id = reactive({
                productId : sessionStorage.getItem("productId")
        })
        const fkId = reactive({
                fkProductId : sessionStorage.getItem("productId")
        })


        const URL = import.meta.env.VITE_API_JAVAURL;// http://localhost:8080/定義在.env檔案
        const URLAPI = `${URL}pet_web/productshow/info`;
        const URLAPIRATE = `${URL}pet_web/productshowrate/info`;
        const URLAPIPHOTO = `${URL}pet_web/product-photo`
        const loadProduct = async() =>{
                const response = await axios.post(URLAPI, id);
                product.value = response.data;
                console.log(product.value);
        }
        const loadProductRate = async() =>{
                const response = await axios.post(URLAPIRATE, fkId)
                rate.value =response.data.list;
                console.log(rate.value)
                
                
        }
        const loadPhoto = async()=>{
                const response = await axios.post(URLAPIPHOTO, fkId)
                photomain.value = response.data.mainPhoto;
                photoList.value = response.data.photoList;
                console.log(photomain.value);
                console.log(photoList.value);
                
        }
        const decrementCounting = function(){
                if (counting.value > 0) {
                        counting.value--;
                }
                console.log(counting)
        }
        const incrementCounting = function(){
                counting.value++;
        }

        const addToShoppingCart = function(){
                
        }

        onMounted (()=>{
        loadProductRate();
        loadProduct();
        loadPhoto();
        });
        

</script>
    
<style scoped>
.parent {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  
}

</style>