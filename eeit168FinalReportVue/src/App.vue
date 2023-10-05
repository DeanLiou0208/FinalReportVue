<template>
    <div>
        <header>
            <navbar></navbar>
        </header>

    <hr>
        <div class="view">
            <router-view></router-view>
        </div> 
    <hr>
    <footer>
        <h5>iSpan-EEiT-168team6 company</h5>
    </footer>
    </div>
</template>
  
<script setup >
import Navbar from "./components/Navbar.vue"


</script>
  
<style scoped>
  /* .view{
    height: 800px; width: 1200px;
  } */
</style>