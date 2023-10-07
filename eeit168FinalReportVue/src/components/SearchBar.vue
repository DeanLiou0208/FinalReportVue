<template>
    <input type="search"  @focusout="inputHandelr" v-model="keyword" placeholder="請問客官今天要來點什麼?" class="form-control mb-3">
        
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