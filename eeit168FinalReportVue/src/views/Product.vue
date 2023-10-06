<template>
  <div>
    <div>商品標題: <input type="text" v-model="productTitle" /></div>
    <div>商品分類: <input type="text" v-model="productCategory" /></div>

    <!-- 直接从 sessionStorage 获取数据 -->
    <div>商品規格: <router-link to="/type">+</router-link></div>
    <div v-for="(item, index) in inputsArray" :key="index">
      {{ item.size }} - {{ item.price }} - {{ item.inventory }}
    </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputsArray: [],
      productTitle: "", // 商品标题
      productCategory: "", // 商品分類
      productDescription: "", // 商品描述
    };
  },
  created() {
    // 从 sessionStorage 中获取数据并解析为数组
    const storedData = sessionStorage.getItem("type");
    if (storedData) {
      this.inputsArray = JSON.parse(storedData);
    }
  },
  methods: {
    clearSessionStorage() {
      // 清空 sessionStorage 中的数据
      sessionStorage.removeItem("type");
      // 清空本地数据
      this.inputsArray = [];
    },
    saveProduct() {
      // 创建包含商品信息的 JSON 对象
      const productData = {
        title: this.productTitle,
        category: this.productCategory,
        description: this.productDescription,
        specs: this.inputsArray,
      };
      const productDataJSON = JSON.stringify(productData);

      // 可以在这里执行其他保存操作，例如将数据发送到服务器

      console.log("保存商品信息:", productDataJSON);

      // 清空 sessionStorage 中的数据
      sessionStorage.removeItem("type");

      // 清空本地数据
      this.inputsArray = [];
      this.productTitle = "";
      this.productCategory = "";
      this.productDescription = "";

      // 跳转到其他页面
      this.$router.push("/other-page");
    },
  },
  beforeRouteLeave(to, from, next) {
    // 在离开页面前保存数据
    const productData = {
      title: this.productTitle,
      category: this.productCategory,
      description: this.productDescription,
      specs: this.inputsArray,
    };
    const productDataJSON = JSON.stringify(productData);
    sessionStorage.setItem("type", productDataJSON);
    next();
  },
};
</script>
