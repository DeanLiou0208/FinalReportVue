<template>
        <fieldset  v-for="{ petId, name, species, breed, age, gender } in pets" :key="petId">
            <div>寵物編號 : {{ petId }}</div>
            <div>寵物名字 : {{ name }}</div>
            <div>寵物類型 : {{ species }}</div>
            <div>寵物品種 : {{ breed }}</div>
            <div>寵物年齡 : {{ age }}</div>
            <div v-if="`${ gender }`=== true">寵物性別 : 公</div>
            <div v-else-if="`${ gender }`=== false">寵物性別 : 母</div>
            <div v-else>寵物性別 : 不公開</div>

        </fieldset>
</template>
    
<script setup>
    import { ref, reactive } from "vue";
    import axios from "axios";

    const pets = ref([]);
    const owner = reactive({
        fkMemberId : 2,
    });
    const API_URL = `http://localhost:8080/pages/pet/information/find`;
    const loadPets = async () => {
    const response = await axios.post(API_URL, owner);
    pets.value = response.data.list;

    };
    loadPets();
</script>
    
<style scoped>
    
</style>