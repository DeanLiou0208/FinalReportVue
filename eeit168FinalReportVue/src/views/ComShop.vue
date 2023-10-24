<template>


  <div class="container ml-1">
    <div class="row">
      <div>
        <a href="/product"><button>新增產品</button></a>
      </div>
      <div

        class="col-12 col-md-6 col-lg-4"
        v-for="{
          img,
          price,
          name,
          description,
          productId,
          size,
          status,
        } in products"
        :key="productId"
      >
        <div class="card container ml-2 size" style="width: 100%">
          <img :src="`${img}`" class="card-img-top imgsize" alt="無法顯示圖片" />
          <div class="card-body">
            <div class="container ml-3" style="display: flex">
              <p>ItemNo:</p>
              <p class="card-number">{{ productId }}</p>
            </div>
            <div class="container ml-3" style="display: flex">
              <h5 class="card-text">商品:{{ name }}</h5>
            </div>
            <div class="container ml-3" style="display: flex">
              <div class="left-content">
                <p class="card-price">
                  規格:<span style="font-size: 30px; color: red"> </span>
                  <span style="font-size: 20px; color: blue">{{ size }}</span>
                </p>
              </div>
              <div class="right-content">
                <p class="card-price">
                  售價:
                  <span style="font-size: 30px; color: red">{{ price }} </span>
                  元
                </p>
              </div>
            </div>
            <div class="container ml-3" style="display: flex">
              <p>商品簡介:</p>
              <p class="card-text">{{ description }}</p>
            </div>
            <div class="dropdown" style="display: flex; align-items: center">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                上架/下架
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="storeType(productId, true)"
                    >上架</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="storeType(productId, false)"
                    >下架</a
                  >
                </li>
              </ul>
              <p class="card-price" style="margin-left: auto">
                狀態:
                <span style="font-size: 30px"></span>
                <span>{{ status }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Paging
      :totalPages="totalPage"
      :thePage="datas.start / datas.rows + 1"
      @child-click="clickHandler"
    ></Paging>
  </div>

</template>

<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import axios from "axios";
import Paging from "../components/Paging.vue";

const $cookies = inject("$cookies");
const products = ref([]);
const totalPage = ref(0);

const datas = reactive({
  name: "",
  price: "",
  description: "",
  //之後取cookies
  companyShopName: $cookies.get("username"),
  start: 0,
  rows: 5,
  order: "asc",
  sort: "productId",
});

const URL = import.meta.env.VITE_API_JAVAURL;
const URLAPI = `${URL}shop/product/sreach`;
const loadProducts = async () => {
  // http://localhost:8080/shop/product/sreach
  const response = await axios.post(URLAPI, datas);

  // console.log(response.data.list);
  products.value = response.data.list;

  // console.log(datas.start);
  // console.log(response.data.count);
  totalPage.value =
    +datas.rows === 0 ? 1 : Math.ceil(response.data.count / datas.rows);
  //取得所有產品算分頁
};
//paging 由子元件觸發
const clickHandler = (page) => {
  datas.start = (page - 1) * datas.rows;

  loadProducts();
};


onMounted(() => {
  loadProducts();
  // console.log($cookies.get("id"));
  // console.log($cookies.get("username"));
});

const storeType = (productId, isTrue) => {
  // console.log(productId, isTrue);
  updateProducts(productId, isTrue);
};

const URLupdate = `${URL}pet_web/product/updatestatus`;
const updateProducts = async (productId, isTrue) => {
  const dataStatus = reactive({
    id:productId,
    status:isTrue

  });
  const response = await axios.put(URLupdate, dataStatus);

  // console.log(response.data);

  loadProducts();
};
</script>

<style scoped>
.shop-item {
  display: flex;
  justify-content: space-between;
}

.card-text {
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出文本 */
  text-overflow: ellipsis; /* 显示省略号 */
  max-width: 250px; /* 指定最大宽度，根据需要调整 */
}
.size {
  max-width: 400px;
  max-height: 450px;
  min-height: 450px;
  margin: 10px;
}
img {
  max-width: 100%;
  max-height: 200px;
}
.left-content {
  flex: 1; /* 将左侧容器占据剩余的可用空间 */
  text-align: left; /* 文本左对齐，即在左侧 */
}

.right-content {
  text-align: right; /* 文本右对齐，即在右侧 */
}

.imgsize{
  width: 300px;
  height: 300px;
}
</style>
