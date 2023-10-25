<template>
    <div >
        <header style="height: 150px;">
        <!-- <div id="header" style="height: 120px;" >
            <figure class="text-center container ml-1">
                <blockquote class="blockquote">
                    <p>ABOUT PET ALL YOU LOVE.</p>
            </blockquote>
                <figcaption class="blockquote-footer"> “A house is not a home until  
                    <cite title="Source Title">it has a dog.”</cite>
                </figcaption>
            </figure>
        </div> -->
            <div >
            <navbar></navbar>
            </div>
        
        </header>

    <hr>
        <div class="view container ml-1">
            <router-view></router-view>
        </div> 
    <hr>
    <footer>
        <div id="footer">
            <h6>@iSpan-EEiT-168team6 company</h6>
        </div>
    </footer>
    </div>

    <!-- <div class="wrap">
        <div class="Header"></div>
        <div class="Leftbar"></div>
        <div class="Rightbar"></div>
        <div class="Body"></div>
        <div class="clearfix"></div>
        <div class="Footer"></div>
    </div> -->


</template>
  
<script setup >
import Navbar from "./components/navbar.vue"


</script>
  
<style scoped>
    /* #header{
        background-color: rgb(255, 253, 127);
        height: 80px;
    } */
    #footer{
        background-color: rgb(255, 253, 127);
        display: flex;
        align-items: center; /* 垂直置中 */
        justify-content: center; /* 水平置中 */
        height: 60px;
    }
    /* .Leftbar{
        background: gold;
        text-align: center;
        
    } */

</style>