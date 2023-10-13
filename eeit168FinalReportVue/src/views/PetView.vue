<template>

<div class="col-6">
      <div class="mb-3">
    <fieldset>

        <div>
            <label for="petId" class="form-label">寵物Id</label>
            <input type="text" class="form-control">
        </div>
        <div>
            <label for="petName" class="form-label">寵物名字</label>
            <input type="text" class="form-control">
        </div>
        <div>
            <label for="petAge" class="form-label">寵物年齡</label>
            <input id="petAge" type="number" min="0" max="100" step="1" class="form-control">
        </div>
        <div>
            <label for="petGender" class="form-label">寵物性別</label>
            <select name="petGender" id="petGender" class="form-control">
                <option value="true">公</option>
                <option value="false">母</option>
                <option value="null">不透漏</option>
            </select>
        </div>
            
                <label for="species" class="form-label">寵物類型</label>
                <select name="species" id="species" v-model="selectSpecies" @change="selectBreeds" >
                    <option :value="species" v-for="(species,index) in species" :key="index">{{ species }}</option>
                </select>
            
                <label for="breed" class="form-label">寵物品種</label>
                <select name="breed" id="breed">
                    <option :value="breed" v-for="(breed,index) in breeds" :key="index">{{breed}}</option>
                </select>

        <div class="mb-3">
            <label for="formFileMultiple" class="form-label">選擇照片</label>
            <input class="form-control" type="file" id="formFileMultiple" multiple>
        </div>
        <button class="btn btn-primary" type="button" @click="updatePet" >更新</button>
        <button class="btn btn-primary" type="button" @click="deletePet" >刪除</button>
    </fieldset>
</div>
</div>
</template>
    
<script setup>
    import { ref } from "vue";
    import axios from "axios";
    const breeds = ref([]);
    const species = ref([]);
    const selectSpecies = ref("");

    const URL = import.meta.env.VITE_API_JAVAURL;
    const loadProducts = async () => {
        const URLAPI = `${URL}pages/pet/information/exists`;
        const response = await axios.post(URLAPI, datas);
        console.log(response.data)
        pet.value = response.data;
    };

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
    const updatePet = async () => {
        // const URLAPI = `${URL}pages/pet/information/exists`;
        // const response = await axios.post(URLAPI, datas);
        // console.log(response.data)
        // pet.value = response.data;
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
    .flexbox{
        display: flex;
        justify-content: space-between;
    }
</style>