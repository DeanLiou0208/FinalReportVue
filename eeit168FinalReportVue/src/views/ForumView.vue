<template>
  <h1>寵物論壇</h1>

  <div class="container">
    <div class="d-flex justify-content-center">
      <!-- <div class="species-container">
        <SpeciesInput @SpeciesChange="toggleSpecies"></SpeciesInput>
      </div> -->
      <div class="box" style="display: flex; align-items: center;">
        <!-- <h2>寵物物物種：</h2> -->
        <span class="badge bg-secondary " style="font-size:18px;">寵物物種</span>
        &nbsp&nbsp&nbsp
        <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
          <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" value="1" name="speciesId"
            v-model="datas.speciesId">
          <label class="btn btn-outline-primary" for="btncheck1">狗狗家族</label>
          &nbsp&nbsp&nbsp
          <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" value="2" name="speciesId"
            v-model="datas.speciesId">
          <label class="btn btn-outline-primary" for="btncheck2">貓貓家族</label>
          &nbsp&nbsp&nbsp
          <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" value="3" name="speciesId"
            v-model="datas.speciesId">
          <label class="btn btn-outline-primary" for="btncheck3">水族兩棲</label>
          &nbsp&nbsp&nbsp
          <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off" value="4" name="speciesId"
            v-model="datas.speciesId">
          <label class="btn btn-outline-primary" for="btncheck4">鳥類家族</label>
          &nbsp&nbsp&nbsp
          <input type="checkbox" class="btn-check" id="btncheck5" autocomplete="off" value="5" name="speciesId"
            v-model="datas.speciesId">
          <label class="btn btn-outline-primary" for="btncheck5">爬蟲家族</label>
          &nbsp&nbsp&nbsp
          <input type="checkbox" class="btn-check" id="btncheck6" autocomplete="off" value="6" name="speciesId"
            v-model="datas.speciesId">
          <label class="btn btn-outline-primary" for="btncheck6">小型動物</label>
          &nbsp&nbsp&nbsp
          <input type="checkbox" class="btn-check" id="btncheck7" autocomplete="off" value="7" name="speciesId"
            v-model="datas.speciesId">
          <label class="btn btn-outline-primary" for="btncheck7">其他種類</label>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <!-- <div class="article-type-container">
      <ArticleTypeInput @typeChange="filterArticlesByType"></ArticleTypeInput>
    </div> -->
      <div style="margin-top: 10px;">
        <div class="box" style="display: flex; align-items: center;">
          <span class="badge bg-secondary " style="font-size:18px;">文章種類</span>
          &nbsp&nbsp&nbsp
          <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked
              v-model="datas.type" value="寵物協尋">
            <label class="btn btn-outline-primary" for="btnradio1">寵物協尋</label>
            &nbsp&nbsp&nbsp
            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" v-model="datas.type"
              value="寵物用品">
            <label class="btn btn-outline-primary" for="btnradio2">寵物用品</label>
            &nbsp&nbsp&nbsp
            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" v-model="datas.type"
              value="萌寵搞笑">
            <label class="btn btn-outline-primary" for="btnradio3">萌寵搞笑</label>
            &nbsp&nbsp&nbsp
            <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" v-model="datas.type"
              value="寵物飲食">
            <label class="btn btn-outline-primary" for="btnradio4">寵物飲食</label>
            &nbsp&nbsp&nbsp
            <input type="radio" class="btn-check" name="btnradio" id="btnradio5" autocomplete="off" v-model="datas.type"
              value="寵物美容">
            <label class="btn btn-outline-primary" for="btnradio5">寵物美容</label>
            &nbsp&nbsp&nbsp
            <input type="radio" class="btn-check" name="btnradio" id="btnradio6" autocomplete="off" v-model="datas.type"
              value="生活起居">
            <label class="btn btn-outline-primary" for="btnradio6">生活起居</label>
            &nbsp&nbsp&nbsp
            <input type="radio" class="btn-check" name="btnradio" id="btnradio7" autocomplete="off" v-model="datas.type"
              value="寵物訓練">
            <label class="btn btn-outline-primary" for="btnradio7">寵物訓練</label>

          </div>
        </div>
      </div>
    </div>

    <br />
    <div class="row mb-3">
      <div class="col-3">
        <SelectedSort @sortChange="sortArticles"></SelectedSort>

      </div>
      <div class="col-6"></div>
      <div class="col-3">
        <SearchTitle @searchInput="inputHandler"></SearchTitle>
      </div>
    </div>
    <br />
    <div class="card-list ">
      <!-- <div class="row row-cols-1 row-cols-md-3 g-4 justify-content-center"> -->
        <div class="row row-cols-1 row-cols-md-3 g-4">
        <!-- <div class="col"> -->
        <div class="card card border-secondary text-bg-light mb-3" style="width: 18rem height: 400px; overflow: hidden;" v-for="(post, index) in posts" :key="index">
          <img :src="post.img" class="card-img-top" alt="..." />
          <div class="card-body">
            <RouterLink to="/forumpost" class="custom-link">
              <h5 class="card-title" @click="selectId(post.id)" style="height: 50px; overflow: hidden;">{{ post.title }}</h5>
            </RouterLink>
            <!-- <a href="#" to="/forumpost" >{{ post.title }} </a> -->
            <p class="card-text" style="height: 100px; overflow: hidden;">{{ post.petArticleText }}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">文章類型: {{ post.type }}</li>
            <li class="list-group-item" style="text-align: right">
              <i class="bi bi-hand-thumbs-up"></i> {{ post.likeCount }}
              <i class="bi bi-hand-thumbs-down-fill"></i> {{ post.unLikeCount }}
            </li>
            <li class="list-group-item">最近更新時間: {{ post.lastTime }}</li>
          </ul>
          <!-- <div class="card-body">
        <a :href="card.link1" class="card-link">Card link</a>
        <a :href="card.link2" class="card-link">Another link</a>
      </div> -->
        </div>
      </div>
    </div>
  
    <div class="paging-wrapper">
    <Paging :totalPages="totalPages" :thePage="datas.start /datas.rows + 1" @childClick="clickHandler" style="margin-left: 150px;"></Paging>
  </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import axios from "axios";
