<template>
    <div class="main-content">
        <div class="sidebar routerborder">
            <ul>
                <li><router-link class="nav-link text-primary" to="/memberInformation">
                        <h6>個人資料</h6>
                    </router-link></li>
                <li><router-link class="nav-link text-primary" to="/personalPetView">
                        <h5>我的寵物</h5>
                    </router-link></li>
                <li><router-link class="nav-link text-primary" to="/forumbymemberinf">
                        <h6>我的文章</h6>
                    </router-link></li>
                <li><router-link class="nav-link text-primary" to="">
                        <h6>我的收藏</h6>
                    </router-link></li>
                <li><router-link class="nav-link text-primary" to="">
                        <h6>我的訂單</h6>
                    </router-link></li>
                <li><router-link class="nav-link text-primary" to="">
                        <h6>我的任務</h6>
                    </router-link></li>
            </ul>
        </div>

        <div class="container">
            <h2>我的寵物</h2>
            <a href="/petnewview">
                <button class="btn btn-primary" type="button">
                    新增寵物
                </button>
            </a>
            <div class="content">

                <fieldset v-for="(pet, index) in pets" :key="index" class="box">

                    <div class="size">
                        <div :id="'carouselExampleControls' + index" class="carousel slide" data-bs-ride="false">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img :src="pet.firstPhoto.img" class="d-block w-100 size" alt="這是第一個" v-if="imgShow[index]">
                                    <img src="../assets/img/notfoundimg.png" class="d-block w-100 size" alt="這是第一個" v-else>
                                </div>
                                <div class="carousel-item" v-for="(img, imgIndex) in pet.imgList" :key="imgIndex">
                                    <img :src="img.img" class="d-block w-100 
                        size" alt="無法顯示圖片">
                                </div>

                            </div>
                            <button class="carousel-control-prev" type="button"
                                :data-bs-target="'#carouselExampleControls' + index" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button"
                                :data-bs-target="'#carouselExampleControls' + index" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    <div class="petinfo">
                        <div>寵物編號 : {{ pet.petId }}</div>
                        <div>寵物名字 : {{ pet.name }}</div>
                        <div>寵物類型 : {{ pet.species }}</div>
                        <div>寵物品種 : {{ pet.breed }}</div>
                        <div>寵物年齡 : {{ pet.age }}</div>
                        <div v-if="`${pet.gender}`==='true'">寵物性別 : 公</div>
                        <div v-else-if="`${pet.gender}`==='false'">寵物性別 : 母</div>
                        <div v-else>寵物性別 : 不公開</div>
                    </div>

                    <div class="buttomstyle">
                        <!-- <button type="button" class="btn btn-warning">修改</button>
                        <br>
                        <br>
                        <br>
                        <button type="button" class="btn btn-danger">刪除</button> -->
                    </div>
                </fieldset>
                
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref, reactive, inject } from "vue";
import axios from "axios";
const $cookies = inject("$cookies");
const URL = import.meta.env.VITE_API_JAVAURL;
const pets = ref([]);
const owner = reactive({
    fkMemberId: $cookies.get("id"),
});
const imgShow = ref([]);
const API_URL = `${URL}pages/pet/information/find`;

const loadPets = async () => {
    const response = await axios.post(API_URL, owner);
    pets.value = response.data.petList;
    for(let i = 0; i < pets.value.length; i++){
        if(pets.value[i].img === undefined || pets.value[i].img === null){
            imgShow.value[i] = false;
        }else{
            imgShow.value[i] = true;
        }

    }

};
loadPets();
</script>
    
<style scoped>
.box {
    display: flex;
    justify-content: space-around;
}

.size {
    margin: 5px;
    width: 200px;
    height: 200px;
}

.routerborder {
        padding: 50px 0;
        border: black 1px solid;
        border-radius: 10px;
        height: 300px;
        width: 150px;
    }

.content {
    flex-grow: 1;
}

.main-content {
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.petinfo {
    margin-top: 30px;
    margin-left: 120px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    height: auto;
    /* 让容器占满整个视窗高度 */
}

.buttomstyle{
    margin-top: 30px;
    margin-left: 80px;
}

fieldset {
    border: black solid 1px;
    margin-top: 30px;
    padding: 30px;
    border-radius: 10px;
    background-color: AliceBlue;
}

</style>