<template>
    <div class="container">
    <div class="box" style="display: flex; align-items: center;">
      <!-- <h2>文章種類</h2> -->
      
      <span class="badge bg-secondary " style="font-size:18px;" >文章種類</span>
      
      <button class="btn btn-primary"
        v-for="(type, index) in ArticleTypes"
        :key="index"
        @click="filterArticlesByType(type)"
        :class="{ active: selectedType === type }"
        :style="{ 'font-size': '16px' }" 
      >
        {{type}}
      </button>
    </div>
       </div>
   
</template>
    
<script setup >
    import { ref, reactive} from 'vue';
    const selectedType = ref(null); 
const ArticleTypes = [
       "寵物協尋",
       "寵物用品",
       "萌寵搞笑",
       "寵物飲食",
       "寵物美容",
       "生活起居",
       "寵物訓練"
     ];
     const lastSelectedType = ref(null);
     const emit = defineEmits(["typeChange"]);
     const filterArticlesByType = (type) => {
      if (selectedType.value === type) {
    // 如果已经选择了相同的文章种类，取消选择
    selectedType.value = null;
    } else {
    // 否则选择新的文章种类
    selectedType.value = type;
    // 使用 emit 通知父组件所选文章种类的变化
  }
  // 更新上一次选择的文章种类
  // lastSelectedType.value = selectedType.value;
  emit("typeChange", type);
     }
</script>
    
<style scoped>
    
</style>