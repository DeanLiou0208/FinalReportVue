<template>
    <nav>
        <ul class="pagination pagination-sm">
            
            <li class="page-item" v-for="(value, index) in totalPages" :key="index"
            @click="chickHandler(value)"
            >
            <a :class="{'currentPage' : thePage ===value, 'page-link':true }">{{ value }}</a>
            </li>
            
        </ul>
    </nav>    
</template>
    
<script setup>
    //定義父元件傳進來的屬姓名稱
    const props = defineProps({
        totalPages : Number,
        thePage : Number
    })

    console.log(props.totalPages)
    console.log(props.thePage)

    //定義父元件傳進來的事件名稱
    const emit = defineEmits(["childClick"])

    const chickHandler = page=>{
        //引發父元件定義好的事件,並且把資料傳給父元件的事件綁定的函式
        emit("childClick",page)
    }

</script>
    
<style scoped>
    
.pagination li {
    cursor: pointer;
}

.currentPage {
    background-color: lightblue;
}
</style>