import Paging from "../components/Paging.vue";
import SelectedSort from "../components/SelectedSort.vue";
import SearchTitle from "../components/SearchTitle.vue";
const posts = ref([]);
const petArticleId = ref(null);
const datas = reactive({
  speciesId: [],
  type: null,
  title: null,
  sort: null,
  order: "desc",
  start: 0,
  rows: 3
});
const totalPages = ref(0);
// console.log("datas=" + datas.speciesId);
const URL = import.meta.env.VITE_API_JAVAURL; // http://localhost:8080/定義在.env檔案
const loadPosts = async () => {
  const API_URL = `${URL}pages/ajax/PetArticleOrderView/find`;
  const response = await axios.post(API_URL, datas);

  // console.log(response.data);
  //取得篩選文章放進posts變數
  posts.value = response.data.list;
  // console.log(response.data.list.length)
  //計算總共幾頁
  totalPages.value = +datas.rows === 0 ? 1 : Math.ceil(response.data.count / datas.rows)
};
// 跳轉頁面
function selectId(input) {
  console.log(input);
  localStorage.setItem("petArticleId", input);
}

//paging 由子元件觸發
const clickHandler = page => {
  datas.start = (page - 1) * datas.rows
  console.log(page)
  loadPosts();
}

// 篩選哪些species
// const toggleSpecies = (selectedSpeciesIds) => {
//   datas.speciesId = selectedSpeciesIds;
//   console.log("datas.speciesId:" + selectedSpeciesIds);

//   console.log("id:" + datas.speciesId[1]);

//   loadPosts();
// };
watch(
  () => datas.speciesId,
  (newspeciesId, oldspeciesId) => {
    if (newspeciesId !== oldspeciesId) {
      loadPosts();

    }
  }
)


// 篩選文章種類
watch(
  () => datas.type,
  (newType, oldType) => {
    if (newType !== oldType) {
      loadPosts();
    }
  }
)
// const filterArticlesByType = (value) => {
//   datas.type = value;
//   console.log("datas.type:" + value);

//   console.log("id:" + datas.type);

//   loadPosts();
// };
// 按讚數,到讚數,時間排序
const sortArticles = (value) => {
  datas.sort = value;
  loadPosts();
};
//模糊搜尋文章標題
const inputHandler = (value) => {
  datas.title = value;
  console.log("value:" + value);
  loadPosts();
};

loadPosts();
</script>
    


<style scoped>
.custom-link {
  text-decoration: none;
}

/* .card-list {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
} */

.card-img-top {
  width: 100%;
  height: 250px;
  /* 设置图像高度，可以根据需要进行调整 */
  object-fit: cover;
  /* 缩放图像以填充给定的高度 */
}

.species-container {
  margin-bottom: 10px;
  /* 添加顶部外边距 */
}

.article-type-container {
  margin-top: 10px;
  /* 添加底部外边距 */
}

.paging-wrapper {
  display: flex;
  justify-content: left;
  margin-top: 20px; /* 调整上方间距 */
  
}

</style>
