<template>
    <div class="main-content">
    <div class="sidebar routerborder">
        <ul>
            <li><router-link to="/memberInformation"><h6>個人資料</h6></router-link></li>
            <li><router-link to="/personalPetView"><h5>我的寵物</h5></router-link></li>
            <li><router-link to=""><h6>我的文章</h6></router-link></li>
            <li><router-link to=""><h6>我的收藏</h6></router-link></li>
            <li><router-link to=""><h6>我的訂單</h6></router-link></li>
            <li><router-link to=""><h6>我的任務</h6></router-link></li>
        </ul>
    </div>



<div class="content">
    <div v-for="(pet, index) in pets" :key="index" class="box">

        <fieldset class="size">
            <div :id="'carouselExampleControls'+index" class="carousel slide" data-bs-ride="false">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img :src="pet.firstPhoto.img" class="d-block w-100 size" alt="這是第一個">
                </div>
                <div class="carousel-item"  v-for="(img, imgIndex) in pet.imgList" :key="imgIndex">
                    <img :src="img.img" class="d-block w-100 
                    8size" alt="無法顯示圖片">
                </div>

            </div>
            <button class="carousel-control-prev" type="button" :data-bs-target="'#carouselExampleControls'+index" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" :data-bs-target="'#carouselExampleControls'+index" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>
        </fieldset>

        <fieldset>
            <div>寵物編號 : {{ pet.petId }}</div>
            <div>寵物名字 : {{ pet.name }}</div>
            <div>寵物類型 : {{ pet.species }}</div>
            <div>寵物品種 : {{ pet.breed }}</div>
            <div>寵物年齡 : {{ pet.age }}</div>
            <div v-if="`${ gender }`=== true">寵物性別 : 公</div>
            <div v-else-if="`${ gender }`=== false">寵物性別 : 母</div>
            <div v-else>寵物性別 : 不公開</div>

        </fieldset>
    </div>
</div>
</div>
</template>
    
<script setup>
    import { ref, reactive } from "vue";
    import axios from "axios";

    const URL = import.meta.env.VITE_API_JAVAURL;
    const pets = ref([]);
    const owner = reactive({
        fkMemberId : 2,
    });
    const API_URL = `${URL}pages/pet/information/find`;   
    const loadPets = async () => {
        const response = await axios.post(API_URL, owner);
        pets.value = response.data.petList;
    };
    loadPets();
</script>
    
<style scoped>
    .box {
        display: flex;
        justify-content: space-around;
    }
    .size{
        margin: 10px;
        width: 200px;
        height: 200px;
    }
    .routerborder{
        border: black 1px solid;
        height: 200px;
        width: 150px;
    }
    .content{
        flex-grow: 1;
    }
    .main-content{
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    
</style>