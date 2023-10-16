<template>
  <table class="table table-bordered"><!-- 排序區塊 -->
    
    <thead>
      <tr>
        <th>商品名稱 <i class="bi"
            :class="{ 'bi-chevron-expand': !(datas.sort === 'name'), 'bi-sort-down': datas.order === 'desc' && datas.sort === 'name', 'bi-sort-up': datas.order === 'asc' && datas.sort === 'name' }"
            @click="sortHandler('name')"></i>
        </th>
        <th>商品價格 <i class="bi"
            :class="{ 'bi-chevron-expand': !(datas.sort === 'price'), 'bi-sort-up': datas.order === 'asc' && datas.sort === 'price', 'bi-sort-down': datas.order === 'desc' && datas.sort === 'price' }"
            @click="sortHandler('price')"></i></th>
        <th>商品評價 <i class="bi"
            :class="{ 'bi-chevron-expand': !(datas.sort === 'avgRateScore'), 'bi-sort-up': datas.order === 'asc' && datas.sort === 'avgRateScore', 'bi-sort-down': datas.order === 'desc' && datas.sort === 'avgRateScore' }"
            @click="sortHandler('avgRateScore')"></i></th>
        <th>商家名稱 <i class="bi"
            :class="{ 'bi-chevron-expand': !(datas.sort === 'companyShopName'), 'bi-sort-up': datas.order === 'asc' && datas.sort === 'companyShopName', 'bi-sort-down': datas.order === 'desc' && datas.sort === 'companyShopName' }"
            @click="sortHandler('companyShopName')"></i></th>
      </tr>
    </thead>
  </table>
  <hr>

<div class="accordion accordion-flush" id="accordionFlushExample"><!-- 風琴的第一頁 -->
  
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne" style="background-color: goldenrod;">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        您要的商品，在這裡點我「應該」都 &nbsp <i class="bi bi-search"></i> &nbsp 的到：
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body"><!-- 條件篩選區塊 -->
            
        <div class="shop-item">

          <div class="search-item container ml-3">
            <div><p>請客官輸入查詢項目</p></div>
            <SearchBar @searchInput="inputHandelr"></SearchBar>
          </div>

          <div class="search-item container ml-1">
            <div><p>請客官選擇要的金額</p></div>
            <input type="text" @focusout="inMaxPrice" v-model="maxPrice" placeholder="請輸入最高金額" class="form-control mb-3">
            <input type="text" @focusout="inMinPrice" v-model="mixPrice" placeholder="請輸入最低金額" class="form-control mb-3">
          </div>

          <div class="container ml-3">
            <label for="customRange2" class="form-label"><p>請客官選擇要的評分</p></label>
            <input type="range" class="form-range " min="1" max="5" id="customRange2"  @click="chioseRate" v-model="avgRateScore">
            <div class="custom-range-tooltip" ref="tooltip"></div>
          </div>

          <div class="search-item">
            <div class="form-group container ml-1">
              <div><p>請客官選擇要的分類</p></div>
              <select class="form-control" @change="changeType" v-model="datas.type" >
                  <option value="null" selected disabled hidden>請選擇分類</option>
                  <option v-for="{type} in types" :key="types.id" :value="`${type}`">{{ type }}</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>

  <hr>
<div class="container ml-1">

  <div class="row">
    <div class="col-12 col-md-6 col-lg-4" v-for="{ img, price, name, description, productId } in products" :key="productId">
      <div class="card container ml-2" style="width: 100%;">
        <img :src="`${img}`" class="card-img-top" alt="Image">
        <div class="card-body">
            <div class="container ml-3 " style="display: flex;">
                <p>ItemNo:</p><p class="card-number">{{ productId }}</p>
            </div>
            <div class="container ml-3 " style="display: flex;">
                <h4 class="card-name">{{ name }}</h4>
            </div>    
            <div class="container ml-3 " style="display: flex;">
              <span style="border:1px red solid; height: 0%; color: red;">15天鑑賞期</span>&nbsp&nbsp<p>售價:</p><p class="card-price">{{ price }}</p><p>元</p>
            </div>
            <div class="container ml-3 " style="display: flex;">
                <p>商品簡介:</p><p class="card-text">{{ description }}</p>
            </div>
          
          <div class="container ml-1">
            <RouterLink to="/shopproduct">
              <a href="#" type="button" class="btn btn-info" data-bs-toggle="modal2" data-bs-target="#toProduct" to="/shopproduct">去賣場</a>
            </RouterLink>
            &nbsp
            <a href="#" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#addToShoppingCart"><i class="bi bi-cart-plus-fill" > >加入購物車</i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br>
  <Paging :totalPages="totalPage" :thePage="datas.start/datas.rows +1" @childClick="clickHandler"></Paging>
</div>





