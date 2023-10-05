<template>
    <input type="search"  @input="inputHandelr" v-model="keyword" placeholder="請開始您的搜尋" class="form-control mb-3">
        
</template>
    
<script setup >
    
    import{ref} from 'vue'

    const keyword = ref("")
    const emit = defineEmits(["searchInput"])
    const inputHandelr = () =>{
        emit("searchInput", keyword.value)
    }

</script>
    
<style scoped>
    
</style>