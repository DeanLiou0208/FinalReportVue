<template>
  <div>
    <button @click="saveInputs">儲存</button>
    <TypeAdd @add="addToInputs" />
    <TypeInputDel :inputs="inputs" />
  </div>
</template>

<script>
import TypeAdd from "../components/TypeAdd.vue";
import TypeInputDel from "../components/TypeInputDel.vue";

export default {
  data() {
    return {
      inputs: [],
    };
  },
  methods: {
  addToInputs(newItem) {
    this.inputs.push(newItem);
   
  },
  saveInputs() {
    try {
      // 使用 JSON.stringify 将输入数据转换为 JSON 字符串
      const inputsJSON = JSON.stringify(this.inputs);
      sessionStorage.setItem("type", inputsJSON);
      console.log(this.inputs);
      this.$router.push('/product');
    } catch (error) {
      console.error("Error while storing data:", error);
    }
  },
},
  components: {
    TypeAdd,
    TypeInputDel,
  },
};
</script>
<style scoped>
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