<!-- addshoppingCart互動元件 -->
<div class="modal fade" id="addToShoppingCart" tabindex="-1" aria-labelledby="addToShoppingCartLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
  <!-- header -->
      <div class="modal-header">
        <h5 class="modal-title" id="addToShoppingCartLabel">加入購物車</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
  <!-- body -->
  <div>
  <div class="modal-body container ml-1">
    <div class="row">
      <div class="col-12 ">
        <div class="card-add container ml-2" style="width: 100%;" >
          <img :src="`${productDetails.img}`" class="card-img-top" alt="Image">
          <div class="card-body container ml-3">

            <div class="container ml-3 " style="display: flex;">
                <p>ItemNo:</p><p class="card-number">{{ productDetails.productId }}</p>
            </div>
            <div class="container ml-3 " style="display: flex;">
                <h4 class="card-name">{{ productDetails.name }}</h4>
            </div>    
            <div class="container ml-3 " style="display: flex;">
                <p>售價:</p><p class="card-price">{{ productDetails.price }}</p><p>元</p>
            </div>
            <div class="container ml-3 " style="display: flex;">
              <a type="button" @click="decrementCounting"><img src="../assets/img/minus.png" alt="-">&nbsp&nbsp</a>         
                <div >
                  <input type="text" style="height: 30px; width:50px; text-align: center; border: 2px solid black;"  v-model="counting">
                </div>
              <a type="button" @click="incrementCounting">&nbsp&nbsp<img src="../assets/img/plus.png" alt="+"></a>  
            </div>
            <!-- <div class="container ml-3 " style="display: flex;">
                <p>商品簡介:</p><p class="card-text">{{ description }}</p>
            </div> -->
            <div class="container ml-1">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <!-- footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="addToShoppingCart">加入</button>
      </div>
    </div>
  </div>
</div>


</template>
    
<script setup>

  import {ref ,reactive, registerRuntimeCompiler, onMounted, onUpdated,inject} from "vue";
  
  import axios from 'axios';
  import SearchBar from '../components/SearchBar.vue';
  import Paging from '../components/Paging.vue'
  import Swal from "sweetalert2";
  
  
  

  const products = ref([]);//接產品清單的陣列
  const types = ref([]);//接type清單的陣列
  const totalPage = ref(0);//換算總頁數的變數
  const maxPrice = ref();//傳入最大價格的變數
  const mixPrice = ref();//傳入最小價格的變數
  const avgRateScore = ref();//傳入評分的變數
  const productDetails = ref([]);
  const counting = ref(0);
  const $cookies = inject("$cookies");

  const tooltip = ref(null);

  const pdetails = reactive({
    img : null,
    productId : null,
    name : null,
    price: null,
    description :null,
  })

  const addShopCart = reactive({
  fkMemberId: 0,
  fkProductId: 0,
  count: 0,
});

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
    rows : 4,
    order: "asc",
    sort: "id"

  });

  // console.log(datas.type)
  const URL = import.meta.env.VITE_API_JAVAURL;// http://localhost:8080/定義在.env檔案
  const URLAPI = `${URL}shop/product/sreach`;
  const URLTYPE = `${URL}shop/type`;
  const URLADDSHOPPINGCART = `${URL}product/addShoppingCart`;
  const loadProducts = async () =>{
  
  const response = await axios.post(URLAPI, datas);
  console.log(datas)
  console.log(response.data)
  products.value = response.data.list;
  
  //取得產品list
  console.log(products.value = response.data.list);
  totalPage.value = +datas.rows === 0 ? 1 : Math.ceil(response.data.count / datas.rows);
  //取得所有產品算分頁
  };
  
  
  
  //取得產品分類
  const loadType = async () =>{
    const response = await axios.get(URLTYPE,types);
    types.value = response.data;
  }
  
  //paging 由子元件觸發
  const clickHandler = page => {
  datas.start = (page-1) * datas.rows
  console.log(page)
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
  datas.name = value
  datas.description = value 
  datas.start = 0
  loadProducts()
}

//Type查詢
const changeType =function(){
  console.log(datas.type)
  //監聽完事件後,重複執行loadProducts()可以直接在進入搜尋並且保留上次條件
  loadProducts();
}

const inMaxPrice = function(){
  console.log(maxPrice.value)
  datas.maxPrice = maxPrice.value
  loadProducts();
  
}
const inMinPrice = function(){
  console.log(mixPrice.value)
  datas.minPrice = mixPrice.value
  loadProducts();
}


onMounted(() => {
      const rangeInput = document.getElementById('customRange2');

      rangeInput.addEventListener('input', (e) => {
        const value = e.target.value;
        const rect = e.target.getBoundingClientRect();
        const offset = (value / (e.target.max - e.target.min)) * rect.width;

        // 设置提示框的位置和内容
        tooltip.value.style.display = 'block';
        tooltip.value.style.left = `${rect.left + offset -80}px`;
        tooltip.value.style.top = `${rect.top +230}px`;
        tooltip.value.textContent = `評分數為: ${value} 分以上`;
      });

      rangeInput.addEventListener('mouseout', () => {
        // 鼠标移开时隐藏提示框
        tooltip.value.style.display = 'none';
        return { tooltip };
      });
    });

