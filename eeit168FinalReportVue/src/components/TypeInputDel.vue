<template>
  <div>
    <div v-for="(item, index) in inputs" :key="index">
        <hr />
      <div>size: <input type="text" v-model="item.size" /></div>
      <div>price: <input type="text" v-model="item.price" /></div>
      <div>inventory: <input type="text" v-model="item.inventory" /></div>
      <button @click="removeInput(index)">-</button>
    
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputs: Array, // 由父組件傳遞的 inputs 陣列
  },
  methods: {
    removeInput(index) {
      this.inputs.splice(index, 1); // 從 inputs 陣列中刪除輸入
    },
  },
};
</script>
<style>
/* 調整輸入框樣式 */
input[type="text"] {
  width: 100%; /* 使輸入框寬度充滿父容器 */
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
