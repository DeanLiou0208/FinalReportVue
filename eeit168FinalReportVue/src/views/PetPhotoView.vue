<template>
        <span v-if="showChat">
            <ChatRoom></ChatRoom>
        </span>
        <span v-else>
            <span class="tital">萌寵照片</span>
        </span>
        <br>
    <div class="row">
        <div class="col-md-12">
            <span>物種選擇 : </span>&nbsp&nbsp
            <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" value="狗狗" name="species"
                    v-model="datas.species">
                <label class="btn btn-outline-primary" for="btncheck1">狗狗</label>
                &nbsp&nbsp
                <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" value="貓貓" name="species"
                    v-model="datas.species">
                <label class="btn btn-outline-primary" for="btncheck2">貓貓</label>
                &nbsp&nbsp
                <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" value="鳥類" name="species"
                    v-model="datas.species">
                <label class="btn btn-outline-primary" for="btncheck3">鳥類</label>
                &nbsp&nbsp
                <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off" value="水族" name="species"
                    v-model="datas.species">
                <label class="btn btn-outline-primary" for="btncheck4">水族</label>
                &nbsp&nbsp
                <input type="checkbox" class="btn-check" id="btncheck5" autocomplete="off" value="爬蟲" name="species"
                    v-model="datas.species">
                <label class="btn btn-outline-primary" for="btncheck5">爬蟲</label>
                &nbsp&nbsp
                <input type="checkbox" class="btn-check" id="btncheck6" autocomplete="off" value="小型" name="species"
                    v-model="datas.species">
                <label class="btn btn-outline-primary" for="btncheck6">小型</label>
            </div>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp

            <span>其他篩選 : </span>&nbsp&nbsp
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked
                    v-model="datas.record" value="全部">
                <label class="btn btn-outline-primary" for="btnradio1">全部</label>

                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off"
                    v-model="datas.record" value="我的最愛">
                <label class="btn btn-outline-primary" for="btnradio2">我的最愛</label>
            </div>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                <span>排序 :　</span>&nbsp&nbsp
                <select class="form-select custom-select" aria-label="Default select example" v-model="sortOrder"
                @change="selectSortOrder">
                <option value="1">最新</option>
                <option value="2">最舊</option>
                <option value="3">愛心數最多</option>
                <option value="4">愛心數最少</option>
            </select>
        </div>
    </div>
    <!-- <span>搜尋總比數 : {{ count }}</span> -->
    <br>

    <div class="container ml-1">
        <div class="row">
            <div style="width: 300px;" v-for="(pet, index) in pets" :key="index">
                <div class="card-add container ml-2">
                    <fieldset>
                        <div class="petinfo">
                            <div>寵物編號 :　{{ pet.id }}</div>
                            <div>寵物名字 :　{{ pet.name }}</div>
                            <div>寵物物種 :　{{ pet.species }}</div>
                            <div>寵物品種 :　{{ pet.breed }}</div>
                            <div>寵物主人 :　{{ pet.userName }}</div>
                            <div>上傳日期 :　{{ pet.createAt }}</div>
                            <div class="like">
                                <button type="button" class="btn btn-light" v-if="pet.likeRecord"
                                    @click="cancelClick(index)"><i class="bi bi-heart-fill color"></i>&nbsp&nbsp{{
                                        pet.likeCount }}</button>
                                <button type="button" class="btn btn-light" v-else @click="likeClick(index)"><i
                                        class="bi bi-heart"></i>&nbsp&nbsp{{ pet.likeCount }}</button>
                            </div>
                        </div>
                        <img :src="pet.img" alt="無法顯示">
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
    <Paging :totalPages="totalPages" :thePage="datas.start / datas.rows + 1" @childClick="clickHandler"></Paging>
</template>
    