onUpdated(() =>{
  // console.log(2)
  const element = document.querySelectorAll('a[data-bs-toggle="modal"][data-bs-target="#addToShoppingCart"]');
  const elements = document.querySelectorAll('a[data-bs-toggle="modal2"][data-bs-target="#toProduct"]');
  element.forEach(button => {
    button.addEventListener('click', function() {
      // 獲取相關數據
      const cardContainer = this.closest('.card');
      const img = cardContainer.querySelector('img').getAttribute('src');
      const productId = cardContainer.querySelector('.card-number').innerText;
      const name = cardContainer.querySelector('.card-name').innerText;
      const price = cardContainer.querySelector('.card-price').innerText;
      const description = cardContainer.querySelector('.card-text').innerText;

      // 現在你可以使用 imgSrc, productId, name, price 和 description 進行需要的操作

      pdetails.img =img;
      pdetails.productId =productId;
      pdetails.name = name;
      pdetails.price = price;
      pdetails.description = description;

      productDetails.value = pdetails;
      console.log(productDetails)

      // console.log(img);
      // console.log(productId);
      // console.log(name);
      // console.log(price);
      // console.log(description);
      // console.log(productDetails)
    });
  });
  elements.forEach(button =>{
  button.addEventListener('click',function(){
    const cardContainer = this.closest('.card');
    const productId = cardContainer.querySelector('.card-number').innerText;
    sessionStorage.setItem("productId", productId);
    console.log(productId)
  })  
  })
});

//按照分數搜尋
const chioseRate = function() {
  console.log(avgRateScore.value)
  datas.avgRateScore = avgRateScore.value
  loadProducts();
}
//排序
const sortHandler = type => {
  datas.order = datas.sortOrder === "asc" ? "desc" : "asc"
  datas.sort = type
  loadProducts()
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

const addToShoppingCart = async () => {
  if ($cookies.get("identity") != null) {
    if ($cookies.get("identity") === "會員") {
      if ($cookies.get("id") != null) {
        // console.log($cookies.get("fkMemberId"))
        addShopCart.fkMemberId = $cookies.get("id")
        addShopCart.fkProductId = pdetails.productId;
        addShopCart.count = counting.value;
        console.log(addShopCart);
        if (addShopCart.count == 0) {
          Swal.fire({
            icon: "warning",
            title: "請輸入購買數量!",
          });
        } else {
          const response = await axios.put(URLADDSHOPPINGCART, addShopCart);
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "已加入購物車!",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "查無此帳號!",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "請使用非廠商帳號登入!",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "請先登入!",
    });
  }
};


  //再載入的時候就執行loadProduct(),就會先將datas的jsont傳到後端搜尋
  loadProducts();
  loadType();

//   window.onload=function(){
//   const element = document.querySelectorAll('a[data-bs-toggle="modal"][data-bs-target="#addToShoppingCart"]');
//   element.forEach(button => {
//     button.addEventListener('click', function() {
//       // 獲取相關數據
//       const cardContainer = this.closest('.card');
//       const imgSrc = cardContainer.querySelector('img').getAttribute('src');
//       const productId = cardContainer.querySelector('.card-title').innerText.split('產品編號: ')[1].split(' 產品名稱: ')[0];
//       const name = cardContainer.querySelector('.card-title').innerText.split('產品名稱: ')[1];
//       const price = cardContainer.querySelector('.card-title + h4').innerText.split('售價: ')[1].split(' 元')[0];
//       const description = cardContainer.querySelector('.card-text').innerText;

//       // 現在你可以使用 imgSrc, productId, name, price 和 description 進行需要的操作
//       console.log(imgSrc);
//       console.log(productId);
//       console.log(name);
//       console.log(price);
//       console.log(description);
//     });
//   });
// }
  

</script>        
    
<style scoped>
    .shop-item {
        display: flex; 
        justify-content: space-between;
        
    }
    .shop-item > *{
      flex :1 ;
      padding: 0.5%;
    }

  .custom-range-tooltip {
  position: absolute;
  background-color: #ee3f09d5;
  color: #fff;
  padding: 4px;
  border-radius: 100px;
  display: none;
  }
  .reversed-range {
  direction: rtl;
  transform: scaleX(-1);
}
.reversed-range::-webkit-slider-thumb {
  transform: scaleX(-1);
}
.card-text {
  white-space: nowrap;      /* 防止文本换行 */
  overflow: hidden;         /* 隐藏溢出文本 */
  text-overflow: ellipsis;  /* 显示省略号 */
  max-width: 250px;         /* 指定最大宽度，根据需要调整 */
}


</style>