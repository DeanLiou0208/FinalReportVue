<template>
        <select class="form-select" v-model="selectedSort" @change="sortArticles">
        <option value="" selected>全部</option>
        <option value="likeCount">按讚數</option>
        <option value="unLikeCount">倒讚數</option>
        <option value="createAt">由新至舊</option>
        </select>
</template>
    
<script setup>
    import {ref} from 'vue'
    const selectedSort = ref("")
    const emit = defineEmits(["sortChange"])

    const sortArticles = ()=>{
        console.log(selectedSort.value)
        emit("sortChange",selectedSort.value)
    }
</script>
    
<style scoped>
    
</style>