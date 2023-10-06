<template>
  <div>
    <div>
      size: <input type="text" v-model="sizeInput" />
    </div>
    <div>
      price: <input type="text" v-model="priceInput" />
    </div>
    <div>
      inventory: <input type="text" v-model="inventoryInput" />
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
