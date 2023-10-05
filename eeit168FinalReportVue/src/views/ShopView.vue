<template>
    <div class="shop-item">
    <SearchBar @searchInput="inputHandelr"></SearchBar>
    <form class="row g-3">  
      <div class="col-auto">
        <input type="number" class="form-control" id="inputPassword2" placeholder="Password">
      </div>
      <div class="col-auto">
        <input type="password" class="form-control" id="inputPassword2" placeholder="Password">
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary mb-3">Confirm identity</button>
      </div>
</form>
  </div>      
  <table>
    <tbody class="shop-item">
      <tr v-for="{img, price , name, description, productId} in products" :key="products.productId">
        <div class="card" style="width: 18rem;">
          <img :src="`${img}`" class="card-img-top" alt="Image">
            <div class="card-body">
              <h5 class="card-title">產品編號:{{productId}} 產品名稱:{{name}} </h5>
              <h4 class="card-title">售價: {{price}} 元</h4>
              <p class="card-text">{{ description }}</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </tr> 
  </tbody>
</table>
  <Paging :totalPages="totalPage" :thePage="datas.start + 1" @child-click="clickHandler"></Paging>
</template>
    
<script setup>
  
  
  import {ref ,reactive} from "vue";
  import axios from 'axios';
  import SearchBar from '../components/SearchBar.vue';
  import Paging from '../components/Paging.vue'
  import PageSize from '../components/PageSize.vue';

  const products = ref([]);
  const totalPage = ref(0);
  const datas = reactive({
    // name : "",
    description : "",
    start : 0,
    rows : 5,
    order: "asc",
    sort: "id"
  });

  const URL = import.meta.env.VITE_API_JAVAURL;
  const URLAPI = `${URL}shop/product/sreach`;
  const loadProducts = async () =>{
  
  // http://localhost:8080/shop/product/sreach
  const response = await axios.post(URLAPI, datas);
  console.log(response.data)
  // console.log(response.data.list[0].img)
  products.value = response.data.list;
  //取得產品list
  console.log(products.value = response.data.list);
  totalPage.value = +datas.rows === 0 ? 1 : Math.ceil(response.data.count / datas.rows);
  //取得所有產品算分頁
  
  };
  //paging 由子元件觸發
  const clickHandler = page => {
  datas.start = (page - 1) * datas.rows
  loadProducts()
}

//一頁幾筆資料
  const changeHandler = value => {
  datas.rows = value
  datas.start = 0
  //console.log("pagesize：", datas)
  loadProducts()
}

const inputHandelr =value =>{
  // datas.name = value
  datas.description = value 
  datas.start = 0
  loadProducts()
}

  loadProducts();

</script>        
    
<style>
    .shop-item{
        display: flex; 
        justify-content: space-between; 
    }
</style>