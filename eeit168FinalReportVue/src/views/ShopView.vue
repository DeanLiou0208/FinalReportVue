<template>
        <h1>Shop</h1>
        <!-- <div class="shop-item">
                <shopItem></shopItem><shopItem></shopItem><shopItem></shopItem>
        </div> -->
    <div class="shop">
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product">
        <h3>{{ product.name }}</h3>
        <p>價格: ${{ product.price }}</p>
      </div>
    </div>
  </div>

</template>
    
<script setup>
  import shopItem from '../components/shopitem.vue'
  import {ref ,reactive} from "vue";
  import axios from 'axios';

  
  


</script>        
    
<style>
    /* .shop-item{ */
        /* display: flex; 使用Flex布局 */
        /* justify-content: space-between; 在父容器中均匀分布子元素 */
    /* } */
</style>