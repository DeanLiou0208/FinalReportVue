<template>
  <div>
    <div>商品標題: <input type="text" v-model="productTitle" /></div>
    <div>商品分類: <input type="text" v-model="productCategory" /></div>

    <!-- 直接从 sessionStorage 获取数据 -->
    <div>商品規格: <router-link to="/type" @click="save()">+</router-link></div>
  
    <table class="table table-bordered">
    <thead>
      <tr>
        <th>筆數</th>
        <th>規格</th>
        <th>價格</th>
        <th>庫存量</th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in inputsArray" :key="index">
      <td>{{ index+1 }}</td>
      <td>{{ item.size }} </td>
      <td>{{ item.price }}</td>
      <td>{{ item.inventory }}</td> 
    </tr>
  </tbody>
  </table>
    <div>商品描述:</div>
    <textarea
      v-model="productDescription"
      name=""
      id=""
      cols="30"
      rows="10"
    ></textarea>

    <!-- 添加清空按钮 -->
    <button @click="clearSessionStorage">清空数据</button>
    <button @click="saveProduct">傳送</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      inputsArray: [],
      productTitle: "", // 商品标题
      productCategory: "", // 商品分類
      productDescription: "", // 商品描述
      productObject: [],
    };
  },
  created() {
    // 从 sessionStorage 中获取数据并解析为数组
    const storedData = sessionStorage.getItem("type");
    if (storedData) {
      this.inputsArray = JSON.parse(storedData);
    }

    const product = sessionStorage.getItem("product");
    console.log(sessionStorage.getItem("product"));
    if (product != null) {
      this.productObject = JSON.parse(product);
      this.productTitle = this.productObject[0].productTitle;
      this.productCategory = this.productObject[0].productCategory;
      this.productDescription = this.productObject[0].productDescription;
    }
    console.log(this.productObject);
  },
  methods: {
    clearSessionStorage() {
      // 清空 sessionStorage 中的数据
      sessionStorage.removeItem("type");
      sessionStorage.removeItem("product");
      // 清空本地数据
      this.inputsArray = [];
      this.productObject = [];
    },

    save() {
      const product = {
        productTitle: this.productTitle,
        productCategory: this.productCategory,
        productDescription: this.productDescription,
      };
      this.productObject.push(product);
      console.log(this.productObject);
      const inputsJSON = JSON.stringify(this.productObject);
      sessionStorage.setItem("product", inputsJSON);
    },
    saveProduct() {
      // 创建包含商品信息的 JSON 对象
      const productData = {
        //可能需加入抓fkcompanyid的資訊
        fkCompanyId: 2,
        name: this.productTitle,
        type: this.productCategory,
        description: this.productDescription,
        sizeArray: this.inputsArray,
      };
      const productDataJSON = JSON.stringify(productData);
      console.log("保存商品信息1:", productDataJSON);
      axios
        .post("http://localhost:8080/pet_web/product/insert", productData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      // 清空 sessionStorage 中的数据
      sessionStorage.removeItem("type");
      sessionStorage.removeItem("product");
      // 清空本地数据
      this.inputsArray = [];
      this.productTitle = "";
      this.productCategory = "";
      this.productDescription = "";

      // 跳转到其他页面
      this.$router.push("/other-page");
    },
  },
};
</script>
<style scoped>
/* 調整輸入框樣式 */
input[type="text"] {
  width: 30%; /* 使輸入框寬度充滿父容器 */
  margin-bottom: 10px; /* 添加底部間隔 */
  padding: 5px; /* 添加內邊距以增加輸入框的間隔 */
  box-sizing: border-box; /* 保證內邊距不會使寬度超出 */
}

/* 調整刪除按鈕樣式 */
button {
  margin-left: 10px; /* 添加按鈕之間的間隔 */
}

hr {
  margin: 10px 0; /* 添加分隔線的間隔 */
}
</style>
