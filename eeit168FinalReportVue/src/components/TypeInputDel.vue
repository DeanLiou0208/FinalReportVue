<template>
  <div>
    <div v-for="(item, index) in inputs" :key="index">
        <hr />
      <div> <span>規格:&nbsp;&nbsp;&nbsp;&nbsp;</span><input type="text" v-model="item.size"  disabled/></div>
      <div> <span>價格:&nbsp;&nbsp;&nbsp;</span> <input type="text" v-model="item.price"   disabled/></div>
      <div><span>庫存量 :</span><input type="text" v-model="item.inventory"  disabled/></div>
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

hr {
  margin: 10px 0; /* 添加分隔線的間隔 */
}
span{
  flex: auto;
margin: 10px;
padding: 10px;
text-align: right;}
</style>
