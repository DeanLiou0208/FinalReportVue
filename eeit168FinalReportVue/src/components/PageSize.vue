<template>
    <select class=" from-select">
        <option value=0 selected>ALL</option>
        <option value=5>每頁顯示5筆資料</option>
        <option value=10>每頁顯示10筆資料</option>
    </select>    
</template>
    
<script setup >
    import {ref} from 'vue'
    const rows = ref(0)
    const emit = defineEmits(["PageSizeChange"])

        const changeHandler = ()=>{
            console.log(rows.value)
            emit("PageSizeChange", rows.value)
        }
</script>
    
<style scoped>
    
</style>