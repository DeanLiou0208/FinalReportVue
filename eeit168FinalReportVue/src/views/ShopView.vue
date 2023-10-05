<template>
        <h1>Shop</h1>
        <div class="shop-item">
                <shopItem></shopItem><shopItem></shopItem><shopItem></shopItem>
        </div>
</template>
    
<script setup>
  import shopItem from '../components/ShopItem.vue'
</script>        
    
<style>
    .shop-item{
        display: flex; /* 使用Flex布局 */
        justify-content: space-between; /* 在父容器中均匀分布子元素 */
    }
</style>