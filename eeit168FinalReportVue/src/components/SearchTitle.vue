<template>
        <div class="container">
            <div class="py-2 d-flex justify-content-end" >
            <input class="form-control" type="search" v-model="keyword" placeholder="請輸入文章標題關鍵字" > 
        </div>
            <div class="py-2 d-flex justify-content-end" >            
        <button class="btn btn-info" @click="inputHandler()" ><i class="bi bi-search"></i> 查詢</button> 
    </div>
    </div>   
</template>
    
<script setup>
    import { ref } from 'vue'
const keyword = ref("") //產品搜尋
const emit = defineEmits(["searchInput"])
const inputHandler = () => {
    emit("searchInput", keyword.value)
    // emit("searchInput", insert.value)

}
</script>
    
<style scoped>
    .form-control{
        width: 200px;
    }
</style>