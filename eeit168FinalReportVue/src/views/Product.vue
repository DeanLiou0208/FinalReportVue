<template>
  <div class="container">
    <div id="box">
      <div id="skin">
        <div id="add">+</div>
        <input type="file" name="file" id="picFile1" @change="fileChange1()" />
      </div>
      <div id="skin2">
        <div id="add">+</div>
        <input type="file" name="file" id="picFile2" @change="fileChange2()" />
      </div>
      <div id="skin3">
        <div id="add">+</div>
        <input type="file" name="file" id="picFile3" @change="fileChange3()" />
      </div>
    </div>
    <br />
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
          <td>{{ index + 1 }}</td>
          <td>{{ item.size }}</td>
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
    <!-- <button @click="clearSessionStorage">清空数据</button> -->
    <button @click="saveProduct">傳送</button>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      inputsArray: [],
      productTitle: "", // 商品标题
      productCategory: "", // 商品分類
      productDescription: "", // 商品描述
      productObject: [],
      productId: [],
      fileInput1: null,
      fileInput2: null,
      fileInput3: null,
      URL: import.meta.env.VITE_API_JAVAURL,
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
    console.log(this.$cookies.get("id"));
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
        fkCompanyId: this.$cookies.get("id"),
        name: `"` + this.productTitle + `"`,
        type: `"` + this.productCategory + `"`,
        description: `"` + this.productDescription + `"`,
        sizeArray: this.inputsArray,
      };
      productData.name = productData.name.replace(/[\n,]/g, " ");
      productData.description = productData.description.replace(/[\n,]/g, " ");
      const productDataJSON = JSON.stringify(productData);
      console.log("保存商品信息1:", productDataJSON);

      axios
        .post(`${this.URL}pet_web/product/insert`, productData)
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            for (let i = 0; i < response.data.id.length; i++) {
              this.productId.push(response.data.id[i].id);
            }
            console.log(this.productId);
            this.uploadImages();

            // alert(response.data.message)
            Swal.fire({
              title: response.data.message,
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                // 清空 sessionStorage 中的数据
                sessionStorage.removeItem("type");
                sessionStorage.removeItem("product");
                // 清空本地数据
                this.inputsArray = [];
                this.productTitle = "";
                this.productCategory = "";
                this.productDescription = "";

                // 跳转到其他页面
                window.location.href = "comshop";
              }
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fileChange1() {
      let file = document.getElementById("picFile1").files[0];
      this.fileInput1 = document.getElementById("picFile1");
      let readFile = new FileReader();
      readFile.readAsDataURL(file);
      readFile.addEventListener(`load`, function () {
        let img = new Image();
        img.src = readFile.result;
        img.style.width = "100%";
        img.style.height = "100%";
        skin.innerHTML = "";
        skin.appendChild(img);
      });
      document.getElementById("skin2").style.display = "block";
    },
    fileChange2() {
      let file = document.getElementById("picFile2").files[0];
      this.fileInput2 = document.getElementById("picFile2");
      let readFile = new FileReader();
      readFile.readAsDataURL(file);
      readFile.addEventListener(`load`, function () {
        let img = new Image();
        img.src = readFile.result;
        img.style.width = "100%";
        img.style.height = "100%";
        skin2.innerHTML = "";
        skin2.appendChild(img);
      });
      document.getElementById("skin3").style.display = "block";
    },
    fileChange3() {
      let file = document.getElementById("picFile3").files[0];
      this.fileInput3 = document.getElementById("picFile3");
      let readFile = new FileReader();
      readFile.readAsDataURL(file);
      readFile.addEventListener(`load`, function () {
        let img = new Image();
        img.src = readFile.result;
        img.style.width = "100%";
        img.style.height = "100%";
        skin3.innerHTML = "";
        skin3.appendChild(img);
      });
    },
    uploadImages() {
      console.log(1);

      for (let i = 0; i < this.productId.length; i++) {
        console.log(2);
        console.log(this.fileInput1);
        console.log(this.fileInput2);
        console.log(this.fileInput3);

        if (this.fileInput1) {
          const data = { productId: this.productId[i], main: true };
          const body = JSON.stringify(data);
          const formData = new FormData();
          formData.append("body", body);
          formData.append("file", this.fileInput1.files[0]);
          for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
          }
          axios
            .post(`${this.URL}pet_web/product-photo/insert`, formData)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        }

        if (this.fileInput2) {
          const data = { productId: this.productId[i], main: null };
          const body = JSON.stringify(data);
          const formData = new FormData();
          formData.append("body", body);
          formData.append("file", this.fileInput2.files[0]);
          for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
          }
          axios
            .post(`${this.URL}pet_web/product-photo/insert`, formData)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        }

        if (this.fileInput3) {
          const data = { productId: this.productId[i], main: null };
          const body = JSON.stringify(data);
          const formData = new FormData();
          formData.append("body", body);
          formData.append("file", this.fileInput3.files[0]);
          for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
          }
          axios
            .post(`${this.URL}pet_web/product-photo/insert`, formData)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
      this.productId = [];
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
#box {
  display: flex;
}
#skin,
#skin2,
#skin3 {
  border: 3px solid gray;
  height: 100px;
  max-width: 100px;
  text-align: center;
  flex: 1;
  margin: 2px;
}
#add {
  font: bold 75px "微軟正黑體";
  color: gray;
  position: relative;
  top: 50%;
  transform: translate(0, -60%);
}
#picFile1,
#picFile2,
#picFile3 {
  width: 100px;
  height: 100px;
  opacity: 0;
  position: absolute;
  transform: translate(-50%, -105%);
}
#skin2,
#skin3 {
  display: none;
}
</style>
