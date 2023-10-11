<template>
  <div>
    <div>
     <span>規格:&nbsp;&nbsp;&nbsp;&nbsp;</span>  <input type="text" v-model="sizeInput" />
    </div>
    <div>
      <span>價格:&nbsp;&nbsp;&nbsp;&nbsp;</span> <input type="number" v-model="priceInput" />
    </div>
    <div>
      <span>庫存量 :</span>   <input type="number" v-model="inventoryInput" />
    </div>
    <button @click="addInput">+</button>
  </div>

</template>

<script>
export default {
  data() {
    return {
      sizeInput: "",
      priceInput: "",
      inventoryInput: "",
    };
  },
  methods: {
    addInput() {
      if (this.sizeInput && this.priceInput && this.inventoryInput) {
        // 創建一個輸入物件並添加到 inputs 陣列中
        const newItem = {
          size: this.sizeInput,
          price: this.priceInput,
          inventory: this.inventoryInput,
        };
        this.$emit("add", newItem); // 通知父組件添加輸入
        // 清空輸入框
        this.sizeInput = "";
        this.priceInput = "";
        this.inventoryInput = "";
      }
    },
  },
};
</script>
<style scoped>
/* 調整輸入框樣式 */
input[type="text" ],[type="number"] {
  width: 30%; /* 使輸入框寬度充滿父容器 */
  margin-bottom: 10px; /* 添加底部間隔 */
  padding: 5px; /* 添加內邊距以增加輸入框的間隔 */
  box-sizing: border-box; /* 保證內邊距不會使寬度超出 */
  
}

/* 調整刪除按鈕樣式 */
button {
  margin-left: 10px; /* 添加按鈕之間的間隔 */
}
span{
  flex: auto;
margin: 10px;
padding: 10px;
text-align: right;}
hr {
  margin: 10px 0; /* 添加分隔線的間隔 */
}
</style>