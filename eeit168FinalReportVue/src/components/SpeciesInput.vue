<template>
    <div class="container">
    <div class="box" style="display: flex; align-items: center;">
      <!-- <h2>寵物物物種：</h2> -->
      
      <span class="badge bg-secondary " style="font-size:18px;" >寵物物種</span>
      
      <button class="btn btn-primary"
        v-for="(species, index) in petSpecies"
        :key="index"
        @click="toggleSpecies(species,speciesIds)"
        :class="{ active: selectedSpecies.includes(species) }"
        :style="{ 'font-size': '16px' }" 
      >
        {{ species}}
      </button>
    </div>

   
  </div>
</template>
    
<script setup >
import { ref, reactive} from 'vue';
import axios from 'axios';
const selectedSpecies = ref([]); // 存储已选择的宠物物种
const petSpecies = [
       "狗狗家族",
       "貓貓家族",
       "水族兩棲",
       "鳥類家族",
       "爬蟲家族",
       "小型動物",
       "其他種類"
     ];

const speciesIds = ref({
  '狗狗家族': 1,
  '貓貓家族': 2,
  '水族兩棲': 3,
  '鳥類家族': 4,
  '爬蟲家族': 5,
  '小型動物': 6,
  '其他種類': 7
});

const emit = defineEmits(["SpeciesChange"]);

const toggleSpecies = (species,speciesIds) => {
    if (selectedSpecies.value.includes(species)) {
         const index = selectedSpecies.value.indexOf(species);
         selectedSpecies.value.splice(index, 1);
       } else {
         selectedSpecies.value.push(species);
       }
       console.log(selectedSpecies.value);
       // 获取选定宠物物种的值
       const selectedSpeciesIds = selectedSpecies.value.map(selected => speciesIds[selected]);
       console.log("selectedSpeciesIds:"+selectedSpeciesIds)
    //    datas.speciesId = selectedSpeciesIds; // 使用数组存储多个 speciesId
  emit("SpeciesChange", selectedSpeciesIds);
};

</script>
    
<style>
    /* 根据选中状态修改按钮样式 */
.active {
  background-color: #007BFF;
  color: #fff;
}

</style>