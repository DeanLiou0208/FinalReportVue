<template>
    <div class="main-content">
        <div class="sidebar routerborder">
            <ul>
                <li>
                    <router-link to="/memberInformation">
                        <h6>個人資料</h6>
                    </router-link>
                </li>
                <li>
                    <router-link to="/personalPetView">
                        <h5>我的寵物</h5>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <h6>我的文章</h6>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <h6>我的收藏</h6>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <h6>我的訂單</h6>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <h6>我的任務</h6>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="container">
            <div class="col-6">
                <div class="mb-3">
                    <fieldset>
                        <div>
                            <label for="name" class="form-label">寵物名字</label>
                            <input type="text" class="form-control" v-model="pet.name">
                        </div>
                        <div>
                            <label for="age" class="form-label">寵物年齡</label>
                            <input id="age" type="number" min="0" max="100" step="1" class="form-control" v-model="pet.age">
                        </div>

                        <div class="mb-3">
                            <label for="gender" class="form-label">寵物性別 :　</label>
                            <input type="radio" name="gender" value="true" id="gender" v-model="pet.gender" /><span>公</span>
                            <input type="radio" name="gender" value="false" id="gender"
                                v-model="pet.gender" /><span>母</span>
                            <input type="radio" name="gender" value="null" id="gender"
                                v-model="pet.gender" /><span>不公開</span>
                        </div>

                        <label for="species" class="form-label">寵物類型</label>
                        <select name="species" id="species" v-model="selectSpecies" @change="selectBreeds">
                            <option :value="species" v-for="(species, index) in species" :key="index">{{ species }}</option>
                        </select>

                        <label for="breed" class="form-label">寵物品種</label>
                        <select name="breed" id="breed" v-model="pet.categroy">
                            <option :value="breed" v-for="(breed, index) in breeds" :key="index">{{ breed }}</option>
                        </select>
                        <br>
                        <br>
                        <div class="mb-3">
                            <label for="formFileMultiple" class="form-label">選擇照片</label>
                            <input class="form-control" type="file" id="formFileMultiple" multiple>
                        </div>
                        <button class="btn btn-primary" type="button" @click="insertPet">新增</button>

                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</template>
        
<script setup>
import { ref, reactive, inject, onMounted } from "vue";
import axios from "axios";
const $cookies = inject("$cookies");
const breeds = ref([]);
const species = ref([]);
const selectSpecies = ref("");
const pet = reactive({
    fkMemberId: $cookies.get("id"),
    name: "",
    categroy: "",
    age: 0,
    gender: null,
});
const file = new FormData();
const avatarInput = ref(null);

onMounted(() => {
    avatarInput.value = document.getElementById('formFileMultiple');
});

const URL = import.meta.env.VITE_API_JAVAURL;
// const loadProducts = async () => {
//     const URLAPI = `${URL}pages/pet/information/exists`;
//     const response = await axios.post(URLAPI, datas);
//     console.log(response.data)
//     pet.value = response.data;
// };

const findSpecies = async () => {
    const URLAPI = `${URL}pages/pet/select/species`;
    const response = await axios.get(URLAPI);
    species.value = response.data.species;
}

const selectBreeds = async () => {
    const URLAPI = `${URL}pages/pet/select/breeds/${selectSpecies.value}`;
    const response = await axios.get(URLAPI);
    breeds.value = response.data.breeds;
}
const insertPet = async () => {
    const API_URL = `${URL}pages/pet/newPet`;

    const json = JSON.stringify(pet);
    console.log(json)

    if (avatarInput.value.files.length > 0) {
        for (let i = 0; i < avatarInput.value.files.length; i++) {
            file.append(`files`, avatarInput.value.files[i]);
        }
    }
    file.append('body', json);
    const response = await axios.post(API_URL, file, {
        headers: {
            'Content-Type': 'multipart/form-data', // 必须设置正确的Content-Type
        },
    });
    if(response.data.success){
        console.log(response.data.message);
        alert(response.data.message);
        window.location.href = '/personalPetView';
    }else{
        console.log(response.data.message);
        alert(response.data.message);
    }


};

const deletePet = async () => {
    // const URLAPI = `${URL}pages/pet/information/exists`;
    // const response = await axios.post(URLAPI, datas);
    // console.log(response.data)
    // pet.value = response.data;
};

findSpecies();


</script>
        
<style scoped>
.flexbox {
    display: flex;
    justify-content: space-between;
}
.container {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
        height: auto;
        /* 让容器占满整个视窗高度 */
    }
    .routerborder {
        padding: 50px 0;
        border: black 1px solid;
        border-radius: 10px;
        height: 300px;
        width: 150px;
    }
    .main-content {
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
</style>