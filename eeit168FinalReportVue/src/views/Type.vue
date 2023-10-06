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
    newItem.readonly = true;
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