<script setup >
import { ref, reactive, inject, watch } from "vue";
import axios from "axios";
import Paging from "../components/Paging.vue";
import ChatRoom from "../components/ChatRoom.vue";
const $cookies = inject("$cookies");
const likeState = ref([]);
const datas = reactive({
    record: "",  // record: "我的最愛",
    fkMemberId: $cookies.get("id"),
    name: null,
    species: [],
    sort: "createAt",
    order: "desc",
    start: "0",
    rows: "16",
});
const likeUse = reactive({
    fkMemberId: $cookies.get("id"),
    fkPetId: 0,
})
const sortOrder = ref(1)
const count = ref(0);
const likeRecord = ref([]);
const pets = ref([]);
const totalPages = ref(0);
const check = $cookies.get("identity");
const showChat = ref(false);
const URL = import.meta.env.VITE_API_JAVAURL;

//載入
const loadPets = async () => {
    const URLAPI = `${URL}pages/pet/find`;
    const response = await axios.post(URLAPI, datas);
    //取得所有商品放進products變數
    pets.value = response.data.list;
    count.value = response.data.count;
    likeRecord.value = response.data.likeRecord;
    // console.log(response.data.likeRecord);
    //計算總共幾頁
    totalPages.value = +datas.rows === 0 ? 1 : Math.ceil(response.data.count / datas.rows)
};
loadPets();

const cancelClick = async (index) => {
    pets.value[index].likeRecord = !pets.value[index].likeRecord;
    pets.value[index].likeCount--;
    likeUse.fkPetId = pets.value[index].id;
    const URLDELETE = `${URL}pages/pet/dislike/${likeUse.fkMemberId}-${likeUse.fkPetId}`;
    const response = await axios.delete(URLDELETE);
    // if (response.data.success) {
    //     alert(response.data.message);
    // } else {
    //     alert(response.data.message);
    // }

}
const likeClick = async (index) => {
    if ($cookies.get("id") === null) {
        alert("請先登入")
    } else {
        pets.value[index].likeRecord = !pets.value[index].likeRecord;
        pets.value[index].likeCount++;
        const URLINSERT = `${URL}pages/pet/like`;
        likeUse.fkPetId = pets.value[index].id;
        const response = await axios.post(URLINSERT, likeUse);
        // if (response.data.success) {
        //     alert(response.data.message);
        // } else {
        //     alert(response.data.message);
        // }
    }
}

//排序
const selectSortOrder = async () => {
    if (sortOrder.value === "1") {
        datas.sort = "createAt";
        datas.order = "desc";
    } else if (sortOrder.value === "2") {
        datas.sort = "createAt";
        datas.order = "asc";
    } else if (sortOrder.value === "3") {
        datas.sort = "likeCount";
        datas.order = "desc";
    } else {
        datas.sort = "likeCount";
        datas.order = "asc";
    }
    loadPets();
};

//物種多選
watch(
    () => datas.species,
    (newSpecies, oldSpecies) => {
        if (newSpecies !== oldSpecies) {
            // 当物种选择变化时，重新加载宠物数据
            loadPets();
        }
    }
);
//喜愛單選
watch(
    () => datas.record,
    (newRecord, oldRecord) => {
        if (newRecord !== oldRecord) {
            // 当物种选择变化时，重新加载宠物数据
            loadPets();
        }
    }
);

//paging 由子元件觸發
const clickHandler = page => {
    datas.start = (page - 1) * datas.rows
    loadPets()
}

const checkLogin = async () => {
    if(check !== null){
        showChat.value = true;
    }else{
        showChat.value = false;
    }
};
checkLogin();
</script>
    
<style scoped>
fieldset {
    border: black 1px solid;
    width: 260px;
    height: 400px;
    margin: 10px 0;
    border-radius: 10px;
    background-color: #EAEDED;
}

.petinfo {
    margin: 20px 30px;
    width: 200px;
    height: 150px;
}

.like {
    position: relative;
    top: -150px;
    left: 80%;
}

img {
    margin: 0 30px;
    width: 200px;
    height: 200px;
}

.color {
    color: #ff0000;
}

.custom-select {
    width: auto;
    /* 设置所需的宽度，可以根据需要进行调整 */
    display: inline-block;
}
.tital{
    font-size: 36px; /* 设置字体大小 */
    justify-content: left;
}
</style>
